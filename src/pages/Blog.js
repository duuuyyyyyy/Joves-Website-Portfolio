import React, { useState, useEffect } from 'react';

function Blog() {
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    document.title = 'Blog | Portfolio';

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

    const cards = document.querySelectorAll('.blog-card');
    cards.forEach(card => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';
      card.style.transition = 'all 0.6s ease';
      observer.observe(card);
    });

    return () => observer.disconnect();
  }, [showAll]);

  return (
    <>
      {/* Page Header */}
      <section className="page-header">
        <h1>Blog</h1>
        <p>Thoughts, insights, and stories about web development, design, and technology</p>
      </section>

      {/* Main Content */}
      <main>
        
        {/* Blog Grid */}
        <section className="blog-grid">
          
          <article className="blog-card">
            <p className="blog-meta">February 20, 2026</p>
            <h3>My Journey as a Web Developer</h3>
            <p className="blog-excerpt">How I started learning web development, the challenges I faced, and key lessons I learned along the way. This article explores my transition from design to full-stack development.</p>
            <a href="#">Read Article →</a>
          </article>

          <article className="blog-card">
            <p className="blog-meta">February 18, 2026</p>
            <h3>Tips for Building Responsive Websites</h3>
            <p className="blog-excerpt">A comprehensive guide to responsive web design. Learn best practices for creating websites that work seamlessly across all device sizes and screen orientations.</p>
            <a href="#">Read Article →</a>
          </article>

          <article className="blog-card">
            <p className="blog-meta">February 15, 2026</p>
            <h3>Understanding React Hooks</h3>
            <p className="blog-excerpt">Deep dive into React Hooks, including useState, useEffect, and custom hooks. Discover how to write cleaner, more efficient React components with hooks.</p>
            <a href="#">Read Article →</a>
          </article>

          <article className={`blog-card${showAll ? '' : ' blog-hidden'}`}>
            <p className="blog-meta">February 12, 2026</p>
            <h3>CSS Grid vs Flexbox: When to Use Each</h3>
            <p className="blog-excerpt">Understanding the differences between CSS Grid and Flexbox, and when to use each one for optimal layout control and responsive design.</p>
            <a href="#">Read Article →</a>
          </article>

          <article className={`blog-card${showAll ? '' : ' blog-hidden'}`}>
            <p className="blog-meta">February 10, 2026</p>
            <h3>Web Performance Optimization Techniques</h3>
            <p className="blog-excerpt">Practical strategies for improving website performance, including image optimization, code splitting, lazy loading, and caching strategies.</p>
            <a href="#">Read Article →</a>
          </article>

          <article className={`blog-card${showAll ? '' : ' blog-hidden'}`}>
            <p className="blog-meta">February 8, 2026</p>
            <h3>Building Accessible Web Applications</h3>
            <p className="blog-excerpt">A guide to creating inclusive web experiences. Learn about ARIA attributes, semantic HTML, keyboard navigation, and screen reader support.</p>
            <a href="#">Read Article →</a>
          </article>

          <article className={`blog-card${showAll ? '' : ' blog-hidden'}`}>
            <p className="blog-meta">February 5, 2026</p>
            <h3>Node.js Best Practices for APIs</h3>
            <p className="blog-excerpt">Building robust and scalable REST APIs with Node.js. Cover middleware, error handling, authentication, and deployment considerations.</p>
            <a href="#">Read Article →</a>
          </article>

          <article className={`blog-card${showAll ? '' : ' blog-hidden'}`}>
            <p className="blog-meta">February 2, 2026</p>
            <h3>Getting Started with Docker</h3>
            <p className="blog-excerpt">An introduction to containerization with Docker. Learn how to create, build, and deploy containerized applications for consistent environments.</p>
            <a href="#">Read Article →</a>
          </article>

          <article className={`blog-card${showAll ? '' : ' blog-hidden'}`}>
            <p className="blog-meta">January 30, 2026</p>
            <h3>Version Control with Git: Advanced Techniques</h3>
            <p className="blog-excerpt">Going beyond the basics with Git. Master branching strategies, rebasing, cherry-picking, and resolving complex merge conflicts.</p>
            <a href="#">Read Article →</a>
          </article>

        </section>

        {!showAll && (
          <button className="show-more-btn" id="show-more-btn" onClick={() => setShowAll(true)}>Show All Articles</button>
        )}

      </main>
    </>
  );
}

export default Blog;
