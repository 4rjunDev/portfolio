"use client";

import { useEffect, useRef, useState } from "react";
import { preload } from "react-dom";
import Link from "next/link";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { apps } from "@/data/apps";
import { PhoneFrame } from "@/components/phone-frame";
import { AppScreen } from "@/components/app-screen";
import { StackPill } from "@/components/stack-pill";

const STEP_VH = 85;
const ease = [0.16, 1, 0.3, 1] as const;

export function Showcase() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  // Every lead screenshot is needed within one scroll of the showcase; fetch them all up
  // front (they're small WebPs) so phones never pop in late as the index changes.
  useEffect(() => {
    const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
    for (const a of apps) if (a.screenshots[0]) preload(`${base}${a.screenshots[0]}`, { as: "image" });
  }, []);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const idx = Math.min(apps.length - 1, Math.max(0, Math.floor(v * apps.length)));
    if (idx !== active) setActive(idx);
  });

  const app = apps[active];
  const prev = apps[(active - 1 + apps.length) % apps.length];
  const next = apps[(active + 1) % apps.length];

  const jumpTo = (i: number) => {
    const el = ref.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const stepPx = (window.innerHeight * STEP_VH) / 100;
    window.scrollTo({ top: top + stepPx * i + 4, behavior: "smooth" });
  };

  return (
    <section id="work" ref={ref} style={{ height: `${apps.length * STEP_VH}vh` }} className="relative">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 transition-colors duration-700"
          style={{
            background: `radial-gradient(60% 50% at 75% 50%, ${app.accent}22 0%, transparent 70%)`,
          }}
        />

        <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-8 px-6 md:grid-cols-[1.05fr_1fr] md:px-10">
          <div className="order-2 md:order-1">
            <div className="mb-6 flex items-center gap-4 text-xs text-muted">
              <span className="font-mono tabular-nums">
                {String(active + 1).padStart(2, "0")} / {String(apps.length).padStart(2, "0")}
              </span>
              <span className="h-px flex-1 bg-border" />
              <span className="uppercase tracking-[0.2em]">{app.category}</span>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={app.slug}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.4, ease }}
              >
                <h2 className="font-display text-5xl tracking-tight sm:text-6xl lg:text-7xl">{app.name}</h2>
                <p className="mt-4 max-w-md text-base leading-relaxed text-muted sm:text-lg">{app.tagline}</p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {app.stack.slice(0, 4).map((s) => (
                    <StackPill key={s} name={s} />
                  ))}
                </div>

                <div className="mt-8 flex items-center gap-6 text-sm">
                  <Link
                    href={`/apps/${app.slug}`}
                    className="group inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 font-medium text-background transition-transform hover:scale-[1.03]"
                  >
                    Open case study
                    <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                  <span className="text-muted">{app.status}</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="order-1 relative flex h-[44vh] items-center justify-center md:order-2 md:h-[78vh]">
            <motion.div
              key={`prev-${prev.slug}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 0.55, x: 0 }}
              transition={{ duration: 0.5, ease }}
              className="absolute left-[6%] top-1/2 hidden w-[32%] -translate-y-1/2 -rotate-6 md:block"
            >
              <PhoneFrame app={prev} src={prev.screenshots[0]} sizes="200px" priority />
            </motion.div>

            <motion.div
              key={`next-${next.slug}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 0.55, x: 0 }}
              transition={{ duration: 0.5, ease }}
              className="absolute right-[10%] top-1/2 hidden w-[32%] -translate-y-1/2 rotate-6 md:block"
            >
              <PhoneFrame app={next} src={next.screenshots[0]} sizes="200px" priority />
            </motion.div>

            <div className="relative z-10 h-full max-h-[78vh] aspect-[9/19.5]">
              <PhoneFrame app={app} src={app.screenshots[0]}>
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.div
                    key={app.slug}
                    initial={{ opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.45, ease }}
                    className="absolute inset-0"
                  >
                    <AppScreen app={app} src={app.screenshots[0]} sizes="360px" priority />
                  </motion.div>
                </AnimatePresence>
              </PhoneFrame>
            </div>
          </div>
        </div>

        <ol className="absolute right-3 top-1/2 hidden -translate-y-1/2 flex-col gap-2 xl:flex">
          {apps.map((a, i) => (
            <li key={a.slug}>
              <button
                type="button"
                onClick={() => jumpTo(i)}
                aria-label={`Go to ${a.name}`}
                className="group flex items-center justify-end gap-2 py-0.5"
              >
                <span
                  className={`text-[10px] font-mono tabular-nums transition-opacity ${
                    i === active ? "opacity-100" : "opacity-0 group-hover:opacity-60"
                  }`}
                >
                  {a.name}
                </span>
                <span
                  className="h-1.5 rounded-full transition-all duration-300"
                  style={{
                    width: i === active ? 20 : 6,
                    background: i === active ? a.accent : "var(--border)",
                  }}
                />
              </button>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
