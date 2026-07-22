const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_jwt_secret_key';

/**
 * Authentication Middleware - Protects routes by validating JSON Web Tokens (JWT).
 */
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'] || req.headers['x-access-token'];
  let token = null;

  if (authHeader) {
    if (authHeader.startsWith('Bearer ')) {
      token = authHeader.substring(7).trim();
    } else {
      token = authHeader.trim();
    }
  }

  // 1. Check if token is missing
  if (!token) {
    return res.status(401).json({
      error: "Unauthorized",
      message: "Access denied. No authentication token provided."
    });
  }

  // 2. Verify JWT token
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // Attach payload (id, email, name) to request object
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        error: "Unauthorized",
        message: "Authentication token has expired. Please log in again."
      });
    }
    return res.status(403).json({
      error: "Forbidden",
      message: "Invalid authentication token."
    });
  }
}

/**
 * Optional Authentication Middleware - Attaches user if token is valid, but allows unauthenticated requests.
 */
function optionalAuth(req, res, next) {
  const authHeader = req.headers['authorization'] || req.headers['x-access-token'];
  let token = null;

  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.substring(7).trim();
  }

  if (token) {
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      req.user = decoded;
    } catch (err) {
      // Ignore invalid token for optional routes
    }
  }
  next();
}

module.exports = {
  authenticateToken,
  optionalAuth
};
