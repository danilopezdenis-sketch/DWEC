let productos = [];
let productosFiltrados = [];


document.addEventListener("DOMContentLoaded", () => {

 const ultimaVisita = getCookie("ultimaVisita");

  if (ultimaVisita) {
    const banner = document.getElementById("banner-visita");
    const texto = document.getElementById("texto-visita");

    texto.textContent = `Bienvenido de nuevo. Tu última visita fue el ${decodeURIComponent(ultimaVisita)}`;
    banner.style.display = "flex";
  }

  const ahora = new Date().toLocaleString();
  setCookie("ultimaVisita", encodeURIComponent(ahora), 30);

  document.getElementById("cerrar-banner").addEventListener("click", () => {
    document.getElementById("banner-visita").style.display = "none";
  });




  const tema = sessionStorage.getItem("tema") || "claro";
  document.body.classList.add(tema);

  cargarProductos();
  mostrarCarrito();
  agregarEventListeners();
});


async function cargarProductos() {
  const mensaje = document.getElementById("mensaje-cargando");

  try {
    mensaje.style.display = "block";

    const respuesta = await fetch("../data/productos.json");
    productos = await respuesta.json();
    productosFiltrados = [...productos];

    mensaje.style.display = "none";

    mostrarProductos(productosFiltrados);
    poblarCategorias();
  } catch (error) {
    console.error("Error al cargar productos:", error);
  }
}


function mostrarProductos(lista) {
  const contenedor = document.getElementById("contenedor-productos");
  contenedor.innerHTML = "";

  lista.forEach(producto => {
    const tarjeta = document.createElement("div");
    tarjeta.classList.add("tarjeta");

    tarjeta.innerHTML = `
      <h3>${producto.nombre}</h3>
      <p>Precio: ${producto.precio} €</p>
      <p>Stock: ${producto.stock}</p>
      <p>Categoría: ${producto.categoria}</p>
      <button class="btn-carrito" data-id="${producto.id}">
        Añadir al carrito
      </button>
    `;

    contenedor.appendChild(tarjeta);
  });

  document.querySelectorAll(".btn-carrito").forEach(boton => {
    boton.addEventListener("click", () => {
      const id = Number(boton.dataset.id);
      añadirAlCarrito(id);
    });
  });
}


function poblarCategorias() {
  const select = document.getElementById("filtro-categoria");
  const categorias = [...new Set(productos.map(p => p.categoria))];

  categorias.forEach(cat => {
    const option = document.createElement("option");
    option.value = cat;
    option.textContent = cat;
    select.appendChild(option);
  });
}


function agregarEventListeners() {
  const select = document.getElementById("filtro-categoria");

  select.addEventListener("change", () => {
    const valor = select.value;
    productosFiltrados =
      valor === "Todas"
        ? [...productos]
        : productos.filter(p => p.categoria === valor);

    mostrarProductos(productosFiltrados);
  });

  document.getElementById("orden-menor").addEventListener("click", () => {
    productosFiltrados.sort((a, b) => a.precio - b.precio);
    mostrarProductos(productosFiltrados);
  });

  document.getElementById("orden-mayor").addEventListener("click", () => {
    productosFiltrados.sort((a, b) => b.precio - a.precio);
    mostrarProductos(productosFiltrados);
  });

  document.getElementById("claro").addEventListener("click", () => {
    document.body.classList.remove("oscuro");
    document.body.classList.add("claro");
    sessionStorage.setItem("tema", "claro");
  });

  document.getElementById("oscuro").addEventListener("click", () => {
    document.body.classList.remove("claro");
    document.body.classList.add("oscuro");
    sessionStorage.setItem("tema", "oscuro");
  });

  document.getElementById("vaciarCarrito").addEventListener("click", () => {
    localStorage.removeItem("carrito");
    mostrarCarrito();
  });
}


function añadirAlCarrito(idProducto) {
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  const item = carrito.find(p => p.id === idProducto);

  if (item) {
    item.cantidad++;
  } else {
    carrito.push({ id: idProducto, cantidad: 1 });
  }

  localStorage.setItem("carrito", JSON.stringify(carrito));
  mostrarCarrito();
}

function mostrarCarrito() {
  const contenedor = document.getElementById("contenedor-carrito");
  contenedor.innerHTML = "";

  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  if (carrito.length === 0) {
    contenedor.innerHTML = "<p>Carrito vacío</p>";
    return;
  }

  carrito.forEach(item => {
    const producto = productos.find(p => p.id === item.id);
    if (!producto) return;

    const div = document.createElement("div");
    div.innerHTML = `
      <p>${producto.nombre}</p>
      <p>Cantidad: ${item.cantidad}</p>
    `;

    contenedor.appendChild(div);
  });
}

function getCookie(nombre) {
  const cookies = document.cookie.split("; ");
  const cookie = cookies.find(c => c.startsWith(nombre + "="));
  return cookie ? cookie.split("=")[1] : null;
}

function setCookie(nombre, valor, dias) {
  const fecha = new Date();
  fecha.setTime(fecha.getTime() + dias * 24 * 60 * 60 * 1000);
  document.cookie = `${nombre}=${valor}; expires=${fecha.toUTCString()}; path=/`;
}

