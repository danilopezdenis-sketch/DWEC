const boton = document.querySelector('button');
const input = document.querySelector('input');
const lista = document.querySelector('ul');


// Se añade un escucha de evenetos al botón

boton.addEventListener('click', function(){


    // Si el input tiene algo escrito, se añade a la lista


    if(input.value.length > 0){
    
    
        const li = document.createElement('li');
        li.textContent = input.value;

        // Se crea un botón para eliminar el elemento de la lista
        const botonEliminar = document.createElement('button');
        botonEliminar.textContent = 'Eliminar';
        botonEliminar.classList.add('eliminar'); // se le añade la calse "eliminar"


        // Se añade el botón al elemento li y el li a ul que es la lista
        li.appendChild(botonEliminar);
        lista.appendChild(li);

        // Se limpia el input
        input.value = '';

    }


    // Se añade un escucha de eventos a la lita para eliminar elementos 
    lista.addEventListener('click',e => {

        if( e.target.classList.contains('eliminar')){
            e.target.parentElement.remove();
        }


    })

    

})