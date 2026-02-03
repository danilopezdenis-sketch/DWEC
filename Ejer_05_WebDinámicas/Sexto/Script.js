

const botones = document.querySelectorAll('.tabs button');


const ids = ['contenido1', 'contenido2', 'contenido3'];


botones.forEach((botones, index) => {
    
    botones.dataset.id = ids[index]

});


const contenedor = document.querySelector('.tabs');

contenedor.addEventListener('click', (evento) => {


    if(evento.target.tagName === 'BUTTON') {
     const idMostrar = evento.target.dataset.id;

        document.querySelectorAll('.tab-content').forEach(div => div.classList.add('oculto'));

        document.getElementById(idMostrar).classList.remove('oculto');
    }
});










