import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

const blogArticles = [
  {
    slug: 'my-journey-as-a-web-developer',
    cardLabel: 'Journey',
    title: 'My Journey as a Web Developer',
    date: 'February 20, 2026',
    excerpt: 'How I started learning web development, the challenges I faced, and key lessons I learned along the way.',
    image: `${process.env.PUBLIC_URL}/project-images/project-1-wander.png`,
    content:
      "How I started learning web development, the challenges I faced, and key lessons I learned along the way. This article explores my transition from design to full-stack development.\n\nStarting out, I had no idea what I was getting into. The world of web development seemed vast and overwhelming. But with each line of code, I found myself more and more drawn to the craft. From building simple HTML pages to creating complex React applications, every step of the journey has been a learning experience.\n\nThe biggest challenge was learning to think like a developer. It's not just about writing code - it's about solving problems, understanding user needs, and creating experiences that are both beautiful and functional.\n\nToday, I combine design thinking with technical expertise to build solutions that make a real difference. And the journey continues."
  },
  {
    slug: 'tips-for-building-responsive-websites',
    cardLabel: 'Responsive',
    title: 'Tips for Building Responsive Websites',
    date: 'February 18, 2026',
    excerpt: 'A comprehensive guide to responsive web design and best practices for all device sizes.',
    image: `${process.env.PUBLIC_URL}/project-placeholder-4.svg`,
    content:
      "A comprehensive guide to responsive web design. Learn best practices for creating websites that work seamlessly across all device sizes and screen orientations.\n\nResponsive design is no longer optional - it's a necessity. With users accessing websites from phones, tablets, laptops, and large monitors, your site needs to adapt gracefully to every screen size.\n\nKey principles include mobile-first design, flexible grids, fluid images, and strategic use of media queries. CSS Grid and Flexbox have made responsive layouts more intuitive than ever.\n\nRemember: responsive design isn't just about fitting content on smaller screens. It's about creating the best possible experience for every user, regardless of their device."
  },
  {
    slug: 'design-systems-that-scale',
    cardLabel: 'Systems',
    title: 'Design Systems That Scale',
    date: 'February 15, 2026',
    excerpt: 'A practical look at building reusable interface systems without making the product feel generic.',
    image: `${process.env.PUBLIC_URL}/project-placeholder-5.svg`,
    content:
      "A practical look at building reusable interface systems without making the product feel generic. This article covers the balance between consistency and flexibility in component-driven work.\n\nA good design system is not just a list of buttons and tokens. It is a decision-making framework that helps teams move faster without sacrificing quality.\n\nThe strongest systems define clear primitives, spacing rhythms, type rules, and interaction patterns. But they also leave enough room for pages to feel distinct when the content demands it.\n\nWhen design systems scale well, they reduce friction in handoff, speed up implementation, and make future changes less expensive."
  },
  {
    slug: 'writing-better-ui-copy',
    cardLabel: 'UI Copy',
    title: 'Writing Better UI Copy',
    date: 'February 12, 2026',
    excerpt: 'Small wording decisions shape clarity, trust, and how easily a product guides people forward.',
    image: `${process.env.PUBLIC_URL}/project-placeholder-6.svg`,
    content:
      "Small wording decisions shape clarity, trust, and how easily a product guides people forward. This article focuses on how product language improves usability.\n\nUI copy is part of the interface, not decoration. Labels, helper text, buttons, and empty states all influence whether a user understands what to do next.\n\nClear copy removes hesitation. Strong interface writing is specific, concise, and aligned with the task the user is trying to complete.\n\nThe best product teams treat content design as a functional layer of UX, not something added after the layout is already finished."
  },
  {
    slug: 'from-wireframes-to-shipped-screens',
    cardLabel: 'Wireframes',
    title: 'From Wireframes to Shipped Screens',
    date: 'February 9, 2026',
    excerpt: 'How early structure, realistic constraints, and technical feedback lead to better final interfaces.',
    image: `${process.env.PUBLIC_URL}/project-placeholder-3.svg`,
    content:
      "How early structure, realistic constraints, and technical feedback lead to better final interfaces. This article walks through a more grounded product workflow.\n\nWireframes are useful because they clarify hierarchy before aesthetics take over. They help expose weak flows, unnecessary complexity, and missing content.\n\nOnce that structure is clear, higher-fidelity design becomes easier to defend and implement. Collaboration with development at this stage prevents polished but impractical ideas from surviving too long.\n\nThe strongest shipped screens usually come from early iteration, fast feedback, and a consistent focus on the user's next decision."
  },
  {
    slug: 'building-portfolios-with-clear-structure',
    cardLabel: 'Portfolios',
    title: 'Building Portfolios With Clear Structure',
    date: 'February 6, 2026',
    excerpt: 'Why information hierarchy matters more than decoration when presenting work, skills, and credibility.',
    image: `${process.env.PUBLIC_URL}/project-placeholder-4.svg`,
    content:
      "Why information hierarchy matters more than decoration when presenting work, skills, and credibility. This article looks at the difference between visually busy portfolios and purposeful ones.\n\nStrong portfolios guide visitors through what matters most. They make it easy to understand who you are, what you build, and why your work is credible.\n\nClear structure improves scanability, which matters because most people do not read every line. They move quickly and decide based on hierarchy, clarity, and confidence.\n\nWhen the structure is solid, visual styling can support the content instead of compensating for confusion."
  },
  {
    slug: 'designing-with-implementation-in-mind',
    cardLabel: 'Execution',
    title: 'Designing With Implementation in Mind',
    date: 'February 3, 2026',
    excerpt: 'Interfaces improve when design decisions account for development realities from the beginning.',
    image: `${process.env.PUBLIC_URL}/project-placeholder-5.svg`,
    content:
      "Interfaces improve when design decisions account for development realities from the beginning. This article focuses on the value of designing with engineering awareness.\n\nSome of the best product decisions happen when design and implementation constraints are discussed early. That reduces rework and avoids patterns that look polished but break under real content.\n\nThinking about states, responsiveness, accessibility, and long-term maintenance during design leads to more resilient interfaces.\n\nPractical design is not a compromise. It is usually the shortest path to better execution and a more coherent final product."
  }
];

function Blog() {
  const [activeArticle, setActiveArticle] = useState(null);
  const carouselRef = useRef(null);
  const suppressClickRef = useRef(false);
  const dragStateRef = useRef({
    isDragging: false,
    startX: 0,
    startScrollLeft: 0,
    moved: false
  });

  const getCarouselStep = () => {
    const track = carouselRef.current;
    if (!track) return 260;

    const card = track.querySelector('.blog-carousel-card');
    if (!card) return 260;

    const cardWidth = card.getBoundingClientRect().width;
    const gap = parseFloat(window.getComputedStyle(track).columnGap || window.getComputedStyle(track).gap || '18');
    return cardWidth + gap;
  };

  const scrollCarouselBy = (direction) => {
    const track = carouselRef.current;
    if (!track) return;

    track.scrollBy({
      left: direction * getCarouselStep(),
      behavior: 'smooth'
    });
  };

  const openArticle = (article) => {
    if (suppressClickRef.current) {
      suppressClickRef.current = false;
      return;
    }
    setActiveArticle(article);
  };

  useEffect(() => {
    document.body.style.overflow = activeArticle ? 'hidden' : 'auto';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [activeArticle]);

  useLayoutEffect(() => {
    const track = carouselRef.current;
    if (!track) return;

    track.scrollLeft = 0;
    const frameId = window.requestAnimationFrame(() => {
      track.scrollLeft = 0;
    });

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, []);

  useEffect(() => {
    const track = carouselRef.current;
    if (!track) return;

    const clampScrollLeft = (value) => {
      const maxScrollLeft = Math.max(0, track.scrollWidth - track.clientWidth);
      return Math.min(Math.max(value, 0), maxScrollLeft);
    };

    const handleWheel = (event) => {
      if (window.matchMedia('(pointer: coarse)').matches) return;
      const dominantDelta = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY;
      if (dominantDelta === 0) return;

      event.preventDefault();
      track.scrollLeft = clampScrollLeft(track.scrollLeft + dominantDelta);
    };

    const handleMouseDown = (event) => {
      if (event.button !== 0) return;
      dragStateRef.current = {
        isDragging: true,
        startX: event.clientX,
        startScrollLeft: track.scrollLeft,
        moved: false
      };
      track.classList.add('is-dragging');
      document.body.classList.add('blog-carousel-dragging');
    };

    const handleMouseMove = (event) => {
      const dragState = dragStateRef.current;
      if (!dragState.isDragging) return;

      const deltaX = event.clientX - dragState.startX;
      event.preventDefault();
      if (Math.abs(deltaX) > 4) {
        dragState.moved = true;
      }
      track.scrollLeft = dragState.startScrollLeft - deltaX;
    };

    const endMouseDrag = () => {
      if (!dragStateRef.current.isDragging) return;
      if (dragStateRef.current.moved) {
        suppressClickRef.current = true;
        window.setTimeout(() => {
          suppressClickRef.current = false;
        }, 0);
      }
      dragStateRef.current.isDragging = false;
      track.classList.remove('is-dragging');
      document.body.classList.remove('blog-carousel-dragging');
    };

    track.addEventListener('wheel', handleWheel, { passive: false });
    track.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove, { passive: false });
    window.addEventListener('mouseup', endMouseDrag);

    return () => {
      track.removeEventListener('wheel', handleWheel);
      track.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', endMouseDrag);
      document.body.classList.remove('blog-carousel-dragging');
    };
  }, []);

  const articleModal = activeArticle ? (
    <div
      className="project-modal active"
      onClick={(e) => e.target === e.currentTarget && setActiveArticle(null)}
    >
      <div
        className="project-modal-content blog-article-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="blog-article-title"
      >
        <button
          className="project-modal-close"
          onClick={() => setActiveArticle(null)}
          aria-label="Close article"
        >
          x
        </button>
        <p className="blog-meta">{activeArticle.date}</p>
        <h2 id="blog-article-title">{activeArticle.title}</h2>
        <div className="blog-article-visual">
          <img src={activeArticle.image} alt={`Placeholder preview for ${activeArticle.title}`} className="blog-article-image" />
        </div>
        {activeArticle.content.split('\n\n').map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </div>
    </div>
  ) : null;

  return (
    <>
      <section id="blog" className="page-section blog-page">
        <section className="hero-scalar blog-hero-scalar" style={{ minHeight: '45vh', paddingBottom: '3rem' }}>
          <div className="hero-orb orb-v3 orb-color-4" style={{ top: '-10%', right: '15%' }}></div>
          <div className="hero-orb orb-v4 orb-color-2" style={{ bottom: '10%', left: '20%' }}></div>
          <div className="hero-orb orb-v7 orb-color-5 orb-shape-ellipse orb-anim-wave" style={{ top: '18%', left: '8%' }}></div>
          <div className="hero-orb orb-v6 orb-color-6 orb-shape-blob orb-anim-rise" style={{ bottom: '16%', right: '20%' }}></div>
          <div className="hero-orb orb-v8 orb-color-1 orb-shape-squircle orb-anim-orbit" style={{ top: '40%', right: '40%' }}></div>
          <div className="hero-scalar-content editorial-section-header editorial-section-header-right">
            <div className="blog-header-layout">
              <p className="editorial-section-subtitle blog-header-description">
                Notes on development, interface thinking, and the decisions behind the work. Scroll through the cards to explore each article.
              </p>
              <div className="blog-header-copy">
                <span className="editorial-section-kicker">Resources &amp; Insights</span>
                <h1 className="editorial-section-title">Blog</h1>
              </div>
            </div>
          </div>
        </section>

        <main className="blog-main">
          <section className="blog-carousel-section">
            <div
              className="blog-carousel-track"
              aria-label="Blog articles"
              tabIndex={0}
              ref={carouselRef}
            >
              {blogArticles.map((article, index) => (
              <article
                key={article.slug}
                className={`blog-carousel-card blog-carousel-card-${(index % 4) + 1}`}
                role="button"
                tabIndex={0}
                onClick={() => openArticle(article)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openArticle(article);
                  }
                }}
                onDragStart={(e) => e.preventDefault()}
              >
                <div className="blog-carousel-card-inner">
                  <div className="blog-carousel-card-visual">
                    <img
                      src={article.image}
                      alt={`Placeholder preview for ${article.title}`}
                      className="blog-carousel-image"
                      draggable="false"
                    />
                  </div>
                  <div className="blog-carousel-card-footer">
                    <span className="blog-carousel-chip">{article.cardLabel}</span>
                  </div>
                </div>
              </article>
            ))}
            </div>
            <div className="blog-carousel-controls">
              <button
                type="button"
                className="blog-carousel-nav blog-carousel-nav-prev"
                aria-label="Show previous blog cards"
                onClick={() => scrollCarouselBy(-1)}
              >
                <span aria-hidden="true">&larr;</span>
                <span>Previous</span>
              </button>
              <button
                type="button"
                className="blog-carousel-nav blog-carousel-nav-next"
                aria-label="Show next blog cards"
                onClick={() => scrollCarouselBy(1)}
              >
                <span>Next</span>
                <span aria-hidden="true">&rarr;</span>
              </button>
            </div>
          </section>
        </main>
      </section>

      {articleModal ? createPortal(articleModal, document.body) : null}
    </>
  );
}

export default Blog;
