const Libro = require('../models/libroModel');

exports.catalogo = async (req, res) => {
  try {
    const libros = await Libro.getAll();
    res.render('index', { libros });
  } catch (error) {
    res.status(500).send('Error al cargar el catálogo');
  }
};

exports.detalleLibro = async (req, res) => {
  try {
    const id = req.params.id; 
    const libro = await Libro.getById(id);

    if (!libro) {
      return res.status(404).send('Libro no encontrado');
    }

    res.render('detalle', { libro }); 
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al cargar el detalle del libro');
  }
};