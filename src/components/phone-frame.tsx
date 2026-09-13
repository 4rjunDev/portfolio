import { cn } from "@/lib/utils";
import { AppScreen } from "@/components/app-screen";
import type { App } from "@/data/apps";

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
        landscape
          ? "aspect-[19.5/9] rounded-[6.5%/14%] p-[1.5%]"
          : "aspect-[9/19.5] rounded-[14%/6.5%] p-[3.2%]",
        className
      )}
    >
      <div
        className={cn(
          "relative h-full w-full overflow-hidden bg-black",
          landscape ? "rounded-[5.2%/11.5%]" : "rounded-[11.5%/5.2%]"
        )}
      >
        {children ?? <AppScreen app={app} src={src} priority={priority} sizes={sizes} />}
        {landscape ? (
          <div className="pointer-events-none absolute inset-y-0 left-[2.2%] z-10 flex items-center">
            <div className="h-[30%] w-[3.4%] min-w-[6px] rounded-full bg-black" />
          </div>
        ) : (
          <div className="pointer-events-none absolute inset-x-0 top-[2.2%] z-10 flex justify-center">
            <div className="h-[3.4%] w-[30%] rounded-full bg-black" />
          </div>
        )}
        <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-br from-white/10 via-transparent to-transparent" />
      </div>
    </div>
  );
}
