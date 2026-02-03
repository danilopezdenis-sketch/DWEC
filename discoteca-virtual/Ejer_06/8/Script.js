    
    const lista = document.querySelector('#lista-reordenable');
    
    lista.addEventListener('click', function(event) {
    
    const boton = event.target;
    const li = boton.closest('li');

    
        if (!li) return;
        

        if (boton.classList.contains('subir')) {
            moverArriba(li);
        } else if (boton.classList.contains('bajar')) {
            moverAbajo(li);
         }
        
       
        actualizarBotones();
       
    
     });
    



    function moverArriba(elemento) {
        const elementoAnterior = elemento.previousElementSibling;
        
        if (elementoAnterior) {
            lista.insertBefore(elemento, elementoAnterior);}
    }
    



    function moverAbajo(elemento) {
      const elementoSiguiente = elemento.nextElementSibling;
        
      if (elementoSiguiente){
         lista.insertBefore(elementoSiguiente, elemento);
       
       
        }}
    


    function actualizarBotones() {
        const items = lista.querySelectorAll('li');
        
      items.forEach((item, index) => {
        const botonSubir = item.querySelector('.subir');
           const botonBajar = item.querySelector('.bajar');
            
          botonSubir.disabled = index === 0;
            
           botonBajar.disabled = index === items.length - 1;
     });
    }
    
    actualizarBotones();
