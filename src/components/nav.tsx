"use client";

import Link from "next/link";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";

export function Nav() {
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    setHidden(latest > previous && latest > 160);
    setScrolled(latest > 24);
  });

  return (
    <motion.header
      animate={{ y: hidden ? -96 : 0 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${
        scrolled ? "bg-background/80 backdrop-blur-md border-b border-border" : ""
      }`}
    >
      <nav className="mx-auto max-w-6xl px-6 md:px-10 h-16 flex items-center justify-between">
        <Link href="/" className="font-display text-lg tracking-tight">
          Hershil
        </Link>
        <div className="flex items-center gap-8 text-sm text-muted">
          <Link href="/#work" className="hover:text-foreground transition-colors">
            Work
          </Link>
          <Link href="/#about" className="hover:text-foreground transition-colors">
            About
          </Link>
          <a
            href="mailto:hershclaw@gmail.com"
            className="hidden sm:inline-flex items-center rounded-full border border-border px-4 py-1.5 hover:border-foreground hover:text-foreground transition-colors"
          >
            Get in touch
          </a>
        </div>
      </nav>
    </motion.header>
  );
}
