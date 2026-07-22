const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/userModel');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_jwt_secret_key';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '24h';

/**
 * Helper to generate JWT token for a user
 */
function generateToken(user) {
  return jwt.sign(
    { id: user.id, email: user.email, name: user.name },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );
}

/**
 * POST /auth/register
 * User Registration Handler
 */
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // 1. Check if user already exists
    const existingUser = await UserModel.findByEmail(email);
    if (existingUser) {
      return res.status(400).json({
        error: "Bad Request",
        message: "An account with this email address already exists"
      });
    }

    // 2. Hash password securely using bcrypt (salt rounds = 10)
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // 3. Save new user to database
    const newUser = await UserModel.create({
      name,
      email,
      passwordHash
    });

    // 4. Generate JWT Authentication Token
    const token = generateToken(newUser);

    res.status(201).json({
      message: "User registered successfully",
      token,
      user: newUser
    });
  } catch (error) {
    console.error('Error during registration:', error.message);
    res.status(500).json({
      error: "Internal Server Error",
      message: error.message || "Failed to register user"
    });
  }
};

/**
 * POST /auth/login
 * User Login Handler
 */
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Find user by email
    const user = await UserModel.findByEmail(email);
    if (!user) {
      return res.status(401).json({
        error: "Unauthorized",
        message: "Invalid email or password"
      });
    }

    // 2. Verify password with bcrypt
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordValid) {
      return res.status(401).json({
        error: "Unauthorized",
        message: "Invalid email or password"
      });
    }

    // 3. Prepare clean user payload (excluding password hash)
    const userProfile = {
      id: user.id,
      name: user.name,
      email: user.email,
      created_at: user.created_at
    };

    // 4. Generate JWT Token
    const token = generateToken(userProfile);

    res.status(200).json({
      message: "Login successful",
      token,
      user: userProfile
    });
  } catch (error) {
    console.error('Error during login:', error.message);
    res.status(500).json({
      error: "Internal Server Error",
      message: error.message || "Failed to log in"
    });
  }
};

/**
 * GET /auth/me
 * Protected Profile Endpoint - Returns currently authenticated user profile
 */
const getProfile = async (req, res) => {
  try {
    // req.user is set by authenticateToken middleware
    const user = await UserModel.findById(req.user.id);
    if (!user) {
      return res.status(404).json({
        error: "Not Found",
        message: "User profile not found"
      });
    }

    res.status(200).json({
      user
    });
  } catch (error) {
    console.error('Error fetching user profile:', error.message);
    res.status(500).json({
      error: "Internal Server Error",
      message: error.message || "Failed to retrieve profile"
    });
  }
};

/**
 * POST /auth/logout
 * Logout Endpoint - Invalidates token on client side
 */
const logout = async (req, res) => {
  res.status(200).json({
    message: "Logout successful. Please discard token on client."
  });
};

module.exports = {
  register,
  login,
  getProfile,
  logout
};
