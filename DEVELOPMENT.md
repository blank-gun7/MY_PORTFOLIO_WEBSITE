# Development Guide

Detailed reference for making changes to the portfolio site.

## File Reference

### Data Files

These are the **only files you need to edit** to update site content. No component changes needed.

#### `src/data/projects.js`

Exports `projects` array. Each project object:

```js
{
  slug: 'my-project',
  title: 'Project Title',
  description: 'Short desc...',
  longDescription: 'Full desc...',
  techStack: ['Python', 'React'],
  category: 'ml-ai',              // 'ml-ai' | 'finance' | 'cv' | 'data' | 'web'
  status: 'live',                  // 'live' | 'in-progress' | 'completed'
  featured: true,
  githubUrl: 'https://...',
  liveUrl: 'https://...',
  huggingfaceUrl: 'https://...',
  metrics: [
    { label: 'Accuracy', value: '99%' },
  ],
  images: [],
  dateRange: 'Jan 2025 – Present',
  order: 1,
}
```

To add a new category, also update the `categories` array in `src/components/sections/Projects.jsx`.

#### `src/data/experiences.js`

Exports `experiences` array:

```js
{
  id: 'company-name',
  role: 'Job Title',
  company: 'Company Name',
  location: 'City',
  dateRange: 'May 2025 – Present',
  type: 'current',                // 'current' = green glow, 'past' = normal
  description: 'One-liner...',
  highlights: ['Did something impressive'],
  techStack: ['Python', 'AWS'],
}
```

#### `src/data/skills.js`

Exports `skills` array:

```js
{
  category: 'ML & AI',
  command: '$ skills --category ml-ai',
  items: ['Deep Learning', 'NLP', 'LLMs'],
}
```

#### `src/data/timeline.js`

Exports `timeline` array:

```js
{
  id: 'unique-id',
  date: '2024',
  title: 'Entry Title',
  description: 'What happened',
  type: 'project',     // 'education' | 'experience' | 'project' | 'leadership' | 'goal'
  status: 'past',      // 'past' | 'present' | 'future'
  icon: 'Rocket',      // Lucide icon name (see iconMap in TimelineNode.jsx)
  link: '/project/my-slug',
}
```

Available icons: `GraduationCap`, `Briefcase`, `Code`, `Rocket`, `FlaskConical`, `Globe`, `Eye`, `TrendingUp`, `Users`, `Handshake`, `GitBranch`, `FileText`

#### `src/data/socials.js`

Exports `socials` array:

```js
{
  platform: 'github',
  url: 'https://github.com/username',
  icon: 'Github',
}
```

#### `src/data/site-config.js`

Central config — site name, typewriter phrases, about stats, section toggles:

```js
{
  name: 'Rana Raunitraz Singh',
  title: 'ML Engineer & Full-Stack Developer',
  url: 'https://my-portfolio-website-green-eta.vercel.app',
  typewriterPhrases: ['> building LLM systems that ship'],
  stats: [{ label: 'Team Size', value: '20+' }],
  sections: {
    hero: true, about: true, experience: true, projects: true,
    skills: true, research: true, timeline: true, resume: true,
    contact: true, blog: false,
  },
}
```

---

## Common Changes

### Add a New Project

1. Add an object to the `projects` array in `src/data/projects.js`
2. Add a `<url>` entry in `public/sitemap.xml`
3. (Optional) Add a timeline entry in `src/data/timeline.js`
4. (Optional) If new category, update `categories` in `src/components/sections/Projects.jsx`
5. Run `npm run build` to verify

### Remove a Project

1. Remove from `src/data/projects.js`
2. Remove from `public/sitemap.xml`
3. Remove any `link` references in `src/data/timeline.js`
4. `npm run build`

### Add a New Experience

Edit `src/data/experiences.js`. Use `type: 'current'` for green glow.

### Add/Remove Skills

Edit `src/data/skills.js`.

### Add a Timeline Entry

Edit `src/data/timeline.js`. Keep entries in chronological order.

### Update Social Links

Edit `src/data/socials.js`.

### Change Hero Text

Edit `src/data/site-config.js` → `typewriterPhrases`, `name`, `title`.

### Toggle a Section On/Off

Edit `src/data/site-config.js` → `sections` object.

### Replace Resume PDF

Replace `public/resume.pdf`. Same filename, no code changes.

### Add OG Image

Place `og-image.png` (1200x630) in `public/images/`.

### Change Site Metadata

Edit `src/app/layout.js` (metadata export, JSON-LD) and `src/data/site-config.js`.

### Change Design Tokens

All tokens are in `src/app/globals.css` — colors, fonts, animations.

### Switch Domain

Update URLs in these 4 files:
1. `src/data/site-config.js` → `url`
2. `src/app/layout.js` → `metadataBase`, `openGraph.url`, JSON-LD
3. `public/robots.txt` → `Sitemap:` URL
4. `public/sitemap.xml` → all `<loc>` URLs

---

## Architecture Notes

**Server vs Client Components:**
- Default is Server Component
- `'use client'` only for hooks, browser APIs, event handlers, or Framer Motion
- `layout.js` and `page.js` are server components

**Dark mode:**
- Class-based (`.dark` on `<html>`)
- Inline script in layout.js prevents flash
- `useTheme` hook syncs with localStorage

**Static export:**
- `output: 'export'` in next.config.mjs
- `generateStaticParams()` pre-renders project pages
- Images use `unoptimized: true`

---

## Quality Checks

```bash
npm run build         # must pass
npm run lint          # 0 errors
npx prettier --write .
npm run dev           # check browser console
```

Manual checks:
- All sections render
- Dark/light mode toggle works
- Mobile layout (375px)
- Project filter tabs
- Project detail pages
- Resume download
- External links open in new tab
- Keyboard navigation works
- No console errors
