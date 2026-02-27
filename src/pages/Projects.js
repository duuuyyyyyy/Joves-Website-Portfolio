import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ProjectModal, useProjectModal } from '../components/ProjectModal';

function Projects() {
  const [showAll, setShowAll] = useState(false);
  const { activeProject, openModal, closeModal } = useProjectModal();
  const carouselRef = useRef(null);
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  useEffect(() => {
    document.title = 'Projects | Portfolio';

    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && activeProject) {
        closeModal();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [activeProject, closeModal]);

  // Carousel drag handlers
  const handleMouseDown = (e) => {
    setIsDown(true);
    setStartX(e.pageX - carouselRef.current.offsetLeft);
    setScrollLeft(carouselRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDown(false);
  };

  const handleMouseUp = () => {
    setIsDown(false);
  };

  const handleMouseMove = (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * -1;
    carouselRef.current.scrollLeft = scrollLeft + walk;
  };

  useEffect(() => {
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

    const cards = document.querySelectorAll('.project-card');
    cards.forEach(card => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';
      card.style.transition = 'all 0.6s ease';
      observer.observe(card);
    });

    return () => observer.disconnect();
  }, [showAll]);

  const handleCardClick = (e, projectId) => {
    if (e.target.tagName !== 'A') {
      e.preventDefault();
      openModal(projectId);
    }
  };

  return (
    <>
      {/* Page Header */}
      <section className="hero-scalar" style={{ minHeight: '45vh', paddingBottom: '3rem' }}>
        {/* Localized Immersive Orbs */}
        <div className="hero-orb orb-v5 orb-color-1" style={{ top: '-10%', right: '10%' }}></div>
        <div className="hero-orb orb-v2 orb-color-3" style={{ bottom: '5%', left: '5%' }}></div>
        <div className="hero-orb orb-v7 orb-color-5 orb-shape-ellipse orb-anim-wave" style={{ top: '12%', left: '18%' }}></div>
        <div className="hero-orb orb-v6 orb-color-6 orb-shape-blob orb-anim-rise" style={{ bottom: '18%', right: '28%' }}></div>
        <div className="hero-orb orb-v8 orb-color-4 orb-shape-squircle orb-anim-orbit" style={{ top: '35%', right: '4%' }}></div>
        <div className="hero-scalar-content">
          <span className="hero-label">EXPLORE</span>
          <h1 className="hero-scalar-title">Projects & <em>Creations</em></h1>
        </div>
      </section>

      {/* Main Content */}
      <main className="projects-main">

        {/* Header and Description */}
        <section className="projects-intro">
          <h2>Find your dream <em>project</em></h2>
          <p>You should feel safe when working with me, and you shouldn't be able to recognise any sway, give or flex in my approach to delivering quality solutions.</p>
        </section>

        {/* Projects Curved Carousel */}
        <section className="projects-carousel-wrapper">
          <div
            className="projects-carousel"
            ref={carouselRef}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
          >
            {/* Project 1 */}
            <div className="carousel-item" onClick={() => openModal('1')}>
              <div className="carousel-image" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/project-images/project-1-wander.png)` }}>
                <div className="carousel-overlay"></div>
              </div>
            </div>

            {/* Project 2 */}
            <div className="carousel-item" onClick={() => openModal('2')}>
              <div className="carousel-image" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/project-images/project-2-jzone-motorcycle-red.png)` }}>
                <div className="carousel-overlay"></div>
              </div>
            </div>

            {/* Project 3 */}
            <div className="carousel-item" onClick={() => openModal('3')}>
              <div className="carousel-image" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/project-images/jewelry-ecommerce-landing-page.png)` }}>
                <div className="carousel-overlay"></div>
              </div>
            </div>

            {/* Project 4 */}
            <div className="carousel-item" onClick={() => openModal('4')}>
              <div className="carousel-image" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/project-placeholder-4.svg)` }}>
                <div className="carousel-overlay"></div>
              </div>
            </div>

          </div>
        </section>

        {/* Stream Lines Section with Characteristics */}
        <section className="projects-stream-section">
          <svg className="stream-lines" viewBox="0 0 1000 300" preserveAspectRatio="none">
            <defs>
              <linearGradient id="wave-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style={{ stopColor: 'var(--accent)', stopOpacity: 0.6 }} />
                <stop offset="50%" style={{ stopColor: '#d946a6', stopOpacity: 0.4 }} />
                <stop offset="100%" style={{ stopColor: 'var(--accent)', stopOpacity: 0.6 }} />
              </linearGradient>
            </defs>
            <path d="M 0 80 Q 250 20, 500 80 T 1000 80" fill="none" stroke="url(#wave-gradient)" strokeWidth="2" opacity="0.8" />
            <path d="M 0 120 Q 250 60, 500 120 T 1000 120" fill="none" stroke="url(#wave-gradient)" strokeWidth="2" opacity="0.6" />
            <path d="M 0 160 Q 250 100, 500 160 T 1000 160" fill="none" stroke="url(#wave-gradient)" strokeWidth="2" opacity="0.4" />
          </svg>

          {/* Characteristic Pills */}
          <div className="characteristic-pill" style={{ animationDelay: '0s', left: '15%' }}>
            <span>Mindful Design</span>
          </div>
          <div className="characteristic-pill" style={{ animationDelay: '1.5s', left: '35%', top: '40%' }}>
            <span>Attention to Detail</span>
          </div>
          <div className="characteristic-pill" style={{ animationDelay: '3s', left: '65%', top: '45%' }}>
            <span>User-Centered</span>
          </div>
          <div className="characteristic-pill" style={{ animationDelay: '4.5s', left: '85%', top: '20%' }}>
            <span>Pixel Perfect</span>
          </div>
        </section>

        {/* CTA */}
        <section className="projects-cta">
          <h2 className="projects-cta-title">Let's Create Something <em>Amazing</em></h2>
          <p className="projects-cta-text">Ready to bring your vision to life? Let's collaborate and build something extraordinary.</p>
          <Link to="/contact" className="btn btn-primary">Start Your Project</Link>
        </section>
      </main>

      {/* Project Modal */}
      <ProjectModal projectId={activeProject} onClose={closeModal} />
    </>
  );
}

export default Projects;
