const model = require('./model');

function list(req, res) {
  const artistas = model.getAll();

  res.send(`
    <h1>Artistas</h1>
    <ul>
      ${artistas.map(a => `
        <li>
          <a href="/artistas/${a.id}">
            <img src="${a.foto}" width="50">
            ${a.nombre}
          </a>
        </li>
      `).join('')}
    </ul>
    <a href="/">Volver</a>
  `);
}

function detail(req, res) {
  const artista = model.getById(Number(req.params.id));

  res.send(`
    <h1>${artista.nombre}</h1>
    <img src="${artista.foto}">
    <p>${artista.pais}</p>
    <p>${artista.genero}</p>
    <p>${artista.fecha_formacion}</p>
    <a href="/artistas">Volver</a>
  `);
}

module.exports = { list, detail };
