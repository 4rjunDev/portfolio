import { chromium } from "playwright";
import { writeFileSync, mkdirSync } from "node:fs";
import { pathToFileURL } from "node:url";

import { fileURLToPath } from "node:url";
import { tmpdir } from "node:os";
const ROOT = fileURLToPath(new URL("..", import.meta.url)).replace(/\/$/, "");
const OUT = `${ROOT}/public/og`;
const TMP = `${tmpdir()}/portfolio-og`;
mkdirSync(OUT, { recursive: true });
mkdirSync(TMP, { recursive: true });

// Pull the app data out of the TS file without a TS toolchain: strip the type block and evaluate.
const ts = (await import("node:fs")).readFileSync(`${ROOT}/src/data/apps.ts`, "utf8");
const body = ts.slice(ts.indexOf("export const apps"), ts.indexOf("export function getApp"));
const apps = new Function(body.replace("export const apps: App[] =", "return") )();

const pillColor = (n) => {
  if (/swift|observation|xcodegen|swiftdata/i.test(n)) return "#f97316";
  if (/supabase|postgres|rls|edge function|apns/i.test(n)) return "#3ecf8e";
  if (/maplibre|ferrostar|valhalla|corelocation/i.test(n)) return "#2dd4bf";
  if (/kit|store|avfoundation|multipeer|background|keychain|extension|apple|macos|xcuitest|speech|oauth/i.test(n)) return "#60a5fa";
  return "#e879f9";
};

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");

function screen(app, src, variant = 0) {
  if (src) return `<img src="${pathToFileURL(ROOT + "/public" + src).href}" />`;
  const a = app.accent;
  const origins = ["20% 10%", "80% 20%", "50% 90%"];
  const rows = [[0.85, 0.6, 0.72], [0.5, 0.8, 0.65], [0.7, 0.45, 0.9]];
  const heroH = [34, 24, 44][variant];
  return `<div class="mock">
    <div class="mock-bar"><span>9:41</span><span>●●▬</span></div>
    <div class="mock-cat">${esc(app.category)}</div>
    <div class="mock-name">${esc(app.name)}</div>
    <div class="mock-hero" style="height:${heroH}%;background:radial-gradient(120% 90% at ${origins[variant]}, ${a} 0%, ${a}66 35%, #161615 75%)"><i></i><i></i></div>
    ${rows[variant].map((w, i) => `<div class="mock-row"><b style="background:${i === variant % 3 ? a : "#232322"}"></b><span><i style="width:${w * 100}%"></i><i></i></span></div>`).join("")}
  </div>`;
}

function phones(list) {
  const rot = [-8, 0, 8];
  const z = [1, 3, 2];
  const y = [26, 0, 26];
  return list.map((p, i) => `<div class="phone${i === 1 ? " mid" : ""}" style="transform:translateY(${y[i]}px) rotate(${rot[i]}deg);z-index:${z[i]}">
    <div class="phone-in">${screen(p.app, p.src, i)}${p.src && p.app.islandInCapture ? "" : '<span class="island"></span>'}${p.src && !p.app.islandInCapture ? '<span class="sbar"><b>9:41</b><i></i></span>' : ""}</div></div>`).join("");
}

function html({ eyebrow, title, blurb, pills, accent, phoneList, index }) {
  return `<!doctype html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..600;1,9..144,300..600&family=Inter:wght@400;500&family=JetBrains+Mono&display=swap" rel="stylesheet">
<style>
  * { box-sizing: border-box; margin: 0; }
  body { width: 1200px; height: 630px; overflow: hidden; background: #0a0a09; color: #f4f2ec; font-family: Inter, sans-serif; position: relative; }
  .grid { position: absolute; inset: 0; background-image: radial-gradient(rgba(244,242,236,.13) 1px, transparent 1px); background-size: 28px 28px; -webkit-mask-image: radial-gradient(ellipse 70% 70% at 30% 40%, #000 10%, transparent 70%); }
  .glow { position: absolute; width: 900px; height: 900px; right: -220px; top: -260px; border-radius: 50%; background: radial-gradient(circle, ${accent}55, transparent 62%); filter: blur(40px); }
  .glow2 { position: absolute; width: 600px; height: 600px; left: -200px; bottom: -300px; border-radius: 50%; background: radial-gradient(circle, #ff6a3333, transparent 65%); filter: blur(30px); }
  .left { position: absolute; left: 72px; top: 64px; width: 470px; }
  .eyebrow { display: flex; align-items: center; gap: 12px; font-size: 15px; letter-spacing: .25em; text-transform: uppercase; color: #8f8d84; }
  .eyebrow b { width: 9px; height: 9px; border-radius: 50%; background: #ff6a33; box-shadow: 0 0 14px #ff6a33; }
  .index { font-family: "JetBrains Mono", monospace; font-size: 14px; color: #8f8d84; margin-left: 6px; }
  h1 { font-family: Fraunces, serif; font-weight: 400; font-variation-settings: "opsz" 144; font-size: ${title.length > 14 ? 88 : 104}px; line-height: .98; letter-spacing: -.02em; margin-top: 26px; }
  h1 em { font-style: italic; color: #8f8d84; }
  p { margin-top: 26px; font-size: 23px; line-height: 1.4; color: #a9a79e; max-width: 460px; }
  .pills { position: absolute; left: 72px; bottom: 56px; width: 470px; display: flex; flex-wrap: wrap; gap: 10px; }
  .pill { display: inline-flex; align-items: center; gap: 9px; padding: 9px 15px; border-radius: 999px; border: 1px solid rgba(244,242,236,.14); background: rgba(18,18,16,.8); font-size: 15px; font-weight: 500; }
  .pill i { width: 7px; height: 7px; border-radius: 50%; }
  .brand { position: absolute; right: 64px; bottom: 56px; font-family: Fraunces, serif; font-size: 20px; color: #8f8d84; }
  .phones { position: absolute; right: 64px; top: 50%; transform: translateY(-50%); display: flex; align-items: center; }
  /* iPhone Pro body proportions: 71.9 x 150 mm, ~2.2% bezel, 15%-of-width body corners */
  .phone { width: 176px; aspect-ratio: 71.9/150; border-radius: 15% / 7.2%; background: #0a0a0a; padding: 2.2%; box-shadow: 0 40px 90px -20px rgba(0,0,0,.85), inset 0 0 0 1px rgba(255,255,255,.14); margin-left: -38px; flex: none; }
  .phone.mid { width: 200px; }
  .phone-in { position: relative; width: 100%; height: 100%; border-radius: 13.5% / 6.4%; overflow: hidden; background: #000; }
  .phone-in img { width: 100%; height: 100%; object-fit: cover; display: block; }
  .island { position: absolute; top: 1.6%; left: 50%; transform: translateX(-50%); width: 31%; height: 4%; border-radius: 999px; background: #000; }
  .sbar { position: absolute; top: 2.3%; left: 8.5%; right: 8.5%; display: flex; justify-content: space-between; align-items: center; color: #fff; mix-blend-mode: difference; font-size: 8px; font-weight: 600; }
  .sbar i { width: 13px; height: 6px; border: 1px solid #fff; border-radius: 2px; box-shadow: inset 0 0 0 1px #000, inset 10px 0 0 0 #fff; }
  .mock { position: absolute; inset: 0; background: #0c0c0b; padding: 14px; color: #fff; }
  .mock-bar { display: flex; justify-content: space-between; font-size: 7px; color: rgba(255,255,255,.6); margin-top: 20px; }
  .mock-cat { font-size: 6px; letter-spacing: .25em; text-transform: uppercase; color: rgba(255,255,255,.4); margin-top: 14px; }
  .mock-name { font-family: Fraunces, serif; font-size: 18px; margin-top: 3px; letter-spacing: -.02em; }
  .mock-hero { height: 34%; border-radius: 12px; margin-top: 14px; display: flex; flex-direction: column; justify-content: flex-end; padding: 10px; gap: 4px; }
  .mock-hero i { display: block; height: 4px; border-radius: 4px; background: rgba(255,255,255,.7); width: 66%; } .mock-hero i + i { width: 50%; background: rgba(255,255,255,.35); height: 3px; }
  .mock-row { display: flex; align-items: center; gap: 7px; margin-top: 9px; } .mock-row b { width: 20px; height: 20px; border-radius: 6px; flex: none; }
  .mock-row span { flex: 1; } .mock-row span i { display: block; height: 4px; border-radius: 4px; background: rgba(255,255,255,.6); } .mock-row span i + i { width: 33%; height: 3px; background: rgba(255,255,255,.25); margin-top: 3px; }
</style></head><body>
  <div class="grid"></div><div class="glow"></div><div class="glow2"></div>
  <div class="left">
    <div class="eyebrow"><b></b>${esc(eyebrow)}${index ? `<span class="index">${index}</span>` : ""}</div>
    <h1>${title}</h1>
    <p>${esc(blurb)}</p>
  </div>
  <div class="phones">${phones(phoneList)}</div>
  <div class="pills">${pills.map((n) => `<span class="pill"><i style="background:${pillColor(n)};box-shadow:0 0 10px ${pillColor(n)}"></i>${esc(n)}</span>`).join("")}</div>
</body></html>`;
}

const bySlug = Object.fromEntries(apps.map((a) => [a.slug, a]));
const jobs = [
  {
    file: "home",
    eyebrow: "ADHD Studios · iOS",
    title: `Native things,<br><em>shipped</em> fast.`,
    blurb: `An iOS studio building SwiftUI apps at speed — ${apps.length} in flight, from social and sports to sharp little utilities.`,
    pills: ["SwiftUI", "Supabase", "WidgetKit"],
    accent: "#ff6a33",
    phoneList: [
      { app: bySlug.grid, src: bySlug.grid.screenshots[0] },
      { app: bySlug.convoy, src: bySlug.convoy.screenshots[0] },
      { app: bySlug.moody, src: bySlug.moody.screenshots[0] },
    ],
  },
  ...apps.map((a, i) => ({
    file: a.slug,
    eyebrow: `ADHD Studios · ${a.category}`,
    index: `${String(i + 1).padStart(2, "0")}/${apps.length}`,
    title: esc(a.name),
    blurb: a.tagline,
    pills: a.stack.slice(0, 3),
    accent: a.accent,
    phoneList: [0, 1, 2].map((k) => ({ app: a, src: a.screenshots[k] ?? a.screenshots[0] })),
  })),
];

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
for (const job of jobs) {
  const p = `${TMP}/${job.file}.html`;
  writeFileSync(p, html(job));
  await page.goto(pathToFileURL(p).href, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(250);
  await page.screenshot({ path: `${OUT}/${job.file}.png`, type: "png" });
  console.log("wrote", job.file);
}
await browser.close();
