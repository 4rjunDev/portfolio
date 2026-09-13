"use client";

import Link from "next/link";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import { AppsMenu } from "@/components/apps-menu";

export function Nav() {
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    setHidden(latest > previous && latest > 160 && !menuOpen);
    setScrolled(latest > 24);
  });

  return (
    <motion.header
      animate={{ y: hidden ? -96 : 0 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${
        scrolled || menuOpen ? "bg-background/80 backdrop-blur-md border-b border-border" : ""
      }`}
    >
      <nav className="mx-auto max-w-6xl px-6 md:px-10 h-16 flex items-center justify-between">
        <Link href="/" className="font-display text-lg tracking-tight">
          ADHD Studios
        </Link>
        <div className="flex items-center gap-6 text-sm sm:gap-8">
          <AppsMenu open={menuOpen} setOpen={setMenuOpen} />
          <Link href="/#about" className="text-muted hover:text-foreground transition-colors">
            About
          </Link>
          <ThemeToggle />
        </div>
      </nav>
    </motion.header>
  );
}
