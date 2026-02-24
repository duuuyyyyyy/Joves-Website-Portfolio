import React, { useState } from 'react';

const projectsData = {
  '1': {
    name: 'E-Commerce Platform',
    purpose: 'A full-featured e-commerce solution with product catalog, shopping cart, and secure payment integration.',
    features: ['Product management', 'Shopping cart', 'Payment processing with Stripe', 'User authentication', 'Order management'],
    technologies: ['React', 'Node.js', 'MongoDB', 'Stripe API'],
    images: ['Screenshot 1', 'Screenshot 2', 'Screenshot 3'],
    liveLink: 'https://example-ecommerce.com',
    githubLink: 'https://github.com/yourname/ecommerce-platform'
  },
  '2': {
    name: 'Task Management App',
    purpose: 'A collaborative task management application with real-time updates and team features.',
    features: ['Real-time task updates', 'User authentication', 'Team collaboration', 'Task assignments', 'Progress tracking'],
    technologies: ['Vue.js', 'Firebase', 'Tailwind CSS'],
    images: ['Screenshot 1', 'Screenshot 2', 'Screenshot 3'],
    liveLink: 'https://example-taskapp.com',
    githubLink: 'https://github.com/yourname/task-management'
  },
  '3': {
    name: 'Weather Dashboard',
    purpose: 'Real-time weather information dashboard with geolocation support and interactive maps.',
    features: ['Real-time weather data', 'Geolocation support', 'Forecast visualization', 'Interactive maps', 'Location search'],
    technologies: ['React', 'OpenWeather API', 'Mapbox'],
    images: ['Screenshot 1', 'Screenshot 2', 'Screenshot 3'],
    liveLink: 'https://example-weather.com',
    githubLink: 'https://github.com/yourname/weather-dashboard'
  },
  '4': {
    name: 'Social Media Analytics',
    purpose: 'Advanced analytics platform for social media metrics with data visualization and trend analysis.',
    features: ['Real-time analytics', 'Data visualization', 'Trend analysis', 'Custom reports', 'Multi-platform support'],
    technologies: ['React', 'D3.js', 'Python', 'PostgreSQL'],
    images: ['Screenshot 1', 'Screenshot 2', 'Screenshot 3'],
    liveLink: 'https://example-analytics.com',
    githubLink: 'https://github.com/yourname/social-analytics'
  },
  '5': {
    name: 'Personal Blog Platform',
    purpose: 'A headless CMS blog platform with markdown support, SEO optimization, and static site generation.',
    features: ['Markdown support', 'SEO optimization', 'Static generation', 'Content management', 'Comment system'],
    technologies: ['Next.js', 'Markdown', 'Contentful', 'Vercel'],
    images: ['Screenshot 1', 'Screenshot 2', 'Screenshot 3'],
    liveLink: 'https://example-blog.com',
    githubLink: 'https://github.com/yourname/blog-platform'
  },
  '6': {
    name: 'Fitness Tracking App',
    purpose: 'Mobile-ready fitness tracking application with workout logging and personalized recommendations.',
    features: ['Workout logging', 'Progress tracking', 'Personalized plans', 'Social sharing', 'Leaderboards'],
    technologies: ['React Native', 'Firebase', 'Redux', 'Node.js'],
    images: ['Screenshot 1', 'Screenshot 2', 'Screenshot 3'],
    liveLink: 'https://example-fitness.com',
    githubLink: 'https://github.com/yourname/fitness-app'
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
