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

  // Hero parallax-like subtle movement on mouse
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    let rafId = null;
    let delayedX = 0;
    let delayedY = 0;
    let currentX = 0;
    let currentY = 0;

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const xPercent = (clientX / innerWidth - 0.5) * 2;
      const yPercent = (clientY / innerHeight - 0.5) * 2;

      const orb1 = hero.querySelector('.hero-orb-1');
      const orb2 = hero.querySelector('.hero-orb-2');
      const orb3 = hero.querySelector('.hero-orb-3');

      if (orb1) orb1.style.transform = `translate(${xPercent * 20}px, ${yPercent * 15}px)`;
      if (orb2) orb2.style.transform = `translate(${xPercent * -15}px, ${yPercent * -10}px)`;
      if (orb3) orb3.style.transform = `translate(${xPercent * 10}px, ${yPercent * -20}px)`;
      
      // Store mouse position for delayed cursor glow — offset so glow appears below cursor
      const rect = hero.getBoundingClientRect();
      const radius = 125; // Half of glow size (80px) for centering
      currentX = clientX - rect.left - radius;   // horizontally centered on cursor
      currentY = clientY - rect.top - radius;     // cursor sits near top of glow → glow extends below
    };

    // Animation loop for delayed cursor glow (1 second lag)
    const animateGlow = () => {
      const cursorGlow = hero.querySelector('.hero-cursor-glow');
      if (cursorGlow) {
        // Smooth interpolation with lag (ease towards target)
        delayedX += (currentX - delayedX) * 0.03; // 0.03 factor creates ~1000ms lag
        delayedY += (currentY - delayedY) * 0.03;
        cursorGlow.style.transform = `translate(${delayedX}px, ${delayedY}px)`;
      }
      rafId = requestAnimationFrame(animateGlow);
    };

    hero.addEventListener('mousemove', handleMouseMove);
    rafId = requestAnimationFrame(animateGlow);
    
    return () => {
      hero.removeEventListener('mousemove', handleMouseMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

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
        {/* Mouse-following cursor glow */}
        <div className="hero-cursor-glow"></div>

        {/* Decorative floating orbs */}
        <div className="hero-orb hero-orb-1"></div>
        <div className="hero-orb hero-orb-2"></div>
        <div className="hero-orb hero-orb-3"></div>

        {/* Gradient glow at bottom */}
        <div className="hero-glow"></div>

        <div className="hero-scalar-content">
          <span className="hero-label reveal-on-scroll">UI/UX DEVELOPER & CREATIVE TECHNOLOGIST</span>
          <h1 className="hero-scalar-title reveal-on-scroll">
            <span className="hero-line-1">Carla Dulay Joves.</span>
            <span className="hero-line-2">Building the Web</span>
            <span className="hero-line-3">with Human <em>Touch.</em></span>
          </h1>
          <p className="hero-scalar-subtitle reveal-on-scroll">
            A product-minded developer who crafts meaningful digital
            experiences — bridging design thinking with clean, scalable code.
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
          <p className="home-projects-subtitle">Showcasing my individual work</p>
        </div>

        <div className="home-projects-track" ref={trackRef}>
          <article className="home-project-card" data-project="1" onClick={() => openModal('1')}>
            <div className="home-project-image" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/project-1-wander.png)` }}>
            </div>
            <div className="home-project-info">
              <div className="home-project-meta">
                <span className="home-project-number">01</span>
                <span className="tag">Figma</span>
              </div>
              <h3>Wander Blog Mockup</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            </div>
          </article>

          <article className="home-project-card" data-project="2" onClick={() => openModal('2')}>
            <div className="home-project-image" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/project-2-jzone-motorcycle-red.png)` }}>
            </div>
            <div className="home-project-info">
              <div className="home-project-meta">
                <span className="home-project-number">02</span>
                <span className="tag">Wordpress</span>
              </div>
              <h3>J-Zone Motorcycle Parts E-Commerce CMS Website</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
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
