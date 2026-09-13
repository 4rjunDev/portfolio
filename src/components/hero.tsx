"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { apps } from "@/data/apps";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative flex min-h-[92vh] flex-col justify-center overflow-hidden px-6 md:px-10">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <motion.div
          className="absolute -top-40 left-1/4 h-[36rem] w-[36rem] rounded-full opacity-30 blur-[120px]"
          style={{ background: "radial-gradient(circle, var(--accent), transparent 70%)" }}
          animate={{ x: [0, 40, -20, 0], y: [0, 30, -10, 0] }}
          transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 h-[28rem] w-[28rem] rounded-full opacity-20 blur-[110px]"
          style={{ background: "radial-gradient(circle, #4f7cff, transparent 70%)" }}
          animate={{ x: [0, -30, 20, 0], y: [0, -20, 10, 0] }}
          transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <motion.div style={{ y, opacity }} className="mx-auto w-full max-w-5xl">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-6 text-sm uppercase tracking-[0.25em] text-muted"
        >
          iOS developer
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-5xl leading-[1.05] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl"
        >
          ADHD Studios builds
          <br />
          <span className="italic text-muted">native things,</span>
          <br />
          fast.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 max-w-xl text-lg leading-relaxed text-muted"
        >
          {apps.length} SwiftUI apps in flight — social, sports, and utility products
          taken from a blank Xcode project to something you can put on a phone.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex items-center gap-4"
        >
          <a
            href="#work"
            className="rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-transform hover:scale-105"
          >
            See the work
          </a>
          <a
            href="#about"
            className="rounded-full border border-border px-6 py-3 text-sm font-medium text-foreground transition-colors hover:border-foreground"
          >
            About
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
