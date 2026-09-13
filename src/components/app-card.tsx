"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { PhoneFrame } from "@/components/phone-frame";
import type { App } from "@/data/apps";

export function AppCard({ app, index }: { app: App; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: (index % 4) * 0.08, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link
        href={`/apps/${app.slug}`}
        className="group relative flex flex-col gap-5 rounded-3xl border border-card-border bg-card/60 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-foreground/20 hover:shadow-2xl hover:shadow-black/20 sm:flex-row sm:items-center sm:gap-8"
      >
        <div className="mx-auto w-32 shrink-0 transition-transform duration-500 group-hover:scale-[1.03] sm:mx-0">
          <PhoneFrame
            src={app.screenshots[0]}
            alt={`${app.name} screenshot`}
            placeholder={{ name: app.name, tagline: app.category }}
          />
        </div>

        <div className="flex flex-1 flex-col gap-3">
          <div className="flex items-center justify-between gap-3">
            <h3 className="font-display text-2xl tracking-tight sm:text-3xl">{app.name}</h3>
            <ArrowUpRight
              size={20}
              className="shrink-0 text-muted transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-accent"
            />
          </div>
          <p className="text-sm leading-relaxed text-muted sm:text-base">{app.tagline}</p>
          <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-muted">
            <span className="rounded-full border border-border px-2.5 py-1">{app.category}</span>
            <span className="rounded-full border border-border px-2.5 py-1">{app.status}</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
