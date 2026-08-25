# Solomon Adeoye — Portfolio

Personal portfolio and case-study site for Solomon Adeoye, a software
developer in Lagos, Nigeria working across React, Next.js, and Laravel.

Built with the Next.js App Router, Tailwind CSS v4, and a minimal
black-and-white editorial design system, with GSAP/Framer Motion for
scroll reveals and micro-interactions.

## Stack

- **Framework** — [Next.js](https://nextjs.org) 16 (App Router, React 19)
- **Styling** — [Tailwind CSS](https://tailwindcss.com) v4, [HeroUI](https://heroui.com) primitives
- **Animation** — [GSAP](https://gsap.com) (`@gsap/react` scroll reveals) + [Framer Motion](https://motion.dev) (micro-interactions, page transitions)
- **Forms** — custom form primitives + `react-phone-number-input` / `libphonenumber-js`
- **Icons** — [lucide-react](https://lucide.dev), [react-icons](https://react-icons.github.io/react-icons) (brand/tech logos)
- **Language** — TypeScript, strict mode

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment variables

Copy `.env` (or create one) with:

| Variable | Required | Purpose |
| --- | --- | --- |
| `GITHUB_TOKEN` | Optional | Powers the GitHub contributions graph on the home page (`app/api/github-contributions`). Without it, that section degrades gracefully. |
| `NEXT_PUBLIC_SITE_URL` | Optional | Canonical URL used for metadata/Open Graph tags. Falls back to the Vercel-provided URL in production, or `localhost:3000` in dev. |

### Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the dev server (Turbopack) |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint |

## Project structure

```
app/                Route segments (App Router) — pages, layouts, API routes
views/               Page-level compositions, one folder per route
  work/detail/          The /work/[slug] case-study page and its sections
components/
  sections/            Larger composed sections (ProjectsGrid, PageHeader, ...)
  reusable/            Small shared primitives (TechBadge, IconTile, CopyButton, ...)
  motion/              Reveal, PageTransition, LoadingScreen
  nav/, footer/, ui/   Chrome and form primitives
data/                Content — the single source of truth for profile, experience,
                     education, stack, services, and projects. No content lives
                     directly in components.
lib/                 Small utilities (classnames, motion easing/variants, fonts,
                     server-only helpers like project-media scanning)
constants/           Routes, nav links, SEO/metadata helpers
schemas/             Form validation schemas
services/            External API calls (e.g. GitHub contributions)
```

### Content conventions

- **`data/*.ts` is the source of truth.** Components read from it; nothing
  is hardcoded in JSX. Files carry comments noting what's verified from the
  CV vs. drafted copy meant to be edited.
- **Project screenshots/clips are drop-in, not hand-wired.** Put image or
  video files in `public/img/work/<project-slug>/` and they show up
  automatically in that project's carousel — no code changes needed.
  Prefix filenames with a number (`01-hero.png`, `02-flow.png`) to control
  order. See `lib/project-media.ts`.
- **`app/work/[slug]/page.tsx`** statically generates one route per entry in
  `data/projects.ts` via `generateStaticParams`.

## Deployment

Deploys cleanly to [Vercel](https://vercel.com) (zero config) or any
Node host that can run `next build` / `next start`.
