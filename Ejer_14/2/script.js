<<<<<<< HEAD
let productos = [];
let productosFiltrados = [];
const KEY_CARRITO = "carrito";

document.addEventListener("DOMContentLoaded", () => {
    const temaGuardado = sessionStorage.getItem("tema");
    if (temaGuardado === "oscuro") {
        document.body.classList.replace("claro", "oscuro");
    } else {
        document.body.classList.replace("oscuro", "claro");
    }
});

async function cargarProductos() {
    const contenedor = document.getElementById("contenedor-productos");
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
        contenedor.innerHTML = "<p>Error al cargar productos.</p>";
        console.error("Error al cargar productos:", error);
    }
}

function mostrarProductos(lista) {
    const contenedor = document.getElementById("contenedor-productos");
    contenedor.innerHTML = "";

    if (lista.length === 0) {
        contenedor.innerHTML = "<p>No hay productos para mostrar.</p>";
        return;
    }

    lista.forEach(producto => {
        const tarjeta = document.createElement("div");
        tarjeta.classList.add("tarjeta");
        tarjeta.innerHTML = `
            <h3>${producto.nombre}</h3>
            <p>Precio: $${producto.precio.toFixed(2)}</p>
            <p>Stock: ${producto.stock}</p>
            <p>Categoría: ${producto.categoria}</p>
            <button data-id="${producto.id}">Añadir al carrito</button>
        `;
        contenedor.appendChild(tarjeta);
    });

    contenedor.querySelectorAll("button").forEach(btn => {
        btn.addEventListener("click", (e) => {
            const id = parseInt(e.target.dataset.id);
            agregarAlCarrito(id);
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
    const btnMenor = document.getElementById("orden-menor");
    const btnMayor = document.getElementById("orden-mayor");

    select.addEventListener("change", () => {
        const valor = select.value;
        productosFiltrados = valor === "Todas"
            ? [...productos]
            : productos.filter(p => p.categoria === valor);
        mostrarProductos(productosFiltrados);
    });

    btnMenor.addEventListener("click", () => {
        productosFiltrados.sort((a, b) => a.precio - b.precio);
        mostrarProductos(productosFiltrados);
    });

    btnMayor.addEventListener("click", () => {
        productosFiltrados.sort((a, b) => b.precio - a.precio);
        mostrarProductos(productosFiltrados);
    });

    document.getElementById("claro").addEventListener("click", () => {
        document.body.classList.replace("oscuro", "claro");
        sessionStorage.setItem("tema", "claro");
    });

    document.getElementById("oscuro").addEventListener("click", () => {
        document.body.classList.replace("claro", "oscuro");
        sessionStorage.setItem("tema", "oscuro");
    });

    document.getElementById("vaciar-carrito").addEventListener("click", () => {
        localStorage.removeItem(KEY_CARRITO);
        mostrarCarrito();
    });
}

agregarEventListeners();

function agregarAlCarrito(id) {
    let carrito = JSON.parse(localStorage.getItem(KEY_CARRITO)) || [];

    const index = carrito.findIndex(item => item.id === id);
    if (index >= 0) {
        carrito[index].cantidad += 1;
    } else {
        carrito.push({ id, cantidad: 1 });
    }

    localStorage.setItem(KEY_CARRITO, JSON.stringify(carrito));
    mostrarCarrito();
}

function mostrarCarrito() {
    const contenedor = document.getElementById("contenedor-carrito");
    contenedor.innerHTML = "";

    const carrito = JSON.parse(localStorage.getItem(KEY_CARRITO)) || [];

    if (carrito.length === 0) {
        contenedor.innerHTML = "<p>Carrito vacío</p>";
        return;
    }

    carrito.forEach(item => {
        const producto = productos.find(p => p.id === item.id);
        const div = document.createElement("div");
        div.innerHTML = `
            <p>${producto.nombre}</p>
            <p>Cantidad: ${item.cantidad}</p>
        `;
        contenedor.appendChild(div);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    cargarProductos().then(() => mostrarCarrito());
});
=======
let productos = [];
let productosFiltrados = [];
const KEY_CARRITO = "carrito";

document.addEventListener("DOMContentLoaded", () => {
    const temaGuardado = sessionStorage.getItem("tema");
    if (temaGuardado === "oscuro") {
        document.body.classList.replace("claro", "oscuro");
    } else {
        document.body.classList.replace("oscuro", "claro");
    }
});

async function cargarProductos() {
    const contenedor = document.getElementById("contenedor-productos");
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
        contenedor.innerHTML = "<p>Error al cargar productos.</p>";
        console.error("Error al cargar productos:", error);
    }
}

function mostrarProductos(lista) {
    const contenedor = document.getElementById("contenedor-productos");
    contenedor.innerHTML = "";

    if (lista.length === 0) {
        contenedor.innerHTML = "<p>No hay productos para mostrar.</p>";
        return;
    }

    lista.forEach(producto => {
        const tarjeta = document.createElement("div");
        tarjeta.classList.add("tarjeta");
        tarjeta.innerHTML = `
            <h3>${producto.nombre}</h3>
            <p>Precio: $${producto.precio.toFixed(2)}</p>
            <p>Stock: ${producto.stock}</p>
            <p>Categoría: ${producto.categoria}</p>
            <button data-id="${producto.id}">Añadir al carrito</button>
        `;
        contenedor.appendChild(tarjeta);
    });

    contenedor.querySelectorAll("button").forEach(btn => {
        btn.addEventListener("click", (e) => {
            const id = parseInt(e.target.dataset.id);
            agregarAlCarrito(id);
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
    const btnMenor = document.getElementById("orden-menor");
    const btnMayor = document.getElementById("orden-mayor");

    select.addEventListener("change", () => {
        const valor = select.value;
        productosFiltrados = valor === "Todas"
            ? [...productos]
            : productos.filter(p => p.categoria === valor);
        mostrarProductos(productosFiltrados);
    });

    btnMenor.addEventListener("click", () => {
        productosFiltrados.sort((a, b) => a.precio - b.precio);
        mostrarProductos(productosFiltrados);
    });

    btnMayor.addEventListener("click", () => {
        productosFiltrados.sort((a, b) => b.precio - a.precio);
        mostrarProductos(productosFiltrados);
    });

    document.getElementById("claro").addEventListener("click", () => {
        document.body.classList.replace("oscuro", "claro");
        sessionStorage.setItem("tema", "claro");
    });

    document.getElementById("oscuro").addEventListener("click", () => {
        document.body.classList.replace("claro", "oscuro");
        sessionStorage.setItem("tema", "oscuro");
    });

    document.getElementById("vaciar-carrito").addEventListener("click", () => {
        localStorage.removeItem(KEY_CARRITO);
        mostrarCarrito();
    });
}

agregarEventListeners();

function agregarAlCarrito(id) {
    let carrito = JSON.parse(localStorage.getItem(KEY_CARRITO)) || [];

    const index = carrito.findIndex(item => item.id === id);
    if (index >= 0) {
        carrito[index].cantidad += 1;
    } else {
        carrito.push({ id, cantidad: 1 });
    }

    localStorage.setItem(KEY_CARRITO, JSON.stringify(carrito));
    mostrarCarrito();
}

function mostrarCarrito() {
    const contenedor = document.getElementById("contenedor-carrito");
    contenedor.innerHTML = "";

    const carrito = JSON.parse(localStorage.getItem(KEY_CARRITO)) || [];

    if (carrito.length === 0) {
        contenedor.innerHTML = "<p>Carrito vacío</p>";
        return;
    }

    carrito.forEach(item => {
        const producto = productos.find(p => p.id === item.id);
        const div = document.createElement("div");
        div.innerHTML = `
            <p>${producto.nombre}</p>
            <p>Cantidad: ${item.cantidad}</p>
        `;
        contenedor.appendChild(div);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    cargarProductos().then(() => mostrarCarrito());
});
>>>>>>> d5f0a4d0878fe51a55bd968ef99f573f19e5b1c8
