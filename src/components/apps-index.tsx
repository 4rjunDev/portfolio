"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { apps } from "@/data/apps";
import { Reveal } from "@/components/reveal";

export function AppsIndex() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24 md:px-10">
      <Reveal>
        <div className="mb-10 flex items-end justify-between gap-6">
          <div>
            <p className="mb-3 text-sm uppercase tracking-[0.2em] text-muted">Index</p>
            <h2 className="font-display text-3xl tracking-tight sm:text-4xl">All {apps.length} apps</h2>
          </div>
          <p className="hidden max-w-xs text-sm text-muted sm:block">
            Every one is a native SwiftUI build with real commit history behind it.
          </p>
        </div>
      </Reveal>

      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {apps.map((a, i) => (
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
                <p className="mt-3 text-[11px] text-muted/80">{a.status}</p>
              </div>
            </Link>
          </motion.li>
        ))}
      </ul>
    </section>
  );
}
