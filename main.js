let currentProducts = products;
let categories = new Set();

const productSection = document.querySelector('.products');

const renderProducts = (items) => {
    productSection.innerHTML="";
    for(let i=0; i <items.length; i++){
        const newProduct = document.createElement("div");
        newProduct.className = `productsItems ${items[i].sale ? "sale": " "}`;
        newProduct.innerHTML=`
        <img src="${items[i].photo}" alt="${items[i].alt}" width=100% height=100%/>
        <p class="productsTitle">${items[i].name}</p>
        <p class="productsDescription">${items[i].description}</p>
        <div class="price">
            <span class="priceStandard">${items[i].price.toFixed(2)} zł</span>
            <span class="priceSale">${(items[i].price - items[i].saleAmount).toFixed(2)} zł</span>
        </div>
        <button  dataPrice="${items[i].price}" class="productAdd">Dodaj do Koszyka</button>
        <p class="saleInfo">Promocja!</p>
        `
        productSection.appendChild(newProduct);
    }
};

const renderCategories = (items) => {
    for(let i = 0; i < items.length; i++){
        categories.add(items[i].category);
    }

    const categoriesItems = document.querySelector(".categoriesItems");
    
    categories = ["Wszystkie",...categories];
    
    categories.forEach((category, index) => {
        const newCategory = document.createElement("button");
        newCategory.innerHTML = category;

        newCategory.dataset.category = category;
        
        index === 0 ? newCategory.classList.add("active") : "";

        categoriesItems.appendChild(newCategory);
    })
};


document.onload = renderProducts(currentProducts);
document.onload = renderCategories(currentProducts);

const categoriesButtons = document.querySelectorAll(".categoriesItems button");

categoriesButtons.forEach((buttonCategories) =>
    buttonCategories.addEventListener("click", (e) => {
        const category = e.target.dataset.category;

        categoriesButtons.forEach((buttonCategories) => buttonCategories.classList.remove("active"));
        e.target.classList.add("active");

        currentProducts = products;

        if(category === 'Wszystkie'){
            currentProducts = products;
        } else {
            currentProducts = currentProducts.filter((product) => product.category === category
            );
        }
        
        renderProducts(currentProducts);
        })
);

const searchBarInput = document.querySelector(".searchBarInput");

searchBarInput.addEventListener('input',(e) => {
   const search = e.target.value;

   const found = currentProducts.filter((product) => {
    if(product.name.toLowerCase().includes(search.toLowerCase()
    )){
        return product;
    }
   });
    const empty = document.querySelector(".empty");
    found.length === 0 ? empty.classList.add("active"): empty.classList.remove("active");
    renderProducts(found);
});


const addToBasketButtons = document.querySelectorAll(".productAdd"
);

const addToCart = (e) => {
    const priceProduct = btn.getAttribute('dataprice')
    console.log(e.target);
    console.log(priceProduct);
};

addToBasketButtons.forEach((btn) => btn.addEventListener("click", addToCart));