const products = [
    {
        name: "Wall Connector - 24 ft",
        price: "$500",
        image: "https://www.tesla.com/ns_videos/commerce/content/dam/tesla/CAR_ACCESSORIES/MODEL_S/CHARGING_ADAPTERS/1457768-01-F_0.jpg",
        description: "Wall Connector is the most convenient charging solution for houses, apartments, hospitality properties and workplaces.",
        type: "charging"
    },
    {
        name: "Model S Rack Roof",
        price: "$450",
        image: "https://www.tesla.com/ns_videos/commerce/content/dam/tesla/CAR_ACCESSORIES/MODEL_S/EXTERIOR/1494684-00-A_1.jpg",
        description: "Model S Roof Rack – Glass Roof was designed and engineered from the ground up for maximum aerodynamic efficiency, minimal interior noise and impact to range.",
        type: "vAccesories"
    }
    
];

const productSection = document.getElementById("products");

const productTemplate = (item) =>{

    const product = document.createElement("a");
    product.className = "product"

    product.innerHTML = `
    <img src="${item.image}" class="product__image">
                <div class="product__description">
                    <div class="product__text">
                        <h3 class="product__name">${item.name}</h3>
                        <h3 class="product__price">${item.price}</h3>
                    </div>
                    <button class="product__button">
                        <img src="./resources/cart.svg" alt="Cart" class="product__cart">
                    </button>
                </div>
    `;

    productSection.appendChild(product);
};

products.forEach(product =>{
    productTemplate(product);
});