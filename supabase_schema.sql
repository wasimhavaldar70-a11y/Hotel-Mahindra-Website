-- ============================================================================
-- MAHENDRA HOTEL KOLHAPUR - SUPABASE DATABASE SETUP & SCHEMA
-- 
-- INSTRUCTIONS:
-- 1. Log into your Supabase Dashboard (https://app.supabase.com)
-- 2. Open your project -> Click on "SQL Editor" on the left menu
-- 3. Paste this script and click "RUN"
-- ============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ----------------------------------------------------------------------------
-- 1. ROOMS INVENTORY TABLE
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.rooms (
    id TEXT PRIMARY KEY,
    number TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    type TEXT NOT NULL,
    price NUMERIC NOT NULL,
    status TEXT NOT NULL DEFAULT 'Available' CHECK (status IN ('Available', 'Occupied', 'Cleaning', 'Maintenance')),
    guest_name TEXT,
    check_out TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ----------------------------------------------------------------------------
-- 2. GUEST BOOKING INQUIRIES TABLE
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.inquiries (
    id TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::text,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    room_requested TEXT NOT NULL,
    date TEXT NOT NULL DEFAULT 'Today',
    status TEXT NOT NULL DEFAULT 'New Inquiry' CHECK (status IN ('New Inquiry', 'Contacted', 'Confirmed', 'Cancelled')),
    source TEXT NOT NULL DEFAULT 'Website Form' CHECK (source IN ('WhatsApp', 'Phone Call', 'Website Form')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ----------------------------------------------------------------------------
-- 3. GALLERY PHOTOS TABLE
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.gallery (
    id TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::text,
    title TEXT NOT NULL,
    url TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('rooms', 'exterior', 'lobby', 'dining', 'general')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ----------------------------------------------------------------------------
-- 4. ANNOUNCEMENT BANNER TABLE
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.announcements (
    id TEXT PRIMARY KEY DEFAULT 'main-banner',
    message TEXT NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT true,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ----------------------------------------------------------------------------
-- ROW LEVEL SECURITY (RLS) POLICIES
-- Enable read access for public website & full write access
-- ----------------------------------------------------------------------------
ALTER TABLE public.rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.announcements ENABLE ROW LEVEL SECURITY;

-- Allow Public SELECT for all tables
DROP POLICY IF EXISTS "Allow public read rooms" ON public.rooms;
CREATE POLICY "Allow public read rooms" ON public.rooms FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public insert inquiries" ON public.inquiries;
CREATE POLICY "Allow public insert inquiries" ON public.inquiries FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public read inquiries" ON public.inquiries;
CREATE POLICY "Allow public read inquiries" ON public.inquiries FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public read gallery" ON public.gallery;
CREATE POLICY "Allow public read gallery" ON public.gallery FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public read announcements" ON public.announcements;
CREATE POLICY "Allow public read announcements" ON public.announcements FOR SELECT USING (true);

-- Allow Full Access for Admin / Anon API requests
DROP POLICY IF EXISTS "Allow full admin rooms" ON public.rooms;
CREATE POLICY "Allow full admin rooms" ON public.rooms FOR ALL USING (true);

DROP POLICY IF EXISTS "Allow full admin inquiries" ON public.inquiries;
CREATE POLICY "Allow full admin inquiries" ON public.inquiries FOR ALL USING (true);

DROP POLICY IF EXISTS "Allow full admin gallery" ON public.gallery;
CREATE POLICY "Allow full admin gallery" ON public.gallery FOR ALL USING (true);

DROP POLICY IF EXISTS "Allow full admin announcements" ON public.announcements;
CREATE POLICY "Allow full admin announcements" ON public.announcements FOR ALL USING (true);

-- ----------------------------------------------------------------------------
-- SEED DATA SETUP
-- Populate initial room inventory and default content
-- ----------------------------------------------------------------------------
INSERT INTO public.rooms (id, number, name, type, price, status, guest_name, check_out)
VALUES 
    ('101', '101', 'Deluxe AC Room', 'Deluxe AC', 1800, 'Occupied', 'Rahul Sharma', 'Tomorrow, 11:00 AM'),
    ('102', '102', 'Deluxe AC Room', 'Deluxe AC', 1800, 'Available', NULL, NULL),
    ('103', '103', 'Deluxe AC Room', 'Deluxe AC', 1800, 'Cleaning', NULL, NULL),
    ('201', '201', 'Family AC Suite', 'Family AC', 2800, 'Occupied', 'Vikram Patil & Family', 'Today, 11:00 AM'),
    ('202', '202', 'Family AC Suite', 'Family AC', 2800, 'Available', NULL, NULL),
    ('301', '301', 'Standard Non-AC Room', 'Standard Non-AC', 1200, 'Available', NULL, NULL),
    ('302', '302', 'Standard Non-AC Room', 'Standard Non-AC', 1200, 'Occupied', 'Sanjay Deshmukh', '25 Jul, 10:00 AM'),
    ('303', '303', 'Standard Non-AC Room', 'Standard Non-AC', 1200, 'Maintenance', NULL, NULL)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.announcements (id, message, is_active)
VALUES ('main-banner', '✨ Special Offer: 10% Discount on Direct Phone & WhatsApp Bookings!', true)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.gallery (id, title, url, category)
VALUES 
    ('g1', 'Mahendra Hotel Front Facade & Entrance', 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80', 'exterior'),
    ('g2', 'Warm and Welcoming Reception Desk', 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80', 'lobby'),
    ('g3', 'Deluxe AC Bed Configuration', 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=800&q=80', 'rooms'),
    ('g4', 'Executive Family AC Suite Double King Beds', 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=800&q=80', 'rooms')
ON CONFLICT (id) DO NOTHING;

-- ----------------------------------------------------------------------------
-- 5. SECTION IMAGES TABLE (Hero, About, Rooms, Attractions, Gallery)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.section_images (
    id TEXT PRIMARY KEY DEFAULT uuid_generate_v4()::text,
    section_key TEXT NOT NULL CHECK (section_key IN ('hero', 'about', 'deluxe-ac-room', 'family-ac-suite', 'standard-non-ac-room', 'attractions', 'gallery')),
    url TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    category TEXT,
    sort_order INT NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.section_images ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public read section_images" ON public.section_images;
CREATE POLICY "Allow public read section_images" ON public.section_images FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow full admin section_images" ON public.section_images;
CREATE POLICY "Allow full admin section_images" ON public.section_images FOR ALL USING (true);

-- ----------------------------------------------------------------------------
-- 6. SUPABASE STORAGE BUCKET SETUP ('hotel-images')
-- Run this in SQL Editor to create a public storage bucket for image uploads
-- ----------------------------------------------------------------------------
INSERT INTO storage.buckets (id, name, public)
VALUES ('hotel-images', 'hotel-images', true)
ON CONFLICT (id) DO NOTHING;

-- Allow public read access to uploaded images in hotel-images bucket
DROP POLICY IF EXISTS "Allow public read hotel-images" ON storage.objects;
CREATE POLICY "Allow public read hotel-images"
ON storage.objects FOR SELECT
USING (bucket_id = 'hotel-images');

-- Allow admin/anon insert access to upload photos into hotel-images bucket
DROP POLICY IF EXISTS "Allow public upload hotel-images" ON storage.objects;
CREATE POLICY "Allow public upload hotel-images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'hotel-images');

-- Allow delete access for uploaded photos in hotel-images bucket
DROP POLICY IF EXISTS "Allow public delete hotel-images" ON storage.objects;
CREATE POLICY "Allow public delete hotel-images"
ON storage.objects FOR DELETE
USING (bucket_id = 'hotel-images');



