# DecodeLabs Week 2 – Backend API Development

Welcome to the backend project for **Week 2 of the DecodeLabs Full Stack Internship**. This project is a modular, RESTful API built from scratch using Node.js and Express.js, implementing clean-code architecture with routes, controllers, middleware, utilities, and in-memory data store.

---

## 📂 Folder Structure

The project follows a standard production-ready modular design:

```text
backend/
├── package.json          # Project configuration, scripts, and dependencies
├── server.js            # Entry point for the Express server
├── routes/
│   └── taskRoutes.js    # URL routing and HTTP method mappings
├── controllers/
│   └── taskController.js # Request-response handlers containing business logic
├── middleware/
│   └── validation.js    # Reusable request input validation middleware
├── data/
│   └── tasks.js         # In-memory storage array for seeded tasks data
├── utils/
│   └── generateId.js    # Utility for auto-generating unique sequential IDs
└── README.md            # Comprehensive project documentation (this file)
```

---

## ✨ Features

- **Express Server**: Configured with standard security and parsing tools (`cors`, `express.json()`).
- **RESTful Endpoints**: Proper URL mappings (`GET /tasks`, `GET /tasks/:id`, `POST /tasks`, `PUT /tasks/:id`, `DELETE /tasks/:id`).
- **Clean Architecture**: Controller-Route-Middleware separation prevents bloated code.
- **Robust Input Validation**: Validates existence, length, types, and empty values.
- **Error Handling**: Gracefully returns structured JSON messages for `400 Bad Request`, `404 Not Found`, and `500 Internal Server Error`.
- **In-Memory Storage**: Works without database setup, keeping it beginner-friendly and portable.

---

## 🚀 Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) installed (v16.x or higher recommended).

### Installation

1. Navigate to the `backend` directory:
   ```bash
   cd week-2/backend
   ```
2. Install the required dependencies:
   ```bash
   npm install
   ```

### Running the Server

You can run the server in two modes:

#### 1. Development Mode (with automatic restart)
If you have `nodemon` installed (dev dependency), run:
```bash
npm run dev
```

#### 2. Production Mode (standard execution)
Run the server using standard node execution:
```bash
npm start
```

You should see the output:
```text
Server Running on Port 5000
```

---

## 📡 API Documentation & Examples

### Base Endpoint
Verify that the server is alive and running successfully.

- **URL**: `/`
- **Method**: `GET`
- **Response**: `200 OK`
  ```json
  {
    "message": "Backend Running Successfully"
  }
  ```

---

### Task Endpoints

#### 1. Get All Tasks
- **URL**: `/tasks`
- **Method**: `GET`
- **Response**: `200 OK`
  ```json
  [
    {
      "id": 1,
      "title": "Learn Node.js",
      "completed": false
    },
    {
      "id": 2,
      "title": "Learn Express.js",
      "completed": false
    },
    {
      "id": 3,
      "title": "Build REST API",
      "completed": false
    }
  ]
  ```

#### 2. Get Task by ID
- **URL**: `/tasks/:id`
- **Method**: `GET`
- **Response**: `200 OK` (when task exists)
  ```json
  {
    "id": 1,
    "title": "Learn Node.js",
    "completed": false
  }
  ```
- **Error Response**: `404 Not Found` (when task does not exist)
  ```json
  {
    "error": "Not Found",
    "message": "Task with ID 999 not found"
  }
  ```

#### 3. Create Task
- **URL**: `/tasks`
- **Method**: `POST`
- **Headers**: `Content-Type: application/json`
- **Request Body**:
  ```json
  {
    "title": "Learn React Integration",
    "completed": false
  }
  ```
- **Response**: `201 Created`
  ```json
  {
    "id": 4,
    "title": "Learn React Integration",
    "completed": false
  }
  ```
- **Validation Errors (Status `400 Bad Request`)**:
  - Missing title:
    ```json
    {
      "error": "Validation Error",
      "messages": [
        "Title is required"
      ]
    }
    ```
  - Title too short (less than 3 characters):
    ```json
    {
      "error": "Validation Error",
      "messages": [
        "Title must be at least 3 characters long"
      ]
    }
    ```

#### 4. Update Task
- **URL**: `/tasks/:id`
- **Method**: `PUT`
- **Headers**: `Content-Type: application/json`
- **Request Body (Update all or partial fields)**:
  ```json
  {
    "title": "Master Node & Express",
    "completed": true
  }
  ```
- **Response**: `200 OK`
  ```json
  {
    "id": 1,
    "title": "Master Node & Express",
    "completed": true
  }
  ```
- **Error Response**: `404 Not Found` (if updating non-existent task)
  ```json
  {
    "error": "Not Found",
    "message": "Task with ID 999 not found"
  }
  ```

#### 5. Delete Task
- **URL**: `/tasks/:id`
- **Method**: `DELETE`
- **Response**: `200 OK`
  ```json
  {
    "message": "Task deleted successfully"
  }
  ```
- **Error Response**: `404 Not Found` (if deleting non-existent task)
  ```json
  {
    "error": "Not Found",
    "message": "Task with ID 999 not found"
  }
  ```

---

## 🔌 Frontend Integration (React & Vanilla JS)

Connecting this backend to your frontend is straightforward using the `fetch` API.

### Config settings
Because the backend runs on `http://localhost:5000`, configure your fetch requests accordingly.

### ⚛️ Connecting with a React Frontend

Create an API helper file (e.g., `src/api.js`) to interact with the backend:

```javascript
const API_BASE_URL = 'http://localhost:5000/tasks';

export const taskApi = {
  // Fetch all tasks
  async getTasks() {
    const response = await fetch(API_BASE_URL);
    if (!response.ok) throw new Error('Failed to fetch tasks');
    return response.json();
  },

  // Create a task
  async createTask(title) {
    const response = await fetch(API_BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, completed: false }),
    });
    if (!response.ok) {
      const errData = await response.json();
      throw new Error(errData.messages ? errData.messages.join(', ') : 'Failed to create task');
    }
    return response.json();
  },

  // Toggle complete state
  async toggleTaskStatus(id, currentCompleted) {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed: !currentCompleted }),
    });
    if (!response.ok) throw new Error('Failed to update task');
    return response.json();
  },

  // Delete a task
  async deleteTask(id) {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete task');
    return response.json();
  }
};
```

#### Example React Component Use Case
```jsx
import React, { useEffect, useState } from 'react';
import { taskApi } from './api';

function TaskApp() {
  const [tasks, setTasks] = useState([]);
  const [newTitle, setNewTitle] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    taskApi.getTasks()
      .then(setTasks)
      .catch(err => setError(err.message));
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const created = await taskApi.createTask(newTitle);
      setTasks([...tasks, created]);
      setNewTitle('');
      setError('');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleToggle = async (id, currentCompleted) => {
    try {
      const updated = await taskApi.toggleTaskStatus(id, currentCompleted);
      setTasks(tasks.map(t => t.id === id ? updated : t));
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await taskApi.deleteTask(id);
      setTasks(tasks.filter(t => t.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h1>My Task list</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleAdd}>
        <input 
          value={newTitle} 
          onChange={e => setNewTitle(e.target.value)} 
          placeholder="New task..."
        />
        <button type="submit">Add Task</button>
      </form>
      <ul>
        {tasks.map(task => (
          <li key={task.id} style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
            <span onClick={() => handleToggle(task.id, task.completed)}>{task.title}</span>
            <button onClick={() => handleDelete(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

### 🌐 Connecting with Vanilla HTML/JS Frontend

In your vanilla JS files, you can bind backend calls directly to DOM elements:

```javascript
const API_URL = 'http://localhost:5000/tasks';

// Read all tasks
async function loadTasks() {
  const response = await fetch(API_URL);
  const tasks = await response.json();
  const listEl = document.getElementById('task-list');
  listEl.innerHTML = '';
  
  tasks.forEach(task => {
    const li = document.createElement('li');
    li.textContent = `${task.title} [${task.completed ? 'COMPLETED' : 'PENDING'}]`;
    
    // Delete button
    const delBtn = document.createElement('button');
    delBtn.textContent = 'Delete';
    delBtn.onclick = () => removeTask(task.id);
    
    li.appendChild(delBtn);
    listEl.appendChild(li);
  });
}

// Add a task
async function addTask(title) {
  await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, completed: false })
  });
  loadTasks();
}

// Delete task
async function removeTask(id) {
  await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
  loadTasks();
}
```
