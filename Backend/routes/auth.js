const express = require('express');
const router = express.Router();
const { register, login, refreshToken, logout } = require('../controllers/authController');

// register
router.post('/register', register);
// login
router.post('/login', login);
// refresh the Tokens
router.post('/refresh', refreshToken);
// logout
router.post('/logout', logout);

module.exports = router;
