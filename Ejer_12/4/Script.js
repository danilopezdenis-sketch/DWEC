<<<<<<< HEAD

const panel = document.getElementById("panelPedidos");


async function cargarPanel() {
    
    panel.textContent = "Cargando...";

   try{  
     const [resProductos, resDetalles, resPedidos] = await Promise.all([
            fetch("/data/data/productos.json"),
            fetch("/data/data/detalles_pedido.json"),
            fetch("/data/data/pedidos.json")
        ]);


        const productos = await resProductos.json();
        const detalles = await resDetalles.json();
        const pedidos = await resPedidos.json();
        
        const pedidosEnriquecidos = combinarDatos(productos, detalles, pedidos);


    panel.textContent = "";

    mostrarPanel(pedidosEnriquecidos);
} catch (error) {
        panel.textContent = "Error cargando los pedidos";
        console.error(error);
    }
}




function combinarDatos(productos, detalles, pedidos){

return pedidos.map(pedido => {

    const detallesPedido = detalles.filter(d => d.pedidoId === pedido.id);
    const detallesTransformados = detallesPedido.map(detalle =>{

        const producto = productos.find(p => p.id === detalle.productoId);

        return {
            productoId: detalle.productoId,
            nombreProducto: producto ? producto.nombre : "Producto no encontrado",
            cantidad: detalle.cantidad,
            precio: detalle.precioUnitario,
            subtotal: detalle.cantidad * detalle.precioUnitario
        };

    });

    const totalPedido = detallesTransformados.reduce((acum, item) => acum + item.subtotal,
    0);

    return {

        ...pedido,
        detalles: detallesTransformados,
        totalPedido
    };

});


}


function mostrarPanel(pedidosEnriquecidos){

    pedidosEnriquecidos.forEach(pedido =>{

        const pedidoDiv = document.createElement("div");
        pedidoDiv.classList.add("pedido");

     pedidoDiv.innerHTML = `
    <h3>Pedido #${pedido.pedidoId} - Fecha: ${pedido.fecha}</h3>
    <p><strong>Estado:</strong> ${pedido.estado}</p>
    <p><strong>Total:</strong> ${pedido.totalPedido} €</p>

    <ul>
        ${pedido.detalles.map(detalle => `
            <li>${detalle.cantidad} x ${detalle.nombreProducto} - ${detalle.precio} €</li>
        `).join("")}
    </ul>
`;

        panel.appendChild(pedidoDiv);

    })


}

=======

const panel = document.getElementById("panelPedidos");


async function cargarPanel() {
    
    panel.textContent = "Cargando...";

   try{  
     const [resProductos, resDetalles, resPedidos] = await Promise.all([
            fetch("/data/data/productos.json"),
            fetch("/data/data/detalles_pedido.json"),
            fetch("/data/data/pedidos.json")
        ]);


        const productos = await resProductos.json();
        const detalles = await resDetalles.json();
        const pedidos = await resPedidos.json();
        
        const pedidosEnriquecidos = combinarDatos(productos, detalles, pedidos);


    panel.textContent = "";

    mostrarPanel(pedidosEnriquecidos);
} catch (error) {
        panel.textContent = "Error cargando los pedidos";
        console.error(error);
    }
}




function combinarDatos(productos, detalles, pedidos){

return pedidos.map(pedido => {

    const detallesPedido = detalles.filter(d => d.pedidoId === pedido.id);
    const detallesTransformados = detallesPedido.map(detalle =>{

        const producto = productos.find(p => p.id === detalle.productoId);

        return {
            productoId: detalle.productoId,
            nombreProducto: producto ? producto.nombre : "Producto no encontrado",
            cantidad: detalle.cantidad,
            precio: detalle.precioUnitario,
            subtotal: detalle.cantidad * detalle.precioUnitario
        };

    });

    const totalPedido = detallesTransformados.reduce((acum, item) => acum + item.subtotal,
    0);

    return {

        ...pedido,
        detalles: detallesTransformados,
        totalPedido
    };

});


}


function mostrarPanel(pedidosEnriquecidos){

    pedidosEnriquecidos.forEach(pedido =>{

        const pedidoDiv = document.createElement("div");
        pedidoDiv.classList.add("pedido");

     pedidoDiv.innerHTML = `
    <h3>Pedido #${pedido.pedidoId} - Fecha: ${pedido.fecha}</h3>
    <p><strong>Estado:</strong> ${pedido.estado}</p>
    <p><strong>Total:</strong> ${pedido.totalPedido} €</p>

    <ul>
        ${pedido.detalles.map(detalle => `
            <li>${detalle.cantidad} x ${detalle.nombreProducto} - ${detalle.precio} €</li>
        `).join("")}
    </ul>
`;

        panel.appendChild(pedidoDiv);

    })


}

>>>>>>> d5f0a4d0878fe51a55bd968ef99f573f19e5b1c8
cargarPanel();