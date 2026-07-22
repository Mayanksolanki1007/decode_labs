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

// GET /tasks - Return all tasks
router.get('/', getAllTasks);

// GET /tasks/:id - Return a single task by ID
router.get('/:id', getTaskById);

// POST /tasks - Create a new task (with validation)
router.post('/', validateCreateTask, createTask);

// PUT /tasks/:id - Update an existing task (with validation)
router.put('/:id', validateUpdateTask, updateTask);

// DELETE /tasks/:id - Delete a task
router.delete('/:id', deleteTask);

module.exports = router;
