let archivoActual = 'documento_ultimo.xml';
let siguienteArchivo = '';
let anteriorArchivo = '';

function cargarXML(nombreArchivo) {
  fetch(nombreArchivo)
    .then(r => r.text())
    .then(str => new DOMParser().parseFromString(str, 'text/xml'))
    .then(xml => {


        archivoActual = nombreArchivo;


        siguienteArchivo = xml.querySelector('siguiente').textContent;
      anteriorArchivo = xml.querySelector('anterior').textContent;


      const panel = document.getElementById('panel');
      const titulo = xml.querySelector('titulo')?.textContent ;
      const descripcion = xml.querySelector('descripcion').textContent;
      const fecha = xml.querySelector('fecha').textContent;
      const imagen = xml.querySelector('imagen').textContent;

      panel.innerHTML = `
        <h2>${titulo}</h2>
        <p>${descripcion}</p>
        <span>${fecha}</span>
        <img src="${imagen}">
      `;

      console.log(`Cargado: ${archivoActual}`);
      console.log(`Anterior: ${anteriorArchivo}, Siguiente: ${siguienteArchivo}`);
    })
    .catch(err => console.error('Error cargando XML:', err));
}


cargarXML(archivoActual);


document.getElementById('avance').addEventListener('click', () => {
  if (siguienteArchivo) {
    cargarXML(siguienteArchivo);
  } else {
    alert('No hay siguiente documento.');
  }
});

document.getElementById('retroceso').addEventListener('click', () => {
  if (anteriorArchivo) {
    cargarXML(anteriorArchivo);
  } else {
    alert('No hay documento anterior.');
  }
});
