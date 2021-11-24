const firebaseConfig = {
    apiKey: "AIzaSyCoGdfHu8q1gUrevCRzBjQCXd3-7sYzVQc",
    authDomain: "teslaweb-fe738.firebaseapp.com",
    projectId: "teslaweb-fe738",
    storageBucket: "teslaweb-fe738.appspot.com",
    messagingSenderId: "635230137447",
    appId: "1:635230137447:web:957a781f440825819eb8c2",
    measurementId: "G-5NYWJK97MK"
};

const formatCurrency = (price) =>{
    return new Intl.NumberFormat( {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 0,
    }).format(price);
};