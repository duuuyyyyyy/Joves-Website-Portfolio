import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const articles = {
  'my-journey-as-a-web-developer': {
    title: 'My Journey as a Web Developer',
    date: 'February 20, 2026',
    content: `How I started learning web development, the challenges I faced, and key lessons I learned along the way. This article explores my transition from design to full-stack development.\n\nStarting out, I had no idea what I was getting into. The world of web development seemed vast and overwhelming. But with each line of code, I found myself more and more drawn to the craft. From building simple HTML pages to creating complex React applications, every step of the journey has been a learning experience.\n\nThe biggest challenge was learning to think like a developer. It's not just about writing code — it's about solving problems, understanding user needs, and creating experiences that are both beautiful and functional.\n\nToday, I combine design thinking with technical expertise to build solutions that make a real difference. And the journey continues.`
  },
  'tips-for-building-responsive-websites': {
    title: 'Tips for Building Responsive Websites',
    date: 'February 18, 2026',
    content: `A comprehensive guide to responsive web design. Learn best practices for creating websites that work seamlessly across all device sizes and screen orientations.\n\nResponsive design is no longer optional — it's a necessity. With users accessing websites from phones, tablets, laptops, and large monitors, your site needs to adapt gracefully to every screen size.\n\nKey principles include mobile-first design, flexible grids, fluid images, and strategic use of media queries. CSS Grid and Flexbox have made responsive layouts more intuitive than ever.\n\nRemember: responsive design isn't just about fitting content on smaller screens. It's about creating the best possible experience for every user, regardless of their device.`
  },
  'understanding-react-hooks': {
    title: 'Understanding React Hooks',
    date: 'February 15, 2026',
    content: `Deep dive into React Hooks, including useState, useEffect, and custom hooks. Discover how to write cleaner, more efficient React components with hooks.\n\nHooks revolutionized the way we write React components. Before hooks, managing state and side effects required class components with complex lifecycle methods. Now, functional components can do everything classes could — and more.\n\nuseState lets you add state to functional components. useEffect handles side effects like API calls, subscriptions, and DOM manipulation. useRef gives you persistent mutable values. And custom hooks let you extract and share logic across components.\n\nThe beauty of hooks is their composability. You can combine simple hooks to create powerful abstractions that keep your components clean and focused.`
  },
  'css-grid-vs-flexbox': {
    title: 'CSS Grid vs Flexbox: When to Use Each',
    date: 'February 12, 2026',
    content: `Understanding the differences between CSS Grid and Flexbox, and when to use each one for optimal layout control and responsive design.\n\nFlexbox is ideal for one-dimensional layouts — arranging items in a row or column. Grid excels at two-dimensional layouts — controlling both rows and columns simultaneously.\n\nUse Flexbox for navigation bars, card rows, centering content, and any layout where items flow in one direction. Use Grid for page layouts, image galleries, dashboard interfaces, and complex multi-column designs.\n\nThe truth is, the best layouts often combine both. Use Grid for the overall page structure and Flexbox for component-level alignment.`
  },
  'web-performance-optimization': {
    title: 'Web Performance Optimization Techniques',
    date: 'February 10, 2026',
    content: `Practical strategies for improving website performance, including image optimization, code splitting, lazy loading, and caching strategies.\n\nPerformance directly impacts user experience and SEO. A one-second delay in page load can reduce conversions by 7%. Here are proven techniques to make your site faster.\n\nImage optimization is often the biggest win. Use modern formats like WebP, implement responsive images with srcset, and lazy load below-the-fold images. Code splitting with dynamic imports reduces initial bundle size.\n\nCaching strategies, CDN usage, and proper compression can dramatically reduce server response times. And don't forget about perceived performance — loading skeletons and progressive content rendering make your site feel faster even before everything loads.`
  },
  'building-accessible-web-applications': {
    title: 'Building Accessible Web Applications',
    date: 'February 8, 2026',
    content: `A guide to creating inclusive web experiences. Learn about ARIA attributes, semantic HTML, keyboard navigation, and screen reader support.\n\nAccessibility isn't just a nice-to-have — it's a responsibility. Over 1 billion people worldwide have some form of disability. Building accessible websites ensures everyone can use your product.\n\nStart with semantic HTML: use proper heading hierarchy, landmark elements, and meaningful link text. Add ARIA attributes where native semantics fall short. Ensure full keyboard navigation — every interactive element should be reachable and operable without a mouse.\n\nTest with screen readers, check color contrast ratios, and validate with automated tools. Accessibility improves the experience for everyone, not just users with disabilities.`
  },
  'nodejs-best-practices': {
    title: 'Node.js Best Practices for APIs',
    date: 'February 5, 2026',
    content: `Building robust and scalable REST APIs with Node.js. Cover middleware, error handling, authentication, and deployment considerations.\n\nNode.js's event-driven architecture makes it ideal for building high-performance APIs. But building production-ready APIs requires more than just handling requests.\n\nStructure your project with clear separation of concerns: routes, controllers, services, and models. Use middleware for cross-cutting concerns like authentication, logging, and error handling.\n\nImplement proper error handling with custom error classes and centralized error middleware. Use environment variables for configuration, implement rate limiting, and always validate input data. For authentication, JWT tokens with refresh token rotation provide a secure, stateless approach.`
  },
  'getting-started-with-docker': {
    title: 'Getting Started with Docker',
    date: 'February 2, 2026',
    content: `An introduction to containerization with Docker. Learn how to create, build, and deploy containerized applications for consistent environments.\n\nDocker solves the "it works on my machine" problem by packaging your application with all its dependencies into a portable container. Every environment — development, staging, production — runs the exact same container.\n\nStart with a Dockerfile that defines your container image. Use docker-compose for multi-container applications. Layer your images efficiently to optimize build times and image sizes.\n\nDocker isn't just for deployment. It's invaluable for development environments, CI/CD pipelines, and testing. Once you start using containers, you'll wonder how you ever worked without them.`
  },
  'version-control-with-git': {
    title: 'Version Control with Git: Advanced Techniques',
    date: 'January 30, 2026',
    content: `Going beyond the basics with Git. Master branching strategies, rebasing, cherry-picking, and resolving complex merge conflicts.\n\nGit is the backbone of modern software development. While most developers know the basics — commit, push, pull — mastering advanced techniques can dramatically improve your workflow.\n\nBranching strategies like Git Flow and trunk-based development help teams collaborate effectively. Interactive rebase lets you clean up your commit history before merging. Cherry-pick allows you to selectively apply specific commits.\n\nWhen merge conflicts arise, understanding three-way merges and using visual diff tools makes resolution straightforward. And git bisect can help you find exactly which commit introduced a bug.`
  }
};

function BlogArticle() {
  const { slug } = useParams();
  const article = articles[slug];

  useEffect(() => {
    document.title = article ? `${article.title} | Blog` : 'Article Not Found | Blog';
    window.scrollTo(0, 0);
  }, [article]);

  if (!article) {
    return (
      <>
        <section className="hero-scalar" style={{ minHeight: '45vh', paddingBottom: '3rem' }}>
          <div className="hero-scalar-content">
            <h1 className="hero-scalar-title">Article Not Found</h1>
          </div>
        </section>
        <main className="container" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
          <p>The article you're looking for doesn't exist.</p>
          <Link to="/blog" className="btn btn-primary" style={{ marginTop: '2rem' }}>Back to Blog</Link>
        </main>
      </>
    );
  }

  return (
    <>
      <section className="hero-scalar" style={{ minHeight: '40vh', paddingBottom: '3rem' }}>
        <div className="hero-orb hero-orb-1" style={{ width: '400px', height: '400px', top: '-10%' }}></div>
        <div className="hero-scalar-content">
          <span className="hero-label">{article.date}</span>
          <h1 className="hero-scalar-title">{article.title}</h1>
        </div>
      </section>

      <main className="blog-article-main">
        <article className="blog-article-content">
          {article.content.split('\n\n').map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </article>
        <div className="blog-article-back">
          <Link to="/blog" className="btn btn-primary">← Back to Blog</Link>
        </div>
      </main>
    </>
  );
}

export default BlogArticle;
