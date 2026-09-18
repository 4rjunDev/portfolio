import { chromium } from "playwright";
import { fileURLToPath } from "node:url";
const APP = fileURLToPath(new URL("../src/app", import.meta.url));
const html = (r) => `<!doctype html><link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@1,9..144,500&display=swap" rel="stylesheet">
<style>*{margin:0}body{width:512px;height:512px;background:transparent}
.i{width:512px;height:512px;border-radius:${r}px;background:radial-gradient(120% 120% at 20% 0%,#2a1a12 0%,#0a0a09 60%);display:flex;align-items:center;justify-content:center;position:relative;overflow:hidden}
.i span{font-family:Fraunces,serif;font-style:italic;font-weight:500;font-size:400px;line-height:1;color:#f4f2ec;margin-top:-50px;margin-left:-30px}
.i b{position:absolute;right:104px;bottom:118px;width:60px;height:60px;border-radius:50%;background:#ff6a33;box-shadow:0 0 50px #ff6a33}</style>
<div class="i"><span>a</span><b></b></div>`;
const br = await chromium.launch();
for (const [file, r, size] of [["icon.png", 112, 512], ["apple-icon.png", 0, 180]]) {
  const p = await br.newPage({ viewport: { width: 512, height: 512 }, deviceScaleFactor: size / 512 });
  await p.setContent(html(r)); await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(400);
  await p.screenshot({ path: `${APP}/${file}`, omitBackground: true });
  await p.close();
}
await br.close(); console.log("icons written");
