import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ProjectModal, useProjectModal } from '../components/ProjectModal';

const DUPLICATE_COPIES = 9;
const MID_COPY_INDEX = Math.floor(DUPLICATE_COPIES / 2);

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}

function Projects() {
  const { activeProject, openModal, closeModal } = useProjectModal();
  const viewportRef = useRef(null);
  const trackRef = useRef(null);
  const galleryRef = useRef(null);
  const momentumRafRef = useRef(null);
  const snapRafRef = useRef(null);
  const metricsRef = useRef(null);
  const offsetRef = useRef(0);
  const velocityRef = useRef(0);
  const dragRef = useRef({ down: false, startX: 0, startOffset: 0, lastX: 0, lastT: 0, velocity: 0 });
  const [galleryVisible, setGalleryVisible] = useState(false);

  const projects = useMemo(
    () => [
      {
        id: '1',
        image: `${process.env.PUBLIC_URL}/project-images/project-1-wander.png`,
        title: 'Wander Blog Mockup',
        description: 'Travel-focused editorial experience with map-first storytelling and clear content hierarchy.'
      },
      {
        id: '2',
        image: `${process.env.PUBLIC_URL}/project-images/project-2-jzone-motorcycle-red.png`,
        title: 'J-Zone E-Commerce CMS',
        description: 'Catalog and commerce system designed for precise inventory visibility and fast product discovery.'
      },
      {
        id: '3',
        image: `${process.env.PUBLIC_URL}/project-images/jewelry-ecommerce-landing-page.png`,
        title: 'Jewelry Landing Experience',
        description: 'A conversion-oriented product showcase balancing premium visuals with focused call-to-action flow.'
      },
      {
        id: '4',
        image: `${process.env.PUBLIC_URL}/project-placeholder-4.svg`,
        title: 'Upcoming Case Study',
        description: 'Placeholder module reserved for the next complete product build and documented design decisions.'
      }
    ],
    []
  );

  const bentoPattern = ['span-2x2', 'span-1x1', 'span-1x1', 'span-2x1', 'span-1x2', 'span-2x1'];

  const virtualCarousel = useMemo(() => {
    const rows = [];
    for (let copy = 0; copy < DUPLICATE_COPIES; copy += 1) {
      for (let idx = 0; idx < projects.length; idx += 1) {
        rows.push({
          ...projects[idx],
          virtualIndex: copy * projects.length + idx
        });
      }
    }
    return rows;
  }, [projects]);

  useEffect(() => {
    document.title = 'Projects | Portfolio';
    const onKeyDown = (e) => {
      if (e.key === 'Escape' && activeProject) closeModal();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [activeProject, closeModal]);

  useEffect(() => {
    const section = galleryRef.current;
    if (!section) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) setGalleryVisible(true);
      },
      { threshold: 0.2 }
    );
    obs.observe(section);
    return () => obs.disconnect();
  }, []);

  const readMetrics = useCallback(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) return null;

    const firstCard = track.querySelector('.belt-card');
    if (!firstCard) return null;

    const cardWidth = firstCard.getBoundingClientRect().width || 260;
    const trackStyles = getComputedStyle(track);
    const gap = parseFloat(trackStyles.columnGap || trackStyles.gap || '16') || 16;
    const step = cardWidth + gap;
    const stride = step * projects.length;
    const viewportWidth = viewport.clientWidth;

    const metrics = {
      cardWidth,
      gap,
      step,
      stride,
      viewportWidth
    };

    metricsRef.current = metrics;
    return metrics;
  }, [projects.length]);

  const normalizeOffset = useCallback((value) => {
    const metrics = metricsRef.current;
    if (!metrics || metrics.stride <= 0) return value;
    let next = value;
    while (next > metrics.stride) next -= metrics.stride;
    while (next < -metrics.stride) next += metrics.stride;
    return next;
  }, []);

  const applyBeltLayout = useCallback(() => {
    const metrics = metricsRef.current || readMetrics();
    const track = trackRef.current;
    if (!metrics || !track) return;

    offsetRef.current = normalizeOffset(offsetRef.current);

    const cards = track.querySelectorAll('.belt-card');
    const viewportCenterX = metrics.viewportWidth / 2;
    const radius = metrics.viewportWidth * 0.9;
    const angleStep = metrics.step / radius;
    const centerIndex = MID_COPY_INDEX * projects.length + offsetRef.current / metrics.step;

    cards.forEach((card, orderIndex) => {
      const virtualIndex = Number(card.dataset.virtualIndex ?? orderIndex);
      const relativeIndex = virtualIndex - centerIndex;
      const angle = relativeIndex * angleStep;

      const x = radius * Math.sin(angle);
      const z = radius * (1 - Math.cos(angle));
      const rotateY = angle * (180 / Math.PI);
      const absAngle = Math.abs(angle);

      const opacity = clamp(1 - absAngle * 1.2, 0.45, 1);
      const scale = clamp(1 - absAngle * 0.25, 0.85, 1);
      const focusable = absAngle < 0.4;

      card.style.left = `${viewportCenterX - metrics.cardWidth / 2 + x}px`;
      card.style.transform = `translateZ(${-z}px) rotateY(${rotateY}deg) scale(${scale})`;
      card.style.opacity = `${opacity}`;
      card.dataset.focusable = focusable ? '1' : '0';
      card.style.pointerEvents = 'auto';
      card.classList.toggle('is-focus', focusable);
    });
  }, [normalizeOffset, projects.length, readMetrics]);

  const stopMotion = useCallback(() => {
    if (momentumRafRef.current) {
      cancelAnimationFrame(momentumRafRef.current);
      momentumRafRef.current = null;
    }
    if (snapRafRef.current) {
      cancelAnimationFrame(snapRafRef.current);
      snapRafRef.current = null;
    }
  }, []);

  const snapToStep = useCallback(
    (animated = true) => {
      const metrics = metricsRef.current || readMetrics();
      if (!metrics) return;

      const snappedOffset = normalizeOffset(Math.round(offsetRef.current / metrics.step) * metrics.step);
      if (!animated) {
        offsetRef.current = snappedOffset;
        applyBeltLayout();
        return;
      }

      const start = offsetRef.current;
      const delta = snappedOffset - start;
      if (Math.abs(delta) < 0.5) {
        offsetRef.current = snappedOffset;
        applyBeltLayout();
        return;
      }

      if (snapRafRef.current) cancelAnimationFrame(snapRafRef.current);
      const startedAt = performance.now();
      const duration = 340;

      const tick = (now) => {
        const progress = clamp((now - startedAt) / duration, 0, 1);
        const eased = easeOutCubic(progress);
        offsetRef.current = normalizeOffset(start + delta * eased);
        applyBeltLayout();
        if (progress < 1) {
          snapRafRef.current = requestAnimationFrame(tick);
        } else {
          snapRafRef.current = null;
        }
      };

      snapRafRef.current = requestAnimationFrame(tick);
    },
    [applyBeltLayout, normalizeOffset, readMetrics]
  );

  const startMomentum = useCallback(() => {
    if (momentumRafRef.current) return;

    const tick = () => {
      velocityRef.current *= 0.915;
      if (Math.abs(velocityRef.current) < 0.1) {
        velocityRef.current = 0;
        momentumRafRef.current = null;
        snapToStep(true);
        return;
      }

      offsetRef.current += velocityRef.current;
      applyBeltLayout();
      momentumRafRef.current = requestAnimationFrame(tick);
    };

    momentumRafRef.current = requestAnimationFrame(tick);
  }, [applyBeltLayout, snapToStep]);

  const onWheel = useCallback(
    (e) => {
      e.preventDefault();
      const metrics = metricsRef.current || readMetrics();
      if (!metrics) return;

      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      if (!delta) return;

      if (snapRafRef.current) {
        cancelAnimationFrame(snapRafRef.current);
        snapRafRef.current = null;
      }

      const cardsToMove = clamp(Math.round(Math.abs(delta) / 140), 1, 3);
      const impulse = -Math.sign(delta) * (metrics.step * (0.06 + cardsToMove * 0.07));

      velocityRef.current = clamp(
        velocityRef.current + impulse,
        -metrics.step * 1.85,
        metrics.step * 1.85
      );
      offsetRef.current += impulse * 0.28;
      applyBeltLayout();
      startMomentum();
    },
    [applyBeltLayout, readMetrics, startMomentum]
  );

  const onPointerDown = (e) => {
    if (e.button !== 0) return;
    const viewport = viewportRef.current;
    if (!viewport) return;

    stopMotion();
    velocityRef.current = 0;
    dragRef.current = {
      down: true,
      startX: e.clientX,
      startOffset: offsetRef.current,
      lastX: e.clientX,
      lastT: performance.now(),
      velocity: 0
    };
    viewport.setPointerCapture(e.pointerId);
    viewport.classList.add('dragging');
  };

  const onPointerMove = (e) => {
    const viewport = viewportRef.current;
    if (!viewport || !dragRef.current.down) return;

    const now = performance.now();
    const dx = e.clientX - dragRef.current.startX;
    offsetRef.current = dragRef.current.startOffset + dx;

    const dt = Math.max(1, now - dragRef.current.lastT);
    dragRef.current.velocity = ((e.clientX - dragRef.current.lastX) / dt) * 16;
    dragRef.current.lastX = e.clientX;
    dragRef.current.lastT = now;

    applyBeltLayout();
  };

  const onPointerUp = (e) => {
    const viewport = viewportRef.current;
    if (!dragRef.current.down) return;
    dragRef.current.down = false;

    if (viewport) {
      if (viewport.hasPointerCapture(e.pointerId)) viewport.releasePointerCapture(e.pointerId);
      viewport.classList.remove('dragging');
    }

    velocityRef.current = dragRef.current.velocity;
    if (Math.abs(velocityRef.current) > 0.14) {
      startMomentum();
      return;
    }
    snapToStep(true);
  };

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const metrics = readMetrics();
    if (!metrics) return;

    offsetRef.current = 0;
    offsetRef.current = normalizeOffset(offsetRef.current);
    applyBeltLayout();
    snapToStep(false);

    viewport.addEventListener('wheel', onWheel, { passive: false });

    const onResize = () => {
      readMetrics();
      applyBeltLayout();
      snapToStep(false);
    };

    window.addEventListener('resize', onResize);
    return () => {
      viewport.removeEventListener('wheel', onWheel);
      window.removeEventListener('resize', onResize);
      stopMotion();
    };
  }, [applyBeltLayout, normalizeOffset, onWheel, readMetrics, snapToStep, stopMotion]);

  const handleCardClick = useCallback(
    (e, projectId, virtualIndex) => {
      const isFocusable = e.currentTarget.dataset.focusable === '1';
      if (isFocusable) {
        openModal(projectId);
        return;
      }

      // Optional behavior for non-focus cards: nudge them toward center then snap.
      const metrics = metricsRef.current || readMetrics();
      if (!metrics) return;
      const centerIndex = MID_COPY_INDEX * projects.length + offsetRef.current / metrics.step;
      const relativeIndex = virtualIndex - centerIndex;
      offsetRef.current = normalizeOffset(offsetRef.current + relativeIndex * metrics.step);
      snapToStep(true);
    },
    [normalizeOffset, openModal, projects.length, readMetrics, snapToStep]
  );

  const scrollToGallery = useCallback(() => {
    const gallerySection = document.getElementById('projects-gallery') || galleryRef.current;
    if (!gallerySection) return;
    gallerySection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  const onGalleryTriggerKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      scrollToGallery();
    }
  };

  return (
    <>
      <section className="hero-scalar" style={{ minHeight: '45vh', paddingBottom: '3rem' }}>
        <div className="hero-orb orb-v5 orb-color-1" style={{ top: '-10%', right: '10%' }}></div>
        <div className="hero-orb orb-v2 orb-color-3" style={{ bottom: '5%', left: '5%' }}></div>
        <div className="hero-orb orb-v7 orb-color-5 orb-shape-ellipse orb-anim-wave" style={{ top: '12%', left: '18%' }}></div>
        <div className="hero-orb orb-v6 orb-color-6 orb-shape-blob orb-anim-rise" style={{ bottom: '18%', right: '28%' }}></div>
        <div className="hero-orb orb-v8 orb-color-4 orb-shape-squircle orb-anim-orbit" style={{ top: '35%', right: '4%' }}></div>
        <div className="hero-scalar-content">
          <span className="hero-label">EXPLORE</span>
          <h1 className="hero-scalar-title">Projects &amp; <em>Creations</em></h1>
        </div>
      </section>

      <main className="projects-main">
        <section className="projects-intro projects-intro-split">
          <h2>
            Find your dream
            <em> aesthetic</em>
          </h2>
          <p>
            You should feel safe when sitting in, or leaning on the piece, and you should not be able to recognise any sway,
            give or flex in it.
          </p>
        </section>

        <section className="projects-carousel-wrapper">
          <div className="projects-focus-zone" aria-hidden="true"></div>
          <div
            className="projects-carousel projects-viewport"
            ref={viewportRef}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
            onPointerLeave={onPointerUp}
          >
            <div className="projects-carousel-track projects-track" ref={trackRef}>
              {virtualCarousel.map((item, index) => (
                <article
                  key={`${item.id}-${item.virtualIndex}-${index}`}
                  className="carousel-item belt-card"
                  data-virtual-index={index}
                  onClick={(e) => handleCardClick(e, item.id, index)}
                >
                  <div className="carousel-image" style={{ backgroundImage: `url(${item.image})` }}>
                    <div className="carousel-overlay"></div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <p
          className="projects-gallery-anchor"
          onClick={scrollToGallery}
          onKeyDown={onGalleryTriggerKeyDown}
          role="button"
          tabIndex={0}
        >
          Scroll to view gallery
        </p>

        <section className={`projects-bento ${galleryVisible ? 'revealed' : ''}`} ref={galleryRef} id="projects-gallery">
          <div className="projects-bento-grid">
            {projects.map((project, index) => (
              <article
                key={`bento-${project.id}-${index}`}
                className={`projects-bento-item ${bentoPattern[index % bentoPattern.length]}`}
                onClick={() => openModal(project.id)}
              >
                <div className="projects-bento-image" style={{ backgroundImage: `url(${project.image})` }}></div>
                <div className="projects-bento-content">
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>

      <ProjectModal projectId={activeProject} onClose={closeModal} />
    </>
  );
}

export default Projects;
