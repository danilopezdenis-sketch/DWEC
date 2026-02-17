const mysql = require('mysql2');
require('dotenv').config();

const pool = mysql.createPool({
  host: 'database-2.cufrfwocjurf.us-east-1.rds.amazonaws.com',
  user: 'admin',
  password: 'kiva59_D',
  database: 'biblioteca',
});


pool.getConnection((err, connection) => {
  if (err) {
    console.error('No se pudo conectar a la base de datos MySQL:');
    if (err.code === 'ER_ACCESS_DENIED_ERROR') console.error('Usuario o contraseña incorrectos.');
    if (err.code === 'ENOTFOUND') console.error('No se encontró el host (localhost).');
    if (err.code === 'ER_BAD_DB_ERROR') console.error('La base de datos "Biblioteca" no existe.');
    
    process.exit(1); 
  } else {
    console.log(' Conexión a la base de datos establecida correctamente.');
    connection.release(); 
  }
});

module.exports = pool.promise();
