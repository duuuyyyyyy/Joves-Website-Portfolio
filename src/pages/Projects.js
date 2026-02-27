import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ProjectModal, useProjectModal } from '../components/ProjectModal';

const DUPLICATE_COPIES = 9;
const MID_COPY_INDEX = Math.floor(DUPLICATE_COPIES / 2);

function Projects() {
  const { activeProject, openModal, closeModal } = useProjectModal();
  const viewportRef = useRef(null);
  const galleryRef = useRef(null);
  const momentumRafRef = useRef(null);
  const snapTimerRef = useRef(null);
  const metricsRef = useRef(null);
  const momentumRef = useRef({ velocity: 0 });
  const lastScrollTsRef = useRef(0);
  const dragRef = useRef({ down: false, x: 0, scroll: 0, lastX: 0, lastT: 0, velocity: 0 });
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

  const getMetrics = useCallback(() => {
    const viewport = viewportRef.current;
    if (!viewport) return null;
    const gap = parseFloat(getComputedStyle(viewport).gap || '0') || 0;
    const visibleCards = 4;
    const cardWidth = (viewport.clientWidth - gap * (visibleCards - 1)) / visibleCards;
    const sidePad = viewport.clientWidth / 2 - (cardWidth + gap / 2);
    viewport.style.setProperty('--card-width', `${cardWidth}px`);
    viewport.style.setProperty('--carousel-pad', `${Math.max(0, sidePad)}px`);
    viewport.style.setProperty('--carousel-gap', `${gap}px`);

    const firstCard = viewport.querySelector('.arc-card');
    if (!firstCard) return null;
    const measuredWidth = firstCard.offsetWidth || cardWidth;
    const step = measuredWidth + gap;
    const stride = step * projects.length;
    const metrics = { viewport, cardWidth: measuredWidth, gap, step, stride, sidePad: Math.max(0, sidePad) };
    metricsRef.current = metrics;
    return metrics;
  }, [projects.length]);

  const recenterInfinite = useCallback(() => {
    const m = metricsRef.current || getMetrics();
    if (!m) return;
    const { viewport, stride, sidePad } = m;
    const safeMin = sidePad + stride * (MID_COPY_INDEX - 1.25);
    const safeMax = sidePad + stride * (MID_COPY_INDEX + 1.25);
    if (viewport.scrollLeft > safeMin && viewport.scrollLeft < safeMax) return;
    const logical = ((viewport.scrollLeft - sidePad) % stride + stride) % stride;
    viewport.scrollLeft = sidePad + MID_COPY_INDEX * stride + logical;
  }, [getMetrics]);

  const updateArc = useCallback(() => {
    const m = metricsRef.current || getMetrics();
    if (!m) return;
    const { viewport, step } = m;
    const cards = viewport.querySelectorAll('.arc-card');
    const axisCenter = viewport.scrollLeft + viewport.clientWidth / 2;

    // True circular arc in x-z space; perspective projection gives wider outer cards.
    const radius = Math.max(viewport.clientWidth * 0.92, step * 3.6);
    const perspectiveDepth = Math.max(viewport.clientWidth * 1.25, 980);

    const distMap = [];
    cards.forEach((card, idx) => {
      const cardCenter = card.offsetLeft + card.offsetWidth / 2;
      const dx = cardCenter - axisCenter;
      const clampedX = Math.max(-radius * 0.94, Math.min(radius * 0.94, dx));
      const theta = Math.asin(clampedX / radius);
      const depthZ = radius * (1 - Math.cos(theta));
      const perspectiveScale = perspectiveDepth / Math.max(1, perspectiveDepth - depthZ);
      const projectedX = clampedX * perspectiveScale;
      const xOffset = projectedX - dx;
      const rotY = -theta * (180 / Math.PI) * 0.86;
      const yLift = -depthZ * 0.055;

      card.style.setProperty('--arc-x', `${xOffset}px`);
      card.style.setProperty('--arc-y', `${yLift}px`);
      card.style.setProperty('--arc-z', `${depthZ}px`);
      card.style.setProperty('--arc-rot', `${rotY}deg`);
      distMap.push({ idx, abs: Math.abs(dx) });
      card.classList.remove('is-focus');
    });

    distMap.sort((a, b) => a.abs - b.abs);
    if (cards[distMap[0]?.idx]) cards[distMap[0].idx].classList.add('is-focus');
    if (cards[distMap[1]?.idx]) cards[distMap[1].idx].classList.add('is-focus');
  }, [getMetrics]);

  const snapToSplitCenter = useCallback(() => {
    const m = metricsRef.current || getMetrics();
    if (!m) return;
    const { viewport, cardWidth, gap, step, sidePad } = m;
    const axis = viewport.scrollLeft + viewport.clientWidth / 2;

    // Split-center snaps between two middle cards (mid-gap line)
    const relativeAxis = axis - sidePad;
    const k = Math.round((relativeAxis - (cardWidth + gap / 2)) / step);
    const splitLine = sidePad + k * step + cardWidth + gap / 2;
    const target = splitLine - viewport.clientWidth / 2;
    viewport.scrollTo({ left: target, behavior: 'smooth' });
  }, [getMetrics]);

  const scheduleSnap = useCallback(() => {
    if (snapTimerRef.current) clearTimeout(snapTimerRef.current);
    snapTimerRef.current = setTimeout(snapToSplitCenter, 110);
  }, [snapToSplitCenter]);

  useEffect(() => {
    const m = getMetrics();
    if (!m) return;
    const { viewport, stride, sidePad } = m;

    viewport.scrollLeft = sidePad + MID_COPY_INDEX * stride;
    recenterInfinite();
    updateArc();
    snapToSplitCenter();

    const onScroll = () => {
      lastScrollTsRef.current = performance.now();
      recenterInfinite();
      updateArc();
      scheduleSnap();
    };

    const onWheel = (e) => {
      e.preventDefault();
      const metric = metricsRef.current || getMetrics();
      if (!metric) return;
      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      const jumpCards = Math.min(4, Math.max(1, Math.round(Math.abs(delta) / 85)));
      const impulse = Math.sign(delta) * (metric.step * (0.26 + jumpCards * 0.2));
      momentumRef.current.velocity = Math.max(-metric.step * 1.75, Math.min(metric.step * 1.75, momentumRef.current.velocity + impulse));
      if (!momentumRafRef.current) {
        const tick = () => {
          const curr = metricsRef.current || getMetrics();
          const view = curr?.viewport;
          if (!curr || !view) {
            momentumRafRef.current = null;
            return;
          }
          view.scrollLeft += momentumRef.current.velocity;
          momentumRef.current.velocity *= 0.9;
          recenterInfinite();
          updateArc();
          if (Math.abs(momentumRef.current.velocity) < 0.15) {
            momentumRafRef.current = null;
            momentumRef.current.velocity = 0;
            snapToSplitCenter();
            return;
          }
          momentumRafRef.current = requestAnimationFrame(tick);
        };
        momentumRafRef.current = requestAnimationFrame(tick);
      }
    };

    viewport.addEventListener('scroll', onScroll, { passive: true });
    viewport.addEventListener('wheel', onWheel, { passive: false });

    const onResize = () => {
      recenterInfinite();
      updateArc();
      snapToSplitCenter();
    };
    window.addEventListener('resize', onResize);

    return () => {
      viewport.removeEventListener('scroll', onScroll);
      viewport.removeEventListener('wheel', onWheel);
      window.removeEventListener('resize', onResize);
      if (snapTimerRef.current) clearTimeout(snapTimerRef.current);
      if (momentumRafRef.current) cancelAnimationFrame(momentumRafRef.current);
    };
  }, [getMetrics, recenterInfinite, snapToSplitCenter, scheduleSnap, updateArc]);

  const stopInertia = () => {
    if (momentumRafRef.current) {
      cancelAnimationFrame(momentumRafRef.current);
      momentumRafRef.current = null;
    }
    momentumRef.current.velocity = 0;
  };

  const beginInertia = () => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    let v = momentumRef.current.velocity;
    stopInertia();
    const tick = () => {
      v *= 0.93;
      if (Math.abs(v) < 0.08) {
        snapToSplitCenter();
        momentumRafRef.current = null;
        return;
      }
      viewport.scrollLeft -= v;
      recenterInfinite();
      updateArc();
      momentumRafRef.current = requestAnimationFrame(tick);
    };
    momentumRafRef.current = requestAnimationFrame(tick);
  };

  const onPointerDown = (e) => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    stopInertia();
    dragRef.current = {
      down: true,
      x: e.clientX,
      scroll: viewport.scrollLeft,
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
    const dx = e.clientX - dragRef.current.x;
    viewport.scrollLeft = dragRef.current.scroll - dx;

    const dt = Math.max(1, now - dragRef.current.lastT);
    dragRef.current.velocity = (e.clientX - dragRef.current.lastX) / dt * 16;
    dragRef.current.lastX = e.clientX;
    dragRef.current.lastT = now;

    recenterInfinite();
    updateArc();
  };

  const onPointerUp = (e) => {
    const viewport = viewportRef.current;
    if (!dragRef.current.down) return;
    dragRef.current.down = false;
    if (viewport) {
      if (viewport.hasPointerCapture(e.pointerId)) viewport.releasePointerCapture(e.pointerId);
      viewport.classList.remove('dragging');
    }
    momentumRef.current.velocity = dragRef.current.velocity;
    beginInertia();
  };

  const scrollToGallery = () => {
    if (!galleryRef.current) return;
    galleryRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
            You should feel safe when sitting in, or leaning on the piece, and you should not be able to recognize any sway, give or flex in it.
          </p>
        </section>

        <section className="projects-carousel-wrapper">
          <div
            className="projects-carousel arc-carousel"
            ref={viewportRef}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
            onPointerLeave={onPointerUp}
          >
            {virtualCarousel.map((item, idx) => (
              <article
                key={`${item.id}-${item.virtualIndex}-${idx}`}
                className="carousel-item arc-card"
                onClick={() => openModal(item.id)}
              >
                <div className="carousel-image" style={{ backgroundImage: `url(${item.image})` }}>
                  <div className="carousel-overlay"></div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <button type="button" className="projects-gallery-anchor" onClick={scrollToGallery}>
          View Collection
        </button>

        <section className={`projects-bento ${galleryVisible ? 'revealed' : ''}`} ref={galleryRef}>
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
