const express = require('express');
const cors = require('cors');
const taskRoutes = require('./routes/taskRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Log incoming requests for better debuggability (beginner friendly)
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// GET / - Base endpoint
app.get('/', (req, res) => {
  res.status(200).json({
    message: "Backend Running Successfully"
  });
});

// Routes
app.use('/tasks', taskRoutes);

// 404 handler for unmatched routes
app.use((req, res, next) => {
  res.status(404).json({
    error: "Not Found",
    message: `Cannot ${req.method} ${req.url}`
  });
});

// Global Error Handler (500)
app.use((err, req, res, next) => {
  console.error("Unhandled error: ", err);
  res.status(500).json({
    error: "Internal Server Error",
    message: err.message || "An unexpected error occurred on the server"
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
