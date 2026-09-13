import { Reveal } from "@/components/reveal";
import { apps } from "@/data/apps";

export function About() {
  const stackTally = Array.from(
    new Set(apps.flatMap((a) => a.stack))
  ).slice(0, 10);

  return (
    <section id="about" className="mx-auto max-w-4xl px-6 py-28 md:px-10">
      <Reveal>
        <p className="mb-3 text-sm uppercase tracking-[0.2em] text-muted">About</p>
        <h2 className="mb-8 font-display text-3xl tracking-tight sm:text-4xl">
          Every app here started as a blank Xcode project this year.
        </h2>
      </Reveal>
      <Reveal delay={0.1}>
        <p className="max-w-2xl text-lg leading-relaxed text-muted">
          Hershil is an iOS developer who ships fast — moving from idea to a
          working SwiftUI prototype in days, usually backed by Supabase and
          built with demo modes so every app is navigable before the backend
          is even wired up. The apps span social products, sports tools, and
          small utilities, but they share a habit: real commit history, real
          design reviews, and honest status pages instead of vaporware.
        </p>
      </Reveal>
      <Reveal delay={0.2}>
        <div className="mt-10 flex flex-wrap gap-2">
          {stackTally.map((t) => (
            <span
              key={t}
              className="rounded-full border border-border px-3 py-1.5 text-xs text-muted"
            >
              {t}
            </span>
          ))}
        </div>
      </Reveal>
      <Reveal delay={0.3}>
        <div className="mt-12 flex items-center gap-6 text-sm">
          <a
            href="mailto:hershclaw@gmail.com"
            className="rounded-full bg-foreground px-6 py-3 font-medium text-background transition-transform hover:scale-105"
          >
            hershclaw@gmail.com
          </a>
        </div>
      </Reveal>
    </section>
  );
}
