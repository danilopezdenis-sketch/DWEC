const fs = require('fs');
const path = require('path');
const db = require('../models/db');

async function importar() {
  try {

    const librosPath = path.join(__dirname, '../data/libros.json');
    const libros = JSON.parse(fs.readFileSync(librosPath, 'utf8'));

    for (const libro of libros) {
      await db.query(
        'INSERT INTO libros (titulo, autor, isbn) VALUES (?, ?, ?)',
        [libro.titulo, libro.autor, libro.isbn]
      );
    }


    const prestamosPath = path.join(__dirname, '../data/prestamos.json');
    const prestamos = JSON.parse(fs.readFileSync(prestamosPath, 'utf8'));

    for (const p of prestamos) {
      await db.query(
        `INSERT INTO prestamos 
         (libro_id, nombre_prestatario, fecha_prestamo, fecha_devolucion, fecha_entrega)
         VALUES (?, ?, ?, ?, ?)`,
        [
          p.libro_id,
          p.nombre_prestatario,
          p.fecha_prestamo,
          p.fecha_devolucion,
          p.fecha_entrega
        ]
      );


      if (p.fecha_entrega === null) {
        await db.query(
          'UPDATE libros SET estado = "Prestado" WHERE id = ?',
          [p.libro_id]
        );
      }
    }

    console.log('Datos importados correctamente');
    process.exit();
  } catch (error) {
    console.error('Error importando datos:', error);
    process.exit(1);
  }
}

importar();
