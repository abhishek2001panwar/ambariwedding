-- =====================================================
-- Supabase Setup Instructions for Contact Form
-- =====================================================

-- STEP 1: Create the contact table
-- Run this in your Supabase SQL Editor
-- =====================================================

CREATE TABLE contact (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add index for faster queries (optional but recommended)
CREATE INDEX idx_contact_created_at ON contact(created_at DESC);
CREATE INDEX idx_contact_email ON contact(email);


-- =====================================================
-- STEP 2: Enable Row Level Security (RLS)
-- =====================================================

ALTER TABLE contact ENABLE ROW LEVEL SECURITY;


-- =====================================================
-- STEP 3: Create RLS Policies
-- =====================================================

-- Policy 1: Allow anyone to INSERT (submit contact form)
-- This allows public form submissions without authentication
CREATE POLICY "Allow public insert"
ON contact
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Policy 2: Only authenticated users can SELECT (view submissions)
-- This prevents public users from reading the contact submissions
-- Only your authenticated admin users can view them
CREATE POLICY "Allow authenticated read"
ON contact
FOR SELECT
TO authenticated
USING (true);

-- Policy 3: Only authenticated users can DELETE (optional)
CREATE POLICY "Allow authenticated delete"
ON contact
FOR DELETE
TO authenticated
USING (true);


-- =====================================================
-- STEP 4: Grant permissions
-- =====================================================

-- Grant INSERT permission to anonymous users (for form submission)
GRANT INSERT ON contact TO anon;

-- Grant all permissions to authenticated users (for admin access)
GRANT ALL ON contact TO authenticated;


-- =====================================================
-- VERIFICATION QUERIES
-- =====================================================

-- Check if RLS is enabled
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE tablename = 'contact';

-- View all policies
SELECT * 
FROM pg_policies 
WHERE tablename = 'contact';


-- =====================================================
-- OPTIONAL: View all contact submissions (as authenticated user)
-- =====================================================

-- SELECT * FROM contact ORDER BY created_at DESC;


-- =====================================================
-- ENVIRONMENT SETUP
-- =====================================================

/*
After running the SQL above, update your .env.local file with:

1. Go to your Supabase project: https://app.supabase.com
2. Click on "Project Settings" (gear icon)
3. Go to "API" section
4. Copy the following values:

NEXT_PUBLIC_SUPABASE_URL=<Your Project URL>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<Your anon/public key>

Then restart your Next.js development server:
npm run dev
*/
