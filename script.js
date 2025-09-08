const categoryList = document.getElementById("category-list");
const allTrees = document.getElementById("all-trees");
let activeCategory = allTrees; // Default active = All trees
const productGrid = document.querySelector(".tree-product");
const body = document.querySelector("body");

function setActive(element) {
  if (activeCategory) {
    activeCategory.classList.remove("text-white", "font-semibold", "bg-[rgb(21,170,61)]");
  }
  element.classList.add("text-white", "font-semibold", "bg-[rgb(21,170,61)]");
  activeCategory = element;
}

function showCategoryLoading() {
  categoryList.innerHTML = `<p class="text-gray-500 italic">Loading...</p>`;
}

function showProductLoading() {
  productGrid.innerHTML = `<p class="col-span-3 text-center text-gray-500 italic">Loading...</p>`;
}

async function loadCategories() {
  showCategoryLoading();

  try {
    const response = await fetch("https://openapi.programming-hero.com/api/categories");
    const categories = await response.json().then(data => data.categories);

    categoryList.innerHTML = "";

    categories.forEach(category => {
      const p = document.createElement("p");
      p.textContent = category.category_name || "Unknown";
      p.className = "cursor-pointer px-2 py-1 rounded-md transition-colors hover:bg-[rgb(34,197,94)] hover:text-white";

      p.addEventListener("click", () => {
        setActive(p);
        fetchProductsByCategory(category.id);
      });

      categoryList.appendChild(p);
    });
  } catch (error) {
    console.error("Error loading categories:", error);
    categoryList.innerHTML = `<p class="text-red-500">Failed to load categories</p>`;
  }
}

function renderProducts(products) {
  productGrid.innerHTML = "";

  if (!products || products.length === 0) {
    productGrid.innerHTML = `<p class="col-span-3 text-center text-gray-500">No products found</p>`;
    return;
  }

  products.forEach(product => {
    console.log(product?.image);
    const div = document.createElement("div");
    div.className = "tree-card bg-white p-3 rounded-xl h-[365px] space-y-3 shadow";

    div.innerHTML = `
     <img src="${product.image}"
     class="w-[220px] h-[120px] object-cover rounded-lg" 
     alt="tree image">

      <h4 class="text-lg font-medium">${product.name}</h4>
      <p class="line-clamp-3 text-gray-700">${product.description}</p>
      <div class="flex justify-between items-center">
        <p class="px-4 py-1 rounded-3xl bg-green-100 text-green-700 text-sm">${product.category}</p>
        <p class="font-medium">$ ${product.price}</p>
      </div>
      <button class="w-full bg-green-700 text-white rounded-3xl font-medium text-md py-2 hover:bg-green-800 hover:cursor-pointer"">Add to cart</button>
    `;
    div.querySelector("h4").addEventListener("click", () => {
      console.log(`Product clicked: ${product.name}`)
      showPlantModal(product);
    }
    );
    const addButton = div.querySelector("button");
    addButton.addEventListener("click", () => addToCart(product));
    productGrid.appendChild(div);
  });
}

async function loadAllTrees() {
  setActive(allTrees);
  showProductLoading();

  try {
    const response = await fetch("https://openapi.programming-hero.com/api/plants");
    const products = await response.json().then(data => data.plants);
    renderProducts(products);
  } catch (error) {
    console.error("Error loading all trees:", error);
    productGrid.innerHTML = `<p class="text-red-500">Failed to load products</p>`;
  }
}


async function fetchProductsByCategory(id) {
  showProductLoading();

  try {
    const response = await fetch(`https://openapi.programming-hero.com/api/category/${id}`);
    const products = await response.json().then(data => data.plants);
    renderProducts(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    productGrid.innerHTML = `<p class="text-red-500">Failed to load products</p>`;
  }
}

allTrees.addEventListener("click", loadAllTrees);

loadCategories();
loadAllTrees();


function showPlantModal(product) {
  // Remove old modal
  const existing = document.getElementById("plant-modal");
  if (existing) existing.remove();

  const div = document.createElement("div");
  div.id = "plant-modal";
  div.className = "fixed inset-0 bg-[rgba(108,108,108,0.6)] flex items-center justify-center z-50";

  div.innerHTML = `
    <div class="bg-white rounded-xl w-[500px] p-6 pb-10 space-y-3 relative">
    <h2 class="text-2xl font-bold mb-2">${product?.name || 'Unknown'}</h2>
    <img src="${product?.image}"
    alt="Plant Image" 
    class="w-full h-40 object-cover rounded-lg mb-4"/>
    <p class="text-gray-500 mb-1">Category: ${product?.category || 'N/A'}</p>
    <p class="font-semibold mb-2">Price: ${product?.price || 'N/A'}</p>
    <p class="text-gray-700">${product?.description || 'No description available'}</p>
    <button id="modal-close" class="absolute right-5 text-gray-500 hover:text-gray-700 hover:cursor-pointer">Close</button>
    </div>
  `;

  document.body.appendChild(div);

  // Close button
  div.querySelector("#modal-close").addEventListener("click", () => div.remove());

  //Click outside to close
  div.addEventListener("click", (e) => {
    if (e.target === div) div.remove();
  });
}

const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");


let cart = [];

function addToCart(product) {
  cart.push(product);
  renderCart();
  alert(`${product.name} added to cart!`);
}

function removeFromCart(index) {
  cart.splice(index, 1);
  renderCart();
}

function renderCart() {
  cartItems.innerHTML = "";
  cart.forEach((product, index) => {
    const div = document.createElement("div");
    div.className = "flex justify-between items-center py-2 px-3 bg-[rgba(220,252,231,1)] rounded-lg mt-4";

    div.innerHTML = `
      <div class="flex flex-col gap-1">
        <h4 class="font-medium">${product.name}</h4>
        <p class="text-gray-500">$ ${product.price}</p>
      </div>
      <div class="cursor-pointer text-red-500 font-bold">❌</div>
    `;

    div.querySelector("div:last-child").addEventListener("click", () => removeFromCart(index));

    cartItems.appendChild(div);
  });

  const total = cart.reduce((sum, item) => sum + Number(item.price || 0), 0);
  cartTotal.textContent = "$ " + total;
}



