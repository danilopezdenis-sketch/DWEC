<<<<<<< HEAD
let productos = []; 


const productList = document.getElementById('product-list');
const categoryFilter = document.getElementById('categoryFilter');
const brandFilter = document.getElementById('brandFilter');
const priceSort = document.getElementById('priceSort');


fetch('products.json')
  .then(response => {
    if (!response.ok) throw new Error("Error al cargar productos");
    return response.json();
  })
  .then(data => {
    productos = data;
    renderizarProductos(productos);
    filtros(productos);
  })
  .catch(error => {
    productList.innerHTML = `<p>Error al cargar productos: ${error.message}</p>`;
    console.error(error);
  });


function renderizarProductos(productArray) {
  productList.innerHTML = "";
  if (productArray.length === 0) {
    productList.innerHTML = "<p>No hay productos que coincidan con los filtros.</p>";
    return;
  }

  productArray.forEach(product => {
    const div = document.createElement('div');
    div.innerHTML = `
      <h3>${product.name}</h3>
      <img src="${product.imageUrl}" alt="${product.name}" width="150">
      <p>Precio: $${product.price.toFixed(2)}</p>
      <p>Categoría: ${product.category}</p>
      <p>Marca: ${product.brand}</p>
    `;
    productList.appendChild(div);
  });
}



function filtros(products) {
  const categories = [...new Set(products.map(p => p.category))];
  const brands = [...new Set(products.map(p => p.brand))];

  categories.forEach(cat => {
    const option = document.createElement('option');
    option.value = cat;
    option.textContent = cat;
    categoryFilter.appendChild(option);
  });

  brands.forEach(brand => {
    const option = document.createElement('option');
    option.value = brand;
    option.textContent = brand;
    brandFilter.appendChild(option);
  });
}



function actualizarCatalogo() {
  let filtered = [...productos];

  const selectedCategory = categoryFilter.value;
  const selectedBrand = brandFilter.value;
  const selectedSort = priceSort.value;

  if (selectedCategory !== "all") {
    filtered = filtered.filter(p => p.category === selectedCategory);
  }

  if (selectedBrand !== "all") {
    filtered = filtered.filter(p => p.brand === selectedBrand);
  }

  if (selectedSort === "asc") {
    filtered.sort((a, b) => a.price - b.price);
  } else if (selectedSort === "desc") {
    filtered.sort((a, b) => b.price - a.price);
  }

  renderizarProductos(filtered);
}




categoryFilter.addEventListener('change', actualizarCatalogo);
brandFilter.addEventListener('change', actualizarCatalogo);
priceSort.addEventListener('change', actualizarCatalogo);
=======
let productos = []; 


const productList = document.getElementById('product-list');
const categoryFilter = document.getElementById('categoryFilter');
const brandFilter = document.getElementById('brandFilter');
const priceSort = document.getElementById('priceSort');


fetch('products.json')
  .then(response => {
    if (!response.ok) throw new Error("Error al cargar productos");
    return response.json();
  })
  .then(data => {
    productos = data;
    renderizarProductos(productos);
    filtros(productos);
  })
  .catch(error => {
    productList.innerHTML = `<p>Error al cargar productos: ${error.message}</p>`;
    console.error(error);
  });


function renderizarProductos(productArray) {
  productList.innerHTML = "";
  if (productArray.length === 0) {
    productList.innerHTML = "<p>No hay productos que coincidan con los filtros.</p>";
    return;
  }

  productArray.forEach(product => {
    const div = document.createElement('div');
    div.innerHTML = `
      <h3>${product.name}</h3>
      <img src="${product.imageUrl}" alt="${product.name}" width="150">
      <p>Precio: $${product.price.toFixed(2)}</p>
      <p>Categoría: ${product.category}</p>
      <p>Marca: ${product.brand}</p>
    `;
    productList.appendChild(div);
  });
}



function filtros(products) {
  const categories = [...new Set(products.map(p => p.category))];
  const brands = [...new Set(products.map(p => p.brand))];

  categories.forEach(cat => {
    const option = document.createElement('option');
    option.value = cat;
    option.textContent = cat;
    categoryFilter.appendChild(option);
  });

  brands.forEach(brand => {
    const option = document.createElement('option');
    option.value = brand;
    option.textContent = brand;
    brandFilter.appendChild(option);
  });
}



function actualizarCatalogo() {
  let filtered = [...productos];

  const selectedCategory = categoryFilter.value;
  const selectedBrand = brandFilter.value;
  const selectedSort = priceSort.value;

  if (selectedCategory !== "all") {
    filtered = filtered.filter(p => p.category === selectedCategory);
  }

  if (selectedBrand !== "all") {
    filtered = filtered.filter(p => p.brand === selectedBrand);
  }

  if (selectedSort === "asc") {
    filtered.sort((a, b) => a.price - b.price);
  } else if (selectedSort === "desc") {
    filtered.sort((a, b) => b.price - a.price);
  }

  renderizarProductos(filtered);
}




categoryFilter.addEventListener('change', actualizarCatalogo);
brandFilter.addEventListener('change', actualizarCatalogo);
priceSort.addEventListener('change', actualizarCatalogo);
>>>>>>> d5f0a4d0878fe51a55bd968ef99f573f19e5b1c8
