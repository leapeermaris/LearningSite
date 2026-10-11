// Fails if an em dash (U+2014) or en dash (U+2013) appears anywhere in the project's own files.
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const skip = new Set(["node_modules", ".git", "reference", ".react-router"]);
const bad = [];
const walk = (dir) => {
  for (const f of readdirSync(dir)) {
    if (skip.has(f)) continue;
    const p = join(dir, f);
    const st = statSync(p);
    if (st.isDirectory()) walk(p);
    else if (/\.(tsx?|mdx?|css|html|json|xml|txt|toml|mjs|js|svg)$/.test(f) && !f.endsWith("package-lock.json")) {
      readFileSync(p, "utf8").split("\n").forEach((line, i) => {
        if (/[\u2013\u2014]/.test(line)) bad.push(`${p}:${i + 1}: ${line.trim().slice(0, 100)}`);
      });
    }
  }
};
walk(".");
if (bad.length) {
  console.error(`Found ${bad.length} lines with em/en dashes:\n` + bad.join("\n"));
  process.exit(1);
}
console.log("check-dashes: 0 em/en dashes");
