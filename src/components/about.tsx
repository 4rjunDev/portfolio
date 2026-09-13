import { Reveal } from "@/components/reveal";
import { apps } from "@/data/apps";
import { StackPill } from "@/components/stack-pill";

export function About() {
  const stack = Array.from(new Set(apps.flatMap((a) => a.stack)));

  return (
    <section id="about" className="mx-auto max-w-6xl px-6 py-28 md:px-10">
      <div className="grid gap-12 md:grid-cols-[1fr_1.1fr] md:gap-20">
        <div>
          <Reveal>
            <p className="mb-3 text-sm uppercase tracking-[0.2em] text-muted">About</p>
            <h2 className="font-display text-3xl tracking-tight sm:text-4xl">
              Every app here started as a blank Xcode project this year.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 text-base leading-relaxed text-muted sm:text-lg">
              ADHD Studios is an iOS studio that ships fast — moving from idea to a working
              SwiftUI prototype in days, usually backed by Supabase and built with demo modes so
              every app is navigable before the backend is even wired up. Social products, sports
              tools, small utilities — they all share a habit: real commit history, real design
              reviews, and honest status pages instead of vaporware.
            </p>
          </Reveal>
        </div>

        <div>
          <Reveal delay={0.15}>
            <p className="mb-3 text-sm uppercase tracking-[0.2em] text-muted">The toolkit</p>
            <p className="mb-6 text-sm text-muted">
              {stack.length} tools across {apps.length} apps — colour-coded by layer.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="flex flex-wrap gap-2.5">
              {stack.map((t) => (
                <StackPill key={t} name={t} size="md" />
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-[11px] text-muted">
              {[
                ["#f97316", "Swift"],
                ["#3ecf8e", "Backend"],
                ["#60a5fa", "Apple frameworks"],
                ["#2dd4bf", "Maps"],
                ["#e879f9", "APIs & design"],
              ].map(([c, l]) => (
                <span key={l} className="inline-flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full" style={{ background: c }} />
                  {l}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
