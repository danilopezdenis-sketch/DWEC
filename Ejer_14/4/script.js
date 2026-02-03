<<<<<<< HEAD
let productos = [];
let productosFiltrados = [];

const DB_NAME = "tiendaDB";
const DB_VERSION = 1;
const STORE_NAME = "productos";


document.addEventListener("DOMContentLoaded", () => {
    const temaGuardado = sessionStorage.getItem("tema");
    if (temaGuardado === "oscuro") {
        document.body.classList.remove("claro");
        document.body.classList.add("oscuro");
    } else {
        document.body.classList.remove("oscuro");
        document.body.classList.add("claro");
    }
});


function abrirDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);

        request.onerror = () => reject("Error al abrir IndexedDB");

        request.onupgradeneeded = (e) => {
            const db = e.target.result;

            if (!db.objectStoreNames.contains(STORE_NAME)) {
                db.createObjectStore(STORE_NAME, { keyPath: "id" });
            }
        };

        request.onsuccess = () => resolve(request.result);
    });
}

function obtenerProductosDB(db) {
    return new Promise((resolve, reject) => {
        const tx = db.transaction(STORE_NAME, "readonly");
        const store = tx.objectStore(STORE_NAME);
        const request = store.getAll();

        request.onerror = () => reject("Error leyendo productos");
        request.onsuccess = () => resolve(request.result);
    });
}

function guardarProductosDB(db, productos) {
    return new Promise((resolve, reject) => {
        const tx = db.transaction(STORE_NAME, "readwrite");
        const store = tx.objectStore(STORE_NAME);

        productos.forEach(p => store.put(p));

        tx.oncomplete = () => resolve();
        tx.onerror = () => reject("Error guardando productos");
    });
}

function borrarProductosDB(db) {
    return new Promise((resolve, reject) => {
        const tx = db.transaction(STORE_NAME, "readwrite");
        const store = tx.objectStore(STORE_NAME);
        const request = store.clear();

        request.onerror = () => reject("Error al borrar catálogo");
        request.onsuccess = () => resolve();
    });
}


async function cargarProductos() {
    const contenedor = document.getElementById("contenedor-productos");
    const mensaje = document.getElementById("mensaje-cargando");

    mensaje.style.display = "block";

    try {
        const db = await abrirDB();
        const productosDB = await obtenerProductosDB(db);

        if (productosDB.length > 0) {

            productos = productosDB;
        } else {
           
            const respuesta = await fetch("../data/productos.json");
            productos = await respuesta.json();
            await guardarProductosDB(db, productos);
        }

        productosFiltrados = [...productos];
        mensaje.style.display = "none";

        mostrarProductos(productosFiltrados);
        poblarCategorias();

    } catch (error) {
        contenedor.innerHTML = "<p>Error al cargar productos.</p>";
        console.error(error);
    }
}


async function forzarActualizacion() {
    const mensaje = document.getElementById("mensaje-cargando");
    mensaje.style.display = "block";

    const db = await abrirDB();
    await borrarProductosDB(db);
    await cargarProductos();
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
        `;
        contenedor.appendChild(tarjeta);
    });
}

function poblarCategorias() {
    const select = document.getElementById("filtro-categoria");
    select.innerHTML = `<option value="Todas">Todas</option>`;

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
    const btnActualizar = document.getElementById("forzar-actualizacion");

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

    btnActualizar.addEventListener("click", forzarActualizacion);

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
}

agregarEventListeners();


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

        const div = document.createElement("div");
        div.innerHTML = `
            <p>${producto.nombre}</p>
            <p>Cantidad: ${item.cantidad}</p>
        `;
        contenedor.appendChild(div);
    });
}


document.addEventListener("DOMContentLoaded", cargarProductos);
=======
let productos = [];
let productosFiltrados = [];

const DB_NAME = "tiendaDB";
const DB_VERSION = 1;
const STORE_NAME = "productos";


document.addEventListener("DOMContentLoaded", () => {
    const temaGuardado = sessionStorage.getItem("tema");
    if (temaGuardado === "oscuro") {
        document.body.classList.remove("claro");
        document.body.classList.add("oscuro");
    } else {
        document.body.classList.remove("oscuro");
        document.body.classList.add("claro");
    }
});


function abrirDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);

        request.onerror = () => reject("Error al abrir IndexedDB");

        request.onupgradeneeded = (e) => {
            const db = e.target.result;

            if (!db.objectStoreNames.contains(STORE_NAME)) {
                db.createObjectStore(STORE_NAME, { keyPath: "id" });
            }
        };

        request.onsuccess = () => resolve(request.result);
    });
}

function obtenerProductosDB(db) {
    return new Promise((resolve, reject) => {
        const tx = db.transaction(STORE_NAME, "readonly");
        const store = tx.objectStore(STORE_NAME);
        const request = store.getAll();

        request.onerror = () => reject("Error leyendo productos");
        request.onsuccess = () => resolve(request.result);
    });
}

function guardarProductosDB(db, productos) {
    return new Promise((resolve, reject) => {
        const tx = db.transaction(STORE_NAME, "readwrite");
        const store = tx.objectStore(STORE_NAME);

        productos.forEach(p => store.put(p));

        tx.oncomplete = () => resolve();
        tx.onerror = () => reject("Error guardando productos");
    });
}

function borrarProductosDB(db) {
    return new Promise((resolve, reject) => {
        const tx = db.transaction(STORE_NAME, "readwrite");
        const store = tx.objectStore(STORE_NAME);
        const request = store.clear();

        request.onerror = () => reject("Error al borrar catálogo");
        request.onsuccess = () => resolve();
    });
}


async function cargarProductos() {
    const contenedor = document.getElementById("contenedor-productos");
    const mensaje = document.getElementById("mensaje-cargando");

    mensaje.style.display = "block";

    try {
        const db = await abrirDB();
        const productosDB = await obtenerProductosDB(db);

        if (productosDB.length > 0) {

            productos = productosDB;
        } else {
           
            const respuesta = await fetch("../data/productos.json");
            productos = await respuesta.json();
            await guardarProductosDB(db, productos);
        }

        productosFiltrados = [...productos];
        mensaje.style.display = "none";

        mostrarProductos(productosFiltrados);
        poblarCategorias();

    } catch (error) {
        contenedor.innerHTML = "<p>Error al cargar productos.</p>";
        console.error(error);
    }
}


async function forzarActualizacion() {
    const mensaje = document.getElementById("mensaje-cargando");
    mensaje.style.display = "block";

    const db = await abrirDB();
    await borrarProductosDB(db);
    await cargarProductos();
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
        `;
        contenedor.appendChild(tarjeta);
    });
}

function poblarCategorias() {
    const select = document.getElementById("filtro-categoria");
    select.innerHTML = `<option value="Todas">Todas</option>`;

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
    const btnActualizar = document.getElementById("forzar-actualizacion");

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

    btnActualizar.addEventListener("click", forzarActualizacion);

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
}

agregarEventListeners();


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

        const div = document.createElement("div");
        div.innerHTML = `
            <p>${producto.nombre}</p>
            <p>Cantidad: ${item.cantidad}</p>
        `;
        contenedor.appendChild(div);
    });
}


document.addEventListener("DOMContentLoaded", cargarProductos);
>>>>>>> d5f0a4d0878fe51a55bd968ef99f573f19e5b1c8
