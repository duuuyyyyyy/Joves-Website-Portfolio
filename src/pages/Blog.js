import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

const blogArticles = [
  {
    slug: 'my-journey-as-a-web-developer',
    title: 'My Journey as a Web Developer',
    date: 'February 20, 2026',
    excerpt: 'How I started learning web development, the challenges I faced, and key lessons I learned along the way.',
    content:
      "How I started learning web development, the challenges I faced, and key lessons I learned along the way. This article explores my transition from design to full-stack development.\n\nStarting out, I had no idea what I was getting into. The world of web development seemed vast and overwhelming. But with each line of code, I found myself more and more drawn to the craft. From building simple HTML pages to creating complex React applications, every step of the journey has been a learning experience.\n\nThe biggest challenge was learning to think like a developer. It's not just about writing code - it's about solving problems, understanding user needs, and creating experiences that are both beautiful and functional.\n\nToday, I combine design thinking with technical expertise to build solutions that make a real difference. And the journey continues."
  },
  {
    slug: 'tips-for-building-responsive-websites',
    title: 'Tips for Building Responsive Websites',
    date: 'February 18, 2026',
    excerpt: 'A comprehensive guide to responsive web design and best practices for all device sizes.',
    content:
      "A comprehensive guide to responsive web design. Learn best practices for creating websites that work seamlessly across all device sizes and screen orientations.\n\nResponsive design is no longer optional - it's a necessity. With users accessing websites from phones, tablets, laptops, and large monitors, your site needs to adapt gracefully to every screen size.\n\nKey principles include mobile-first design, flexible grids, fluid images, and strategic use of media queries. CSS Grid and Flexbox have made responsive layouts more intuitive than ever.\n\nRemember: responsive design isn't just about fitting content on smaller screens. It's about creating the best possible experience for every user, regardless of their device."
  }
];

function Blog() {
  const [showAll, setShowAll] = useState(false);
  const [activeArticle, setActiveArticle] = useState(null);

  useEffect(() => {
    document.title = 'Blog | Portfolio';
  }, []);

  useEffect(() => {
    document.body.style.overflow = activeArticle ? 'hidden' : 'auto';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [activeArticle]);

  const displayedArticles = showAll ? blogArticles : blogArticles.slice(0, 3);
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
        {activeArticle.content.split('\n\n').map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </div>
    </div>
  ) : null;

  return (
    <>
      <section id="blog" className="page-section blog-page">
        <section className="hero-scalar" style={{ minHeight: '45vh', paddingBottom: '3rem' }}>
          <div className="hero-orb orb-v3 orb-color-4" style={{ top: '-10%', right: '15%' }}></div>
          <div className="hero-orb orb-v4 orb-color-2" style={{ bottom: '10%', left: '20%' }}></div>
          <div className="hero-orb orb-v7 orb-color-5 orb-shape-ellipse orb-anim-wave" style={{ top: '18%', left: '8%' }}></div>
          <div className="hero-orb orb-v6 orb-color-6 orb-shape-blob orb-anim-rise" style={{ bottom: '16%', right: '20%' }}></div>
          <div className="hero-orb orb-v8 orb-color-1 orb-shape-squircle orb-anim-orbit" style={{ top: '40%', right: '40%' }}></div>
          <div className="hero-scalar-content">
            <span className="hero-label">RESOURCES & INSIGHTS</span>
            <h1 className="hero-scalar-title">Blog & Articles</h1>
          </div>
        </section>

        <main className="blog-main">
          <section className={`blog-grid ${showAll ? 'blog-grid-bento' : ''}`}>
            {displayedArticles.map((article, index) => (
              <article
                key={article.slug}
                className={`blog-card ${!showAll && index >= 3 ? 'blog-hidden' : ''}`}
                role="button"
                tabIndex={0}
                onClick={() => setActiveArticle(article)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setActiveArticle(article);
                  }
                }}
              >
                <p className="blog-meta">{article.date}</p>
                <h3>{article.title}</h3>
                <p className="blog-excerpt">{article.excerpt}</p>
                <button
                  type="button"
                  className="blog-read-more link-reset"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveArticle(article);
                  }}
                >
                  Read Article ->
                </button>
              </article>
            ))}
          </section>

          {!showAll && blogArticles.length > 3 && (
            <div className="button-container">
              <button className="show-more-btn" onClick={() => setShowAll(true)}>
                Show All Articles
              </button>
            </div>
          )}
        </main>
      </section>

      {articleModal ? createPortal(articleModal, document.body) : null}
    </>
  );
}

export default Blog;
