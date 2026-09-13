import { cn } from "@/lib/utils";
import { AppScreen } from "@/components/app-screen";
import type { App } from "@/data/apps";

export function PhoneFrame({
  app,
  src,
  className,
  priority,
  sizes,
  children,
}: {
  app: Pick<App, "name" | "category" | "accent">;
  src?: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
  children?: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "relative aspect-[9/19.5] w-full overflow-hidden rounded-[14%/6.5%] bg-[#0a0a0a] p-[3.2%] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7),inset_0_0_0_1px_rgba(255,255,255,0.12)]",
        className
      )}
    >
      <div className="relative h-full w-full overflow-hidden rounded-[11.5%/5.2%] bg-black">
        {children ?? <AppScreen app={app} src={src} priority={priority} sizes={sizes} />}
        <div className="pointer-events-none absolute inset-x-0 top-[2.2%] z-10 flex justify-center">
          <div className="h-[3.4%] w-[30%] rounded-full bg-black" />
        </div>
        <div className="pointer-events-none absolute inset-0 z-10 rounded-[11.5%/5.2%] bg-gradient-to-br from-white/10 via-transparent to-transparent" />
      </div>
    </div>
  );
}
