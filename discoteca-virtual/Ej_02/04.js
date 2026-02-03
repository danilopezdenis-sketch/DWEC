let usuario = {
    nombre: 'Juan',
    email: 'juan@gmail.com'
}

let perfil = {
    puesto: 'Desarrollador',
    empresa: 'Google'
}

let empleado = {...usuario, ...perfil};

const datos = (empleado.perfil?.direccion?.ciudad);  

const ciudad = datos ?? 'Ciudad no especificada';

console.log(empleado);
console.log(ciudad);
