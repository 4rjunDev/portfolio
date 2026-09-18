import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { apps, getApp } from "@/data/apps";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { Reveal } from "@/components/reveal";
import { PhoneFrame } from "@/components/phone-frame";
import { StackPill } from "@/components/stack-pill";
import { EthosPill } from "@/components/ethos";

export function generateStaticParams() {
  return apps.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const app = getApp(slug);
  if (!app) return {};
  const title = app.displayName ?? app.name;
  const image = { url: `og/${app.slug}.png`, width: 1200, height: 630, alt: `${app.name} — ${app.tagline}` };
  return {
    title,
    description: app.tagline,
    openGraph: { type: "article", siteName: "ADHD Studios", title: `${app.name} — ADHD Studios`, description: app.tagline, images: [image] },
    twitter: { card: "summary_large_image", title: `${app.name} — ADHD Studios`, description: app.tagline, images: [image.url] },
  };
}

export default async function AppDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const app = getApp(slug);
  if (!app) notFound();

  const index = apps.findIndex((a) => a.slug === slug);
  const more = [1, 2, 3].map((k) => apps[(index + k) % apps.length]);
  const screens: (string | undefined)[] = app.screenshots.length ? app.screenshots : [undefined];

  return (
    <div className="flex flex-1 flex-col">
      <Nav />
      <main className="relative w-full pt-28 pb-24">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[70vh]"
          style={{ background: `radial-gradient(60% 50% at 50% 0%, ${app.accent}26 0%, transparent 70%)` }}
        />

        <div className="mx-auto max-w-6xl px-6 md:px-10">
          <Reveal>
            <Link
              href="/#work"
              className="mb-10 inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-foreground"
            >
              <ArrowLeft size={16} /> All apps
            </Link>
          </Reveal>

          <Reveal>
            <div className="flex items-center gap-4 text-xs text-muted">
              <span className="font-mono tabular-nums">{String(index + 1).padStart(2, "0")}</span>
              <span className="h-px w-10 bg-border" />
              <span className="uppercase tracking-[0.2em]">{app.category}</span>
              {app.ethos && (
                <Link href="/#ethos">
                  <EthosPill />
                </Link>
              )}
            </div>
            <h1 className="font-display mt-4 text-5xl tracking-tight sm:text-6xl lg:text-7xl">
              {app.displayName ?? app.name}
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">{app.tagline}</p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-6 flex flex-wrap gap-2">
              {app.stack.map((t) => (
                <StackPill key={t} name={t} />
              ))}
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <div className="mt-14 flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-6 md:px-10 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <div className="shrink-0 w-[calc((100vw-72rem)/2-1.5rem)] max-md:hidden" />
            {screens.map((src, i) => (
              <div key={src ?? i} className="w-[220px] shrink-0 snap-center sm:w-[260px]">
                <PhoneFrame app={app} src={src} priority sizes="260px" />
              </div>
            ))}
            {app.landscapeScreens?.map((src) => (
              <div key={src} className="flex w-[476px] shrink-0 snap-center items-center sm:w-[563px]">
                <PhoneFrame app={app} src={src} landscape priority sizes="563px" />
              </div>
            ))}
          </div>
        </Reveal>

        <div className="mx-auto mt-16 grid max-w-6xl gap-12 px-6 md:grid-cols-[1.3fr_1fr] md:gap-20 md:px-10">
          <div>
            <Reveal>
              <p className="text-lg leading-relaxed text-foreground/90">{app.description}</p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="font-display mt-12 mb-5 text-2xl">Key features</h2>
              <ul className="grid gap-3 sm:grid-cols-2">
                {app.features.map((f) => (
                  <li
                    key={f}
                    className="flex gap-3 rounded-2xl border border-card-border bg-card/50 p-4 text-sm leading-relaxed text-foreground/90"
                  >
                    <span
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full"
                      style={{ background: app.accent, boxShadow: `0 0 8px ${app.accent}` }}
                    />
                    {f}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <div className="md:sticky md:top-28 md:self-start">
            <Reveal delay={0.15}>
              <dl className="divide-y divide-border rounded-3xl border border-card-border bg-card/50 p-6 text-sm">
                <div className="pb-4">
                  <dt className="text-muted">Status</dt>
                  <dd className="mt-1 font-medium">{app.status}</dd>
                  <dd className="mt-0.5 text-xs text-muted">{app.statusDetail}</dd>
                </div>
                <div className="py-4">
                  <dt className="text-muted">Year</dt>
                  <dd className="mt-1 font-medium">{app.year}</dd>
                </div>
                <div className="pt-4">
                  <dt className="text-muted">Platform</dt>
                  <dd className="mt-1 font-medium">
                    {app.slug === "tennis-trivia" ? "iOS + macOS" : "iOS"}
                  </dd>
                </div>
              </dl>
            </Reveal>
          </div>
        </div>

        <div className="mx-auto mt-24 max-w-6xl px-6 md:px-10">
          <Reveal>
            <p className="mb-5 text-sm uppercase tracking-[0.2em] text-muted">More apps</p>
            <ul className="grid gap-3 sm:grid-cols-3">
              {more.map((m) => (
                <li key={m.slug}>
                  <Link
                    href={`/apps/${m.slug}`}
                    className="group flex items-center gap-4 rounded-2xl border border-card-border bg-card/50 p-4 transition-all hover:-translate-y-0.5 hover:bg-card"
                  >
                    <div className="w-12 shrink-0">
                      <PhoneFrame app={m} src={m.screenshots[0]} sizes="60px" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-display text-xl leading-tight">{m.name}</p>
                      <p className="truncate text-xs text-muted">{m.category}</p>
                    </div>
                    <ArrowUpRight size={16} className="text-muted transition-all group-hover:text-foreground" />
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </main>
      <Footer />
    </div>
  );
}
