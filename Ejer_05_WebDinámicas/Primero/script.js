
function cambiarImagenPrincipal(numero){

    const miniaturas = document.querySelectorAll('.miniatura');

    if(typeof numero=== 'number'){

        const minianturaSeleccionada = miniaturas[numero];
        const src = minianturaSeleccionada.src;
        const imagenPrincipal = document.querySelector('.imagen-principal');
        imagenPrincipal.src = src;
        resaltarMiniatura(numero);
    }
}


function resaltarMiniatura(indice){

    const miniaturas = document.querySelectorAll('.miniatura');
    miniaturas.forEach((miniatura, i) => { 
        
        if(i === indice){
         miniatura.classList.add('activa');
    }else{
         miniatura.classList.remove('activa');
    }
})
}
