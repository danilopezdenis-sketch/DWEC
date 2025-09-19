import{crearPerfil} from './gestorUsuarios.js' 
import{mostrarPerfil} from './gestorUsuarios.js'
import{obtenerMayoresDeEdad} from './gestorUsuarios.js'
import{calcularPromedioEdad} from './gestorUsuarios.js'


let usuarios = [crearPerfil('Ana', 28), crearPerfil('Luis', 35), 
    crearPerfil('Marta', 17), crearPerfil('Carlos', 22),
    crearPerfil('Sofía', 15)];

usuarios.map(usuario => {
    console.log(mostrarPerfil(usuario))
})

// Se obtienen los mayores de edad y luego se itera sobre ellos para mostrarlos:
let mayoresDeEdad = obtenerMayoresDeEdad(usuarios);
console.log('Usuarios mayores de edad:');

mayoresDeEdad.map(usuario => {
    console.log(mostrarPerfil(usuario))
})


let promedio = calcularPromedioEdad(usuarios);
console.log('La edad promedio de los usuarios es:');
console.log(promedio);





