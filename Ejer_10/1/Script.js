const { createElement } = require("react");

const items = xml.getElementsByTagName('item');




fetch('soporte_vital.xml')
  .then(response => response.text())
  .then(str => (new window.DOMParser()).parseFromString(str, "text/xml"))
  .then(xml => {
    const mediciones = xml.getElementsByTagName('medicion');
    const panel = document.getElementById('panel')

    for (let medicion of mediciones) {
      const oxigeno = medicion.getElementsByTagName('oxigeno')[0].textContent;
      const temperatura = medicion.getElementsByTagName('temperatura')[0].textContent;
      const presion = medicion.getElementsByTagName('presion')[0].textContent;      
      
       panel.textContent = `Niveles de oxígeno: ${oxigeno} <br>
        Temperatura: ${temperatura} 
        Presión: ${presion}
         `;
    }
  })
  .catch(err => console.error('Error cargando XML:', err));






fetch('inventario.xml')
  .then(response => response.text())
  .then(str => new DOMParser().parseFromString(str, "text/xml"))
  .then(xml => {

    const select = document.getElementsByTagName('select')[0];
    const output = document.getElementsByTagName('output')[0];


    for (let item of items) {
      const nombre = item.getElementsByTagName('nombre')[0].textContent;
      const option = document.createElement('option');
      option.textContent = nombre;
      select.appendChild(option);
    }


    select.addEventListener('change', () => {
      const index = select.selectedIndex; 
      const item = items[index];        

      const cantidad = item.getElementsByTagName('cantidad')[0].textContent;
      const consumo = item.getElementsByTagName('consumo')[0].textContent;

      output.innerHTML = `Cantidad: ${cantidad} <br>Disponibles: ${consumo}`;
    });
  })
  .catch(err => console.error('Error cargando XML:', err));


  
  const boton = document.getElementsByTagName('button') [0];

  boton.textContent = "Calcular autonomía";

  boton.addEventListener('click', calcularAutonomia);


  
  function calcularAutonomia(){

    const span = document.getElementById('autonomia');

    for(let item of items){
    
        const nombre = item.getElementsByTagName('nombre')[0].textContent;
        const cantidad = item.getElementsByTagName('cantidad')[0].textContent;
        const consumo = item.getElementsByTagName('consumo')[0].textContent;

        const autonomia = (cantidad / consumo);

        span.textContent = autonomia;

    }






  }

















