-- ============================================================================
-- MAHENDRA HOTEL - SUPABASE PRODUCTION DATABASE SCHEMA & RLS SECURITY POLICIES
-- ============================================================================
-- Run this SQL script in your Supabase SQL Editor (https://app.supabase.com)

-- 1. ROOMS TABLE
CREATE TABLE IF NOT EXISTS public.rooms (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  number TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  price NUMERIC NOT NULL,
  status TEXT NOT NULL DEFAULT 'Available' CHECK (status IN ('Available', 'Occupied', 'Cleaning', 'Maintenance')),
  guest_name TEXT,
  check_out TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable Row Level Security (RLS) on rooms
ALTER TABLE public.rooms ENABLE ROW LEVEL SECURITY;

-- Allow public read access to rooms
CREATE POLICY "Public Read Rooms" ON public.rooms
  FOR SELECT USING (true);

-- Allow authenticated admin full control over rooms
CREATE POLICY "Admin Manage Rooms" ON public.rooms
  FOR ALL TO authenticated USING (true) WITH CHECK (true);


-- 2. INQUIRIES TABLE
CREATE TABLE IF NOT EXISTS public.inquiries (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  room_requested TEXT NOT NULL,
  date TEXT NOT NULL DEFAULT CURRENT_DATE::text,
  status TEXT NOT NULL DEFAULT 'New Inquiry' CHECK (status IN ('New Inquiry', 'Contacted', 'Confirmed', 'Cancelled')),
  source TEXT NOT NULL DEFAULT 'Website Form' CHECK (source IN ('WhatsApp', 'Phone Call', 'Website Form')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable RLS on inquiries
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;

-- Allow public site visitors to submit booking inquiries
CREATE POLICY "Public Create Inquiries" ON public.inquiries
  FOR INSERT WITH CHECK (true);

-- Allow authenticated admin to view and update inquiries
CREATE POLICY "Admin Select Inquiries" ON public.inquiries
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Admin Update Inquiries" ON public.inquiries
  FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Admin Delete Inquiries" ON public.inquiries
  FOR DELETE TO authenticated USING (true);


-- 3. SECTION IMAGES TABLE
CREATE TABLE IF NOT EXISTS public.section_images (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  section_key TEXT NOT NULL CHECK (section_key IN ('hero', 'about', 'deluxe-ac-room', 'family-ac-suite', 'standard-non-ac-room', 'attractions', 'gallery')),
  url TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable RLS on section_images
ALTER TABLE public.section_images ENABLE ROW LEVEL SECURITY;

-- Allow public read access to section images
CREATE POLICY "Public Read Section Images" ON public.section_images
  FOR SELECT USING (true);

-- Allow authenticated admin full control over section images
CREATE POLICY "Admin Manage Section Images" ON public.section_images
  FOR ALL TO authenticated USING (true) WITH CHECK (true);


-- 4. ANNOUNCEMENTS TABLE
CREATE TABLE IF NOT EXISTS public.announcements (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  message TEXT NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT true,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable RLS on announcements
ALTER TABLE public.announcements ENABLE ROW LEVEL SECURITY;

-- Allow public read access to active announcements
CREATE POLICY "Public Read Announcements" ON public.announcements
  FOR SELECT USING (true);

-- Allow admin full control over announcements
CREATE POLICY "Admin Manage Announcements" ON public.announcements
  FOR ALL TO authenticated USING (true) WITH CHECK (true);


-- 5. STORAGE BUCKET CONFIGURATION (hotel-images)
INSERT INTO storage.buckets (id, name, public) 
VALUES ('hotel-images', 'hotel-images', true)
ON CONFLICT (id) DO NOTHING;

-- Storage RLS: Public read access
CREATE POLICY "Public Read Storage Images" ON storage.objects
  FOR SELECT USING (bucket_id = 'hotel-images');

-- Storage RLS: Admin upload and delete access
CREATE POLICY "Admin Upload Storage Images" ON storage.objects
  FOR INSERT TO authenticated WITH CHECK (bucket_id = 'hotel-images');

CREATE POLICY "Admin Delete Storage Images" ON storage.objects
  FOR DELETE TO authenticated USING (bucket_id = 'hotel-images');
