
const nombre = document.querySelector('#nombre');

const apellido = document.querySelector('#apellido');

const boton = document.querySelector('button'); 

const body = document.querySelector('tbody');


boton.addEventListener('click',(e) =>{

    e.preventDefault();

    const fila = document.createElement('tr');
    const celdaNombre = document.createElement('td');
    const celdaApellido = document.createElement('td');

    celdaNombre.textContent = nombre.value;
    celdaApellido.textContent = apellido.value;

    body.appendChild(fila);
    fila.appendChild(celdaNombre);
    fila.appendChild(celdaApellido);

    nombre.value ='';
    apellido.value ='';
})





