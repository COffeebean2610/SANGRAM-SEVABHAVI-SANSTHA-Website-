/**
 * animations.js
 * Subtle editorial scroll animations, intersection observers,
 * and number count-up effects adhering to prefers-reduced-motion.
 */

(function () {
  'use strict';

  function initAnimations() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // If user prefers reduced motion, reveal everything immediately
    if (prefersReducedMotion) {
      document.querySelectorAll('.reveal, .reveal-stagger').forEach((el) => {
        el.classList.add('is-revealed');
      });
      return;
    }

    // 1. Intersection Observer for Scroll Reveals
    const revealObserverOptions = {
      root: null,
      rootMargin: '0px 0px -60px 0px',
      threshold: 0.12
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          // Once revealed, no need to observe again
          observer.unobserve(entry.target);
        }
      });
    }, revealObserverOptions);

    const revealElements = document.querySelectorAll('.reveal, .reveal-stagger, .editorial-image-frame');
    revealElements.forEach((el) => {
      revealObserver.observe(el);
    });

    // 2. Verified Milestone Counter Animation (e.g. 1995)
    const countElements = document.querySelectorAll('[data-count-target]');
    if (countElements.length > 0) {
      const countObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target;
            const targetVal = parseInt(el.getAttribute('data-count-target'), 10);
            if (!isNaN(targetVal)) {
              animateCounter(el, targetVal);
            }
            observer.unobserve(el);
          }
        });
      }, { threshold: 0.5 });

      countElements.forEach((el) => countObserver.observe(el));
    }

    function animateCounter(el, target) {
      const duration = 1600; // ms
      const start = Math.max(0, target - 100);
      const startTime = performance.now();

      function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Ease out quad
        const easeOut = 1 - (1 - progress) * (1 - progress);
        const currentVal = Math.floor(start + (target - start) * easeOut);
        el.textContent = currentVal;

        if (progress < 1) {
          requestAnimationFrame(update);
        } else {
          el.textContent = target;
        }
      }

      requestAnimationFrame(update);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAnimations);
  } else {
    initAnimations();
  }
})();
