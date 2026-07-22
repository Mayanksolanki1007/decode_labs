# DecodeLabs Week 3 – Backend API with Supabase Integration

This module contains the backend API for **Week 3 of the DecodeLabs Full Stack Internship**. The backend has been upgraded from temporary in-memory arrays to a real-time PostgreSQL database using **Supabase**.

---

## 📂 Architecture

- **`config/supabaseClient.js`**: Initializes the `@supabase/supabase-js` client using credentials loaded from `.env`.
- **`models/taskModel.js`**: Data Access Layer (DAL) performing asynchronous queries against the Supabase `tasks` table.
- **`controllers/taskController.js`**: Controller layer enforcing request/response handling, HTTP status codes, and error catching.
- **`routes/taskRoutes.js`**: Express Router defining RESTful endpoints and binding validation middleware.
- **`middleware/validation.js`**: Input sanitization and validation for task creation and updates.

---

## 🚀 Setup & Execution

1. Install dependencies:
   ```bash
   npm install
   ```
2. Configure `.env`:
   ```env
   PORT=5000
   SUPABASE_URL=https://your-project-id.supabase.co
   SUPABASE_KEY=your-supabase-anon-key
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
