let currentProducts = products;
let categories = new Set();
const cart= [];

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
        addToCart(value.id);
      }
    });

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

const addToCart = (id) => {
  cart.push(currentProducts.at(id));
  const cartSum = cart.reduce((sum, product) => {
    return (sum += product.price - (product.saleAmount ? product.saleAmount : 0));
  }, 0);
  
  const cartAmount = document.querySelector(".cartAmountSpan");
  cartAmount.innerHTML = `${cartSum.toFixed(2)} zł`;
};