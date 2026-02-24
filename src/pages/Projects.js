import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ProjectModal, useProjectModal } from '../components/ProjectModal';

function Projects() {
  const [showAll, setShowAll] = useState(false);
  const { activeProject, openModal, closeModal } = useProjectModal();

  useEffect(() => {
    document.title = 'Projects | Portfolio';

    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && activeProject) {
        closeModal();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [activeProject, closeModal]);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, observerOptions);

    const cards = document.querySelectorAll('.project-card');
    cards.forEach(card => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';
      card.style.transition = 'all 0.6s ease';
      observer.observe(card);
    });

    return () => observer.disconnect();
  }, [showAll]);

  const handleCardClick = (e, projectId) => {
    if (e.target.tagName !== 'A') {
      e.preventDefault();
      openModal(projectId);
    }
  };

  return (
    <>
      {/* Page Header */}
      <section className="page-header">
        <h1>My Projects</h1>
        <p>A selection of recent work showcasing my skills and creativity</p>
      </section>

      {/* Main Content */}
      <main className="projects-main">
        
        {/* Projects Grid */}
        <section>
          <div className="projects-grid">
            <div className="project-card" data-project="1" onClick={(e) => handleCardClick(e, '1')}>
              <div className="project-image" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/project-1-wander.png)` }}>
                <span className="project-placeholder">Project 1</span>
              </div>
              <div className="project-info">
                <h3>E-Commerce Platform</h3>
                <p>A full-featured e-commerce solution with product catalog, shopping cart, and secure payment integration. Built with React and Node.js.</p>
                <div className="project-tags">
                  <span className="tag">React</span>
                  <span className="tag">Node.js</span>
                  <span className="tag">MongoDB</span>
                  <span className="tag">Stripe</span>
                </div>
              </div>
            </div>

            <div className="project-card" data-project="2" onClick={(e) => handleCardClick(e, '2')}>
              <div className="project-image" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/project-2-jzone-motorcycle-red.png)` }}>
                <span className="project-placeholder">Project 2</span>
              </div>
              <div className="project-info">
                <h3>Task Management App</h3>
                <p>A collaborative task management application with real-time updates, user authentication, and team features. Powered by Firebase.</p>
                <div className="project-tags">
                  <span className="tag">Vue.js</span>
                  <span className="tag">Firebase</span>
                  <span className="tag">Tailwind CSS</span>
                </div>
              </div>
            </div>

            <div className={`project-card${showAll ? '' : ' project-hidden'}`} data-project="3" onClick={(e) => handleCardClick(e, '3')}>
              <div className="project-image" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/project-placeholder-3.svg)` }}>
                <span className="project-placeholder">Project 3</span>
              </div>
              <div className="project-info">
                <h3>Weather Dashboard</h3>
                <p>Real-time weather information dashboard with geolocation support, forecast data, and interactive maps. Clean, responsive design.</p>
                <div className="project-tags">
                  <span className="tag">React</span>
                  <span className="tag">OpenWeather API</span>
                  <span className="tag">Mapbox</span>
                </div>
              </div>
            </div>

            <div className={`project-card${showAll ? '' : ' project-hidden'}`} data-project="4" onClick={(e) => handleCardClick(e, '4')}>
              <div className="project-image" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/project-placeholder-4.svg)` }}>
                <span className="project-placeholder">Project 4</span>
              </div>
              <div className="project-info">
                <h3>Social Media Analytics</h3>
                <p>Advanced analytics platform for social media metrics with data visualization, trend analysis, and detailed reporting features.</p>
                <div className="project-tags">
                  <span className="tag">React</span>
                  <span className="tag">D3.js</span>
                  <span className="tag">Python</span>
                  <span className="tag">PostgreSQL</span>
                </div>
              </div>
            </div>

            <div className={`project-card${showAll ? '' : ' project-hidden'}`} data-project="5" onClick={(e) => handleCardClick(e, '5')}>
              <div className="project-image" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/project-placeholder-5.svg)` }}>
                <span className="project-placeholder">Project 5</span>
              </div>
              <div className="project-info">
                <h3>Personal Blog Platform</h3>
                <p>A headless CMS blog platform with markdown support, SEO optimization, and static site generation for optimal performance.</p>
                <div className="project-tags">
                  <span className="tag">Next.js</span>
                  <span className="tag">Markdown</span>
                  <span className="tag">Contentful</span>
                </div>
              </div>
            </div>

            <div className={`project-card${showAll ? '' : ' project-hidden'}`} data-project="6" onClick={(e) => handleCardClick(e, '6')}>
              <div className="project-image" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/project-placeholder-6.svg)` }}>
                <span className="project-placeholder">Project 6</span>
              </div>
              <div className="project-info">
                <h3>Fitness Tracking App</h3>
                <p>Mobile-ready fitness tracking application with workout logging, progress tracking, and personalized recommendations.</p>
                <div className="project-tags">
                  <span className="tag">React Native</span>
                  <span className="tag">Firebase</span>
                  <span className="tag">Redux</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Show All Projects Button */}
        {!showAll && (
          <div style={{ textAlign: 'center', padding: 'var(--spacing-3xl) 0' }}>
            <button className="show-all-projects-btn" id="show-more-projects" onClick={() => setShowAll(true)}>Show All Projects</button>
          </div>
        )}

        {/* CTA */}
        <section className="projects-cta">
          <h2 className="projects-cta-title">Have a Project in Mind?</h2>
          <p className="projects-cta-text">I'm always interested in new challenges and collaborations. Let's create something amazing together.</p>
          <Link to="/contact" className="btn btn-primary">Start Your Project</Link>
        </section>
      </main>

      {/* Project Modal */}
      <ProjectModal projectId={activeProject} onClose={closeModal} />
    </>
  );
}

export default Projects;
