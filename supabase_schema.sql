-- ========================================================
-- SHOWTICKET - SUPABASE DATABASE SCHEMA & SEED DATA
-- Run this in your Supabase Dashboard -> SQL Editor
-- ========================================================

-- 1. Create the `movies` table
CREATE TABLE IF NOT EXISTS public.movies (
    id BIGSERIAL PRIMARY KEY,
    movie TEXT NOT NULL,
    theatre TEXT NOT NULL,
    show_time TEXT NOT NULL,
    price NUMERIC NOT NULL DEFAULT 250,
    language TEXT DEFAULT 'English',
    format TEXT DEFAULT '2D',
    genre TEXT DEFAULT 'Action/Drama',
    rating NUMERIC DEFAULT 9.0,
    votes TEXT DEFAULT '25K',
    city TEXT DEFAULT 'Mumbai',
    badge TEXT DEFAULT 'Available',
    duration TEXT DEFAULT '2h 30m',
    certificate TEXT DEFAULT 'UA 16+',
    poster TEXT,
    backdrop TEXT,
    synopsis TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Create the `bookings` table
CREATE TABLE IF NOT EXISTS public.bookings (
    id BIGSERIAL PRIMARY KEY,
    booking_id TEXT UNIQUE NOT NULL,
    movie_id BIGINT REFERENCES public.movies(id) ON DELETE SET NULL,
    movie_title TEXT NOT NULL,
    theatre_name TEXT NOT NULL,
    show_time TEXT NOT NULL,
    date_info TEXT NOT NULL,
    format TEXT DEFAULT '2D',
    seats JSONB NOT NULL DEFAULT '[]'::jsonb,
    snacks JSONB DEFAULT '[]'::jsonb,
    grand_total NUMERIC NOT NULL,
    payment_method TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Enable Row Level Security (RLS)
ALTER TABLE public.movies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- 4. Create Policies for Anonymous & Public Access (Anon Key)
-- Movies: Anyone can read and add movie listings
DROP POLICY IF EXISTS "Allow public read access on movies" ON public.movies;
CREATE POLICY "Allow public read access on movies" 
ON public.movies FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public insert on movies" ON public.movies;
CREATE POLICY "Allow public insert on movies" 
ON public.movies FOR INSERT WITH CHECK (true);

-- Bookings: Anyone can create and read their bookings
DROP POLICY IF EXISTS "Allow public read access on bookings" ON public.bookings;
CREATE POLICY "Allow public read access on bookings" 
ON public.bookings FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public insert on bookings" ON public.bookings;
CREATE POLICY "Allow public insert on bookings" 
ON public.bookings FOR INSERT WITH CHECK (true);

-- 5. Seed Initial Blockbusters
INSERT INTO public.movies (
    movie, theatre, show_time, price, language, format, genre, rating, votes, city, badge, duration, certificate, poster, backdrop, synopsis
) VALUES
(
    'Avengers: Endgame',
    'PVR ICON: Phoenix Palladium, Lower Parel',
    '07:30 PM',
    320,
    'English',
    'IMAX 3D',
    'Action/Sci-Fi',
    9.4,
    '410.2K',
    'Mumbai',
    'Filling Fast',
    '3h 02m',
    'UA 16+',
    'https://images.unsplash.com/photo-1635805737707-575885ab0820?auto=format&fit=crop&w=700&q=80',
    'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1400&q=80',
    'After the devastating events of Infinity War, the universe is in ruins. With the help of remaining allies, the Avengers assemble once more in order to reverse Thanos'' actions and restore balance to the universe.'
),
(
    'Interstellar',
    'INOX: Megaplex, Inorbit Mall, Malad',
    '08:00 PM',
    350,
    'English',
    'IMAX 2D',
    'Sci-Fi/Adventure',
    9.6,
    '320.5K',
    'Mumbai',
    'Special Screening',
    '2h 49m',
    'UA 13+',
    'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=700&q=80',
    'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=1400&q=80',
    'When Earth becomes uninhabitable in the future, a farmer and ex-NASA pilot, Joseph Cooper, is tasked to pilot a spacecraft to find a new planet for humanity.'
),
(
    'Dune: Part Two',
    'Cinepolis: Viviana Mall, Thane',
    '06:15 PM',
    280,
    'English',
    '4DX 3D',
    'Sci-Fi/Action',
    9.2,
    '189.4K',
    'Mumbai',
    'Critically Acclaimed',
    '2h 46m',
    'UA 16+',
    'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=700&q=80',
    'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1400&q=80',
    'Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.'
),
(
    'Kalki 2898 AD',
    'PVR: ECX, Chanakyapuri',
    '09:00 PM',
    300,
    'Hindi',
    '3D',
    'Action/Mythology',
    8.9,
    '512.1K',
    'Delhi-NCR',
    'Blockbuster Hit',
    '3h 01m',
    'UA 16+',
    'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=700&q=80',
    'https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=1400&q=80',
    'Set in a post-apocalyptic world in the year 2898 AD, a chosen few embark on a dangerous quest to protect Kalki against tyrannical dictator Supreme Yaskin.'
),
(
    'Stree 2: Sarkate Ka Aatank',
    'Miraj Cinemas: Shalimar',
    '04:45 PM',
    220,
    'Hindi',
    '2D',
    'Comedy/Horror',
    8.8,
    '380.0K',
    'Delhi-NCR',
    'Superhit',
    '2h 27m',
    'UA 16+',
    'https://images.unsplash.com/photo-1509281373149-e957c6296406?auto=format&fit=crop&w=700&q=80',
    'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=1400&q=80',
    'The town of Chanderi is haunted once again by a headless demon Sarkata. The squad must team up with Stree to defeat the evil demon.'
),
(
    'Spider-Man: Beyond the Spider-Verse',
    'PVR: Forum Mall, Koramangala',
    '07:15 PM',
    290,
    'English',
    '4DX',
    'Animation/Action',
    9.5,
    '194.8K',
    'Bengaluru',
    'Most Anticipated',
    '2h 20m',
    'U',
    'https://images.unsplash.com/photo-1604200213928-ba3cf4fc8436?auto=format&fit=crop&w=700&q=80',
    'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1400&q=80',
    'Miles Morales embarks on his next multidimensional odyssey to save every universe from collapse.'
)
ON CONFLICT DO NOTHING;
