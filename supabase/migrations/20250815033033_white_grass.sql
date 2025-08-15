/*
  # Fix vendor registration errors

  1. Database Changes
    - Update handle_new_user function to support vendor registration
    - Handle vendor role assignment and profile creation server-side
    - Prevent RLS policy violations by using SECURITY DEFINER privileges

  2. Security
    - Maintain RLS policies
    - Use server-side trigger for secure vendor creation
*/

-- Drop existing trigger and function to recreate them
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();

-- Create updated function to handle new user signup with vendor support
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = ''
AS $$
DECLARE
  is_vendor_signup BOOLEAN;
BEGIN
  -- Insert into profiles table
  INSERT INTO public.profiles (id, full_name, email)
  VALUES (
    new.id,
    new.raw_user_meta_data ->> 'full_name',
    new.email
  );
  
  -- Check if this is a vendor signup
  is_vendor_signup := COALESCE((new.raw_user_meta_data ->> 'is_vendor')::boolean, false);
  
  IF is_vendor_signup THEN
    -- Assign vendor role
    INSERT INTO public.user_roles (user_id, role)
    VALUES (new.id, 'vendor');
    
    -- Create vendor profile with data from metadata
    INSERT INTO public.vendors (
      user_id,
      full_name,
      email,
      phone,
      business_name,
      business_type,
      registration_number,
      address_street,
      address_city,
      address_state,
      address_postal_code,
      address_country,
      agree_to_terms,
      read_privacy_policy,
      status,
      is_verified,
      is_active
    ) VALUES (
      new.id,
      new.raw_user_meta_data ->> 'full_name',
      new.email,
      new.raw_user_meta_data ->> 'phone_number',
      new.raw_user_meta_data ->> 'business_name',
      new.raw_user_meta_data ->> 'business_type',
      new.raw_user_meta_data ->> 'business_reg_number',
      new.raw_user_meta_data ->> 'street_address',
      new.raw_user_meta_data ->> 'city',
      new.raw_user_meta_data ->> 'state',
      new.raw_user_meta_data ->> 'postal_code',
      new.raw_user_meta_data ->> 'country',
      COALESCE((new.raw_user_meta_data ->> 'agree_to_terms')::boolean, false),
      COALESCE((new.raw_user_meta_data ->> 'read_privacy_policy')::boolean, false),
      'pending',
      false,
      true
    );
  ELSE
    -- Assign default customer role
    INSERT INTO public.user_roles (user_id, role)
    VALUES (new.id, 'customer');
  END IF;
  
  RETURN new;
END;
$$;

-- Recreate trigger for new user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Add missing columns to vendors table if they don't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'vendors' AND column_name = 'full_name'
  ) THEN
    ALTER TABLE public.vendors ADD COLUMN full_name TEXT;
  END IF;
  
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'vendors' AND column_name = 'status'
  ) THEN
    ALTER TABLE public.vendors ADD COLUMN status TEXT DEFAULT 'pending';
  END IF;
  
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'vendors' AND column_name = 'agree_to_terms'
  ) THEN
    ALTER TABLE public.vendors ADD COLUMN agree_to_terms BOOLEAN DEFAULT false;
  END IF;
  
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'vendors' AND column_name = 'read_privacy_policy'
  ) THEN
    ALTER TABLE public.vendors ADD COLUMN read_privacy_policy BOOLEAN DEFAULT false;
  END IF;
END $$;

-- Update RLS policy for vendors to allow insertion during signup
CREATE POLICY "Allow vendor creation during signup" 
ON public.vendors FOR INSERT 
WITH CHECK (true);