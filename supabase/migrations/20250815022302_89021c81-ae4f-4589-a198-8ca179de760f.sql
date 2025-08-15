-- Fix security issues by adding proper RLS policies

-- Add SELECT policy for contacts table (admin only access)
CREATE POLICY "Only admins can view contacts" 
ON public.contacts 
FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_id = auth.uid() 
    AND role = 'admin'
  )
);

-- Add SELECT policy for vendors table (authenticated users can view verified vendors)
CREATE POLICY "Authenticated users can view verified vendors" 
ON public.vendors 
FOR SELECT 
USING (
  auth.uid() IS NOT NULL 
  AND status = 'verified'
);

-- Add SELECT policy for admins to view all vendors
CREATE POLICY "Admins can view all vendors" 
ON public.vendors 
FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_id = auth.uid() 
    AND role = 'admin'
  )
);

-- Add SELECT policy for vendors to view their own data
CREATE POLICY "Vendors can view their own data" 
ON public.vendors 
FOR SELECT 
USING (user_id = auth.uid());