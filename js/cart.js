const cartSection = document.getElementById("cart");
const totalSection = document.getElementById("total");



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

const renderProduct = (product) =>{
    
    const newProduct=document.createElement("li");
    newProduct.className = "product product--cart";
    newProduct.innerHTML = `
    
    <img src="${product.image}" alt="" class="product__thumbnail">

            <div class="product__info">

                <h2 class="product__name">${product.name}</h2>
                <h3 class="product__price">$ ${formatCurrency(product.price)}</h3>
                <button class="product__cart">Remove</button>
            </div>
    `;

    cartSection.appendChild(newProduct);

    newProduct.addEventListener("click", e =>{

        if (e.target.tagName === "BUTTON") {

            removeProduct(product.id);
        }
    });

};

const renderMyCart = () =>{

    const cart = getMyCart();
    let total = 0;
    cartSection.innerHTML = "";
    cart.forEach(product=>{
        total += product.price;
        renderProduct(product);
    });

    totalSection.innerText= `Total: $ ${formatCurrency(total)}`;
};

renderMyCart();