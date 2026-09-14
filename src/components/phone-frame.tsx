import { cn } from "@/lib/utils";
import { AppScreen } from "@/components/app-screen";
import type { App } from "@/data/apps";

// Proportions from the iPhone Pro body (71.9 x 150 mm), bezel, corner radii,
// and Dynamic Island, expressed as percentages so any frame size stays true.
export function PhoneFrame({
  app,
  src,
  className,
  priority,
  sizes,
  landscape = false,
  children,
}: {
  app: Pick<App, "name" | "category" | "accent">;
  src?: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
  landscape?: boolean;
  children?: React.ReactNode;
}) {
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
          landscape ? "inset-[1.06%] rounded-[6.4%/13.5%]" : "inset-[2.2%] rounded-[13.5%/6.4%]"
        )}
      >
        {children ?? <AppScreen app={app} src={src} priority={priority} sizes={sizes} />}
        {landscape ? (
          <div className="pointer-events-none absolute left-[1.3%] top-1/2 z-10 h-[31%] w-[4.2%] min-w-[6px] -translate-y-1/2 rounded-full bg-black" />
        ) : (
          <div className="pointer-events-none absolute left-1/2 top-[1.3%] z-10 h-[4.2%] w-[31%] -translate-x-1/2 rounded-full bg-black" />
        )}
        <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-br from-white/10 via-transparent to-transparent" />
      </div>
    </div>
  );
}
