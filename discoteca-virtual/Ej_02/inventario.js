
let inventario = [];


function crearProducto(nombre, precio, categoria, stock) {
    return producto = {
        nombre: nombre,
        precio: precio,
        categoria: categoria,
        stock: stock
    };
}



function filtrarPorCategoria(inventario, categoria) {
    return inventario.filter(producto => producto.categoria === categoria);


}

function listarProductosAgotados(inventario) {
    return inventario.filter(producto => producto.stock === 0);
}



function calcularValorTotalInventario(inventario) {
    return inventario.reduce((total, producto) => 
        total + (producto.precio * producto.stock), 0);
}


export { inventario, crearProducto, filtrarPorCategoria, 
    listarProductosAgotados, calcularValorTotalInventario };

function resumenInventario(inventario) {
    const totalProductos = inventario.length;
    const productosAgotados = listarProductosAgotados(inventario).length;
    const valorTotal = calcularValorTotalInventario(inventario);   }


    export default resumenInventario;










