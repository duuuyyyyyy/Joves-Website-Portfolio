import React, { useState } from 'react';

const projectsData = {
  '1': {
    name: 'Wander',
    purpose: 'The purpose of Wander Luzon is to provide an all-in-one digital toolkit that seamlessly bridges the gap between travel inspiration, navigation, and community-based advice for Luzons top destinations.',
    features: ['Curated "Top 10" Showcase', 'Interactive Info Snippets', 'Map Integration Prototype', 'Linked Community Forum', 'Responsive Navigation'],
    technologies: ['Figma', 'External Integration (Mocked)'],
    images: ['Screenshot 1', 'Screenshot 2', 'Screenshot 3'],
    liveLink: 'https://www.figma.com/proto/gkKdqo5oP8w45e1gkrJBC8/Wander?node-id=1-2&t=0F7N4gmyIADJGLwN-1',
    githubLink: 'https://github.com/duuuyyyyyy/Wander.git'
  },
  '2': {
    name: 'J-Zone Motorcycle Parts',
    purpose: 'Provide a professional, easy-to-manage digital storefront that centralizes product information and connects the motorcycling community to high-quality components across multiple online marketplaces.',
    features: ['Dynamic Product Catalog', 'Administrative Dashboard', 'Social Commerce Integration', 'Built-in Engagement Tools', 'Search Engine Optimization (SEO)'],
    technologies: ['WordPress CMS', 'PHP & MySQL', 'Gutenberg / Block Editor', 'Jetpack', 'HTML5/CSS3'],
    images: ['Screenshot 1', 'Screenshot 2', 'Screenshot 3'],
    liveLink: 'https://jzonemotorparts.wordpress.com/',
    githubLink: 'https://github.com/yourname/task-management'/* N/A */
  },
  '3': {
    name: 'Endless Charms',
    purpose: 'A sleek and user-centric e-commerce platform that simplifies the discovery and purchase of unique accessories while offering a seamless administrative workflow for inventory management.',
    features: ['Dynamic Product Catalog', 'Interactive Shopping Cart', 'Customer Account Management', 'Responsive UI/UX', 'Search and Discovery'],
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'Figma', 'Frameworks/Libraries', 'MongoDB', 'GitHub'],
    images: ['Screenshot 1', 'Screenshot 2', 'Screenshot 3'],
    liveLink: 'https://www.endlesscharms.store',
    githubLink: 'https://github.com/duuuyyyyyy/Endless-Charms.git'
  },
  '4': {
    name: 'ShareSource',
    purpose: 'A collaborative open-source platform that enables users to easily upload, categorize, and share valuable digital resources within a community.',
    features: ['File Upload & Categorization', 'Collaborative Contribution', 'User Authentication', 'Search and Filter', 'Responsive Dashboard'],
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'MySQL', 'GitHub', 'Bootstrap', 'Node.js'],
    images: ['Screenshot 1', 'Screenshot 2', 'Screenshot 3'],
    liveLink: 'https://example-analytics.com', /* N/A */
    githubLink: 'https://github.com/GR4C3FR/Sharesource.git'
  }
};

function ProjectModal({ projectId, onClose }) {
  if (!projectId) return null;
  const data = projectsData[projectId];
  if (!data) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="project-modal active" id="project-modal" onClick={handleBackdropClick}>
      <div className="project-modal-content">
        <button className="project-modal-close" id="modal-close" onClick={onClose}>×</button>

        <div className="project-modal-header">
          <h2 className="project-modal-title" id="modal-project-name">{data.name}</h2>
          <p className="project-modal-description" id="modal-project-purpose">{data.purpose}</p>
        </div>

        <div className="project-modal-section" data-section="gallery">
          <h3 className="project-modal-section-title">Gallery</h3>
          <div className="project-gallery" id="modal-gallery">
            {data.images.map((img, i) => (
              <div className="project-gallery-item" key={i}>{img}</div>
            ))}
          </div>
        </div>

        <div className="project-modal-section" data-section="features">
          <h3 className="project-modal-section-title">Features</h3>
          <ul style={{ listStylePosition: 'inside', color: 'var(--text-secondary)', paddingLeft: 0 }}>
            {data.features.map((feature, i) => (
              <li key={i} style={{ marginBottom: '8px' }}>• {feature}</li>
            ))}
          </ul>
        </div>

        <div className="project-modal-section">
          <h3 className="project-modal-section-title">Technologies & Tools</h3>
          <div className="project-tools" id="modal-tools">
            {data.technologies.map((tech, i) => (
              <span className="project-tool-tag" key={i}>{tech}</span>
            ))}
          </div>
        </div>

        <div className="project-modal-section">
          <h3 className="project-modal-section-title">Links</h3>
          <div className="project-links">
            <a href={data.liveLink} className="project-link-btn" id="modal-live-demo" target="_blank" rel="noopener noreferrer">View Live Demo</a>
            <a href={data.githubLink} className="project-link-btn secondary" id="modal-github" target="_blank" rel="noopener noreferrer">GitHub Repository</a>
          </div>
        </div>
      </div>
    </div>
  );
}

function useProjectModal() {
  const [activeProject, setActiveProject] = useState(null);

  const openModal = (projectId) => {
    setActiveProject(projectId);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setActiveProject(null);
    document.body.style.overflow = 'auto';
  };

  return { activeProject, openModal, closeModal, ProjectModal };
}

export { ProjectModal, useProjectModal, projectsData };
