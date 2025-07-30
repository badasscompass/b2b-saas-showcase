import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://dpn2140q3ivasprojects2641e339.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRwbjIxNDBxM2l2YXNwcm9qZWN0czI2NDFlMzM5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjI1MTAzNjAsImV4cCI6MjAzODA4NjM2MH0.6mkmPiPZNVP9PGO2YjVU-8aqJWNdKlE_FVKUOaH5YK0'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type ContactSubmission = {
  id?: string
  name: string
  email: string
  title: string
  body: string
  file_path?: string
  file_name?: string
  file_size?: number
  user_ip?: string
  anti_robot_answer?: string
  created_at?: string
}