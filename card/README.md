# כרטיס דיגיטלי · לאה מריס

דף עצמאי, בלי בנייה. כל מה שבתיקייה הזו עולה כמו שהוא.

## העלאה ל-Netlify
**הכי מהיר:** גוררים את התיקייה `card` אל https://app.netlify.com/drop ואז ב-Site configuration משנים את שם האתר ל-`lea-maris-card`.
**מהריפו:** Add new site → Import from Git, עם **Base directory = `card`**, Build command ריק, Publish directory = `card`.

אם שם האתר שונה מ-`lea-maris-card`, צריך לעדכן את הכתובת ב-`index.html` (canonical, og:url, og:image) כדי שהתצוגה המקדימה בוואטסאפ תעבוד.

## קבצים
- `index.html`: הכרטיס
- `lea-maris.vcf`: איש הקשר עם תמונה (כפתור "שמירה באנשי הקשר")
- `og.jpg`: התמונה שמופיעה כששולחים את הקישור בוואטסאפ ובלינקדאין
- `qrcode.js`: יצירת קוד QR (ספריית qrcode-generator, רישיון MIT)
- `_headers`: מוודא שקובץ איש הקשר נפתח נכון בטלפון

## הוספת המלצות
בתחתית `index.html` יש `const TESTIMONIALS = [];`. מוסיפים רק המלצות אמיתיות, באישור:
`{ quote: "טקסט", name: "שם", role: "תפקיד, ארגון" }`. הסקשן מופיע אוטומטית כשיש לפחות אחת.
