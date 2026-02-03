
document.addEventListener('DOMContentLoaded', function(){

 
const tabla = document.querySelector('table')


tabla.addEventListener('dblclick', (evento) =>{

    if(evento.target.tagName === 'TD'){
       
        celdaEditable(evento.target);

    }

})


function celdaEditable(celda){

const textoOriginal = celda.textContent;


const input = document.createElement('input');
input.type = 'text';
input.value = textoOriginal;


celda.textContent = '';

celda.appendChild(input);

input.focus();
input.select();


input.addEventListener('blur', function() {

    celda.textContent = this.value || textoOriginal;

})

input.addEventListener('keydown', function(event){

    if( event.key === 'Enter'){

        this.blur()

    }
    if(event.key === 'Escape'){

        celda.textContent = textoOriginal;
        
    }


})
}
})














