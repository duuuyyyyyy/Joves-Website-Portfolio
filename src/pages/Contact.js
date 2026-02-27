import React, { useState, useEffect, useCallback } from 'react';
import emailjs from '@emailjs/browser';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [formStatus, setFormStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    document.title = 'Contact | Portfolio';
    emailjs.init('V4q5Zz_bGpZjiQJfu');
  }, []);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormStatus('Sending...');

    const { name, email, message } = formData;

    emailjs.send(
      'service_s9ji23h',
      'template_g5h5k2t',
      {
        from_name: name,
        from_email: email,
        message: message,
        to_email: 'carlajoves23@gmail.com'
      }
    )
      .then(() => {
        setFormStatus("Message sent successfully! I'll get back to you soon.");
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setFormStatus(''), 5000);
        setIsSubmitting(false);
      })
      .catch((error) => {
        console.error('Email error:', error);
        setFormStatus('Failed to send message. Please try again.');
        setTimeout(() => setFormStatus(''), 5000);
        setIsSubmitting(false);
      });
  }, [formData]);

  return (
    <>
      <main className="contact-main" style={{ position: 'relative', overflow: 'hidden' }}>
        {/* Localized Immersive Orbs */}
        <div className="hero-orb orb-v4 orb-color-1" style={{ top: '10%', left: '5%' }}></div>
        <div className="hero-orb orb-v2 orb-color-2" style={{ bottom: '20%', right: '5%' }}></div>
        <div className="hero-orb orb-v3 orb-color-3" style={{ top: '50%', left: '15%', opacity: 0.05 }}></div>
        <div className="hero-orb orb-v7 orb-color-5 orb-shape-ellipse orb-anim-wave" style={{ top: '12%', right: '22%' }}></div>
        <div className="hero-orb orb-v6 orb-color-6 orb-shape-blob orb-anim-rise" style={{ bottom: '12%', left: '32%' }}></div>
        <div className="hero-orb orb-v8 orb-color-4 orb-shape-squircle orb-anim-orbit" style={{ top: '58%', right: '10%' }}></div>

        <h1 className="hero-scalar-title contact-hero-title">
          Let's <em>Get In Touch</em>
        </h1>

        {/* Contact Info */}
        <section className="contact-info-grid">
          <div className="contact-info-item">
            <div className="contact-icon">
              <i className="fas fa-phone"></i>
            </div>
            <div className="contact-info-content">
              <p>+63 998 446 8639</p>
            </div>
          </div>

          <div className="contact-info-item">
            <div className="contact-icon">
              <i className="fas fa-envelope"></i>
            </div>
            <div className="contact-info-content">
              <p>carlajoves23@gmail.com</p>
            </div>
          </div>

          <div className="contact-info-item">
            <div className="contact-icon">
              <i className="fas fa-map-marker-alt"></i>
            </div>
            <div className="contact-info-content">
              <p>Arayat, Pampanga</p>
            </div>
          </div>
        </section>

        <div className="contact-divider"></div>

        {/* Simplified Form */}
        <section className="contact-form-section">
          <h2 className="form-title">Send a Message</h2>

          <form className="contact-form" onSubmit={handleSubmit}>

            {/* Name */}
            <div className="form-group">
              <label htmlFor="name">Full Name <span className="required">*</span></label>
              <div className="form-input-icon">
                <i className="fas fa-user"></i>
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
            </div>

            {/* Email */}
            <div className="form-group">
              <label htmlFor="email">Email Address <span className="required">*</span></label>
              <div className="form-input-icon">
                <i className="fas fa-envelope"></i>
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

            {/* Message */}
            <div className="form-group">
              <label htmlFor="message">Your Message <span className="required">*</span></label>
              <div className="form-input-icon textarea-icon">
                <i className="fas fa-comment-dots"></i>
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
            </div>

            <button
              type="submit"
              className="btn btn-primary contact-submit-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Submit Form'} <i className="fas fa-paper-plane"></i>
            </button>

            {formStatus && (
              <div className={`form-status ${formStatus.toLowerCase().includes('sent') ? 'success' : 'error'}`}>
                {formStatus}
              </div>
            )}

          </form>
        </section>

        {/* Divider */}
        <div className="contact-divider"></div>

        {/* Resume Download */}
        <section className="resume-section">
          <h2 className="resume-title">Download Resume</h2>
          <p className="resume-subtitle">
            Get a copy of my latest resume for a full overview of my experience and skills.
          </p>

          {/* Update the href to your actual resume file path */}
          <a
            href={process.env.PUBLIC_URL + '/Resume.pdf'}
            className="btn btn-primary btn-large"
            download
          >
            <i className="fas fa-download"></i> Download Resume
          </a>
        </section>

      </main>
    </>
  );
}

export default Contact;
