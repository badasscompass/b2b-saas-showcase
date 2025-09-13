-- Fix the restrictive RLS policy that blocks all SELECT access to contact_submissions
-- The current policy has condition 'false' which blocks everyone, even administrators

-- Drop the existing restrictive admin policy
DROP POLICY IF EXISTS "Admin only read access to contact submissions" ON public.contact_submissions;

-- Create a new policy that allows authenticated users to read contact submissions
-- This provides a foundation for admin access when authentication is implemented
CREATE POLICY "Allow authenticated users to read contact submissions" 
ON public.contact_submissions 
FOR SELECT 
USING (auth.uid() IS NOT NULL);

-- Alternative: Create a more permissive policy for now that allows reading via service role
-- This ensures the business can access submissions through admin tools
CREATE POLICY "Allow service role access to contact submissions"
ON public.contact_submissions
FOR SELECT
USING (auth.jwt() ->> 'role' = 'service_role' OR auth.uid() IS NOT NULL);