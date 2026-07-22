# EventSphere – College Event Discovery Platform

EventSphere is a premium, fully responsive, frontend-only college event discovery platform designed with a clean, modern, and humanized aesthetic (inspired by Apple, Stripe, Notion, and Linear). The platform serves as a showcase for core HTML5, CSS3, and Vanilla JavaScript skills, featuring modular style sheets, decoupled JS components, and custom SVG illustrations with zero external library or framework dependencies.

This is **Project 1** for the **DecodeLabs Internship**.

---

## Key Features

- **Responsive Mobile-First Grids**: Pixel-perfect grid and flexbox layouts tested for mobile ($320\text{px} - 767\text{px}$), tablet ($768\text{px} - 1023\text{px}$), and desktop ($1024\text{px}+$) screens.
- **Glassmorphic Navigation Bar**: A sticky header containing a blurry backdrop blur filter and a dynamic sliding responsive hamburger menu drawer.
- **Dynamic Catalog search & filtering**: A debounced live search bar matching title, descriptions, college, and tags, accompanied by category tabs and sorting dropdowns.
- **In-Memory Registration System**: Interactive registration modal that performs form checks and simulates real-time database reservation by decrementing the seats remaining tag.
- **Live Countdown Clocks**: Individual intervals updating card deadline alerts and visual day/hour/minute/second countdown modules.
- **Favorites System**: A persistent bookmark list that toggles event hearts, saves status via `localStorage`, and updates views automatically.
- **Theme Manager (Dark Mode)**: Fast checking for OS preferred-color-schemes and user overrides saved in local storage to eliminate flash.
- **Vector-Based Maps & Icons**: Tailored SVG grids, category illustrations, maps, and loaders that load instantly and work offline without broken link issues.
- **Smooth Animations**: Clean entry scroll reveals, hover translations, button glows, and heart beating keyframe sequences.

---

## Project Structure

The project code is organized as a decoupled frontend application:

```text
EventSphere/
├── index.html            # Landing page with statistics, categories, and testimonials
├── events.html           # Discover search, filtering, and skeletal loading page
├── event-details.html    # Detailed page displaying timeline, rules, and recommendations
├── about.html            # Core mission, visions, team, and historical milestones
├── contact.html          # Message form, social links, and custom vector map
├── css/
│   ├── style.css         # Global colors, typography imports, variables, and resets
│   ├── components.css    # UI building blocks (cards, accordions, modals, loaders)
│   ├── responsive.css    # Media queries and viewport container adjustments
│   └── animations.css    # Keyframes, hover scales, and scroll reveal transitions
├── js/
│   ├── app.js            # Coordinator initializing scroll observers, modals, and FAQs
│   ├── menu.js           # Handles mobile menu drawers and sticky headers
│   ├── search.js         # Input debouncing and text searching inputs
│   ├── filter.js         # Catalog filtering, sorting selections, and card rendering
│   ├── countdown.js      # Calculates date values and fires card deadline timers
│   ├── darkmode.js       # Syncs body dark-mode toggles and localStorage themes
│   └── favorites.js      # Manages bookmarks arrays in local storage
├── data/
│   └── events.js         # Database of 10 realistic college event objects
└── README.md             # Installation, architectural and usability guidelines
```

---

##Design System & Colors

The typography utilizes Google Fonts' **Inter** for clean readability and **Poppins** for large, spacious headings. Colors are stored in CSS Variables:

- **Primary**: Indigo (`#4F46E5` / hover `#4338CA`)
- **Secondary**: Cyan (`#06B6D4` / hover `#0891B2`)
- **Accent**: Amber (`#F59E0B` / hover `#D97706`)
- **Light Theme Background**: Soft slate off-white (`#F8FAFC`)
- **Dark Theme Background**: Slate space-blue (`#0B1120`)
- **Cards (Dark Theme)**: Deep slate (`#1E293B`)
- **Text (Light Theme)**: Slate-900 (`#0F172A`)
- **Border**: Slate-200 (`#E2E8F0` / dark `#334155`)

---

## Installation & Launch

Since EventSphere is built on native browser standards, it requires no package installations.

1. Clone or download the folder.
2. Open `index.html` directly in any web browser, or launch a local developer server (e.g. VS Code Live Server or python's `http.server` module):
   ```bash
   python -m http.server 8000
   ```
3. Navigate to `http://localhost:8000` to preview.

---

## Accessibility & Standards

- **Semantic HTML**: Structural hierarchy using `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, and `<footer>` containers.
- **Focus Rings**: Standardised visible keyboard focus indicators (`:focus-visible`) for smooth tabbing.
- **Aria Attributes**: Toggled variables (`aria-expanded`, `aria-controls`, `aria-live`) for hamburger states and screen reader announcements.
- **Contrast Ratios**: Follows styling guidelines to guarantee high text contrast against gradient and solid panels.
