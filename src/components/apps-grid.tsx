import { apps } from "@/data/apps";
import { AppCard } from "@/components/app-card";
import { Reveal } from "@/components/reveal";

export function AppsGrid() {
  return (
    <section id="work" className="mx-auto max-w-5xl px-6 py-28 md:px-10">
      <Reveal>
        <div className="mb-14 flex items-end justify-between gap-6">
          <div>
            <p className="mb-3 text-sm uppercase tracking-[0.2em] text-muted">Selected work</p>
            <h2 className="font-display text-4xl tracking-tight sm:text-5xl">
              {apps.length} apps, shipped fast.
            </h2>
          </div>
        </div>
      </Reveal>

      <div className="flex flex-col gap-5">
        {apps.map((app, i) => (
          <AppCard key={app.slug} app={app} index={i} />
        ))}
      </div>
    </section>
  );
}
