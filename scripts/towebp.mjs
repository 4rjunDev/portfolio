// Convert every PNG under public/apps/ to a resized WebP and delete the PNG.
//   npm run webp
// Portrait shots are capped at 720px wide, landscape at 1440px (2x the largest
// frame they render in). Uses Chromium's encoder via Playwright, so no native
// image tooling is needed. Afterwards, point src/data/apps.ts at the .webp names.
import { chromium } from "playwright";
import { readdirSync, readFileSync, statSync, writeFileSync, unlinkSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = fileURLToPath(new URL("../public/apps", import.meta.url));
const files = [];
for (const dir of readdirSync(ROOT, { withFileTypes: true })) {
  if (!dir.isDirectory()) continue;
  for (const f of readdirSync(join(ROOT, dir.name))) if (f.endsWith(".png")) files.push(join(ROOT, dir.name, f));
}
if (!files.length) {
  console.log("No PNGs under public/apps — nothing to do.");
  process.exit(0);
}

const browser = await chromium.launch();
const page = await browser.newPage();
let before = 0;
let after = 0;
for (const file of files) {
  before += statSync(file).size;
  const dataUrl = `data:image/png;base64,${readFileSync(file).toString("base64")}`;
  const b64 = await page.evaluate(async (url) => {
    const img = new Image();
    img.src = url;
    await img.decode();
    const maxW = img.naturalHeight > img.naturalWidth ? 720 : 1440;
    const scale = Math.min(1, maxW / img.naturalWidth);
    const c = document.createElement("canvas");
    c.width = Math.round(img.naturalWidth * scale);
    c.height = Math.round(img.naturalHeight * scale);
    const ctx = c.getContext("2d");
    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(img, 0, 0, c.width, c.height);
    return c.toDataURL("image/webp", 0.84).split(",")[1];
  }, dataUrl);
  const out = file.replace(/\.png$/, ".webp");
  writeFileSync(out, Buffer.from(b64, "base64"));
  after += statSync(out).size;
  unlinkSync(file);
  console.log("  " + out.slice(ROOT.length + 1));
}
await browser.close();
console.log(`Converted ${files.length} file(s): ${(before / 1e6).toFixed(2)}MB -> ${(after / 1e6).toFixed(2)}MB`);
