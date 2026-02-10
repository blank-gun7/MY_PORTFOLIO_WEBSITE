# Rana Raunitraz Singh — Portfolio Website

Terminal-themed developer portfolio showcasing ML/AI engineering and full-stack work.

**Live:** [my-portfolio-website-green-eta.vercel.app](https://my-portfolio-website-green-eta.vercel.app)

---

## Table of Contents

- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [File Reference](#file-reference)
  - [Data Files (Content)](#data-files-content)
  - [Section Components](#section-components)
  - [UI Components](#ui-components)
  - [Layout Components](#layout-components)
  - [Hooks](#hooks)
  - [Pages](#pages)
  - [Config Files](#config-files)
- [How To: Common Changes](#how-to-common-changes)
  - [Add a New Project](#add-a-new-project)
  - [Remove a Project](#remove-a-project)
  - [Add a New Experience](#add-a-new-experience)
  - [Add/Remove Skills](#addremove-skills)
  - [Add a Timeline Entry](#add-a-timeline-entry)
  - [Update Social Links](#update-social-links)
  - [Change Hero Text](#change-hero-text)
  - [Toggle a Section On/Off](#toggle-a-section-onoff)
  - [Update About Stats](#update-about-stats)
  - [Replace Resume PDF](#replace-resume-pdf)
  - [Add OG Image](#add-og-image)
  - [Change Site Metadata](#change-site-metadata)
  - [Change Design Tokens (Colors/Fonts)](#change-design-tokens-colorsfont)
  - [Switch Domain / Update URLs](#switch-domain--update-urls)
- [Deployment](#deployment)
  - [Deploy to Vercel](#deploy-to-vercel)
  - [Redeploy After Changes](#redeploy-after-changes)
  - [Preview Locally Before Deploy](#preview-locally-before-deploy)
- [Quality Checks](#quality-checks)
- [Architecture Notes](#architecture-notes)

---

## Tech Stack

| Tool | Version | Purpose |
|------|---------|---------|
| Next.js | 16.1.6 | React framework, static export |
| React | 19.2.3 | UI library |
| Tailwind CSS | v4 | Utility-first CSS (configured in `globals.css`) |
| Framer Motion | 12.x | Scroll animations, page transitions |
| tsparticles | 3.x | Particle background in hero |
| Lucide React | 0.563.x | Icon library |
| Vercel Analytics | 1.x | Page view tracking |
| Prettier | 3.x | Code formatting |
| ESLint | 9.x | Linting (flat config) |

---

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server (http://localhost:3000)
npm run dev

# Production build (outputs to /out)
npm run build

# Lint
npm run lint

# Format code
npx prettier --write .
```

---

## Project Structure

```
portfolio/
├── public/                     # Static assets (served at /)
│   ├── images/                 # OG image, screenshots
│   ├── resume.pdf              # Downloadable resume
│   ├── robots.txt              # Crawler rules
│   └── sitemap.xml             # SEO sitemap
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── layout.js           # Root layout (fonts, metadata, nav, footer)
│   │   ├── page.js             # Landing page (all 9 sections)
│   │   ├── globals.css         # Tailwind v4 config, design tokens, base styles
│   │   ├── not-found.js        # Custom 404 page
│   │   └── project/[slug]/
│   │       └── page.js         # Dynamic project detail page
│   ├── components/
│   │   ├── layout/             # Navbar, Footer, ThemeToggle
│   │   ├── sections/           # 9 page sections (Hero, About, etc.)
│   │   ├── ui/                 # Reusable UI pieces (TerminalWindow, etc.)
│   │   └── embeds/             # Third-party embeds (HuggingFace)
│   ├── data/                   # ALL CONTENT lives here
│   │   ├── site-config.js      # Site name, URL, stats, section toggles
│   │   ├── projects.js         # Project entries
│   │   ├── experiences.js      # Work experience entries
│   │   ├── skills.js           # Skill categories
│   │   ├── timeline.js         # Timeline entries (past/present/future)
│   │   └── socials.js          # Social links (GitHub, LinkedIn, email)
│   ├── hooks/                  # Custom React hooks
│   │   ├── useTheme.js         # Dark/light mode toggle
│   │   └── useTypewriter.js    # Typing animation
│   └── lib/
│       └── utils.js            # cn() classname helper
├── eslint.config.mjs           # ESLint flat config
├── next.config.mjs             # Next.js config (static export)
├── postcss.config.mjs          # PostCSS (Tailwind plugin)
├── .prettierrc                 # Prettier formatting rules
├── CLAUDE.md                   # AI assistant project rules
└── package.json
```

---

## File Reference

### Data Files (Content)

These are the **only files you need to edit** to update site content. No component changes needed.

#### `src/data/projects.js`

Exports `projects` array. Each project object:

```js
{
  slug: 'my-project',              // URL slug — /project/my-project
  title: 'Project Title',          // Display title
  description: 'Short desc...',    // Card description (2 lines max)
  longDescription: 'Full desc...', // Detail page full description
  techStack: ['Python', 'React'],  // Tech tags shown on card + detail page
  category: 'ml-ai',              // Filter category (see below)
  status: 'live',                  // 'live' | 'in-progress' | 'completed'
  featured: true,                  // Show on main page
  githubUrl: 'https://...',        // GitHub link (null if private)
  liveUrl: 'https://...',          // Live demo link (null if none)
  huggingfaceUrl: 'https://...',   // HuggingFace Space URL (null if none)
  metrics: [                       // Key metrics grid on detail page
    { label: 'Accuracy', value: '99%' },
  ],
  images: [],                      // Image paths (not implemented in v1)
  dateRange: 'Jan 2025 – Present', // Date string
  order: 1,                        // Sort order (lower = first)
}
```

**Valid categories:** `'ml-ai'`, `'finance'`, `'cv'`, `'data'`, `'web'`

These map to the filter tabs in the Projects section. To add a new category, also update the `categories` array in `src/components/sections/Projects.jsx`.

#### `src/data/experiences.js`

Exports `experiences` array. Each experience object:

```js
{
  id: 'company-name',             // Unique ID
  role: 'Job Title',
  company: 'Company Name',
  location: 'City',
  dateRange: 'May 2025 – Present',
  type: 'current',                // 'current' = green glow, 'past' = normal
  description: 'One-liner...',
  highlights: [                   // Bullet points with > prefix
    'Did something impressive',
  ],
  techStack: ['Python', 'AWS'],   // Purple tech tags
}
```

#### `src/data/skills.js`

Exports `skills` array. Each category:

```js
{
  category: 'ML & AI',
  command: '$ skills --category ml-ai',  // Terminal command text
  items: ['Deep Learning', 'NLP', 'LLMs'],
}
```

#### `src/data/timeline.js`

Exports `timeline` array. Each entry:

```js
{
  id: 'unique-id',
  date: '2024',                    // Date label
  title: 'Entry Title',
  description: 'What happened',
  type: 'project',                 // 'education' | 'experience' | 'project' | 'leadership' | 'goal'
  status: 'past',                  // 'past' = muted, 'present' = green glow, 'future' = dimmed/dashed
  icon: 'Rocket',                  // Lucide icon name (see icon map below)
  link: '/project/my-slug',        // Internal link (null if none)
}
```

**Available icons:** `GraduationCap`, `Briefcase`, `Code`, `Rocket`, `FlaskConical`, `Globe`, `Eye`, `TrendingUp`, `Users`, `Handshake`, `GitBranch`, `FileText`

To add a new icon, import it in `src/components/ui/TimelineNode.jsx` and add to the `iconMap` object.

#### `src/data/socials.js`

Exports `socials` array:

```js
{
  platform: 'github',
  url: 'https://github.com/username',
  icon: 'Github',                 // Lucide icon name
}
```

Used in Hero section and Footer.

#### `src/data/site-config.js`

Central configuration:

```js
{
  name: 'Rana Raunitraz Singh',
  title: 'ML Engineer & Full-Stack Developer',
  description: '...',
  url: 'https://my-portfolio-website-green-eta.vercel.app',
  ogImage: '/images/og-image.png',
  typewriterPhrases: [             // Rotating hero text
    '> building LLM systems that ship',
  ],
  stats: [                         // About section stat cards
    { label: 'Team Size', value: '20+' },
  ],
  sections: {                      // Toggle sections on/off
    hero: true,
    about: true,
    experience: true,
    projects: true,
    skills: true,
    research: true,
    timeline: true,
    resume: true,
    contact: true,
    blog: false,                   // Not built yet
  },
}
```

---

### Section Components

All in `src/components/sections/`. Each corresponds to a page section.

| File | Section ID | Terminal Command Header | What It Shows |
|------|-----------|------------------------|---------------|
| `Hero.jsx` | `#hero` | (none — full viewport intro) | Name, typewriter animation, particles, CTA buttons, social icons |
| `About.jsx` | `#about` | `$ cat about.md` | Bio in terminal window, 4-stat grid |
| `Experience.jsx` | `#experience` | `$ cat experience.log` | Work experience cards (current = green glow) |
| `Projects.jsx` | `#projects` | `$ ls projects/` | Filterable project grid with category tabs |
| `Skills.jsx` | `#skills` | `$ skills --list --all` | Skill categories in terminal window |
| `Research.jsx` | `#research` | `$ cat research.md` | IEEE research details in terminal window |
| `Timeline.jsx` | `#timeline` | `$ git log --oneline --graph` | Vertical timeline (past/present/future) |
| `Resume.jsx` | `#resume` | `$ open resume.pdf` | PDF embed (desktop), download button |
| `Contact.jsx` | `#contact` | `$ ping rana` | Social links in terminal window |

---

### UI Components

All in `src/components/ui/`.

| File | Type | Purpose |
|------|------|---------|
| `TerminalWindow.jsx` | Server | Mac-style terminal chrome (red/yellow/green dots, title bar, dark content area) |
| `SectionHeader.jsx` | Server | Green monospace command text + sr-only `<h2>` heading |
| `SkillCategory.jsx` | Server | Single skill category line (green command + items joined by ` · `) |
| `TypeWriter.jsx` | Client | Typing animation with blinking cursor |
| `ScrollReveal.jsx` | Client | Framer Motion fade-in-on-scroll wrapper |
| `ParticleBackground.jsx` | Client | Green neural-network particles (hidden on mobile) |
| `ProjectCard.jsx` | Client | Project card with status badge, tech tags, hover glow |
| `TimelineNode.jsx` | Client | Single timeline entry with icon, status styling, slide-in animation |

---

### Layout Components

All in `src/components/layout/`.

| File | Purpose |
|------|---------|
| `Navbar.jsx` | Fixed top nav with scroll spy, mobile hamburger, theme toggle |
| `Footer.jsx` | Copyright + social icon links |
| `ThemeToggle.jsx` | Sun/Moon toggle button (uses `useTheme` hook) |

---

### Hooks

| File | Export | Purpose |
|------|--------|---------|
| `src/hooks/useTheme.js` | `useTheme()` | Returns `{ theme, toggleTheme, mounted }`. Reads/writes `localStorage`, syncs `.dark` class on `<html>` |
| `src/hooks/useTypewriter.js` | `useTypewriter(phrases, options)` | Returns `{ displayText, isTyping, reducedMotion }`. Typing/deleting animation loop. Static text on `prefers-reduced-motion` |

---

### Pages

| File | Route | Type |
|------|-------|------|
| `src/app/page.js` | `/` | Server — renders all 9 sections |
| `src/app/project/[slug]/page.js` | `/project/:slug` | Server (SSG) — dynamic project detail |
| `src/app/not-found.js` | `/404` | Client — terminal-themed 404 |
| `src/app/layout.js` | (all routes) | Server — root layout with fonts, metadata, JSON-LD, theme script |

---

### Config Files

| File | Purpose |
|------|---------|
| `next.config.mjs` | Static export (`output: 'export'`), unoptimized images |
| `src/app/globals.css` | Tailwind v4 imports, `@theme` design tokens, CSS custom properties for dark/light mode, base styles, animations |
| `postcss.config.mjs` | PostCSS with Tailwind plugin |
| `eslint.config.mjs` | ESLint flat config + Prettier |
| `.prettierrc` | `{ semi: true, singleQuote: true, tabWidth: 2, trailingComma: "es5", printWidth: 100 }` |
| `tailwind.config.js` | Not used (Tailwind v4 uses CSS-based config in `globals.css`) |

---

## How To: Common Changes

### Add a New Project

1. **Edit `src/data/projects.js`** — Add a new object to the `projects` array following the schema above. Give it a unique `slug`.

2. **Edit `public/sitemap.xml`** — Add a new `<url>` entry:
   ```xml
   <url>
     <loc>https://my-portfolio-website-green-eta.vercel.app/project/your-new-slug</loc>
   </url>
   ```

3. **(Optional)** If you want it on the timeline, add an entry in `src/data/timeline.js` with `link: '/project/your-new-slug'`.

4. **(Optional)** If the project uses a new category not in `['ml-ai', 'finance', 'cv', 'data', 'web']`, add it to the `categories` array in `src/components/sections/Projects.jsx`.

5. **Build and verify:**
   ```bash
   npm run build  # Must generate /project/your-new-slug
   ```

That's it. The project detail page is auto-generated from `generateStaticParams()`.

### Remove a Project

1. Remove the object from `src/data/projects.js`
2. Remove the corresponding `<url>` from `public/sitemap.xml`
3. Remove any `link: '/project/slug'` references in `src/data/timeline.js`
4. `npm run build`

### Add a New Experience

Edit `src/data/experiences.js` — Add a new object. Set `type: 'current'` for green glow or `type: 'past'` for normal styling.

### Add/Remove Skills

Edit `src/data/skills.js` — Add items to existing categories or add a new category object.

### Add a Timeline Entry

Edit `src/data/timeline.js` — Add a new object. Key fields:
- `status: 'past'` (muted), `'present'` (green pulsing glow + "NOW" badge), `'future'` (dimmed, dashed border)
- `icon`: must be a Lucide icon name from the `iconMap` in `TimelineNode.jsx`
- `link`: internal link string like `'/project/slug'` or `null`

Keep entries in chronological order for correct visual flow.

### Update Social Links

Edit `src/data/socials.js`. The `icon` must be a Lucide icon name (`Github`, `Linkedin`, `Mail`, `Twitter`, etc.).

### Change Hero Text

Edit `src/data/site-config.js`:
- `typewriterPhrases` — The rotating phrases in the hero
- `name`, `title` — The static hero text

### Toggle a Section On/Off

Edit `src/data/site-config.js` → `sections` object. Set any section to `false` to hide it.

### Update About Stats

Edit `src/data/site-config.js` → `stats` array. Each stat has `{ label, value }`.

### Replace Resume PDF

Replace `public/resume.pdf` with your new PDF. Same filename — no code changes needed.

### Add OG Image

Place a `og-image.png` (1200x630 pixels) in `public/images/`. The metadata in `layout.js` already references `/images/og-image.png`.

### Change Site Metadata

Edit `src/app/layout.js`:
- `metadata` export — title, description, OpenGraph, Twitter cards
- JSON-LD `<script>` — structured data for search engines

Also update `src/data/site-config.js` → `name`, `title`, `description`.

### Change Design Tokens (Colors/Fonts)

All design tokens are in `src/app/globals.css`:

- **Colors:** CSS custom properties in `:root` (light) and `.dark` (dark mode). Then mapped in `@theme inline` to Tailwind class names like `bg-bg-primary`, `text-accent-green`, etc.
- **Accent colors:** Fixed in `@theme` block (not theme-dependent)
- **Fonts:** `--font-jetbrains-mono` (monospace), `--font-inter` (sans)
- **Animations:** `@keyframes` for `cursor-blink`, `pulse-green`, `float`, `gradient-shift`

### Switch Domain / Update URLs

If you switch to a custom domain, update these 4 files:

1. `src/data/site-config.js` → `url`
2. `src/app/layout.js` → `metadataBase`, `openGraph.url`, JSON-LD `url`
3. `public/robots.txt` → `Sitemap:` URL
4. `public/sitemap.xml` → all `<loc>` URLs

---

## Deployment

### Deploy to Vercel

The project is configured for static export (`output: 'export'` in `next.config.mjs`).

1. Push to GitHub
2. Go to [vercel.com](https://vercel.com) → Import your repo
3. Framework: Next.js (auto-detected)
4. Click Deploy

Vercel auto-deploys on every push to `main`.

### Redeploy After Changes

```bash
# 1. Make your changes (usually just data files)
# 2. Verify locally
npm run build
npm run dev  # Check http://localhost:3000

# 3. Commit and push
git add .
git commit -m "Add new project: project-name"
git push origin main

# Vercel auto-deploys within ~60 seconds
```

### Preview Locally Before Deploy

```bash
npm run build      # Generates /out directory
npx serve out      # Serves the static export
# Open the URL shown in terminal
```

---

## Quality Checks

Run before every deploy:

```bash
# Build must pass
npm run build

# Lint must pass (0 errors)
npm run lint

# Format code
npx prettier --write .

# Dev server — check browser console for errors
npm run dev
```

**Lighthouse targets** (run on deployed site in Chrome DevTools):

| Metric | Target |
|--------|--------|
| Performance | >= 90 |
| Accessibility | >= 95 |
| SEO | >= 90 |
| Best Practices | >= 90 |

**Manual verification checklist:**
- [ ] All 9 sections render on landing page
- [ ] Dark mode toggle works and persists on refresh
- [ ] Light mode looks correct
- [ ] Mobile layout (375px width) — hamburger menu, stacked grids
- [ ] Project filter tabs work
- [ ] Clicking a project card opens detail page
- [ ] Project detail page: back button, all content, tech tags
- [ ] Resume download button works
- [ ] All external links open in new tab
- [ ] Tab through entire page — focus rings visible, all interactive elements reachable
- [ ] No console errors

---

## Architecture Notes

**Server vs Client Components:**
- Default is Server Component (no `'use client'`)
- Add `'use client'` only when using hooks, browser APIs, event handlers, or Framer Motion
- `layout.js` and `page.js` are server components — they import client components which handle interactivity

**Data-driven design:**
- ALL content lives in `src/data/*.js`
- Components import data — they never hardcode content
- To change what the site shows, edit data files only

**Dark mode:**
- Class-based: `.dark` on `<html>` element
- Inline `<script>` in layout.js prevents flash of wrong theme on load
- `useTheme` hook syncs state with `localStorage` and DOM class
- CSS: `@custom-variant dark (&:where(.dark, .dark *))` in globals.css

**Static export:**
- `output: 'export'` in next.config.mjs generates static HTML
- `generateStaticParams()` in project/[slug]/page.js pre-renders all project pages
- Images use `unoptimized: true` (required for static export)

**Accessibility:**
- Skip-to-content link in layout.js
- sr-only `<h2>` headings in every section via SectionHeader
- `aria-label` on all icon-only buttons
- Focus rings on interactive elements
- Reduced motion: animations disabled when `prefers-reduced-motion: reduce`
