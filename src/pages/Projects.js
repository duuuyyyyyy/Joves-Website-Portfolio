import React, { useEffect, useRef, useState } from 'react';

const projects = [
  {
    id: '1',
    title: 'Wander Blog Mockup',
    previewImage: `${process.env.PUBLIC_URL}/project-images/project-1-wander.png`,
    previewAlt: 'Landing page preview for Wander Blog Mockup',
    description:
      'Wander is a travel-first editorial concept built to make destination discovery feel visual, navigable, and easy to scan.',
    purpose:
      'The project explores how a blog experience can balance immersive storytelling with practical travel planning, giving readers a clear path from inspiration to action.',
    technologies: ['Figma', 'Editorial UX', 'Responsive Layouts', 'Information Architecture'],
    role:
      'I led the interface direction, content hierarchy, responsive page flow, and visual decisions for the landing page and article system.',
    screenshots: [
      {
        image: `${process.env.PUBLIC_URL}/project-images/project-1-wander.png`,
        alt: 'Wander landing page overview'
      },
      {
        image: `${process.env.PUBLIC_URL}/project-images/destination-page-wander.png`,
        alt: 'Wander destination detail page'
      },
      {
        image: `${process.env.PUBLIC_URL}/project-images/travel-tips-page-wander.png`,
        alt: 'Wander travel tips article page'
      }
    ],
    liveLink:
      'https://www.figma.com/proto/gkKdqo5oP8w45e1gkrJBC8/Wander?node-id=1-2&t=0F7N4gmyIADJGLwN-1',
    sourceLink: 'https://github.com/duuuyyyyyy/Wander.git'
  },
  {
    id: '2',
    title: 'J-Zone E-Commerce CMS',
    previewImage: `${process.env.PUBLIC_URL}/project-images/project-2-jzone-motorcycle-red.png`,
    previewAlt: 'Landing page preview for J-Zone E-Commerce CMS',
    description:
      'A commerce-led storefront and CMS concept designed around product clarity, category visibility, and high-speed browsing.',
    purpose:
      'This build focuses on helping customers reach inventory faster while giving the business a cleaner structure for managing listings, updates, and marketing content.',
    technologies: ['WordPress', 'PHP', 'MySQL', 'HTML/CSS', 'Content Strategy'],
    role:
      'I shaped the storefront structure, product presentation flow, content organization, and the visual direction for the landing and catalog experience.',
    screenshots: [
      {
        image: `${process.env.PUBLIC_URL}/project-images/project-2-jzone-motorcycle-red.png`,
        alt: 'J-Zone landing page preview'
      },
      {
        image: `${process.env.PUBLIC_URL}/project-placeholder-4.svg`,
        alt: 'J-Zone catalog placeholder preview'
      },
      {
        image: `${process.env.PUBLIC_URL}/project-placeholder-5.svg`,
        alt: 'J-Zone CMS placeholder preview'
      }
    ],
    liveLink: 'https://jzonemotorparts.wordpress.com/',
    sourceLink: 'https://github.com/yourname/task-management'
  },
  {
    id: '3',
    title: 'Jewelry Landing Experience',
    previewImage: `${process.env.PUBLIC_URL}/project-images/jewelry-ecommerce-landing-page.png`,
    previewAlt: 'Landing page preview for Jewelry Landing Experience',
    description:
      'A premium landing page concept built to present products with a more polished pace, stronger hierarchy, and a clearer route to conversion.',
    purpose:
      'The goal was to create a luxury-oriented shopping entry point that feels elegant without compromising usability or mobile responsiveness.',
    technologies: ['HTML', 'CSS', 'JavaScript', 'Figma', 'E-Commerce UX'],
    role:
      'I handled the page composition, hero storytelling, product focus areas, interaction rhythm, and overall visual refinement of the customer journey.',
    screenshots: [
      {
        image: `${process.env.PUBLIC_URL}/project-images/jewelry-ecommerce-landing-page.png`,
        alt: 'Jewelry landing page overview'
      },
      {
        image: `${process.env.PUBLIC_URL}/project-placeholder-5.svg`,
        alt: 'Jewelry collection placeholder preview'
      },
      {
        image: `${process.env.PUBLIC_URL}/project-placeholder-6.svg`,
        alt: 'Jewelry product detail placeholder preview'
      }
    ],
    liveLink: 'https://www.endlesscharms.store',
    sourceLink: 'https://github.com/duuuyyyyyy/Endless-Charms.git'
  },
  {
    id: '4',
    title: 'Upcoming Case Study',
    previewImage: `${process.env.PUBLIC_URL}/project-placeholder-4.svg`,
    previewAlt: 'Placeholder landing page preview for upcoming case study',
    description:
      'A reserved slot for the next fully documented product build, intended to capture both final interface decisions and the reasoning behind them.',
    purpose:
      'This case study space is being prepared for a deeper end-to-end project with clearer process documentation, production constraints, and measurable outcomes.',
    technologies: ['Research Planning', 'Case Study Writing', 'Responsive Systems', 'Product Thinking'],
    role:
      'I am structuring the narrative, outlining the decision trail, and preparing the visual system that will frame the next complete launch story.',
    screenshots: [
      {
        image: `${process.env.PUBLIC_URL}/project-placeholder-4.svg`,
        alt: 'Upcoming case study placeholder screen one'
      },
      {
        image: `${process.env.PUBLIC_URL}/project-placeholder-5.svg`,
        alt: 'Upcoming case study placeholder screen two'
      },
      {
        image: `${process.env.PUBLIC_URL}/project-placeholder-6.svg`,
        alt: 'Upcoming case study placeholder screen three'
      }
    ],
    liveLink: '',
    sourceLink: 'https://github.com/GR4C3FR/Sharesource.git'
  }
];

function Projects() {
  const previewRailRef = useRef(null);
  const previewCardRefs = useRef([]);
  const animationFrameRef = useRef(null);
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const [selectedScreenshots, setSelectedScreenshots] = useState(() =>
    Object.fromEntries(projects.map((project) => [project.id, 0]))
  );

  useEffect(() => {
    const rail = previewRailRef.current;
    if (!rail) return undefined;

    const syncActiveProject = () => {
      const threshold = rail.scrollTop + rail.clientHeight * 0.38;
      let nextActiveIndex = 0;

      previewCardRefs.current.forEach((card, index) => {
        if (card && card.offsetTop <= threshold) {
          nextActiveIndex = index;
        }
      });

      setActiveProjectIndex((current) => (current === nextActiveIndex ? current : nextActiveIndex));
    };

    const requestSync = () => {
      if (animationFrameRef.current) return;
      animationFrameRef.current = window.requestAnimationFrame(() => {
        syncActiveProject();
        animationFrameRef.current = null;
      });
    };

    syncActiveProject();
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
                    <img src={shot.image} alt={shot.alt} />
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
                        <img src={leadImage.image} alt={leadImage.alt || project.previewAlt} />
                        <p className="projects-preview-title">{project.title}</p>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </aside>
        </div>
      </div>

      <div className="projects-mobile-stack" aria-label="Projects list">
        {projects.map((project) => (
          <article key={project.id} className="projects-mobile-case">
            <div className="projects-mobile-preview">
              <img src={project.previewImage} alt={project.previewAlt} />
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
                      <img src={shot.image} alt={shot.alt} />
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
