import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { apps, getApp } from "@/data/apps";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { Reveal } from "@/components/reveal";
import { PhoneFrame } from "@/components/phone-frame";

export function generateStaticParams() {
  return apps.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const app = getApp(slug);
  if (!app) return {};
  return { title: app.name, description: app.tagline };
}

export default async function AppDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const app = getApp(slug);
  if (!app) notFound();

  const index = apps.findIndex((a) => a.slug === slug);
  const next = apps[(index + 1) % apps.length];

  return (
    <div className="flex flex-1 flex-col">
      <Nav />
      <main className="mx-auto w-full max-w-5xl px-6 pt-32 pb-24 md:px-10">
        <Reveal>
          <Link
            href="/#work"
            className="mb-10 inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-foreground"
          >
            <ArrowLeft size={16} /> All work
          </Link>
        </Reveal>

        <div className="grid gap-12 md:grid-cols-[1fr_1.3fr] md:gap-16">
          <Reveal className="order-2 md:order-1">
            <div className="flex gap-4 overflow-x-auto pb-2 md:sticky md:top-28 md:flex-col md:gap-6 md:overflow-visible">
              {(app.screenshots.length ? app.screenshots : [undefined]).map((src, i) => (
                <div key={src ?? i} className="w-40 shrink-0 md:w-full">
                  <PhoneFrame
                    src={src}
                    alt={`${app.name} screenshot ${i + 1}`}
                    placeholder={{ name: app.name, tagline: app.category }}
                    priority={i === 0}
                  />
                </div>
              ))}
            </div>
          </Reveal>

          <div className="order-1 md:order-2">
            <Reveal>
              <p className="mb-3 text-sm uppercase tracking-[0.2em] text-muted">{app.category}</p>
              <h1 className="font-display text-5xl tracking-tight sm:text-6xl">
                {app.displayName ?? app.name}
              </h1>
              <p className="mt-5 text-lg leading-relaxed text-muted">{app.tagline}</p>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="mt-8 leading-relaxed text-foreground/90">{app.description}</p>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="mt-10 grid grid-cols-2 gap-6 border-y border-border py-6 text-sm">
                <div>
                  <p className="text-muted">Status</p>
                  <p className="mt-1 font-medium">{app.status}</p>
                  <p className="mt-0.5 text-xs text-muted">{app.statusDetail}</p>
                </div>
                <div>
                  <p className="text-muted">Year</p>
                  <p className="mt-1 font-medium">{app.year}</p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <h2 className="mt-10 mb-4 font-display text-xl">Key features</h2>
              <ul className="space-y-3">
                {app.features.map((f) => (
                  <li key={f} className="flex gap-3 text-sm leading-relaxed text-foreground/90">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                    {f}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.25}>
              <h2 className="mt-10 mb-4 font-display text-xl">Tech stack</h2>
              <div className="flex flex-wrap gap-2">
                {app.stack.map((t) => (
                  <span key={t} className="rounded-full border border-border px-3 py-1.5 text-xs text-muted">
                    {t}
                  </span>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.3}>
              <Link
                href={`/apps/${next.slug}`}
                className="mt-14 inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-foreground"
              >
                Next: {next.name} <ArrowLeft size={16} className="rotate-180" />
              </Link>
            </Reveal>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
