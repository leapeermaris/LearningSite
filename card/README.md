# כרטיס דיגיטלי · לאה מריס

דף עצמאי, בלי בנייה. כל מה שבתיקייה הזו עולה כמו שהוא.

## העלאה ל-Netlify
**הכי מהיר:** גוררים את התיקייה `card` אל https://app.netlify.com/drop ואז ב-Site configuration משנים את שם האתר ל-`lea-maris-card`.
**מהריפו:** Add new site → Import from Git, עם **Base directory = `card`**, Build command ריק, Publish directory = `card`.

אם שם האתר שונה מ-`lea-maris-card`, צריך לעדכן את הכתובת ב-`index.html` (canonical, og:url, og:image) כדי שהתצוגה המקדימה בוואטסאפ תעבוד.

## טופס השארת פרטים (חובה, פעם אחת)
הטופס עובד דרך Netlify Forms:
1. באתר ב-Netlify: **Site configuration → Forms → Enable form detection**, ואז לפרסם מחדש (לגרור שוב את התיקייה).
2. **Forms → Form notifications → Add notification → Email notification**, לטופס `card-contact`, לכתובת leamaris.od@gmail.com.
3. לשלוח פנייה לבדיקה מהכרטיס, ולוודא שהגיע מייל.

## יומן גוגל לקביעת פגישות
1. ב-calendar.google.com: **יצירה → לוח זמנים לפגישות (Appointment schedule)**.
2. משך 30 דקות, השעות הפנויות, ובחירה אם בזום, ב-Google Meet או בטלפון. שמירה.
3. **שיתוף → העתקת הקישור** לדף ההזמנות.
4. ב-`index.html` מדביקים את הקישור ב-`const BOOKING_URL = "";`. הכפתור "לתיאום שיחת היכרות" יפתח את היומן. כל עוד הוא ריק, הכפתור מוביל לטופס.

## קבצים
- `index.html`: הכרטיס
- `lea-maris.vcf`: איש הקשר עם תמונה (כפתור "שמירה באנשי הקשר")
- `og.jpg`: התמונה שמופיעה כששולחים את הקישור בוואטסאפ ובלינקדאין
- `qrcode.js`: יצירת קוד QR (ספריית qrcode-generator, רישיון MIT)
- `_headers`: מוודא שקובץ איש הקשר נפתח נכון בטלפון

## הוספת המלצות
בתחתית `index.html` יש `const TESTIMONIALS = [];`. מוסיפים רק המלצות אמיתיות, באישור:
`{ quote: "טקסט", name: "שם", role: "תפקיד, ארגון" }`. הסקשן מופיע אוטומטית כשיש לפחות אחת.
