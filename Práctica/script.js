
//PANEL DE DIAGNÓSTICO DEL NAVEGADOR


const infoNavegador = document.getElementById('info-navegador');

const ancho = window.innerWidth;
const alto = window.innerHeight;
const idioma = navigator.language;
const estadoConexion = navigator.onLine ? 'En línea' : 'Sin conexión';
const fechaHora = new Date().toLocaleDateString();


const contenido = `
<p>Ancho: ${ancho}</p>
<p>Alto: ${alto}</p>
<p>Idioma: ${idioma}</p>
<p>Conexión: ${estadoConexion}</p>
<p>${fechaHora}</p>`

infoNavegador.innerHTML = contenido;


// BARRA DE PROGRESO Y BOTÓN PARA VOLVER ARRIBA

//barra
    const main = document.querySelector('main');
    const progressBar = document.createElement('div');
    main.appendChild(progressBar);


//botón
    const footer = document.querySelector('footer');
    const backToTop = document.createElement('button');
    backToTop.innerHTML = "Vovler arriba";
    backToTop.classList.add('btn');
    footer.appendChild(backToTop);


window.addEventListener('scroll', () =>{

    // Para calcular el progreso del scroll

      const scrollTop = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrollPercent = (scrollTop / scrollHeight) * 100;

    progressBar.style.width = scrollPercent + '%';


    if(scrollTop > window.innerHeight){
        backToTop.classList.add('visible');
    } else{

        backToTop.classList.remove('visible');

    }

 
})


    //Vuelve al inicio suavemente

   backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });







// Carga de archivos XML de forma dinámica 


let archivoActual = 'soporte_vital.xml'



function cargarXML(nombreArchivo){

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
      const imagen = xml.querySelector('imagen').textContent;

      panel.innerHTML = `
        <h2>${titulo}</h2>
        <p>${descripcion}</p>
        <img src="${imagen}">
        <button id ="avance">Siguiente</button>
        <button id= "retroceso">Anterior</button>

        `;

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



      console.log(`Cargado: ${archivoActual}`);
      console.log(`Anterior: ${anteriorArchivo}, Siguiente: ${siguienteArchivo}`);

    })

    .catch(err => console.error('Error cargando XML:', err));
}


cargarXML(archivoActual);






// Capturar submit y evitar comportamiento por defecto


const formulario = document.querySelector('form');
const avisos =[];

formulario.addEventListener('submit', (event) =>{

    // Se previene el comportamiento por defecto del formulario
    event.preventDefault();


    const mensaje = document.getElementById('mensaje').value;
    const prioridad = document.getElementById('prioridad').value;

    const aviso = {

        mensaje: mensaje,
        prioridad: prioridad,
        fecha: new Date().toLocaleDateString()
    };

        // Cada aviso es guardado en un array de objetos

    avisos.push(aviso);

    // Se muestran todos los avisos que hay 
    const salida = document.getElementById('salida');
    salida.textContent = `Avisos registrados: ${avisos.length}`;

    if(avisos.length > 5){

        alert("Hay más de 5 avisos");

    }

})



// Arrastrar elementos

let estaArrastrando = false;


const div = document.createElement('div');
div.classList.add('panel-drag');
div.innerHTML = "Arrástrame por la pantalla uwu";
document.body.appendChild(div);

div.addEventListener('mousedown', ()=>{

estaArrastrando = true;

div.style.color = "green";


})

document.addEventListener('mousemove', function(event){

    if( !estaArrastrando) return;

    const mouseX = event.clientX;
    const mouseY = event.clientY;
    
    div.style.left = mouseX + 'px'; 

    div.style.top = mouseY + 'px';

})


document.addEventListener('mouseup', function(){

    estaArrastrando = false;

})



// Manipulación del DOM


formulario.addEventListener('submit', (event) => {
  event.preventDefault();

  const mensaje = document.getElementById('mensaje').value;
  const prioridad = document.getElementById('prioridad').value;
  const salida = document.getElementById('salida');
  const contenedor = document.getElementById('avisos'); // un div contenedor en tu HTML

  // Crear el objeto aviso
  const aviso = {
    mensaje,
    prioridad,
    fecha: new Date().toLocaleString()
  };

  avisos.push(aviso);
  salida.textContent = `Avisos registrados: ${avisos.length}`;

  // Crear el div visual del aviso
  const divAviso = document.createElement('div');
  divAviso.classList.add('aviso');
  divAviso.innerHTML = `
    <strong>${aviso.mensaje}</strong> (${aviso.prioridad}) — ${aviso.fecha}
    <button class="subir">subir</button>
    <button class="bajar">bajar</button>
  `;

  // Insertar antes del último aviso existente (insertBefore)
  if (contenedor.lastElementChild) {
    contenedor.insertBefore(divAviso, contenedor.lastElementChild);
  } else {
    contenedor.appendChild(divAviso);
  }

  // Listener para mover hacia arriba
  divAviso.querySelector('.subir').addEventListener('click', () => {
    const anterior = divAviso.previousElementSibling;
    if (anterior) contenedor.insertBefore(divAviso, anterior);
  });

  // Listener para mover hacia abajo
  divAviso.querySelector('.bajar').addEventListener('click', () => {
    const siguiente = divAviso.nextElementSibling;
    if (siguiente) contenedor.insertBefore(siguiente, divAviso);
  });

  // Resetear formulario
  formulario.reset();
});


