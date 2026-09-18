import Link from "next/link";
import { apps } from "@/data/apps";
import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";

export function EthosPill({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent/[0.07] px-2.5 py-1 text-[10px] uppercase tracking-[0.15em] text-accent",
        className
      )}
    >
      <span className="h-1 w-1 rounded-full bg-accent" />
      Quiet social
    </span>
  );
}

const pairs: [string, string][] = [
  ["Passive presence", "active posting"],
  ["Ambient intimacy", "engagement metrics"],
  ["People who know you", "an audience"],
];

export function Ethos() {
  const thread = apps.filter((a) => a.ethos);

  return (
    <section id="ethos" className="relative mx-auto max-w-6xl px-6 py-28 md:px-10 md:py-36">
      <div className="grid gap-12 md:grid-cols-[1fr_1.25fr] md:gap-20">
        <div className="md:sticky md:top-28 md:self-start">
          <Reveal>
            <p className="mb-4 flex items-center gap-3 text-sm uppercase tracking-[0.2em] text-muted">
              Ethos <EthosPill />
            </p>
            <h2 className="font-display text-4xl leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
              The layer <span className="italic text-muted">beneath</span> the feed.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <dl className="mt-10 space-y-3 text-sm">
              {pairs.map(([yes, no]) => (
                <div key={yes} className="flex flex-wrap items-baseline gap-x-2">
                  <dt className="text-foreground">{yes}</dt>
                  <dd className="text-muted">
                    over <span className="line-through decoration-muted/50">{no}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        <div className="space-y-7 text-lg leading-relaxed text-foreground/85 sm:text-xl sm:leading-relaxed">
          <Reveal>
            <p>
              Most social apps are a stage. Every post is a small performance, tuned for a crowd you mostly
              don&apos;t know. It&apos;s fine. It&apos;s also exhausting, and it&apos;s not where your actual
              friendships live.
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <p>
              We build for the part underneath that. The song that&apos;s been on loop all week. The movie that
              gutted you. The reel you forwarded because it <em>is</em> you, not because it&apos;s content. The
              book you finished and immediately knew who needed it next. Your mood, today, in one colour.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="font-display text-2xl leading-snug text-foreground sm:text-3xl">
              None of that needs likes. It needs the four people who&apos;d actually want to know.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <p>
              So these apps are quieter on purpose. Some have no compose button at all. A hangout invite that
              doesn&apos;t feel like an event. A top three that posts itself. Taste, shared the way you&apos;d
              share it across a table — no follower counts, nothing to perform.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="flex flex-wrap gap-2 pt-3">
              {thread.map((a) => (
                <Link
                  key={a.slug}
                  href={`/apps/${a.slug}`}
                  className="inline-flex items-center gap-2 rounded-full border border-border px-3.5 py-1.5 text-sm text-muted transition-colors hover:border-foreground hover:text-foreground"
                >
                  <span className="h-1.5 w-1.5 rounded-full" style={{ background: a.accent }} />
                  {a.name}
                </Link>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
