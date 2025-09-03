import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export interface User {
  id: string
  name: string
  email: string
  created_at: string
}

export interface Recipe {
  id: string
  ingredients: string
  recipe: string
  servings: number
  prep_time: number
  region: string
  user_id: string
  created_at: string
}

export interface Transaction {
  id: string
  amount: number
  txn_id: string
  status: string
  user_id: string
  created_at: string
}</parameter>