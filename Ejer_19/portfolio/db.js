const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'database-1.cufrfwocjurf.us-east-1.rds.amazonaws.com',
  user: 'admin',
  password: 'kiva59_D',
  database: 'portfolio_app'
});

module.exports = pool.promise();
