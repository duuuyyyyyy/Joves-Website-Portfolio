import React, { useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import GlobalBackground from './components/GlobalBackground';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import { setDocumentMeta } from './utils/seo';

function App() {
  useEffect(() => {
    const sectionMeta = {
      hero: {
        title: 'Home | Professional Portfolio',
        description: 'Portfolio of Carla Dulay Joves, a developer creating thoughtful digital experiences with design-led frontend and product-focused work.'
      },
      about: {
        title: 'About Me | Portfolio',
        description: 'Learn more about Carla Dulay Joves, including her design-driven development approach, technical skills, certifications, and workflow.'
      },
      'projects-section': {
        title: 'Projects | Portfolio',
        description: 'Explore selected projects by Carla Dulay Joves, including travel UX, e-commerce CMS, and landing page case studies.'
      },
      blog: {
        title: 'Blog | Portfolio',
        description: 'Read blog posts and development notes from Carla Dulay Joves on frontend work, interface thinking, and practical web building.'
      },
      contact: {
        title: 'Contact | Portfolio',
        description: 'Contact Carla Dulay Joves for collaborations, project inquiries, walkthrough requests, or remote partnership opportunities.'
      }
    };

    const updateSectionMeta = () => {
      let currentSection = 'hero';
      const offset = 140;

      for (const id of Object.keys(sectionMeta)) {
        const section = document.getElementById(id);
        if (!section) continue;

        const rect = section.getBoundingClientRect();
        if (rect.top <= offset && rect.bottom >= offset) {
          currentSection = id;
          break;
        }
      }

      const meta = sectionMeta[currentSection];
      if (meta) {
        setDocumentMeta(meta.title, meta.description);
      }
    };

    updateSectionMeta();
    window.addEventListener('scroll', updateSectionMeta, { passive: true });
    window.addEventListener('resize', updateSectionMeta);

    return () => {
      window.removeEventListener('scroll', updateSectionMeta);
      window.removeEventListener('resize', updateSectionMeta);
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.18,
        rootMargin: '0px 0px -48px 0px'
      }
    );

    const cards = document.querySelectorAll('.scroll-card');
    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <GlobalBackground />
      <Header />
      <div className="app-content-shell single-page">
        <Home />
        <About />
        <Projects />
        <Blog />
        <Contact />
      </div>
      <Footer />
    </>
  );
}

export default App;
