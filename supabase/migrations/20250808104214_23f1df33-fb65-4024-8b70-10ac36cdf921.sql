-- Enable Row Level Security on contact_submissions table
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public access to insert contact submissions
-- This allows anyone to submit contact forms
CREATE POLICY "Allow public insert on contact submissions" 
ON public.contact_submissions 
FOR INSERT 
WITH CHECK (true);

-- Create policy to restrict read access to admin users only
-- This ensures only admin users can read contact submissions
CREATE POLICY "Admin only read access to contact submissions" 
ON public.contact_submissions 
FOR SELECT 
USING (false); -- For now, no one can read (admin auth can be added later)