function generarInformeDeValidacion(){

    const email = document.getElementById("email".value);
    const nombre = document.getElementById("nombre".value);

    const errores = document.querySelector(".informe-errores")

    errores.querySelectorAll("p").forEach(e => e.remove());



    if(!email.includes("@")){

     const errores = document.querySelector(".informe-errores")
     const nuevoParrafo = document.createElement("p");
     nuevoParrafo.textContent = "El email debe contener @"
     errores.appendChild(nuevoParrafo);
    }
    
    if(nombre.length <= 3){
     const errores = document.querySelector(".informe-errores")
     const nuevoParrafo = document.createElement("p");
     nuevoParrafo.textContent = "El nombre debe tener más de 3 caracteres"
     errores.appendChild(nuevoParrafo);
    }


}