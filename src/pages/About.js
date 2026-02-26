import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';

function About() {
  const [activeFilter, setActiveFilter] = useState('technical');
  const [expandedSkill, setExpandedSkill] = useState(null);
  const heroRef = useRef(null);
  const certCarouselRef = useRef(null);
  const [certScrollPaused, setCertScrollPaused] = useState(false);

    // Technical Skills Data
  const technicalSkills = [
    { title: 'Frontend Development', details: 'HTML, CSS, JavaScript, React.js', icon: 'fas fa-code', category: 'technical' },
    { title: 'Design & UI', details: 'Responsive Web Design, UI/UX Implementation', icon: 'fas fa-paint-brush', category: 'technical' },
    { title: 'Backend Development', details: 'Node.js, Express.js, RESTful API Development', icon: 'fas fa-server', category: 'technical' },
    { title: 'Database Management', details: 'MongoDB, Mongoose, Database Design and Management', icon: 'fas fa-database', category: 'technical' },
    { title: 'Tools & Version Control', details: 'Git, GitHub, VS Code', icon: 'fas fa-tools', category: 'technical' },
  ];

  // Creative & Professional Skills Data
  const creativeProfessionalSkills = [
    { title: 'Creative Media', details: 'Graphic Design, Multimedia Editing, Physical Asset Creation', icon: 'fas fa-photo-video', category: 'soft' },
    { title: 'Communication & Strategy', details: 'Public Relations Support, Information Dissemination', icon: 'fas fa-bullhorn', category: 'soft' },
    { title: 'Execution & Collaboration', details: 'Team Collaboration, Agility, Stakeholder Management', icon: 'fas fa-people-arrows', category: 'soft' },
  ];

  const displayedSkills = activeFilter === 'technical' ? technicalSkills : creativeProfessionalSkills;

  // Certifications data (duplicated for seamless loop)
  const certifications = [
    { title: 'Web Development Certificate', desc: 'Comprehensive web development training covering HTML, CSS, JavaScript, and modern frameworks.', link: 'cert1.pdf' },
    { title: 'React Specialist Certification', desc: 'Advanced certification in React development, state management, hooks, and best practices.', link: 'cert2.pdf' },
    { title: 'Cloud Architecture Certificate', desc: 'Cloud infrastructure design and deployment on AWS, Azure, and GCP platforms.', link: 'cert3.pdf' },
    { title: 'UX/UI Design Fundamentals', desc: 'Design thinking, wireframing, prototyping, and user-centered design principles.', link: 'cert4.pdf' },
  ];

  useEffect(() => {
    document.title = 'About | Portfolio';

    // Mouse follow logic for the glow circle
    const handleMouseMove = (e) => {
      const glow = document.querySelector('.hero-cursor-glow');
      if (glow && heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        const radius = 125;
        const x = e.clientX - rect.left - radius;
        const y = e.clientY - rect.top - radius;
        glow.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Certifications infinite scroll
  useEffect(() => {
    const carousel = certCarouselRef.current;
    if (!carousel) return;

    let animationId;
    let scrollSpeed = 1;

    const step = () => {
      if (!certScrollPaused) {
        carousel.scrollLeft += scrollSpeed;
        // Reset scroll to create infinite loop
        if (carousel.scrollLeft >= carousel.scrollWidth / 2) {
          carousel.scrollLeft = 0;
        }
      }
      animationId = requestAnimationFrame(step);
    };

    animationId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationId);
  }, [certScrollPaused]);

  return (
    <>
      {/* HERO SECTION - extends under header */}
      <section className="about-hero-center-wrapper" ref={heroRef}>
        {/* Floating Background Orbs */}
        <div className="about-orb about-orb-1"></div>
        <div className="about-orb about-orb-2"></div>
        <div className="about-orb about-orb-3"></div>
        <div className="about-orb about-orb-4"></div>

        <div className="hero-cursor-glow"></div>

        <div className="visual-stack">
          {/* Rotating Broken Lines Circle (TOP HALF ONLY via clip wrapper) */}
          <div className="broken-circle-clip">
            <svg className="broken-circle-border" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="47" />
            </svg>
          </div>

          {/* Glow Underlay */}
          <div className="image-glow-underlay"></div>

          {/* Circular Main Image - overlays circle */}
          <div className="about-main-image-circular">
            <img src={process.env.PUBLIC_URL + '/about-me-image.png'} alt="Carla Joves" />
          </div>
        </div>

        {/* Glass Text Container - Bottom left of hero section */}
        <div className="glass-text-container hero-bottom-left">
          <h3>Who I Am</h3>
          <p>
            I'm a product-minded developer driven by the intersection of design and functionality. I bridge the gap between beautiful interfaces and robust code, creating seamless digital experiences that solve real-world problems.
          </p>
        </div>

        {/* Small Glass Container - Right side */}
        <div className="glass-text-container hero-top-right">
          <h3>Based In</h3>
          <p>
            Philippines, available for worldwide collaboration and remote partnerships.
          </p>
        </div>
      </section>

      <main className="container">
        <div className="glass-container about-skills-glass">
          {/* Skills Navigation with Gliding Animation */}
          <div className="skills-nav-wrapper">
            <div className="skills-nav">
              <button
                className={`nav-btn ${activeFilter === 'technical' ? 'active' : ''}`}
                onClick={() => {
                  setActiveFilter('technical');
                  setExpandedSkill(null);
                }}
              >
                Technical Skills
              </button>
              <button
                className={`nav-btn ${activeFilter === 'soft' ? 'active' : ''}`}
                onClick={() => {
                  setActiveFilter('soft');
                  setExpandedSkill(null);
                }}
              >
                Creative &amp; Professional Skills
              </button>
              {/* Gliding Underline */}
              <div
                className="nav-glider"
                style={{
                  transform: `translateX(${activeFilter === 'technical' ? '0%' : '100%'})`
                }}
              ></div>
            </div>
          </div>

          {/* Skills List */}
          <div className="skills-list-container">
            {displayedSkills.map((skill, index) => {
              const isActive = expandedSkill?.title === skill.title;

              return (
                <button
                  type="button"
                  key={`${activeFilter}-${index}`}
                  className={`skill-item-row skill-item-btn ${isActive ? 'active' : ''}`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onClick={() => setExpandedSkill(isActive ? null : skill)}
                >
                  <i className={`${skill.icon}`}></i>
                  <span>{skill.title}</span>
                </button>
              );
            })}

            {/* Expands at the bottom of the container */}
            {expandedSkill && (
              <div className="skill-detail-panel" role="region" aria-live="polite">
                <div className="skill-detail-title">{expandedSkill.title}</div>
                <div className="skill-detail-text">{expandedSkill.details}</div>
              </div>
            )}
          </div>
        </div>

        {/* Certifications Carousel - Continuously loops */}
        <section className="certifications-section">
          <h2>Certifications &amp; Credentials</h2>
          <div
            className="cert-carousel-wrapper"
            ref={certCarouselRef}
            onMouseEnter={() => setCertScrollPaused(true)}
            onMouseLeave={() => setCertScrollPaused(false)}
          >
            {/* Duplicate items for seamless infinite loop */}
            {[...certifications, ...certifications].map((cert, i) => (
              <a
                key={i}
                href={cert.link}
                target="_blank"
                rel="noopener noreferrer"
                className="cert-item"
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <h3>{cert.title}</h3>
                <p>{cert.desc}</p>
                <span className="cert-link">View Certificate →</span>
              </a>
            ))}
          </div>
        </section>

        {/* CTA - with bottom margin/padding */}
        <section className="about-cta" style={{ marginBottom: '4rem', paddingBottom: '3rem' }}>
          <h2 className="about-cta-title">Let's Work Together</h2>
          <p className="about-cta-text">I'm always interested in hearing about new opportunities and challenges.</p>
          <Link to="/contact" className="btn btn-primary">Get In Touch</Link>
        </section>
      </main>
    </>
  );
}

export default About;