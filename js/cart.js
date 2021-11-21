import { initializeApp } from "https://www.gstatic.com/firebasejs/9.3.0/firebase-app.js";
import { getAuth, onAuthStateChanged} from "https://www.gstatic.com/firebasejs/9.3.0/firebase-auth.js";
import { getFirestore, doc, getDoc} from "https://www.gstatic.com/firebasejs/9.3.0/firebase-firestore.js";

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);

const cartSection = document.getElementById("cart");
const totalSection = document.getElementById("total");

let cart = [];
let userLogged = {};

const getMyCart = () => {

    const cart = localStorage.getItem("cart");
    return cart ? JSON.parse(cart) : [];
};

const removeProduct = (productId) =>{

    const cart = getMyCart();

    const newCart = cart.filter(product => product.id !== productId);
    localStorage.setItem("cart", JSON.stringify(newCart));

    renderMyCart();

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

    totalSection.innerText= `Total: $ ${formatCurrency(total)}`;
};

onAuthStateChanged(auth, async (user)=>{

    console.log(user);

    if (user) {
        const result = await getFirebaseCart(user.uid);
        cart = result.products;
        console.log(cart);
        renderMyCart(cart);
        userLogged = user;
    } else {
        cart = getMyCart();
        renderMyCart(cart);
    }
});