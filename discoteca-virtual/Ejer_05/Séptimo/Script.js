const contenedor = document.querySelector("ul");


contenedor.addEventListener('click',(evento) =>{

if(evento.target.tagName === 'BUTTON') {

const producto = evento.target.parentElement;
const clon = producto.cloneNode(true);

const boton = clon.querySelector('button');
if(boton){
    boton.remove();
}

carrito.appendChild(clon);
calcularTotal();

}

});


function calcularTotal(){

let total = 0;

const items = carrito.querySelectorAll('li');


items.forEach(item => {

const precio = parseFloat(item.dataset.price);
total += precio;

})

    const precioTotal = document.getElementById("total")
    precioTotal.textContent = total;

}










