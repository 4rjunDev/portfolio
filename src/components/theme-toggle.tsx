"use client";

import { useSyncExternalStore } from "react";
import { Monitor, Moon, Sun } from "lucide-react";

// "system" = no data-theme attribute, so CSS follows prefers-color-scheme.
type Pref = "system" | "light" | "dark";
const next: Record<Pref, Pref> = { system: "light", light: "dark", dark: "system" };
const label: Record<Pref, string> = {
  system: "Theme: matching your system. Switch to light",
  light: "Theme: light. Switch to dark",
  dark: "Theme: dark. Switch to match your system",
};

function subscribe(cb: () => void) {
  const obs = new MutationObserver(cb);
  obs.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => obs.disconnect();
}

function read(): Pref {
  const t = document.documentElement.getAttribute("data-theme");
  return t === "light" || t === "dark" ? t : "system";
}

export function ThemeToggle() {
  const pref = useSyncExternalStore(subscribe, read, () => "system" as Pref);

  const cycle = () => {
    const to = next[pref];
    const root = document.documentElement;
    try {
      if (to === "system") {
        root.removeAttribute("data-theme");
        localStorage.removeItem("theme");
      } else {
        root.setAttribute("data-theme", to);
        localStorage.setItem("theme", to);
      }
    } catch {}
  };

  const Icon = pref === "system" ? Monitor : pref === "light" ? Sun : Moon;
  return (
    <button
      type="button"
      onClick={cycle}
      aria-label={label[pref]}
      title={label[pref]}
      className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-muted transition-colors hover:border-foreground hover:text-foreground"
    >
      <Icon size={14} />
    </button>
  );
}
