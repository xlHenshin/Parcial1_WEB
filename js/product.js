const url = window.location.search;
const searchParams = new URLSearchParams(url);

const productId = searchParams.get("id");

const product = products.find(product=>product.id==productId);

const productImage = document.getElementById("productImage");
const productName = document.getElementById("productName");
const productDescription = document.getElementById("productDescription");
const productPrice = document.getElementById("productPrice")

productName.innerText=product.name;
productDescription.innerText=product.description;
productPrice.innerText=`$ ${formatCurrency(product.price)}`;
productImage.setAttribute("src", product.image);

