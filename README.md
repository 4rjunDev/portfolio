# ADHD Studios — Portfolio

A portfolio site showcasing the iOS apps ADHD Studios has been building — Convoy, GRID, Moody, Deuce (Tennis Trivia), Come Thru, On Loop, Restrung, Inspo, Bookmarked, and Call It.

Built with Next.js (App Router), TypeScript, Tailwind CSS v4, Framer Motion, and Lenis for smooth scroll. The whole site is statically exported — no server, so it can be hosted anywhere that serves files, including GitHub Pages for free. All the animations (scroll showcase, dropdown, theme toggle) run client-side and work on a static host.

## Running locally

Requires Node 18.18+ (Node 20+ recommended).

```bash
npm install
npm run dev
```

The dev server runs on **port 3008** by default. Open [http://localhost:3008](http://localhost:3008).

To use a different port:

```bash
PORT=3010 npm run dev
```

### Production build

```bash
npm run build
npm start
```

`npm run build` writes the static site to `out/`; `npm start` serves that folder (also on port 3008 / `$PORT`). This is exactly what gets deployed.

## Hosting on GitHub Pages (free)

Deployment is automated: every push to `main` builds the site and publishes it. One-time setup:

1. **Push the repo to GitHub** (if you haven't already):

   ```bash
   git remote add origin git@github.com:<you>/portfolio.git
   git push -u origin main
   ```

2. **Turn on Pages with the "GitHub Actions" source.** Either run

   ```bash
   gh api -X POST repos/<you>/portfolio/pages -f build_type=workflow
   ```

   or in the browser go to the repo → **Settings → Pages → Build and deployment → Source** and pick **GitHub Actions**.

3. **Push to `main`** (or open **Actions → Deploy to GitHub Pages → Run workflow**). The workflow in [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) installs deps, runs `next build`, and deploys `out/`. First run takes ~1–2 minutes.

4. The site is live at **`https://<you>.github.io/portfolio/`**. The URL is also shown on the finished workflow run and under Settings → Pages.

### How the build knows it's on Pages

Project sites live under a sub-path (`/portfolio`), so the workflow sets `GITHUB_PAGES_BASE_PATH=/portfolio` and [`next.config.ts`](next.config.ts) passes that through as Next's `basePath`. Locally the variable is unset and everything is served from `/`. If you rename the repo, nothing changes — the workflow reads the repo name automatically.

### Using a custom domain

1. Settings → Pages → **Custom domain**, enter the domain, and add the DNS records GitHub shows you.
2. In `deploy.yml`, delete the `GITHUB_PAGES_BASE_PATH` line (a custom domain serves from the root, so no prefix is needed) and change `NEXT_PUBLIC_SITE_URL` to your domain.
3. Push — the next deploy picks it up.

### Link previews (Open Graph)

Sharing a link in iMessage, Slack, X, etc. shows a designed 1200×630 card: `public/og/home.png` for the home page and `public/og/<slug>.png` for each app. The `og:image` URLs are built from `NEXT_PUBLIC_SITE_URL`, so set that to wherever the site is actually served (the Pages workflow does this automatically). The cards are generated with headless Chrome from the site's own fonts and screenshots; regenerate them if an app's screenshots or tagline change.

## Hosting on Vercel (free)

Vercel is the zero-config option for Next.js and its Hobby tier is free for personal sites. Either route works:

**From the dashboard**

1. Sign in at [vercel.com](https://vercel.com) with GitHub and click **Add New → Project**.
2. Import the `portfolio` repo. Vercel detects Next.js; leave the defaults (build `next build`, output `out/` is picked up automatically because of `output: "export"`).
3. Click **Deploy**. You get a `*.vercel.app` URL in about a minute, and every push to `main` redeploys. Pull requests get their own preview URLs.

**From the terminal**

```bash
npm i -g vercel
vercel login
vercel          # first run: links the folder to a new project and deploys a preview
vercel --prod   # deploys to the production URL
```

**Notes**

- Do **not** set `GITHUB_PAGES_BASE_PATH` on Vercel — the site serves from the root there. If both hosts are live at once that's fine; the base path only applies inside the GitHub Actions build.
- Do set `NEXT_PUBLIC_SITE_URL` (project → Settings → Environment Variables) to the Vercel URL or your custom domain so link-preview images resolve correctly.
- Custom domain: project → **Settings → Domains**, add the domain, and follow the DNS instructions (Vercel handles HTTPS).
- Optional: on Vercel you can remove `output: "export"` and `images: { unoptimized: true }` from `next.config.ts` to get Next's on-the-fly image optimization back. It isn't needed — the screenshots are already sized for the frames — but it's there if you want it.
- The GitHub Pages workflow keeps running on every push regardless; delete `.github/workflows/deploy.yml` if you move to Vercel permanently.

### Other static hosts

Because `npm run build` produces plain files in `out/`, the same output also works on Netlify, Cloudflare Pages, or anything that serves a folder.

## Project structure

- `src/app` — routes: `/` (home) and `/apps/[slug]` (per-app case studies)
- `src/components` — hero, sticky scroll showcase, Apps dropdown, phone frames, stack pills, etc.
- `src/data/apps.ts` — hardcoded structured content for every app (no CMS)
- `public/apps/<slug>/` — real screenshots pulled from each app's repo, where available
- `docs/demo.mp4` — screen-recorded walkthrough

## Content

Copy is sourced directly from each app's own repo — README/`PROMPT.md`, commit history, and any in-repo screenshots. Apps without committed screenshots render a designed mock UI screen tinted with the app's accent colour.
