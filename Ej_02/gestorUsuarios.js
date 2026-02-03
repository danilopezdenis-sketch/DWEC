
let usuario = [];

function crearPerfil (nombre, edad, correo) {
    return usuario = { nombre, edad, correo };
}

function mostrarPerfil (usuario) {
    return `Nombre: ${usuario.nombre}, 
    Edad: ${usuario.edad}, Correo: ${usuario.correo}`;
}


function esMayordeEdad(usuario) {
    if(usuario.edad >= 18) {
        return true;      
    } else {
        return false;
    }
}


function obtenerMayoresDeEdad(usuarios) {
    return usuarios.filter(esMayordeEdad);
}

function calcularPromedioEdad(usuarios) {
    let totalEdad = usuarios.reduce((acum, usuario) => acum + usuario.edad, 0);
    return totalEdad / usuarios.length;
}   






export {mostrarPerfil, obtenerMayoresDeEdad, calcularPromedioEdad, crearPerfil};









