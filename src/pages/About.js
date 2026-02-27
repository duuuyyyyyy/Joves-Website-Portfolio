import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';

function About() {
  const [activeFilter, setActiveFilter] = useState('technical');
  const [expandedSkill, setExpandedSkill] = useState(null);
  const [activeCert, setActiveCert] = useState(0);
  const [certSectionVisible, setCertSectionVisible] = useState(false);
  const heroRef = useRef(null);
  const certSectionRef = useRef(null);

  const technicalSkills = [
    { title: 'Frontend Development', details: 'HTML, CSS, JavaScript, React.js', icon: 'fas fa-code', category: 'technical' },
    { title: 'Design & UI', details: 'Responsive Web Design, UI/UX Implementation', icon: 'fas fa-paint-brush', category: 'technical' },
    { title: 'Backend Development', details: 'Node.js, Express.js, RESTful API Development', icon: 'fas fa-server', category: 'technical' },
    { title: 'Database Management', details: 'MongoDB, Mongoose, Database Design and Management', icon: 'fas fa-database', category: 'technical' },
    { title: 'Tools & Version Control', details: 'Git, GitHub, VS Code', icon: 'fas fa-tools', category: 'technical' },
  ];

  const softSkills = [
    { title: 'Creative Media', details: 'Graphic Design, Multimedia Editing, Physical Asset Creation', icon: 'fas fa-photo-video', category: 'soft' },
    { title: 'Communication & Strategy', details: 'Public Relations Support, Information Dissemination', icon: 'fas fa-bullhorn', category: 'soft' },
    { title: 'Execution & Collaboration', details: 'Team Collaboration, Agility, Stakeholder Management', icon: 'fas fa-people-arrows', category: 'soft' },
  ];

  const displayedSkills = activeFilter === 'technical' ? technicalSkills : softSkills;

  const certifications = [
    {
      title: 'Frontend Foundations Certificate',
      issued: 'March 2024',
      desc: 'Placeholder: Completed a structured program on modern UI development, component architecture, and accessibility fundamentals.',
      image: process.env.PUBLIC_URL + '/project-placeholder-4.svg'
    },
    {
      title: 'React Development Certificate',
      issued: 'July 2024',
      desc: 'Placeholder: Focused on hooks, reusable state patterns, performance optimization, and scalable React project structure.',
      image: process.env.PUBLIC_URL + '/project-placeholder-4.svg'
    },
    {
      title: 'UX Design Fundamentals Certificate',
      issued: 'November 2024',
      desc: 'Placeholder: Covered user research, wireframing, interaction design, and handoff workflows for developer-ready screens.',
      image: process.env.PUBLIC_URL + '/project-placeholder-4.svg'
    },
    {
      title: 'Web Systems Certificate',
      issued: 'February 2025',
      desc: 'Placeholder: Introduced deployment pipelines, project documentation standards, and practical frontend-backend integration.',
      image: process.env.PUBLIC_URL + '/project-placeholder-4.svg'
    },
  ];

  useEffect(() => {
    document.title = 'About | Portfolio';
  }, []);

  useEffect(() => {
    const section = certSectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setCertSectionVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const handleCertClick = (index) => {
    setActiveCert((prev) => (prev === index ? -1 : index));
  };

  const handleCertToggleClick = (e, index) => {
    e.stopPropagation();
    handleCertClick(index);
  };

  const handleCertKeyDown = (e, index) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleCertClick(index);
    }
  };

  const currentCert = activeCert >= 0 ? certifications[activeCert] : certifications[0];

  return (
    <>
      <div className="about-page-grid">
        <section className="about-hero-center-wrapper" ref={heroRef}>
          <div className="hero-orb orb-v1 orb-color-1 orb-shape-ellipse" style={{ top: '5%', right: '5%' }}></div>
          <div className="hero-orb orb-v2 orb-color-2 orb-shape-blob" style={{ bottom: '15%', left: '10%' }}></div>
          <div className="hero-orb orb-v3 orb-color-3 orb-shape-squircle" style={{ top: '40%', left: '25%' }}></div>
          <div className="hero-orb orb-v4 orb-color-4 orb-shape-ellipse" style={{ bottom: '25%', right: '20%' }}></div>
          <div className="hero-orb orb-v6 orb-color-5 orb-shape-blob orb-anim-wave" style={{ top: '10%', left: '22%' }}></div>
          <div className="hero-orb orb-v7 orb-color-6 orb-shape-squircle orb-anim-rise" style={{ bottom: '6%', left: '28%' }}></div>
          <div className="hero-orb orb-v8 orb-color-5 orb-shape-ellipse orb-anim-orbit" style={{ top: '24%', right: '34%' }}></div>

          <div className="visual-stack">
            <div className="broken-circle-clip">
              <svg className="broken-circle-border" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="47" />
              </svg>
            </div>
            <div className="image-glow-underlay"></div>
            <div className="about-main-image-circular">
              <img src={process.env.PUBLIC_URL + '/professional-photo.svg'} alt="Carla Joves" />
            </div>
          </div>

          <div className="glass-text-container hero-bottom-left">
            <h3>Who I Am</h3>
            <p>
              I'm a product-minded developer driven by the intersection of design and functionality. I bridge the gap between beautiful interfaces and robust code, creating seamless digital experiences that solve real-world problems.
            </p>
          </div>

          <div className="glass-text-container hero-top-right">
            <h3>Based In</h3>
            <p>
              Philippines, available for worldwide collaboration and remote partnerships.
            </p>
          </div>
        </section>

        <main className="container">
          <div className="glass-container about-skills-glass">
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
                  Soft Skills
                </button>
                <div
                  className="nav-glider"
                  style={{
                    transform: `translateX(${activeFilter === 'technical' ? '0%' : '100%'})`
                  }}
                ></div>
              </div>
            </div>

            <div className="skills-list-container">
              {displayedSkills.map((skill, index) => {
                const isActive = expandedSkill?.title === skill.title;
                return (
                  <div key={`${activeFilter}-${index}`} className={`skill-dropdown ${isActive ? 'open' : ''}`}>
                    <button
                      type="button"
                      className={`skill-item-row skill-item-btn ${isActive ? 'active' : ''}`}
                      style={{ animationDelay: `${index * 0.1}s` }}
                      onClick={() => setExpandedSkill(isActive ? null : skill)}
                    >
                      <i className={`${skill.icon}`}></i>
                      <span>{skill.title}</span>
                    </button>
                    <div className="skill-inline-details" role="region" aria-live="polite">
                      <div className="skill-detail-text">{skill.details}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <section
            className={`certifications-section cert-showcase ${certSectionVisible ? 'revealed' : ''}`}
            ref={certSectionRef}
          >
            <h2>Certifications &amp; Credentials</h2>
            <div className="cert-showcase-layout">
              <div className="cert-list-column">
                {certifications.map((cert, index) => {
                  const isActive = activeCert === index;
                  return (
                    <div
                      key={cert.title}
                      className={`cert-accordion-item ${isActive ? 'active' : ''}`}
                      role="button"
                      tabIndex={0}
                      onClick={() => handleCertClick(index)}
                      onKeyDown={(e) => handleCertKeyDown(e, index)}
                      aria-expanded={isActive}
                    >
                      <div className="cert-accordion-header">
                        <h3>{cert.title}</h3>
                        <button
                          type="button"
                          className="cert-toggle-btn"
                          aria-label={isActive ? `Collapse ${cert.title}` : `Expand ${cert.title}`}
                          onClick={(e) => handleCertToggleClick(e, index)}
                        >
                          {isActive ? '−' : '+'}
                        </button>
                      </div>
                      <div className="cert-accordion-body">
                        <p className="cert-date">Issued: {cert.issued}</p>
                        <p>{cert.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="cert-preview-column" key={activeCert >= 0 ? activeCert : 'default'}>
                <div className="cert-preview-meta">
                  <h3>{currentCert.title}</h3>
                </div>
                <div className="cert-preview-image-wrap">
                  <img
                    src={currentCert.image}
                    alt={`${currentCert.title} preview`}
                    className="cert-preview-image"
                  />
                </div>
              </div>
            </div>
          </section>

          <section className="about-cta" style={{ marginBottom: '4rem', paddingBottom: '3rem' }}>
            <h2 className="about-cta-title">Let's Work Together</h2>
            <p className="about-cta-text">I'm always interested in hearing about new opportunities and challenges.</p>
            <Link to="/contact" className="btn btn-primary">Get In Touch</Link>
          </section>
        </main>
      </div>
    </>
  );
}

export default About;
