import React, { useEffect, useRef, useState } from 'react';
import { projectsById, shouldTrimScreenshotChrome } from '../data/projects';

function renderLinkButton(label, href, secondary = false) {
  if (!href) {
    return (
      <span
        className={`project-link-btn${secondary ? ' secondary' : ''} is-disabled`}
        aria-disabled="true"
      >
        {label}
      </span>
    );
  }

  return (
    <a
      href={href}
      className={`project-link-btn${secondary ? ' secondary' : ''}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      {label}
    </a>
  );
}

function ProjectModal({ projectId, onClose }) {
  const closeButtonRef = useRef(null);
  const [activeScreenshotIndex, setActiveScreenshotIndex] = useState(0);

  useEffect(() => {
    setActiveScreenshotIndex(0);
  }, [projectId]);

  useEffect(() => {
    if (!projectId) return;
    closeButtonRef.current?.focus();
  }, [projectId]);

  if (!projectId) return null;

  const project = projectsById[projectId];
  if (!project) return null;

  const activeScreenshot = project.screenshots[activeScreenshotIndex] ?? project.screenshots[0];

  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="project-modal active" id="project-modal" onClick={handleBackdropClick}>
      <div
        className="project-modal-content"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-project-name"
      >
        <button
          ref={closeButtonRef}
          type="button"
          className="project-modal-close"
          id="modal-close"
          onClick={onClose}
          aria-label={`Close ${project.title} details`}
        >
          &times;
        </button>

        <div className="project-modal-header">
          <h2 className="project-modal-title" id="modal-project-name">
            {project.title}
          </h2>
          <div className="project-modal-summary">
            <p className="project-modal-description" id="modal-project-purpose">
              {project.description}
            </p>
            <p className="project-modal-description">{project.purpose}</p>
            {project.role ? (
              <p className="project-modal-description">
                <strong>Role:</strong> {project.role}
              </p>
            ) : null}
          </div>
        </div>

        <div className="project-modal-section" data-section="gallery">
          <h3 className="project-modal-section-title">Screenshots</h3>
          <div className="project-modal-hero-shot">
            <img
              src={activeScreenshot.image}
              alt={activeScreenshot.alt}
              className={shouldTrimScreenshotChrome(activeScreenshot.image) ? 'projects-image-trim-right' : ''}
            />
          </div>
          <div className="project-gallery" id="modal-gallery">
            {project.screenshots.map((shot, index) => (
              <button
                key={shot.alt}
                type="button"
                className={`project-gallery-item${index === activeScreenshotIndex ? ' is-active' : ''}`}
                onClick={() => setActiveScreenshotIndex(index)}
                aria-pressed={index === activeScreenshotIndex}
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

        <div className="project-modal-section" data-section="features">
          <h3 className="project-modal-section-title">Features</h3>
          <ul className="project-modal-list">
            {project.features.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
        </div>

        <div className="project-modal-section">
          <h3 className="project-modal-section-title">Technologies &amp; Tools</h3>
          <div className="project-tools" id="modal-tools">
            {project.technologies.map((tech) => (
              <span className="project-tool-tag" key={tech}>
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="project-modal-section">
          <h3 className="project-modal-section-title">Links</h3>
          <div className="project-links">
            {renderLinkButton('View Live Demo', project.liveLink)}
            {renderLinkButton('Source Code', project.sourceLink, true)}
          </div>
        </div>
      </div>
    </div>
  );
}

function useProjectModal() {
  const [activeProject, setActiveProject] = useState(null);

  useEffect(() => {
    const body = document.body;
    const documentElement = document.documentElement;

    if (activeProject) {
      body.classList.add('project-modal-open');
      documentElement.classList.add('project-modal-open');
    } else {
      body.classList.remove('project-modal-open');
      documentElement.classList.remove('project-modal-open');
    }

    return () => {
      body.classList.remove('project-modal-open');
      documentElement.classList.remove('project-modal-open');
    };
  }, [activeProject]);

  const openModal = (projectId) => {
    setActiveProject(projectId);
  };

  const closeModal = () => {
    setActiveProject(null);
  };

  return { activeProject, openModal, closeModal, ProjectModal };
}

export { ProjectModal, useProjectModal };
