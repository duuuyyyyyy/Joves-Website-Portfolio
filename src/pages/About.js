import React, { useEffect, useState, useRef } from 'react';

const renderCertDate = (cert) =>
  cert.issued ? <p className="cert-date">{cert.dateLabel || 'Issued'}: {cert.issued}</p> : null;

const renderCertImage = (cert) => {
  const image = (
    <img
      src={cert.image}
      alt={`Preview of ${cert.title}`}
      className={`cert-preview-image ${cert.fitMode ? `fit-${cert.fitMode}` : ''}`}
    />
  );

  if (!cert.link) return image;

  return (
    <a
      href={cert.link}
      target="_blank"
      rel="noopener noreferrer"
      className="cert-image-link"
      aria-label={`View ${cert.title} credential (opens in a new tab)`}
    >
      {image}
    </a>
  );
};

function About() {
  const [activeFilter, setActiveFilter] = useState('technical');
  const [activeCert, setActiveCert] = useState(0);
  const [certSectionVisible, setCertSectionVisible] = useState(false);
  const [flowSectionVisible, setFlowSectionVisible] = useState(false);
  const [activeFlowPill, setActiveFlowPill] = useState('capacity');
  const heroRef = useRef(null);
  const certSectionRef = useRef(null);
  const flowSectionRef = useRef(null);

  const technicalSkills = [
    { title: 'Frontend Development', details: 'HTML, CSS, Tailwind CSS, JavaScript, React.js', icon: 'fas fa-code', category: 'technical' },
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
      title: 'Intermediate Machine Learning',
      link: 'https://www.kaggle.com/learn/certification/carlajoves/intermediate-machine-learning',
      issued: 'October 30, 2026',
      issuedDate: '2026-10-30',
      kicker: 'Certificate',
      desc: 'Kaggle course covering missing values, categorical variables, pipelines, cross-validation, XGBoost, and data leakage.',
      image: process.env.PUBLIC_URL + '/certifications/kaggle-intermediate-machine-learning-certificate.png',
      fitMode: 'wide'
    },
    {
      title: 'Intro to Machine Learning',
      link: 'https://www.kaggle.com/learn/certification/carlajoves/intro-to-machine-learning',
      issued: 'October 29, 2026',
      issuedDate: '2026-10-29',
      kicker: 'Certificate',
      desc: 'Kaggle course covering core machine learning concepts, including decision trees, random forests, model validation, and underfitting and overfitting.',
      image: process.env.PUBLIC_URL + '/certifications/kaggle-intro-to-machine-learning-certificate.png',
      fitMode: 'wide'
    },
    {
      title: 'Introduction to Modern AI',
      link: 'https://www.credly.com/badges/6bc6c434-b129-421a-ad3c-3bc4d2f2c4da/public_url',
      issued: 'October 30, 2026',
      issuedDate: '2026-10-30',
      kicker: 'Certificate',
      desc: 'Cisco Networking Academy course covering foundational concepts in modern artificial intelligence.',
      image: process.env.PUBLIC_URL + '/certifications/cisco-introduction-to-modern-ai-certificate.png',
      fitMode: 'wide'
    },
    {
      title: 'Website UI/UX Designing using ChatGPT',
      link: 'https://www.simplilearn.com/skillup-certificate-landing?token=eyJjb3Vyc2VfaWQiOiIzMjM3IiwiY2VydGlmaWNhdGVfdXJsIjoiaHR0cHM6XC9cL2NlcnRpZmljYXRlcy5zaW1wbGljZG4ubmV0XC9zaGFyZVwvODg2NzE2M184MDAyMjA1MTc1NjMwNTc0ODI1Mi5wbmciLCJ1c2VybmFtZSI6IkNhcmxhIEQuIEpvdmVzIn0%3D',
      issued: 'August 27, 2025',
      issuedDate: '2025-08-27',
      kicker: 'Certificate',
      desc: 'Simplilearn SkillUp course on using ChatGPT to support website UI/UX design work.',
      image: process.env.PUBLIC_URL + '/certifications/website-ui-ux-designing-using-chatgpt-certificate.png'
    },
    {
      title: 'A2K Group Corporation Internship (486 Hours)',
      issued: 'July 13, 2026 - October 7, 2026',
      issuedDate: '2026-10-07',
      dateLabel: 'Duration',
      kicker: 'Internship',
      desc: 'Certificate of internship awarded by A2K Group Corporation for completing a 486-hour internship.',
      image: process.env.PUBLIC_URL + '/certifications/a2k-group-internship-certificate-july-october-2026.jpg'
    },
    {
      title: 'A2K Group Corporation Internship (April - May 2026)',
      issued: 'April 6, 2026 - May 27, 2026',
      issuedDate: '2026-05-27',
      dateLabel: 'Duration',
      kicker: 'Internship',
      desc: 'Certificate of internship awarded by A2K Group Corporation for completing an internship with the company.',
      image: process.env.PUBLIC_URL + '/certifications/a2k-group-internship-certificate-april-may-2026.jpg'
    },
    {
      title: 'Back End Development and APIs Certification',
      link: 'https://www.freecodecamp.org/certification/jovescarla/back-end-development-and-apis',
      issued: 'October 4, 2025',
      issuedDate: '2025-10-04',
      kicker: 'Certificate',
      desc: 'Credential focused on backend application structure, API design, and server-side JavaScript workflows.',
      image: process.env.PUBLIC_URL + '/certifications/back-end-development-and-api-certification.png',
      fitMode: 'wide'
    },
    {
      title: 'CCNA: Introduction to Networks',
      link: 'https://www.credly.com/badges/b8d44ce5-153a-4ad3-b970-f96ecc701bf6/public_url',
      issued: 'May 16, 2025',
      issuedDate: '2025-05-16',
      kicker: 'Certificate',
      desc: 'Networking credential covering core concepts such as network models, addressing, routing basics, and foundational infrastructure knowledge.',
      image: process.env.PUBLIC_URL + '/certifications/cisco-ccna-introduction-to-networks-certificate.png',
      fitMode: 'wide'
    },
    {
      title: 'AWS Cloud Foundation Certificate of Completion',
      link: 'https://www.credly.com/badges/8b296f11-83de-401e-9540-ab9bfa68a170/public_url',
      issued: 'March 13, 2026',
      issuedDate: '2026-03-13',
      kicker: 'Certificate',
      desc: 'Cloud foundation training focused on core AWS concepts, cloud service models, platform fundamentals, and introductory cloud infrastructure knowledge.',
      image: process.env.PUBLIC_URL + '/certifications/aws-cloud-foundation-certificate-of-completion.png',
      fitMode: 'wide'
    },
    {
      title: 'CompTIA IT Fundamentals (ITF+) Certification',
      link: 'https://www.credly.com/badges/4325336d-8e50-4c62-885e-5d2504f88a68/public_url',
      issued: 'November 23, 2023',
      issuedDate: '2023-11-23',
      kicker: 'Badge',
      desc: 'Entry-level IT credential covering computing basics, software and hardware concepts, troubleshooting fundamentals, and general technology literacy.',
      image: process.env.PUBLIC_URL + '/certifications/comptia-it-fundamentals-itf-certification.1.png',
      fitMode: 'badge'
    },
    {
      title: 'Content Marketing Certification',
      issued: 'August 27, 2025',
      issuedDate: '2025-08-27',
      kicker: 'Certificate',
      desc: 'Certification in content planning, audience targeting, messaging strategy, and performance-oriented marketing content.',
      image: process.env.PUBLIC_URL + '/certifications/content-marketing-certification.png'
    },
    {
      title: 'Design Thinking Certification of Completion',
      issued: 'July 28, 2025',
      issuedDate: '2025-07-28',
      kicker: 'Certificate',
      desc: 'Training centered on problem framing, ideation, user-centered thinking, and structured solution development.',
      image: process.env.PUBLIC_URL + '/certifications/design-thinking-certification-of-completion.png'
    },
    {
      title: 'Introduction to Figma Certificate of Completion',
      issued: 'September 19 2024',
      issuedDate: '2024-09-19',
      kicker: 'Certificate',
      desc: 'Course completion credential for interface design workflows, wireframing, collaborative design, and prototyping in Figma.',
      image: process.env.PUBLIC_URL + '/certifications/introduction-to-figma-certificate-of-completion.png'
    },
    {
      title: 'JavaScript Essentials 1',
      link: 'https://www.credly.com/badges/5b55c3d9-28d0-4fdc-a8bf-1d7b2b44755a/public_url',
      issued: 'October 25, 2024',
      issuedDate: '2024-10-25',
      kicker: 'Certificate',
      desc: 'Cisco Networking Academy course covering JavaScript fundamentals, syntax, logic, and practical programming foundations.',
      image: process.env.PUBLIC_URL + '/certifications/cisco-javascript-essentials-1-certificate.png',
      fitMode: 'wide'
    },
    {
      title: 'Legacy JavaScript Algorithms and Data Structures Certification',
      link: 'https://www.freecodecamp.org/certification/jovescarla/javascript-algorithms-and-data-structures',
      issued: 'October 2, 2025',
      issuedDate: '2025-10-02',
      kicker: 'Certificate',
      desc: 'Credential covering core JavaScript problem solving, algorithms, data structures, and applied coding exercises.',
      image: process.env.PUBLIC_URL + '/certifications/legacy-javascript-algorithm-and-data-structures-certification.png',
      fitMode: 'wide'
    },
    {
      title: 'Responsive Web Design Certification',
      link: 'https://www.freecodecamp.org/certification/carlajoves/responsive-web-design',
      issued: 'September 8, 2024',
      issuedDate: '2024-09-08',
      kicker: 'Certificate',
      desc: 'Certification focused on accessible layouts, semantic HTML, CSS, and responsive interface implementation across devices.',
      image: process.env.PUBLIC_URL + '/certifications/responsive-web-design-certification.png',
      fitMode: 'wide'
    },
    {
      title: 'SEO II Certified',
      link: 'https://app-na2.hubspot.com/academy/achievements/m1dvwbfn/en/1/carla-joves/seo-ii',
      issued: 'February 9, 2026',
      issuedDate: '2026-02-09',
      kicker: 'Certificate',
      desc: 'Advanced SEO credential covering search visibility, optimization strategy, technical discoverability, and content performance.',
      image: process.env.PUBLIC_URL + '/certifications/seo-2-certified.png'
    },
    {
      title: 'SEO Certification',
      link: 'https://app-na2.hubspot.com/academy/achievements/wch2nddl/en/1/carla-joves/seo',
      issued: 'January 7, 2026',
      issuedDate: '2026-01-07',
      kicker: 'Certificate',
      desc: 'Credential focused on search engine optimization fundamentals, on-page improvements, keyword strategy, and ranking best practices.',
      image: process.env.PUBLIC_URL + '/certifications/seo-certification.png'
    }
  ].sort((a, b) => new Date(b.issuedDate || 0) - new Date(a.issuedDate || 0));

  const flowLines = Array.from({ length: 46 }, (_, i) => i);
  const flowPills = [
    { label: 'capacity', x: '16%', y: '35%', mobileX: '14%', mobileY: '66%', delay: '0s' },
    { label: 'clarity', x: '34%', y: '47%', mobileX: '22%', mobileY: '82%', delay: '0.12s' },
    { label: 'focus', x: '49%', y: '39%', mobileX: '50%', mobileY: '70%', delay: '0.18s' },
    { label: 'consistency', x: '63%', y: '55%', mobileX: '70%', mobileY: '88%', delay: '0.24s' },
    { label: 'momentum', x: '81%', y: '42%', mobileX: '86%', mobileY: '74%', delay: '0.36s' },
  ];
  const flowPillContent = {
    capacity: 'Capacity grows when work is repeatable and priorities are consistently clear.',
    clarity: 'Clear direction reduces friction, speeds execution, and improves output quality.',
    focus: 'Focus keeps energy directed toward the highest-impact work instead of scattered busywork.',
    consistency: 'Consistency compounds over time, creating stable progress with fewer resets.',
    momentum: 'Momentum forms when each completed step naturally feeds the next action.'
  };

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
    setActiveCert(index);
  };

  const handleCertKeyDown = (e, index) => {
    if (e.target !== e.currentTarget) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleCertClick(index);
    }
  };

  const currentCert = certifications[activeCert] || certifications[0];

  return (
    <>
      <section id="about" className="page-section about-page">
        <div className="about-page-grid">
          <div className="editorial-section-header editorial-section-header-right about-section-header">
            <h1 className="editorial-section-title">About Me</h1>
          </div>
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
                  <img src={process.env.PUBLIC_URL + '/carla-joves-professional-photo.svg'} alt="Carla Joves posing in a professional setting" />
                </div>
              </div>

              <div className="about-text-block">
                <p className="about-intro-copy">
                  I am a <span className="about-inline-highlight">Carla Dulay Joves</span>, a UI/UX designer and aspiring front-end developer passionate about creating
                  user-centered digital experiences that combine thoughtful design with functional
                  code.{' '}
                  
                  <span className="about-inline-highlight">
                    Based in the Philippines and available for worldwide collaboration and remote
                    partnerships
                  </span>
                  , I am currently pursuing{' '}
                  <span className="about-inline-highlight">
                    a Bachelor of Science in Information Technology majoring in Web Development at
                    Holy Angel University
                  </span>
                  . I work with tools and technologies such as Figma, HTML, CSS, JavaScript,
                  Tailwind CSS, GitHub, and Visual Studio Code to design and develop responsive,
                  accessible web interfaces. With experience in UI design, front-end development,
                  and digital asset creation, my goal is to specialize in UI/UX and front-end
                  development while building intuitive and visually engaging products that solve
                  real-world user needs.
                </p>
              </div>
            </div>
          </section>

        <main className="container">
          <div className="glass-container about-skills-glass">
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
                <div
                  className="nav-glider"
                  style={{
                    transform: `translateX(${activeFilter === 'technical' ? '0%' : '100%'})`
                  }}
                ></div>
              </div>
            </div>

            <div className="skills-list-container">
              {displayedSkills.map((skill, index) => (
                <div
                  key={`${activeFilter}-${index}`}
                  className="skill-item-row"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <i className={skill.icon} aria-hidden="true"></i>
                  <div className="skill-item-copy">
                    <span>{skill.title}</span>
                    <p className="skill-detail-text">{skill.details}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

            <section
              className={`certifications-section cert-showcase ${certSectionVisible ? 'revealed' : ''}`}
              ref={certSectionRef}
            >
              <h2>Credentials</h2>
              <div className="cert-showcase-layout">
                <div className="cert-sidebar-list" role="listbox" aria-label="Certification list">
                  {certifications.map((cert, index) => {
                    const isActive = activeCert === index;

                    return (
                      <div
                        key={cert.title}
                        tabIndex={0}
                        className={`cert-sidebar-item ${isActive ? 'active' : ''}`}
                        onClick={() => handleCertClick(index)}
                        onMouseEnter={() => handleCertClick(index)}
                        onFocus={() => handleCertClick(index)}
                        onKeyDown={(e) => handleCertKeyDown(e, index)}
                        role="option"
                        aria-selected={isActive}
                      >
                        <div className="cert-sidebar-thumb-wrap">
                          <img
                            src={cert.image}
                            alt={`Preview of ${cert.title}`}
                            className={`cert-sidebar-thumb ${cert.fitMode ? `fit-${cert.fitMode}` : ''}`}
                          />
                        </div>
                        <div className="cert-sidebar-copy">
                          <span className="cert-sidebar-kicker">{cert.kicker}</span>
                          <h3>{cert.title}</h3>
                        </div>
                        <div className="cert-mobile-details">
                          {renderCertDate(cert)}
                          <p>{cert.desc}</p>
                          <div className="cert-mobile-frame">{renderCertImage(cert)}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <aside className="cert-preview-panel">
                  <div className="cert-preview-copy-stack">
                    {certifications.map((cert) => (
                      <div
                        key={cert.title}
                        className={`cert-preview-copy${cert === currentCert ? ' is-current' : ''}`}
                      >
                        {renderCertDate(cert)}
                        <h3>{cert.title}</h3>
                        <p>{cert.desc}</p>
                      </div>
                    ))}
                  </div>
                  <div className="cert-preview-frame">{renderCertImage(currentCert)}</div>
                </aside>
              </div>
            </section>

            <section
              className={`about-flow-section ${flowSectionVisible ? 'revealed' : ''}`}
              ref={flowSectionRef}
            >
              <div className="about-flow-content">
                <h2 className="about-flow-title">
                  You steadily gain <span>impactful momentum.</span>
                </h2>
                <p className="about-flow-subtitle" key={activeFlowPill}>
                  {flowPillContent[activeFlowPill]}
                </p>
              </div>

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
                      style={{
                        '--pill-left': pill.x,
                        '--pill-top': pill.y,
                        '--pill-mobile-left': pill.mobileX,
                        '--pill-mobile-top': pill.mobileY,
                        '--pill-delay': pill.delay
                      }}
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
    </>
  );
}

export default About;
