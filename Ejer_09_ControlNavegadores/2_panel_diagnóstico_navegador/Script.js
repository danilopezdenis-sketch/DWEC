const spans = document.querySelectorAll('span');

function actualizarDatos(id) {
  let valor = "";

  switch (id) {
    case "viewport":
      valor = `${window.innerWidth} x ${window.innerHeight}`;
      break;
    case "ventana":
      valor = `${window.outerWidth} x ${window.outerHeight}`;
      break;
    case "posicion":
      valor = `${window.screenX}, ${window.screenY}`;
      break;
    case "resolucion":
      valor = `${screen.width} x ${screen.height}`;
      break;
    case "espacio":
      valor = `${screen.availWidth} x ${screen.availHeight}`;
      break;
    case "conexion":
      valor = navigator.onLine ? "Online " : "Offline ";
      break;
    default:
      valor = "Dato desconocido";
  }

  document.getElementById(id).textContent = valor;
}


function actualizarTodo() {
  spans.forEach(span => {
    const id = span.id; 
    actualizarDatos(id);
  });
}


actualizarTodo();


window.addEventListener("resize", actualizarTodo);
window.addEventListener("online", actualizarTodo);
window.addEventListener("offline", actualizarTodo);







