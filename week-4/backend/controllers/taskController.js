const TaskModel = require('../models/taskModel');

/**
 * GET /tasks
 * Return all tasks (or user-specific tasks if authenticated)
 */
const getAllTasks = async (req, res) => {
  try {
    const userId = req.user ? req.user.id : null;
    const tasks = await TaskModel.getAll(userId);
    res.status(200).json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error.message);
    res.status(500).json({
      error: "Internal Server Error",
      message: error.message || "Failed to retrieve tasks from database"
    });
  }
};

/**
 * GET /tasks/:id
 * Return a single task by ID
 */
const getTaskById = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    
    if (isNaN(id)) {
      return res.status(400).json({
        error: "Bad Request",
        message: "Task ID must be a valid number"
      });
    }

    const task = await TaskModel.getById(id);

    if (!task) {
      return res.status(404).json({
        error: "Not Found",
        message: `Task with ID ${id} not found`
      });
    }

    res.status(200).json(task);
  } catch (error) {
    console.error(`Error fetching task ${req.params.id}:`, error.message);
    res.status(500).json({
      error: "Internal Server Error",
      message: error.message || "Failed to retrieve task from database"
    });
  }
};

/**
 * POST /tasks
 * Create a new task (Protected - attaches authenticated user ID)
 */
const createTask = async (req, res) => {
  try {
    const { title, completed } = req.body;
    const userId = req.user ? req.user.id : null;
    
    const newTask = await TaskModel.create({
      title: title.trim(),
      completed: completed === undefined ? false : completed,
      userId
    });

    res.status(201).json(newTask);
  } catch (error) {
    console.error('Error creating task:', error.message);
    res.status(500).json({
      error: "Internal Server Error",
      message: error.message || "Failed to create task in database"
    });
  }
};

/**
 * PUT /tasks/:id
 * Update an existing task (Protected)
 */
const updateTask = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    
    if (isNaN(id)) {
      return res.status(400).json({
        error: "Bad Request",
        message: "Task ID must be a valid number"
      });
    }

    const existingTask = await TaskModel.getById(id);
    if (!existingTask) {
      return res.status(404).json({
        error: "Not Found",
        message: `Task with ID ${id} not found`
      });
    }

    const { title, completed } = req.body;
    const updates = {};

    if (title !== undefined) {
      updates.title = title.trim();
    }
    if (completed !== undefined) {
      updates.completed = completed;
    }

    const updatedTask = await TaskModel.update(id, updates);

    res.status(200).json(updatedTask);
  } catch (error) {
    console.error(`Error updating task ${req.params.id}:`, error.message);
    res.status(500).json({
      error: "Internal Server Error",
      message: error.message || "Failed to update task in database"
    });
  }
};

/**
 * DELETE /tasks/:id
 * Delete a task (Protected)
 */
const deleteTask = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    
    if (isNaN(id)) {
      return res.status(400).json({
        error: "Bad Request",
        message: "Task ID must be a valid number"
      });
    }

    const existingTask = await TaskModel.getById(id);
    if (!existingTask) {
      return res.status(404).json({
        error: "Not Found",
        message: `Task with ID ${id} not found`
      });
    }

    await TaskModel.delete(id);

    res.status(200).json({
      message: "Task deleted successfully"
    });
  } catch (error) {
    console.error(`Error deleting task ${req.params.id}:`, error.message);
    res.status(500).json({
      error: "Internal Server Error",
      message: error.message || "Failed to delete task from database"
    });
  }
};

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask
};
