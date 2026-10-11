// Generates OG share images, the apple-touch icon and the free-resource PDF from HTML templates.
// Usage: CHROMIUM_PATH=/path/to/chrome node scripts/generate-assets.mjs
// Re-run after changing article titles or the resource text. Outputs are committed in public/.
import { chromium } from "playwright-core";
import { readdirSync, readFileSync, mkdirSync } from "node:fs";
import { resolve } from "node:path";

const fontDir = resolve("node_modules/@fontsource");
const font = (pkg, file) => `url("file://${fontDir}/${pkg}/files/${file}") format("woff2")`;
const fontsCss = `
@font-face{font-family:Heebo;font-weight:400;src:${font("heebo", "heebo-hebrew-400-normal.woff2")};}
@font-face{font-family:Heebo;font-weight:600;src:${font("heebo", "heebo-hebrew-600-normal.woff2")};}
@font-face{font-family:Heebo;font-weight:400;src:${font("heebo", "heebo-latin-400-normal.woff2")};unicode-range:U+0000-00FF;}
@font-face{font-family:Frank;font-weight:600;src:${font("frank-ruhl-libre", "frank-ruhl-libre-hebrew-600-normal.woff2")};}
@font-face{font-family:Frank;font-weight:700;src:${font("frank-ruhl-libre", "frank-ruhl-libre-hebrew-700-normal.woff2")};}
*{margin:0;padding:0;box-sizing:border-box}
body{direction:rtl;font-family:Heebo,sans-serif;color:#0F0E0C;}
`;

const og = (title, eyebrow) => `<!doctype html><html lang="he" dir="rtl"><head><meta charset="utf-8"><style>${fontsCss}
body{width:1200px;height:630px;background:linear-gradient(120deg,#F3EEE6 0%,#E9E0D2 60%,#D8D3CA 100%);display:flex;flex-direction:column;justify-content:space-between;padding:72px 88px;}
.brand{font-family:Frank;font-weight:700;font-size:44px;color:#0E1A30}
.brand span{display:block;font-family:Heebo;font-weight:600;font-size:22px;color:#7A5F30;margin-top:6px;letter-spacing:1px}
.eyebrow{font-weight:600;font-size:24px;letter-spacing:2px;color:#7A5F30;margin-bottom:18px}
h1{font-family:Frank;font-weight:600;font-size:${title.length > 40 ? 56 : 66}px;line-height:1.18;color:#0E1A30;max-width:980px}
.bar{height:6px;width:120px;background:#8C6F3C;border-radius:3px}
</style></head><body><div class="brand">לאה מריס<span>ייעוץ ופיתוח ארגוני</span></div>
<div><div class="eyebrow">${eyebrow}</div><h1>${title}</h1></div><div class="bar"></div></body></html>`;

const icon = `<!doctype html><html><head><meta charset="utf-8"><style>${fontsCss}
body{width:180px;height:180px;background:#0E1A30;display:flex;align-items:center;justify-content:center}
b{font-family:Frank;font-weight:700;font-size:118px;color:#E5C88A;line-height:1;margin-top:-6px}</style></head><body><b>ל</b></body></html>`;

const questions = [
  ["האם זו בכלל בעיה של ידע?", "אם האנשים היו חייבים לעשות את זה נכון מחר בבוקר, הם היו יודעים איך? אם כן, הבעיה כנראה בתהליך, בכלים, בציפיות או בתמריצים. הדרכה לא תפתור אותה."],
  ["מה בדיוק אנשים צריכים לעשות אחרת?", "נסח התנהגות שאפשר לראות ולבדוק. לא \"לשפר תקשורת\", אלא למשל: \"כל מנהל צוות מקיים פגישת אחד על אחד של חצי שעה עם כל עובד, פעם בשבועיים\"."],
  ["איפה הם יתרגלו?", "רוב הזמן צריך ללכת לתרגול על מקרים אמיתיים מהארגון. ועוד משימה אחת לביצוע בעבודה עצמה, עם תאריך ומישהו ששואל אחר כך איך היה."],
  ["מה המנהל הישיר עושה לפני ואחרי?", "לפני: שיחה של עשר דקות על המטרה. אחרי שבועיים: \"מה ניסית? מה עבד? איפה נתקעת?\". בלי זה, הלמידה נשארת בכיתה."],
  ["איך ומתי נבדוק שזה עבד?", "החלט מראש איזו התנהגות בודקים, מי בודק (מנהל, צוות או נתון קיים), ומתי. בדרך כלל אחרי חודש עד שלושה חודשים."],
];
const pdf = `<!doctype html><html lang="he" dir="rtl"><head><meta charset="utf-8"><title>לפני שמזמינים הדרכה: 5 שאלות שחוסכות תקציב</title><style>${fontsCss}
@page{size:A4;margin:0}
body{width:210mm;height:297mm;background:#FAF8F4;padding:16mm 18mm 14mm;display:flex;flex-direction:column}
.top{display:flex;justify-content:space-between;align-items:flex-start;border-bottom:1.5px solid #8C6F3C;padding-bottom:6mm;margin-bottom:7mm}
.brand{font-family:Frank;font-weight:700;font-size:20pt;color:#0E1A30}
.brand span{display:block;font-family:Heebo;font-weight:600;font-size:9.5pt;color:#7A5F30}
.tag{font-size:9pt;font-weight:600;color:#7A5F30;border:1px solid #D8D2C4;border-radius:20px;padding:1.5mm 4mm;background:#F3EEE6}
h1{font-family:Frank;font-weight:600;font-size:24pt;line-height:1.2;color:#0E1A30;margin-bottom:3mm}
.lead{font-size:11pt;line-height:1.6;margin-bottom:6mm;color:#2E2C28}
ol{list-style:none;display:grid;gap:4.2mm;flex:1}
li{display:flex;gap:5mm;background:#F3EEE6;border:1px solid #D8D2C4;border-radius:10px;padding:4mm 5mm}
.n{flex-shrink:0;width:11mm;height:11mm;border-radius:50%;border:1.5px solid #8C6F3C;display:flex;align-items:center;justify-content:center;font-family:Frank;font-weight:700;font-size:15pt;color:#0E1A30;background:#FAF8F4}
h2{font-family:Frank;font-weight:600;font-size:13.5pt;color:#0E1A30;margin-bottom:1mm}
p{font-size:10pt;line-height:1.55}
.lines{margin-top:2.5mm;border-bottom:1px dashed #8f8676;height:5mm}
.foot{margin-top:6mm;display:flex;justify-content:space-between;align-items:center;background:#0E1A30;color:#FAF8F4;border-radius:10px;padding:4.5mm 6mm;font-size:10pt}
.foot b{color:#E5C88A;font-weight:600}
.foot span{direction:ltr;text-align:left;line-height:1.5}
</style></head><body>
<div class="top"><div class="brand">לאה מריס<span>ייעוץ ופיתוח ארגוני</span></div><div class="tag">כלי חינמי</div></div>
<h1>לפני שמזמינים הדרכה:<br>5 שאלות שחוסכות תקציב</h1>
<p class="lead">שב עם מי שמבקש את ההדרכה ועבור על חמש השאלות. אם יש תשובות טובות לכולן, ההדרכה תעבוד. אם לא, עדיף לגלות את זה עכשיו.</p>
<ol>${questions.map(([q, a], i) => `<li><div class="n">${i + 1}</div><div><h2>${q}</h2><p>${a}</p><div class="lines"></div></div></li>`).join("")}</ol>
<div class="foot"><div><b>רוצה לעבור על זה יחד?</b> שיחת היכרות של 30 דקות, ללא התחייבות.</div><span>050-570-0534<br>Leapeermaris@gmail.com</span></div>
</body></html>`;

const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH });
const page = await browser.newPage();
mkdirSync("public/og", { recursive: true });
mkdirSync("public/downloads", { recursive: true });

const shoot = async (html, path, w, h) => {
  await page.setViewportSize({ width: w, height: h });
  await page.setContent(html, { waitUntil: "load" });
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path, type: "png" });
};

await shoot(og("למידה שמזיזה ביצועים, לא רק משתתפים.", "למידה ופיתוח ארגוני"), "public/og/default.png", 1200, 630);
for (const f of readdirSync("src/content/blog").filter((f) => f.endsWith(".mdx"))) {
  const title = readFileSync(`src/content/blog/${f}`, "utf8").match(/^title: "(.*)"$/m)[1].replace(/\\"/g, '"');
  await shoot(og(title, "תוכן ומאמרים"), `public/og/${f.replace(/\.mdx$/, ".png")}`, 1200, 630);
}
await shoot(icon, "public/apple-touch-icon.png", 180, 180);

await page.setContent(pdf, { waitUntil: "load" });
await page.evaluate(() => document.fonts.ready);
await page.pdf({ path: "public/downloads/before-you-book-training.pdf", format: "A4", printBackground: true, tagged: true });
await page.setViewportSize({ width: 794, height: 1123 });
await page.screenshot({ path: process.env.PREVIEW_PATH || "pdf-preview.png" });

await browser.close();
console.log("assets generated");
