import { initializeApp } from "https://www.gstatic.com/firebasejs/9.3.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut} from "https://www.gstatic.com/firebasejs/9.3.0/firebase-auth.js";
import { getFirestore, doc, getDoc, setDoc, deleteDoc} from "https://www.gstatic.com/firebasejs/9.3.0/firebase-firestore.js";

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);

const cartSection = document.getElementById("cart");
const subtotalSection = document.getElementById("subtotal");
const totalSection = document.getElementById("total");
const checkOutBtn = document.getElementById("checkoutBtn")

let cart = [];
let userLogged = {};

let logStatus = false;

const logBtn = document.getElementById("logBtn");

const getMyCart = () => {

    const cart = localStorage.getItem("cart");
    return cart ? JSON.parse(cart) : [];
};

const removeProduct = async(productId) =>{

    const cart = getMyCart();

    const newCart = cart.filter(product => product.id !== productId);

    try {
        if (newCart.length) {
            await setDoc(doc(db,"cart", userLogged.uid), {
                products: newCart
            });
        }else{
    
            await deleteDoc(doc(db,"cart",userLogged.uid));
        }
    } catch (error) {
        console.log(error);
    }
    

    localStorage.setItem("cart", JSON.stringify(newCart));
    console.log(productId);

    renderMyCart(newCart);

};

const getFirebaseCart = async(userId) =>{

    const docRef = doc(db, "cart", userId);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? docSnap.data() : {
        products : []
    }
};

const renderProduct = (product) =>{
    
    const newProduct=document.createElement("li");
    newProduct.className = "product";
    newProduct.innerHTML = `
    
    <img src="${product.image}" alt="" class="product__image">

        	<div class="product__form">

                <div class="product__info">
                    <h2 class="product__name">${product.name}</h2>
                    <h3 class="product__price">$ ${formatCurrency(product.price)}</h3>
                </div>

                <button class="product__button">
                    <img src="./resources/delete.svg" alt="Delete" class="product__delete">
                </button>
            </div>  
    `;

    cartSection.appendChild(newProduct);

    newProduct.addEventListener("click", e =>{

        if (e.target.tagName === "BUTTON") {

            removeProduct(product.id);
        }
    });

};

const renderMyCart = (cart) =>{

    let total = 0;
    cartSection.innerHTML = "";

    cart.forEach(product=>{
        total += parseInt(product.price);
        renderProduct(product);
    });

    subtotalSection.innerText = `$${formatCurrency(total)}`
    totalSection.innerText= `Total: $${formatCurrency(total)}`;
};

checkOutBtn.addEventListener("click", e =>{
    e.preventDefault();

    if (cart.length) {
            
        console.log("CHECKOUTTT");
        location.href="./checkout.html"
    }else{
        alert("There's not products in the cart")
    }
    
});

const logout = async () => {
    console.log("Logout");
    console.log(signOut);
    
    try {
        await signOut(auth);
    } catch (e) {
        console.log(e);
    }
};

const isLogged = () =>{

    if (logStatus) {
        
        document.getElementById("logBtn").src = "./resources/login.svg"
        console.log("Logged In. You can Log Out");
    }else{

        document.getElementById("logBtn").src = "./resources/logout.svg"
        console.log("Not Logged In. You can Sign In");
    }
};

logBtn.addEventListener("click", e =>{

    if (logStatus) {
        
        logStatus = false;
        logout();
    }else{

        window.location.href = "./login.html"
    }
});

onAuthStateChanged(auth, async (user)=>{

    console.log(user);

    if (user) {
        logStatus=true;
        const result = await getFirebaseCart(user.uid);
        
        if (result) {
            cart = result.products;
        }else{
            console.log("Empty!")
        }
        console.log(cart);
        renderMyCart(cart);
        userLogged = user;
    } else {
        cart = getMyCart();
        renderMyCart(cart);
    }

    isLogged();
});