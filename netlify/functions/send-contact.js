const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed.' })
    };
  }

  if (!process.env.RESEND_API_KEY) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Missing RESEND_API_KEY environment variable.' })
    };
  }

  try {
    const { name = '', email = '', subject = '', message = '' } = JSON.parse(event.body || '{}');

    const trimmedName = name.trim();
    const trimmedEmail = email.trim().toLowerCase();
    const trimmedSubject = subject.trim();
    const trimmedMessage = message.trim();

    if (!trimmedName || !trimmedEmail || !trimmedSubject || !trimmedMessage) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Please complete all required fields.' })
      };
    }

    if (!emailPattern.test(trimmedEmail)) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Please enter a valid email address.' })
      };
    }

    const toEmail = process.env.CONTACT_TO_EMAIL || 'carlajoves23@gmail.com';
    const fromEmail = process.env.CONTACT_FROM_EMAIL || 'Portfolio Contact <onboarding@resend.dev>';

    const emailText = [
      'New portfolio contact form submission',
      '',
      `Name: ${trimmedName}`,
      `Email: ${trimmedEmail}`,
      `Subject: ${trimmedSubject}`,
      '',
      'Message:',
      trimmedMessage
    ].join('\n');

    const emailHtml = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #1f2933;">
        <h2 style="margin-bottom: 16px;">New portfolio contact form submission</h2>
        <p><strong>Name:</strong> ${escapeHtml(trimmedName)}</p>
        <p><strong>Email:</strong> ${escapeHtml(trimmedEmail)}</p>
        <p><strong>Subject:</strong> ${escapeHtml(trimmedSubject)}</p>
        <p><strong>Message:</strong></p>
        <p style="white-space: pre-wrap;">${escapeHtml(trimmedMessage)}</p>
      </div>
    `;

    await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      replyTo: trimmedEmail,
      subject: `[Portfolio] ${trimmedSubject}`,
      text: emailText,
      html: emailHtml
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ ok: true })
    };
  } catch (error) {
    console.error('Resend send-contact error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Unable to send message right now. Please try again later.' })
    };
  }
};

function escapeHtml(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
