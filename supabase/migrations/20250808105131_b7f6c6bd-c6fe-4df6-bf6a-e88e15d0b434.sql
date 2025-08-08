-- Ensure the contact-files bucket exists and is configured properly
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types) 
VALUES ('contact-files', 'contact-files', false, 10485760, ARRAY['application/pdf', 'image/jpeg', 'image/png', 'image/gif', 'text/plain', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'])
ON CONFLICT (id) DO UPDATE SET
  file_size_limit = 10485760,
  allowed_mime_types = ARRAY['application/pdf', 'image/jpeg', 'image/png', 'image/gif', 'text/plain', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];

-- Create storage policies for contact-files bucket
CREATE POLICY "Allow authenticated uploads to contact-files" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id = 'contact-files'
);

CREATE POLICY "Allow authenticated reads from contact-files" ON storage.objects  
FOR SELECT USING (
  bucket_id = 'contact-files'
);