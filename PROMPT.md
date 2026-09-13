# Original brief

Build a beautiful portfolio site showcasing the ~8 iOS apps ADHD Studios has been building. Modern stack, thoughtful animations, mildly dynamic (not overdone).

Branding note: the site is published under the studio name "ADHD Studios" rather than a personal name.

## Reference style

Pointed at "spacefs" as the visual/tech reference — a dark, editorial, Framer-Motion-driven portfolio aesthetic. (No definitive site by that name was found via web search at build time; the design instead follows the detailed fallback spec below: dark-mode-first, serif/sans pairing, mesh-gradient hero, restrained scroll-triggered reveals.)

## Content — discovery

All content in `src/data/apps.ts` was sourced by reading each app's own repo under `/Users/hershil/Documents/` — `PROMPT.md`/`README.md`, `git log`, and any committed screenshots — rather than invented. Apps covered: Convoy, GRID, Moody, Deuce (Tennis Trivia), Come Thru, On Loop, Restrung, Inspo iOS, Bookmarked, Call It.

## Tech stack

- Next.js 15/16 App Router + TypeScript
- Tailwind CSS v4
- Framer Motion for entry animations, scroll-triggered reveals, layout transitions
- Lenis for smooth scroll
- next/font (Fraunces display serif + Inter sans)
- Dark mode default, with `data-theme` hooks for a light-mode override

## Structure

- Hero — name, tagline, animated mesh-gradient background, parallax on scroll
- Apps grid (`/#work`) — one row per app, phone-mockup thumbnail, hover lift
- App detail (`/apps/[slug]`) — full case-study page per app, real or placeholder screenshots, features, stack, status
- About/Contact — bio, tech tally, email
- Footer

## Non-goals

No CMS, no blog, no live iOS previews — screenshots (real where committed, elegant placeholder mockups otherwise) stand in for live previews.

## Running

See [README.md](./README.md). Dev server defaults to port 3008.
