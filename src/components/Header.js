import React, { useState, useEffect, useCallback, useRef } from 'react';

function Header() {
  const [isDark, setIsDark] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const navRef = useRef(null);
  const highlightRef = useRef(null);
  const sectionIds = ['hero', 'about', 'projects-section', 'blog', 'contact'];

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDark(savedTheme === 'dark');
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDark(prefersDark);
    }
  }, []);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  const toggleMenu = (e) => {
    e.stopPropagation();
    setMenuOpen(!menuOpen);
  };

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      const hamburger = document.getElementById('hamburger');
      const navLinks = document.getElementById('nav-links');
      const isClickInside = (hamburger && hamburger.contains(e.target)) ||
                            (navLinks && navLinks.contains(e.target));
      if (!isClickInside && menuOpen) {
        closeMenu();
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [menuOpen, closeMenu]);

  // Track scroll for header transparency
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Sliding highlight effect - moves to active nav item
  useEffect(() => {
    const updateHighlight = () => {
      const nav = navRef.current;
      const highlight = highlightRef.current;
      if (!nav || !highlight) return;

      const activeLink = nav.querySelector('a.active');
      if (activeLink) {
        const navRect = nav.getBoundingClientRect();
        const linkRect = activeLink.getBoundingClientRect();
        
        highlight.style.width = `${linkRect.width}px`;
        highlight.style.height = `${linkRect.height}px`;
        highlight.style.transform = `translateX(${linkRect.left - navRect.left - 8}px)`;
        highlight.style.opacity = '1';
      } else {
        highlight.style.opacity = '0';
      }
    };

    requestAnimationFrame(updateHighlight);
    
    // Update on window resize
    window.addEventListener('resize', updateHighlight);
    return () => window.removeEventListener('resize', updateHighlight);
  }, [activeSection]);

  // Track visible section for nav highlighting
  useEffect(() => {
    const handleSectionTracking = () => {
      let current = 'hero';
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        const offset = 120; // header height buffer
        if (rect.top <= offset && rect.bottom >= offset) {
          current = id;
          break;
        }
      }
      setActiveSection(current);
    };

    handleSectionTracking();
    window.addEventListener('scroll', handleSectionTracking, { passive: true });
    window.addEventListener('resize', handleSectionTracking);
    return () => {
      window.removeEventListener('scroll', handleSectionTracking);
      window.removeEventListener('resize', handleSectionTracking);
    };
  }, []);

  const scrollToSection = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.pageYOffset - 90;
    window.scrollTo({ top: y, behavior: 'smooth' });
    closeMenu();
  };

  const navItems = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'projects-section', label: 'Projects' },
    { id: 'blog', label: 'Blog' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <header className={`header${scrolled ? ' scrolled' : ''}`}>
      <nav className="navbar">
        <div className="nav-container">
          <a
            href="#hero"
            className="logo"
            onClick={(e) => scrollToSection(e, 'hero')}
          >
            <img src={process.env.PUBLIC_URL + '/navy-gold-gradient-transparent-background.png'} alt="Dulay+ Logo" className="logo-mark" />
            <span className="logo-text">Dulay+</span>
          </a>

          <ul className={`nav-links${menuOpen ? ' active' : ''}`} id="nav-links" ref={navRef}>
            {/* Sliding highlight element */}
            <div className="nav-highlight-slider" ref={highlightRef}></div>
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className={activeSection === item.id ? 'active' : ''}
                  onClick={(e) => scrollToSection(e, item.id)}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="nav-actions">
            <button className="theme-toggle" id="theme-toggle" aria-label="Toggle light/dark mode" onClick={toggleTheme}>
              <span className="toggle-icon">{isDark ? '🌙' : '☀️'}</span>
            </button>
            <button
              className={`hamburger${menuOpen ? ' active' : ''}`}
              id="hamburger"
              aria-label="Toggle navigation menu"
              aria-expanded={menuOpen ? 'true' : 'false'}
              onClick={toggleMenu}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
