# Portfolio Website

Terminal-themed developer portfolio built with Next.js, Tailwind CSS, and Framer Motion.

**Live:** [my-portfolio-website-green-eta.vercel.app](https://my-portfolio-website-green-eta.vercel.app)

## Tech Stack

- **Next.js 16** — static export via App Router
- **Tailwind CSS v4** — styling
- **Framer Motion** — scroll animations
- **tsparticles** — particle background
- **Lucide React** — icons
- **Vercel** — hosting

## Getting Started

```bash
npm install
npm run dev       # http://localhost:3000
npm run build     # static export to /out
npm run lint
```

## Project Structure

```
src/
├── app/                  # Pages and layouts
│   ├── layout.js
│   ├── page.js           # Landing page (all sections)
│   ├── not-found.js
│   └── project/[slug]/
│       └── page.js       # Project detail pages
├── components/
│   ├── layout/           # Navbar, Footer, ThemeToggle
│   ├── sections/         # Hero, About, Experience, Projects, etc.
│   ├── ui/               # TerminalWindow, ProjectCard, ScrollReveal, etc.
│   └── embeds/           # HuggingFace embed
├── data/                 # All site content (projects, skills, experience, etc.)
├── hooks/                # useTheme, useTypewriter
└── lib/                  # Utilities
```

All site content lives in `src/data/` — edit those files to update what the site shows. No component changes needed for content updates.

See [DEVELOPMENT.md](./DEVELOPMENT.md) for detailed guides on making changes.

## Deployment

Deployed on Vercel with auto-deploy on push to `main`.

```bash
# verify locally before pushing
npm run build
npx serve out

# deploy
git add . && git commit -m "your message"
git push origin main
```

## License

MIT
