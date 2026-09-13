import Image from "next/image";
import type { App } from "@/data/apps";

export function AppScreen({
  app,
  src,
  priority,
  sizes = "320px",
}: {
  app: Pick<App, "name" | "category" | "accent">;
  src?: string;
  priority?: boolean;
  sizes?: string;
}) {
  if (src) {
    return (
      <Image
        src={src}
        alt={`${app.name} screen`}
        fill
        priority={priority}
        sizes={sizes}
        className="object-cover"
      />
    );
  }

  const a = app.accent;
  return (
    <div className="absolute inset-0 @container bg-[#0c0c0b] text-white">
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between px-[7cqw] pt-[5cqw] text-[3.2cqw] text-white/60">
          <span>9:41</span>
          <span className="flex gap-[1cqw]">
            <span className="h-[2cqw] w-[2cqw] rounded-full bg-white/40" />
            <span className="h-[2cqw] w-[2cqw] rounded-full bg-white/40" />
            <span className="h-[2cqw] w-[4cqw] rounded-[0.5cqw] bg-white/60" />
          </span>
        </div>

        <div className="px-[7cqw] pt-[7cqw]">
          <p className="text-[2.8cqw] uppercase tracking-[0.25em] text-white/40">{app.category}</p>
          <p className="font-display mt-[1.5cqw] text-[8.5cqw] leading-none tracking-tight">{app.name}</p>
        </div>

        <div
          className="mx-[7cqw] mt-[7cqw] h-[34%] rounded-[6cqw]"
          style={{
            background: `radial-gradient(120% 90% at 20% 10%, ${a} 0%, ${a}66 35%, #161615 75%)`,
          }}
        >
          <div className="flex h-full flex-col justify-end p-[5cqw]">
            <div className="h-[2.2cqw] w-2/3 rounded-full bg-white/70" />
            <div className="mt-[2cqw] h-[1.6cqw] w-1/2 rounded-full bg-white/35" />
          </div>
        </div>

        <div className="mt-[7cqw] flex flex-col gap-[4cqw] px-[7cqw]">
          {[0.85, 0.6, 0.72].map((w, i) => (
            <div key={i} className="flex items-center gap-[3.5cqw]">
              <div
                className="h-[10cqw] w-[10cqw] shrink-0 rounded-[3cqw]"
                style={{ background: i === 0 ? a : "#232322" }}
              />
              <div className="flex-1">
                <div className="h-[1.8cqw] rounded-full bg-white/60" style={{ width: `${w * 100}%` }} />
                <div className="mt-[1.6cqw] h-[1.3cqw] w-1/3 rounded-full bg-white/25" />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-auto mb-[4cqw] flex items-center justify-around px-[7cqw] pt-[3cqw]">
          {[0, 1, 2, 3].map((i) => (
            <span
              key={i}
              className="h-[1.8cqw] w-[5cqw] rounded-full"
              style={{ background: i === 0 ? a : "rgba(255,255,255,0.18)" }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
