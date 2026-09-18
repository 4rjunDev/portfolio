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
      Properly social
    </span>
  );
}

const pairs: [string, string][] = [
  ["Sharing", "posting"],
  ["Friends", "followers"],
  ["Your actual life", "the highlight reel"],
  ["For yourself first", "for validation"],
];

const inPractice: { slug: string; irl: string; app: string }[] = [
  {
    slug: "moody",
    irl: "\u201cHow are you, actually?\u201d",
    app: "One colour, word, or face for how you feel right now. No photo to stage, no caption to workshop \u2014 just the honest answer, for the friends who\u2019d ask.",
  },
  {
    slug: "come-thru",
    irl: "\u201cWe\u2019re at the park, come by.\u201d",
    app: "Say where you\u2019ll be and who\u2019s welcome. Not an event, not an announcement \u2014 the same open invite you\u2019d throw out in a group chat.",
  },
  {
    slug: "on-loop",
    irl: "\u201cI can\u2019t stop playing this.\u201d",
    app: "There\u2019s no compose button. Your real top three posts itself from what you actually listened to, so there\u2019s nothing to curate.",
  },
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
              Social, <span className="italic text-muted">properly.</span>
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
              Think about how you actually share things with friends. You play them the song. You tell them
              the movie wrecked you. You hand them the book. You say &ldquo;we&apos;re at the park, come
              by.&rdquo; Nobody&apos;s keeping score, and you&apos;d have loved the song either way.
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <p>
              Then look at what &ldquo;social&rdquo; apps turned that into. Posting on Instagram is work:
              getting the shot right, the caption right, picking the highlight, then waiting to see how it
              lands. It&apos;s a reel of your best moments, put up for approval. That&apos;s not really
              sharing — it&apos;s publishing.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="font-display text-2xl leading-snug text-foreground sm:text-3xl">
              These apps put it back the right way round: it&apos;s yours first. Then it&apos;s something
              your friends get to see.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <p>
              Your taste, your mood, what&apos;s on repeat, where you&apos;ll be tonight — kept for you, and
              shared the way you would in person, with people who&apos;d genuinely want to know. No follower
              counts. No performance. Just social, working the way it does in real life.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="pt-4">
              <p className="mb-4 text-xs uppercase tracking-[0.2em] text-muted">In practice</p>
              <ul className="divide-y divide-border border-y border-border">
                {inPractice.map((x) => {
                  const a = apps.find((y) => y.slug === x.slug)!;
                  return (
                    <li key={x.slug}>
                      <Link
                        href={`/apps/${a.slug}`}
                        className="group grid gap-x-6 gap-y-1 py-5 sm:grid-cols-[9.5rem_1fr]"
                      >
                        <span className="flex items-center gap-2.5 self-start">
                          <span
                            className="h-2 w-2 rounded-full"
                            style={{ background: a.accent, boxShadow: `0 0 10px ${a.accent}` }}
                          />
                          <span className="font-display text-xl text-foreground transition-colors group-hover:text-accent">
                            {a.name}
                          </span>
                        </span>
                        <span className="text-base leading-relaxed">
                          <span className="font-display italic text-foreground">{x.irl}</span>{" "}
                          <span className="text-muted">{x.app}</span>
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.25}>
            <div className="flex flex-wrap gap-2 pt-1">
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
