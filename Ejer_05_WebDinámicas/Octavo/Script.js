const boton = document.querySelector("button")
const ul = document.querySelector('ul');

boton.addEventListener('click', () => {

const lista = ul.querySelectorAll('li');

const arrayLista = Array.from(lista);

const ordenados = arrayLista.sort((a, b) => a.textContent.localeCompare(
    b.textContent)
)

ul.innerHTML = '';


ordenados.forEach(element => {
    ul.appendChild(element);
    
});


})







