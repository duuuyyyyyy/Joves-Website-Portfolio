import React, { useEffect, useState, useRef } from 'react';

function About() {
  const [activeFilter, setActiveFilter] = useState('technical');
  const [expandedSkill, setExpandedSkill] = useState(null);
  const [activeCert, setActiveCert] = useState(0);
  const [certSectionVisible, setCertSectionVisible] = useState(false);
  const [flowSectionVisible, setFlowSectionVisible] = useState(false);
  const [activeFlowPill, setActiveFlowPill] = useState('capacity');
  const heroRef = useRef(null);
  const certSectionRef = useRef(null);
  const flowSectionRef = useRef(null);

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
      title: 'Back End Development and APIs Certification',
      issued: 'Issue date not shown on uploaded certificate',
      desc: 'Credential focused on backend application structure, API design, and server-side JavaScript workflows.',
      image: process.env.PUBLIC_URL + '/certifications/back-end-development-and-api-certification.png'
    },
    {
      title: 'CCNA: Introduction to Networks Badge',
      issued: 'Issue date not shown on uploaded badge',
      desc: 'Networking credential covering core concepts such as network models, addressing, routing basics, and foundational infrastructure knowledge.',
      image: process.env.PUBLIC_URL + '/certifications/ccna-introduction-to-networks-badge.png'
    },
    {
      title: 'Content Marketing Certification',
      issued: 'Issue date not shown on uploaded certificate',
      desc: 'Certification in content planning, audience targeting, messaging strategy, and performance-oriented marketing content.',
      image: process.env.PUBLIC_URL + '/certifications/content-marketing-certification.png'
    },
    {
      title: 'Design Thinking Certification of Completion',
      issued: 'Issue date not shown on uploaded certificate',
      desc: 'Training centered on problem framing, ideation, user-centered thinking, and structured solution development.',
      image: process.env.PUBLIC_URL + '/certifications/design-thinking-certification-of-completion.png'
    },
    {
      title: 'Digital Advertising Certification',
      issued: 'Issue date not shown on uploaded certificate',
      desc: 'Credential focused on campaign execution, ad strategy, platform fundamentals, and conversion-oriented promotion.',
      image: process.env.PUBLIC_URL + '/certifications/digital-advertising-certification.png'
    },
    {
      title: 'Digital Marketing Certification',
      issued: 'Issue date not shown on uploaded certificate',
      desc: 'Broad marketing certification covering digital channels, audience acquisition, campaign measurement, and online growth strategy.',
      image: process.env.PUBLIC_URL + '/certifications/digital-marketing-certification.png'
    },
    {
      title: 'Introduction to Figma Certificate of Completion',
      issued: 'Issue date not shown on uploaded certificate',
      desc: 'Course completion credential for interface design workflows, wireframing, collaborative design, and prototyping in Figma.',
      image: process.env.PUBLIC_URL + '/certifications/introduction-to-figma-certificate-of-completion.png'
    },
    {
      title: 'JavaScript Essentials Badge',
      issued: 'Issue date not shown on uploaded badge',
      desc: 'Badge validating JavaScript fundamentals, syntax, logic, and practical programming foundations.',
      image: process.env.PUBLIC_URL + '/certifications/javascript-essentials-badge.png'
    },
    {
      title: 'Legacy JavaScript Algorithms and Data Structures Certification',
      issued: 'Issue date not shown on uploaded certificate',
      desc: 'Credential covering core JavaScript problem solving, algorithms, data structures, and applied coding exercises.',
      image: process.env.PUBLIC_URL + '/certifications/legacy-javascript-algorithm-and-data-structures-certification.png'
    },
    {
      title: 'Responsive Web Design Certification',
      issued: 'Issue date not shown on uploaded certificate',
      desc: 'Certification focused on accessible layouts, semantic HTML, CSS, and responsive interface implementation across devices.',
      image: process.env.PUBLIC_URL + '/certifications/responsive-web-design-certification.png'
    },
    {
      title: 'SEO II Certified',
      issued: 'Issue date not shown on uploaded certificate',
      desc: 'Advanced SEO credential covering search visibility, optimization strategy, technical discoverability, and content performance.',
      image: process.env.PUBLIC_URL + '/certifications/seo-2-certified.png'
    },
    {
      title: 'SEO Certification',
      issued: 'Issue date not shown on uploaded certificate',
      desc: 'Credential focused on search engine optimization fundamentals, on-page improvements, keyword strategy, and ranking best practices.',
      image: process.env.PUBLIC_URL + '/certifications/seo-certification.png'
    },
  ];

  const flowLines = Array.from({ length: 46 }, (_, i) => i);
  const flowPills = [
    { label: 'capacity', x: '13%', y: '38%', delay: '0s' },
    { label: 'clarity', x: '33%', y: '54%', delay: '0.12s' },
    { label: 'consistency', x: '55%', y: '71%', delay: '0.24s' },
    { label: 'momentum', x: '78%', y: '58%', delay: '0.36s' },
  ];
  const flowPillContent = {
    capacity: 'Placeholder: Capacity grows when work is repeatable and priorities are consistently clear.',
    clarity: 'Placeholder: Clear direction reduces friction, speeds execution, and improves output quality.',
    consistency: 'Placeholder: Consistency compounds over time, creating stable progress with fewer resets.',
    momentum: 'Placeholder: Momentum forms when each completed step naturally feeds the next action.'
  };

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

  useEffect(() => {
    const section = flowSectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setFlowSectionVisible(true);
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
    <section id="about" className="page-section about-page">
      <div className="about-page-grid">
        <section className="about-hero-center-wrapper" ref={heroRef}>
          <div className="hero-orb orb-v1 orb-color-1 orb-shape-ellipse" style={{ top: '5%', right: '5%' }}></div>
          <div className="hero-orb orb-v2 orb-color-2 orb-shape-blob" style={{ bottom: '15%', left: '10%' }}></div>
          <div className="hero-orb orb-v3 orb-color-3 orb-shape-squircle" style={{ top: '40%', left: '25%' }}></div>
          <div className="hero-orb orb-v4 orb-color-4 orb-shape-ellipse" style={{ bottom: '25%', right: '20%' }}></div>
          <div className="hero-orb orb-v6 orb-color-5 orb-shape-blob orb-anim-wave" style={{ top: '10%', left: '22%' }}></div>
          <div className="hero-orb orb-v7 orb-color-6 orb-shape-squircle orb-anim-rise" style={{ bottom: '6%', left: '28%' }}></div>
          <div className="hero-orb orb-v8 orb-color-5 orb-shape-ellipse orb-anim-orbit" style={{ top: '24%', right: '34%' }}></div>

          <div className="about-hero-layout">
            <div className="about-photo-stack">
              <div className="broken-circle-clip">
                <svg className="broken-circle-border" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="47" />
                </svg>
              </div>
              <div className="about-photo-main">
                <img src={process.env.PUBLIC_URL + '/carla-joves-public-speaking.jpg'} alt="Carla Joves speaking" />
              </div>
              <div className="about-photo-overlay">
                <img src={process.env.PUBLIC_URL + '/carla-joves-posing-holding-camera.jpg'} alt="Carla Joves with camera" />
              </div>
            </div>

            <div className="about-text-block">
              <h2>Who I Am</h2>
              <p>
                I'm a product-minded developer driven by the intersection of design and functionality. I bridge the gap between beautiful interfaces and robust code, creating seamless digital experiences that solve real-world problems.
              </p>
              <div className="about-based-card">
                <h3>Based In</h3>
                <p>Philippines, available for worldwide collaboration and remote partnerships.</p>
              </div>
            </div>
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
                          {isActive ? '-' : '+'}
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
                  <p className="cert-date">Issued: {currentCert.issued}</p>
                  <p className="cert-preview-desc">{currentCert.desc}</p>
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

          <section
            className={`about-flow-section ${flowSectionVisible ? 'revealed' : ''}`}
            ref={flowSectionRef}
          >
            <h2 className="about-flow-title">
              You steadily gain <span>impactful momentum.</span>
            </h2>
            <p className="about-flow-subtitle" key={activeFlowPill}>
              {flowPillContent[activeFlowPill]}
            </p>

            <div className="about-flow-canvas">
              <svg className="about-flow-lines" viewBox="0 0 1200 380" preserveAspectRatio="none" aria-hidden="true">
                {flowLines.map((line) => (
                  <path
                    key={line}
                    className="about-flow-line"
                    d={`M 0 ${124 + line * 4} C 220 ${24 + line * 2}, 430 ${258 + line * 2}, 650 ${160 + line * 2} C 830 ${88 + line * 2}, 1000 ${54 + line * 3}, 1200 ${132 + line * 2}`}
                    style={{ opacity: 0.14 + line * 0.015 }}
                  />
                ))}
              </svg>

              <div className="about-flow-pills-layer">
                {flowPills.map((pill) => (
                  <button
                    key={pill.label}
                    type="button"
                    className={`about-flow-pill ${activeFlowPill === pill.label ? 'active' : ''}`}
                    style={{ left: pill.x, top: pill.y, '--pill-delay': pill.delay }}
                    onClick={() => setActiveFlowPill(pill.label)}
                  >
                    {pill.label}
                  </button>
                ))}
              </div>
            </div>
          </section>
        </main>
      </div>
    </section>
  );
}

export default About;
