const express = require('express');
const path = require('path');

const publicDir = path.join(__dirname, '../public');

const router = express.Router();

function requiresAuthentication(req, res, next) {
  if (req.session && !req.session.authenticated) {
    return res.redirect('/login');
  }
  next();
}

router.get('/members', requiresAuthentication, (req, res) => {
  console.log('/members');
  res.sendFile(path.join(publicDir, 'members.html'));
});

router.get('/login', (req, res) => {
  console.log('/login');
  res.sendFile(path.join(publicDir, 'login.html'));
});

router.get('/register', (req, res) => {
  console.log('/register');
  res.sendFile(path.join(publicDir, 'register.html'));
});

router.get('/', (req, res) => {
  console.log('/');
  res.sendFile(path.join(publicDir, 'index.html'));
});

router.get('*', (req, res) => {
  console.log('*');
  res.sendFile(path.join(publicDir, 'not_found.html'));
});

module.exports = router;
