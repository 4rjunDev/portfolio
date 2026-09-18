import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { apps } from "@/data/apps";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";

export default function NotFound() {
  const picks = apps.slice(0, 3);
  return (
    <div className="flex flex-1 flex-col">
      <Nav />
      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-6 pt-32 pb-24 md:px-10">
        <p className="font-mono text-xs text-muted">404</p>
        <h1 className="font-display mt-4 text-5xl tracking-tight sm:text-7xl">
          Nothing <span className="italic text-muted">shipped</span> here.
        </h1>
        <p className="mt-6 max-w-md text-lg text-muted">
          That page doesn&apos;t exist — or isn&apos;t public yet. The apps are all still where you left them.
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-3">
          <Link
            href="/"
            className="rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-transform hover:scale-105"
          >
            Back home
          </Link>
          {picks.map((a) => (
            <Link
              key={a.slug}
              href={`/apps/${a.slug}`}
              className="group inline-flex items-center gap-1.5 rounded-full border border-border px-5 py-3 text-sm text-muted transition-colors hover:border-foreground hover:text-foreground"
            >
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: a.accent }} />
              {a.name}
              <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
