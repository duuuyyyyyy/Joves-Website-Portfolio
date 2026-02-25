import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const blogArticles = [
  { slug: 'my-journey-as-a-web-developer', title: 'My Journey as a Web Developer', date: 'February 20, 2026', excerpt: 'How I started learning web development, the challenges I faced, and key lessons I learned along the way.' },
  { slug: 'tips-for-building-responsive-websites', title: 'Tips for Building Responsive Websites', date: 'February 18, 2026', excerpt: 'A comprehensive guide to responsive web design and best practices for all device sizes.' },
  { slug: 'understanding-react-hooks', title: 'Understanding React Hooks', date: 'February 15, 2026', excerpt: 'Deep dive into React Hooks, including useState, useEffect, and custom hooks.' },
  { slug: 'css-grid-vs-flexbox', title: 'CSS Grid vs Flexbox: When to Use Each', date: 'February 12, 2026', excerpt: 'Understanding the differences between CSS Grid and Flexbox for optimal layouts.' },
  { slug: 'web-performance-optimization', title: 'Web Performance Optimization Techniques', date: 'February 10, 2026', excerpt: 'Practical strategies for improving website performance and user experience.' },
  { slug: 'building-accessible-web-applications', title: 'Building Accessible Web Applications', date: 'February 8, 2026', excerpt: 'A guide to creating inclusive web experiences with ARIA and semantic HTML.' },
  { slug: 'nodejs-best-practices', title: 'Node.js Best Practices for APIs', date: 'February 5, 2026', excerpt: 'Building robust and scalable REST APIs with Node.js best practices.' },
  { slug: 'getting-started-with-docker', title: 'Getting Started with Docker', date: 'February 2, 2026', excerpt: 'An introduction to containerization with Docker for consistent environments.' },
  { slug: 'version-control-with-git', title: 'Version Control with Git: Advanced Techniques', date: 'January 30, 2026', excerpt: 'Master branching strategies, rebasing, cherry-picking, and merge conflicts.' },
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
        <div className="hero-orb hero-orb-1" style={{ width: '400px', height: '400px', top: '-10%' }}></div>
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

        {!showAll && (
          <button className="show-more-btn" onClick={() => setShowAll(true)}>Show All Articles</button>
        )}

      </main>
    </>
  );
}

export default Blog;
