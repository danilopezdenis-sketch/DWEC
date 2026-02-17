const express = require('express');
const db = require('../db');
const router = express.Router();

function isAuth(req, res, next) {
  if (!req.session.user) return res.redirect('/login');
  next();
}

router.get('/dashboard', isAuth, async (req, res) => {
  const userId = req.session.user.id;

  const [projects] = await db.query('SELECT * FROM projects WHERE user_id = ?', [userId]);
  const [links] = await db.query('SELECT * FROM social_links WHERE user_id = ?', [userId]);

  res.render('dashboard', { user: req.session.user, projects, links });
});

router.post('/projects', isAuth, async (req, res) => {
  const { title, description, repo_url, live_url } = req.body;
  await db.query(
    'INSERT INTO projects (title, description, repo_url, live_url, user_id) VALUES (?, ?, ?, ?, ?)',
    [title, description, repo_url, live_url, req.session.user.id]
  );
  res.redirect('/dashboard');
});

router.post('/projects/delete/:id', isAuth, async (req, res) => {
  const projectId = req.params.id;
  await db.query('DELETE FROM projects WHERE id = ? AND user_id = ?', [projectId, req.session.user.id]);
  res.redirect('/dashboard');
});

router.post('/projects/edit/:id', isAuth, async (req, res) => {
  const projectId = req.params.id;
  const { title, description, repo_url, live_url } = req.body;

  await db.query(
    'UPDATE projects SET title=?, description=?, repo_url=?, live_url=? WHERE id=? AND user_id=?',
    [title, description, repo_url, live_url, projectId, req.session.user.id]
  );
  res.redirect('/dashboard');
});

router.post('/links', isAuth, async (req, res) => {
  const { platform, url } = req.body;
  await db.query(
    'INSERT INTO social_links (platform, url, user_id) VALUES (?, ?, ?)',
    [platform, url, req.session.user.id]
)});
module.exports = router;
