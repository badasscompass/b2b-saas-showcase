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
    const { name, email, title, body, file_path, file_name, file_size, anti_robot_answer }: ContactRequest = await req.json()

    // Anti-robot validation
    if (anti_robot_answer !== '10') {
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
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    
    const { createClient } = await import('https://esm.sh/@supabase/supabase-js@2')
    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    // Store submission in database
    const { error: dbError } = await supabase
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

    if (dbError) {
      console.error('Database error:', dbError)
      throw new Error('Failed to store submission')
    }

    // Send email notification (using a simple console log for now)
    // In production, you would integrate with Resend, SendGrid, or similar
    console.log('New contact form submission:', {
      name,
      email,
      title,
      body: body.substring(0, 100) + '...',
      has_file: !!file_path
    })

    // Here you would send the actual email
    // Example with Resend:
    /*
    const resendApiKey = Deno.env.get('RESEND_API_KEY')
    if (resendApiKey) {
      const emailResponse = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'noreply@lmn3.digital',
          to: 'hello@lmn3.digital',
          subject: `New Contact Form: ${title}`,
          html: `
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subject:</strong> ${title}</p>
            <p><strong>Message:</strong></p>
            <p>${body.replace(/\n/g, '<br>')}</p>
            ${file_path ? `<p><strong>Attachment:</strong> ${file_name} (${(file_size! / 1024 / 1024).toFixed(2)} MB)</p>` : ''}
          `,
        }),
      })
    }
    */

    return new Response(
      JSON.stringify({ message: 'Contact form submitted successfully' }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )

  } catch (error) {
    console.error('Error processing contact form:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})