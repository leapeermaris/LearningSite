import { Link } from "react-router";
import type { Route } from "./+types/home";
import { buildMeta, faqLd } from "~/lib/seo";
import { AGENTS, CONTACT, CTA, PERSONAL_SITE_URL, SHOW_PLACEHOLDERS } from "~/lib/site";
import { posts } from "~/lib/blog";
import { clientLogos, homeTestimonials, trustStats } from "~/data/proof";
import { CheckList, CtaBand, CtaButton, Faq, PlaceholderGate, Portrait, Reassurance, SectionHead, SplitSection, Timeline, type FaqItem } from "~/components/blocks";
import { Testimonials } from "~/components/proof";
import { PostCard } from "~/components/PostCard";
import { IconExternal } from "~/components/Icons";

const faq: FaqItem[] = [
  {
    q: "מה ההבדל בין האתר הזה לבין אתר הליווי האישי שלך?",
    a: "כאן אני מתמקדת בלמידה ופיתוח: מערכי למידה לארגונים ותוכניות פיתוח למנהלים, עם יעדים ותוצרים מוגדרים. באתר הליווי האישי מפורטים מסלולי ליווי אישי צמוד ומתמשך למנהלים. אם אתה לא בטוח מה מתאים לך, נבין את זה יחד בשיחת ההיכרות.",
  },
  {
    q: "הארגון שלי קטן יחסית. זה רלוונטי?",
    a: "רוב העבודה שלי היא עם ארגונים בינוניים, אבל גם בארגון קטן אפשר להתחיל בצעד ממוקד: תוכנית כניסה לתפקיד למנהל חדש, או אבחון קצר שיראה איפה ההשקעה בלמידה תיתן הכי הרבה.",
  },
  {
    q: "העבודה בזום או פנים אל פנים?",
    a: "שתי האפשרויות פתוחות. שיחת ההיכרות מתקיימת בזום או בטלפון, ואת המשך העבודה מתאימים למה שנוח לך ולארגון.",
  },
  {
    q: "כמה זה עולה?",
    a: "זה תלוי בהיקף. אבחון ממוקד, תוכנית פיתוח מנהלים, ריטיינר חודשי ותוכנית אישית למנהל הם דברים שונים. אחרי שיחת ההיכרות תקבל הצעה כתובה עם מחיר קבוע.",
  },
  {
    q: "איך מתחילים?",
    a: "משאירים פרטים בעמוד צרו קשר, או שולחים הודעה בוואטסאפ. אחזור אליך תוך יום עסקים אחד, ונקבע שיחת היכרות של 30 דקות, בלי התחייבות.",
  },
];

export const meta: Route.MetaFunction = () =>
  buildMeta({
    title: "לאה מריס | למידה ופיתוח ארגוני לארגונים ולמנהלים",
    description:
      "בניית מערכי למידה, תוכניות פיתוח מנהלים וניהול תחום הלמידה במיקור חוץ לארגונים בינוניים. למידה שעוברת לשטח ומשפיעה על הביצועים.",
    path: "/",
    jsonLd: [faqLd(faq)],
  });

const trust = [
  { title: "15+ שנות ניסיון", text: "בניהול, משאבי אנוש, למידה ארגונית והדרכה." },
  { title: "מגזר ציבורי ועסקי", text: "מכירה מבפנים את שני העולמות, את הרגולציה, את הקצב ואת התרבות." },
  { title: "מנהלת למידה ארגונית, היום", text: "לא מייעצת מהצד. עושה את העבודה הזו כל יום, ולומדת לתואר שני בייעוץ ופיתוח ארגוני." },
];

const audiences = [
  {
    who: 'מנכ"ל בארגון בצמיחה',
    text: "הארגון גדל מהר יותר מהמנהלים שלו. אתה צריך שכבת ניהול שמחזיקה את הצמיחה, בלי לגייס מחלקת הדרכה שלמה.",
    href: "/organizations",
  },
  {
    who: "סמנכ\"ל או מנהל משאבי אנוש",
    text: "ההדרכה אצלך, בנוסף לגיוס, לרווחה ולכל השאר. אתה צריך שותפה מקצועית שתבנה תוכנית ותחזיק אותה, לא עוד ספק שמביא סדנה.",
    href: "/organizations",
  },
  {
    who: "מנהל הדרכה או רכז הדרכה",
    text: "יש לך רעיונות, אבל חסרים זמן, תקציב או גב מול ההנהלה. אתה צריך מתודולוגיה, כלים ומישהי שעשתה את העבודה הזו מבפנים.",
    href: "/organizations",
  },
  {
    who: "מנהל בתחילת הדרך או במעבר תפקיד",
    text: "נכנסת לתפקיד ניהולי ראשון, או עברת לתפקיד חדש. אתה רוצה תוכנית ברורה לחודשים הראשונים, וצוות שמתפתח איתך.",
    href: "/managers",
  },
];

const services = [
  {
    title: "אבחון צרכי למידה",
    tag: "לארגונים",
    text: "לפני שמשקיעים עוד שקל בהדרכה, מבינים מה באמת צריך להשתנות בעבודה, ומה בכלל לא בעיה של ידע.",
    href: "/organizations",
  },
  {
    title: "תוכניות פיתוח מנהלים",
    tag: "לארגונים",
    text: "תוכנית לשכבת הניהול, שבנויה על המיומנויות שהארגון שלך צריך, עם תרגול על מקרים אמיתיים ומדידה בשטח.",
    href: "/organizations",
  },
  {
    title: "ניהול הלמידה במיקור חוץ",
    tag: "לארגונים",
    text: "מנהלת למידה מקצועית כמה ימים בחודש: תוכנית שנתית, בחירת ספקים, מדידה ודיווח להנהלה. בלי לגייס משרה מלאה.",
    href: "/organizations",
  },
  {
    title: "תהליכי כניסה לתפקיד",
    tag: "לארגונים ולמנהלים",
    text: "מסלול קליטה מסודר לעובדים ולמנהלים חדשים, מהיום הראשון ועד סוף החודש השלישי, עם אחריות ברורה בכל שלב.",
    href: "/organizations",
  },
  {
    title: "שילוב AI בלמידה",
    tag: "לארגונים",
    text: "כלים ממוקדים, הנחיות שימוש ושפה משותפת, רק במקומות שבהם AI באמת חוסך זמן או משפר החלטה.",
    href: "/organizations",
  },
  {
    title: "תוכנית פיתוח אישית למנהלים",
    tag: "למנהלים",
    text: "מיפוי מיומנויות, תוכנית כניסה לתפקיד ושגרות למידה לצוות. בנויה סביב התפקיד שלך ובקצב שלך.",
    href: "/managers",
  },
];

const principles = [
  {
    title: "מתחילים מהביצוע, לא מהקורס.",
    text: "לפני שבונים תוכנית, מגדירים מה אנשים צריכים לעשות אחרת בעבודה, ואיך נדע שזה קרה. לפעמים מתברר שהבעיה בכלל לא בידע, אלא בתהליך, בכלים או בציפיות. ואז חוסכים הדרכה מיותרת.",
  },
  {
    title: "בונים למידה שקרובה לעבודה.",
    text: "תרגול על מקרים אמיתיים מהארגון, כלים שמשתמשים בהם כבר למחרת, ומנהלים ישירים שמעורבים מהיום הראשון. מיומנויות לפני תכנים.",
  },
  {
    title: "מודדים בשטח ומתקנים בדרך.",
    text: "בודקים מה השתנה אחרי כמה שבועות, ולא רק מה המשתתפים חשבו בסוף היום. מה שלא עובד, משתנה.",
  },
];

const shifts = [
  ["ההדרכה נמדדת בטופס משוב בסוף היום.", "הלמידה נמדדת במה שאנשים עושים אחרת אחרי חודש."],
  ["מנהל חדש לומד לנהל לבד, תוך כדי ריצה.", "מנהל חדש נכנס לתפקיד עם תוכנית לחודשים הראשונים, ומישהו שמלווה אותו."],
  ["כל ספק מביא משהו אחר, ואין חוט מקשר.", "יש תוכנית למידה אחת, שקשורה ליעדים העסקיים של הארגון."],
  ["הלמידה תלויה במדריך ונשארת בכיתה.", "המנהלים הישירים מעורבים לפני ההדרכה ואחריה, והלמידה ממשיכה בעבודה."],
  ["כל אחד משתמש ב-AI בדרך שלו.", "יש כלים מוסכמים, הנחיות ברורות, וזמן שמתפנה בפועל."],
];

const steps = [
  { title: "שיחת היכרות, 30 דקות", text: "אתה מספר על המצב היום, אני שואלת שאלות. בסוף השיחה תדע אם יש התאמה ומה הצעד הראשון." },
  { title: "אבחון ממוקד", text: "שיחות עם האנשים הנכונים, ומיפוי של מה צריך להשתנות ואיפה." },
  { title: "הצעה כתובה", text: "יעדים, תוצרים, לוחות זמנים ומחיר. בלי הפתעות, ובשפה שאפשר להציג להנהלה." },
  { title: "בנייה והפעלה", text: "בונים את התוכנית יחד, על המציאות שלך, ומפעילים אותה." },
  { title: "מדידה ושיפור", text: "בודקים מה עבר לשטח, ומתקנים איפה שצריך." },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="overflow-hidden bg-[linear-gradient(180deg,rgba(250,248,244,0.55),rgba(250,248,244,0.9)),linear-gradient(120deg,var(--color-cream)_0%,var(--color-beige)_55%,var(--color-gray-light)_100%)] pt-28 pb-16 nav:pt-36 nav:pb-24">
        <div className="container-site grid items-center gap-14 nav:grid-cols-[1.1fr_0.9fr] nav:gap-16">
          <div>
            <span className="eyebrow">למידה ופיתוח ארגוני</span>
            <h1 className="mb-6 text-[2.125rem] leading-[1.12] tracking-[-0.5px] text-balance sm:text-[2.5rem] nav:text-[4rem]">
              למידה שמזיזה ביצועים, לא רק משתתפים.
            </h1>
            <p className="mb-6 max-w-[36rem] text-lg leading-relaxed font-medium text-ink sm:text-xl nav:text-[1.375rem]">
              אני בונה לארגונים ולמנהלים תוכניות למידה שנמדדות במה שקורה בעבודה, ולא בכמה אנשים ישבו בכיתה.
            </p>
            <p className="mb-9 max-w-[36rem] text-lg leading-relaxed">
              אני לאה מריס. יותר מ-15 שנה אני עובדת בתוך ארגונים, בניהול, במשאבי אנוש ובלמידה ארגונית, במגזר הציבורי ובעסקי. היום אני מנהלת
              למידה ארגונית, ומלווה ארגונים ומנהלים שרוצים שהלמידה תעבוד באמת.
            </p>
            <div className="flex flex-wrap gap-4">
              <CtaButton />
              <a href="#paths" className="btn btn-outline">במה אני יכולה לעזור ←</a>
            </div>
            <Reassurance />
          </div>
          <div className="relative mx-auto w-full max-w-[18rem] sm:max-w-[21rem] nav:max-w-[25rem]">
            <div aria-hidden="true" className="absolute inset-0 -translate-x-4 translate-y-4 rounded-[var(--radius-card)] border border-gold nav:-translate-x-5 nav:translate-y-5" />
            <Portrait which="hero" sizes="(min-width: 74rem) 25rem, (min-width: 40rem) 21rem, 18rem" className="relative" />
          </div>
        </div>
      </section>

      {/* Opening: the problem, in plain words */}
      <section aria-labelledby="why-title" className="section bg-cream">
        <div className="container-site grid gap-10 nav:grid-cols-[1.25fr_0.75fr] nav:gap-20">
          <div className="reveal max-w-[44rem]">
            <span className="eyebrow">למה זה חשוב</span>
            <h2 id="why-title" className="h-section mb-8 text-balance">כשהלמידה בארגון הופכת לאירוע, ולא לשינוי</h2>
            <div className="grid gap-5 text-lg leading-[1.85]">
              <p>
                אני פוגשת ארגונים שמשקיעים בהדרכה ברצינות. סדנאות, ימי למידה, הרצאות אורח, פלטפורמה דיגיטלית. המשובים טובים, האנשים מרוצים, ואחרי
                כמה שבועות העבודה נראית בדיוק כמו קודם.
              </p>
              <p>
                אני פוגשת גם מנהלים טובים שקודמו לתפקיד ניהולי וקיבלו צוות, יעדים ולוח זמנים, אבל לא קיבלו דרך. הם לומדים לנהל תוך כדי ריצה,
                ולפעמים משלמים על זה ביוקר, הם והצוות שלהם.
              </p>
              <p>
                ברוב המקרים מה שחסר הוא לא עוד תוכן. חסר מערך: מישהו שמגדיר מה צריך להשתנות, בונה את הלמידה סביב העבודה האמיתית, ובודק אם זה
                באמת קרה.
              </p>
              <p className="font-display text-2xl font-semibold text-ink">זה מה שאני עושה.</p>
            </div>
          </div>
          <aside className="reveal nav:pt-24">
            <blockquote className="quote !bg-paper">
              "הדרכה טובה נמדדת במה שאנשים עושים אחרת בעבודה, לא במה שהם כתבו בטופס המשוב."
            </blockquote>
          </aside>
        </div>
      </section>

      {/* Trust strip */}
      <section aria-label="ניסיון ורקע" className="on-dark bg-ink py-12 nav:py-14">
        <div className="container-site">
          <ul className="grid gap-5 md:grid-cols-3 md:gap-0">
            {trust.map((t) => (
              <li key={t.title} className="rounded-[var(--radius-card)] border border-gold-light/20 px-5 py-5 md:rounded-none md:border-0 md:border-s md:px-8 md:py-2 md:first:border-s-0">
                <strong className="mb-2 block font-display text-[1.375rem] leading-snug font-bold text-gold-light nav:text-[1.625rem]">{t.title}</strong>
                <p className="text-[0.97rem] leading-relaxed text-paper/95 nav:text-[1.0625rem]">{t.text}</p>
              </li>
            ))}
          </ul>
          {(trustStats.some((s) => !s.placeholder) || SHOW_PLACEHOLDERS) && (
            <ul className="mt-8 flex flex-wrap justify-center gap-6 border-t border-paper/15 pt-8">
              {trustStats.map((s) => (
                <PlaceholderGate key={s.label} isPlaceholder={s.placeholder}>
                  <li className="text-center">
                    <strong className="block font-display text-3xl text-gold-light">{s.value}</strong>
                    <span className="text-sm text-paper/85">{s.label}</span>
                  </li>
                </PlaceholderGate>
              ))}
            </ul>
          )}
          {clientLogos.length > 0 ? (
            <ul className="mt-8 flex flex-wrap items-center justify-center gap-8" aria-label="ארגונים שעבדתי איתם">
              {clientLogos.map((l) => (
                <li key={l.name}><img src={l.src} alt={l.name} loading="lazy" className="h-10 w-auto opacity-90" /></li>
              ))}
            </ul>
          ) : (
            SHOW_PLACEHOLDERS && <p className="placeholder-frame mt-8 text-center text-sm text-paper/85">[לוגואים: ארגונים שעבדתי איתם, רק באישורם]</p>
          )}
        </div>
      </section>

      {/* Two paths */}
      <section id="paths" aria-labelledby="paths-title" className="section bg-paper">
        <div className="container-site">
          <SectionHead
            id="paths-title"
            eyebrow="שני מסלולים"
            title="במה אני יכולה לעזור לך?"
            sub="האתר בנוי משני מסלולים, לפי מי שאתה. בחר את שלך, ותמצא שם את כל הפרטים: מה מקבלים, איך זה עובד, ושאלות נפוצות."
          />
          <div className="grid gap-6 md:grid-cols-2">
            <Link to="/organizations" className="card card-hover reveal group flex flex-col p-8 sm:p-10">
              <span className="eyebrow">לארגונים</span>
              <h3 className="mb-3 text-[1.875rem]">אני מייצג ארגון</h3>
              <p className="mb-6 text-[1.0625rem] leading-relaxed">
                מנכ"ל, סמנכ"ל משאבי אנוש או מנהל הדרכה, בארגון שרוצה שההשקעה בלמידה תיראה בשטח, ושהמנהלים יחזיקו את הצמיחה.
              </p>
              <CheckList
                items={[
                  "אבחון צרכי למידה, לפני שמוציאים עוד שקל",
                  "תוכניות פיתוח מנהלים לכל שכבת הניהול",
                  "מערך קליטה למנהלים ולעובדים חדשים",
                  "ניהול תחום הלמידה במיקור חוץ, בלי לגייס משרה מלאה",
                ]}
              />
              <span className="link-arrow mt-8 self-start group-hover:border-gold">לכל הפרטים לארגונים ←</span>
            </Link>
            <Link to="/managers" className="on-dark reveal group flex flex-col rounded-[var(--radius-card)] bg-ink p-8 text-paper shadow-[var(--shadow-strong)] transition-transform hover:-translate-y-[3px] sm:p-10">
              <span className="eyebrow">למנהלים</span>
              <h3 className="mb-3 text-[1.875rem] text-paper">אני מנהל ורוצה לצמוח</h3>
              <p className="mb-6 text-[1.0625rem] leading-relaxed text-paper/90">
                נכנסת לתפקיד ניהולי ראשון, עברת תפקיד, או שאתה רוצה צוות שלומד ומתפתח גם כשאתה לא בחדר.
              </p>
              <div className="text-paper/90">
                <CheckList
                  tone="dark"
                  items={[
                    "תוכנית כניסה אישית לתפקיד",
                    "מיפוי המיומנויות שלך ושל הצוות",
                    "שגרות למידה שהצוות מחזיק לבד",
                    "כלים לשיחות קשות, להחלטות ולתעדוף",
                  ]}
                />
              </div>
              <span className="link-arrow mt-8 self-start">לכל הפרטים למנהלים ←</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Who it's for: rows, not cards */}
      <SplitSection
        id="who-title"
        eyebrow="למי זה מתאים"
        title="אם אתה מזהה את עצמך באחד מאלה, הגעת למקום הנכון"
        sub="אלה האנשים שאני עובדת איתם הכי הרבה. לכל אחד מהם אתגר אחר, ודרך עבודה שמתאימה לו."
        className="bg-cream"
      >
        <ul className="divide-y divide-line border-y border-line">
          {audiences.map((a) => (
            <li key={a.who} className="reveal grid gap-2 py-7 sm:grid-cols-[13rem_1fr] sm:gap-8">
              <h3 className="text-[1.375rem] leading-snug">{a.who}</h3>
              <div>
                <p className="mb-3 text-[1.0625rem] leading-relaxed">{a.text}</p>
                <Link to={a.href} className="link-arrow text-[0.9375rem]">
                  {a.href === "/managers" ? "למסלול למנהלים ←" : "לפתרונות לארגונים ←"}
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </SplitSection>

      {/* What I build: an editorial index */}
      <section aria-labelledby="services-title" className="section bg-paper">
        <div className="container-site">
          <SectionHead
            id="services-title"
            eyebrow="מה אני בונה"
            title="שישה דברים שאני עושה, וכל אחד מהם נמדד בשטח"
            sub="אפשר להתחיל בשירות אחד. רוב הארגונים מתחילים באבחון, ורוב המנהלים מתחילים בתוכנית כניסה לתפקיד."
          />
          <ul className="grid gap-x-12 md:grid-cols-2">
            {services.map((s) => (
              <li key={s.title} className="reveal border-t border-line py-7">
                <Link to={s.href} className="group block">
                  <span className="mb-2 block text-[0.8125rem] font-semibold tracking-[1px] text-gold-text">{s.tag}</span>
                  <h3 className="mb-2.5 text-[1.625rem] leading-snug transition-colors group-hover:text-gold-text">{s.title}</h3>
                  <p className="mb-3 text-[1.0625rem] leading-relaxed">{s.text}</p>
                  <span className="link-arrow text-[0.9375rem]">לפרטים ←</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* How I work */}
      <SplitSection
        id="how-title"
        eyebrow="הגישה"
        title="שלושה עקרונות שמבדילים למידה שעובדת מלמידה שנשכחת"
        sub="כל תוכנית שאני בונה, לארגון שלם או למנהל אחד, עוברת את אותם שלושה עקרונות. זו גישה מעשית מהשטח, לא תיאוריה."
        className="bg-cream"
        aside={
          <blockquote className="quote reveal mt-8 hidden !bg-paper nav:block">"מיומנויות לפני תכנים. מה אנשים צריכים לדעת לעשות, ורק אחר כך מה ללמד."</blockquote>
        }
      >
        <ol className="grid gap-5">
          {principles.map((p, i) => (
            <li key={p.title} className="card reveal flex gap-6 p-7 sm:p-8">
              <span aria-hidden="true" className="font-display text-5xl leading-none font-bold text-gold/70">{i + 1}</span>
              <div>
                <h3 className="mb-2.5 text-[1.5rem]">{p.title}</h3>
                <p className="text-[1.0625rem] leading-relaxed">{p.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </SplitSection>

      {/* Before / after */}
      <section aria-labelledby="shift-title" className="section bg-paper">
        <div className="container-site">
          <SectionHead
            id="shift-title"
            eyebrow="מה משתנה בפועל"
            title="איך זה נראה היום, ולאן אנחנו מכוונים"
            sub="אלה המטרות שאני מגדירה בתחילת כל תהליך, ומולן בודקים בסוף אם הלמידה עבדה."
          />
          <div className="overflow-hidden rounded-[var(--radius-card)] border border-line">
            <div className="hidden grid-cols-2 bg-ink text-paper sm:grid">
              <p className="px-7 py-4 text-[0.9375rem] font-semibold tracking-[1px] text-paper/80">איך זה נראה היום</p>
              <p className="border-s border-paper/15 px-7 py-4 text-[0.9375rem] font-semibold tracking-[1px] text-gold-light">לאן אנחנו מכוונים</p>
            </div>
            <ul className="divide-y divide-line">
              {shifts.map(([before, after]) => (
                <li key={before} className="reveal grid sm:grid-cols-2">
                  <p className="bg-cream px-7 py-5 text-[1.0625rem] leading-relaxed text-muted">
                    <span className="mb-1 block text-xs font-semibold text-gray-mid sm:hidden">היום</span>
                    {before}
                  </p>
                  <p className="px-7 py-5 text-[1.0625rem] leading-relaxed font-medium text-ink sm:border-s sm:border-line">
                    <span className="mb-1 block text-xs font-semibold text-gold-text sm:hidden">המטרה</span>
                    {after}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* About teaser */}
      <section aria-labelledby="about-title" className="section bg-cream">
        <div className="container-site grid items-center gap-12 nav:grid-cols-[0.9fr_1.1fr] nav:gap-20">
          <div className="reveal relative mx-auto w-full max-w-[28rem] nav:order-2">
            <div aria-hidden="true" className="absolute inset-0 translate-x-4 translate-y-4 rounded-[var(--radius-card)] bg-beige" />
            <Portrait which="about" natural sizes="(min-width: 74rem) 28rem, 90vw" className="relative" />
          </div>
          <div className="reveal max-w-[40rem] nav:order-1">
            <span className="eyebrow">קצת עליי</span>
            <h2 id="about-title" className="h-section mb-6 text-balance">ניסיון מתוך ארגונים, לא מהצד</h2>
            <div className="grid gap-4 text-lg leading-relaxed">
              <p>
                את הניסיון שלי צברתי בתוך ארגונים: יותר מ-15 שנה בניהול, במשאבי אנוש, בלמידה ארגונית ובהדרכה, במגזר הציבורי ובמגזר העסקי.
              </p>
              <p>
                היום אני מנהלת למידה ארגונית, ולומדת לתואר שני בייעוץ ופיתוח ארגוני. כלומר, את העבודה הזו אני עושה כל יום מבפנים, עם אותם אילוצים
                של תקציב, לוחות זמנים ומנהלים עסוקים שיש גם אצלך.
              </p>
              <p>
                הגישה שלי מעשית: מתחילים במיומנויות שאנשים צריכים, בונים למידה שקרובה לעבודה, ומודדים מה השתנה. למידה לאורך החיים, וניהול שמונע
                שריפות במקום לכבות אותן.
              </p>
            </div>
            <p className="quote mt-7 !bg-paper">AI הוא כלי, לא המטרה. אני משלבת אותו רק איפה שהוא באמת חוסך זמן או משפר החלטה.</p>
            <Link to="/about" className="link-arrow mt-7 inline-block">לסיפור המלא ←</Link>
          </div>
        </div>
      </section>

      {/* AI agents */}
      <section aria-labelledby="agents-title" className="on-dark section bg-ink text-paper">
        <div className="container-site">
          <div className="reveal mb-12 grid gap-6 nav:grid-cols-[1fr_1fr] nav:items-end nav:gap-20">
            <div>
              <span className="eyebrow">הכלים שפיתחתי</span>
              <h2 id="agents-title" className="h-section text-balance text-paper">שלושה סוכני AI למנהלים, זמינים בכל שעה</h2>
            </div>
            <p className="text-lg leading-relaxed text-paper/85">
              פיתחתי אותם כדי שמנהלים יוכלו להתקדם גם בין המפגשים: לעשות סדר בשבוע, לחשוב על החלטה קשה, או להתכונן לשיחה רגישה. הם לא מחליפים שיקול
              דעת. הם עוזרים לחשוב מסודר, ברגע שצריך.
            </p>
          </div>
          <ul className="grid gap-5 md:grid-cols-3">
            {AGENTS.map((a) => (
              <li key={a.name} className="reveal flex flex-col rounded-[var(--radius-card)] border border-gold-light/25 bg-ink-2 p-7">
                <span className="mb-1 text-[0.8125rem] font-semibold tracking-[1px] text-gold-light">{a.role}</span>
                <h3 className="mb-3 text-[2rem] text-paper">{a.name}</h3>
                <p className="mb-6 flex-1 leading-relaxed text-paper/85">{a.text}</p>
                <a href={a.href} target="_blank" rel="noopener noreferrer" className="link-arrow inline-flex items-center gap-1.5 self-start">
                  לפתיחת {a.name} <IconExternal />
                  <span className="sr-only"> (נפתח בחלון חדש, ב-Gemini של Google)</span>
                </a>
              </li>
            ))}
          </ul>
          <p className="reveal mt-6 text-sm text-paper/70">הסוכנים נפתחים ב-Gemini של Google. אין להזין בהם מידע אישי רגיש או מידע סודי של הארגון.</p>
        </div>
      </section>

      {/* Process */}
      <SplitSection
        id="process-title"
        eyebrow="תהליך העבודה"
        title="מה קורה אחרי שפונים אליי"
        sub="חמישה שלבים, כדי שתדע בדיוק למה לצפות. כל שלב נגמר בהחלטה משותפת לגבי הבא."
        className="bg-paper"
        aside={
          <div className="mt-8 hidden nav:block">
            <CtaButton />
          </div>
        }
      >
        <Timeline steps={steps} />
      </SplitSection>

      <Testimonials items={homeTestimonials} eyebrow="מה אומרים" title="מה משתנה אצל מי שעבד איתי" className="bg-cream" />

      {/* Resource + articles */}
      <section aria-labelledby="learn-title" className="section bg-cream">
        <div className="container-site">
          <SectionHead
            id="learn-title"
            eyebrow="להתחיל לבד"
            title="כלים ותובנות שאפשר ליישם כבר השבוע"
            sub="מאמרים מעשיים שעונים על השאלות שאני שומעת הכי הרבה, וכלי חינמי אחד שכדאי להביא לישיבה הבאה עם ספק הדרכה."
          />
          <div className="mb-10 grid items-center gap-8 rounded-[var(--radius-card)] border border-line bg-paper p-8 sm:p-10 nav:grid-cols-[1fr_auto]">
            <div>
              <span className="mb-3 inline-block rounded-full border border-line bg-cream px-3 py-1 text-[0.8125rem] font-semibold text-gold-text">להורדה חינם</span>
              <h3 className="mb-3 text-[1.75rem]">לפני שמזמינים הדרכה: 5 שאלות שחוסכות תקציב</h3>
              <p className="max-w-[40rem] text-[1.0625rem] leading-relaxed">
                עמוד אחד, חמש שאלות לשאול לפני כל תוכנית הדרכה. יעזור לך לזהות מתי בכלל צריך הדרכה, ומה לבקש מהספק כדי שהיא תעבוד.
              </p>
            </div>
            <Link to="/blog#resource" className="btn btn-primary">לקבלת המשאב ←</Link>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {posts.slice(0, 3).map((p) => (
              <PostCard key={p.meta.slug} meta={p.meta} headingLevel="h3" />
            ))}
          </div>
          <p className="mt-8">
            <Link to="/blog" className="link-arrow">לכל המאמרים ←</Link>
          </p>
        </div>
      </section>

      {/* FAQ */}
      <SplitSection
        id="faq-title"
        eyebrow="שאלות נפוצות"
        title="אולי רצית לשאול..."
        sub={
          <>
            לשאלות מפורטות יותר יש שאלות נפוצות בעמוד <Link to="/organizations" className="link-inline">לארגונים</Link> ובעמוד{" "}
            <Link to="/managers" className="link-inline">למנהלים</Link>.
          </>
        }
        className="bg-paper"
      >
        <Faq items={faq} />
      </SplitSection>

      <section aria-label="ליווי אישי" className="bg-paper pb-16">
        <div className="container-site">
          <p className="reveal rounded-[var(--radius-card)] border border-line bg-cream px-6 py-5 text-[1.0625rem]">
            מחפש ליווי אישי צמוד ומתמשך כמנהל?{" "}
            <a href={PERSONAL_SITE_URL} target="_blank" rel="noopener noreferrer" className="link-arrow inline-flex items-center gap-1">
              לאתר הליווי האישי שלי <IconExternal />
              <span className="sr-only"> (נפתח בחלון חדש)</span>
            </a>
          </p>
        </div>
      </section>

      <CtaBand
        title="נתחיל בשיחה של 30 דקות"
        text={`נבין יחד מה קורה אצלך ומה ייתן את התוצאה הכי גדולה. אם אני לא הכתובת הנכונה, אגיד לך את זה. אפשר גם להתקשר: ${CONTACT.phoneDisplay}.`}
        label={CTA.label}
      />
    </>
  );
}
