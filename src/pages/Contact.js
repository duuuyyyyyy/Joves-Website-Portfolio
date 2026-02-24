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
      {/* Page Header */}
      <section className="page-header">
        <h1>Contact & Resume</h1>
        <p>Let's connect and discuss your next project</p>
      </section>

      {/* Main Content */}
      <main>

        {/* Resume Download Section */}
        <section className="resume-download">
          <h2 className="resume-download-title">My Resume</h2>
          <p className="resume-download-text">Download my complete resume in PDF format to learn more about my professional background and experience.</p>
          <a href="#" className="btn btn-primary btn-large"><i className="fas fa-download"></i> Download Resume</a>
        </section>

        {/* Contact Grid */}
        <section className="contact-grid">

          {/* Contact Info */}
          <div className="contact-info-wrapper">
            <h2>Bringing your ideas to life.</h2>
            <p className="contact-subtitle">I am always open to new opportunities, collaborations, or just a friendly chat about technology and design. Feel free to reach out!</p>

            <div className="contact-info-boxes">
              <div className="contact-info-box">
                <i className="fas fa-envelope"></i>
                <div>
                  <h4>Email</h4>
                  <p>carlajoves23@gmail.com</p>
                </div>
              </div>
              <div className="contact-info-box">
                <i className="fas fa-phone"></i>
                <div>
                  <h4>Phone</h4>
                  <p>+63 998 446 8639</p>
                </div>
              </div>
              <div className="contact-info-box">
                <i className="fas fa-map-marker-alt"></i>
                <div>
                  <h4>Location</h4>
                  <p>Arayat, Pampanga</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="contact-form-wrapper">
            <form className="contact-form" id="contactForm" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Your Name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="your.email@example.com"
                  required
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  placeholder="Your message here..."
                  required
                  value={formData.message}
                  onChange={handleChange}
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                <i className="fas fa-paper-plane"></i> {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
              {formStatus && <div className="form-status" id="formStatus">{formStatus}</div>}
            </form>
          </div>

        </section>

        {/* Contact Socials */}
        <section className="contact-socials-section">
          <h3>Connect with me</h3>
          <div className="contact-social-links">
            <a href="https://www.linkedin.com/in/carla-joves-2b7a2b309/" target="_blank" rel="noopener noreferrer" className="btn btn-outline">
              <i className="fab fa-linkedin"></i> LinkedIn
            </a>
            <a href="https://github.com/CarlaJoves" target="_blank" rel="noopener noreferrer" className="btn btn-outline">
              <i className="fab fa-github"></i> GitHub
            </a>
          </div>
        </section>

      </main>
    </>
  );
}

export default Contact;
