/**
 * Middleware to validate task creation (POST /tasks)
 */
function validateCreateTask(req, res, next) {
  const { title, completed } = req.body;
  const errors = [];

  // Check if body is missing
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({
      error: "Bad Request",
      message: "Request body is missing or empty"
    });
  }

  // Title validation
  if (title === undefined || title === null) {
    errors.push("Title is required");
  } else if (typeof title !== 'string') {
    errors.push("Title must be a string");
  } else if (title.trim().length < 3) {
    errors.push("Title must be at least 3 characters long");
  }

  // Completed validation (optional, but if provided, must be boolean)
  if (completed !== undefined && typeof completed !== 'boolean') {
    errors.push("Completed must be a boolean value");
  }

  if (errors.length > 0) {
    return res.status(400).json({
      error: "Validation Error",
      messages: errors
    });
  }

  next();
}

/**
 * Middleware to validate task update (PUT /tasks/:id)
 */
function validateUpdateTask(req, res, next) {
  const { title, completed } = req.body;
  const errors = [];

  // Check if body is missing or empty
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({
      error: "Bad Request",
      message: "Request body is missing or empty"
    });
  }

  // Check if at least one field is provided for update
  if (title === undefined && completed === undefined) {
    return res.status(400).json({
      error: "Validation Error",
      message: "At least one field (title or completed) must be provided for update"
    });
  }

  // Title validation (if provided)
  if (title !== undefined) {
    if (typeof title !== 'string') {
      errors.push("Title must be a string");
    } else if (title.trim().length < 3) {
      errors.push("Title must be at least 3 characters long");
    }
  }

  // Completed validation (if provided)
  if (completed !== undefined && typeof completed !== 'boolean') {
    errors.push("Completed must be a boolean value");
  }

  if (errors.length > 0) {
    return res.status(400).json({
      error: "Validation Error",
      messages: errors
    });
  }

  next();
}

module.exports = {
  validateCreateTask,
  validateUpdateTask
};
