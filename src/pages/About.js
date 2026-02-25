import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function About() {
  const [activeFilter, setActiveFilter] = useState('technical');

  useEffect(() => {
    document.title = 'About | Portfolio';

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

    const cards = document.querySelectorAll('.skill-card, .dynamic-grid-item, .service-card');
    cards.forEach(card => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';
      card.style.transition = 'all 0.6s ease';
      observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  // Technical Skills Data
  const technicalSkills = [
    { name: 'Idea validation', icon: 'fas fa-lightbulb', category: 'technical' },
    { name: 'API integrations & external systems', icon: 'fas fa-project-diagram', category: 'technical' },
    { name: 'Long-term support & tech strategy', icon: 'fas fa-chart-line', category: 'technical' },
    { name: 'Cloud architecture & deployment', icon: 'fas fa-cloud', category: 'technical' },
    { name: 'MVP development', icon: 'fas fa-rocket', category: 'technical' },
    { name: 'UX/UI design with a conversion focus', icon: 'fas fa-paint-brush', category: 'technical' },
    { name: 'Analytics & user tracking', icon: 'fas fa-chart-pie', category: 'technical' },
    { name: 'Fullstack SaaS / Custom Software Development', icon: 'fas fa-code', category: 'technical' },
    { name: 'Performance optimization', icon: 'fas fa-tachometer-alt', category: 'technical' },
  ];

  // Soft Skills Data
  const softSkills = [
    { name: 'Project Management', icon: 'fas fa-tasks', category: 'soft' },
    { name: 'Communication', icon: 'fas fa-comments', category: 'soft' },
    { name: 'Problem Solving', icon: 'fas fa-puzzle-piece', category: 'soft' },
    { name: 'Leadership', icon: 'fas fa-users', category: 'soft' },
    { name: 'Adaptability', icon: 'fas fa-sync-alt', category: 'soft' },
  ];

  const getDisplayedSkills = () => {
    if (activeFilter === 'technical') {
      return technicalSkills;
    } else {
      return softSkills;
    }
  };

  return (
    <>
      {/* Page Header */}
      <section className="page-header">
        <h1>About Me</h1>
        <p>Passionate developer with a focus on creating elegant, user-centric digital solutions</p>
      </section>

      {/* Main Content */}
      <main className="about-container">
        
        {/* Bio Section */}
        <section className="about-bio-section">
          <div className="about-bio-grid">
            <div className="about-bio-image-container">
              <img src={process.env.PUBLIC_URL + '/about-me-image.png'} alt="Carla Dulay Joves" className="about-profile-pic" />
            </div>
            <div className="about-bio-content">
              <h2 className="about-title">Who I Am</h2>
              <p className="about-text">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
              </p>
              <p className="about-text">
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
            </div>
          </div>
        </section>

        {/* Technical & Soft Skills - Scalar Style */}
        <div className="section-divider">
          <span className="section-divider-label">Skills & Expertise</span>
        </div>

        <section className="skills-showcase-section">
          <div className="skills-showcase-header">
            <span className="skills-showcase-label">What I can offer</span>
            <h2 className="skills-showcase-title">Skills</h2>
          </div>

          {/* Toggle Switch */}
          <div className="skills-toggle-wrapper">
            <div className="skills-toggle">
              <button 
                className={`toggle-option ${activeFilter === 'technical' ? 'active' : ''}`}
                onClick={() => setActiveFilter('technical')}
              >
                Technical
              </button>
              <button 
                className={`toggle-option ${activeFilter === 'soft' ? 'active' : ''}`}
                onClick={() => setActiveFilter('soft')}
              >
                Soft
              </button>
            </div>
          </div>

          {/* Skills Grid */}
          <div className="skills-grid-container">
            {getDisplayedSkills().map((skill, index) => (
              <div key={index} className="skill-card">
                <div className="skill-icon-wrapper">
                  <div className="icon-glow-bg"></div>
                  <i className={`${skill.icon} skill-icon`}></i>
                </div>
                <h3 className="skill-name">{skill.name}</h3>
              </div>
            ))}
          </div>
        </section>

        <section className="certifications-section">
          <h2>Certifications &amp; Credentials</h2>
          <div className="cert-list">
            <div className="cert-item">
              <h3>Web Development Certificate</h3>
              <p>Completed comprehensive web development training covering HTML, CSS, JavaScript, and modern frameworks.</p>
              <a href="cert1.pdf" target="_blank" rel="noopener noreferrer" className="cert-link">View Certificate</a>
            </div>
            <div className="cert-item">
              <h3>React Specialist Certification</h3>
              <p>Advanced certification in React development, including state management, hooks, and best practices.</p>
              <a href="cert2.pdf" target="_blank" rel="noopener noreferrer" className="cert-link">View Certificate</a>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="about-cta">
          <h2 className="about-cta-title">Let's Work Together</h2>
          <p className="about-cta-text">I'm always interested in hearing about new opportunities and challenges.</p>
          <Link to="/contact" className="btn btn-primary">Get In Touch</Link>
        </section>
      </main>
    </>
  );
}

export default About;
