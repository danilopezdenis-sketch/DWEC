<<<<<<< HEAD
let consumoTotal = 0;

async function cargarLogs() {
  try {
    const response = await fetch('logs.txt');
    if (!response.ok) throw new Error('Error al cargar el archivo');

    const texto = await response.text();
    procesarLogs(texto);
  } catch(error) {
    console.error(error);
    alert('Error al cargar logs');
  }
}

function procesarLogs(texto) {
  const lineas = texto.split('\n');

  lineas.forEach(linea => {
    linea = linea.trim();
    if (linea === '') return;

    const idCompleto = linea.slice(linea.indexOf('ID:') + 3, linea.indexOf('|')).trim();
    const posicionGuion = idCompleto.indexOf('-');
    const idSesion = idCompleto.slice(posicionGuion + 1);

    const usuario = linea.slice(linea.indexOf('user:') + 5, linea.indexOf('|', linea.indexOf('user:'))).trim().toLowerCase();

    const consumoBytes = Number(linea.slice(linea.indexOf('consumo:') + 8, linea.indexOf('bytes')).trim());
    const consumoMB = consumoBytes / (1024 * 1024);


    const esError = linea.includes('ERROR');


    consumoTotal += consumoMB;


    const tr = document.createElement('tr');
    if (esError){ tr.classList.add('error');

    tr.innerHTML = `
      <td>${idSesion}</td>
      <td>${usuario}</td>
      <td>${consumoMB.toFixed(2)}</td>
      <td class="statusEr">ERROR</td>
    `;
    } else {
    tr.innerHTML = `
      <td>${idSesion}</td>
      <td>${usuario}</td>
      <td>${consumoMB.toFixed(2)}</td>
      <td class="statusOk">OK</td>
    `;
    }

    document.getElementById('tablaLogs').appendChild(tr);
  });


  document.getElementById('total').textContent = "Consumo total: " + consumoTotal.toFixed(2) + " MB";
}


=======
let consumoTotal = 0;

async function cargarLogs() {
  try {
    const response = await fetch('logs.txt');
    if (!response.ok) throw new Error('Error al cargar el archivo');

    const texto = await response.text();
    procesarLogs(texto);
  } catch(error) {
    console.error(error);
    alert('Error al cargar logs');
  }
}

function procesarLogs(texto) {
  const lineas = texto.split('\n');

  lineas.forEach(linea => {
    linea = linea.trim();
    if (linea === '') return;

    const idCompleto = linea.slice(linea.indexOf('ID:') + 3, linea.indexOf('|')).trim();
    const posicionGuion = idCompleto.indexOf('-');
    const idSesion = idCompleto.slice(posicionGuion + 1);

    const usuario = linea.slice(linea.indexOf('user:') + 5, linea.indexOf('|', linea.indexOf('user:'))).trim().toLowerCase();

    const consumoBytes = Number(linea.slice(linea.indexOf('consumo:') + 8, linea.indexOf('bytes')).trim());
    const consumoMB = consumoBytes / (1024 * 1024);


    const esError = linea.includes('ERROR');


    consumoTotal += consumoMB;


    const tr = document.createElement('tr');
    if (esError){ tr.classList.add('error');

    tr.innerHTML = `
      <td>${idSesion}</td>
      <td>${usuario}</td>
      <td>${consumoMB.toFixed(2)}</td>
      <td class="statusEr">ERROR</td>
    `;
    } else {
    tr.innerHTML = `
      <td>${idSesion}</td>
      <td>${usuario}</td>
      <td>${consumoMB.toFixed(2)}</td>
      <td class="statusOk">OK</td>
    `;
    }

    document.getElementById('tablaLogs').appendChild(tr);
  });


  document.getElementById('total').textContent = "Consumo total: " + consumoTotal.toFixed(2) + " MB";
}


>>>>>>> d5f0a4d0878fe51a55bd968ef99f573f19e5b1c8
cargarLogs();