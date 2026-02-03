let artistas = require('../data/artistas.json');


function getAll() {
  return artistas;
}

function getById(id) {
  return artistas.find(a => a.id === id);
}

module.exports = { getAll, getById };
