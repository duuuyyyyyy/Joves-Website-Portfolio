const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const brandName = 'Dulay+';
const logoUrl = `${getSiteUrl()}/navy-gold-gradient-transparent-background.png`;

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
      `${brandName} contact form submission`,
      '',
      `Name: ${trimmedName}`,
      `Email: ${trimmedEmail}`,
      `Subject: ${trimmedSubject}`,
      '',
      'Message:',
      trimmedMessage
    ].join('\n');

    const emailHtml = `
      <div style="margin:0;padding:32px 16px;background:#f7f1ea;font-family:Arial,sans-serif;color:#2a2520;">
        <div style="max-width:680px;margin:0 auto;background:#fffdf9;border:1px solid #eadcc8;border-radius:28px;overflow:hidden;box-shadow:0 18px 40px rgba(20,32,46,0.08);">
          <div style="padding:28px 32px;background:linear-gradient(135deg,#fffaf4 0%,#f2e7d8 100%);border-bottom:1px solid #eadcc8;">
            <div style="display:flex;align-items:center;gap:14px;">
              <div style="width:58px;height:58px;border-radius:18px;background:#ffffff;border:1px solid #eadcc8;display:flex;align-items:center;justify-content:center;">
                <img src="${logoUrl}" alt="${brandName} logo" width="38" height="38" style="display:block;width:38px;height:38px;" />
              </div>
              <div>
                <div style="font-size:14px;letter-spacing:0.18em;text-transform:uppercase;color:#8a7d70;font-weight:700;">Portfolio Inquiry</div>
                <div style="font-family:Georgia,serif;font-size:32px;line-height:1.1;color:#2a2520;font-weight:700;">${brandName}</div>
              </div>
            </div>
            <div style="margin-top:22px;font-family:Georgia,serif;font-size:28px;line-height:1.2;color:#2a2520;">
              New message from ${escapeHtml(trimmedName)}
            </div>
            <div style="margin-top:10px;font-size:16px;line-height:1.7;color:#6b6560;">
              Someone reached out through your portfolio contact form and included the details below.
            </div>
          </div>

          <div style="padding:32px;">
            <div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px;margin-bottom:20px;">
              <div style="background:#f8f3ec;border:1px solid #eadcc8;border-radius:18px;padding:16px 18px;">
                <div style="font-size:12px;letter-spacing:0.16em;text-transform:uppercase;color:#a98963;font-weight:700;margin-bottom:8px;">From</div>
                <div style="font-size:18px;line-height:1.4;color:#2a2520;font-weight:700;">${escapeHtml(trimmedName)}</div>
              </div>
              <div style="background:#f8f3ec;border:1px solid #eadcc8;border-radius:18px;padding:16px 18px;">
                <div style="font-size:12px;letter-spacing:0.16em;text-transform:uppercase;color:#a98963;font-weight:700;margin-bottom:8px;">Reply To</div>
                <div style="font-size:18px;line-height:1.4;color:#2a2520;font-weight:700;word-break:break-word;">${escapeHtml(trimmedEmail)}</div>
              </div>
            </div>

            <div style="background:#f8f3ec;border:1px solid #eadcc8;border-radius:22px;padding:22px 24px;margin-bottom:18px;">
              <div style="font-size:12px;letter-spacing:0.16em;text-transform:uppercase;color:#a98963;font-weight:700;margin-bottom:10px;">Subject</div>
              <div style="font-family:Georgia,serif;font-size:30px;line-height:1.25;color:#2a2520;font-weight:700;">${escapeHtml(trimmedSubject)}</div>
            </div>

            <div style="background:#ffffff;border:1px solid #eadcc8;border-radius:22px;padding:24px;">
              <div style="font-size:12px;letter-spacing:0.16em;text-transform:uppercase;color:#a98963;font-weight:700;margin-bottom:14px;">Message</div>
              <div style="font-size:17px;line-height:1.9;color:#3e3833;white-space:pre-wrap;">${escapeHtml(trimmedMessage)}</div>
            </div>
          </div>

          <div style="padding:22px 32px;background:#2a2520;color:#f7f1ea;">
            <div style="font-size:14px;line-height:1.7;opacity:0.9;">
              Sent from your portfolio contact form. Reply directly to this email to respond to ${escapeHtml(trimmedName)}.
            </div>
          </div>
        </div>
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

function getSiteUrl() {
  return process.env.URL || process.env.DEPLOY_PRIME_URL || 'https://joveswebsiteportfolio.netlify.app';
}
