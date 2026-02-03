<<<<<<< HEAD
let productos = [];


async function cargarProductos() {
  try {
    const response = await fetch("/data/data/productos.json");

    const tarjeta = document.getElementById("tarjetas");
    tarjeta.textContent = "Cargando...";

    const data = await response.json();

    tarjeta.textContent = "";

    productos = data;  

    console.log("Datos:", productos);

    cargarCategorias();       
    mostrarProductos(productos); 

  } catch (error) {
    console.error("Error cargando JSON:", error);
  }
}


function mostrarProductos(lista) {
  const div = document.getElementById("tarjetas");
  div.innerHTML = "";

  lista.forEach(p => {
    div.innerHTML += `
      <div class="card" style="width: 18rem;">
        <p><strong>${p.nombre}</strong></p>
        <p>Precio: ${p.precio} €</p>
        <p>Categoría: ${p.categoria}</p>
        <p>SKU: ${p.sku}</p>
      </div>
    `;
  });
}


function cargarCategorias() {
  const categoriasUnicas = [...new Set(productos.map(p => p.categoria))];
  const filtro = document.getElementById("filtroCategoria");

  categoriasUnicas.forEach(c => {
    const option = document.createElement("option");
    option.value = c;
    option.textContent = c;
    filtro.appendChild(option);
  });
}


const filtroCategoria = document.getElementById("filtroCategoria");

filtroCategoria.addEventListener("change", () => {
  const categoriaSeleccionada = filtroCategoria.value;

  if (categoriaSeleccionada === "") {
    mostrarProductos(productos);
  } else {
    const productosFiltrados = productos.filter(
      p => p.categoria === categoriaSeleccionada
    );
    mostrarProductos(productosFiltrados);
  }
});


=======
let productos = [];


async function cargarProductos() {
  try {
    const response = await fetch("/data/data/productos.json");

    const tarjeta = document.getElementById("tarjetas");
    tarjeta.textContent = "Cargando...";

    const data = await response.json();

    tarjeta.textContent = "";

    productos = data;  

    console.log("Datos:", productos);

    cargarCategorias();       
    mostrarProductos(productos); 

  } catch (error) {
    console.error("Error cargando JSON:", error);
  }
}


function mostrarProductos(lista) {
  const div = document.getElementById("tarjetas");
  div.innerHTML = "";

  lista.forEach(p => {
    div.innerHTML += `
      <div class="card" style="width: 18rem;">
        <p><strong>${p.nombre}</strong></p>
        <p>Precio: ${p.precio} €</p>
        <p>Categoría: ${p.categoria}</p>
        <p>SKU: ${p.sku}</p>
      </div>
    `;
  });
}


function cargarCategorias() {
  const categoriasUnicas = [...new Set(productos.map(p => p.categoria))];
  const filtro = document.getElementById("filtroCategoria");

  categoriasUnicas.forEach(c => {
    const option = document.createElement("option");
    option.value = c;
    option.textContent = c;
    filtro.appendChild(option);
  });
}


const filtroCategoria = document.getElementById("filtroCategoria");

filtroCategoria.addEventListener("change", () => {
  const categoriaSeleccionada = filtroCategoria.value;

  if (categoriaSeleccionada === "") {
    mostrarProductos(productos);
  } else {
    const productosFiltrados = productos.filter(
      p => p.categoria === categoriaSeleccionada
    );
    mostrarProductos(productosFiltrados);
  }
});


>>>>>>> d5f0a4d0878fe51a55bd968ef99f573f19e5b1c8
cargarProductos();