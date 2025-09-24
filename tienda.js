let inventario = [];

function crearProducto(nombre, precio, categoria, stock) {
    return producto = {
        nombre: "ordenador",
        precio: 30,
        categoria: `tecnología`,
        stock: 50
    }, {
        nombre: "tablet",
        precio: 20,
        categoria: `tecnología`,
        stock: 79
    }, {
        nombre: "movil",
        precio: 10,
        categoria: `tecnología`,
        stock: 0
    };
}



console.log(filtrarPorCategoria(inventario, 'ropa'));
console.log(listarProductosAgotados(inventario));
console.log(calcularValorTotalInventario(inventario));
console.log(resumenInventario(inventario));