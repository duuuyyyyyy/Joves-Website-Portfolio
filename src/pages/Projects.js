import React, { useEffect, useRef, useState } from 'react';
import { projects, shouldTrimScreenshotChrome } from '../data/projects';

function Projects() {
  const previewRailRef = useRef(null);
  const previewCardRefs = useRef([]);
  const animationFrameRef = useRef(null);
  const scrollbarDragRef = useRef({
    pointerId: null,
    startY: 0,
    startScrollTop: 0
  });
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const [previewScrollbar, setPreviewScrollbar] = useState({
    thumbHeight: 0,
    thumbTop: 0
  });
  const [selectedScreenshots, setSelectedScreenshots] = useState(() =>
    Object.fromEntries(projects.map((project) => [project.id, 0]))
  );

  useEffect(() => {
    const rail = previewRailRef.current;
    if (!rail) return undefined;

    const syncPreviewRail = () => {
      const threshold = rail.scrollTop + rail.clientHeight * 0.38;
      let nextActiveIndex = 0;

      previewCardRefs.current.forEach((card, index) => {
        if (card && card.offsetTop <= threshold) {
          nextActiveIndex = index;
        }
      });

      setActiveProjectIndex((current) => (current === nextActiveIndex ? current : nextActiveIndex));

      const maxScroll = Math.max(rail.scrollHeight - rail.clientHeight, 0);
      const trackHeight = rail.clientHeight;
      const thumbHeight = maxScroll > 0
        ? Math.max((trackHeight / rail.scrollHeight) * trackHeight, 88)
        : trackHeight;
      const maxThumbTop = Math.max(trackHeight - thumbHeight, 0);
      const thumbTop = maxScroll > 0 ? (rail.scrollTop / maxScroll) * maxThumbTop : 0;

      setPreviewScrollbar((current) => {
        if (
          Math.abs(current.thumbHeight - thumbHeight) < 0.5 &&
          Math.abs(current.thumbTop - thumbTop) < 0.5
        ) {
          return current;
        }

        return {
          thumbHeight,
          thumbTop
        };
      });
    };

    const requestSync = () => {
      if (animationFrameRef.current) return;
      animationFrameRef.current = window.requestAnimationFrame(() => {
        syncPreviewRail();
        animationFrameRef.current = null;
      });
    };

    syncPreviewRail();
    rail.addEventListener('scroll', requestSync, { passive: true });
    window.addEventListener('resize', requestSync);

    return () => {
      rail.removeEventListener('scroll', requestSync);
      window.removeEventListener('resize', requestSync);
      if (animationFrameRef.current) {
        window.cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const handlePointerMove = (event) => {
      const rail = previewRailRef.current;
      const dragState = scrollbarDragRef.current;
      if (!rail || dragState.pointerId !== event.pointerId) return;

      const deltaY = event.clientY - dragState.startY;
      const maxScroll = Math.max(rail.scrollHeight - rail.clientHeight, 0);
      const maxThumbTop = Math.max(rail.clientHeight - previewScrollbar.thumbHeight, 0);
      if (maxScroll <= 0 || maxThumbTop <= 0) return;

      const scrollRatio = maxScroll / maxThumbTop;
      rail.scrollTop = dragState.startScrollTop + deltaY * scrollRatio;
    };

    const endDrag = (event) => {
      if (scrollbarDragRef.current.pointerId !== event.pointerId) return;
      scrollbarDragRef.current = {
        pointerId: null,
        startY: 0,
        startScrollTop: 0
      };
      document.body.classList.remove('projects-scrollbar-dragging');
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', endDrag);
    window.addEventListener('pointercancel', endDrag);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', endDrag);
      window.removeEventListener('pointercancel', endDrag);
      document.body.classList.remove('projects-scrollbar-dragging');
    };
  }, [previewScrollbar.thumbHeight]);

  const handleScrollbarThumbPointerDown = (event) => {
    const rail = previewRailRef.current;
    if (!rail) return;

    scrollbarDragRef.current = {
      pointerId: event.pointerId,
      startY: event.clientY,
      startScrollTop: rail.scrollTop
    };
    document.body.classList.add('projects-scrollbar-dragging');
    event.preventDefault();
  };

  const handleScrollbarTrackPointerDown = (event) => {
    const rail = previewRailRef.current;
    if (!rail || event.target !== event.currentTarget) return;

    const trackRect = event.currentTarget.getBoundingClientRect();
    const clickOffset = event.clientY - trackRect.top - previewScrollbar.thumbHeight / 2;
    const maxThumbTop = Math.max(trackRect.height - previewScrollbar.thumbHeight, 0);
    const nextThumbTop = Math.min(Math.max(clickOffset, 0), maxThumbTop);
    const maxScroll = Math.max(rail.scrollHeight - rail.clientHeight, 0);

    rail.scrollTop = maxThumbTop > 0 ? (nextThumbTop / maxThumbTop) * maxScroll : 0;
  };

  const renderLinkButton = (label, href, secondary = false) => {
    if (!href) {
      return (
        <span className={`projects-case-btn${secondary ? ' secondary' : ''} is-disabled`} aria-disabled="true">
          {label}
        </span>
      );
    }

    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`projects-case-btn${secondary ? ' secondary' : ''}`}
      >
        {label}
      </a>
    );
  };

  const activeProject = projects[activeProjectIndex] ?? projects[0];
  const selectedScreenshotIndex = selectedScreenshots[activeProject.id] ?? 0;

  return (
    <section id="projects-section" className="page-section projects-page">
      <div className="editorial-section-header editorial-section-header-left projects-section-header">
        <h1 className="editorial-section-title">Projects</h1>
      </div>

      <div className="projects-story-shell" aria-label="Project case studies">
        <div className="projects-story-grid projects-story-grid-scroller">
          <article key={activeProject.id} className="projects-case-copy projects-case-copy-active">
            <h2 className="projects-case-title">{activeProject.title}</h2>

            <div className="projects-case-block">
              <p className="projects-case-label">Project Description and Purpose</p>
              <p>{activeProject.description}</p>
              <p>{activeProject.purpose}</p>
            </div>

            <div className="projects-case-block">
              <p className="projects-case-label">Technologies Used</p>
              <div className="projects-case-tech">
                {activeProject.technologies.map((technology) => (
                  <span key={technology} className="projects-case-tech-item">
                    {technology}
                  </span>
                ))}
              </div>
            </div>

            <div className="projects-case-block">
              <p className="projects-case-label">Project Screenshots</p>
              <div className="projects-case-shots projects-case-shots-compact">
                {activeProject.screenshots.map((shot, shotIndex) => (
                  <button
                    key={shot.alt}
                    type="button"
                    className={`projects-case-shot projects-case-shot-button${
                      shotIndex === selectedScreenshotIndex ? ' is-active' : ''
                    }`}
                    onClick={() =>
                      setSelectedScreenshots((current) => ({
                        ...current,
                        [activeProject.id]: shotIndex
                      }))
                    }
                    aria-pressed={shotIndex === selectedScreenshotIndex}
                    aria-label={`Show ${shot.alt}`}
                  >
                    <img
                      src={shot.image}
                      alt={shot.alt}
                      className={shouldTrimScreenshotChrome(shot.image) ? 'projects-image-trim-right' : ''}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="projects-case-actions">
              {renderLinkButton('Live Site', activeProject.liveLink)}
              {renderLinkButton('Source Code', activeProject.sourceLink, true)}
            </div>
          </article>

          <aside className="projects-preview-column" aria-label="Project preview images">
            <div ref={previewRailRef} className="projects-preview-rail">
              {projects.map((project, index) => {
                const projectScreenshotIndex = selectedScreenshots[project.id] ?? 0;
                const activeProjectShot = project.screenshots[projectScreenshotIndex] ?? project.screenshots[0];
                const leadImage = activeProjectShot ?? {
                  image: project.previewImage,
                  alt: project.previewAlt
                };

                return (
                  <article
                    key={project.id}
                    ref={(node) => {
                      previewCardRefs.current[index] = node;
                    }}
                    className={`projects-preview-card${index === activeProjectIndex ? ' is-active' : ''}`}
                    style={{
                      zIndex: index + 1
                    }}
                  >
                    <div className="projects-preview-stage">
                      <div className="projects-preview-layer is-current">
                        <img
                          src={leadImage.image}
                          alt={leadImage.alt || project.previewAlt}
                          className={shouldTrimScreenshotChrome(leadImage.image) ? 'projects-image-trim-right' : ''}
                        />
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
            <div
              className="projects-preview-scrollbar"
              onPointerDown={handleScrollbarTrackPointerDown}
              aria-hidden="true"
            >
              <div
                className="projects-preview-scrollbar-thumb"
                style={{
                  height: `${previewScrollbar.thumbHeight}px`,
                  transform: `translateY(${previewScrollbar.thumbTop}px)`
                }}
                onPointerDown={handleScrollbarThumbPointerDown}
              />
            </div>
          </aside>
        </div>
      </div>

      <div className="projects-mobile-stack" aria-label="Projects list">
        {projects.map((project) => (
          <article
            key={project.id}
            className="projects-mobile-case scroll-card"
            style={{ '--slide-delay': `${Math.min(Number(project.id) - 1, 3) * 0.08}s` }}
          >
            <div className="projects-mobile-preview">
              <img
                src={project.previewImage}
                alt={project.previewAlt}
                className={shouldTrimScreenshotChrome(project.previewImage) ? 'projects-image-trim-right' : ''}
              />
            </div>
            <div className="projects-mobile-copy">
              <h2 className="projects-case-title">{project.title}</h2>

              <div className="projects-case-block">
                <p className="projects-case-label">Project Description and Purpose</p>
                <p>{project.description}</p>
                <p>{project.purpose}</p>
              </div>

              <div className="projects-case-block">
                <p className="projects-case-label">Technologies Used</p>
                <div className="projects-case-tech">
                  {project.technologies.map((technology) => (
                    <span key={technology} className="projects-case-tech-item">
                      {technology}
                    </span>
                  ))}
                </div>
              </div>

              <div className="projects-case-block">
                <p className="projects-case-label">Project Screenshots</p>
                <div className="projects-case-shots">
                  {project.screenshots.map((shot) => (
                    <div key={shot.alt} className="projects-case-shot">
                      <img
                        src={shot.image}
                        alt={shot.alt}
                        className={shouldTrimScreenshotChrome(shot.image) ? 'projects-image-trim-right' : ''}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="projects-case-actions">
                {renderLinkButton('Live Site', project.liveLink)}
                {renderLinkButton('Source Code', project.sourceLink, true)}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Projects;
