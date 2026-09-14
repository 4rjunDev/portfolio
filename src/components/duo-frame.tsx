import { cn } from "@/lib/utils";
import { AppScreen } from "@/components/app-screen";
import type { App } from "@/data/apps";

type Screen = Pick<App, "name" | "category" | "accent">;

// Concept foldable: two iPhone-Pro-proportioned panes (71.9 x 150 each) that
// open book-style around a central hinge into a near-square inner display.
export function DuoFrame({
  app,
  left,
  right,
  angle = 12,
  className,
  sizes = "480px",
}: {
  app: Screen;
  left?: string;
  right?: string;
  angle?: number;
  className?: string;
  sizes?: string;
}) {
  return (
    <div className={cn("group relative w-full [perspective:2200px]", className)}>
      <div
        className="flex w-full transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] [transform-style:preserve-3d] group-hover:[transform:rotateX(3deg)]"
      >
        <Half side="left" angle={angle}>
          <AppScreen app={app} src={left} sizes={sizes} />
        </Half>
        <Half side="right" angle={angle}>
          <AppScreen app={app} src={right} sizes={sizes} />
        </Half>
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-[3%] left-1/2 z-20 w-[2.4%] -translate-x-1/2"
        style={{
          background:
            "linear-gradient(90deg, rgba(0,0,0,0.55), rgba(255,255,255,0.10) 45%, rgba(255,255,255,0.10) 55%, rgba(0,0,0,0.55))",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-[6%] left-[8%] right-[8%] h-[10%] rounded-[50%] [background:radial-gradient(ellipse,rgba(0,0,0,0.6),transparent_70%)]"
      />
    </div>
  );
}

function Half({ side, angle, children }: { side: "left" | "right"; angle: number; children: React.ReactNode }) {
  const isLeft = side === "left";
  return (
    <div
      className={cn(
        "relative w-1/2 aspect-[71.9/150] bg-[#0a0a0a] p-[2.2%] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.12)] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
        isLeft
          ? "origin-right rounded-l-[30%/7.2%] rounded-r-[3%/1.5%] group-hover:[transform:rotateY(4deg)]"
          : "origin-left rounded-r-[30%/7.2%] rounded-l-[3%/1.5%] group-hover:[transform:rotateY(-4deg)]"
      )}
      style={{ transform: `rotateY(${isLeft ? angle : -angle}deg)` }}
    >
      <div
        className={cn(
          "relative h-full w-full overflow-hidden bg-black",
          isLeft ? "rounded-l-[27%/6.4%] rounded-r-[2%/1%]" : "rounded-r-[27%/6.4%] rounded-l-[2%/1%]"
        )}
      >
        {children}
        <div
          aria-hidden
          className={cn(
            "pointer-events-none absolute inset-0 z-10",
            isLeft
              ? "bg-gradient-to-r from-white/[0.07] via-transparent to-black/25"
              : "bg-gradient-to-l from-white/[0.05] via-transparent to-black/25"
          )}
        />
      </div>
    </div>
  );
}
