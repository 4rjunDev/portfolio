// Paint the Dynamic Island out of simulator captures.
//   node scripts/remove-island.mjs public/apps/convoy/02-map.webp [...more]
// Each row (portrait) or column (landscape) across the pill is replaced with a
// linear blend between the pixels just outside it, so maps and gradients stay
// continuous. Writes <name>-n.webp next to the source and deletes the source.
import { chromium } from "playwright";
import { readFileSync, writeFileSync, unlinkSync } from "node:fs";

const files = process.argv.slice(2);
if (!files.length) {
  console.log("usage: node scripts/remove-island.mjs <image.webp> [...]");
  process.exit(1);
}

const browser = await chromium.launch();
const page = await browser.newPage();
for (const file of files) {
  const mime = file.endsWith(".png") ? "image/png" : "image/webp";
  const dataUrl = `data:${mime};base64,${readFileSync(file).toString("base64")}`;
  const b64 = await page.evaluate(async (url) => {
    const img = new Image();
    img.src = url;
    await img.decode();
    const W = img.naturalWidth, H = img.naturalHeight;
    const c = document.createElement("canvas");
    c.width = W; c.height = H;
    const ctx = c.getContext("2d");
    ctx.drawImage(img, 0, 0);
    const portrait = H > W;
    // Pill bounds with a little margin, as fractions of the long/short edges.
    const a0 = 0.325, a1 = 0.675; // along the short edge (centered)
    const b0 = 0.006, b1 = 0.064; // depth from the top (portrait) / left (landscape)
    const d = ctx.getImageData(0, 0, W, H);
    const px = (x, y) => (y * W + x) * 4;
    if (portrait) {
      const x0 = Math.round(W * a0), x1 = Math.round(W * a1);
      for (let y = Math.round(H * b0); y <= Math.round(H * b1); y++) {
        const L = px(x0 - 1, y), R = px(x1 + 1, y);
        for (let x = x0; x <= x1; x++) {
          const t = (x - x0 + 1) / (x1 - x0 + 2), i = px(x, y);
          for (let k = 0; k < 3; k++) d.data[i + k] = d.data[L + k] * (1 - t) + d.data[R + k] * t;
        }
      }
    } else {
      const y0 = Math.round(H * a0), y1 = Math.round(H * a1);
      for (let x = Math.round(W * b0); x <= Math.round(W * b1); x++) {
        const T = px(x, y0 - 1), B = px(x, y1 + 1);
        for (let y = y0; y <= y1; y++) {
          const t = (y - y0 + 1) / (y1 - y0 + 2), i = px(x, y);
          for (let k = 0; k < 3; k++) d.data[i + k] = d.data[T + k] * (1 - t) + d.data[B + k] * t;
        }
      }
    }
    ctx.putImageData(d, 0, 0);
    return c.toDataURL("image/webp", 0.9).split(",")[1];
  }, dataUrl);
  const out = /-n\.webp$/.test(file) ? file : file.replace(/\.(webp|png)$/, "-n.webp");
  writeFileSync(out, Buffer.from(b64, "base64"));
  if (out !== file) unlinkSync(file);
  console.log("  " + out);
}
await browser.close();
