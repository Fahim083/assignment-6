// const categoryList = document.getElementById("category-list");
// const allTrees = document.getElementById("all-trees");
// let activeCategory = allTrees; // Default active = All trees
// const productGrid = document.querySelector(".tree-product");

// function setActive(element) {
//   // Remove red from currently active
//   if (activeCategory) {
//     activeCategory.classList.remove("text-white", "font-semibold","bg-[rgb(21,170,61)]","text-white");
//   }

//   // Add red to the clicked element
//   element.classList.add("text-white", "font-semibold","bg-[rgb(21,170,61)]","text-white");
//   activeCategory = element;
// }



// // Load categories from API
// async function loadCategories() {
  
//   categoryList.innerHTML = `<p class="text-gray-500 italic">Loading...</p>`;

//   try {
//     const response = await fetch("https://openapi.programming-hero.com/api/categories")
//     const categories =await response.json().then(data => data.categories)

//     categoryList.innerHTML = "";

//     categories.forEach(category => {
//       const p = document.createElement("p");
//       p.textContent = category.category_name || "Unknown";

//       // Base + hover styles
//       p.className =
//         "cursor-pointer px-2 py-1 rounded-md transition-colors hover:bg-[rgb(34,197,94)] hover:text-white";

//       // On click → set as active
//       p.addEventListener("click", () => {
//         setActive(p);
//         console.log(`Category clicked: ${category.category_name}`);
//         fetchProductsByCategory(category.id);
//       });

//       categoryList.appendChild(p);
//     });
//   } catch (error) {
//     console.error("Error loading categories:", error);
//     categoryList.innerHTML = `<p class="text-red-500">Failed to load categories</p>`;
//   }
// }

// // Handle "All trees" click
// allTrees.addEventListener("click", () => {
//   setActive(allTrees);
//   console.log("All trees clicked");
// });

// // Run it
// loadCategories();

// function renderProducts(products) {
//   productGrid.innerHTML = ""; // clear old products

//   if (!products || products.length === 0) {
//     productGrid.innerHTML = `<p class="col-span-3 text-center text-gray-500">No products found</p>`;
//     return;
//   }

//   products.forEach(product => {
//     const div = document.createElement("div");
//     div.className = "tree-card bg-white p-3 rounded-xl space-y-3 shadow";

//     div.innerHTML = `
//       <img src="${product.image}" class="w-full h-[120px] object-cover rounded-lg" alt="">
//       <h4 class="text-lg font-medium">${product.name}</h4>
//       <p class="line-clamp-3 text-gray-700">${product.description}</p>
//       <div class="flex justify-between items-center">
//         <p class="px-4 py-1 rounded-3xl bg-green-100 text-green-700 text-sm">${product.type}</p>
//         <p class="font-medium">${product.price}</p>
//       </div>
//       <button class="w-full bg-green-700 text-white rounded-3xl font-medium text-md py-2 hover:bg-green-800">Add to cart</button>
//     `;

//     productGrid.appendChild(div);
//   });
// }

// async function loadAllTrees() {
//   setActive(allTrees);
//   showProductLoading();
//   // categoryList.innerHTML = `<p class="text-gray-500 italic">Loading...</p>`;

//   try {
//     const response = await fetch("https://openapi.programming-hero.com/api/plants");
//     const products = await response.json().then(data => data.plants);
//     console.log(products);
//     renderProducts(products);
//   } catch (error) {
//     console.error("Error loading all trees:", error);
//     productGrid.innerHTML = `<p class="text-red-500">Failed to load products</p>`;
//   }
// }


// async function fetchProductsByCategory(id) {
//   showProductLoading();
//   try {
//     const response = await fetch(`https://openapi.programming-hero.com/api/category/${id}`);
//     const products = await response.json().then(data => data.plants);
//     console.log(products);
//     renderProducts(products);
//   } catch (error) {
//     console.error("Error fetching products:", error);
//     productGrid.innerHTML = `<p class="text-red-500">Failed to load products</p>`;
//   }
// }

// function showCategoryLoading() {
//   categoryList.innerHTML = `
//     <p class="text-gray-500 italic">Loading categories...</p>
//   `;
// }

// allTrees.addEventListener("click", loadAllTrees);
// loadAllTrees(); // show all trees by default


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
    div.className = "tree-card bg-white p-3 rounded-xl space-y-3 shadow";

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
  div.className = "fixed inset-0 bg-[rgba(255,255,255,.2)] flex items-center justify-center z-50";

  div.innerHTML = `
    <div class="bg-white rounded-xl w-96 p-6 relative">
      <button id="modal-close" class="absolute top-2 right-2 text-gray-500 hover:text-gray-700">&times;</button>
      <img src="${product?.image || 'https://via.placeholder.com/220x120'}" 
           alt="Plant Image" 
           class="w-full h-40 object-cover rounded-lg mb-4"/>
      <h2 class="text-2xl font-bold mb-2">${product?.name || 'Unknown'}</h2>
      <p class="text-gray-500 mb-1">Category: ${product?.type || 'N/A'}</p>
      <p class="font-semibold mb-2">Price: ${product?.price || 'N/A'}</p>
      <p class="text-gray-700">${product?.description || 'No description available'}</p>
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

// function showPlantModal(product) {
  
//   const existing = document.getElementById("plant-modal");
//   if (existing) existing.remove();

//   const modal = document.createElement("div");
//   modal.id = "plant-modal";
//   modal.className = "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50";

//   // Modal content
//   const content = document.createElement("div");
//   content.className = "bg-white rounded-xl w-96 p-6 relative";

  
//   const closeBtn = document.createElement("button");
//   closeBtn.innerHTML = "&times;";
//   closeBtn.className = "absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl";
//   closeBtn.addEventListener("click", () => modal.remove());

  
//   const img = document.createElement("img");
//   img.src = product?.image || "https://via.placeholder.com/220x120";
//   img.alt = "Plant Image";
//   img.className = "w-full h-40 object-cover rounded-lg mb-4";

//   const name = document.createElement("h2");
//   name.textContent = product?.name || "Unknown";
//   name.className = "text-2xl font-bold mb-2";

  
//   const category = document.createElement("p");
//   category.textContent = `Category: ${product?.type || "N/A"}`;
//   category.className = "text-gray-500 mb-1";


//   const price = document.createElement("p");
//   price.textContent = `Price: ${product?.price || "N/A"}`;
//   price.className = "font-semibold mb-2";


//   const desc = document.createElement("p");
//   desc.textContent = product?.description || "No description available";
//   desc.className = "text-gray-700";

  
//   content.appendChild(closeBtn);
//   content.appendChild(img);
//   content.appendChild(name);
//   content.appendChild(category);
//   content.appendChild(price);
//   content.appendChild(desc);

//   modal.appendChild(content);


//   modal.addEventListener("click", (e) => {
//     if (e.target === modal) modal.remove();
//   });

//   document.body.appendChild(modal);
// }
