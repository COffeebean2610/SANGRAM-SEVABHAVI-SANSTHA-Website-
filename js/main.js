/**
 * main.js
 * Main initialization script coordinating all subsystems,
 * contact form handling, smooth anchor scrolling, and footer dynamic year.
 */

(function () {
  'use strict';

  function initApp() {
    // 1. Dynamic Year in Footer
    const yearEl = document.querySelector('#currentYear');
    if (yearEl) {
      yearEl.textContent = new Date().getFullYear();
    }

    // 2. Contact Form Handling with Bilingual Feedback
    const contactForm = document.querySelector('#contactForm');
    if (contactForm) {
      contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const lang = window.getCurrentLanguage ? window.getCurrentLanguage() : 'en';
        const t = (translations && translations[lang] && translations[lang].validation) ? translations[lang].validation : {};

        const nameInput = contactForm.querySelector('[name="name"]');
        const emailInput = contactForm.querySelector('[name="email"]');
        const phoneInput = contactForm.querySelector('[name="phone"]');
        const messageInput = contactForm.querySelector('[name="message"]');
        const statusBox = contactForm.querySelector('.form-status-message');

        // Validation
        if (nameInput && !nameInput.value.trim()) {
          showFormFeedback(statusBox, t.requiredName || 'Please enter your name.', 'error');
          nameInput.focus();
          return;
        }

        if (emailInput && !emailInput.value.trim()) {
          showFormFeedback(statusBox, t.requiredEmail || 'Please enter a valid email address.', 'error');
          emailInput.focus();
          return;
        }

        if (phoneInput && !phoneInput.value.trim()) {
          showFormFeedback(statusBox, t.requiredPhone || 'Please enter a valid 10-digit phone number.', 'error');
          phoneInput.focus();
          return;
        }

        if (messageInput && !messageInput.value.trim()) {
          showFormFeedback(statusBox, t.requiredMessage || 'Please enter your message.', 'error');
          messageInput.focus();
          return;
        }

        // Show Success feedback
        showFormFeedback(
          statusBox,
          t.successMessage || 'Thank you! Your inquiry has been sent successfully.',
          'success'
        );

        // Reset form
        contactForm.reset();
      });
    }

    function showFormFeedback(container, message, type) {
      if (!container) {
        alert(message);
        return;
      }
      container.textContent = message;
      container.className = `form-status-message form-status-message--${type} active`;
      container.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

      if (type === 'success') {
        setTimeout(() => {
          container.classList.remove('active');
        }, 6000);
      }
    }

    // 3. Smooth scrolling for internal anchors
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#' || targetId === '#donationModal') return;

        const targetEl = document.querySelector(targetId);
        if (targetEl) {
          e.preventDefault();
          const headerHeight = document.querySelector('.site-header')?.offsetHeight || 80;
          const targetPos = targetEl.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;

          window.scrollTo({
            top: targetPos,
            behavior: 'smooth'
          });
        }
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
  } else {
    initApp();
  }
})();
