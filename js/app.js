const products = [
    {
        id: 1,
        name: "Wall Connector - 24 ft",
        price: "$500",
        image: "https://www.tesla.com/ns_videos/commerce/content/dam/tesla/CAR_ACCESSORIES/MODEL_S/CHARGING_ADAPTERS/1457768-01-F_0.jpg",
        description: "Wall Connector is the most convenient charging solution for houses, apartments, hospitality properties and workplaces.",
        type: "charging"
    },
    {
        id: 2,
        name: "Model S Rack Roof",
        price: "$450",
        image: "https://www.tesla.com/ns_videos/commerce/content/dam/tesla/CAR_ACCESSORIES/MODEL_S/EXTERIOR/1494684-00-A_1.jpg",
        description: "Model S Roof Rack – Glass Roof was designed and engineered from the ground up for maximum aerodynamic efficiency, minimal interior noise and impact to range.",
        type: "vAccesories"
    },
    {
        id: 3,
        name: "Stainless Steel Water Bottle",
        price: "$30",
        image: "https://www.tesla.com/ns_videos/commerce/content/dam/tesla/LIFESTYLE/ACCESSORIES_COLLECTIBLES/DRINKWARE/100045802_0.jpg",
        description: "The Tesla Stainless Steel Water Bottle is a conveniently sized, insulated water bottle that holds 600mL / 20fl oz of liquid. It is BPA free, vacuum insulated, double walled, 18/8 stainless steel and perfect for cold or hot liquids.",
        type: "lifestyle"
    },
    {
        id: 4,
        name: "Men's Corp Jacket",
        price: "$90",
        image: "https://www.tesla.com/ns_videos/commerce/content/dam/tesla/LIFESTYLE/OUTERWEAR/JACKETS/5645685-00-A_0.jpg",
        description: "Fully customized and uniquely styled, the Men's Corp Jacket features a silicone-printed T logo on the left chest and prominent Tesla wordmark across the back.",
        type: "menClothing"
    },
    {
        id: 5,
        name: "Women's Zip-Up Track Hoodie",
        price: "$60",
        image: "https://www.tesla.com/ns_videos/commerce/content/dam/tesla/LIFESTYLE/ACTIVEWEAR/TRAINING/5645669-00-A_0.jpg",
        description: "Featuring soft fleece and a jersey-lined hood, the Women’s Zip-Up Track Hoodie delivers the ultimate coverage and comfort in a standard fit. Made with two layers of soft cotton with a polyester yarn in interlock stitch, the light and comfortable fabric is ideal for both training and leisure.",
        type: "menClothing"
    },
    {
        id: 6,
        name: "Corded Mobile Connector",
        price: "$520",
        image: "https://www.tesla.com/ns_videos/commerce/content/dam/tesla/CAR_ACCESSORIES/MODEL_X/CHARGING_ADAPTERS/1106293-00-A_0.jpg",
        description: "The Corded Mobile Connector features a NEMA 14-50 plug and improved charging speeds in comparison to the Gen 2 Mobile Connector with NEMA 5-15 Adapter. ",
        type: "charging"
    }
    
];

const cart = [];

const productSection = document.getElementById("products");

const productTemplate = (item) =>{

    const product = document.createElement("a");
    product.className = "product";

    product.setAttribute("href",`./product.html?id=${item.id}`);

    const isAdded= cart.some(productCart => productCart.id === item.id);

    let buttonHtml;

    if (isAdded) {
        buttonHtml = `<button class="product__cart" disabled>
        <img src="./resources/cart.svg" alt="Cart" class="product__button">
    </button>`
    }else{
        buttonHtml = `<button class="product__cart">
        <img src="./resources/cart.svg" alt="Cart" class="product__button">
    </button>`
    };

    product.innerHTML = `
    <img src="${item.image}" class="product__image">
                <div class="product__description">
                    <div class="product__text">
                        <h3 class="product__name">${item.name}</h3>
                        <h3 class="product__price">${item.price}</h3>
                    </div>
                    ${buttonHtml}
                </div>
    `;

    productSection.appendChild(product);
    
    const productCart = product.querySelector(".product__cart");
    productCart.addEventListener("click", e =>{
        e.preventDefault();
        const productAdded = {
            id: item.id,
            name: item.name,
            image: item.image
        };
        cart.push(productAdded);
        productCart.setAttribute("disabled", true);
        alert("Product Added");
    });
};

products.forEach(product =>{
    productTemplate(product);
});