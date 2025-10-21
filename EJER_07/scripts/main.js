document.addEventListener('DOMContentLoaded', () => {
    console.log('%cDocumento listo.', 'color: green; font-size: 16px; font-weight: bold;');
    console.log('%cEscribe las soluciones en main.js', 'color: red; font-size: 18px; font-weight: bold;');


    // --- Solución Ejercicio 1 y 4 ---

const contenedorExterior = document.getElementById('outer-box');

const hijos = contenedorExterior.children;


for (let i = 1; i <hijos.length; i++){
    hijos[i].addEventListener('click', (evento) =>{

        evento.target.style.backgroundColor = 'coral';

        console.log(evento.target.id)
    })


};


    // --- Solución Ejercicio 2 ---
    const enlace = document.getElementById('test-link');

    enlace.addEventListener('click', (evento) => {
        evento.preventDefault();
        console.log('Navegación prevenida.');
    });



    // --- Solución Ejercicio 3 ---
   const boton = document.getElementById('back-to-top');

   
    window.addEventListener('scroll', () =>{
    
        if(window.scrollY > 250){
            boton.classList.remove('hidden');

    } 



})

        // --- )Solución Ejercicio 5 ---

        const botonNotificacion = document.getElementById('notification-btn');
        const cajaNotificaciones = document.getElementById('notification-area')

        document.body.addEventListener('notification', (e) => {
    const { mensaje, fecha } = e.detail;
    cajaNotificaciones.innerHTML = `<p><strong>${mensaje}</strong><br><small>${fecha}</small></p>`;
    
});

    botonNotificacion.addEventListener('click', () => {
    const evento = new CustomEvent('notification', {
        detail: {
        mensaje: 'Notificación recibida',
        fecha: new Date().toLocaleString()
      }
    });



    document.body.dispatchEvent(evento);
  });


});



