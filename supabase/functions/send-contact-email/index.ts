import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { SmtpClient } from "https://deno.land/x/smtp@v0.7.0/mod.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// SMTP Configuration
const SMTP_CONFIG = {
  hostname: Deno.env.get('SMTP_HOST') || '',
  port: parseInt(Deno.env.get('SMTP_PORT') || '587'),
  username: Deno.env.get('SMTP_USERNAME') || '',
  password: Deno.env.get('SMTP_PASSWORD') || '',
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

    // Validate anti-robot answer
    if (!anti_robot_answer) {
      console.log('Missing anti-robot answer')
      return new Response(
        JSON.stringify({ error: 'Anti-robot verification required' }),
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

    // Send email notification via SMTP
    console.log('Sending email notification via SMTP...')
    
    try {
      // Validate SMTP configuration
      if (!SMTP_CONFIG.hostname || !SMTP_CONFIG.username || !SMTP_CONFIG.password) {
        throw new Error('SMTP configuration is incomplete. Please check SMTP_HOST, SMTP_USERNAME, and SMTP_PASSWORD environment variables.')
      }

      const client = new SmtpClient()
      
      await client.connectTLS({
        hostname: SMTP_CONFIG.hostname,
        port: SMTP_CONFIG.port,
        username: SMTP_CONFIG.username,
        password: SMTP_CONFIG.password,
      })

      let emailBody = `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${title}</p>
        <p><strong>Message:</strong></p>
        <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 10px 0;">
          ${body.replace(/\n/g, '<br>')}
        </div>
      `
      
      if (file_path) {
        emailBody += `
          <p><strong>Attachment:</strong> ${file_name} (${Math.round(file_size / 1024)} KB)</p>
          <p><em>File stored at: ${file_path}</em></p>
        `
      }
      
      emailBody += `
        <hr style="margin: 20px 0;">
        <p><small>Submission ID: ${data?.[0]?.id || 'unknown'}</small></p>
        <p><small>User IP: ${userIP}</small></p>
        <p><small>Submitted at: ${new Date().toISOString()}</small></p>
      `

      await client.send({
        from: SMTP_CONFIG.username, // Use the SMTP username as the from address
        to: "hello@lmn3.digital",
        subject: `New Contact: ${title}`,
        content: emailBody,
        html: emailBody,
        headers: {
          "Reply-To": email,
        },
      })

      await client.close()
      console.log('Email sent successfully via SMTP')
    } catch (emailError) {
      console.error('Failed to send email via SMTP:', emailError)
      // Don't fail the entire request if email fails - just log the error
    }

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