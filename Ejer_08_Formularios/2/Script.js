import { productos } from "./datos/lista.js";

const texto = document.querySelector('input[name="nombre"]');
const select = document.querySelector('select[name="categorias"]');
const rango = document.querySelector('input[name="rango"]');
const valorRango = document.getElementById('valor-rango');
const radios = document.querySelectorAll('input[name="precio"]');
const contenedor = document.getElementById("contenedor-productos");

texto.addEventListener('input', mostrarProductos);
select.addEventListener('change', mostrarProductos);
rango.addEventListener('input', mostrarProductos);
radios.forEach(boton => boton.addEventListener('change', mostrarProductos));

function mostrarProductos() {
    
  valorRango.textContent = rango.value;

  let listaFiltrada = [...productos];

  if (texto.value.trim() !== '') {
    listaFiltrada = listaFiltrada.filter(p =>
      p.nombre.toLowerCase().includes(texto.value.toLowerCase())
    );
  }

  if (select.value !== 'todas') {
    listaFiltrada = listaFiltrada.filter(p => p.categoria === select.value);
  }

  listaFiltrada = listaFiltrada.filter(p => p.precio <= parseFloat(rango.value));

  const seleccionado = Array.from(radios).find(r => r.checked);
  if (seleccionado) {
    if (seleccionado.value === 'ascendente') {
      listaFiltrada.sort((a, b) => a.precio - b.precio);
    } else if (seleccionado.value === 'descendente') {
      listaFiltrada.sort((a, b) => b.precio - a.precio);
    } else if (seleccionado.value === 'A-Z') {
      listaFiltrada.sort((a, b) => a.nombre.localeCompare(b.nombre));
    }
  }

  contenedor.innerHTML = '';
  listaFiltrada.forEach(producto => {
    const card = document.createElement('div');
    card.className = 'producto';
    card.innerHTML = `
      <h3>${producto.nombre}</h3>
      <p><span>${producto.precio} €</span></p>
      <div class="categoria">${producto.categoria}</div>
    `;
    contenedor.appendChild(card);
  });
}

mostrarProductos();

