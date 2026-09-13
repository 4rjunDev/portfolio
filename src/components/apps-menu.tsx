"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { apps } from "@/data/apps";
import { PhoneFrame } from "@/components/phone-frame";

const ease = [0.16, 1, 0.3, 1] as const;

export function AppsMenu({ open, setOpen }: { open: boolean; setOpen: (v: boolean) => void }) {
  const pathname = usePathname();
  const panelRef = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(-999);
  const my = useMotionValue(-999);
  const spotlight = useMotionTemplate`radial-gradient(260px circle at ${mx}px ${my}px, color-mix(in srgb, var(--accent) 14%, transparent), transparent 70%)`;
  const [hovered, setHovered] = useState<string | null>(null);

  useEffect(() => setOpen(false), [pathname, setOpen]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onClick = (e: MouseEvent) => {
      if (!panelRef.current?.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("mousedown", onClick);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("mousedown", onClick);
    };
  }, [open, setOpen]);

  const current = apps.find((a) => a.slug === hovered) ?? apps[0];

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="flex items-center gap-1.5 text-muted transition-colors hover:text-foreground"
      >
        Apps
        <span className="rounded-full border border-border px-1.5 py-px font-mono text-[10px] tabular-nums">
          {apps.length}
        </span>
        <ChevronDown size={14} className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            ref={panelRef}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.3, ease }}
            onMouseMove={(e) => {
              const r = e.currentTarget.getBoundingClientRect();
              mx.set(e.clientX - r.left);
              my.set(e.clientY - r.top);
            }}
            onMouseLeave={() => {
              mx.set(-999);
              my.set(-999);
              setHovered(null);
            }}
            className="absolute inset-x-0 top-16 border-b border-border bg-background shadow-[0_40px_80px_-30px_rgba(0,0,0,0.6)] backdrop-blur-2xl"
          >
            <motion.div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: spotlight }} />

            <div className="relative mx-auto grid max-w-6xl gap-8 px-6 py-8 md:grid-cols-[220px_1fr] md:px-10">
              <div className="hidden md:block">
                <p className="text-xs uppercase tracking-[0.2em] text-muted">Now building</p>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={current.slug}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.25, ease }}
                    className="mt-3"
                  >
                    <p className="font-display text-3xl tracking-tight">{current.name}</p>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{current.tagline}</p>
                    <p className="mt-3 text-xs text-muted">
                      <span
                        className="mr-2 inline-block h-1.5 w-1.5 rounded-full align-middle"
                        style={{ background: current.accent, boxShadow: `0 0 8px ${current.accent}` }}
                      />
                      {current.status}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>

              <ul className="grid max-h-[70vh] grid-cols-2 gap-2 overflow-y-auto sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {apps.map((a, i) => (
                  <motion.li
                    key={a.slug}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: 0.03 * i, ease }}
                  >
                    <Link
                      href={`/apps/${a.slug}`}
                      onMouseEnter={() => setHovered(a.slug)}
                      onFocus={() => setHovered(a.slug)}
                      className="group flex items-center gap-3 rounded-2xl border border-transparent p-2.5 transition-colors hover:border-border hover:bg-card/60"
                    >
                      <div className="w-9 shrink-0 transition-transform duration-500 group-hover:-rotate-3 group-hover:scale-105">
                        <PhoneFrame app={a} src={a.screenshots[0]} sizes="60px" />
                      </div>
                      <div className="min-w-0">
                        <p className="font-mono text-[10px] text-muted">{String(i + 1).padStart(2, "0")}</p>
                        <p className="font-display text-base leading-tight">{a.name}</p>
                        <p className="truncate text-[11px] text-muted">{a.category.split(" / ")[0]}</p>
                      </div>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
