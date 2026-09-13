import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { showLab } from "@/lib/flags";
import { ArrowUpRight } from "lucide-react";
import { apps, getApp } from "@/data/apps";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { Reveal } from "@/components/reveal";
import { DuoFrame } from "@/components/duo-frame";
import { PhoneFrame } from "@/components/phone-frame";
import { StackPill } from "@/components/stack-pill";

export function generateMetadata(): Metadata {
  if (!showLab) return {};
  return {
    title: "Lab",
    description: "Experimental renders of ADHD Studios apps on a concept foldable iPhone Duo.",
  };
}

const renders: { slug: string; left: number; right: number; note: string }[] = [
  { slug: "convoy", left: 1, right: 0, note: "Trip list on one pane, live map on the other — no drawer needed when the map has its own screen." },
  { slug: "grid", left: 0, right: 1, note: "Feed stays open while a generation page opens beside it, so ratings and specs sit side by side." },
  { slug: "moody", left: 0, right: 2, note: "The friends feed next to the orbit layout — two of the four design directions at once." },
  { slug: "inspo", left: 3, right: 1, note: "Recent reels alongside the share sheet mid-capture, the way the flow actually feels." },
  { slug: "tennis-trivia", left: 0, right: 0, note: "Live scores and the daily trivia game as a split view, a natural fit for the near-square inner display." },
  { slug: "come-thru", left: 0, right: 0, note: "Tonight's pull-ups on the left, the spot on the map on the right." },
];

export default function Lab() {
  if (!showLab) notFound();
  return (
    <div className="flex flex-1 flex-col">
      <Nav />
      <main className="relative w-full pt-32 pb-24">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[60vh]"
          style={{ background: "radial-gradient(60% 50% at 50% 0%, rgba(255,106,51,0.14) 0%, transparent 70%)" }}
        />

        <div className="mx-auto max-w-6xl px-6 md:px-10">
          <Reveal>
            <p className="mb-3 flex items-center gap-3 text-sm uppercase tracking-[0.2em] text-muted">
              Lab
              <span className="rounded-full border border-accent/40 bg-accent/10 px-2 py-0.5 text-[10px] tracking-[0.15em] text-accent">
                Experimental
              </span>
            </p>
            <h1 className="font-display max-w-3xl text-5xl tracking-tight sm:text-6xl lg:text-7xl">
              The apps on <span className="italic text-muted">iPhone Duo.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
              Concept renders of our apps on a book-style foldable — two phone-proportioned panes that open into a
              near-square inner display. None of this is a shipping device or a shipping layout; it&apos;s how we
              think about what each app would do with a second pane.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-6 flex flex-wrap gap-2">
              {["SwiftUI", "NavigationSplitView", "Size classes", "Concept hardware"].map((t) => (
                <StackPill key={t} name={t} />
              ))}
            </div>
          </Reveal>
        </div>

        <div className="mx-auto mt-20 grid max-w-6xl gap-x-10 gap-y-20 px-6 md:grid-cols-2 md:px-10">
          {renders.map((r, i) => {
            const app = getApp(r.slug)!;
            const left = app.screenshots[r.left];
            const right = app.screenshots[r.right];
            return (
              <Reveal key={r.slug} delay={(i % 2) * 0.1}>
                <div className="px-[6%]">
                  <DuoFrame app={app} left={left} right={right} />
                </div>
                <div className="mt-10 flex items-start justify-between gap-6">
                  <div>
                    <div className="flex items-center gap-3">
                      <span
                        className="h-2 w-2 rounded-full"
                        style={{ background: app.accent, boxShadow: `0 0 10px ${app.accent}` }}
                      />
                      <h2 className="font-display text-2xl">{app.name}</h2>
                      <span className="text-xs uppercase tracking-[0.2em] text-muted">Unfolded</span>
                    </div>
                    <p className="mt-2 max-w-md text-sm leading-relaxed text-muted">{r.note}</p>
                  </div>
                  <Link
                    href={`/apps/${app.slug}`}
                    className="group mt-1 inline-flex shrink-0 items-center gap-1 text-sm text-muted transition-colors hover:text-foreground"
                  >
                    Case study
                    <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </div>
              </Reveal>
            );
          })}
        </div>

        <section className="mx-auto mt-28 max-w-6xl px-6 md:px-10">
          <Reveal>
            <p className="mb-3 text-sm uppercase tracking-[0.2em] text-muted">Folded</p>
            <h2 className="font-display text-3xl tracking-tight sm:text-4xl">Closed, it&apos;s just a phone.</h2>
            <p className="mt-4 max-w-2xl text-muted">
              The cover display is a regular iPhone Pro canvas, so every app runs unchanged. The interesting work is
              what happens when it opens.
            </p>
          </Reveal>
          <div className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-4">
            {["restrung", "on-loop", "bookmarked", "call-it"].map((slug, i) => {
              const app = getApp(slug)!;
              return (
                <Reveal key={slug} delay={i * 0.06}>
                  <div className="px-[10%]">
                    <PhoneFrame app={app} src={app.screenshots[0]} sizes="220px" />
                  </div>
                  <p className="font-display mt-4 text-center text-lg">{app.name}</p>
                </Reveal>
              );
            })}
          </div>
        </section>

        <div className="mx-auto mt-24 max-w-6xl px-6 md:px-10">
          <Reveal>
            <p className="text-sm text-muted">
              {apps.length} apps · renders are CSS, not device photography — proportions follow the iPhone Pro body
              (71.9 × 150 mm) per pane.
            </p>
          </Reveal>
        </div>
      </main>
      <Footer />
    </div>
  );
}
