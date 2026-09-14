import { cn } from "@/lib/utils";

const GROUPS: { match: RegExp; color: string; label: string }[] = [
  { match: /swift|observation|xcodegen|swiftdata/i, color: "#f97316", label: "Swift" },
  { match: /supabase|postgres|rls|edge function|apns|realtime/i, color: "#3ecf8e", label: "Backend" },
  { match: /maplibre|ferrostar|valhalla|corelocation/i, color: "#2dd4bf", label: "Maps" },
  { match: /kit|store|avfoundation|multipeer|background|keychain|extension|apple|macos|xcuitest|speech|oauth/i, color: "#60a5fa", label: "Apple" },
  { match: /open library|api|oklch|design/i, color: "#e879f9", label: "APIs" },
];

export function stackColor(name: string) {
  return GROUPS.find((g) => g.match.test(name))?.color ?? "#9ca3af";
}

export function StackPill({
  name,
  size = "sm",
  className,
}: {
  name: string;
  size?: "sm" | "md";
  className?: string;
}) {
  const color = stackColor(name);
  return (
    <span
      className={cn(
        "stack-pill inline-flex items-center gap-2 rounded-full border border-border bg-card/70 font-medium text-foreground/85 backdrop-blur-sm transition-all duration-300",
        size === "sm" ? "px-3 py-1.5 text-[11px]" : "px-4 py-2 text-sm",
        className
      )}
      style={{ ["--pill" as string]: color }}
    >
      <span
        className="h-1.5 w-1.5 shrink-0 rounded-full"
        style={{ background: color, boxShadow: `0 0 10px ${color}` }}
      />
      {name}
    </span>
  );
}
