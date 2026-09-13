import { apps } from "@/data/apps";
import { StackPill } from "@/components/stack-pill";

export function StackMarquee({ className = "" }: { className?: string }) {
  const stack = Array.from(new Set(apps.flatMap((a) => a.stack)));
  const row = [...stack, ...stack];

  return (
    <div className={`marquee-mask relative w-full overflow-hidden ${className}`}>
      <div className="marquee flex w-max gap-3 py-1">
        {row.map((name, i) => (
          <StackPill key={`${name}-${i}`} name={name} size="md" />
        ))}
      </div>
    </div>
  );
}
