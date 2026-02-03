


const input = document.getElementById('paisFiltro');

const lista = document.querySelectorAll('li');
const boton = document.querySelector('button');


boton.addEventListener('click', () =>
{

const texto = input.value.trim();
filtrar(texto); 


});




function filtrar(pais){

    lista.forEach(li => {

        if(li.dataset.pais.toLowerCase().includes(pais.toLowerCase())){
            li.classList.remove('oculto');
        } else{

            li.classList.add('oculto');

        }

    })



}