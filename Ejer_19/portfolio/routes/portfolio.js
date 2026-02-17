const express = require('express');
const db = require('../db');
const router = express.Router();

router.get('/portfolio/:username', async (req, res) => {
  const username = req.params.username;

  const [users] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
  if (users.length === 0) return res.send('Usuario no encontrado');

  const user = users[0];

  const [projects] = await db.query('SELECT * FROM projects WHERE user_id = ?', [user.id]);
  const [links] = await db.query('SELECT * FROM social_links WHERE user_id = ?', [user.id]);

  const isOwner = req.session.user && req.session.user.id === user.id;

  res.render('portfolio', { user, projects, links, isOwner });
});

module.exports = router;
