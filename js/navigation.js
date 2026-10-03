/**
 * navigation.js
 * Header, Navbar scroll behavior, Mobile drawer, and Active navigation states.
 */

(function () {
  'use strict';

  function initNavigation() {
    const navbar = document.querySelector('.site-header');
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const mobileDrawer = document.querySelector('.mobile-drawer');
    const mobileBackdrop = document.querySelector('.mobile-drawer-backdrop');
    const closeDrawerBtn = document.querySelector('.mobile-drawer-close');
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
    const backToTopBtn = document.querySelector('.back-to-top');

    // 1. Sticky Header & Scroll Transition
    function handleScroll() {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      if (navbar) {
        if (scrollY > 40) {
          navbar.classList.add('header--scrolled');
        } else {
          navbar.classList.remove('header--scrolled');
        }
      }

      if (backToTopBtn) {
        if (scrollY > 400) {
          backToTopBtn.classList.add('visible');
        } else {
          backToTopBtn.classList.remove('visible');
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    // 2. Mobile Drawer Open/Close
    function openDrawer() {
      if (!mobileDrawer) return;
      mobileDrawer.classList.add('active');
      if (mobileBackdrop) mobileBackdrop.classList.add('active');
      if (mobileToggle) {
        mobileToggle.setAttribute('aria-expanded', 'true');
        mobileToggle.classList.add('is-open');
      }
      document.body.classList.add('menu-open');
    }

    function closeDrawer() {
      if (!mobileDrawer) return;
      mobileDrawer.classList.remove('active');
      if (mobileBackdrop) mobileBackdrop.classList.remove('active');
      if (mobileToggle) {
        mobileToggle.setAttribute('aria-expanded', 'false');
        mobileToggle.classList.remove('is-open');
      }
      document.body.classList.remove('menu-open');
    }

    if (mobileToggle) {
      mobileToggle.addEventListener('click', (e) => {
        e.preventDefault();
        const isOpen = mobileDrawer && mobileDrawer.classList.contains('active');
        if (isOpen) {
          closeDrawer();
        } else {
          openDrawer();
        }
      });
    }

    if (closeDrawerBtn) {
      closeDrawerBtn.addEventListener('click', (e) => {
        e.preventDefault();
        closeDrawer();
      });
    }

    if (mobileBackdrop) {
      mobileBackdrop.addEventListener('click', closeDrawer);
    }

    // Close drawer when clicking any nav link
    const mobileLinks = document.querySelectorAll('.mobile-drawer .nav-link, .mobile-drawer .btn');
    mobileLinks.forEach((link) => {
      link.addEventListener('click', () => {
        closeDrawer();
      });
    });

    // Close drawer on ESC key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileDrawer && mobileDrawer.classList.contains('active')) {
        closeDrawer();
      }
    });

    // 3. Highlight Active Navigation Item
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    navLinks.forEach((link) => {
      const href = link.getAttribute('href');
      if (href) {
        const linkPath = href.split('?')[0].split('#')[0];
        if (
          linkPath === currentPath ||
          (currentPath === '' && linkPath === 'index.html') ||
          (currentPath === 'index.html' && linkPath === './')
        ) {
          link.classList.add('active');
          link.setAttribute('aria-current', 'page');
        } else {
          link.classList.remove('active');
          link.removeAttribute('aria-current');
        }
      }
    });

    // 4. Back to Top Smooth Scroll
    if (backToTopBtn) {
      backToTopBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initNavigation);
  } else {
    initNavigation();
  }
})();
