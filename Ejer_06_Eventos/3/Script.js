const checkbox = document.querySelector('#checkbox');

const boton = document.querySelector('button');


checkbox.addEventListener('change', () => {

boton.disabled = !checkbox.checked;


})




