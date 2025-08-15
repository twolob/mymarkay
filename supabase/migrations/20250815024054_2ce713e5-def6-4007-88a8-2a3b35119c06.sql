-- Drop all existing vendor policies
DROP POLICY IF EXISTS "Admins can manage all vendors" ON public.vendors;
DROP POLICY IF EXISTS "Anyone can view active vendors" ON public.vendors;
DROP POLICY IF EXISTS "Authenticated users can view vendors" ON public.vendors;
DROP POLICY IF EXISTS "Users can create their own vendor profile" ON public.vendors;
DROP POLICY IF EXISTS "Vendors can update their own profile" ON public.vendors;
DROP POLICY IF EXISTS "Vendors can view their own data" ON public.vendors;

-- Add missing columns to vendors table for complete vendor registration
ALTER TABLE public.vendors 
ADD COLUMN IF NOT EXISTS full_name text,
ADD COLUMN IF NOT EXISTS password_hash text,
ADD COLUMN IF NOT EXISTS government_id_url text,
ADD COLUMN IF NOT EXISTS business_license_url text,
ADD COLUMN IF NOT EXISTS agree_to_terms boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS read_privacy_policy boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS status text DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'suspended'));

-- Update existing columns to match form data
ALTER TABLE public.vendors 
ALTER COLUMN business_name DROP NOT NULL,
ALTER COLUMN user_id DROP NOT NULL;

-- Create new comprehensive RLS policies for vendors

-- Allow anyone to insert vendor registration data (for sign-up)
CREATE POLICY "Anyone can register as vendor" 
ON public.vendors 
FOR INSERT 
WITH CHECK (true);

-- Allow users to view their own vendor data
CREATE POLICY "Users can view their own vendor data" 
ON public.vendors 
FOR SELECT 
USING (user_id = auth.uid());

-- Allow users to update their own vendor data
CREATE POLICY "Users can update their own vendor data" 
ON public.vendors 
FOR UPDATE 
USING (user_id = auth.uid());

-- Allow admins to view all vendor data
CREATE POLICY "Admins can view all vendors" 
ON public.vendors 
FOR SELECT 
USING (has_role(auth.uid(), 'admin'::app_role));

-- Allow admins to update vendor status and manage vendors
CREATE POLICY "Admins can manage vendors" 
ON public.vendors 
FOR UPDATE 
USING (has_role(auth.uid(), 'admin'::app_role));

-- Allow admins to delete vendors if needed
CREATE POLICY "Admins can delete vendors" 
ON public.vendors 
FOR DELETE 
USING (has_role(auth.uid(), 'admin'::app_role));

-- Allow public to view only approved and active vendors (for marketplace)
CREATE POLICY "Public can view approved active vendors" 
ON public.vendors 
FOR SELECT 
USING (is_active = true AND is_verified = true AND status = 'approved');