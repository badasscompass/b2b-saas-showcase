import { Resend } from 'resend';
import type { VercelRequest, VercelResponse } from '@vercel/node';

// In-memory rate limiting (per serverless instance)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const RATE_LIMIT_MAX = 5; // 5 requests per window

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }
  entry.count++;
  return entry.count <= RATE_LIMIT_MAX;
}

// Allowed file MIME types for server-side validation
const ALLOWED_FILE_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'text/plain',
  'image/jpeg',
  'image/png',
];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

// Magic bytes for file type verification
const MAGIC_BYTES: Record<string, number[]> = {
  'application/pdf': [0x25, 0x50, 0x44, 0x46], // %PDF
  'image/png': [0x89, 0x50, 0x4E, 0x47],        // .PNG
  'image/jpeg': [0xFF, 0xD8, 0xFF],              // JPEG
};

function verifyMagicBytes(buffer: Buffer, declaredType: string): boolean {
  const expected = MAGIC_BYTES[declaredType];
  if (!expected) return true; // No magic bytes to check for this type
  if (buffer.length < expected.length) return false;
  return expected.every((byte, i) => buffer[i] === byte);
}

function getResend() {
  const apiKey = 
    process.env.RESEND_API_KEY || 
    process.env.RESEND_KEY ||
    process.env.RESEND_API_TOKEN ||
    process.env.RESEND_TOKEN;
    
  if (!apiKey) {
    console.error('Resend API key not found');
    throw new Error('Email service not configured');
  }
  
  const trimmedKey = apiKey.trim();
  if (!trimmedKey || !trimmedKey.startsWith('re_')) {
    console.error('Invalid Resend API key format');
    throw new Error('Email service misconfigured');
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
  /** Service interest slug (e.g. product-development) */
  interest?: string;
  /** Package name (e.g. Product Clarity Sprint) */
  package?: string;
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

    // Handle CORS - restrict to known origins
    const ALLOWED_ORIGINS = [
      'https://lmn3.digital',
      'https://www.lmn3.digital',
      'https://lmn3-collective.lovable.app',
    ];
    const requestOrigin = req.headers.origin as string | undefined;
    const corsOrigin = requestOrigin && ALLOWED_ORIGINS.includes(requestOrigin)
      ? requestOrigin
      : ALLOWED_ORIGINS[0];

    if (req.method === 'OPTIONS') {
      res.setHeader('Access-Control-Allow-Origin', corsOrigin);
      res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
      res.setHeader('Access-Control-Allow-Credentials', 'true');
      responseSent = true;
      return res.status(200).end();
    }

    // Set CORS header for all responses
    res.setHeader('Access-Control-Allow-Origin', corsOrigin);
    res.setHeader('Access-Control-Allow-Credentials', 'true');

    // Only accept POST requests
    if (req.method !== 'POST') {
      return sendResponse(405, { error: 'Method not allowed' });
    }
  } catch (earlyError) {
    console.error('Error in early handler setup:', earlyError);
    return sendResponse(500, { error: 'Internal server error', message: 'Handler setup failed' });
  }

  try {
    // Rate limiting
    const userIP =
      (Array.isArray(req.headers['x-forwarded-for'])
        ? req.headers['x-forwarded-for'][0]
        : req.headers['x-forwarded-for']) ||
      (Array.isArray(req.headers['x-real-ip'])
        ? req.headers['x-real-ip'][0]
        : req.headers['x-real-ip']) ||
      'unknown';

    if (!checkRateLimit(userIP)) {
      return sendResponse(429, { error: 'Too many requests. Please try again later.' });
    }

    const {
      name,
      email,
      title,
      body,
      file,
      anti_robot_answer,
      interest,
      package: packageName,
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

    // Initialize Resend client
    let resend;
    try {
      resend = getResend();
    } catch (initError) {
      console.error('Failed to initialize Resend client:', initError);
      return sendResponse(500, { error: 'Unable to send message. Please try again later.' });
    }

    // Build email body with HTML escaping to prevent XSS
    const escapedName = escapeHtml(name);
    const escapedEmail = escapeHtml(email);
    const escapedTitle = escapeHtml(title);
    const escapedBody = escapeHtml(body).replace(/\n/g, '<br>');
    
    const regardingHtml =
      interest || packageName
        ? `<p><strong>Regarding:</strong> ${[interest || '', packageName || ''].filter(Boolean).map((s) => escapeHtml(s)).join(' → ')}</p>`
        : '';

    let emailBody = `
      <h2>New Contact Form Submission</h2>
      ${regardingHtml}
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
        if (typeof file.content !== 'string') {
          return sendResponse(400, { error: 'Invalid file content' });
        }

        const fileBuffer = Buffer.from(file.content, 'base64');
        
        if (!fileBuffer || fileBuffer.length === 0) {
          return sendResponse(400, { error: 'Invalid file content' });
        }

        // Validate file size server-side
        if (fileBuffer.length > MAX_FILE_SIZE) {
          return sendResponse(400, { error: 'File too large. Maximum size is 5MB.' });
        }

        // Validate file type
        if (file.type && !ALLOWED_FILE_TYPES.includes(file.type)) {
          return sendResponse(400, { error: 'File type not supported' });
        }

        // Verify magic bytes match declared type
        if (!verifyMagicBytes(fileBuffer, file.type)) {
          return sendResponse(400, { error: 'File content does not match declared type' });
        }

        const escapedFileName = escapeHtml(file.name);
        emailBody += `
          <p><strong>Attachment:</strong> ${escapedFileName} (${Math.round(fileBuffer.length / 1024)} KB)</p>
        `;

        attachments.push({
          filename: file.name,
          content: fileBuffer,
        });
      } catch (fileError) {
        console.error('Error processing file attachment:', fileError);
        emailBody += `
          <p><strong>Note:</strong> File attachment could not be processed</p>
        `;
      }
    }

    emailBody += `
      <hr style="margin: 20px 0;">
      <p><small>Submitted at: ${new Date().toISOString()}</small></p>
    `;

    // Send email via Resend
    try {
      const emailPayload = {
        from: 'LMN3 Contact <hello@lmn3.digital>',
        to: ['hello@lmn3.digital'],
        replyTo: email,
        subject: packageName
          ? `[${packageName}] ${title.substring(0, 80)}`
          : `New Contact: ${title.substring(0, 100)}`,
        html: emailBody,
        ...(attachments.length > 0 && { attachments }),
      };

      const emailResponse = await resend.emails.send(emailPayload);

      if (emailResponse.error) {
        console.error('Resend API error:', JSON.stringify(emailResponse.error, null, 2));
        return sendResponse(500, { error: 'Unable to send message. Please try again later.' });
      }

      const emailId = emailResponse.data?.id || emailResponse.id;
      return sendResponse(200, {
        message: 'Contact form submitted successfully',
        id: emailId || 'sent',
      });
    } catch (resendError) {
      console.error('Resend send error:', resendError);
      throw resendError;
    }
  } catch (error) {
    console.error('Contact form error:', error);
    
    try {
      return res.status(500).json({ error: 'Unable to send message. Please try again later.' });
    } catch (responseError) {
      console.error('Failed to send error response:', responseError);
      try {
        if (!responseSent) {
          res.status(500).json({ error: 'Internal server error' });
          responseSent = true;
        }
      } catch (finalError) {
        console.error('Completely failed to send response:', finalError);
      }
    }
  }
}

