import { initializeApp } from "https://www.gstatic.com/firebasejs/9.3.0/firebase-app.js";

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.3.0/firebase-auth.js";

import { getFirestore, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/9.3.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCoGdfHu8q1gUrevCRzBjQCXd3-7sYzVQc",
  authDomain: "teslaweb-fe738.firebaseapp.com",
  projectId: "teslaweb-fe738",
  storageBucket: "teslaweb-fe738.appspot.com",
  messagingSenderId: "635230137447",
  appId: "1:635230137447:web:957a781f440825819eb8c2",
  measurementId: "G-5NYWJK97MK"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);

const registerForm = document.getElementById("register");
const loginForm = document.getElementById("login");
const logoutButton = document.getElementById("logout");

const rSignIn = document.getElementById("registerBtn");
const lRegister = document.getElementById("loginBtn");

//=================================================================================

const createUser = async(email, password, userFields) =>{
    
    try {
        const {user} = await createUserWithEmailAndPassword (auth, email, password);
        const userId = user.uid;

        await setDoc (doc(db, "users", userId), userFields);
    } catch (e) {
        console.log(e.code);

        if (e.code==="auth/email-already-in-use") {
            alert("Email Already In Use");
        }

        if (e.code==="auth/weak-password") {
            alert("Week Password");
        }
    }
    
}

registerForm.addEventListener("submit", e=>{
    e.preventDefault();

    const firstName = registerForm.firstName.value;
    const lastName = registerForm.lastName.value
    const email = registerForm.email.value;
    const password = registerForm.password.value;

    if (email&&password) {

        console.log("User created")
        createUser(email, password, {
            firstName,
            lastName,
            email,
            password,
            isAdmin: false
        });
    }else{
        alert("Complete all the information");
    }
    
})

const getUserInfo = async(userId) =>{
    try {
        const docRef = doc(db, "users", userId);
        const docSnap = await getDoc(docRef);
        return docSnap.data();
    } catch (e) {
        console.log(e);
    }

}

const login = async(email,password)=>{

    try {
        const {user} =await signInWithEmailAndPassword(auth, email, password);
        const userInfo = await getUserInfo(user.uid);
        console.log(userInfo);
    } catch (e) {
        console.log(e);

        if (e.code==="auth/user-not-found") {
            alert("User not found");
        }

        if (e.code==="auth/wrong-password") {
            alert("Wrong Password");
        };
    };
};

loginForm.addEventListener("submit", e =>{
    e.preventDefault();
    const email=loginForm.email.value;
    const password=loginForm.password.value;

    if(email && password){
        login(email, password);
        console.log("Succesful")
    }else{
        alert("Complete all the information")
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
}

logoutButton.addEventListener("click", e => {
    logout();
});

rSignIn.addEventListener("click", e =>{

    registerForm.classList.add("hidden");
    loginForm.classList.remove("hidden");
});

lRegister.addEventListener("click", e =>{

    loginForm.classList.add("hidden")
    registerForm.classList.remove("hidden");;
});

onAuthStateChanged(auth, (user)=>{
    if (user) {
        console.log("You are logged in");
        window.location.href = "./shop.html"
        loginForm.classList.add("hidden");
        registerForm.classList.add("hidden");
        logoutButton.classList.add("visible");
    }else{
        registerForm.classList.add("hidden");
        logoutButton.classList.remove("visible");
    }
});