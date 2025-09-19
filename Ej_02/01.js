let numeros = [1, 2, 3, 4, 5, 6];

let doble = numeros.map(function(num) {
    return num * 2;
})


console.log(doble);

let pares = numeros.filter(function(num) {
    return num % 2 === 0;
})


for ( let pares of numeros) {
    console.log(pares);
}



