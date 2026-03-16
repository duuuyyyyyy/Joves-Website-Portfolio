import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { blogArticles } from '../data/blogArticles';
import { setDocumentMeta } from '../utils/seo';

function BlogArticle() {
  const { slug } = useParams();
  const article = blogArticles.find((item) => item.slug === slug);

  useEffect(() => {
    setDocumentMeta(
      article ? `${article.title} | Blog` : 'Article Not Found | Blog',
      article
        ? `${article.title} by Carla Dulay Joves. ${article.excerpt}`
        : 'The requested blog article could not be found in Carla Dulay Joves portfolio blog.'
    );
    window.scrollTo(0, 0);
  }, [article]);

  if (!article) {
    return (
      <>
        <section className="hero-scalar" style={{ minHeight: '45vh', paddingBottom: '48px' }}>
          <div className="hero-orb orb-v7 orb-color-5 orb-shape-ellipse orb-anim-wave" style={{ top: '-8%', right: '12%' }}></div>
          <div className="hero-orb orb-v8 orb-color-2 orb-shape-blob orb-anim-orbit" style={{ bottom: '12%', left: '16%' }}></div>
          <div className="hero-scalar-content">
            <h1 className="hero-scalar-title">Article Not Found</h1>
          </div>
        </section>
        <main className="container" style={{ textAlign: 'center', padding: '64px 32px' }}>
          <p>The article you&apos;re looking for doesn&apos;t exist.</p>
          <Link to="/blog" className="btn btn-primary" style={{ marginTop: '32px' }}>
            Back to Blog
          </Link>
        </main>
      </>
    );
  }

  return (
    <>
      <section className="hero-scalar" style={{ minHeight: '40vh', paddingBottom: '48px' }}>
        <div className="hero-orb orb-v5 orb-color-1 orb-shape-ellipse" style={{ top: '-10%', right: '12%' }}></div>
        <div className="hero-orb orb-v7 orb-color-5 orb-shape-blob orb-anim-wave" style={{ top: '12%', left: '10%' }}></div>
        <div className="hero-orb orb-v8 orb-color-6 orb-shape-squircle orb-anim-orbit" style={{ bottom: '14%', right: '36%' }}></div>
        <div className="hero-scalar-content">
          <span className="hero-label">{article.date}</span>
          <h1 className="hero-scalar-title">{article.title}</h1>
        </div>
      </section>

      <main className="blog-article-main">
        <article className="blog-article-content">
          <div className="blog-article-meta-row">
            <p className="blog-meta">{article.date}</p>
            <p className="blog-reading-time">{article.readingTime}</p>
          </div>
          <p className="blog-article-lead">{article.excerpt}</p>
          <div className="blog-article-tag-list" aria-label="Article tags">
            {article.tags.map((tag) => (
              <span key={tag} className="blog-article-tag">
                {tag}
              </span>
            ))}
          </div>
          <div className="blog-article-visual">
            <img src={article.articleImage} alt={`${article.title} preview`} className="blog-article-image" />
          </div>
          <div className="blog-article-detail-grid">
            <aside className="blog-article-toc">
              <p className="blog-article-toc-title">Table of contents</p>
              <div className="blog-article-toc-links">
                {article.sections.map((section, index) => (
                  <a key={section.id} href={`#${section.id}`} className="blog-article-toc-link">
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    <span>{section.title}</span>
                  </a>
                ))}
              </div>
            </aside>
            <div className="blog-article-content">
              {article.sections.map((section) => (
                <section key={section.id} id={section.id} className="blog-article-section">
                  <h3>{section.title}</h3>
                  {section.blocks.map((block, index) => {
                    if (block.type === 'list') {
                      return (
                        <ul key={`list-${section.id}-${index}`} className="blog-article-list">
                          {block.items.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      );
                    }

                    if (block.type === 'code') {
                      return (
                        <div key={`code-${section.id}-${index}`} className="blog-code-shell">
                          {block.caption ? <p className="blog-code-caption">{block.caption}</p> : null}
                          <pre className="blog-code-block">
                            <code>{block.snippet}</code>
                          </pre>
                        </div>
                      );
                    }

                    return <p key={`paragraph-${section.id}-${index}`}>{block.text}</p>;
                  })}
                </section>
              ))}
            </div>
          </div>
        </article>
        <div className="blog-article-back">
          <Link to="/blog" className="btn btn-primary">
            Back to Blog
          </Link>
        </div>
      </main>
    </>
  );
}

export default BlogArticle;
