let productos = [];
let productosFiltrados = [];

document.addEventListener("DOMContentLoaded", () => {
    const temaGuardado = sessionStorage.getItem("tema");
    if( temaGuardado === "oscuro"){
        document.body.classList.remove("claro");
        document.body.classList.add("oscuro");
    } else {
        document.body.classList.remove("oscuro");
        document.body.classList.add("claro");
    }
})


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
    `;
    contenedor.appendChild(tarjeta);
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
    productosFiltrados = valor === "Todas" ? [...productos] : productos.filter(p => p.categoria === valor);
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
    document.body.classList.remove("oscuro");
    document.body.classList.add("claro");
    sessionStorage.setItem("tema","claro")
});

document.getElementById("oscuro").addEventListener("click", () => {
    document.body.classList.remove("claro");
    document.body.classList.add("oscuro");
    sessionStorage.setItem("tema","oscuro")

});


}
agregarEventListeners();


document.addEventListener("DOMContentLoaded", cargarProductos);
