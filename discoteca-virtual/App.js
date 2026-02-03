const express = require('express');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');

const artistasRoutes = require('./artistas/routes');
const albumesRoutes = require('./albumes/routes');

const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

const accessLogStream = fs.createWriteStream(
  path.join(__dirname, 'access.log'),
  { flags: 'a' }
);
app.use(morgan('combined', { stream: accessLogStream }));

app.get('/', (req, res) => {
  res.send(`
    <h1>Discoteca virtual</h1>
    <ul>
      <li><a href="/albumes">Ver álbumes</a></li>
      <li><a href="/artistas">Ver artistas</a></li>
    </ul>
  `);
});

app.use('/artistas', artistasRoutes);
app.use('/albumes', albumesRoutes);

app.listen(3000, () => {
  console.log('Servidor en http://localhost:3000');
});
function obtenerLibros(){

    return libros
}


function agregarLibro(){

    return libros

}

function buscarLibroPorId(){

    return libros}

function eliminarLibro(){

    return libros
}

function ordenarPorPaginas(){

    return libros
}

