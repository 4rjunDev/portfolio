"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { apps } from "@/data/apps";
import { StackMarquee } from "@/components/stack-marquee";

const ease = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  // The background blobs are infinite, JS-driven (not CSS) animations — left running they
  // burn a requestAnimationFrame tick for the entire time the tab is open, even hundreds of
  // vh after the user has scrolled away. Only animate while the hero is actually visible.
  const inView = useInView(ref, { margin: "200px 0px 200px 0px" });

  return (
    <section ref={ref} className="relative isolate flex min-h-screen flex-col justify-between overflow-hidden px-6 pt-32 pb-10 md:px-10">
      <div aria-hidden className="dot-grid pointer-events-none absolute inset-0 -z-10" />
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        {/*
          No `filter: blur()` here on purpose: WebKit re-rasterizes large blurs on the CPU
          every frame, which produced 200-600ms hangs while scrolling past the hero. A soft
          multi-stop radial gradient gives the same glow with zero filter cost.
        */}
        <motion.div
          className="absolute -top-48 left-1/4 h-[48rem] w-[48rem] rounded-full opacity-30 will-change-transform"
          style={{
            background:
              "radial-gradient(circle, rgba(255,106,51,0.7) 0%, rgba(255,106,51,0.35) 22%, rgba(255,106,51,0.1) 42%, transparent 65%)",
          }}
          animate={inView ? { x: [0, 40, -20, 0], y: [0, 30, -10, 0] } : { x: 0, y: 0 }}
          transition={inView ? { duration: 26, repeat: Infinity, ease: "easeInOut" } : { duration: 0.5 }}
        />
        <motion.div
          className="absolute -bottom-24 right-[15%] h-[38rem] w-[38rem] rounded-full opacity-20 will-change-transform"
          style={{
            background:
              "radial-gradient(circle, rgba(79,124,255,0.7) 0%, rgba(79,124,255,0.32) 22%, rgba(79,124,255,0.1) 42%, transparent 65%)",
          }}
          animate={inView ? { x: [0, -30, 20, 0], y: [0, -20, 10, 0] } : { x: 0, y: 0 }}
          transition={inView ? { duration: 30, repeat: Infinity, ease: "easeInOut" } : { duration: 0.5 }}
        />
      </div>

      <motion.div style={{ y, opacity }} className="mx-auto w-full max-w-6xl flex-1 flex flex-col justify-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
          className="mb-6 flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-muted"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
          </span>
          iOS studio · {apps.length} apps in flight
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease }}
          className="font-display max-w-4xl text-5xl leading-[1.02] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl"
        >
          Native things,
          <br />
          <span className="italic text-muted">shipped</span> fast.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease }}
          className="mt-8 max-w-xl text-lg leading-relaxed text-muted"
        >
          ADHD Studios turns ideas into working SwiftUI apps in days — social, sports, and
          utility products taken from a blank Xcode project to something you can put on a phone.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45, ease }}
          className="mt-10 flex items-center gap-4"
        >
          <a
            href="#work"
            className="rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-transform hover:scale-105"
          >
            See the apps
          </a>
          <a
            href="#about"
            className="rounded-full border border-border px-6 py-3 text-sm font-medium text-foreground transition-colors hover:border-foreground"
          >
            The toolkit
          </a>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.7 }}
        className="mx-auto w-full max-w-6xl"
      >
        <div className="mb-3 flex items-center gap-3 text-[11px] uppercase tracking-[0.2em] text-muted">
          <span>Built with</span>
          <span className="h-px flex-1 bg-border" />
        </div>
        <StackMarquee />
      </motion.div>
    </section>
  );
}
