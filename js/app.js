import { initializeApp } from "https://www.gstatic.com/firebasejs/9.3.0/firebase-app.js";
import { getAuth, onAuthStateChanged} from "https://www.gstatic.com/firebasejs/9.3.0/firebase-auth.js";
import { getFirestore, collection, getDocs, doc, getDoc, setDoc} from "https://www.gstatic.com/firebasejs/9.3.0/firebase-firestore.js";

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);

let products = [];
let userLogged;
let cart = [];

//================================================================================================================

const getAllProducts = async()=>{  
    const collectionRef = collection(db, "products");
    const {docs} = await getDocs(collectionRef);

    const firebaseProducts = docs.map((doc)=>{
        return {
           ...doc.data(),
            id: doc.id 
        }
    });

    console.log(firebaseProducts)

    firebaseProducts.forEach(product =>{
        productTemplate(product);
    });

    products = firebaseProducts;
};

const getMyCart = () => {

    const cart = localStorage.getItem("cart");
    return cart ? JSON.parse(cart) : [];
};

const getFirebaseCart = async(userId) =>{

    const docRef = doc(db, "cart", userId);
    const docSnap = await getDoc(docRef);
    const data = docSnap.data();

    return data;
};

const addProductsToCart = async(products) => {

    await setDoc(doc(db,"cart", userLogged.uid), {
        products
    });
};

const productSection = document.getElementById("products");

const productTemplate = (item) =>{

    if (item.name) {

        const product = document.createElement("a");
    product.className = "product";

    product.setAttribute("href",`./product.html?id=${item.id}`);

    const isAdded= cart.some(productCart => productCart.id === item.id);

    let buttonHtml;

    if (isAdded) {
        buttonHtml = `<button class="product__cart" disabled>
        <img class="product__icon" src="./resources/cartdisabled.svg" alt="Cart" class="product__button">
    </button>`
    }else{
        buttonHtml = `<button class="product__cart">
        <img class="product__icon" src="./resources/cart.svg" alt="Cart" class="product__button">
    </button>`
    };

    product.innerHTML = `
    <img src="${item.image}" class="product__image">
                <div class="product__description">
                    <div class="product__text">
                        <h3 class="product__name">${item.name}</h3>
                        <h3 class="product__price">$${item.price}</h3>
                    </div>
                    ${buttonHtml}
                </div>
    `;

    productSection.appendChild(product);
    
    const productCart = product.querySelector(".product__cart");

    productCart.addEventListener("click", e =>{
        e.preventDefault();
        const productAdded = {
            id: item.id,
            name: item.name,
            image: item.image,
            price: item.price
        };

        cart.push(productAdded);

        if (userLogged) {
            addProductsToCart(cart);
        };

        localStorage.setItem("cart", JSON.stringify(cart));

        productCart.setAttribute("disabled", true);
        alert("Product Added");
        loadProducts();
    });
    }else{
        const emptyItem = document.createElement("a");
        emptyItem.className = "product";
        productSection.appendChild(emptyItem);
    }
};

const filterByCategorySelect = document.getElementById("categories");
const orderBySelect = document.getElementById("orderBy");

orderBySelect.addEventListener("change", e =>{

    loadProducts();
});

filterByCategorySelect.addEventListener("change", e=>{

    loadProducts();
});

const loadProducts = ()=>{

    const category = filterByCategorySelect.value;
    const order = orderBySelect.value;

    productSection.innerHTML = "";
    let filteredProductsByCategory;

    if (category !=="") {
        filteredProductsByCategory = products.filter((product)=>product.type === category);
    }else{
        filteredProductsByCategory = products;
    }

    if (order ==="asc") {
        filteredProductsByCategory = filteredProductsByCategory.sort((a,b)=>a.price - b.price);
    }

    if (order ==="desc") {
        filteredProductsByCategory = filteredProductsByCategory.sort((a,b)=>b.price - a.price);
    }

    if (filteredProductsByCategory.length == 2) {
        filteredProductsByCategory.push({});
    }
    filteredProductsByCategory.forEach(product =>{
        
        productTemplate(product);
    });
}

//const user = localStorage.getItem("user", JSON.stringify(user));



onAuthStateChanged(auth, async (user)=>{

    console.log(user);

    if (user) {
        const result = await getFirebaseCart(user.uid);
        console.log(result);

        if (result) {
            cart = result.products;
        }else{
            console.log("Empty!")
        }
        console.log(cart);
        userLogged = user;
    } else {
        cart = getMyCart();
    }

    getAllProducts();
});