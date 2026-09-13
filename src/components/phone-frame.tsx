import Image from "next/image";
import { cn } from "@/lib/utils";

export function PhoneFrame({
  src,
  alt,
  placeholder,
  className,
  priority,
}: {
  src?: string;
  alt: string;
  placeholder?: { name: string; tagline: string };
  className?: string;
  priority?: boolean;
}) {
  return (
    <div
      className={cn(
        "relative aspect-[9/19.5] w-full overflow-hidden rounded-[2rem] border border-white/10 bg-neutral-950 shadow-2xl shadow-black/40",
        className
      )}
    >
      <div className="absolute inset-x-0 top-0 z-10 flex justify-center pt-2">
        <div className="h-5 w-24 rounded-full bg-black/80" />
      </div>
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          className="object-cover"
          sizes="(max-width: 768px) 60vw, 320px"
        />
      ) : placeholder ? (
        <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-gradient-to-br from-neutral-900 via-neutral-950 to-black px-6 text-center">
          <span className="font-display text-2xl italic text-white/90">{placeholder.name}</span>
          <span className="text-xs leading-relaxed text-white/40">{placeholder.tagline}</span>
        </div>
      ) : null}
    </div>
  );
}
