const albumModel = require('./model');
const artistaModel = require('../artistas/model');

function list(req, res) {
  const albumes = albumModel.getAll();

  res.send(`
    <h1>Álbumes</h1>
    <table>
      <tr>
        <th>Portada</th>
        <th>Título</th>
        <th>Artista</th>
        <th>Año</th>
      </tr>
      ${albumes.map(a => {
        const artista = artistaModel.getById(a.artistaId);
        return `
          <tr>
            <td><img src="${a.foto}" width="50"></td>
            <td>${a.titulo}</td>
            <td>${artista?.nombre}</td>
            <td>${a.anio}</td>
          </tr>
        `;
      }).join('')}
    </table>
    <a href="/">Volver</a>
  `);
}

module.exports = { list };
