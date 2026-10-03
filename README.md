# SANGRAM SEVABHAVI SANSTHA
### Pimpalner, Beed, Maharashtra | Established 19 June 1995

> **"Empowering Communities, Transforming Lives"**  
> **"वंचितांच्या विकासासाठी समर्पित सेवाभावी कार्य"**

---

## 1. Project Overview & Architecture

This repository contains the complete, production-ready institutional website for **Sangram Sevabhavi Sanstha** (Pimpalner, Beed, Maharashtra).

The website has been architected with a **modern editorial aesthetic** inspired by premium educational and institutional websites (such as Elpro Schools), while featuring a 100% original design language, color palette, and bespoke typography for both **English** and **Marathi**.

### Technology Stack:
- **HTML5**: Semantic tags (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`, `<dialog>`-pattern modal).
- **CSS3**: Custom design tokens, CSS Grid, Flexbox, fluid typography (`clamp()`), and responsive layouts with zero horizontal scroll.
- **Vanilla JavaScript**: Lightweight native scripts for complete bilingual translation, sticky scroll navigation, mobile drawer menu, modal dialogs, and clipboard copy operations.
- **Typography**: Google Fonts combination of `DM Serif Display`, `Inter`, `Noto Serif Devanagari`, and `Noto Sans Devanagari`.
- **Zero Framework Bloat**: No React, Vue, Angular, Tailwind, Bootstrap, or jQuery.

---

## 2. File & Directory Structure

```
d:/projects/SANGRAM SEVABHAVI SANSTHA/
├── index.html                  # Homepage (12-step institutional narrative flow)
├── about.html                  # About Us, History, Timeline, Registration & Legal details
├── work.html                   # 5 Focus Areas (Education, Social, Community, Health, CSR)
├── vision-mission.html         # Detailed Vision and Mission (English & Marathi)
├── team.html                   # Leadership (Founder, President, Secretary)
├── support.html                # Support / Donation details, UPI, QR Code, 80G/12AB info
├── contact.html                # Contact cards, WhatsApp, Email, Location & Inquiry Form
│
├── css/
│   ├── style.css               # Design tokens, typography, components, tables, modals
│   ├── responsive.css          # Breakpoints (1440px, 1024px, 768px, 480px, 360px)
│   └── animations.css          # IntersectionObserver reveals, keyframes, reduced-motion
│
├── js/
│   ├── translations.js         # Comprehensive English & Marathi dictionary
│   ├── language.js             # Language switching engine (?lang=, localStorage, DOM)
│   ├── navigation.js           # Sticky header, mobile drawer menu, active link highlight
│   ├── animations.js           # Scroll triggers & counter animations
│   ├── donation.js             # Donation modal, tabs (UPI/Bank), clipboard copy feedback
│   └── main.js                 # Contact form validation, anchor scrolling, dynamic year
│
├── assets/
│   ├── images/
│   │   ├── hero/               # Hero section visual artwork (hero-community.svg)
│   │   ├── about/              # Institutional heritage seal (about-sanstha.svg)
│   │   ├── vision/             # Vision section background (vision.png)
│   │   ├── Focus Areas/        # 5 Focus area high-res assets (Education.png, Social Development.png, etc.)
│   │   ├── team/               # Leadership portraits (founder.svg, president.svg, secretary.svg)
│   │   └── donation/           # Donation QR code vector (donation-qr.svg)
│   │
│   └── icons/
│       └── favicon.png         # Institutional favicon PNG
│
└── README.md                   # Full documentation and deployment guide
```

---

## 3. Bilingual Language System (EN ⇄ मराठी)

The website features a **native JavaScript translation system** supporting complete English and Marathi experiences:

- **Switching**: Click **[ EN ]** or **[ मराठी ]** in the navbar or mobile drawer.
- **No Page Reload**: The interface text changes instantly via data attributes (`data-i18n`, `data-i18n-alt`, `data-i18n-placeholder`, `data-i18n-aria`).
- **Persistence**: Remembers your preferred language in `localStorage`.
- **URL Support**: Accepts `?lang=en` or `?lang=mr` query parameters.
- **Devanagari Typography**: Automatically toggles the `.lang-mr` class on `<body>` to apply `Noto Serif Devanagari` and `Noto Sans Devanagari` with adjusted line heights.

---

## 4. Exact Client Information (Source of Truth)

- **Organization Name**: Sangram Sevabhavi Sanstha Pimpalner
- **Trust Registration No.**: `Maha/491/95 Beed`
- **Foundation Date**: 19-06-1995 (19 June 1995)
- **Founder**: Late Pralhad Baburao Palve (तात्या)
- **President**: Smt. Janabai Pralhad Palve
- **Secretary**: Mr. Rajkumar Pralhad Palve
- **PAN**: `AARTS3047G`
- **NGO Darpan ID**: `MH/2024/0454743`
- **12 AB Unique Reg.**: `AARTS3047GEPN01`
- **80 G Tax Exemption**: `AARTS3047GFPN02`
- **CSR Registration No.**: `CSR00117140`
- **Registered Address**: At. Pimpalner, Tal. Shirur Kasar, Dist. Beed, Maharashtra
- **WhatsApp**: `9673294009` (Direct link: `https://wa.me/919673294009`)
- **Email**: `sangramsevica9009@gmail.com`
- **UPI ID**: `sangramsevabhavisanstha@ibl`
- **Bank Details**:
  - **Account Name**: Sangram sevabhavi sanstha
  - **Bank**: Maharashtra Gramin Bank
  - **Branch**: Shirur Kasar
  - **Account No.**: `80064322597`
  - **IFSC Code**: `MAHG0004538`

---

## 5. Local Setup & Testing Instructions

### Option 1: Direct File Opening (No server required)
You can directly double-click `index.html` in your file explorer to open the website in Google Chrome, Microsoft Edge, Mozilla Firefox, or Safari.

### Option 2: Using VS Code Live Server
1. Open the project folder in VS Code.
2. Right-click `index.html` and click **"Open with Live Server"**.

### Option 3: Using Node `npx serve` or Python Simple Server
In terminal:
```bash
# Using Python
python -m http.server 8000

# OR using npx
npx serve .
```
Visit `http://localhost:8000` in your browser.

---

## 6. How to Replace Images & Graphics

To replace any placeholder image with your real high-resolution photographs:

1. **Hero Image**: Place your JPG/PNG/WebP photo in `assets/images/hero/` (e.g. `hero-community.jpg`), then in `index.html` update:
   ```html
   <img src="assets/images/hero/hero-community.jpg" ...>
   ```
2. **Team Member Photos**: Place real portrait photos into `assets/images/team/`:
   - `assets/images/team/founder.jpg`
   - `assets/images/team/president.jpg`
   - `assets/images/team/secretary.jpg`
3. **Donation QR Code**: Place your bank-issued UPI QR code in `assets/images/donation/donation-qr.png`.
4. **Work Focus Photos**: Add images to `assets/images/work/` for education, community, healthcare, etc.

---

## 7. How to Update Organization Details or Translations

All text strings are stored in `js/translations.js`.

To modify any text:
1. Open `js/translations.js`.
2. Locate the corresponding key under `en` (English) or `mr` (Marathi).
3. Save the file. All HTML pages will automatically display the updated text.

---

## 8. How to Deploy to Hostinger / cPanel

### Deployment on Hostinger (hPanel):
1. Log in to your Hostinger control panel (**hPanel**).
2. Go to **Websites** → Select your domain → Click **Manage**.
3. Open **File Manager** and navigate into `public_html`.
4. Upload all files and folders (`index.html`, `about.html`, `css/`, `js/`, `assets/`, etc.) directly into `public_html`.
5. Ensure `index.html` is located directly in `public_html` (not in a subfolder).
6. Enable **Free SSL (HTTPS)** in Hostinger under the **SSL** tab.

### Deployment on Traditional cPanel:
1. Log in to your cPanel.
2. Go to **File Manager** → Open `public_html/`.
3. Click **Upload** → Upload all project files.
4. Verify file permissions (`644` for HTML/CSS/JS files, `755` for folders).
5. Open your domain in any browser to verify.

---

## 9. Accessibility & Browser Compatibility
- **WCAG 2.1 AA Compliant**: Proper semantic hierarchy, contrast ratios, and screen-reader accessibility (`aria-label`, `aria-modal`, `aria-hidden`).
- **Responsive**: Tested on mobile (360px–430px), tablet (768px–912px), and desktop (1024px–1440px+).
- **Reduced Motion**: Automatically respects system `prefers-reduced-motion` settings.
