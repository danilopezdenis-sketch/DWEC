const db = require('./db');

const Libro = {
  getAll: async () => {
    const [rows] = await db.query(
      'SELECT id, titulo, autor, estado FROM libros'
    );
    return rows;
  },

  getById: async (id) => {
    const [rows] = await db.query(
      'SELECT * FROM libros WHERE id = ?',
      [id]
    );
    return rows[0];
  }
};

module.exports = Libro;
