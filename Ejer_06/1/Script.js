const botonMostrar = document.querySelector('button');

const botonOcultar = document.querySelector('.Ocultar-Modal');

const div = document.querySelector('div');




botonMostrar.addEventListener('click',() =>{

div.style.display = 'block';


})

botonOcultar.addEventListener('click',() =>{

div.style.display = 'none';


})






