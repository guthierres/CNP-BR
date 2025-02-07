/*
  # Create clergy registration system

  1. New Tables
    - `clergy`
      - `id` (uuid, primary key)
      - `type` (text) - priest/bishop/deacon
      - `name` (text)
      - `email` (text, unique)
      - `phone` (text)
      - `diocese` (text)
      - `parish` (text)
      - `bio` (text)
      - `social_media` (jsonb)
      - `ordination_document` (text)
      - `profile_image` (text)
      - `status` (text)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on `clergy` table
    - Add policies for:
      - Public read access to approved clergy
      - Admin full access
      - Users can create new entries
*/

CREATE TABLE clergy (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  type text NOT NULL CHECK (type IN ('priest', 'bishop', 'deacon')),
  name text NOT NULL,
  email text UNIQUE NOT NULL,
  phone text NOT NULL,
  diocese text NOT NULL,
  parish text NOT NULL,
  bio text NOT NULL,
  social_media jsonb DEFAULT '{}',
  ordination_document text NOT NULL,
  profile_image text NOT NULL,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE clergy ENABLE ROW LEVEL SECURITY;

-- Allow public to read approved clergy
CREATE POLICY "Public can view approved clergy"
  ON clergy
  FOR SELECT
  USING (status = 'approved');

-- Allow authenticated users to create new entries
CREATE POLICY "Users can create new clergy entries"
  ON clergy
  FOR INSERT
  WITH CHECK (true);

-- Allow admin full access
CREATE POLICY "Admin has full access"
  ON clergy
  USING (auth.email() = 'guthierresc@hotmail.com');

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_clergy_updated_at
  BEFORE UPDATE ON clergy
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();