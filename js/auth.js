import { initializeApp } from "https://www.gstatic.com/firebasejs/9.3.0/firebase-app.js";

import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.3.0/firebase-auth.js";

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

//=================================================================================

const createUser = async() =>{
    
    try {
        await createUserWithEmailAndPassword (auth, email, password)
        alert(`Usuario ${email} creado satisfactoriamente`)
    } catch (e) {
        console.log(e.code);

        if (e.code==="auth/email-already-in-use") {
            alert("Email already in use");
        }

        if (e.code==="auth/weak-password") {
            alert("Week password");
        }
    }
    
}

const registerForm = document.getElementById("register");

registerForm.addEventListener("submit", e=>{
    e.preventDefault();

    const email = registerForm.email.value;
    const password = registerForm.password.value;

    if (email&&password) {

        createUser();
    }
    
})

const login = async(email,password)=>{

    try {
        const {user}=await signInWithEmailAndPassword(auth, email, password);
        console.log(user);
    } catch (e) {
        console.log(e);

        if (e.code==="auth/user-not-found") {
            alert("User not found");
        }

        if (e.code==="auth/wrong-password") {
            alert("Wrong Password");
        }
    }
}

const loginForm = document.getElementById("login");

loginForm.addEventListener("submit", e =>{
    e.preventDefault();
    const email=loginForm.email.value;
    const password=loginForm.password.value;

    if(email && password){
        login();
    }
})