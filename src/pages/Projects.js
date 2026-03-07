import React, { useEffect, useState } from 'react';
import { ProjectModal, useProjectModal } from '../components/ProjectModal';

function Projects() {
  const { activeProject, openModal, closeModal } = useProjectModal();
  const projects = [
    {
      id: '1',
      image: `${process.env.PUBLIC_URL}/project-images/project-1-wander.png`,
      title: 'Wander Blog Mockup',
      description: 'Travel-focused editorial experience with map-first storytelling and clear content hierarchy.',
      category: 'Travel UX'
    },
    {
      id: '2',
      image: `${process.env.PUBLIC_URL}/project-images/project-2-jzone-motorcycle-red.png`,
      title: 'J-Zone E-Commerce CMS',
      description: 'Catalog and commerce system designed for precise inventory visibility and fast product discovery.',
      category: 'E-Commerce CMS'
    },
    {
      id: '3',
      image: `${process.env.PUBLIC_URL}/project-images/jewelry-ecommerce-landing-page.png`,
      title: 'Jewelry Landing Experience',
      description: 'A conversion-oriented product showcase balancing premium visuals with focused call-to-action flow.',
      category: 'Landing Experience'
    },
    {
      id: '4',
      image: `${process.env.PUBLIC_URL}/project-placeholder-4.svg`,
      title: 'Upcoming Case Study',
      description: 'Placeholder module reserved for the next complete product build and documented design decisions.',
      category: 'Case Study'
    }
  ];

  const [selectedProject, setSelectedProject] = useState(projects[0]);

  useEffect(() => {
    document.title = 'Projects | Portfolio';
  }, []);

  return (
    <section id="projects-section" className="page-section projects-page">
      <div className="projects-split-layout projects-page-split">
        <div
          className="projects-hero-panel"
          style={{ backgroundImage: `linear-gradient(135deg, rgba(20,32,46,0.55), rgba(20,32,46,0.28)), url(${selectedProject.image})` }}
        >
          <div className="projects-hero-inner">
            <span className="projects-hero-tag">{selectedProject.category}</span>
            <h2>{selectedProject.title}</h2>
            <p>{selectedProject.description}</p>
            <button className="projects-hero-btn" onClick={() => openModal(selectedProject.id)}>
              View project
            </button>
          </div>
        </div>

        <div className="projects-grid-mini">
          {projects.map((project) => (
            <article
              key={project.id}
              className={`projects-mini-card ${selectedProject.id === project.id ? 'is-active' : ''}`}
              tabIndex={0}
              role="button"
              onClick={() => {
                setSelectedProject(project);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setSelectedProject(project);
                }
              }}
              aria-pressed={selectedProject.id === project.id}
            >
              <div className="projects-mini-meta">
                <span className="projects-mini-tag">{project.category}</span>
                <h4>{project.title}</h4>
              </div>
              <div className="projects-mobile-details">
                <div
                  className="projects-mobile-image"
                  style={{ backgroundImage: `linear-gradient(135deg, rgba(20,32,46,0.4), rgba(20,32,46,0.18)), url(${project.image})` }}
                ></div>
                <p>{project.description}</p>
                <button
                  type="button"
                  className="projects-hero-btn projects-mobile-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    openModal(project.id);
                  }}
                >
                  View project
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>

      <ProjectModal projectId={activeProject} onClose={closeModal} />
    </section>
  );
}

export default Projects;
