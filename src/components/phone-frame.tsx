import { cn } from "@/lib/utils";
import { AppScreen } from "@/components/app-screen";
import type { App } from "@/data/apps";

// Proportions from the iPhone Pro body (71.9 x 150 mm), bezel and corner radii,
// expressed as percentages so any frame size stays true. No Dynamic Island: it's
// painted out of the simulator captures (scripts/remove-island.mjs) and never drawn,
// so every screen is an uninterrupted full display.
export function PhoneFrame({
  app,
  src,
  className,
  priority,
  sizes,
  landscape = false,
  children,
}: {
  app: Pick<App, "name" | "category" | "accent" | "islandInCapture">;
  src?: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
  landscape?: boolean;
  children?: React.ReactNode;
}) {
  // Simulator captures carry their own status bar; everything else (design mockups,
  // generated mock screens) gets the same drawn one so every phone matches.
  const drawStatusBar = !(src && app.islandInCapture) && !landscape;
  return (
    <div
      className={cn(
        "relative w-full overflow-hidden bg-[#0a0a0a] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7),inset_0_0_0_1px_rgba(255,255,255,0.12)]",
        landscape ? "aspect-[150/71.9] rounded-[7.2%/15%]" : "aspect-[71.9/150] rounded-[15%/7.2%]",
        className
      )}
    >
      {/*
        Absolutely positioned with a percentage `inset` rather than padding + h-full/w-full:
        WebKit fails to subtract the parent's padding when resolving a percentage *height*
        here (width is fine), which overflows this pane past the rounded clip and squares
        off the bottom corners. `inset` isn't affected by that bug in any engine.
      */}
      <div
        className={cn(
          "absolute overflow-hidden bg-black @container",
          // Percentage insets resolve x against width and y against height, so a single
          // value gives a bezel ~2.1x thicker top/bottom than the sides. These pairs are
          // both 2.2% of the short edge in pixels.
          landscape
            ? "inset-x-[1.055%] inset-y-[2.2%] rounded-[6.4%/13.5%]"
            : "inset-x-[2.2%] inset-y-[1.055%] rounded-[13.5%/6.4%]"
        )}
      >
        {children ?? <AppScreen app={app} src={src} priority={priority} sizes={sizes} />}
        {drawStatusBar && <StatusBar />}
        <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-br from-white/10 via-transparent to-transparent" />
      </div>
    </div>
  );
}

// iOS-style status bar for screens that lack one. `mix-blend-difference` on white
// glyphs reads dark over light screens and light over dark ones automatically.
function StatusBar() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 top-[2.3%] z-10 flex items-center justify-between px-[8.5%] text-white mix-blend-difference"
    >
      <span className="text-[4.6cqw] font-semibold tracking-tight">9:41</span>
      <span className="flex items-center gap-[1.6cqw]">
        <span className="flex items-end gap-[0.5cqw]">
          {[0.45, 0.6, 0.8, 1].map((h, i) => (
            <span key={i} className="w-[1.1cqw] rounded-[0.3cqw] bg-white" style={{ height: `${h * 3.2}cqw` }} />
          ))}
        </span>
        <svg viewBox="0 0 24 24" className="h-[3.6cqw] w-[3.6cqw]" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round">
          <path d="M2 8.8a15 15 0 0 1 20 0M5.5 12.6a10 10 0 0 1 13 0M9 16.3a5 5 0 0 1 6 0" />
          <circle cx="12" cy="19.5" r="1.2" fill="currentColor" stroke="none" />
        </svg>
        <span className="relative h-[3.3cqw] w-[7cqw] rounded-[1cqw] border-[0.45cqw] border-white/90 p-[0.5cqw]">
          <span className="block h-full w-[85%] rounded-[0.5cqw] bg-white" />
          <span className="absolute -right-[1.2cqw] top-1/2 h-[1.3cqw] w-[0.7cqw] -translate-y-1/2 rounded-r-[0.4cqw] bg-white/70" />
        </span>
      </span>
    </div>
  );
}
