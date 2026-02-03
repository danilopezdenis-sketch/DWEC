import { actividades } from './datos/Actividades.js';

let actividadesFiltradas = [...actividades];
const itinerario = [];

const destino = document.getElementById('destino');
const tipo = document.querySelectorAll('#tipo input[type="checkbox"]');
const presupuesto = document.getElementById('presupuesto');
const spanPresupuesto = document.getElementById('valorPresupuesto');

const destinosUnicos = [...new Set(actividades.map(act => act.destino))];

const opcionTodos = document.createElement('option');
opcionTodos.value = '';
opcionTodos.textContent = 'Todos';
destino.appendChild(opcionTodos);

destinosUnicos.forEach(dest => {
  const option = document.createElement('option');
  option.value = dest;
  option.textContent = dest;
  destino.appendChild(option);
});

destino.addEventListener('change', filtrar);
tipo.forEach(check => check.addEventListener('change', filtrar));
presupuesto.addEventListener('input', filtrar);



function filtrar() {
  spanPresupuesto.textContent = presupuesto.value;

  actividadesFiltradas = actividades.filter(act => {
    const filtroDestino = destino.value === '' || act.destino === destino.value;

    let tipoSeleccionado = false;
    tipo.forEach(check => {
      if (check.checked && act.tipo === check.value) tipoSeleccionado = true;
    });

    const filtroTipo = tipoSeleccionado || Array.from(tipo).every(chk => !chk.checked);
    const filtroPresupuesto = act.precio <= parseFloat(presupuesto.value);

    return filtroDestino && filtroTipo && filtroPresupuesto;
  });

  agruparPorTarjetas();
}



function agruparPorTarjetas() {
  const contenedorActividades = document.querySelector('.col2');
  contenedorActividades.innerHTML = '';

  if (actividadesFiltradas.length === 0) {
    contenedorActividades.innerHTML = '<p class="text-muted">No hay actividades que coincidan con los filtros.</p>';
    return;
  }

  actividadesFiltradas.forEach(act => {
    const tarjeta = document.createElement('div');
    tarjeta.className = 'card shadow-sm p-3';
    tarjeta.style.width = '14rem';
    tarjeta.innerHTML = `
      <div class="card-body">
        <h6 class="card-title">${act.nombre}</h6>
        <p class="card-text small mb-1 text-secondary">${act.destino}</p>
        <p class="card-text mb-1">${act.duracionHoras} h</p>
        <p class="fw-bold mb-2">${act.precio} €</p>
        <button class="btn btn-sm btn-success w-100">Añadir al itinerario</button>
      </div>
    `;

    tarjeta.querySelector('button').addEventListener('click', () => añadirItinerario(act));
    contenedorActividades.appendChild(tarjeta);
  });
}


function añadirItinerario(act) {
  const contenedorItinerario = document.querySelector('.col3');

  if (itinerario.includes(act)) {
    alert('Esa actividad ya está en tu itinerario.');
    return;
  }

  itinerario.push(act);

  const div = document.createElement('div');
  div.classList.add('actividad-itinerario', 'border', 'rounded', 'p-2', 'mb-2', 'd-flex', 'justify-content-between');
  div.innerHTML = `
    <p class="m-0">${act.nombre}</p>
    <p class="m-0 fw-bold">${act.precio} €</p>
    <button class="btn btn-sm btn-outline-danger">Quitar</button>
  `;

  div.querySelector('button').addEventListener('click', () => {
    div.remove();
    const index = itinerario.indexOf(act);
    if (index !== -1) itinerario.splice(index, 1);
  });

  contenedorItinerario.appendChild(div);
}


filtrar();



document.getElementById('form-reserva').addEventListener('submit', validar);

function validar(event) {
  event.preventDefault();

  const actividadesItinerario = document.querySelectorAll('.actividad-itinerario');
  const fechaInicio = document.querySelector('input[type="date"]').value;
  const seguro = document.getElementById('seguro');
  const codigo = document.getElementById('codigo');
  const divResumen = document.getElementById('resumen');

  divResumen.innerHTML = '';
  const total = itinerario.reduce((acc, act) => acc + act.precio, 0);

  if (actividadesItinerario.length === 0) {
    return mostrarError('Debe añadir al menos una actividad al itinerario.');
  }

  const hoy = new Date();
  const fechaSeleccionada = new Date(fechaInicio);
  hoy.setHours(0, 0, 0, 0);

  if (!fechaInicio || fechaSeleccionada < hoy) {
    return mostrarError('La fecha de inicio no puede ser pasada ni estar vacía.');
  }

  if (total > 1000) {
    seguro.required = true;
    if (!seguro.checked) {
      return mostrarError('Debe contratar un seguro de viaje si el total supera los 1000 €.');
    }
  } else {
    seguro.required = false;
  }

  const patronCodigo = /^[A-Za-z]{4}[0-9]{2}$/;
  if (codigo.value.trim() !== '' && !patronCodigo.test(codigo.value.trim())) {
    return mostrarError('El código de descuento debe tener 4 letras seguidas de 2 números (ejemplo: ABCD25).');
  }

  mostrarExito(`Reserva confirmada con éxito. Total: ${total} €.`);
}

function mostrarError(mensaje) {
  const divResumen = document.getElementById('resumen');
  divResumen.innerHTML = `<p class="text-danger fw-bold">❌ ${mensaje}</p>`;
}

function mostrarExito(mensaje) {
  const divResumen = document.getElementById('resumen');
  divResumen.innerHTML = `<p class="text-success fw-bold">✅ ${mensaje}</p>`;
}



