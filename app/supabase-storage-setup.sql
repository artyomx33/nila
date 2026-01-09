-- ============================================
-- NILA ESTATE MANAGEMENT - STORAGE SETUP
-- Guest Documents Bucket Configuration
-- ============================================

-- Create storage bucket for guest documents
-- Run this in Supabase SQL Editor

INSERT INTO storage.buckets (id, name, public)
VALUES ('guest-documents', 'guest-documents', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for guest-documents bucket

-- Allow authenticated users to upload documents
CREATE POLICY "Allow authenticated uploads to guest-documents"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'guest-documents');

-- Allow authenticated users to read documents
CREATE POLICY "Allow authenticated reads from guest-documents"
ON storage.objects FOR SELECT
TO authenticated
USING (bucket_id = 'guest-documents');

-- Allow authenticated users to delete documents
CREATE POLICY "Allow authenticated deletes from guest-documents"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'guest-documents');

-- Optional: Allow public read access (if you want unauthenticated users to view documents)
-- Uncomment the following if needed:
-- CREATE POLICY "Allow public reads from guest-documents"
-- ON storage.objects FOR SELECT
-- TO public
-- USING (bucket_id = 'guest-documents');

-- Verify bucket and policies were created
SELECT * FROM storage.buckets WHERE id = 'guest-documents';
SELECT * FROM storage.policies WHERE bucket_id = 'guest-documents';
