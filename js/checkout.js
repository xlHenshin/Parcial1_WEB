import { initializeApp } from "https://www.gstatic.com/firebasejs/9.3.0/firebase-app.js";
import { getAuth, onAuthStateChanged} from "https://www.gstatic.com/firebasejs/9.3.0/firebase-auth.js";
import { getFirestore, doc, getDoc, addDoc, collection} from "https://www.gstatic.com/firebasejs/9.3.0/firebase-firestore.js";

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);

let cart = [];
let userLogged = {};
let total= 0;

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

const createOrder = async(userInfo) =>{
    
    try {
        
        await addDoc(collection(db, "orders"),{

            userInfo,
            email: userInfo.email,
            cart,
            total,
            status: "pending",
        });

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
        phoneNumber

    }

    if (firstName && lastName && city && address && phoneNumber) {
            
        createOrder(userInfo);
    }
    
});

onAuthStateChanged(auth, async (user)=>{

    console.log(user);

    if (user) {
        const result = await getFirebaseCart(user.uid);
        cart = result.products;
        console.log("Pre: "+total);
        cart.forEach(product=>{
            total += parseInt(product.price);
        });
        console.log("Post: "+total);

        userLogged = user;
    } else {
        cart = getMyCart();
    }
});