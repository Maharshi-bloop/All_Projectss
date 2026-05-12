# Copilot Instructions for All_Project

## Overview
This repository contains multiple web projects (BioSqueeze, Artham, Envana, etc.) using a consistent HTML/CSS/JavaScript architecture. All new projects should follow these established patterns.

## Project Structure Pattern

Every project uses this standardized folder layout:
```
project-name/
├── index.html                 # Main entry point
├── about-us.html             # Additional pages
├── contact.html
├── [other-pages].html
├── assets/
│   ├── images/              # All image assets
│   ├── js/
│   │   ├── main.js          # Core JavaScript
│   │   ├── components/      # Component-specific JS
│   │   └── page/            # Page-specific JS
│   └── scss/ (or css/)
│       ├── main.css         # Entry point - imports all
│       ├── global/
│       │   └── global.css   # Common styles
│       ├── components/      # Individual component styles
│       └── page/            # Page-specific styles
├── modules/                  # Reusable PHP/component modules
├── page-templates/          # Template files
├── inc/                      # Include files
└── Back-UP/ or assets-**/    # Backup directories (version dated)
```

## HTML Conventions

### Structure
- **Wrapper**: All content in `<div class="pageWrapper">`
- **Layout**: `<header>` → `<main>` → `<footer>` semantic structure
- **Containers**: Use `<div class="container-xl">` for content width control
- **Grid**: Bootstrap grid system (`row`, `col-lg-*`, `col-md-*`)

### Header Pattern
```html
<header>
    <div class="container-xl">
        <div class="headerInner">
            <nav>
                <div class="logo">
                    <a href="#" class="logoImage">
                        <img src="assets/images/logo.svg" alt="">
                    </a>
                </div>
                <div class="headerOption">
                    <ul>
                        <li><a href="#">Menu Item</a></li>
                        <li><a href="#">Dropdown <i class="fa-solid fa-angle-down"></i></a>
                            <ul>
                                <li><a href="#">Sub Item</a></li>
                            </ul>
                        </li>
                    </ul>
                </div>
                <div class="headerCta">
                    <a href="#" class="secondaryBtn">CTA Button</a>
                </div>
            </nav>
        </div>
    </div>
</header>
```

### Section Pattern
- Each section is wrapped: `<section class="sectionName">`
- Content in: `<div class="container-xl"> → <div class="innerBlock">`
- Use descriptive class names: `mainBanner`, `HeadingTextWrapper`, `textImageBlock`

### CSS Classes
- **BEM-inspired naming**: `blockName`, `blockNameInner`, `blockNameContent`
- **Utility classes**: `sectionHeading`, `subHeading`, `description`, `marTop`
- **Button classes**: `primaryBtn`, `secondaryBtn`, `primaryButton`, `secondaryButton`
- **Image containers**: `backImage`, `swiper-image`

### Meta Tags & Links (Essential)
```html
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link rel="stylesheet" href="assets/scss/page/bootstrap.min.css">
<link rel="stylesheet" href="assets/scss/page/jquery.fancybox.css">
<link rel="stylesheet" href="assets/scss/page/aos.css">
<link rel="stylesheet" href="assets/scss/page/swiper-bundle.css">
<link rel="stylesheet" href="assets/scss/page/all.min.css"> <!-- FontAwesome -->
<link rel="stylesheet" href="assets/scss/main.css">
```

## CSS/SCSS Conventions

### Organization
- **main.css**: Entry point, imports all modules via `@import url(global/global.css);`
- **global/**: Common resets, typography, utilities
- **components/**: Individual component styles (one file per component)
- **page/**: Framework libraries (Bootstrap, AOS, Swiper, Fancybox)

### Naming Pattern
- File: `componentName.css` (e.g., `mainBanner.css`, `headingText.css`)
- Class: `componentName`, `componentNameInner`, `componentNameContent`

### Common Components
- `mainBanner.css` - Hero/banner sections
- `headingText.css` - Text with headings
- `imageWithText.css` - Image + text blocks
- `responsive.css` - Media queries

## JavaScript Conventions

### Framework
- **jQuery-based**: Uses jQuery for DOM manipulation
- **Vanilla JS**: For modern features (IntersectionObserver, DOMContentLoaded)
- **Plugins**: AOS, Swiper, Fancybox, jQuery

### Core Patterns in main.js

#### 1. AOS (Animate On Scroll) Initialization
```javascript
AOS.init();
// Or vanilla approach:
document.addEventListener("DOMContentLoaded", function () {
    const elements = document.querySelectorAll("[data-aos]");
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("aos-animate");
            }
        });
    }, { threshold: 0.2 });
    elements.forEach((el) => observer.observe(el));
});
```

#### 2. Sticky Header Function
```javascript
function stickyHeader() {
    var headerHeight = $('header').innerHeight();
    if ($(window).scrollTop() > headerHeight) {
        $('header').addClass('stickyHeader')
    }
    else {
        $('header').removeClass('stickyHeader')
    }
}
stickyHeader();
jQuery(window).on('scroll', function (event) {
    stickyHeader();
});
```

#### 3. Dropdown Menu Detection & Toggle
```javascript
$("nav .headerOption > ul > li").each(function () {
    if ($(this).children("ul").length > 0) {
        $(this).addClass("hasUl");
        $(this).children("ul").addClass("subMenu");
    }
});

$(".toggleBtn").on("click", function () {
    $(".toggleBtn").toggleClass("closeBtn");
    $(".headerOption").toggleClass("openMenu");
})
```

#### 4. Responsive Button/Menu Movement
```javascript
function moveButton() {
    if ($(window).width() < 1025) {
        if (!$('.headerCta').parent().is('.headerOption')) {
            $('.headerCta').appendTo('.headerOption');
        }
        $(".hasUl").on("click", function () {
            $(this).children(".subMenu").stop().slideToggle();
        });
    } else {
        if ($('.headerCta').parent().is('.headerOption')) {
            $('.headerCta').appendTo('.headerCta');
        }
    }
}
moveButton();
$(window).resize(function () {
    moveButton();
});
```

#### 5. Comments Sectioning
```javascript
/* Header js Start */
// ... code ...
/* Header js End */

/* AOS JS */
// ... code ...

/* Grid Layout */
// ... code ...
```

### Event Handling Patterns
- Use `$(window).on('scroll', ...)` for scroll events
- Use `$(window).resize(function() {...})` for responsive checks
- Use `.each()` to process multiple elements
- Use `.on('click', ...)` for click handlers
- Use `.stop().slideToggle()` for animated toggles

### Library Integration
- **AOS**: Initialize at top, use `[data-aos]` attributes in HTML
- **Swiper**: Initialize with `new Swiper('.swiper-container', {...})`
- **Fancybox**: Attach to image links
- **jQuery**: Extensively for DOM manipulation

## Development Workflow

### Starting New Project
1. Create folder structure (see Project Structure Pattern)
2. Create `index.html` from header/main/footer template
3. Create `assets/js/main.js` with core functions (sticky header, menu toggle, AOS init)
4. Create `assets/scss/main.css` with component imports
5. Create individual component CSS files as needed
6. Add content sections using semantic HTML

### CSS Development
- Create one CSS file per visual component
- Import in `main.css` or page-specific files
- Use container-xl wrapper for layout
- Follow existing class naming conventions

### JavaScript Development
- Add functionality to `main.js` with clear section comments
- Use jQuery for DOM manipulation
- Check window width for responsive logic (`$(window).width() < 1025`)
- Initialize plugins in order: AOS → Swiper → Fancybox

### Responsive Breakpoint
- Mobile breakpoint: **1025px** (width < 1025 = mobile behavior)
- Use Bootstrap responsive classes: `col-lg-*`, `col-md-*`, `col-sm-*`

## Common Button Classes
- `.primaryBtn` / `.primaryButton` - Main CTA buttons
- `.secondaryBtn` / `.secondaryButton` - Secondary CTAs
- Pattern: `<a href="#" class="primaryBtn">Text <span><i class="fa-solid fa-arrow-right"></i></span></a>`

## Icon Library
- **FontAwesome**: `fa-solid fa-[icon-name]`
- Used for: arrows, angles, menu icons, etc.
- Link: `assets/scss/page/all.min.css`

## File Naming Convention
- HTML pages: kebab-case (`about-us.html`, `contact-us.html`, `r&d.html`)
- Images: kebab-case with descriptive names (`solution-banner.png`, `logo.svg`)
- CSS/JS files: camelCase (`mainBanner.css`, `headingText.js`)

## Asset Management
- Images in: `assets/images/`
- Favicons & metadata images: `assets/images/`
- Organized by date for backups: `assets-DD-MM-YY/`, `assets-bkp/`

## Key Files to Reference
- **BioSqueeze** (primary reference): `e:/GIT/All_Project/BioSqueeze/` - Most complete implementation
- **Artham** (alternative reference): `e:/Bloop_Work/Artham/` - Similar patterns with variations
- These exemplify all patterns documented above

---

**Last Updated**: November 14, 2025
**Key Projects**: BioSqueeze, Artham, Envana, Draas, RIVITT
