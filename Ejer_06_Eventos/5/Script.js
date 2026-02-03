const paises = document.querySelectorAll('li');
const buscador = document.querySelector('input');


buscador.addEventListener('input', function() {

    const busqueda = this.value.toLowerCase();

    paises.forEach(pais => {

        const textoItem = pais.textContent.toLowerCase();

        if( textoItem.includes(busqueda)) {

            pais.classList.remove('oculto');
        }else{

            pais.classList.add('oculto');

        }

    })
    
})













