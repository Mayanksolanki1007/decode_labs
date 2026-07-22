-- ==========================================================
-- DecodeLabs Week 3 – Database Integration Schema (Supabase / PostgreSQL)
-- ==========================================================

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

-- 3. Enable Row Level Security (RLS) & Define Public Access Policy
ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public access to tasks" ON public.tasks
    FOR ALL
    USING (true)
    WITH CHECK (true);
