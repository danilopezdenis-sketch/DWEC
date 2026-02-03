const input = document.querySelector('input');

const resultado = document.querySelector('.resultado');

const boton = document.querySelector('button');



boton.addEventListener('click',()=> {

resultado.innerHTML = '';


for(let i = 0; i < input.value; i++){

const parrafo = document.createElement('p');
parrafo.textContent = 'Lorem ipsum';

resultado.appendChild(parrafo);


}


})













