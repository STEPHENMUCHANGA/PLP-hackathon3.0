/*
  # Create AI Recipes Table

  1. New Tables
    - `ai_recipes`
      - `id` (uuid, primary key)
      - `title` (text)
      - `ingredients` (text, JSON array)
      - `instructions` (text, JSON array)
      - `prep_time` (integer, minutes)
      - `cook_time` (integer, minutes)
      - `servings` (integer)
      - `cuisine` (text)
      - `difficulty` (text)
      - `tags` (text, JSON array)
      - `nutrition` (text, JSON object, nullable)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `ai_recipes` table
    - Add policy for public read access (recipes are public)
*/

CREATE TABLE IF NOT EXISTS ai_recipes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  ingredients text NOT NULL,
  instructions text NOT NULL,
  prep_time integer NOT NULL DEFAULT 0,
  cook_time integer NOT NULL DEFAULT 0,
  servings integer NOT NULL DEFAULT 1,
  cuisine text NOT NULL DEFAULT 'Global',
  difficulty text NOT NULL DEFAULT 'Easy',
  tags text NOT NULL DEFAULT '[]',
  nutrition text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE ai_recipes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "AI recipes are publicly readable"
  ON ai_recipes
  FOR SELECT
  TO public
  USING (true);