import { initializeApp } from "https://www.gstatic.com/firebasejs/9.3.0/firebase-app.js";
import { getAuth, onAuthStateChanged} from "https://www.gstatic.com/firebasejs/9.3.0/firebase-auth.js";
import { getFirestore, doc, getDoc, addDoc, collection, deleteDoc} from "https://www.gstatic.com/firebasejs/9.3.0/firebase-firestore.js";

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);

let cart = [];
let userLogged = {};
let total= 0;
let email = "";
let done = 0;

const checkOutForm = document.getElementById("checkout")

const getMyCart = () => {

    const cart = localStorage.getItem("cart");
    return cart ? JSON.parse(cart) : [];
};

const getFirebaseCart = async(userId) =>{

    const docRef = doc(db, "cart", userId);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? docSnap.data() : {
        products : []
    }
};

const deleteCart = async() =>{

    try {
        await deleteDoc(doc(db,"cart",userLogged.uid));
        console.log(cart)
    } catch (e) {
        console.log(e);
    }

    
}

const createOrder = async(userInfo) =>{
    
    try {

        console.log(userInfo)
        
        const order = await addDoc(collection(db, "orders"),{

            userInfo,
            products: cart,
            total,
            status: "pending",
        });

        console.log(order);
        deleteCart();

    } catch (e) {

        console.log(e);
    }

    


};

checkOutForm.addEventListener("submit", e =>{
    e.preventDefault();

    const firstName = checkOutForm.firstName.value;
    const lastName = checkOutForm.lastName.value;
    const city = checkOutForm.city.value;
    const address = checkOutForm.address.value;
    const phoneNumber = checkOutForm.pNumber.value;

    const userInfo = {

        firstName,
        lastName,
        city,
        address,
        phoneNumber,
        email


    }

    if (firstName && lastName && city && address && phoneNumber) {
        createOrder(userInfo);
        alert("Purchase succesful!");
        done=1;
    }

    console.log(done);

    if (done) {
        console.log("Done!")
        //location.href="./done.html";
    }else{
        console.log("Waiting...")
    }
    
});

onAuthStateChanged(auth, async (user)=>{

    console.log(user);

    if (user) {

        email=user.email;

        const result = await getFirebaseCart(user.uid);
        cart = result.products;

        cart.forEach(product=>{
            total += parseInt(product.price);
        });

        userLogged = user;

        if (cart.length) {
            
            console.log(cart.length);
            console.log("Carro lleno");
        }else{
            alert("There's no products in the cart, redirecting...");
            location.href = "./shop.html"
        }
    } else {
        cart = getMyCart();
    }
});