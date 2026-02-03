<<<<<<< HEAD
const DB_NAME = "tiendaDB";
const DB_VERSION = 1;
const STORE_CARRITO = "carrito";


function abrirDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => reject("Error al abrir IndexedDB");

    request.onupgradeneeded = e => {
      const db = e.target.result;

      if (!db.objectStoreNames.contains(STORE_CARRITO)) {
        db.createObjectStore(STORE_CARRITO, {
          keyPath: "productoId"
        });
      }
    };

    request.onsuccess = () => resolve(request.result);
  });
}


const productos = [
  { id: "p1", nombre: "Teclado", precio: 25 },
  { id: "p2", nombre: "Ratón", precio: 15 },
  { id: "p3", nombre: "Monitor", precio: 180 }
];


function mostrarProductos() {
  const contenedor = document.getElementById("contenedor-productos");
  contenedor.innerHTML = "";

  productos.forEach(p => {
    const div = document.createElement("div");
    div.className = "tarjeta";

    div.innerHTML = `
      <h3>${p.nombre}</h3>
      <p>Precio: ${p.precio} €</p>
      <button data-id="${p.id}">Añadir al carrito</button>
    `;

    div.querySelector("button").addEventListener("click", () => {
      añadirAlCarrito(p.id);
    });

    contenedor.appendChild(div);
  });
}


async function añadirAlCarrito(productoId) {
  const db = await abrirDB();
  const tx = db.transaction(STORE_CARRITO, "readwrite");
  const store = tx.objectStore(STORE_CARRITO);

  const req = store.get(productoId);

  req.onsuccess = () => {
    if (req.result) {
      req.result.cantidad++;
      store.put(req.result);
    } else {
      store.add({ productoId, cantidad: 1 });
    }
  };

  tx.oncomplete = mostrarCarrito;
}


async function obtenerCarrito() {
  const db = await abrirDB();
  const tx = db.transaction(STORE_CARRITO, "readonly");
  const store = tx.objectStore(STORE_CARRITO);

  return new Promise(resolve => {
    const req = store.getAll();
    req.onsuccess = () => resolve(req.result);
  });
}


async function mostrarCarrito() {
  const lista = document.getElementById("lista-carrito");
  lista.innerHTML = "";

  const carrito = await obtenerCarrito();

  if (carrito.length === 0) {
    lista.innerHTML = "<li>Carrito vacío</li>";
    return;
  }

  carrito.forEach(item => {
    const producto = productos.find(p => p.id === item.productoId);

    const li = document.createElement("li");
    li.innerHTML = `
      ${producto.nombre} 
      (${item.cantidad})
      <button>(+)</button>
      <button>(-)</button>
      <button>(x)</button>
    `;

    const [btnMas, btnMenos, btnEliminar] = li.querySelectorAll("button");

    btnMas.addEventListener("click", () => incrementar(item.productoId));
    btnMenos.addEventListener("click", () => decrementar(item.productoId));
    btnEliminar.addEventListener("click", () => eliminar(item.productoId));

    lista.appendChild(li);
  });
}


async function incrementar(id) {
  const db = await abrirDB();
  const tx = db.transaction(STORE_CARRITO, "readwrite");
  const store = tx.objectStore(STORE_CARRITO);

  const req = store.get(id);
  req.onsuccess = () => {
    req.result.cantidad++;
    store.put(req.result);
  };

  tx.oncomplete = mostrarCarrito;
}

async function decrementar(id) {
  const db = await abrirDB();
  const tx = db.transaction(STORE_CARRITO, "readwrite");
  const store = tx.objectStore(STORE_CARRITO);

  const req = store.get(id);
  req.onsuccess = () => {
    if (req.result.cantidad > 1) {
      req.result.cantidad--;
      store.put(req.result);
    } else {
      store.delete(id);
    }
  };

  tx.oncomplete = mostrarCarrito;
}

async function eliminar(id) {
  const db = await abrirDB();
  const tx = db.transaction(STORE_CARRITO, "readwrite");
  const store = tx.objectStore(STORE_CARRITO);

  store.delete(id);
  tx.oncomplete = mostrarCarrito;
}


document.addEventListener("DOMContentLoaded", () => {
  mostrarProductos();
  mostrarCarrito();
});
=======
const DB_NAME = "tiendaDB";
const DB_VERSION = 1;
const STORE_CARRITO = "carrito";


function abrirDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => reject("Error al abrir IndexedDB");

    request.onupgradeneeded = e => {
      const db = e.target.result;

      if (!db.objectStoreNames.contains(STORE_CARRITO)) {
        db.createObjectStore(STORE_CARRITO, {
          keyPath: "productoId"
        });
      }
    };

    request.onsuccess = () => resolve(request.result);
  });
}


const productos = [
  { id: "p1", nombre: "Teclado", precio: 25 },
  { id: "p2", nombre: "Ratón", precio: 15 },
  { id: "p3", nombre: "Monitor", precio: 180 }
];


function mostrarProductos() {
  const contenedor = document.getElementById("contenedor-productos");
  contenedor.innerHTML = "";

  productos.forEach(p => {
    const div = document.createElement("div");
    div.className = "tarjeta";

    div.innerHTML = `
      <h3>${p.nombre}</h3>
      <p>Precio: ${p.precio} €</p>
      <button data-id="${p.id}">Añadir al carrito</button>
    `;

    div.querySelector("button").addEventListener("click", () => {
      añadirAlCarrito(p.id);
    });

    contenedor.appendChild(div);
  });
}


async function añadirAlCarrito(productoId) {
  const db = await abrirDB();
  const tx = db.transaction(STORE_CARRITO, "readwrite");
  const store = tx.objectStore(STORE_CARRITO);

  const req = store.get(productoId);

  req.onsuccess = () => {
    if (req.result) {
      req.result.cantidad++;
      store.put(req.result);
    } else {
      store.add({ productoId, cantidad: 1 });
    }
  };

  tx.oncomplete = mostrarCarrito;
}


async function obtenerCarrito() {
  const db = await abrirDB();
  const tx = db.transaction(STORE_CARRITO, "readonly");
  const store = tx.objectStore(STORE_CARRITO);

  return new Promise(resolve => {
    const req = store.getAll();
    req.onsuccess = () => resolve(req.result);
  });
}


async function mostrarCarrito() {
  const lista = document.getElementById("lista-carrito");
  lista.innerHTML = "";

  const carrito = await obtenerCarrito();

  if (carrito.length === 0) {
    lista.innerHTML = "<li>Carrito vacío</li>";
    return;
  }

  carrito.forEach(item => {
    const producto = productos.find(p => p.id === item.productoId);

    const li = document.createElement("li");
    li.innerHTML = `
      ${producto.nombre} 
      (${item.cantidad})
      <button>(+)</button>
      <button>(-)</button>
      <button>(x)</button>
    `;

    const [btnMas, btnMenos, btnEliminar] = li.querySelectorAll("button");

    btnMas.addEventListener("click", () => incrementar(item.productoId));
    btnMenos.addEventListener("click", () => decrementar(item.productoId));
    btnEliminar.addEventListener("click", () => eliminar(item.productoId));

    lista.appendChild(li);
  });
}


async function incrementar(id) {
  const db = await abrirDB();
  const tx = db.transaction(STORE_CARRITO, "readwrite");
  const store = tx.objectStore(STORE_CARRITO);

  const req = store.get(id);
  req.onsuccess = () => {
    req.result.cantidad++;
    store.put(req.result);
  };

  tx.oncomplete = mostrarCarrito;
}

async function decrementar(id) {
  const db = await abrirDB();
  const tx = db.transaction(STORE_CARRITO, "readwrite");
  const store = tx.objectStore(STORE_CARRITO);

  const req = store.get(id);
  req.onsuccess = () => {
    if (req.result.cantidad > 1) {
      req.result.cantidad--;
      store.put(req.result);
    } else {
      store.delete(id);
    }
  };

  tx.oncomplete = mostrarCarrito;
}

async function eliminar(id) {
  const db = await abrirDB();
  const tx = db.transaction(STORE_CARRITO, "readwrite");
  const store = tx.objectStore(STORE_CARRITO);

  store.delete(id);
  tx.oncomplete = mostrarCarrito;
}


document.addEventListener("DOMContentLoaded", () => {
  mostrarProductos();
  mostrarCarrito();
});
>>>>>>> d5f0a4d0878fe51a55bd968ef99f573f19e5b1c8
