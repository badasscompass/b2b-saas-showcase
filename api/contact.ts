import { Resend } from 'resend';
import type { VercelRequest, VercelResponse } from '@vercel/node';

// Initialize Resend lazily to avoid errors if API key is missing at module load time
function getResend() {
  // Check multiple possible environment variable names
  // Vercel Resend integration might use different names
  const apiKey = 
    process.env.RESEND_API_KEY || 
    process.env.RESEND_KEY ||
    process.env.RESEND_API_TOKEN ||
    process.env.RESEND_TOKEN;
    
  if (!apiKey) {
    // Log all environment variables that contain "RESEND" for debugging
    const resendEnvVars = Object.keys(process.env)
      .filter(k => k.toUpperCase().includes('RESEND'))
      .map(k => `${k}=${process.env[k]?.substring(0, 10)}...`);
    
    console.error('Resend API key not found. Checked: RESEND_API_KEY, RESEND_KEY, RESEND_API_TOKEN, RESEND_TOKEN');
    console.error('Resend-related env vars:', resendEnvVars.length > 0 ? resendEnvVars : 'None found');
    
    throw new Error('Resend API key not configured. Please add RESEND_API_KEY to your Vercel environment variables.');
  }
  
  if (typeof apiKey !== 'string' || apiKey.trim().length === 0) {
    throw new Error('Resend API key is invalid (empty or not a string)');
  }
  
  // Validate API key format (should start with 're_')
  const trimmedKey = apiKey.trim();
  if (!trimmedKey.startsWith('re_')) {
    console.warn('Resend API key does not start with "re_". This might be incorrect.');
  }
  
  return new Resend(trimmedKey);
}

interface ContactRequest {
  name: string;
  email: string;
  title: string;
  body: string;
  file?: {
    name: string;
    content: string; // base64 encoded
    size: number;
    type: string;
  };
  anti_robot_answer: string;
}

// Helper function to escape HTML to prevent XSS
function escapeHtml(text: string): string {
  const map: { [key: string]: string } = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // Track if response has been sent to prevent double-sending
  let responseSent = false;
  
  const sendResponse = (status: number, data: any) => {
    if (responseSent) {
      console.warn('Attempted to send response multiple times');
      return;
    }
    responseSent = true;
    return res.status(status).json(data);
  };

  // Wrap everything in a try-catch to ensure we always return a response
  try {
    // Set JSON content type for all responses
    res.setHeader('Content-Type', 'application/json');

    // Handle CORS
    if (req.method === 'OPTIONS') {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
      responseSent = true;
      return res.status(200).end();
    }

    // Only accept POST requests
    if (req.method !== 'POST') {
      return sendResponse(405, { error: 'Method not allowed' });
    }
  } catch (earlyError) {
    console.error('Error in early handler setup:', earlyError);
    return sendResponse(500, { error: 'Internal server error', message: 'Handler setup failed' });
  }

  try {
    const {
      name,
      email,
      title,
      body,
      file,
      anti_robot_answer,
    }: ContactRequest = req.body;

    // Validate required fields
    if (!name || !email || !title || !body || !anti_robot_answer) {
      return sendResponse(400, { error: 'Missing required fields' });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return sendResponse(400, { error: 'Invalid email address' });
    }

    // Get user IP for logging
    const userIP =
      (Array.isArray(req.headers['x-forwarded-for'])
        ? req.headers['x-forwarded-for'][0]
        : req.headers['x-forwarded-for']) ||
      (Array.isArray(req.headers['x-real-ip'])
        ? req.headers['x-real-ip'][0]
        : req.headers['x-real-ip']) ||
      'unknown';

    // Check if Resend API key is configured
    // Vercel Resend integration might use different env var names
    const apiKey = 
      process.env.RESEND_API_KEY || 
      process.env.RESEND_KEY ||
      process.env.RESEND_API_TOKEN ||
      process.env.RESEND_TOKEN;
    
    if (!apiKey) {
      const resendEnvVars = Object.keys(process.env)
        .filter(k => k.toUpperCase().includes('RESEND'))
        .map(k => k);
      
      console.error('Resend API key not found. Checked: RESEND_API_KEY, RESEND_KEY, RESEND_API_TOKEN, RESEND_TOKEN');
      console.error('Resend-related env var names found:', resendEnvVars.length > 0 ? resendEnvVars : 'None');
      
      return sendResponse(500, { 
        error: 'Server configuration error',
        message: 'Resend API key not configured. Please add RESEND_API_KEY to your Vercel project environment variables.',
        instructions: 'Go to Vercel Dashboard → Your Project → Settings → Environment Variables → Add RESEND_API_KEY with your Resend API key (starts with re_)'
      });
    }

    console.log('Resend API key found, length:', apiKey.length);

    // Initialize Resend client
    let resend;
    try {
      resend = getResend();
      console.log('Resend client initialized successfully');
    } catch (initError) {
      console.error('Failed to initialize Resend client:', initError);
      return sendResponse(500, {
        error: 'Email service initialization error',
        message: initError instanceof Error ? initError.message : 'Failed to initialize email service'
      });
    }

    // Build email body with HTML escaping to prevent XSS
    const escapedName = escapeHtml(name);
    const escapedEmail = escapeHtml(email);
    const escapedTitle = escapeHtml(title);
    const escapedBody = escapeHtml(body).replace(/\n/g, '<br>');
    
    let emailBody = `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${escapedName}</p>
      <p><strong>Email:</strong> ${escapedEmail}</p>
      <p><strong>Subject:</strong> ${escapedTitle}</p>
      <p><strong>Message:</strong></p>
      <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 10px 0;">
        ${escapedBody}
      </div>
    `;

    // Prepare email attachments if file is present
    const attachments = [];
    if (file && file.content) {
      try {
        const escapedFileName = escapeHtml(file.name);
        emailBody += `
          <p><strong>Attachment:</strong> ${escapedFileName} (${Math.round(file.size / 1024)} KB)</p>
        `;

        // Convert base64 to buffer for Resend attachment
        // Validate base64 content before processing
        if (typeof file.content !== 'string') {
          throw new Error('File content must be a base64 string');
        }

        const fileBuffer = Buffer.from(file.content, 'base64');
        
        // Validate buffer was created successfully
        if (!fileBuffer || fileBuffer.length === 0) {
          throw new Error('Failed to decode file content');
        }

        attachments.push({
          filename: file.name, // Keep original filename for attachment
          content: fileBuffer,
        });
      } catch (fileError) {
        console.error('Error processing file attachment:', fileError);
        // Continue without attachment rather than failing the entire request
        emailBody += `
          <p><strong>Note:</strong> File attachment could not be processed: ${file.name}</p>
        `;
      }
    }

    emailBody += `
      <hr style="margin: 20px 0;">
      <p><small>User IP: ${Array.isArray(userIP) ? userIP[0] : userIP}</small></p>
      <p><small>Submitted at: ${new Date().toISOString()}</small></p>
    `;

    // Send email via Resend
    console.log('Sending email via Resend...');
    console.log('Email config:', {
      from: 'LMN3 Contact <hello@lmn3.digital>',
      to: ['hello@lmn3.digital'],
      hasAttachments: attachments.length > 0,
    });

    try {
      console.log('Preparing to send email via Resend...');
      
      const emailPayload = {
        from: 'LMN3 Contact <hello@lmn3.digital>',
        to: ['hello@lmn3.digital'],
        replyTo: email,
        subject: `New Contact: ${title.substring(0, 100)}`, // Limit subject length
        html: emailBody,
        ...(attachments.length > 0 && { attachments }),
      };

      console.log('Email payload prepared, sending...');
      const emailResponse = await resend.emails.send(emailPayload);
      console.log('Resend response received:', {
        hasError: !!emailResponse.error,
        hasData: !!emailResponse.data,
        hasId: !!emailResponse.id,
        responseKeys: Object.keys(emailResponse),
      });

      // Check if Resend returned an error in the response
      if (emailResponse.error) {
        console.error('Resend API error:', JSON.stringify(emailResponse.error, null, 2));
        return sendResponse(500, {
          error: 'Email service error',
          message: emailResponse.error.message || emailResponse.error.name || 'Failed to send email',
          details: emailResponse.error,
        });
      }

      // Resend v6+ returns data in emailResponse.data
      const emailId = emailResponse.data?.id || emailResponse.id;
      console.log('Email sent successfully, ID:', emailId);

      return sendResponse(200, {
        message: 'Contact form submitted successfully',
        id: emailId || 'sent',
      });
    } catch (resendError) {
      console.error('Resend send error (catch block):', resendError);
      console.error('Error type:', typeof resendError);
      console.error('Error constructor:', resendError?.constructor?.name);
      
      if (resendError instanceof Error) {
        console.error('Error message:', resendError.message);
        console.error('Error stack:', resendError.stack);
      }
      
      throw resendError; // Re-throw to be caught by outer catch
    }
  } catch (error) {
    console.error('=== ERROR PROCESSING CONTACT FORM ===');
    console.error('Error:', error);
    console.error('Error type:', typeof error);
    console.error('Error constructor:', error?.constructor?.name);
    
    // Ensure we always return JSON, even on errors
    let errorMessage = 'Unknown error';
    let errorType = 'Internal server error';

    if (error instanceof Error) {
      errorMessage = error.message;
      console.error('Error stack:', error.stack);
      
      // Check for specific error types
      const errorMsgLower = error.message.toLowerCase();
      if (errorMsgLower.includes('resend') || errorMsgLower.includes('api key')) {
        errorType = 'Email service configuration error';
      } else if (errorMsgLower.includes('domain') || errorMsgLower.includes('not verified')) {
        errorType = 'Email domain not verified';
        errorMessage = 'The sending domain is not verified in Resend. Please verify your domain.';
      } else if (errorMsgLower.includes('unauthorized') || errorMsgLower.includes('authentication')) {
        errorType = 'Email service authentication error';
        errorMessage = 'Invalid API key or authentication failed.';
      } else if (errorMsgLower.includes('timeout')) {
        errorType = 'Request timeout';
        errorMessage = 'The request took too long to process. Please try again.';
      }
    } else if (typeof error === 'object' && error !== null) {
      // Handle non-Error objects
      try {
        errorMessage = JSON.stringify(error);
      } catch {
        errorMessage = String(error);
      }
    } else {
      errorMessage = String(error);
    }

    // Always return JSON response
    try {
      const errorResponse = {
        error: errorType,
        message: errorMessage,
      };
      
      console.error('Returning error response:', errorResponse);
      return res.status(500).json(errorResponse);
    } catch (responseError) {
      // If we can't send response, log it (this shouldn't happen but just in case)
      console.error('CRITICAL: Failed to send error response:', responseError);
      // Last resort - try to send minimal response
      try {
        if (!responseSent) {
          res.status(500).json({ error: 'Internal server error' });
          responseSent = true;
        }
      } catch (finalError) {
        console.error('CRITICAL: Completely failed to send any response:', finalError);
        // At this point, we can't do anything else
      }
    }
  }
}

