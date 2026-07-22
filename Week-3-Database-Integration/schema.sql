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

-- 4. (Optional) Create `events` Table for EventSphere Frontend Integration
CREATE TABLE IF NOT EXISTS public.events (
    id VARCHAR(100) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    date TIMESTAMPTZ NOT NULL,
    time VARCHAR(100),
    venue VARCHAR(255),
    college VARCHAR(255),
    prize_pool VARCHAR(100),
    seats_remaining INT DEFAULT 0,
    total_seats INT DEFAULT 0,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public access to events" ON public.events
    FOR ALL
    USING (true)
    WITH CHECK (true);
