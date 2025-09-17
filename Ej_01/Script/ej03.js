const producto = {
    nombre : 'tablet',
    precio : 23
}


const cliente = {
    nombreCliente :'Juan',
    esPremium : false
}

const producto2 = {
    nombre : 'Antonio'

}


const pedido = {
    ...producto,
    ...cliente
}


const pedido2 = {
    ...producto2,
    ...cliente
}