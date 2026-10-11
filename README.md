# לאה מריס · ייעוץ ופיתוח ארגוני

אתר תדמית ללמידה ופיתוח ארגוני. React Router 7 (pre-rendering מלא לכל העמודים), Vite, TypeScript, Tailwind 4, MDX. פריסה ב-Netlify.

מסמכי הפרויקט: `DESIGN.md` (מערכת העיצוב), `CONTENT.md` (התוכן המאושר), `INSPIRATION.md` (מחקר), `TODO.md` (מה חסר).

## פקודות

```bash
npm install
npm run dev          # פיתוח מקומי, placeholders מוצגים במסגרת מקווקוות
npm run build        # בנייה: HTML סטטי לכל עמוד ב-build/client, כולל sitemap.xml ו-404.html
npm run typecheck    # בדיקת TypeScript
npm run check:dashes # מוודא שאין מקף ארוך או בינוני בפרויקט
node scripts/check-links.mjs   # בדיקת קישורים שבורים באתר הבנוי (אחרי build)
```

## פריסה ב-Netlify (פעם אחת)

1. ב-Netlify: **Add new site → Import from Git**, ובוחרים את הריפו. ההגדרות נקראות מ-`netlify.toml`.
2. **חשוב:** ב-**Site configuration → Forms** להפעיל **Form detection**. בלי זה הטפסים לא יקבלו פניות.
3. ב-**Forms → Form notifications** להוסיף התראת מייל ל-Leapeermaris@gmail.com לכל טופס (contact, newsletter, waitlist, resource).
4. שם האתר ב-Netlify קובע את הכתובת. אם הוא שונה מ-`lea-maris-learning`, להגדיר משתנה סביבה `VITE_SITE_URL` עם הכתובת המלאה (משמש ל-canonical, sitemap ו-OG).
5. דומיין משלך בהמשך: מחברים ב-**Domain management**, ומעדכנים את `VITE_SITE_URL`.

Deploy previews (לכל PR) מציגים placeholders. האתר החי מסתיר אותם.

## איך מעדכנים תוכן

| מה | איפה |
|---|---|
| טקסטים של עמוד | `src/routes/<עמוד>.tsx` |
| המלצות, מקרי בוחן, מספרים, לוגואים | `src/data/proof.ts`: מחליפים את הטקסט ומשנים `placeholder: false` |
| תמונות של לאה | שמים את הקבצים ב-`public/images/` ומעדכנים את `IMAGES` ב-`src/lib/site.ts` |
| פרטי קשר, תפריט, CTA | `src/lib/site.ts` |
| מאמר חדש | קובץ `.mdx` חדש ב-`src/content/blog/` עם frontmatter כמו במאמרים הקיימים. העמוד, ה-sitemap והכרטיסים נוצרים אוטומטית |
| קורס חדש | מוסיפים אובייקט ל-`courses` ב-`src/data/courses.ts`. העמוד מתחלף מרשימת המתנה לקטלוג, ונוצר `/courses/<slug>` |
| חיבור טפסים לפלטפורמת דיוור | `src/lib/forms/config.ts`: משנים provider לטופס הרלוונטי |
| תמונות שיתוף (OG) וה-PDF החינמי | `CHROMIUM_PATH=<נתיב לכרום> node scripts/generate-assets.mjs` |

## מבנה

```
src/
  root.tsx            מעטפת: header, footer, skip link, וואטסאפ, ווידג'ט נגישות
  routes.ts           מפת הכתובות
  routes/             עמוד לכל כתובת
  components/         רכיבים משותפים, טפסים
  lib/                site.ts (עובדות), seo.ts (meta ו-schema), forms/ (handler אחד + config)
  data/               courses.ts, proof.ts
  content/blog/       מאמרים ב-MDX
public/               favicon, og, downloads, robots.txt
scripts/              postbuild, בדיקות, יצירת נכסים
```
