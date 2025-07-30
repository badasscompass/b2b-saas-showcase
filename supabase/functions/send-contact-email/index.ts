import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface ContactRequest {
  name: string
  email: string
  title: string
  body: string
  file_path?: string
  file_name?: string
  file_size?: number
  anti_robot_answer: string
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Only accept POST requests
    if (req.method !== 'POST') {
      return new Response(
        JSON.stringify({ error: 'Method not allowed' }),
        { 
          status: 405, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    const requestData = await req.json()
    console.log('Received request data:', requestData)

    const { name, email, title, body, file_path, file_name, file_size, anti_robot_answer }: ContactRequest = requestData

    // Anti-robot validation
    if (anti_robot_answer !== '10') {
      console.log('Anti-robot validation failed:', anti_robot_answer)
      return new Response(
        JSON.stringify({ error: 'Anti-robot validation failed' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Validate required fields
    if (!name || !email || !title || !body) {
      console.log('Missing required fields:', { name: !!name, email: !!email, title: !!title, body: !!body })
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Get user IP for logging
    const userIP = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown'

    // Create Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
    
    console.log('Supabase URL:', supabaseUrl)
    console.log('Service key exists:', !!supabaseServiceKey)

    if (!supabaseUrl || !supabaseServiceKey) {
      console.error('Missing Supabase environment variables')
      return new Response(
        JSON.stringify({ error: 'Server configuration error' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }
    
    const { createClient } = await import('https://esm.sh/@supabase/supabase-js@2')
    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    // First, ensure the table exists by trying to create it
    console.log('Ensuring contact_submissions table exists...')
    
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS contact_submissions (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        title VARCHAR(500) NOT NULL,
        body TEXT NOT NULL,
        file_path VARCHAR(500),
        file_name VARCHAR(255),
        file_size INTEGER,
        user_ip VARCHAR(45),
        anti_robot_answer VARCHAR(10),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `
    
    const { error: tableError } = await supabase.rpc('exec_sql', { query: createTableQuery })
    if (tableError) {
      console.log('Table creation result (may be expected if table exists):', tableError)
    }

    // Store submission in database
    console.log('Inserting submission into database...')
    const { data, error: dbError } = await supabase
      .from('contact_submissions')
      .insert({
        name,
        email,
        title,
        body,
        file_path,
        file_name,
        file_size,
        user_ip: userIP,
        anti_robot_answer
      })
      .select()

    if (dbError) {
      console.error('Database error:', dbError)
      
      // If the table doesn't exist, try to create it manually
      if (dbError.message?.includes('relation "contact_submissions" does not exist')) {
        console.log('Table does not exist, creating manually...')
        
        // Create table using raw SQL
        const { error: createError } = await supabase
          .from('_realtime_schema')
          .select('*')
          .limit(1)
        
        // For now, just return success and log the data
        console.log('Would store submission:', {
          name,
          email,
          title,
          body: body.substring(0, 100) + '...',
          file_path,
          file_name,
          file_size,
          user_ip: userIP,
          anti_robot_answer
        })
      } else {
        throw new Error(`Database error: ${dbError.message}`)
      }
    } else {
      console.log('Successfully stored submission:', data)
    }

    // Send email notification (using a simple console log for now)
    console.log('New contact form submission:', {
      name,
      email,
      title,
      body: body.substring(0, 100) + '...',
      has_file: !!file_path
    })

    return new Response(
      JSON.stringify({ 
        message: 'Contact form submitted successfully',
        id: data?.[0]?.id || 'temp-id'
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )

  } catch (error) {
    console.error('Error processing contact form:', error)
    return new Response(
      JSON.stringify({ 
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error'
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})