import React, { useState, useEffect, useCallback } from 'react';
import emailjs from '@emailjs/browser';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    phone: '',
    purpose: '',
    description: '',
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
        setFormStatus('Message sent successfully! I\'ll get back to you soon.');
        setFormData({ name: '', email: '', organization: '', phone: '', purpose: '', description: '', message: '' });
        setTimeout(() => setFormStatus(''), 5000);
        setIsSubmitting(false);
      })
      .catch((error) => {
        console.error('Email error:', error);
        setFormStatus('Failed to send message. Please try again or contact directly.');
        setTimeout(() => setFormStatus(''), 5000);
        setIsSubmitting(false);
      });
  }, [formData]);

  return (
    <>
      {/* Hero Section - extends under header */}
      <section className="hero-scalar contact-hero" style={{ minHeight: '35vh', paddingBottom: '2rem' }}>
        <div className="hero-scalar-content">
          <h1 className="hero-scalar-title contact-hero-title">Let's <em>Get In Touch</em></h1>
        </div>
      </section>

      {/* Main Content */}
      <main className="contact-main">
        
        {/* Contact Info - 3 icons in a row */}
        <section className="contact-info-grid">
          <div className="contact-info-item">
            <div className="contact-icon">
              <i className="fas fa-phone"></i>
            </div>
            <div className="contact-info-content">
              <p>+63 998 446 8639</p>
              <p className="small">+63 (Alternative)</p>
            </div>
          </div>

          <div className="contact-info-item">
            <div className="contact-icon">
              <i className="fas fa-envelope"></i>
            </div>
            <div className="contact-info-content">
              <p>carlajoves23@gmail.com</p>
              <p className="small">hello@carlajoves.dev</p>
            </div>
          </div>

          <div className="contact-info-item">
            <div className="contact-icon">
              <i className="fas fa-map-marker-alt"></i>
            </div>
            <div className="contact-info-content">
              <p>Arayat, Pampanga</p>
              <p className="small">Philippines</p>
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="contact-divider"></div>

        {/* Socials Grid - 3 boxes */}
        <section className="contact-socials-section">
          <h2 className="socials-heading">Connect With Me</h2>
          <div className="contact-socials-grid">
            <a href="https://www.linkedin.com/in/carla-joves-832059351/" target="_blank" rel="noopener noreferrer" className="contact-social-item">
              <div className="social-icon">
                <i className="fab fa-linkedin"></i>
              </div>
              <div className="social-info">
                <h3>LinkedIn</h3>
                <p>Professional network</p>
              </div>
            </a>

            <a href="https://github.com/duuuyyyyyy" target="_blank" rel="noopener noreferrer" className="contact-social-item">
              <div className="social-icon">
                <i className="fab fa-github"></i>
              </div>
              <div className="social-info">
                <h3>GitHub</h3>
                <p>Code repositories</p>
              </div>
            </a>

            <a href="https://www.facebook.com/carla.joves.71/" target="_blank" rel="noopener noreferrer" className="contact-social-item">
              <div className="social-icon">
                <i className="fab fa-facebook"></i>
              </div>
              <div className="social-info">
                <h3>Facebook</h3>
                <p>Updates & insights</p>
              </div>
            </a>
          </div>
        </section>

        {/* Divider */}
        <div className="contact-divider"></div>

        {/* Contact Form - matches reference layout */}
        <section className="contact-form-section">
          <h2 className="form-title">Or fill out the form below</h2>
          <form className="contact-form" onSubmit={handleSubmit}>
            {/* Row 1: Two dropdowns */}
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="purpose">Inquiry Purpose <span className="required">*</span></label>
                <div className="form-input-icon">
                  <i className="fas fa-question-circle"></i>
                  <select id="purpose" name="purpose" value={formData.purpose} onChange={handleChange} required>
                    <option value="">Choose one option...</option>
                    <option value="project">New Project</option>
                    <option value="collaboration">Collaboration</option>
                    <option value="hiring">Hiring / Job Opportunity</option>
                    <option value="consultation">Consultation</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="description">Description that fits you <span className="required">*</span></label>
                <div className="form-input-icon">
                  <i className="fas fa-user-tag"></i>
                  <select id="description" name="description" value={formData.description} onChange={handleChange}>
                    <option value="">Choose one option...</option>
                    <option value="individual">Individual / Freelancer</option>
                    <option value="startup">Startup</option>
                    <option value="business">Business / Company</option>
                    <option value="agency">Agency</option>
                    <option value="student">Student</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Row 2: Full Name + Email */}
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Full Name <span className="required">*</span></label>
                <div className="form-input-icon">
                  <i className="fas fa-user"></i>
                  <input type="text" id="name" name="name" placeholder="Enter your full name..." required value={formData.name} onChange={handleChange} />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="email">Email Address <span className="required">*</span></label>
                <div className="form-input-icon">
                  <i className="fas fa-envelope"></i>
                  <input type="email" id="email" name="email" placeholder="Enter your email address..." required value={formData.email} onChange={handleChange} />
                </div>
              </div>
            </div>

            {/* Row 3: Organization + Phone */}
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="organization">Organization</label>
                <div className="form-input-icon">
                  <i className="fas fa-building"></i>
                  <input type="text" id="organization" name="organization" placeholder="Enter your organization..." value={formData.organization} onChange={handleChange} />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <div className="form-input-icon">
                  <i className="fas fa-phone"></i>
                  <input type="tel" id="phone" name="phone" placeholder="Enter your phone number..." value={formData.phone} onChange={handleChange} />
                </div>
              </div>
            </div>

            {/* Row 4: Full-width Message */}
            <div className="form-group">
              <label htmlFor="message">Your Message <span className="required">*</span></label>
              <div className="form-input-icon textarea-icon">
                <i className="fas fa-comment-dots"></i>
                <textarea id="message" name="message" rows="5" placeholder="Enter your message here..." required value={formData.message} onChange={handleChange}></textarea>
              </div>
            </div>

            <button type="submit" className="btn btn-primary contact-submit-btn" disabled={isSubmitting}>
              {isSubmitting ? 'Sending...' : 'Submit Form'} <i className="fas fa-paper-plane"></i>
            </button>
            {formStatus && <div className={`form-status ${formStatus.includes('success') ? 'success' : 'error'}`}>{formStatus}</div>}
          </form>
        </section>

        {/* Resume Download */}
        <section className="resume-section">
          <h2 className="resume-title">My Resume</h2>
          <p className="resume-subtitle">Download my complete professional resume to learn more about my experience and skills.</p>
          <a href="#" className="btn btn-primary btn-large">
            <i className="fas fa-download"></i> Download Resume
          </a>
        </section>

      </main>
    </>
  );
}

export default Contact;
