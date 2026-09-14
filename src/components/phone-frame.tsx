import { cn } from "@/lib/utils";
import { AppScreen } from "@/components/app-screen";
import type { App } from "@/data/apps";

// Proportions from the iPhone Pro body (71.9 x 150 mm), bezel and corner radii,
// expressed as percentages so any frame size stays true. A Dynamic Island is drawn
// only for screens that don't already show one (mock screens, design mockups) so
// every phone reads the same as the real simulator captures.
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
  const drawIsland = !(src && app.islandInCapture);
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
          "absolute overflow-hidden bg-black",
          // Percentage insets resolve x against width and y against height, so a single
          // value gives a bezel ~2.1x thicker top/bottom than the sides. These pairs are
          // both 2.2% of the short edge in pixels.
          landscape
            ? "inset-x-[1.055%] inset-y-[2.2%] rounded-[6.4%/13.5%]"
            : "inset-x-[2.2%] inset-y-[1.055%] rounded-[13.5%/6.4%]"
        )}
      >
        {children ?? <AppScreen app={app} src={src} priority={priority} sizes={sizes} />}
        {drawIsland &&
          (landscape ? (
            <div className="pointer-events-none absolute left-[1.6%] top-1/2 z-10 h-[31%] w-[4%] min-w-[6px] -translate-y-1/2 rounded-full bg-black" />
          ) : (
            <div className="pointer-events-none absolute left-1/2 top-[1.6%] z-10 h-[4%] w-[31%] -translate-x-1/2 rounded-full bg-black" />
          ))}
        <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-br from-white/10 via-transparent to-transparent" />
      </div>
    </div>
  );
}
