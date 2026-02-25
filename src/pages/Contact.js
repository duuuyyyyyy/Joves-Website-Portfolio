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

    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.contact-info-wrapper, .contact-form-wrapper, .contact-socials-section, .resume-download');
    animatedElements.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'all 0.6s ease';
      observer.observe(el);
    });

    return () => observer.disconnect();
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
        setFormData({ name: '', email: '', message: '' });
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
      {/* Hero Section */}
      <section className="hero-scalar" style={{ minHeight: '45vh', paddingBottom: '3rem' }}>
        <div className="hero-orb hero-orb-1" style={{ width: '400px', height: '400px', top: '-10%' }}></div>
        <div className="hero-scalar-content">
          <h1 className="hero-scalar-title">Let's <em>Get In Touch</em></h1>
        </div>
      </section>

      {/* Main Content */}
      <main className="contact-main">
        
        {/* Contact Info Grid - Top 3 Boxes */}
        <section className="contact-info-grid">
          <div className="contact-info-item">
            <div className="contact-icon">
              <i className="fas fa-phone"></i>
            </div>
            <div className="contact-info-content">
              <h3>Phone</h3>
              <p>+63 998 446 8639</p>
              <p className="small">+63 (Alternative)</p>
            </div>
          </div>

          <div className="contact-info-item">
            <div className="contact-icon">
              <i className="fas fa-envelope"></i>
            </div>
            <div className="contact-info-content">
              <h3>Email</h3>
              <p>carlajoves23@gmail.com</p>
              <p className="small">hello@carlajoves.dev</p>
            </div>
          </div>

          <div className="contact-info-item">
            <div className="contact-icon">
              <i className="fas fa-map-marker-alt"></i>
            </div>
            <div className="contact-info-content">
              <h3>Location</h3>
              <p>Arayat, Pampanga</p>
              <p className="small">Philippines</p>
            </div>
          </div>
        </section>

        {/* Socials Grid - Bottom 3 Boxes */}
        <section className="contact-socials-grid">
          <h2 className="socials-heading">Connect With Me</h2>
          
          <div className="contact-social-item">
            <div className="social-icon">
              <i className="fab fa-linkedin"></i>
            </div>
            <div className="social-info">
              <h3>LinkedIn</h3>
              <p>Professional network and updates</p>
              <a href="https://www.linkedin.com/in/carla-joves-2b7a2b309/" target="_blank" rel="noopener noreferrer" className="social-link">Visit Profile →</a>
            </div>
          </div>

          <div className="contact-social-item">
            <div className="social-icon">
              <i className="fab fa-github"></i>
            </div>
            <div className="social-info">
              <h3>GitHub</h3>
              <p>Code and project repositories</p>
              <a href="https://github.com/CarlaJoves" target="_blank" rel="noopener noreferrer" className="social-link">View Profile →</a>
            </div>
          </div>

          <div className="contact-social-item">
            <div className="social-icon">
              <i className="fab fa-facebook"></i>
            </div>
            <div className="social-info">
              <h3>Facebook</h3>
              <p>Follow for updates and insights</p>
              <a href="https://www.facebook.com/carla.joves" target="_blank" rel="noopener noreferrer" className="social-link">Visit Page →</a>
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section className="contact-form-section">
          <h2 className="form-title">Send Me a Message</h2>
          <form className="contact-form" id="contactForm" onSubmit={handleSubmit}>
            <div className="form-row">
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
              <label htmlFor="message">Message <span className="required">*</span></label>
              <textarea
                id="message"
                name="message"
                rows="6"
                placeholder="Your message here..."
                required
                value={formData.message}
                onChange={handleChange}
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
              {isSubmitting ? 'Sending...' : 'Submit Form'} <i className="fas fa-arrow-right"></i>
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

      {/* Optional CTA before footer */}
      <section className="contact-cta" style={{ marginBottom: '4rem', marginTop: '3rem' }}>
        <h2>Let's Create Something Amazing</h2>
        <p>Whether you have a project in mind or just want to connect, I'd love to hear from you.</p>
      </section>
    </>
  );
}

export default Contact;
