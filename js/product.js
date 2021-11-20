import { initializeApp } from "https://www.gstatic.com/firebasejs/9.3.0/firebase-app.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/9.3.0/firebase-firestore.js";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const getProduct = async () =>{
    const url = window.location.search;
    const searchParams = new URLSearchParams(url);
    const productId = searchParams.get("id");

    const docRef = doc(db, "products", productId);
    const docSnap = await getDoc(docRef);
    const data = docSnap.data();

    productSection.classList.add("loaded");
    spinner.classList.add("loaded");

    loadProductInfo(data);
}

const productSection = document.getElementById("product");
const spinner = document.getElementById("spinner");
const productImage = document.getElementById("productImage");
const productName = document.getElementById("productName");
const productDescription = document.getElementById("productDescription");
const productPrice = document.getElementById("productPrice")

const loadProductInfo = (product) =>{
    productName.innerText=product.name;
    productDescription.innerText=product.description;
    productPrice.innerText=`$ ${formatCurrency(product.price)}`;
    productImage.setAttribute("src", product.image);

    if (product.size) {
        createSelectSize(product.size);
    }
};

const createSelectSize = (size) => {
    const selectContent = document.createElement("div");
    const select = document.createElement("select");

    // Lleno este elemento con un label
    selectContent.innerHTML = "<label class='product__size'>Size</label>";

    // Lleno el select con un input
    size.forEach(size => {
        select.innerHTML += `<option value="${size}">${size}</option>`;
    });
    
    // Añado el select dentro del selectContent
    selectContent.appendChild(select);
    // Añado el selectContent dentro de customContent
    customContent.appendChild(selectContent);

};

getProduct();