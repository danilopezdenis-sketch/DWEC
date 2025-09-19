function retirarDinero(saldo, cantidadAretirar, tieneTarjetaCredito) {

if(saldo >= cantidadAretirar){
  return 'Retiro exitoso. Su saldo restante es:' + (saldo - cantidadAretirar)
} else if(tieneTarjetaCredito) {
    return 'Saldo insuficiente. Pagando con tarjeta de crédito.'
}else{          
  return 'saldo insuficientes'
}
}