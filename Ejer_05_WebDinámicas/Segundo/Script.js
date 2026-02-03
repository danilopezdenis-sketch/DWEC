function revelarRespuesta(h2){

    let respuesta = h2.nextElementSibling;
    
    ocultarTodasLasRespuestas();

    respuesta.classList.remove("oculto");

    
}


function ocultarTodasLasRespuestas(){

const respuestas = document.querySelectorAll("li p");

respuestas.forEach(P => { P.classList.add("oculto")});



}