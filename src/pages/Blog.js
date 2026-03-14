import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
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
  const [carouselOffset, setCarouselOffset] = useState(0);
  const [isDraggingCarousel, setIsDraggingCarousel] = useState(false);
  const viewportRef = useRef(null);
  const carouselRef = useRef(null);
  const metricsRef = useRef({
    step: 260,
    maxOffset: 0
  });
  const pressedArticleSlugRef = useRef(null);
  const suppressClickRef = useRef(false);
  const dragStateRef = useRef({
    isDragging: false,
    pointerId: null,
    startX: 0,
    startOffset: 0,
    moved: false
  });

  const measureCarousel = useCallback(() => {
    const viewport = viewportRef.current;
    const track = carouselRef.current;
    if (!viewport || !track) return metricsRef.current;

    const cards = track.querySelectorAll('.blog-carousel-card');
    if (!cards.length) return metricsRef.current;

    let step = cards[0].getBoundingClientRect().width;
    if (cards.length > 1) {
      const measuredStep = cards[1].offsetLeft - cards[0].offsetLeft;
      if (Number.isFinite(measuredStep) && measuredStep > 0) {
        step = measuredStep;
      }
    }

    const maxOffset = Math.max(0, track.scrollWidth - viewport.clientWidth);
    metricsRef.current = {
      step,
      maxOffset
    };

    return metricsRef.current;
  }, []);

  const clampCarouselOffset = useCallback((value) => {
    const { maxOffset } = measureCarousel();
    return Math.min(Math.max(value, 0), maxOffset);
  }, [measureCarousel]);

  const scrollCarouselBy = (direction) => {
    const { step } = measureCarousel();
    setCarouselOffset((currentOffset) => clampCarouselOffset(currentOffset + direction * step));
  };

  const openArticle = (article) => {
    if (suppressClickRef.current) {
      suppressClickRef.current = false;
      return;
    }
    setActiveArticle(article);
  };

  useEffect(() => {
    const { body, documentElement } = document;
    if (activeArticle) {
      body.classList.add('blog-modal-open');
      documentElement.classList.add('blog-modal-open');
    } else {
      body.classList.remove('blog-modal-open');
      documentElement.classList.remove('blog-modal-open');
    }

    return () => {
      body.classList.remove('blog-modal-open');
      documentElement.classList.remove('blog-modal-open');
    };
  }, [activeArticle]);

  useLayoutEffect(() => {
    const syncCarouselMetrics = () => {
      measureCarousel();
      setCarouselOffset((currentOffset) => clampCarouselOffset(currentOffset));
    };

    syncCarouselMetrics();
    window.addEventListener('resize', syncCarouselMetrics);

    return () => {
      window.removeEventListener('resize', syncCarouselMetrics);
    };
  }, [clampCarouselOffset, measureCarousel]);

  const endPointerDrag = (pointerId) => {
    if (!dragStateRef.current.isDragging) return;
    if (pointerId !== undefined && dragStateRef.current.pointerId !== pointerId) return;

    if (dragStateRef.current.moved) {
      suppressClickRef.current = true;
      window.setTimeout(() => {
        suppressClickRef.current = false;
      }, 0);
    }

    dragStateRef.current = {
      isDragging: false,
      pointerId: null,
      startX: 0,
      startOffset: carouselOffset,
      moved: false
    };
    setIsDraggingCarousel(false);
    pressedArticleSlugRef.current = null;
    document.body.classList.remove('blog-carousel-dragging');
  };

  const handleArticlePointerDown = (slug) => {
    pressedArticleSlugRef.current = slug;
  };

  const handleCarouselPointerDown = (event) => {
    if (!viewportRef.current) return;
    if (event.pointerType === 'mouse' && event.button !== 0) return;

    dragStateRef.current = {
      isDragging: true,
      pointerId: event.pointerId,
      startX: event.clientX,
      startOffset: carouselOffset,
      moved: false
    };

    setIsDraggingCarousel(true);
    document.body.classList.add('blog-carousel-dragging');
    event.currentTarget.setPointerCapture?.(event.pointerId);
  };

  const handleCarouselPointerMove = (event) => {
    const dragState = dragStateRef.current;
    if (!dragState.isDragging || dragState.pointerId !== event.pointerId) return;

    const deltaX = event.clientX - dragState.startX;
    if (Math.abs(deltaX) > 4) {
      dragState.moved = true;
    }

    setCarouselOffset(clampCarouselOffset(dragState.startOffset - deltaX));
  };

  const handleCarouselPointerUp = (event) => {
    const dragState = dragStateRef.current;
    if (
      dragState.isDragging &&
      dragState.pointerId === event.pointerId &&
      !dragState.moved
    ) {
      const article = blogArticles.find((item) => item.slug === pressedArticleSlugRef.current);
      if (article) {
        suppressClickRef.current = true;
        window.setTimeout(() => {
          suppressClickRef.current = false;
        }, 0);
        setActiveArticle(article);
      }
    }

    event.currentTarget.releasePointerCapture?.(event.pointerId);
    endPointerDrag(event.pointerId);
  };

  const handleCarouselPointerCancel = (event) => {
    event.currentTarget.releasePointerCapture?.(event.pointerId);
    endPointerDrag(event.pointerId);
  };

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const handleNativeWheel = (event) => {
      if (window.matchMedia('(pointer: coarse)').matches) return;
      const dominantDelta = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY;
      if (!dominantDelta) return;

      event.preventDefault();
      event.stopPropagation();
      setCarouselOffset((currentOffset) => clampCarouselOffset(currentOffset + dominantDelta));
    };

    viewport.addEventListener('wheel', handleNativeWheel, { passive: false });

    return () => {
      viewport.removeEventListener('wheel', handleNativeWheel);
    };
  }, [clampCarouselOffset]);

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
        <section className="hero-scalar blog-hero-scalar" style={{ minHeight: '40vh' }}>
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
                <h1 className="editorial-section-title">Blog</h1>
              </div>
            </div>
          </div>
        </section>

        <main className="blog-main">
          <section className="blog-carousel-section">
            <div
              className={`blog-carousel-viewport${isDraggingCarousel ? ' is-dragging' : ''}`}
              aria-label="Blog articles"
              tabIndex={0}
              ref={viewportRef}
              onPointerDown={handleCarouselPointerDown}
              onPointerMove={handleCarouselPointerMove}
              onPointerUp={handleCarouselPointerUp}
              onPointerCancel={handleCarouselPointerCancel}
            >
              <div
                className="blog-carousel-track"
                ref={carouselRef}
                style={{
                  transform: `translate3d(${-carouselOffset}px, 0, 0)`,
                  transition: isDraggingCarousel ? 'none' : 'transform 320ms cubic-bezier(0.22, 1, 0.36, 1)'
                }}
              >
                {blogArticles.map((article, index) => (
                  <article
                    key={article.slug}
                    className={`blog-carousel-card blog-carousel-card-${(index % 4) + 1} scroll-card`}
                    data-article-slug={article.slug}
                    role="button"
                    tabIndex={0}
                    style={{ '--slide-delay': `${Math.min(index, 4) * 0.06}s` }}
                    onPointerDown={() => handleArticlePointerDown(article.slug)}
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
