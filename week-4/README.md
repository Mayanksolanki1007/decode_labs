# DecodeLabs Week 4 – User Authentication & JWT Security

Welcome to **Week 4 of the DecodeLabs Full Stack Internship**. In this phase, we have integrated a production-ready **User Authentication System** using **JSON Web Tokens (JWT)** and **bcrypt password hashing** on top of our Supabase-backed Express API.

---

## 📂 1. Complete Folder Structure

```text
Week-4-Authentication/
├── frontend/                     # EventSphere Frontend Application with Auth UI
│   ├── index.html
│   ├── login.html               # Sign In & Sign Up Interface
│   ├── events.html
│   ├── event-details.html
│   ├── about.html
│   ├── contact.html
│   ├── css/
│   │   ├── style.css
│   │   ├── components.css
│   │   ├── responsive.css
│   │   └── animations.css
│   ├── js/
│   │   ├── app.js
│   │   ├── auth.js              # Client Auth Helper (Token Storage & Session)
│   │   ├── menu.js
│   │   ├── search.js
│   │   ├── filter.js
│   │   ├── countdown.js
│   │   ├── darkmode.js
│   │   └── favorites.js
│   └── data/
│       └── events.js
├── backend/                      # Express API with JWT Auth & Supabase
│   ├── config/
│   │   └── supabaseClient.js    # Supabase Client Initialization
│   ├── models/
│   │   ├── userModel.js         # User Database Model (Find, Create)
│   │   └── taskModel.js         # Task Database Model
│   ├── controllers/
│   │   ├── authController.js    # Register, Login, Profile, Logout Handlers
│   │   └── taskController.js    # Task CRUD Handlers (Protected Routes)
│   ├── routes/
│   │   ├── authRoutes.js        # Auth Endpoints (/auth)
│   │   └── taskRoutes.js        # Task Endpoints (/tasks)
│   ├── middleware/
│   │   ├── authMiddleware.js    # JWT Verification & Protection Middleware
│   │   └── validation.js        # Input Validation Middleware
│   ├── .env                     # Supabase & JWT Environment Secrets
│   ├── .env.example             # Environment Secrets Template
│   ├── package.json             # NPM Configuration & Dependencies
│   ├── server.js                # Express Server Entry Point
│   └── schema.sql               # Database Schema SQL
├── schema.sql                    # Root Database Migration Script
└── README.md                     # Comprehensive Week 4 Documentation
```

---

## 🛢️ 2. Database Schema Changes

Run the following SQL in your **Supabase SQL Editor**:

```sql
-- 1. Create `users` Table for Authentication
CREATE TABLE IF NOT EXISTS public.users (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 2. Create `tasks` Table with Optional User Association
CREATE TABLE IF NOT EXISTS public.tasks (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id BIGINT REFERENCES public.users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    completed BOOLEAN DEFAULT FALSE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 3. Row Level Security & Public Access Policy
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public full access to users" ON public.users FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow public full access to tasks" ON public.tasks FOR ALL USING (true) WITH CHECK (true);
```

---

## 📦 3. Required NPM Packages

| Package | Version | Purpose |
|---|---|---|
| `jsonwebtoken` | `^9.0.2` | Generates and verifies JWT authentication tokens |
| `bcryptjs` | `^2.4.3` | Hashes and compares user passwords securely |
| `@supabase/supabase-js` | `^2.42.0` | Supabase database client SDK |
| `dotenv` | `^16.4.5` | Loads configuration from `.env` |
| `express` | `^4.19.2` | Core web framework and API router |
| `cors` | `^2.8.5` | Enables Cross-Origin Resource Sharing |
| `nodemon` | `^3.1.0` | Hot-reloading server in development |

---

## 🚀 4. Setup & Running Instructions

### 1. Install Dependencies
Navigate to the `backend/` directory and install packages:
```bash
cd Week-4-Authentication/backend
npm install
```

### 2. Configure `.env`
Ensure your `backend/.env` file contains your Supabase credentials and a secure `JWT_SECRET`:
```env
PORT=5000
SUPABASE_URL=https://foftvaauzylewhixykdo.supabase.co
SUPABASE_KEY=your_supabase_key
JWT_SECRET=decodelabs_jwt_secret_key_week4_auth_2026
JWT_EXPIRES_IN=24h
```

### 3. Run Backend Server
- **Development Mode**:
  ```bash
  npm run dev
  ```
- **Production Mode**:
  ```bash
  npm start
  ```

### 4. Run Frontend
Launch `frontend/index.html` or `frontend/login.html` in your browser or run:
```bash
cd ../frontend
python -m http.server 8000
```
Open `http://localhost:8000` to test Login, Registration, and Navigation.

---

## 📡 5. API Documentation

### Authentication Routes (`/auth`)

#### 1. User Registration
- **URL**: `POST /auth/register` (or `POST /auth/signup`)
- **Headers**: `Content-Type: application/json`
- **Body**:
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Response (`201 Created`)**:
  ```json
  {
    "message": "User registered successfully",
    "token": "eyJhbGciOiJIUzI1Ni...",
    "user": {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "created_at": "2026-07-22T10:45:00.000Z"
    }
  }
  ```

#### 2. User Login
- **URL**: `POST /auth/login`
- **Headers**: `Content-Type: application/json`
- **Body**:
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Response (`200 OK`)**:
  ```json
  {
    "message": "Login successful",
    "token": "eyJhbGciOiJIUzI1Ni...",
    "user": {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "created_at": "2026-07-22T10:45:00.000Z"
    }
  }
  ```

#### 3. Get Authenticated User Profile (Protected)
- **URL**: `GET /auth/me`
- **Headers**: `Authorization: Bearer <token>`
- **Response (`200 OK`)**:
  ```json
  {
    "user": {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "created_at": "2026-07-22T10:45:00.000Z"
    }
  }
  ```

#### 4. User Logout (Protected)
- **URL**: `POST /auth/logout`
- **Headers**: `Authorization: Bearer <token>`
- **Response (`200 OK`)**:
  ```json
  {
    "message": "Logout successful. Please discard token on client."
  }
  ```

---

### Task Routes (`/tasks` - Protected)

| Method | Endpoint | Protection | Description |
|---|---|---|---|
| `GET` | `/tasks` | Optional Auth | Returns tasks list |
| `GET` | `/tasks/:id` | Optional Auth | Returns single task by ID |
| `POST` | `/tasks` | 🔒 Protected | Creates a new task linked to authenticated user |
| `PUT` | `/tasks/:id` | 🔒 Protected | Updates task by ID |
| `DELETE` | `/tasks/:id` | 🔒 Protected | Deletes task by ID |
