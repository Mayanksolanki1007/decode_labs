# DecodeLabs Week 3 – Database Integration with Supabase

Welcome to **Week 3 of the DecodeLabs Full Stack Internship**. This phase upgrades our Express.js REST API by replacing temporary in-memory data structures with a persistent PostgreSQL database hosted on **Supabase**.

---

## 📂 Project Structure

```text
Week-3-Database-Integration/
├── frontend/                     # Week 1 Frontend Application (EventSphere)
│   ├── index.html
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
│   │   ├── menu.js
│   │   ├── search.js
│   │   ├── filter.js
│   │   ├── countdown.js
│   │   ├── darkmode.js
│   │   └── favorites.js
│   └── data/
│       └── events.js
├── backend/                      # Week 3 Backend API with Supabase
│   ├── config/
│   │   └── supabaseClient.js    # Supabase Client Database Configuration
│   ├── models/
│   │   └── taskModel.js         # Supabase Database Query Operations
│   ├── controllers/
│   │   └── taskController.js    # Async HTTP Request Handlers
│   ├── routes/
│   │   └── taskRoutes.js        # Express URL Router Mappings
│   ├── middleware/
│   │   └── validation.js        # Input Validation Middleware
│   ├── .env                     # Local Environment Variables (Ignored in Git)
│   ├── .env.example             # Environment Variable Template
│   ├── package.json             # Project Dependencies & Scripts
│   ├── server.js                # Express Application Entry Point
│   └── schema.sql               # Database Table Definitions & Seed SQL
├── schema.sql                    # Root Database Schema SQL
└── README.md                     # Comprehensive Week 3 Documentation
```

---

## 🛢️ Database Schema (SQL)

Run the following SQL in your Supabase **SQL Editor**:

```sql
-- 1. Create `tasks` Table for Backend API
CREATE TABLE IF NOT EXISTS public.tasks (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    completed BOOLEAN DEFAULT FALSE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 2. Seed Initial Tasks Data
INSERT INTO public.tasks (title, completed) VALUES
    ('Learn Node.js', false),
    ('Learn Express.js', false),
    ('Build REST API', false),
    ('Integrate Supabase Database', true);

-- 3. Enable Row Level Security (RLS) & Grant Public Access Policy
ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public access to tasks" ON public.tasks
    FOR ALL
    USING (true)
    WITH CHECK (true);
```

---

## 📦 Required NPM Packages

| Package | Version | Purpose |
|---|---|---|
| `@supabase/supabase-js` | `^2.42.0` | Official JavaScript client for Supabase database operations |
| `dotenv` | `^16.4.5` | Loads environment variables from `.env` into `process.env` |
| `express` | `^4.19.2` | Core web framework for routing and request processing |
| `cors` | `^2.8.5` | Enables Cross-Origin Resource Sharing |
| `nodemon` | `^3.1.0` | Developer tool for automatic server reloads on code changes |

---

## 🔑 Step-by-Step Instructions to Connect Supabase

1. **Create a Supabase Account & Project**:
   - Go to [Supabase Dashboard](https://supabase.com/).
   - Click **New Project** and configure your project name, database password, and region.

2. **Run SQL Migration**:
   - Navigate to the **SQL Editor** tab in your Supabase project dashboard.
   - Copy the SQL script from `schema.sql` (or above) and click **Run**.

3. **Get API Credentials**:
   - Navigate to **Project Settings** -> **API**.
   - Copy your **Project URL** (`SUPABASE_URL`).
   - Copy your **`anon` `public` API Key** (`SUPABASE_KEY`).

4. **Configure Environment Variables**:
   - In `Week-3-Database-Integration/backend`, create a file named `.env` (or copy `.env.example`):
     ```bash
     cp .env.example .env
     ```
   - Add your Supabase credentials:
     ```env
     PORT=5000
     SUPABASE_URL=https://your-project-id.supabase.co
     SUPABASE_KEY=your-supabase-anon-key
     ```

---

## 🚀 Commands to Run the Project

### 1. Install Dependencies
Navigate to the `backend` directory and install packages:
```bash
cd Week-3-Database-Integration/backend
npm install
```

### 2. Run Server in Development Mode
Starts the server with hot-reloading:
```bash
npm run dev
```

### 3. Run Server in Production Mode
Starts the server with standard Node execution:
```bash
npm start
```

### 4. Serve the Frontend
You can launch `frontend/index.html` directly in any web browser, or serve it via python / Live Server:
```bash
cd ../frontend
python -m http.server 8000
```
Open `http://localhost:8000` in your browser.

---

## 📡 API Endpoints & CRUD Operations

| HTTP Method | Endpoint | Description | Status Code |
|---|---|---|---|
| `GET` | `/` | Base health check & database status | `200 OK` |
| `GET` | `/tasks` | Retrieve all tasks from Supabase | `200 OK` |
| `GET` | `/tasks/:id` | Retrieve a single task by ID | `200 OK` / `404 Not Found` |
| `POST` | `/tasks` | Create a new task in Supabase | `201 Created` / `400 Bad Request` |
| `PUT` | `/tasks/:id` | Update task title / completion status | `200 OK` / `404 Not Found` |
| `DELETE` | `/tasks/:id` | Delete task from Supabase | `200 OK` / `404 Not Found` |
