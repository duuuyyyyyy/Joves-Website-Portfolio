import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

function About() {
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

    const cards = document.querySelectorAll('.dynamic-grid-item, .service-card');
    cards.forEach(card => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';
      card.style.transition = 'all 0.6s ease';
      observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

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

        {/* Technical Skills */}
        <div className="section-divider">
          <span className="section-divider-label">Technical Skills</span>
        </div>

        <section className="skills-section">
          <div className="skills-grid">
            <div className="skill-group">
              <h3>Frontend Development</h3>
              <ul className="skill-list">
                <li>HTML5 &amp; CSS3</li>
                <li>JavaScript (ES6+)</li>
                <li>React &amp; Vue.js</li>
                <li>Responsive Design</li>
                <li>UI/UX Implementation</li>
              </ul>
            </div>

            <div className="skill-group">
              <h3>Backend Development</h3>
              <ul className="skill-list">
                <li>Node.js &amp; Express</li>
                <li>Python &amp; Django</li>
                <li>Database Design</li>
                <li>REST APIs</li>
                <li>Server Configuration</li>
              </ul>
            </div>

            <div className="skill-group">
              <h3>Tools &amp; Platforms</h3>
              <ul className="skill-list">
                <li>Git &amp; GitHub</li>
                <li>Docker &amp; DevOps</li>
                <li>AWS &amp; Cloud Services</li>
                <li>Figma Design Tools</li>
                <li>VS Code &amp; IDEs</li>
              </ul>
            </div>

            <div className="skill-group">
              <h3>Databases</h3>
              <ul className="skill-list">
                <li>MongoDB</li>
                <li>PostgreSQL</li>
                <li>MySQL</li>
                <li>Firebase</li>
                <li>Redis</li>
              </ul>
            </div>

            <div className="skill-group">
              <h3>Languages</h3>
              <ul className="skill-list">
                <li>JavaScript</li>
                <li>Python</li>
                <li>PHP</li>
                <li>SQL</li>
                <li>Java</li>
              </ul>
            </div>

            <div className="skill-group">
              <h3>Methodologies</h3>
              <ul className="skill-list">
                <li>Agile &amp; Scrum</li>
                <li>Test-Driven Development</li>
                <li>CI/CD Pipelines</li>
                <li>Web Performance</li>
                <li>Security Best Practices</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Soft Skills */}
        <div className="section-divider">
          <span className="section-divider-label">Soft Skills</span>
        </div>

        <section className="soft-skills-section">
          <div className="dynamic-grid">
            <div className="dynamic-grid-item">
              <h3 className="skill-item-title">Problem Solving</h3>
            </div>

            <div className="dynamic-grid-item">
              <h3 className="skill-item-title">Communication</h3>
            </div>

            <div className="dynamic-grid-item">
              <h3 className="skill-item-title">Collaboration</h3>
            </div>

            <div className="dynamic-grid-item">
              <h3 className="skill-item-title">Adaptability</h3>
            </div>

            <div className="dynamic-grid-item">
              <h3 className="skill-item-title">Leadership</h3>
            </div>

            <div className="dynamic-grid-item">
              <h3 className="skill-item-title">Time Management</h3>
            </div>
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
