// Runs after `react-router build`: writes 404.html, sitemap.xml and fills SITE_URL in robots.txt.
import { readFileSync, writeFileSync, existsSync, readdirSync, statSync, copyFileSync, rmSync } from "node:fs";
import { join } from "node:path";

const out = "build/client";
const SITE_URL = (process.env.VITE_SITE_URL || "https://lea-maris-learning.netlify.app").replace(/\/$/, "");

// Netlify serves /404.html for unknown paths
if (existsSync(join(out, "404/index.html"))) {
  copyFileSync(join(out, "404/index.html"), join(out, "404.html"));
  rmSync(join(out, "404"), { recursive: true });
}

// Collect every pre-rendered page
const pages = [];
const walk = (dir) => {
  for (const f of readdirSync(dir)) {
    const p = join(dir, f);
    if (statSync(p).isDirectory()) walk(p);
    else if (f === "index.html") pages.push(p);
  }
};
walk(out);
const urls = pages
  .map((p) => "/" + p.slice(out.length + 1).replace(/index\.html$/, "").replace(/\/$/, ""))
  .map((u) => (u === "/" ? "/" : u))
  .filter((u) => !u.startsWith("/__"))
  .sort();

const today = new Date().toISOString().slice(0, 10);
const sitemap =
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  urls.map((u) => `  <url><loc>${SITE_URL}${u}</loc><lastmod>${today}</lastmod></url>`).join("\n") +
  `\n</urlset>\n`;
writeFileSync(join(out, "sitemap.xml"), sitemap);

const robots = join(out, "robots.txt");
writeFileSync(robots, readFileSync(robots, "utf8").replace("__SITE_URL__", SITE_URL));

console.log(`postbuild: ${urls.length} pages in sitemap, 404.html written`);
