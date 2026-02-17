const db = require('./models/db');

async function verificar() {
  try {
    console.log('\n🔍 VERIFICANDO BASE DE DATOS...\n');
    
    // Contar libros
    const [librosCount] = await db.query('SELECT COUNT(*) as total FROM libros');
    console.log(`📚 Libros en la BD: ${librosCount[0].total}`);
    
    // Contar préstamos
    const [prestamosCount] = await db.query('SELECT COUNT(*) as total FROM prestamos');
    console.log(`📋 Préstamos en la BD: ${prestamosCount[0].total}\n`);
    
    // Mostrar primeros 3 libros
    if (librosCount[0].total > 0) {
      console.log('📖 Primeros 3 libros:\n');
      const [libros] = await db.query('SELECT * FROM libros LIMIT 3');
      libros.forEach(libro => {
        console.log(`   ID ${libro.id}: "${libro.titulo}" por ${libro.autor} - ${libro.estado}`);
      });
    } else {
      console.log('⚠️  NO HAY LIBROS EN LA BASE DE DATOS\n');
    }
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

verificar();
