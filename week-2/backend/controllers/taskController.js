const tasks = require('../data/tasks');
const generateId = require('../utils/generateId');

/**
 * GET /tasks
 * Return all tasks
 */
const getAllTasks = (req, res) => {
  try {
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({
      error: "Internal Server Error",
      message: error.message
    });
  }
};

/**
 * GET /tasks/:id
 * Return a single task by ID
 */
const getTaskById = (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    
    if (isNaN(id)) {
      return res.status(400).json({
        error: "Bad Request",
        message: "Task ID must be a valid number"
      });
    }

    const task = tasks.find(t => t.id === id);

    if (!task) {
      return res.status(404).json({
        error: "Not Found",
        message: `Task with ID ${id} not found`
      });
    }

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({
      error: "Internal Server Error",
      message: error.message
    });
  }
};

/**
 * POST /tasks
 * Create a new task
 */
const createTask = (req, res) => {
  try {
    const { title, completed } = req.body;
    
    const newTask = {
      id: generateId(tasks),
      title: title.trim(),
      completed: completed === undefined ? false : completed
    };

    tasks.push(newTask);
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({
      error: "Internal Server Error",
      message: error.message
    });
  }
};

/**
 * PUT /tasks/:id
 * Update an existing task
 */
const updateTask = (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    
    if (isNaN(id)) {
      return res.status(400).json({
        error: "Bad Request",
        message: "Task ID must be a valid number"
      });
    }

    const taskIndex = tasks.findIndex(t => t.id === id);

    if (taskIndex === -1) {
      return res.status(404).json({
        error: "Not Found",
        message: `Task with ID ${id} not found`
      });
    }

    const { title, completed } = req.body;

    // Mutate the existing task object properties in place
    if (title !== undefined) {
      tasks[taskIndex].title = title.trim();
    }
    if (completed !== undefined) {
      tasks[taskIndex].completed = completed;
    }

    res.status(200).json(tasks[taskIndex]);
  } catch (error) {
    res.status(500).json({
      error: "Internal Server Error",
      message: error.message
    });
  }
};

/**
 * DELETE /tasks/:id
 * Delete a task
 */
const deleteTask = (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    
    if (isNaN(id)) {
      return res.status(400).json({
        error: "Bad Request",
        message: "Task ID must be a valid number"
      });
    }

    const taskIndex = tasks.findIndex(t => t.id === id);

    if (taskIndex === -1) {
      return res.status(404).json({
        error: "Not Found",
        message: `Task with ID ${id} not found`
      });
    }

    // Mutate the array in place to remove the element
    tasks.splice(taskIndex, 1);

    res.status(200).json({
      message: "Task deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      error: "Internal Server Error",
      message: error.message
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
