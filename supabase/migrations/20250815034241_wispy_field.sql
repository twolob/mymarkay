/*
  # Complete MyMarkay Database Schema

  1. New Tables
    - `profiles` - User profile information
    - `user_roles` - User role assignments (admin, vendor, customer)
    - `vendors` - Vendor business information and verification data
    - `brands` - Brand information for organizing products
    - `categories` - Product categories
    - `products` - Product listings with vendor associations
    - `testimonials` - Customer testimonials and reviews
    - `contacts` - Contact form submissions

  2. Security
    - Enable RLS on all tables
    - Add appropriate policies for each user role
    - Create secure trigger for user registration

  3. Functions
    - `has_role` function for role-based access control
    - `handle_new_user` trigger function for automatic profile creation

  4. Enums
    - `app_role` enum for user roles
*/

-- Create enum for user roles
CREATE TYPE app_role AS ENUM ('admin', 'vendor', 'customer');

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text,
  email text,
  phone text,
  avatar_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create user_roles table
CREATE TABLE IF NOT EXISTS user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  role app_role NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create vendors table
CREATE TABLE IF NOT EXISTS vendors (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text,
  email text,
  phone text,
  business_name text,
  business_type text,
  registration_number text,
  address_street text,
  address_city text,
  address_state text,
  address_postal_code text,
  address_country text,
  description text,
  website_url text,
  government_id_url text,
  business_license_url text,
  password_hash text,
  agree_to_terms boolean DEFAULT false,
  read_privacy_policy boolean DEFAULT false,
  status text DEFAULT 'pending',
  is_verified boolean DEFAULT false,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create brands table
CREATE TABLE IF NOT EXISTS brands (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  description text,
  logo_url text,
  website_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  description text,
  image_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  vendor_id uuid REFERENCES vendors(id) ON DELETE CASCADE,
  brand_id uuid REFERENCES brands(id) ON DELETE SET NULL,
  category_id uuid REFERENCES categories(id) ON DELETE SET NULL,
  title text NOT NULL,
  subtitle text,
  description text,
  price numeric NOT NULL,
  images text[],
  features text[],
  stock_quantity integer DEFAULT 0,
  is_active boolean DEFAULT true,
  views_count integer DEFAULT 0,
  sales_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create testimonials table
CREATE TABLE IF NOT EXISTS testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name text NOT NULL,
  location text,
  rating integer CHECK (rating >= 1 AND rating <= 5),
  comment text NOT NULL,
  date text DEFAULT to_char(now(), 'YYYY-MM-DD'),
  is_approved boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create contacts table
CREATE TABLE IF NOT EXISTS contacts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  subject text NOT NULL,
  message text NOT NULL,
  is_read boolean DEFAULT false,
  reply_message text,
  replied_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE vendors ENABLE ROW LEVEL SECURITY;
ALTER TABLE brands ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

-- Create function to check user roles
CREATE OR REPLACE FUNCTION has_role(_role app_role, _user_id uuid DEFAULT auth.uid())
RETURNS boolean AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM user_roles 
    WHERE user_id = _user_id AND role = _role
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Profiles policies
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Admins can view all profiles"
  ON profiles FOR SELECT
  TO authenticated
  USING (has_role('admin'));

-- User roles policies
CREATE POLICY "Users can view own roles"
  ON user_roles FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all roles"
  ON user_roles FOR ALL
  TO authenticated
  USING (has_role('admin'));

-- Vendors policies
CREATE POLICY "Vendors can view own data"
  ON vendors FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Vendors can update own data"
  ON vendors FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all vendors"
  ON vendors FOR SELECT
  TO authenticated
  USING (has_role('admin'));

CREATE POLICY "Admins can update all vendors"
  ON vendors FOR UPDATE
  TO authenticated
  USING (has_role('admin'));

-- Brands policies
CREATE POLICY "Anyone can view brands"
  ON brands FOR SELECT
  TO authenticated, anon
  USING (true);

CREATE POLICY "Admins can manage brands"
  ON brands FOR ALL
  TO authenticated
  USING (has_role('admin'));

-- Categories policies
CREATE POLICY "Anyone can view categories"
  ON categories FOR SELECT
  TO authenticated, anon
  USING (true);

CREATE POLICY "Admins can manage categories"
  ON categories FOR ALL
  TO authenticated
  USING (has_role('admin'));

-- Products policies
CREATE POLICY "Anyone can view active products"
  ON products FOR SELECT
  TO authenticated, anon
  USING (is_active = true);

CREATE POLICY "Vendors can view own products"
  ON products FOR SELECT
  TO authenticated
  USING (
    vendor_id IN (
      SELECT id FROM vendors WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Vendors can manage own products"
  ON products FOR ALL
  TO authenticated
  USING (
    vendor_id IN (
      SELECT id FROM vendors WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Admins can manage all products"
  ON products FOR ALL
  TO authenticated
  USING (has_role('admin'));

-- Testimonials policies
CREATE POLICY "Anyone can view approved testimonials"
  ON testimonials FOR SELECT
  TO authenticated, anon
  USING (is_approved = true);

CREATE POLICY "Admins can manage all testimonials"
  ON testimonials FOR ALL
  TO authenticated
  USING (has_role('admin'));

-- Contacts policies
CREATE POLICY "Anyone can create contact messages"
  ON contacts FOR INSERT
  TO authenticated, anon
  WITH CHECK (true);

CREATE POLICY "Admins can manage all contacts"
  ON contacts FOR ALL
  TO authenticated
  USING (has_role('admin'));

-- Create trigger function for new user registration
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger AS $$
DECLARE
  vendor_id uuid;
BEGIN
  -- Create profile for all users
  INSERT INTO profiles (id, full_name, email, phone)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'phone_number', '')
  );

  -- Check if this is a vendor registration
  IF NEW.raw_user_meta_data->>'is_vendor' = 'true' THEN
    -- Create vendor role
    INSERT INTO user_roles (user_id, role)
    VALUES (NEW.id, 'vendor');
    
    -- Create vendor profile
    INSERT INTO vendors (
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
      NEW.id,
      COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
      NEW.email,
      COALESCE(NEW.raw_user_meta_data->>'phone_number', ''),
      COALESCE(NEW.raw_user_meta_data->>'business_name', ''),
      COALESCE(NEW.raw_user_meta_data->>'business_type', ''),
      COALESCE(NEW.raw_user_meta_data->>'business_reg_number', ''),
      COALESCE(NEW.raw_user_meta_data->>'street_address', ''),
      COALESCE(NEW.raw_user_meta_data->>'city', ''),
      COALESCE(NEW.raw_user_meta_data->>'state', ''),
      COALESCE(NEW.raw_user_meta_data->>'postal_code', ''),
      COALESCE(NEW.raw_user_meta_data->>'country', ''),
      COALESCE((NEW.raw_user_meta_data->>'agree_to_terms')::boolean, false),
      COALESCE((NEW.raw_user_meta_data->>'read_privacy_policy')::boolean, false),
      'pending',
      false,
      true
    );
  ELSE
    -- Create customer role for regular users
    INSERT INTO user_roles (user_id, role)
    VALUES (NEW.id, 'customer');
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop existing trigger if it exists
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Create trigger for new user registration
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Insert default brands
INSERT INTO brands (name, description) VALUES
  ('KICKS LAB', 'Premium sneaker retailer specializing in authentic athletic footwear'),
  ('TOO EASY', 'Trendy streetwear and casual clothing brand'),
  ('ZIG', 'Fashion-forward clothing and accessories'),
  ('BIG DRIP', 'Urban style sneakers and footwear'),
  ('Ma Kebeh Fruits', 'Fresh local fruits and produce'),
  ('Town Bakery', 'Artisan bakery with fresh bread and pastries'),
  ('Meko''s Chicken', 'Delicious grilled and fried chicken'),
  ('Xtra Zip Juice', 'Fresh juices and healthy beverages')
ON CONFLICT (name) DO NOTHING;

-- Insert default categories
INSERT INTO categories (name, description) VALUES
  ('Sneakers', 'Athletic and casual sneakers'),
  ('Clothing', 'Apparel and fashion items'),
  ('Food', 'Food and beverage products'),
  ('Electronics', 'Electronic devices and accessories'),
  ('Accessories', 'Fashion and lifestyle accessories')
ON CONFLICT (name) DO NOTHING;