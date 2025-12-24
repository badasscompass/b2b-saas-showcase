import { Resend } from 'resend';
import type { VercelRequest, VercelResponse } from '@vercel/node';

const resend = new Resend(process.env.RESEND_API_KEY);

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
  // Set JSON content type for all responses
  res.setHeader('Content-Type', 'application/json');

  // Handle CORS
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(200).end();
  }

  // Only accept POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
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
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email address' });
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
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY not configured');
      return res.status(500).json({ error: 'Server configuration error' });
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
      const escapedFileName = escapeHtml(file.name);
      emailBody += `
        <p><strong>Attachment:</strong> ${escapedFileName} (${Math.round(file.size / 1024)} KB)</p>
      `;

      // Convert base64 to buffer for Resend attachment
      const fileBuffer = Buffer.from(file.content, 'base64');
      attachments.push({
        filename: file.name, // Keep original filename for attachment
        content: fileBuffer,
      });
    }

    emailBody += `
      <hr style="margin: 20px 0;">
      <p><small>User IP: ${Array.isArray(userIP) ? userIP[0] : userIP}</small></p>
      <p><small>Submitted at: ${new Date().toISOString()}</small></p>
    `;

    // Send email via Resend
    console.log('Sending email via Resend...');
    const emailResponse = await resend.emails.send({
      from: 'LMN3 Contact <hello@lmn3.digital>',
      to: ['hello@lmn3.digital'],
      replyTo: email,
      subject: `New Contact: ${title}`,
      html: emailBody,
      attachments: attachments.length > 0 ? attachments : undefined,
    });

    console.log('Email sent successfully:', emailResponse);

    return res.status(200).json({
      message: 'Contact form submitted successfully',
      id: emailResponse.id || 'sent',
    });
  } catch (error) {
    console.error('Error processing contact form:', error);
    
    // Ensure we always return JSON, even on errors
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    const errorDetails = {
      error: 'Internal server error',
      message: errorMessage,
    };

    // Log more details for debugging
    if (error instanceof Error) {
      console.error('Error stack:', error.stack);
      if (error.message.includes('RESEND')) {
        errorDetails.error = 'Email service configuration error';
      }
    }

    return res.status(500).json(errorDetails);
  }
}

