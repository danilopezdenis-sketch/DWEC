let usuarios = []
let productos = []
let pedidos = []
let detalles = []

const selectUsuario = document.getElementById("selectUsuario")
const panelUsuario = document.getElementById("panelUsuario")
const panelPedidos = document.getElementById("panelPedidos")
const panelResumen = document.getElementById("panelResumen")

async function cargarDatosIniciales() {
    panelUsuario.textContent = "Cargando datos..."
    try {
        const [resUsuarios, resProductos, resPedidos, resDetalles] = await Promise.all([
            fetch("/data/data/usuarios.json"),
            fetch("/data/data/productos.json"),
            fetch("/data/data/pedidos.json"),
            fetch("/data/data/detalles_pedido.json")
        ])
        usuarios = await resUsuarios.json()
        productos = await resProductos.json()
        pedidos = await resPedidos.json()
        detalles = await resDetalles.json()
        inicializarDashboard()
    } catch (e) {
        panelUsuario.textContent = "Error cargando datos"
        console.error(e)
    }
}

function inicializarDashboard() {
    selectUsuario.innerHTML = '<option value="">Seleccione un usuario</option>' 
    + usuarios.map(u => `<option value="${u.id}">${u.nombre}</option>`).join("")


    selectUsuario.addEventListener("change", e => {
        const usuarioId = parseInt(e.target.value)
        if (usuarioId) mostrarDashboardUsuario(usuarioId)
        else {
            panelUsuario.innerHTML = ""
            panelPedidos.innerHTML = ""
            panelResumen.innerHTML = ""
        }
    })
}

function mostrarDashboardUsuario(usuarioId) {
    const usuario = usuarios.find(u => u.id === usuarioId)
    if (!usuario) return

    panelUsuario.innerHTML = `<h3>${usuario.nombre}</h3><p>Email: ${usuario.email}</p>
    <p>Fecha de registro: ${usuario.fechaRegistro}</p>`

    const pedidosUsuario = pedidos.filter(p => p.usuarioId === usuarioId)

    panelPedidos.innerHTML = ""
    let gastoTotal = 0
    pedidosUsuario.forEach(pedido => {
  const detallesPedido = detalles.filter(d => d.pedidoId === pedido.id).map(detalle => {
    const producto = productos.find(pr => pr.id === detalle.productoId)
    const nombreProducto = producto ? producto.nombre : "Producto no encontrado"
    const precioUnitario = producto ? producto.precio : 0
    const subtotal = detalle.cantidad * precioUnitario
    return {...detalle, nombreProducto, precio: precioUnitario, subtotal}
})


        const totalPedido = detallesPedido.reduce((a,d)=>a+d.subtotal,0)
        gastoTotal += totalPedido
        
        const pedidoDiv = document.createElement("div")

        pedidoDiv.classList.add("pedido")


        pedidoDiv.innerHTML = `<h4>Pedido #${pedido.id} - Fecha: ${pedido.fecha}</h4>
        <p>Estado: ${pedido.estado}</p><ul>
        ${detallesPedido.map(d=>`<li>${d.cantidad} x ${d.nombreProducto} - ${d.precio.toFixed(2)} €</li>`).join("")}
        </ul>
        <p>Total del pedido: ${totalPedido.toFixed(2)} €</p>`
        panelPedidos.appendChild(pedidoDiv)

    })


    panelResumen.innerHTML = `<h3>Gasto total acumulado</h3><p>${gastoTotal.toFixed(2)} €</p>`
}


cargarDatosIniciales()
