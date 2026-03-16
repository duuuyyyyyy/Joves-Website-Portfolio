import React, { useEffect, useRef } from 'react';
import { ProjectModal, useProjectModal } from '../components/ProjectModal';

function Home() {
  const { activeProject, openModal, closeModal } = useProjectModal();
  const heroRef = useRef(null);
  const projectsRef = useRef(null);

  const handleFeaturedProjectKeyDown = (event, projectId) => {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    event.preventDefault();
    openModal(projectId);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && activeProject) {
        closeModal();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [activeProject, closeModal]);

  // Staggered reveal animations on scroll
  useEffect(() => {
    const observerOptions = {
      threshold: 0.15,
      rootMargin: '0px 0px -60px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
        }
      });
    }, observerOptions);

    const revealEls = document.querySelectorAll('.reveal-on-scroll');
    revealEls.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // Hero parallax-like movement removed (now global)

  return (
    <>
      {/* Hero Section - Scalar inspired dark immersive */}
      <section className="hero-scalar" id="hero" ref={heroRef}>
        {/* Localized Immersive Orbs */}
        <div className="hero-orb orb-v1 orb-color-1" style={{ top: '-10%', right: '-5%' }}></div>
        <div className="hero-orb orb-v2 orb-color-2" style={{ bottom: '10%', left: '-5%' }}></div>
        <div className="hero-orb orb-v3 orb-color-3" style={{ top: '30%', left: '20%' }}></div>
        <div className="hero-orb orb-v4 orb-color-4" style={{ bottom: '20%', right: '15%' }}></div>
        <div className="hero-orb orb-v5 orb-color-1" style={{ top: '50%', right: '30%' }}></div>
        <div className="hero-orb orb-v2 orb-color-2" style={{ top: '5%', left: '10%' }}></div>
        <div className="hero-orb orb-v6 orb-color-3" style={{ top: '14%', right: '28%' }}></div>
        <div className="hero-orb orb-v7 orb-color-4" style={{ bottom: '8%', right: '42%' }}></div>
        <div className="hero-orb orb-v8 orb-color-1" style={{ top: '62%', left: '34%' }}></div>
        <div className="hero-orb orb-v6 orb-color-2" style={{ top: '38%', right: '4%' }}></div>
        <div className="hero-orb orb-v8 orb-color-4" style={{ bottom: '30%', left: '6%' }}></div>
        <div className="hero-orb orb-v7 orb-color-5 orb-shape-ellipse orb-anim-wave" style={{ top: '8%', right: '40%' }}></div>
        <div className="hero-orb orb-v6 orb-color-6 orb-shape-blob orb-anim-rise" style={{ bottom: '18%', right: '9%' }}></div>
        <div className="hero-orb orb-v8 orb-color-5 orb-shape-squircle orb-anim-orbit" style={{ top: '46%', left: '11%' }}></div>

        {/* Gradient glow at bottom */}
        <div className="hero-glow"></div>

        <div className="hero-scalar-content">
          <span className="hero-label reveal-on-scroll">UI/UX DESIGNER</span>
          <h1 className="hero-scalar-title reveal-on-scroll">
            <span className="hero-line-1">Carla Dulay Joves.</span>

          </h1>
          <p className="hero-scalar-subtitle reveal-on-scroll">
            Building the Web with Human <em>Touch.</em> An output focused developer who crafts meaningful user
            experiences bridging design thinking with what user needs.
          </p>
          <div className="hero-scalar-actions reveal-on-scroll">
            <a href="#projects-section" className="btn-scalar-primary">
              <span>View My Works</span> <img src="/arrow-forward-outline.png" alt="" className="btn-arrow" aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      {/* THE GRADIENT BRIDGE */}
      <div className="section-bridge">
        <div className="bridge-glow-orb"></div>
      </div>

      {/* Featured Projects - with Glass Container */}
      <section className="home-projects-section" id="projects" ref={projectsRef}>
        <div className="glass-container">
          <div className="home-projects-header reveal-on-scroll">
            <h2 className="home-projects-title">Featured Projects</h2>
            <p className="home-projects-subtitle">Showcasing my individual works</p>
          </div>

          <div className="home-projects-layout">
            <div className="home-cta-stack reveal-on-scroll">
              <a className="home-cta-card tone-1 scroll-card" href="#about" style={{ '--slide-delay': '0.02s' }}>
                <h3>Building Digital Experiences That Matter.</h3>
                <span className="home-cta-arrow" style={{ backgroundImage: 'url(/arrow-forward-outline.png)' }} aria-hidden="true"></span>
              </a>
              <a className="home-cta-card tone-2 scroll-card" href="#projects-section" style={{ '--slide-delay': '0.1s' }}>
                <h3>Selected Works &amp; Technical Case Studies.</h3>
                <span className="home-cta-arrow" style={{ backgroundImage: 'url(/arrow-forward-outline.png)' }} aria-hidden="true"></span>
              </a>
              <a className="home-cta-card tone-3 scroll-card" href="#contact" style={{ '--slide-delay': '0.18s' }}>
                <h3>Let&apos;s Collaborate on Your Next Big Idea.</h3>
                <span className="home-cta-arrow" style={{ backgroundImage: 'url(/arrow-forward-outline.png)' }} aria-hidden="true"></span>
              </a>
            </div>

            <div className="home-projects-track">
              <article
                className="home-project-card scroll-card"
                data-project="1"
                style={{ '--slide-delay': '0.08s' }}
                onClick={() => openModal('1')}
                onKeyDown={(event) => handleFeaturedProjectKeyDown(event, '1')}
                role="button"
                tabIndex={0}
                aria-haspopup="dialog"
                aria-label="Open Wander Blog Mockup project details"
              >
                <div
                  className="home-project-visual"
                  style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/project-images/project-1-wander.png)` }}
                  role="img"
                  aria-label="Preview of the Wander Blog Mockup travel interface"
                >
                  <span className="home-project-badge">Travel UX</span>
                  <div className="home-project-overlay">
                    <div className="home-project-text">
                      <h3>Wander Blog Mockup</h3>
                      <p>Map-first travel journal with community threads and Top 10 destination highlights.</p>
                    </div>
                    <span className="home-project-icon">
                      <img src="/arrow-forward-outline.png" alt="" aria-hidden="true" />
                    </span>
                  </div>
                </div>
              </article>

              <article
                className="home-project-card scroll-card"
                data-project="2"
                style={{ '--slide-delay': '0.16s' }}
                onClick={() => openModal('2')}
                onKeyDown={(event) => handleFeaturedProjectKeyDown(event, '2')}
                role="button"
                tabIndex={0}
                aria-haspopup="dialog"
                aria-label="Open J-Zone E-Commerce CMS project details"
              >
                <div
                  className="home-project-visual"
                  style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/project-images/project-2-jzone-motorcycle-red.png)` }}
                  role="img"
                  aria-label="Preview of the J-Zone CMS website interface"
                >
                  <span className="home-project-badge">E-Commerce CMS</span>
                  <div className="home-project-overlay">
                    <div className="home-project-text">
                      <h3>J-Zone CMS Website</h3>
                      <p>Component-driven storefront with real-time inventory and model-specific filtering.</p>
                    </div>
                    <span className="home-project-icon">
                      <img src="/arrow-forward-outline.png" alt="" aria-hidden="true" />
                    </span>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>

      {/* Project Modal */}
      <ProjectModal projectId={activeProject} onClose={closeModal} />
    </>
  );
}

export default Home;
