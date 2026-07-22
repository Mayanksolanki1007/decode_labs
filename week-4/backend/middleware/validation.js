/**
 * Middleware to validate user registration (POST /auth/register)
 */
function validateRegister(req, res, next) {
  const { name, email, password } = req.body || {};
  const errors = [];

  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({
      error: "Bad Request",
      message: "Request body is missing or empty"
    });
  }

  // Name validation
  if (!name || typeof name !== 'string' || name.trim().length < 2) {
    errors.push("Full Name is required and must be at least 2 characters long");
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || typeof email !== 'string' || !emailRegex.test(email.trim())) {
    errors.push("A valid email address is required");
  }

  // Password validation
  if (!password || typeof password !== 'string' || password.length < 6) {
    errors.push("Password is required and must be at least 6 characters long");
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
 * Middleware to validate user login (POST /auth/login)
 */
function validateLogin(req, res, next) {
  const { email, password } = req.body || {};
  const errors = [];

  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({
      error: "Bad Request",
      message: "Request body is missing or empty"
    });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || typeof email !== 'string' || !emailRegex.test(email.trim())) {
    errors.push("A valid email address is required");
  }

  if (!password || typeof password !== 'string') {
    errors.push("Password is required");
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
 * Middleware to validate task creation (POST /tasks)
 */
function validateCreateTask(req, res, next) {
  const { title, completed } = req.body || {};
  const errors = [];

  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({
      error: "Bad Request",
      message: "Request body is missing or empty"
    });
  }

  if (title === undefined || title === null) {
    errors.push("Title is required");
  } else if (typeof title !== 'string') {
    errors.push("Title must be a string");
  } else if (title.trim().length < 3) {
    errors.push("Title must be at least 3 characters long");
  }

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
  const { title, completed } = req.body || {};
  const errors = [];

  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({
      error: "Bad Request",
      message: "Request body is missing or empty"
    });
  }

  if (title === undefined && completed === undefined) {
    return res.status(400).json({
      error: "Validation Error",
      message: "At least one field (title or completed) must be provided for update"
    });
  }

  if (title !== undefined) {
    if (typeof title !== 'string') {
      errors.push("Title must be a string");
    } else if (title.trim().length < 3) {
      errors.push("Title must be at least 3 characters long");
    }
  }

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
  validateRegister,
  validateLogin,
  validateCreateTask,
  validateUpdateTask
};
