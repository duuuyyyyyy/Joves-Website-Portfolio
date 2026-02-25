import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';

function About() {
  const [activeFilter, setActiveFilter] = useState('technical');
  const heroRef = useRef(null);
  const certCarouselRef = useRef(null);

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

  const displayedSkills = activeFilter === 'technical' ? technicalSkills : softSkills;

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
    
    // Certifications carousel auto-scroll
    const carousel = certCarouselRef.current;
    if (carousel) {
      let scrollInterval = setInterval(() => {
        carousel.scrollLeft += 320;
        if (carousel.scrollLeft >= carousel.scrollWidth - carousel.clientWidth) {
          carousel.scrollLeft = 0;
        }
      }, 4000);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        clearInterval(scrollInterval);
      };
    }
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <>
      {/* CENTERED HERO WITH GRID, ROTATING CIRCLE, AND GLASS TEXT CONTAINERS */}
      <section className="about-hero-center-wrapper" ref={heroRef}>
        {/* Floating Background Orbs */}
        <div className="about-orb about-orb-1"></div>
        <div className="about-orb about-orb-2"></div>
        <div className="about-orb about-orb-3"></div>
        <div className="about-orb about-orb-4"></div>
        
        <div className="hero-cursor-glow"></div>
        
        <div className="visual-stack">
          {/* Rotating Broken Lines Circle */}
          <div className="broken-circle-border"></div>
          
          {/* Glow Underlay */}
          <div className="image-glow-underlay"></div>
          
          {/* Circular Main Image */}
          <div className="about-main-image-circular">
            <img src={process.env.PUBLIC_URL + '/about-me-image.png'} alt="Carla Joves" style={{ height: '100%', objectFit: 'cover' }} />
          </div>
          
          {/* Glass Text Container Left: Who I Am - Large */}
          <div className="glass-text-container large reveal-on-scroll">
            <h3>Who I Am</h3>
            <p>
              I'm a product-minded developer driven by the intersection of design and functionality. I bridge the gap between beautiful interfaces and robust code, creating seamless digital experiences that solve real-world problems. With expertise in full-stack development, I turn ideas into impactful solutions.
            </p>
          </div>
          
          {/* Glass Text Container Right: Location - Small */}
          <div className="glass-text-container small reveal-on-scroll">
            <h3>Based In</h3>
            <p>
              Philippines, available for worldwide collaboration and remote partnerships.
            </p>
          </div>
        </div>
      </section>

      <main className="container">
        <div className="glass-container about-skills-glass">
          {/* Skills Navigation with Gliding Animation */}
          <div className="skills-nav-wrapper">
            <div className="skills-nav">
              <button 
                className={`nav-btn ${activeFilter === 'technical' ? 'active' : ''}`}
                onClick={() => setActiveFilter('technical')}
              >
                Technical Skills
              </button>
              <button 
                className={`nav-btn ${activeFilter === 'soft' ? 'active' : ''}`}
                onClick={() => setActiveFilter('soft')}
              >
                Soft Skills
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
          
          {/* Skills List - Simple Rows that Slide Up */}
          <div className="skills-list-container">
            {displayedSkills.map((skill, index) => (
              <div 
                key={`${activeFilter}-${index}`}
                className="skill-item-row"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <i className={`${skill.icon}`}></i>
                <span>{skill.name}</span>
              </div>
            ))}
          </div>
        </div>

        <section className="certifications-section" style={{ marginTop: '3rem' }}>
          <h2>Certifications &amp; Credentials</h2>
          <div className="cert-carousel-wrapper" ref={certCarouselRef}>
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
