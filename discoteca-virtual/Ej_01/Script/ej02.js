let coche = {
    marca : 'Ford',
    modelo : 'nuevo',
    año : 2015,
    estaDisponible: true 
}

console.table(coche)

const {marca, modelo} = coche

console.log(marca)
console.log(modelo)

coche.estaDisponible = false

coche.color = 'Rojo'

delete coche.color





