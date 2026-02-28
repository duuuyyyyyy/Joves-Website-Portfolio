import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ProjectModal, useProjectModal } from '../components/ProjectModal';

function Projects() {
  const { activeProject, openModal, closeModal } = useProjectModal();
  const resetTimerRef = useRef(null);

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

  const [virtualIndex, setVirtualIndex] = useState(projects.length); // center copy for seamless loop
  const [heroIndex, setHeroIndex] = useState(0);
  const [noAnim, setNoAnim] = useState(false);

  useEffect(() => {
    document.title = 'Projects | Portfolio';
  }, []);

  const loopedProjects = useMemo(() => [...projects, ...projects, ...projects], [projects]);

  const moveTrack = (delta) => {
    setVirtualIndex((prev) => prev + delta);
    setHeroIndex((prev) => ((prev + delta) % projects.length + projects.length) % projects.length);
  };

  const selectedProject = projects[heroIndex];

  useEffect(() => {
    const total = projects.length;
    const min = total;
    const max = total * 2 - 1;

    if (resetTimerRef.current) {
      clearTimeout(resetTimerRef.current);
      resetTimerRef.current = null;
    }

    if (virtualIndex < min || virtualIndex > max) {
      const normalized = ((virtualIndex % total) + total) % total;
      const target = total + normalized;
      resetTimerRef.current = setTimeout(() => {
        setNoAnim(true);
        setVirtualIndex(target);
        requestAnimationFrame(() => setNoAnim(false));
      }, 360); // match CSS transition ~0.35s
    }

    return () => {
      if (resetTimerRef.current) {
        clearTimeout(resetTimerRef.current);
        resetTimerRef.current = null;
      }
    };
  }, [virtualIndex, projects.length]);

  return (
    <>
      <section
        className="projects-hero"
        style={{ backgroundImage: `linear-gradient(135deg, rgba(20,32,46,0.55), rgba(20,32,46,0.28)), url(${selectedProject.image})` }}
      >
        <div className="hero-meta">
          <p className="eyebrow">Project highlight</p>
          <button className="btn btn-primary hero-cta-top" onClick={() => openModal(selectedProject.id)}>
            View project
          </button>
        </div>
        <div className="projects-hero-card">
          <h1>{selectedProject.title}</h1>
          <p className="hero-description">{selectedProject.description}</p>
        </div>
      </section>

      <main className="projects-main">
        <section className="projects-carousel-shell">
          <div className="carousel-heading">
            <p className="eyebrow">Insights, stories, and launch moments</p>
            <h2>Recent builds aligned with the portfolio focus</h2>
          </div>

          <div className="carousel-frame">
            <button
              className="carousel-arrow left"
              aria-label="Previous project"
              onClick={() => moveTrack(-1)}
            >
              <span>&larr;</span>
            </button>

            <div className="projects-carousel-window">
              <div
                className={`projects-carousel-track ${noAnim ? 'no-anim' : ''}`}
                style={{ '--slide-index': virtualIndex - projects.length }}
              >
                {loopedProjects.map((project, idx) => (
                  <button
                    key={`${project.id}-${idx}`}
                    className={`projects-carousel-item ${idx % projects.length === heroIndex ? 'is-active' : ''}`}
                    onMouseEnter={() => setHeroIndex(idx % projects.length)}
                    onFocus={() => setHeroIndex(idx % projects.length)}
                    onClick={() => openModal(projects[idx % projects.length].id)}
                  >
                    <div className="carousel-thumb" style={{ backgroundImage: `url(${project.image})` }}></div>
                    <span className="carousel-title">{project.title}</span>
                  </button>
                ))}
              </div>
            </div>

            <button
              className="carousel-arrow right"
              aria-label="Next project"
              onClick={() => moveTrack(1)}
            >
              <span>&rarr;</span>
            </button>
          </div>
        </section>
      </main>

      <ProjectModal projectId={activeProject} onClose={closeModal} />
    </>
  );
}

export default Projects;
