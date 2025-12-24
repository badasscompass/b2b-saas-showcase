// Local development server for API routes
// Run with: node server.js
import express from 'express';
import cors from 'cors';
import { Resend } from 'resend';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json({ limit: '10mb' }));

const resend = new Resend(process.env.RESEND_API_KEY);

app.post('/api/contact', async (req, res) => {
  try {
    const {
      name,
      email,
      title,
      body,
      file,
      anti_robot_answer,
    } = req.body;

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
      req.headers['x-forwarded-for'] ||
      req.headers['x-real-ip'] ||
      req.ip ||
      'unknown';

    // Check if Resend API key is configured
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY not configured');
      return res.status(500).json({ error: 'Server configuration error' });
    }

    // Build email body
    let emailBody = `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Subject:</strong> ${title}</p>
      <p><strong>Message:</strong></p>
      <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 10px 0;">
        ${body.replace(/\n/g, '<br>')}
      </div>
    `;

    // Prepare email attachments if file is present
    const attachments = [];
    if (file && file.content) {
      emailBody += `
        <p><strong>Attachment:</strong> ${file.name} (${Math.round(file.size / 1024)} KB)</p>
      `;

      // Convert base64 to buffer for Resend attachment
      const fileBuffer = Buffer.from(file.content, 'base64');
      attachments.push({
        filename: file.name,
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
    return res.status(500).json({
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Local API server running on http://localhost:${PORT}`);
  console.log(`📧 Make sure RESEND_API_KEY is set in your .env file`);
});

