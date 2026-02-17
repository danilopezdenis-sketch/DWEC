const fs = require('fs');
const path = require('path');
const db = require('../models/db');

async function importar() {
  try {
    console.log('\nIniciando importación de datos...\n');

    const librosPath = path.join(__dirname, '../data/libros.json');
    const libros = JSON.parse(fs.readFileSync(librosPath, 'utf8'));
    
    console.log(`Archivo libros.json: ${libros.length} registros\n`);

    let insertados = 0;
    let duplicados = 0;
    let errores = 0;

    for (const libro of libros) {
      try {
        const [result] = await db.query(
          'INSERT INTO libros (titulo, autor, isbn, estado) VALUES (?, ?, ?, ?)',
          [libro.titulo, libro.autor, libro.isbn, libro.estado || 'Disponible']
        );
        
        insertados++;
        console.log(`[${insertados}] Insertado: "${libro.titulo}" -> ID en BD: ${result.insertId}`);
        
      } catch (err) {
        if (err.code === 'ER_DUP_ENTRY') {
          duplicados++;
          console.log(`Ya existe: "${libro.titulo}" (ISBN duplicado)`);
        } else {
          errores++;
          console.error(`Error con "${libro.titulo}":`, err.message);
        }
      }
    }

    console.log(`\nRESUMEN LIBROS:`);
    console.log(`   Insertados: ${insertados}`);
    console.log(`   Duplicados: ${duplicados}`);
    console.log(`   Errores: ${errores}\n`);

    const prestamosPath = path.join(__dirname, '../data/prestamos.json');
    
    if (!fs.existsSync(prestamosPath)) {
      console.log('No se encontró prestamos.json\n');
      console.log('Importación completada (solo libros)');
      process.exit(0);
    }

    const prestamos = JSON.parse(fs.readFileSync(prestamosPath, 'utf8'));
    console.log(`Archivo prestamos.json: ${prestamos.length} registros\n`);

    let prestamosInsertados = 0;
    let prestamosError = 0;

    for (const p of prestamos) {
      try {
        const [libro] = await db.query('SELECT id FROM libros WHERE id = ?', [p.libro_id]);
        
        if (!libro || libro.length === 0) {
          prestamosError++;
          console.log(`Libro ID ${p.libro_id} no existe (prestatario: ${p.nombre_prestatario})`);
          continue;
        }

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
          console.log(`Préstamo: "${p.nombre_prestatario}" - Libro ID ${p.libro_id} -> PRESTADO`);
        } else {
          console.log(`Préstamo: "${p.nombre_prestatario}" - Libro ID ${p.libro_id} -> DEVUELTO`);
        }

        prestamosInsertados++;
        
      } catch (err) {
        prestamosError++;
        console.error(`Error préstamo (Libro ${p.libro_id}):`, err.message);
      }
    }

    console.log(`\nRESUMEN PRÉSTAMOS:`);
    console.log(`   Insertados: ${prestamosInsertados}`);
    console.log(`   Errores: ${prestamosError}\n`);

    console.log('IMPORTACIÓN COMPLETADA\n');
    
    const [countLibros] = await db.query('SELECT COUNT(*) as total FROM libros');
    const [countPrestamos] = await db.query('SELECT COUNT(*) as total FROM prestamos');
    
    console.log('TOTALES EN BASE DE DATOS:');
    console.log(`   Libros: ${countLibros[0].total}`);
    console.log(`   Préstamos: ${countPrestamos[0].total}\n`);
    
    process.exit(0);
  } catch (error) {
    console.error('\nERROR FATAL:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

importar();