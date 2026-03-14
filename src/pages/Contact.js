import React, { useState, useCallback } from 'react';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [formStatus, setFormStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    const { name, email, subject, message } = formData;
    const trimmedName = name.trim();
    const trimmedEmail = email.trim().toLowerCase();
    const trimmedSubject = subject.trim();
    const trimmedMessage = message.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    const blockedTypos = ['gmail.cc', 'gmai.com', 'gmial.com', 'yahooo.com'];

    if (!trimmedName || !trimmedEmail || !trimmedSubject || !trimmedMessage) {
      setFormStatus('Please complete all required fields.');
      return;
    }

    if (!emailPattern.test(trimmedEmail)) {
      setFormStatus('Please enter a valid email address.');
      return;
    }

    if (blockedTypos.some((typo) => trimmedEmail.endsWith(typo))) {
      setFormStatus('That email address looks mistyped. Please check it and try again.');
      return;
    }

    setIsSubmitting(true);
    setFormStatus('Sending...');

    try {
      const response = await fetch('/.netlify/functions/send-contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: trimmedName,
          email: trimmedEmail,
          subject: trimmedSubject,
          message: trimmedMessage
        })
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(result.error || 'Unable to send message right now.');
      }

      setFormStatus("Message sent successfully! I'll get back to you soon.");
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setFormStatus(''), 5000);
    } catch (error) {
      console.error('Contact form error:', error);
      setFormStatus(error.message || 'Unable to send your message right now. Please try again later.');
      setTimeout(() => setFormStatus(''), 7000);
    } finally {
      setIsSubmitting(false);
    }
  }, [formData]);

  const contactCards = [
    { label: 'Phone', icon: 'fas fa-phone', text: '+63 998 446 8639', href: 'tel:+639984468639' },
    { label: 'Email', icon: 'fas fa-envelope', text: 'carlajoves23@gmail.com', href: 'https://mail.google.com/mail/?view=cm&fs=1&to=carlajoves23@gmail.com', external: true },
    { label: 'Location', icon: 'fas fa-map-marker-alt', text: 'Arayat, Pampanga', href: 'https://www.google.com/maps/search/?api=1&query=Arayat%2C+Pampanga', external: true },
    { label: 'LinkedIn', icon: 'fab fa-linkedin-in', text: 'linkedin.com/in/carla-joves-832059351/', href: 'https://www.linkedin.com/in/carla-joves-832059351/', external: true },
    { label: 'GitHub', icon: 'fab fa-github', text: 'github.com/duuuyyyyyy', href: 'https://github.com/duuuyyyyyy', external: true },
    { label: 'Facebook', icon: 'fab fa-facebook-f', text: 'facebook.com/carla.joves.71', href: 'https://www.facebook.com/carla.joves.71/', external: true }
  ];
  return (
    <section id="contact" className="page-section contact-page">
      <main className="contact-main" style={{ position: 'relative', overflow: 'hidden' }}>
        <div className="editorial-section-header editorial-section-header-left contact-section-header">
          <h1 className="editorial-section-title">Contact</h1>
        </div>
        {/* Localized Immersive Orbs */}
        <div className="hero-orb orb-v4 orb-color-1" style={{ top: '10%', left: '5%' }}></div>
        <div className="hero-orb orb-v2 orb-color-2" style={{ bottom: '20%', right: '5%' }}></div>
        <div className="hero-orb orb-v3 orb-color-3" style={{ top: '50%', left: '15%', opacity: 0.05 }}></div>
        <div className="hero-orb orb-v7 orb-color-5 orb-shape-ellipse orb-anim-wave" style={{ top: '12%', right: '22%' }}></div>
        <div className="hero-orb orb-v6 orb-color-6 orb-shape-blob orb-anim-rise" style={{ bottom: '12%', left: '32%' }}></div>
        <div className="hero-orb orb-v8 orb-color-4 orb-shape-squircle orb-anim-orbit" style={{ top: '58%', right: '10%' }}></div>

        <section className="contact-hero-grid">
          <div className="contact-hero-left">
            <p className="eyebrow">Let's collaborate</p>
            <h1 className="contact-headline">
              Manage conversations that lead to <span>meaningful work.</span>
            </h1>
            <p className="contact-subtext">
              Share the context of your project, ask a question, or request a walkthrough. I reply within 24 hours.
            </p>
            <div className="contact-cta-row">
              <a
                className="btn btn-primary hero-cta-top"
                href={process.env.PUBLIC_URL + '/Resume.pdf'}
                target="_blank"
                rel="noopener noreferrer"
              >
                View Resume
              </a>
              <a
                className="btn btn-secondary"
                href={process.env.PUBLIC_URL + '/Resume.pdf'}
                download
              >
                Download PDF
              </a>
            </div>

            <section className="contact-compact-links" aria-label="Contact links">
              {contactCards.map(({ label, icon, text, href, external }, index) => (
                <a
                  key={label}
                  className="contact-compact-link scroll-card"
                  href={href || '#'}
                  target={external ? '_blank' : undefined}
                  rel={external ? 'noopener noreferrer' : undefined}
                  style={{ '--slide-delay': `${Math.min(index, 4) * 0.05}s` }}
                  aria-label={`${label}: ${text}`}
                  title={`${label}: ${text}`}
                >
                  <span className="contact-compact-icon">
                    <i className={icon}></i>
                  </span>
                </a>
              ))}
            </section>
          </div>

          <div className="contact-form-section">
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="name">Full Name <span className="required">*</span></label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Enter your full name..."
                    required
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email Address <span className="required">*</span></label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter your email address..."
                    required
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject <span className="required">*</span></label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  placeholder="Enter your subject..."
                  required
                  value={formData.subject}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Your Message <span className="required">*</span></label>
                <textarea
                  id="message"
                  name="message"
                  rows="6"
                  placeholder="Enter your message here..."
                  required
                  value={formData.message}
                  onChange={handleChange}
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary contact-submit-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>

              {formStatus && (
                <div className={`form-status ${formStatus.toLowerCase().includes('sent') ? 'success' : 'error'}`}>
                  {formStatus}
                </div>
              )}
            </form>
          </div>
        </section>

      </main>
    </section>
  );
}

export default Contact;
