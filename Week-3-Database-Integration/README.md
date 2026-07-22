# Week 3 - Database Integration

## Project Overview
This project is the Week 3 submission for DecodeLabs Full Stack Development Industrial Training.

The objective of this milestone is to integrate a database with the existing backend, replacing temporary data storage with persistent storage and implementing complete CRUD operations.

## Technologies Used
- Node.js
- Express.js
- Supabase (PostgreSQL)
- Supabase JavaScript SDK
- dotenv

## Features
- Database Integration using Supabase
- Create new records
- Read all records
- Update existing records
- Delete records
- Input validation
- Error handling
- Environment variable configuration

## Project Structure

```
Week-3-Database-Integration/
│
├── backend/
├── frontend/
├── .env.example
├── package.json
└── README.md
```

## Installation

1. Clone the repository.

2. Install dependencies

```bash
npm install
```

3. Create a `.env` file

```env
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Run the project

```bash
npm start
```

or

```bash
npm run dev
```

## Database

Database Used:
- Supabase PostgreSQL

The backend is connected to Supabase for storing and retrieving application data.

## CRUD Operations

The following operations are implemented:

- Create
- Read
- Update
- Delete

## Week 3 Objective Completed

- Connected backend with database
- Designed database schema
- Implemented CRUD operations
- Added proper data handling
- Used environment variables for secure configuration

## Author

**Mayank Solanki**

DecodeLabs Full Stack Development Industrial Training 2026
