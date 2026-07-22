const express = require('express');
const router = express.Router();

const {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask
} = require('../controllers/taskController');

const {
  validateCreateTask,
  validateUpdateTask
} = require('../middleware/validation');

const {
  authenticateToken,
  optionalAuth
} = require('../middleware/authMiddleware');

// GET /tasks - Return all tasks (optional authentication)
router.get('/', optionalAuth, getAllTasks);

// GET /tasks/:id - Return task by ID (optional authentication)
router.get('/:id', optionalAuth, getTaskById);

// POST /tasks - Create a new task (PROTECTED - Requires valid JWT token)
router.post('/', authenticateToken, validateCreateTask, createTask);

// PUT /tasks/:id - Update an existing task (PROTECTED - Requires valid JWT token)
router.put('/:id', authenticateToken, validateUpdateTask, updateTask);

// DELETE /tasks/:id - Delete a task (PROTECTED - Requires valid JWT token)
router.delete('/:id', authenticateToken, deleteTask);

module.exports = router;
