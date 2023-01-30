let currentProducts = products;
let categories = new Set();
const cart= [];
const CART_LOCALSTORAGE_KEY = "cart";

const productSection = document.querySelector(".products");

const renderProducts = (items) => {
  productSection.innerHTML = "";

  items.forEach((value) => {
    const newProduct = document.createElement("div");
    newProduct.className = `productsItems ${value.sale ? "sale" : " "}`;
    newProduct.innerHTML = `
        <img src="${value.photo}" alt="${value.alt}" width=100% height=100%/>
        <p class="productsTitle">${value.name}</p>
        <p class="productsDescription">${value.description}</p>
        <div class="price">
            <span class="priceStandard">${value.price.toFixed(2)} zł</span>
            <span class="priceSale">${(value.price - value.saleAmount).toFixed(
              2
            )} zł</span>
        </div>
        <button id="addToCart" class="productAdd">Dodaj do Koszyka</button>
        <p class="saleInfo">Promocja!</p>
        `;

    newProduct.addEventListener("click", (e) => {
      if (e.target.id === "addToCart") {
        addCart(value.id, value.quantity);
        totalCost(value);
      }
    });

    const addCart = (id, quantity) =>{
        const current = localStorage.getItem(CART_LOCALSTORAGE_KEY);
        const productToAdd = products.find((value) => value.id === id);

        let newCart = [];

        if(current) {
            const cart = JSON.parse(current);
            const existingProduct = cart.find((value) => value.id === id);
            
            if (existingProduct) {
                newCart = cart.map((value) => 
                value.id === id
                    ? {...value, quantity: (value.quantity += quantity)}
                    : value
                );
            } else {
                newCart = [...cart, {...productToAdd, quantity}];
            }
        } else {
            newCart = [{...productToAdd, quantity}];
        }
        localStorage.setItem(CART_LOCALSTORAGE_KEY, JSON.stringify(newCart));
    };

    productSection.appendChild(newProduct);
  });
  
};

const renderCategories = (items) => {
  for (let i = 0; i < items.length; i++) {
    categories.add(items[i].category);
  }

  const categoriesItems = document.querySelector(".categoriesItems");

  categories = ["Wszystkie", ...categories];

  categories.forEach((category, index) => {
    const newCategory = document.createElement("button");
    newCategory.innerHTML = category;

    newCategory.dataset.category = category;

    index === 0 ? newCategory.classList.add("active") : "";

    categoriesItems.appendChild(newCategory);
  });
};

document.onload = renderProducts(currentProducts);
document.onload = renderCategories(currentProducts);

const categoriesButtons = document.querySelectorAll(".categoriesItems button");

categoriesButtons.forEach((buttonCategories) =>
  buttonCategories.addEventListener("click", (e) => {
    const category = e.target.dataset.category;

    categoriesButtons.forEach((buttonCategories) =>
      buttonCategories.classList.remove("active")
    );
    e.target.classList.add("active");

    currentProducts = products;

    if (category === "Wszystkie") {
      currentProducts = products;
    } else {
      currentProducts = currentProducts.filter(
        (product) => product.category === category
      );
    }

    renderProducts(currentProducts);
  })
);

const searchBarInput = document.querySelector(".searchBarInput");

searchBarInput.addEventListener("input", (e) => {
  const search = e.target.value;

  const found = currentProducts.filter((product) => {
    if (product.name.toLowerCase().includes(search.toLowerCase())) {
      return product;
    }
  });
  const empty = document.querySelector(".empty");
  found.length === 0
    ? empty.classList.add("active")
    : empty.classList.remove("active");
  renderProducts(found);
});

function totalCost(total){
    let cartCost = localStorage.getItem('totalCost');
    if(cartCost != null){
        cartCost= parseInt(cartCost);
        total.pirce= parseInt(total.price);
        cartSum = total.pirce - (total.saleAmount ? total.saleAmount : 0);
        cartCost += cartSum;
        localStorage.setItem("totalCost", cartCost);
    } else {
        total.pirce= parseInt(total.price);
        cartSum = total.pirce - (total.saleAmount ? total.saleAmount : 0);
        cartCost = cartSum;
        localStorage.setItem("totalCost", cartSum);
    }
    const cartAmount = document.querySelector(".cartAmountSpan");
    cartAmount.innerHTML = `${cartCost} zł`;
};

function displayCart(){
  let cartItems = localStorage.getItem("cart");
  cartItems = JSON.parse(cartItems);
  console.log(cartItems);
  let productContainer = document.querySelector(".containterForProucts");
  if( cartItems && productContainer ) {
    console.log("running");
  }
}



displayCart();