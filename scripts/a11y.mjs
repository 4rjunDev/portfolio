// Accessibility audit with axe-core in WebKit + Chromium.
//   npm run a11y            (against the dev server on :3008)
//   npm run a11y -- <url>   (any base URL)
import { chromium, webkit } from "playwright";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
const axe = readFileSync(createRequire(import.meta.url).resolve("axe-core/axe.min.js"), "utf8");
const base = (process.argv[2] || "http://localhost:3008").replace(/\/$/, "");
const paths = ["/", "/apps/moody/", "/apps/convoy/", "/nope"];
let total = 0;
for (const [name, engine] of [["webkit", webkit], ["chromium", chromium]]) {
  const b = await engine.launch();
  for (const theme of ["dark", "light"]) {
    const p = await b.newPage({ viewport: { width: 1280, height: 900 }, colorScheme: theme });
    for (const path of paths) {
      await p.goto(base + path, { waitUntil: "load" });
      await p.evaluate((t) => { localStorage.setItem("theme", t); document.documentElement.setAttribute("data-theme", t); }, theme);
      // reveal everything so hidden-until-scrolled content is audited too
      await p.addStyleTag({ content: "*{opacity:1!important;transform:none!important;transition:none!important;animation:none!important}" });
      await p.waitForTimeout(600);
      await p.addScriptTag({ content: axe });
      const res = await p.evaluate(async () => (await window.axe.run(document, { resultTypes: ["violations"] })).violations
        .map((v) => ({ id: v.id, impact: v.impact, n: v.nodes.length, help: v.help, eg: v.nodes.slice(0, 2).map((x) => x.target.join(" ") + (x.any[0]?.message ? " — " + x.any[0].message.slice(0, 110) : "")) })));
      for (const v of res) { total += v.n; console.log(`[${name}/${theme}] ${path} ${v.impact} ${v.id} x${v.n}: ${v.help}\n    ${v.eg.join("\n    ")}`); }
    }
    await p.close();
  }
  await b.close();
}
console.log(total ? `\n${total} violating node(s)` : "No violations.");
process.exitCode = total ? 1 : 0;
