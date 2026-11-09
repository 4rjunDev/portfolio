"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { apps } from "@/data/apps";
import { ideas } from "@/data/ideas";
import { Reveal } from "@/components/reveal";
import { EthosPill } from "@/components/ethos";

const groups = [
  { stage: "ready", title: "Closest to shipping", note: "Working builds, real backends, most of the way there" },
  { stage: "early", title: "Early concepts", note: "First scaffolds and prototypes" },
] as const;

export function AppsIndex() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24 md:px-10">
      <Reveal>
        <div className="mb-10 flex items-end justify-between gap-6">
          <div>
            <p className="mb-3 text-sm uppercase tracking-[0.2em] text-muted">Index</p>
            <h2 className="font-display text-3xl tracking-tight sm:text-4xl">
              {apps.length} apps, {ideas.length} on the bench
            </h2>
          </div>
          <p className="hidden max-w-xs text-sm text-muted sm:block">
            Every build is native SwiftUI with real commit history. The bench is what&apos;s next.
          </p>
        </div>
      </Reveal>

      <div className="space-y-12">
        {groups.map((g) => {
          const list = apps.filter((a) => a.stage === g.stage);
          if (!list.length) return null;
          return (
            <div key={g.stage}>
              <div className="mb-4 flex items-baseline gap-3">
                <h3 className="text-xs uppercase tracking-[0.2em] text-foreground">{g.title}</h3>
                <span className="font-mono text-[11px] text-muted">{String(list.length).padStart(2, "0")}</span>
                <span className="h-px flex-1 bg-border" />
                <span className="hidden text-xs text-muted sm:inline">{g.note}</span>
              </div>
              <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
                {list.map((a, i) => (
                  <motion.li
                    key={a.slug}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.5, delay: (i % 5) * 0.06, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Link
                      href={`/apps/${a.slug}`}
                      className="group flex h-full flex-col justify-between rounded-2xl border border-card-border bg-card/50 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:bg-card"
                      style={{ ["--a" as string]: a.accent }}
                    >
                      <div className="flex items-start justify-between">
                        <span
                          className="mt-1 h-2 w-2 rounded-full"
                          style={{ background: a.accent, boxShadow: `0 0 10px ${a.accent}` }}
                        />
                        <ArrowUpRight
                          size={16}
                          className="text-muted transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground"
                        />
                      </div>
                      <div className="mt-8">
                        <p className="font-display text-xl leading-tight">{a.name}</p>
                        <p className="mt-1 text-[11px] text-muted">{a.category}</p>
                        <p className="mt-3 text-[11px] text-muted">{a.status}</p>
                        {a.ethos && <EthosPill className="mt-3 px-2 py-0.5 text-[9px]" />}
                      </div>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </div>
          );
        })}

        <div>
          <div className="mb-4 flex items-baseline gap-3">
            <h3 className="text-xs uppercase tracking-[0.2em] text-foreground">On the bench</h3>
            <span className="font-mono text-[11px] text-muted">{String(ideas.length).padStart(2, "0")}</span>
            <span className="h-px flex-1 bg-border" />
            <span className="hidden text-xs text-muted sm:inline">Ideas with a spec, not yet a repo</span>
          </div>
          <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
            {ideas.map((idea, i) => (
              <motion.li
                key={idea.atelierId}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: (i % 4) * 0.05, ease: [0.16, 1, 0.3, 1] }}
                className="rounded-xl border border-dashed border-border px-4 py-3"
              >
                <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-3">
                  <p className="font-display text-lg leading-tight">{idea.name}</p>
                  <span className="text-[10px] uppercase tracking-[0.15em] text-muted sm:shrink-0 sm:text-right">{idea.category}</span>
                </div>
                <p className="mt-1.5 text-[13px] leading-snug text-muted">{idea.tagline}</p>
                {idea.ethos && <EthosPill className="mt-2.5 px-2 py-0.5 text-[9px]" />}
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
