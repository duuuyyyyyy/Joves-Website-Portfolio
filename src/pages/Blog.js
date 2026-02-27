import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const blogArticles = [
  { slug: 'my-journey-as-a-web-developer', title: 'My Journey as a Web Developer', date: 'February 20, 2026', excerpt: 'How I started learning web development, the challenges I faced, and key lessons I learned along the way.' },
  { slug: 'tips-for-building-responsive-websites', title: 'Tips for Building Responsive Websites', date: 'February 18, 2026', excerpt: 'A comprehensive guide to responsive web design and best practices for all device sizes.' },
];

function Blog() {
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    document.title = 'Blog | Portfolio';
  }, []);

  const displayedArticles = showAll ? blogArticles : blogArticles.slice(0, 3);

  return (
    <>
      {/* Page Header */}
      <section className="hero-scalar" style={{ minHeight: '45vh', paddingBottom: '3rem' }}>
        {/* Localized Immersive Orbs */}
        <div className="hero-orb orb-v3 orb-color-4" style={{ top: '-10%', right: '15%' }}></div>
        <div className="hero-orb orb-v4 orb-color-2" style={{ bottom: '10%', left: '20%' }}></div>
        <div className="hero-scalar-content">
          <span className="hero-label">RESOURCES & INSIGHTS</span>
          <h1 className="hero-scalar-title">Blog & Articles</h1>
        </div>
      </section>

      {/* Main Content */}
      <main className="blog-main">

        {/* Blog Grid */}
        <section className={`blog-grid ${showAll ? 'blog-grid-bento' : ''}`}>

          {displayedArticles.map((article, index) => (
            <Link
              to={`/blog/${article.slug}`}
              key={article.slug}
              className={`blog-card ${!showAll && index >= 3 ? 'blog-hidden' : ''}`}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <p className="blog-meta">{article.date}</p>
              <h3>{article.title}</h3>
              <p className="blog-excerpt">{article.excerpt}</p>
              <span className="blog-read-more">Read Article →</span>
            </Link>
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
    </>
  );
}

export default Blog;
