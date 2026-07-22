# DecodeLabs Week 4 – Backend Authentication API

This module contains the Express.js API for **Week 4 of the DecodeLabs Full Stack Internship**, providing JWT authentication and Supabase PostgreSQL integration.

---

## 🔒 Authentication Flow Architecture

1. **User Sign Up (`POST /auth/register`)**:
   - Validates input (`name`, `email`, `password`).
   - Checks database for duplicate email.
   - Hashes password using `bcryptjs` (10 rounds).
   - Inserts record into Supabase `users` table.
   - Generates JWT signed with `JWT_SECRET`.

2. **User Login (`POST /auth/login`)**:
   - Fetches user record from Supabase by email.
   - Verifies password using `bcrypt.compare`.
   - Generates JWT token with 24-hour expiration.

3. **Protected Routes (`authMiddleware.js`)**:
   - Intercepts incoming requests.
   - Extracts JWT from `Authorization: Bearer <token>` header.
   - Verifies signature and expiration.
   - Attaches `req.user` payload to request object.

---

## 🚀 Execution

```bash
npm install
npm run dev
```
