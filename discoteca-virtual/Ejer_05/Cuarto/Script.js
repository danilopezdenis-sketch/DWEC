const usuarios = [{nombre: 'Ana', edad: 25},
     {nombre: 'Luis', edad: 30}];


function crearFilas(usuarios){

    let table = document.createElement("table");
    const fragmento = document.createDocumentFragment();

    usuarios.forEach(user => {
       const fila = document.createElement("tr")
       const celdaNombre = document.createElement("td")
       celdaNombre.textContent = user.nombre;
       
       const celdaEdad = document.createElement("td")
       celdaEdad.textContent = user.edad;

    });

    fragmento.appendChild(table);

    document.querySelector("#contenedor-tabla").appendChild(fragmento);

}


