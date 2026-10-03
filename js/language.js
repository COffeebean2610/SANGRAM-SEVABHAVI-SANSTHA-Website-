/**
 * language.js
 * Dedicated language manager for Sangram Sevabhavi Sanstha website.
 * Handles language switching (EN <-> MR), persistence in localStorage,
 * URL query parameter checking, meta tag updating, and UI DOM manipulation.
 */

(function () {
  'use strict';

  const STORAGE_KEY = 'sangram_sanstha_lang';
  const DEFAULT_LANG = 'en';
  const SUPPORTED_LANGS = ['en', 'mr'];

  /**
   * Helper to retrieve nested keys from translations dictionary
   * e.g., getTranslation('nav.home', 'mr')
   */
  function getTranslation(keyPath, lang) {
    if (!translations || !translations[lang]) return null;
    const keys = keyPath.split('.');
    let current = translations[lang];
    for (const key of keys) {
      if (current && typeof current === 'object' && key in current) {
        current = current[key];
      } else {
        return null;
      }
    }
    return current;
  }

  /**
   * Determine initial language from:
   * 1. URL search params (?lang=en or ?lang=mr)
   * 2. localStorage
   * 3. Browser language preference (if Marathi is preferred)
   * 4. Default: 'en'
   */
  function detectInitialLanguage() {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const urlLang = urlParams.get('lang');
      if (urlLang && SUPPORTED_LANGS.includes(urlLang.toLowerCase())) {
        return urlLang.toLowerCase();
      }

      const storedLang = localStorage.getItem(STORAGE_KEY);
      if (storedLang && SUPPORTED_LANGS.includes(storedLang.toLowerCase())) {
        return storedLang.toLowerCase();
      }
    } catch (e) {
      console.warn('Could not read from localStorage or URL:', e);
    }
    return DEFAULT_LANG;
  }

  let currentLanguage = detectInitialLanguage();

  /**
   * Apply translations to the DOM
   */
  function applyTranslations(lang) {
    // 1. Update HTML lang attribute
    document.documentElement.lang = lang;
    document.documentElement.setAttribute('dir', 'ltr');

    // 2. Add/remove CSS typography modifier class
    if (lang === 'mr') {
      document.body.classList.add('lang-mr');
      document.body.classList.remove('lang-en');
    } else {
      document.body.classList.add('lang-en');
      document.body.classList.remove('lang-mr');
    }

    // 3. Update Text Content: [data-i18n]
    const textNodes = document.querySelectorAll('[data-i18n]');
    textNodes.forEach((el) => {
      const key = el.getAttribute('data-i18n');
      const text = getTranslation(key, lang);
      if (text !== null && text !== undefined) {
        el.textContent = text;
      }
    });

    // 4. Update HTML Content (if formatting with tags is needed): [data-i18n-html]
    const htmlNodes = document.querySelectorAll('[data-i18n-html]');
    htmlNodes.forEach((el) => {
      const key = el.getAttribute('data-i18n-html');
      const htmlContent = getTranslation(key, lang);
      if (htmlContent !== null && htmlContent !== undefined) {
        el.innerHTML = htmlContent;
      }
    });

    // 5. Update Placeholders: [data-i18n-placeholder]
    const placeholderNodes = document.querySelectorAll('[data-i18n-placeholder]');
    placeholderNodes.forEach((el) => {
      const key = el.getAttribute('data-i18n-placeholder');
      const text = getTranslation(key, lang);
      if (text) {
        el.setAttribute('placeholder', text);
      }
    });

    // 6. Update Alt texts: [data-i18n-alt]
    const altNodes = document.querySelectorAll('[data-i18n-alt]');
    altNodes.forEach((el) => {
      const key = el.getAttribute('data-i18n-alt');
      const text = getTranslation(key, lang);
      if (text) {
        el.setAttribute('alt', text);
      }
    });

    // 7. Update ARIA Labels: [data-i18n-aria]
    const ariaNodes = document.querySelectorAll('[data-i18n-aria]');
    ariaNodes.forEach((el) => {
      const key = el.getAttribute('data-i18n-aria');
      const text = getTranslation(key, lang);
      if (text) {
        el.setAttribute('aria-label', text);
      }
    });

    // 8. Update Document Title & Meta Description
    const pageMetaKey = document.body.getAttribute('data-page-meta');
    if (pageMetaKey) {
      const translatedTitle = getTranslation(`meta.${pageMetaKey}`, lang);
      if (translatedTitle) {
        document.title = translatedTitle;
      }
    } else {
      const defaultTitle = getTranslation('meta.title', lang);
      if (defaultTitle) {
        document.title = defaultTitle;
      }
    }

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      const desc = getTranslation('meta.description', lang);
      if (desc) {
        metaDescription.setAttribute('content', desc);
      }
    }

    // 9. Update Language Switcher UI buttons active state
    updateSwitcherUI(lang);

    // 10. Dispatch Custom Event for other modules
    window.dispatchEvent(
      new CustomEvent('sansthaLanguageChanged', { detail: { lang: lang } })
    );
  }

  /**
   * Update visual states of all language buttons across desktop & mobile
   */
  function updateSwitcherUI(lang) {
    const buttons = document.querySelectorAll('[data-lang-btn]');
    buttons.forEach((btn) => {
      const targetLang = btn.getAttribute('data-lang-btn');
      const isActive = targetLang === lang;
      btn.classList.toggle('active', isActive);
      btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
    });
  }

  /**
   * Public function to change language with subtle transition
   */
  window.setLanguage = function (newLang) {
    if (!SUPPORTED_LANGS.includes(newLang) || newLang === currentLanguage) {
      updateSwitcherUI(newLang);
      return;
    }

    // Subtle fade transition
    document.body.classList.add('lang-transitioning');

    setTimeout(() => {
      currentLanguage = newLang;
      try {
        localStorage.setItem(STORAGE_KEY, newLang);
      } catch (e) {
        console.warn('Failed to save language in localStorage:', e);
      }

      // Update URL query param without full page reload
      try {
        const url = new URL(window.location.href);
        url.searchParams.set('lang', newLang);
        window.history.replaceState({}, '', url.toString());
      } catch (e) {
        // Fallback for older browsers
      }

      applyTranslations(newLang);

      setTimeout(() => {
        document.body.classList.remove('lang-transitioning');
      }, 50);
    }, 150);
  };

  /**
   * Getter for current language
   */
  window.getCurrentLanguage = function () {
    return currentLanguage;
  };

  /**
   * Initialize language system on DOMContentLoaded
   */
  function init() {
    // Bind click events on all language buttons
    document.addEventListener('click', (e) => {
      const langBtn = e.target.closest('[data-lang-btn]');
      if (langBtn) {
        e.preventDefault();
        const selected = langBtn.getAttribute('data-lang-btn');
        if (selected) {
          window.setLanguage(selected);
        }
      }
    });

    // Apply translations on load
    applyTranslations(currentLanguage);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
