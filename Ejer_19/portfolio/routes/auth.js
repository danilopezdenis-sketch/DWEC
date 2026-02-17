const express = require('express');
const crypto = require('crypto');
const db = require('../db');
const router = express.Router();

router.get('/register', (req, res) => {
  res.render('register');
});

router.post('/register', async (req, res) => {
  const { username, password, email } = req.body;
  const hashed = crypto.createHash('md5').update(password).digest('hex');

  await db.query(
    'INSERT INTO users (username, password, email) VALUES (?, ?, ?)',
    [username, hashed, email]
  );
  res.redirect('/login');
});


router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const hashed = crypto.createHash('md5').update(password).digest('hex');

  const [rows] = await db.query(
    'SELECT * FROM users WHERE username = ? AND password = ?',
    [username, hashed]
  );

  if (rows.length > 0) {
    req.session.user = rows[0];
    res.redirect('/dashboard');
  } else {
    res.send('Credenciales incorrectas');
  }
});

module.exports = router;
