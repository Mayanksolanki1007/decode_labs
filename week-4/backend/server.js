const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Security & Parsing Middleware
app.use(cors());
app.use(express.json());

// Request Logger Middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// GET / - Root API Status Endpoint
app.get('/', (req, res) => {
  res.status(200).json({
    message: "Backend API with JWT Authentication & Supabase Database Running Successfully",
    authentication: "JWT & bcrypt enabled",
    database: "Supabase (PostgreSQL)",
    endpoints: {
      auth: ["POST /auth/register", "POST /auth/login", "GET /auth/me (Protected)", "POST /auth/logout (Protected)"],
      tasks: ["GET /tasks", "GET /tasks/:id", "POST /tasks (Protected)", "PUT /tasks/:id (Protected)", "DELETE /tasks/:id (Protected)"]
    }
  });
});

// Mount Routes
app.use('/auth', authRoutes);
app.use('/tasks', taskRoutes);

// 404 Unmatched Route Handler
app.use((req, res, next) => {
  res.status(404).json({
    error: "Not Found",
    message: `Cannot ${req.method} ${req.url}`
  });
});

// Global Error Handler (500)
app.use((err, req, res, next) => {
  console.error("Unhandled server error: ", err);
  res.status(500).json({
    error: "Internal Server Error",
    message: err.message || "An unexpected error occurred on the server"
  });
});

// Start Express Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🔒 Authentication: JWT & bcrypt enabled`);
  console.log(`🛢️ Database: Supabase client connected`);
});
