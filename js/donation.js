/**
 * donation.js
 * Controls donation modal, tab switching (UPI / Bank Transfer),
 * and clipboard copy actions with bilingual feedback.
 */

(function () {
  'use strict';

  function initDonationModule() {
    const modal = document.querySelector('#donationModal');
    const modalBackdrop = document.querySelector('.modal-backdrop');
    const closeButtons = document.querySelectorAll('[data-close-modal]');
    const openButtons = document.querySelectorAll('[data-open-donation-modal]');

    // 1. Open Modal
    function openModal() {
      if (!modal) return;
      modal.classList.add('active');
      modal.setAttribute('aria-hidden', 'false');
      document.body.classList.add('modal-open');

      // Focus first actionable element inside modal
      const firstTab = modal.querySelector('.modal-tab-btn');
      if (firstTab) firstTab.focus();
    }

    // 2. Close Modal
    function closeModal() {
      if (!modal) return;
      modal.classList.remove('active');
      modal.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('modal-open');
    }

    // Bind open triggers
    openButtons.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        // If it's an anchor with a hash on support.html, allow regular anchor behavior unless specified
        const href = btn.getAttribute('href');
        if (href && href.startsWith('#') && href !== '#donationModal') {
          // Let it scroll if on same page
          return;
        }
        e.preventDefault();
        openModal();
      });
    });

    // Bind close triggers
    closeButtons.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        closeModal();
      });
    });

    // Close on backdrop click
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.classList.contains('modal-backdrop')) {
          closeModal();
        }
      });
    }

    // Close on ESC key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
        closeModal();
      }
    });

    // 3. Modal Tabs Switching (UPI vs Bank Details)
    const tabButtons = document.querySelectorAll('.modal-tab-btn');
    tabButtons.forEach((tab) => {
      tab.addEventListener('click', () => {
        const targetTabId = tab.getAttribute('data-tab');
        const parentModal = tab.closest('.donation-modal') || document;

        // Toggle button states
        parentModal.querySelectorAll('.modal-tab-btn').forEach((b) => {
          b.classList.remove('active');
          b.setAttribute('aria-selected', 'false');
        });
        tab.classList.add('active');
        tab.setAttribute('aria-selected', 'true');

        // Toggle panels
        parentModal.querySelectorAll('.modal-tab-panel').forEach((panel) => {
          panel.classList.remove('active');
          panel.setAttribute('aria-hidden', 'true');
        });

        const targetPanel = parentModal.querySelector(`#${targetTabId}`);
        if (targetPanel) {
          targetPanel.classList.add('active');
          targetPanel.setAttribute('aria-hidden', 'false');
        }
      });
    });

    // 4. Copy to Clipboard Functionality
    function copyTextToClipboard(text, btnElement) {
      if (!text) return;

      const currentLang = window.getCurrentLanguage ? window.getCurrentLanguage() : 'en';
      const feedbackText =
        translations && translations[currentLang] && translations[currentLang].validation
          ? translations[currentLang].validation.copySuccess
          : 'Copied!';

      const originalHTML = btnElement.innerHTML;

      function showSuccess() {
        btnElement.classList.add('btn--copied');
        btnElement.innerHTML = `<span>✓ ${feedbackText}</span>`;
        setTimeout(() => {
          btnElement.innerHTML = originalHTML;
          btnElement.classList.remove('btn--copied');
        }, 2200);
      }

      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard
          .writeText(text)
          .then(showSuccess)
          .catch((err) => {
            console.warn('Clipboard write failed, using fallback:', err);
            fallbackCopy(text, showSuccess);
          });
      } else {
        fallbackCopy(text, showSuccess);
      }
    }

    function fallbackCopy(text, onSuccess) {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-9999px';
      textArea.style.top = '0';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        const successful = document.execCommand('copy');
        if (successful && onSuccess) {
          onSuccess();
        }
      } catch (err) {
        console.error('Fallback copy failed:', err);
      }
      document.body.removeChild(textArea);
    }

    // Attach copy event listeners across page and modal
    document.addEventListener('click', (e) => {
      const copyBtn = e.target.closest('[data-copy-target]');
      if (copyBtn) {
        e.preventDefault();
        const targetValue = copyBtn.getAttribute('data-copy-target');
        copyTextToClipboard(targetValue, copyBtn);
      }
    });

    // Expose open function globally if needed
    window.openDonationModal = openModal;
    window.closeDonationModal = closeModal;
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDonationModule);
  } else {
    initDonationModule();
  }
})();
