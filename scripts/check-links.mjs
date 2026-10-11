// Checks every internal link, anchor and asset reference in the built site (build/client).
import { readFileSync, existsSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const root = "build/client";
const pages = [];
const walk = (d) => readdirSync(d).forEach((f) => { const p = join(d, f); statSync(p).isDirectory() ? walk(p) : f.endsWith(".html") && pages.push(p); });
walk(root);

const resolvePage = (path) => {
  const clean = path.replace(/\/$/, "");
  for (const c of [join(root, clean, "index.html"), join(root, clean), join(root, clean + ".html")]) if (existsSync(c) && statSync(c).isFile()) return c;
  return null;
};
const ids = (html) => new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));

let broken = 0, checked = 0;
const external = new Set();
for (const page of pages) {
  if (page.includes("__spa-fallback")) continue;
  const html = readFileSync(page, "utf8");
  for (const [, url] of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    if (/^(https?:|mailto:|tel:)/.test(url)) { if (url.startsWith("http")) external.add(url.split("?")[0]); continue; }
    checked++;
    const [path, hash] = url.split("#");
    const target = path === "" ? page : resolvePage(path);
    if (!target) { broken++; console.log(`BROKEN ${page}: ${url}`); continue; }
    if (hash && target.endsWith(".html") && !ids(readFileSync(target, "utf8")).has(hash)) { broken++; console.log(`MISSING ANCHOR ${page}: ${url}`); }
  }
}
console.log(`check-links: ${pages.length} pages, ${checked} internal refs, ${broken} broken`);
console.log("external links found:\n  " + [...external].sort().join("\n  "));
process.exit(broken ? 1 : 0);
