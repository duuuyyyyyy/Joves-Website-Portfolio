import React, { useEffect, useState } from 'react';

// Scrolls the given element to its top, or the page when no scrollRef is passed.
function ScrollToTopButton({ scrollRef, threshold = 300, className = '', label = 'Scroll to top' }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const target = scrollRef?.current || window;
    const getScrollTop = () => (target === window ? window.scrollY : target.scrollTop);
    const handleScroll = () => setVisible(getScrollTop() > threshold);

    handleScroll();
    target.addEventListener('scroll', handleScroll, { passive: true });
    return () => target.removeEventListener('scroll', handleScroll);
  }, [scrollRef, threshold]);

  const scrollToTop = () => {
    const target = scrollRef?.current || window;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    target.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
  };

  return (
    <button
      type="button"
      className={`scroll-top-btn ${className}${visible ? ' visible' : ''}`}
      onClick={scrollToTop}
      aria-label={label}
      tabIndex={visible ? 0 : -1}
    >
      <span aria-hidden="true">&uarr;</span>
    </button>
  );
}

export default ScrollToTopButton;
