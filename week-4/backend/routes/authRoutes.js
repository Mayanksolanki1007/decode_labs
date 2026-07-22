const express = require('express');
const router = express.Router();

const {
  register,
  login,
  getProfile,
  logout
} = require('../controllers/authController');

const {
  validateRegister,
  validateLogin
} = require('../middleware/validation');

const {
  authenticateToken
} = require('../middleware/authMiddleware');

// POST /auth/register - Register a new user
router.post('/register', validateRegister, register);

// POST /auth/signup - Alternative alias for registration
router.post('/signup', validateRegister, register);

// POST /auth/login - User Login
router.post('/login', validateLogin, login);

// GET /auth/me - Get current user profile (Protected)
router.get('/me', authenticateToken, getProfile);

// POST /auth/logout - User Logout (Protected)
router.post('/logout', authenticateToken, logout);

module.exports = router;
