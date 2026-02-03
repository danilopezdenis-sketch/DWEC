const ciudades = ["madrid", "buenos aires", "tokio", "nueva York", "parís"]

ciudades.push("roma")

console.log(ciudades)

const ciudadesMayusculas = ciudades.map(ciudades => ciudades.toUpperCase)

console.log(ciudadesMayusculas)

const ciudadesFiltradas = ciudades.filter(ciudades => ciudades.length > 6)


console.log(ciudadesFiltradas)

