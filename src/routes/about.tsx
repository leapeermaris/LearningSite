import { Link } from "react-router";
import type { Route } from "./+types/about";
import { breadcrumbLd, buildMeta } from "~/lib/seo";
import { SHOW_PLACEHOLDERS } from "~/lib/site";
import { CtaButton, Portrait, SectionHead } from "~/components/blocks";

export const meta: Route.MetaFunction = () =>
  buildMeta({
    title: "אודות לאה מריס: למידה ארגונית מהשטח | לאה מריס",
    description:
      "יותר מ-15 שנה בניהול, משאבי אנוש ולמידה ארגונית במגזר הציבורי והעסקי. היום מנהלת למידה ארגונית ובונה למידה שעוברת לשטח.",
    path: "/about",
    jsonLd: [breadcrumbLd([{ name: "אודות", path: "/about" }])],
  });

const lessons = [
  {
    t: "הבעיה כמעט אף פעם לא רק בידע.",
    d: "כשמשהו לא עובד, הנטייה הראשונה היא להזמין הדרכה. לפעמים מה שחסר זה תהליך ברור, כלי נכון או ציפייה שאף אחד לא אמר בקול.",
  },
  {
    t: "המנהל הישיר חשוב יותר מכל מדריך.",
    d: "אם המנהל לא יודע מה העובד למד, ולא שואל עליו אחר כך, הלמידה נשארת בכיתה.",
  },
  {
    t: "מה שלא נמדד בשטח, לא קרה.",
    d: "טופס משוב בסוף יום מודד אם נהנו. אני רוצה לדעת מה אנשים עושים אחרת אחרי חודש.",
  },
];

const approach = [
  { t: "מעשית, מהשטח.", d: "אני לא מביאה תיאוריה ומשאירה אותך ליישם לבד. כל כלי שאני מביאה, ניסיתי בעבודה." },
  { t: "skills-first.", d: "מתחילים במה שאנשים צריכים לדעת לעשות, ורק אחר כך שואלים איזה תוכן צריך." },
  { t: "למידה לאורך החיים.", d: "ארגון שלומד הוא ארגון שבו אנשים ממשיכים להתפתח גם בלי קורס. זה נבנה בשגרות קטנות, לא באירועים גדולים." },
  { t: "ניהול פרואקטיבי.", d: "מנהל טוב לא מחכה לשריפה. הוא בונה שגרות שמונעות אותה." },
  {
    t: "AI הוא כלי, לא המטרה.",
    d: "אני משלבת אותו רק איפה שהוא באמת חוסך זמן או משפר החלטה. מתוך הגישה הזו פיתחתי שלושה סוכני AI למנהלים: פוקוס לתעדוף, ארי להחלטות ומצפן להכנה לשיחות מורכבות.",
  },
];

export default function About() {
  return (
    <>
      <section className="bg-[linear-gradient(180deg,rgba(250,248,244,0.55),rgba(250,248,244,0.9)),linear-gradient(120deg,var(--color-cream)_0%,var(--color-beige)_55%,var(--color-gray-light)_100%)] pt-28 pb-16 nav:pt-40 nav:pb-24">
        <div className="container-site grid items-start gap-12 nav:grid-cols-[1.15fr_0.85fr] nav:gap-[4.375rem]">
          <div>
            <span className="eyebrow">אודות</span>
            <h1 className="mb-8 text-[1.875rem] leading-[1.15] sm:text-[2.125rem] nav:text-[3.25rem]">אני בונה למידה שאנשים משתמשים בה למחרת.</h1>
            <div className="grid gap-5 text-lg leading-relaxed">
              <p>
                יותר מ-15 שנה אני עובדת בתוך ארגונים. בניהול, במשאבי אנוש, בלמידה ארגונית ובהדרכה, במגזר הציבורי ובמגזר העסקי.
              </p>
              {SHOW_PLACEHOLDERS && (
                <p className="placeholder-frame">
                  [לאה: כאן כדאי רגע אישי אחד, אמיתי, של 2 עד 3 משפטים. למשל: התוכנית הראשונה שבנית, או הרגע שבו הבנת שהדרכה לבדה לא מספיקה.]
                </p>
              )}
              <p>
                לאורך השנים ראיתי הדרכות מצוינות שלא שינו כלום, ותהליכים קטנים ופשוטים ששינו צוות שלם. ההבדל כמעט אף פעם לא היה באיכות המדריך או
                במצגת. הוא היה במה שקרה לפני ההדרכה ואחריה.
              </p>
            </div>
          </div>
          <Portrait which="about" natural sizes="(min-width: 74rem) 26rem, 90vw" className="max-w-[26rem] nav:mt-16" />
        </div>
      </section>

      <section aria-labelledby="lessons-title" className="section bg-paper">
        <div className="container-site">
          <SectionHead id="lessons-title" eyebrow="מהשטח" title="שלושה דברים שלמדתי בשטח" />
          <ol className="grid gap-5 nav:grid-cols-3">
            {lessons.map((l, i) => (
              <li key={l.t} className="card reveal p-7">
                <span aria-hidden="true" className="mb-4 block font-display text-3xl font-bold text-gold">{i + 1}</span>
                <h3 className="mb-2.5 text-[1.375rem]">{l.t}</h3>
                <p className="text-base leading-relaxed">{l.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="approach-title" className="section bg-cream">
        <div className="container-site max-w-[57.5rem]">
          <SectionHead id="approach-title" eyebrow="הגישה שלי" title="איך אני עובדת" />
          <ul className="grid gap-4">
            {approach.map((a) => (
              <li key={a.t} className="card reveal p-6">
                <h3 className="mb-1.5 text-xl">{a.t}</h3>
                <p className="text-base leading-relaxed">{a.d}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="today-title" className="on-dark bg-ink py-16 text-paper nav:py-20">
        <div className="container-site reveal max-w-[51.25rem] text-center">
          <h2 id="today-title" className="mb-5 text-[1.75rem] text-paper nav:text-[2.25rem]">היום</h2>
          <p className="text-lg leading-relaxed text-paper/90 nav:text-xl">
            היום אני מנהלת למידה ארגונית, ולומדת לתואר שני בייעוץ ופיתוח ארגוני. כלומר, את העבודה הזו אני עושה כל יום מבפנים, עם אותם אילוצים של
            תקציב, לוחות זמנים ומנהלים עסוקים שיש גם אצלך.
          </p>
        </div>
      </section>

      <section aria-labelledby="edu-title" className="section bg-paper">
        <div className="container-site max-w-[51.25rem]">
          <h2 id="edu-title" className="mb-5 text-[1.625rem]">השכלה</h2>
          <ul className="grid gap-2.5 text-[1.0625rem]">
            <li>
              תואר שני בייעוץ ופיתוח ארגוני (בלימודים)
              {SHOW_PLACEHOLDERS && <span className="placeholder-frame ms-1">, [שם המוסד]</span>}
            </li>
            {SHOW_PLACEHOLDERS && <li className="placeholder-frame">[תואר ראשון: תחום ומוסד]</li>}
            {SHOW_PLACEHOLDERS && <li className="placeholder-frame">[הכשרות והסמכות נוספות]</li>}
          </ul>
        </div>
      </section>

      <section aria-labelledby="about-cta" className="bg-[linear-gradient(120deg,var(--color-beige),var(--color-cream))] py-20 text-center">
        <div className="container-site reveal">
          <h2 id="about-cta" className="h-section mb-8">רוצה לבדוק אם נתאים?</h2>
          <CtaButton />
          <p className="mt-6 flex flex-wrap justify-center gap-6">
            <Link to="/organizations" className="link-arrow">לפתרונות לארגונים ←</Link>
            <Link to="/managers" className="link-arrow">למסלול למנהלים ←</Link>
          </p>
        </div>
      </section>
    </>
  );
}
