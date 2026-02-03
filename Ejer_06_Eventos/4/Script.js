
const contenedor = document.querySelector('div');

const body = document.querySelector('body');



contenedor.addEventListener('click', (event)=>{

if( event.target !== contenedor){



const div = event.target;

const color = window.getComputedStyle(div).backgroundColor;

body.style.backgroundColor = color;



}
}
)










