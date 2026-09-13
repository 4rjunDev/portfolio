# ADHD Studios — Portfolio

A portfolio site showcasing the iOS apps ADHD Studios has been building — Convoy, GRID, Moody, Deuce (Tennis Trivia), Come Thru, On Loop, Restrung, Inspo, Bookmarked, and Call It.

Built with Next.js 15 (App Router), TypeScript, Tailwind CSS v4, Framer Motion, and Lenis for smooth scroll.

## Running locally

Requires Node 18.18+ (Node 20+ recommended).

```bash
npm install
npm run dev
```

The dev server runs on **port 3008** by default (see `package.json`). Open [http://localhost:3008](http://localhost:3008) in your browser.

To run on a different port:

```bash
PORT=3010 npm run dev
```

### Production build

```bash
npm run build
npm start
```

`npm start` also respects `PORT` (defaults to 3008).

### Project structure

- `src/app` — routes: `/` (home) and `/apps/[slug]` (per-app detail pages)
- `src/components` — UI primitives (hero, nav, app cards, phone mockups, scroll/reveal wrappers)
- `src/data/apps.ts` — hardcoded structured content for every app (no CMS)
- `public/apps/<slug>/` — real screenshots pulled from each app's repo, where available

### Content

Copy is sourced directly from each app's own repo — README/`PROMPT.md`, commit history, and any in-repo screenshots. Apps without committed screenshots render an elegant placeholder phone mockup instead.
