import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ProjectModal, useProjectModal } from '../components/ProjectModal';

function Home() {
  const { activeProject, openModal, closeModal } = useProjectModal();
  const heroRef = useRef(null);
  const projectsRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    document.title = 'Home | Professional Portfolio';

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

  // Horizontal scroll-driven card animation
  useEffect(() => {
    const section = projectsRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const handleScroll = () => {
      const rect = section.getBoundingClientRect();
      const windowH = window.innerHeight;

      // Cards only start appearing when section is 10-15% from viewport bottom
      const triggerPoint = windowH * 0.85; // Trigger at 85% from top = 15% from bottom
      const progress = Math.max(0, Math.min(1, (triggerPoint - rect.top) / (windowH * 0.3)));

      const cards = track.querySelectorAll('.home-project-card');

      cards.forEach((card, i) => {
        // Only animate if we've started scrolling past trigger
        if (progress > 0) {
          // Stagger: each card starts slightly later (slower animation)
          const cardStart = i * 0.12;
          const cardProgress = Math.max(0, Math.min(1, (progress - cardStart) / 0.7));

          if (cardProgress >= 1) {
            // Once animation is complete, make it static
            card.classList.add('visible');
            card.style.transform = '';
            card.style.opacity = '';
          } else if (cardProgress > 0) {
            // While animating - slide from right to left
            card.classList.remove('visible');
            const translateX = (1 - cardProgress) * 200;
            const opacity = cardProgress;
            card.style.transform = `translateX(${translateX}px)`;
            card.style.opacity = opacity;
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

        {/* Gradient glow at bottom */}
        <div className="hero-glow"></div>

        <div className="hero-scalar-content">
          <span className="hero-label reveal-on-scroll">UI/UX DESIGNER</span>
          <h1 className="hero-scalar-title reveal-on-scroll">
            <span className="hero-line-1">Carla Dulay Joves.</span>

          </h1>
          <p className="hero-scalar-subtitle reveal-on-scroll">
            Building the Web with Human <em>Touch.</em> An output focused developer who crafts meaningful user
            experiences — bridging design thinking with what user needs.
          </p>
          <div className="hero-scalar-actions reveal-on-scroll">
            <Link to="/projects" className="btn-scalar-primary">
              <span>View My Works</span> <span className="btn-arrow">→</span>
            </Link>
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
            <span className="section-label">SELECTED WORK</span>
            <h2 className="home-projects-title">Featured Projects</h2>
            <p className="home-projects-subtitle">Showcasing my individual works</p>
          </div>

          <div className="home-projects-track" ref={trackRef}>
            <article className="home-project-card" data-project="1" onClick={() => openModal('1')}>
              <div className="home-project-image" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/project-images/project-1-wander.png)` }}>
              </div>
              <div className="home-project-info">
                <div className="home-project-meta">
                </div>
                <h3>Wander Blog Mockup</h3>
                <p>Wander Luzon is an interactive travel hub that pairs curated Top 10 destination snippets with integrated mapping prototypes for seamless navigation. Its dedicated community forum anchors user discussions directly to blog content, creating a functional ecosystem for exploring Luzon’s premier landmarks.</p>
              </div>
            </article>

            <article className="home-project-card" data-project="2" onClick={() => openModal('2')}>
              <div className="home-project-image" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/project-images/project-2-jzone-motorcycle-red.png)` }}>
              </div>
              <div className="home-project-info">
                <div className="home-project-meta">
                </div>
                <h3>J-Zone E-Commerce CMS Website</h3>
                <p>J-Zone Motorcycle Parts is a streamlined e-commerce CMS platform designed for the efficient distribution of high-quality motorcycle components and accessories. The site leverages robust content management tools to provide riders with real-time inventory updates and a user-friendly shopping experience tailored to specific bike models.</p>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Project Modal */}
      <ProjectModal projectId={activeProject} onClose={closeModal} />
    </>
  );
}

export default Home;
