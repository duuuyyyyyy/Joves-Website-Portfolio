import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { blogArticles } from '../data/blogArticles';

function Blog() {
  const [activeArticle, setActiveArticle] = useState(null);
  const [carouselOffset, setCarouselOffset] = useState(0);
  const [isDraggingCarousel, setIsDraggingCarousel] = useState(false);
  const viewportRef = useRef(null);
  const carouselRef = useRef(null);
  const modalContentRef = useRef(null);
  const metricsRef = useRef({ step: 260, maxOffset: 0 });
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
    metricsRef.current = { step, maxOffset };
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

  const scrollToArticleSection = useCallback((sectionId) => {
    const section = modalContentRef.current?.querySelector(`[data-article-section="${sectionId}"]`);
    section?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  const renderArticleBlock = (block, index) => {
    if (block.type === 'list') {
      return (
        <ul className="blog-article-list" key={`list-${index}`}>
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      );
    }

    if (block.type === 'code') {
      return (
        <div className="blog-code-shell" key={`code-${index}`}>
          {block.caption ? <p className="blog-code-caption">{block.caption}</p> : null}
          <pre className="blog-code-block">
            <code>{block.snippet}</code>
          </pre>
        </div>
      );
    }

    return <p key={`paragraph-${index}`}>{block.text}</p>;
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

  useEffect(() => {
    if (activeArticle && modalContentRef.current) {
      modalContentRef.current.scrollTop = 0;
    }
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
    if (dragState.isDragging && dragState.pointerId === event.pointerId && !dragState.moved) {
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
    <div className="project-modal active" onClick={(e) => e.target === e.currentTarget && setActiveArticle(null)}>
      <div
        ref={modalContentRef}
        className="project-modal-content blog-article-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="blog-article-title"
      >
        <button className="project-modal-close" onClick={() => setActiveArticle(null)} aria-label="Close article">
          x
        </button>
        <div className="blog-article-meta-row">
          <p className="blog-meta">{activeArticle.date}</p>
          <p className="blog-reading-time">{activeArticle.readingTime}</p>
        </div>
        <h2 id="blog-article-title">{activeArticle.title}</h2>
        <p className="blog-article-lead">{activeArticle.excerpt}</p>
        <div className="blog-article-tag-list" aria-label="Article tags">
          {activeArticle.tags.map((tag) => (
            <span key={tag} className="blog-article-tag">
              {tag}
            </span>
          ))}
        </div>
        <div className="blog-article-visual">
          <img src={activeArticle.articleImage} alt={`${activeArticle.title} preview`} className="blog-article-image" />
        </div>
        <div className="blog-article-detail-grid">
          <aside className="blog-article-toc">
            <p className="blog-article-toc-title">Table of contents</p>
            <div className="blog-article-toc-links">
              {activeArticle.sections.map((section, index) => (
                <button
                  key={section.id}
                  type="button"
                  className="blog-article-toc-link"
                  onClick={() => scrollToArticleSection(section.id)}
                >
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <span>{section.title}</span>
                </button>
              ))}
            </div>
          </aside>
          <div className="blog-article-content">
            {activeArticle.sections.map((section) => (
              <section key={section.id} className="blog-article-section" data-article-section={section.id}>
                <h3>{section.title}</h3>
                {section.blocks.map((block, blockIndex) => renderArticleBlock(block, blockIndex))}
              </section>
            ))}
          </div>
        </div>
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
                Portfolio build notes, frontend decisions, deployment workflow, and lessons learned from the work inside this repository.
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
                        <img src={article.thumbnailImage} alt={`${article.title} preview`} className="blog-carousel-image" draggable="false" />
                      </div>
                      <div className="blog-carousel-card-footer">
                        <div className="blog-carousel-card-copy">
                          <span className="blog-carousel-chip">{article.cardLabel}</span>
                          <h3 className="blog-carousel-title">{article.title}</h3>
                          <div className="blog-carousel-meta-row">
                            <span>{article.readingTime}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
            <div className="blog-carousel-controls">
              <button type="button" className="blog-carousel-nav blog-carousel-nav-prev" aria-label="Show previous blog cards" onClick={() => scrollCarouselBy(-1)}>
                <span aria-hidden="true">&larr;</span>
                <span>Previous</span>
              </button>
              <button type="button" className="blog-carousel-nav blog-carousel-nav-next" aria-label="Show next blog cards" onClick={() => scrollCarouselBy(1)}>
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
