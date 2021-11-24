import { initializeApp } from "https://www.gstatic.com/firebasejs/9.3.0/firebase-app.js";
import {getAuth, onAuthStateChanged, signOut,} from "https://www.gstatic.com/firebasejs/9.3.0/firebase-auth.js";
import {getFirestore, doc, getDoc, setDoc,} from "https://www.gstatic.com/firebasejs/9.3.0/firebase-firestore.js";

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);

let cart = [];
let userLogged;
let logStatus = false;
let product;

const addToCart = document.getElementById("addToCart");
const logBtn = document.getElementById("logBtn");

const getProduct = async () => {
    const url = window.location.search;
    const searchParams = new URLSearchParams(url);
    const productId = searchParams.get("id");

    const docRef = doc(db, "products", productId);
    const docSnap = await getDoc(docRef);
    const data = docSnap.data();

    productSection.classList.add("loaded");
    spinner.classList.add("loaded");

    product = data;
        loadProductInfo({
        ...data,
        id: docSnap.id,
    });
};

const getMyCart = () => {
    const cart = localStorage.getItem("cart");
    return cart ? JSON.parse(cart) : [];
};

const getFirebaseCart = async (userId) => {
    const docRef = doc(db, "cart", userId);
    const docSnap = await getDoc(docRef);
    const data = docSnap.data();

    return data;
};

const addProductsToCart = async (products) => {
    await setDoc(doc(db, "cart", userLogged.uid), {
        products,
    });
};

const productSection = document.getElementById("product");
const spinner = document.getElementById("spinner");
const productImage = document.getElementById("productImage");
const productName = document.getElementById("productName");
const productDescription = document.getElementById("productDescription");
const productPrice = document.getElementById("productPrice");
const customContent = document.getElementById("customContent");

const loadProductInfo = (product) => {
    productName.innerText = product.name;
    productDescription.innerText = product.description;
    productPrice.innerText = `$ ${formatCurrency(product.price)}`;
    productImage.setAttribute("src", product.image);

    const isAdded = cart.some((productCart) => productCart.id === product.id);

    if (isAdded) {
        addToCart.disabled = true;
    }

    if (product.size) {
        createSelectSize(product.size);
    }
};

const createSelectSize = (size) => {
    const selectContent = document.createElement("div");
    const select = document.createElement("select");
    
    selectContent.innerHTML = "<label class='product__size'>Size</label>";
    size.forEach((s) => {
        select.innerHTML += `<option value="${s}">${s}</option>`;
        4;
    });

    selectContent.appendChild(select);
    customContent.appendChild(selectContent);
};

const logout = async () => {
    try {
        await signOut(auth);
    } catch (e) {
        console.log(e);
    }
};

const isLogged = () => {
    if (logStatus) {
        document.getElementById("logBtn").src = "./resources/login.svg";
    } else {
        document.getElementById("logBtn").src = "./resources/logout.svg";
    }
};

logBtn.addEventListener("click", (e) => {
    if (logStatus) {
        logStatus = false;
        logout();
    } else {
        window.location.href = "./login.html";
    }
});

addToCart.addEventListener("click", (e) => {
    e.preventDefault();

    const productAdded = {
        id: product.id,
        name: product.name,
        image: product.image,
        price: product.price,
    };

    cart.push(productAdded);

    if (userLogged) {
        addProductsToCart(cart);
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    alert("Product Added");
});

onAuthStateChanged(auth, async (user) => {
    if (user) {
        logStatus = true;
        const result = await getFirebaseCart(user.uid);
        getProduct();

        if (result) {
        cart = result.products;
        } else {
        alert("Cart is empty!");
        }
        userLogged = user;
    } else {
        cart = getMyCart();
    }

    isLogged();
});
