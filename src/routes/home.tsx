import { Link } from "react-router";
import type { Route } from "./+types/home";
import { buildMeta } from "~/lib/seo";
import { CTA, SHOW_PLACEHOLDERS } from "~/lib/site";
import { posts } from "~/lib/blog";
import { clientLogos, homeTestimonials, trustStats } from "~/data/proof";
import { CheckList, CtaBand, CtaButton, PageHero, PlaceholderGate, Portrait, Reassurance, SectionHead } from "~/components/blocks";
import { Testimonials } from "~/components/proof";
import { PostCard } from "~/components/PostCard";

export const meta: Route.MetaFunction = () =>
  buildMeta({
    title: "לאה מריס | למידה ופיתוח ארגוני לארגונים ולמנהלים",
    description:
      "בניית מערכי למידה, תוכניות פיתוח מנהלים וניהול תחום הלמידה במיקור חוץ לארגונים בינוניים. למידה שעוברת לשטח ומשפיעה על הביצועים.",
    path: "/",
  });

const trust = [
  { title: "15+ שנות ניסיון", text: "בניהול, משאבי אנוש, למידה ארגונית והדרכה." },
  { title: "מגזר ציבורי ועסקי", text: "מכירה מבפנים את שני העולמות, את הרגולציה, את הקצב ואת התרבות." },
  { title: "מנהלת למידה ארגונית, היום", text: "לא מייעצת מהצד. עושה את העבודה הזו כל יום, ולומדת לתואר שני בייעוץ ופיתוח ארגוני." },
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

export default function Home() {
  return (
    <>
      <PageHero
        eyebrow="למידה ופיתוח ארגוני"
        title="למידה שמזיזה ביצועים, לא רק משתתפים."
        lead="אני בונה לארגונים ולמנהלים תוכניות למידה שנמדדות במה שקורה בעבודה, ולא בכמה אנשים ישבו בכיתה."
        aside={<Portrait which="hero" sizes="(min-width: 74rem) 17rem, 15rem" className="max-w-[15rem] nav:max-w-[17rem]" />}
      >
        <p className="mb-9 max-w-[35rem] text-lg leading-relaxed">
          אני לאה מריס. יותר מ-15 שנה אני עובדת בתוך ארגונים, בניהול, במשאבי אנוש ובלמידה ארגונית, במגזר הציבורי ובעסקי. היום אני מנהלת למידה
          ארגונית, ומלווה ארגונים ומנהלים שרוצים שהלמידה תעבוד באמת.
        </p>
        <div className="flex flex-wrap gap-4">
          <CtaButton />
          <a href="#how" className="btn btn-outline">איך אני עובדת ←</a>
        </div>
        <Reassurance />
      </PageHero>

      {/* Two paths */}
      <section aria-labelledby="paths-title" className="section bg-paper">
        <div className="container-site">
          <h2 id="paths-title" className="sr-only">במה אפשר לעזור לך?</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <Link to="/organizations" className="card card-hover reveal group flex flex-col p-8 sm:p-10">
              <span className="eyebrow">לארגונים</span>
              <h3 className="mb-3 text-[1.75rem]">אני מייצג ארגון</h3>
              <p className="mb-6 text-[1.0625rem] leading-relaxed">
                מנכ"ל, סמנכ"ל משאבי אנוש או מנהל הדרכה, בארגון שרוצה שההשקעה בלמידה תיראה בשטח.
              </p>
              <CheckList
                items={[
                  "תוכניות פיתוח מנהלים לכל שכבת הניהול",
                  "מערך קליטה למנהלים ולעובדים חדשים",
                  "ניהול תחום הלמידה במיקור חוץ, בלי לגייס משרה מלאה",
                ]}
              />
              <span className="link-arrow mt-8 self-start group-hover:border-gold">לפתרונות לארגונים ←</span>
            </Link>
            <Link to="/managers" className="on-dark reveal group flex flex-col rounded-[var(--radius-card)] bg-ink p-8 text-paper shadow-[var(--shadow-strong)] transition-transform hover:-translate-y-[3px] sm:p-10">
              <span className="eyebrow">למנהלים</span>
              <h3 className="mb-3 text-[1.75rem] text-paper">אני מנהל ורוצה לצמוח</h3>
              <p className="mb-6 text-[1.0625rem] leading-relaxed text-paper/90">
                נכנסת לתפקיד ניהולי ראשון, עברת תפקיד, או שאתה רוצה צוות שלומד ומתפתח גם בלעדיך.
              </p>
              <div className="text-paper/90">
                <CheckList tone="dark" items={["תוכנית כניסה אישית לתפקיד", "מיפוי המיומנויות שלך ושל הצוות", "שגרות למידה שהצוות מחזיק לבד"]} />
              </div>
              <span className="link-arrow mt-8 self-start">למסלול למנהלים ←</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section aria-label="ניסיון ורקע" className="on-dark bg-ink py-12 nav:py-14">
        <div className="container-site">
          <ul className="grid gap-5 text-center md:grid-cols-3 md:gap-8">
            {trust.map((t) => (
              <li key={t.title} className="rounded-[var(--radius-card)] border border-gold-light/20 px-4.5 py-5 md:border-0 md:p-2">
                <strong className="mb-2.5 block font-display text-[1.375rem] leading-snug font-bold text-gold-light nav:text-[1.625rem]">{t.title}</strong>
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

      {/* How I work */}
      <section id="how" aria-labelledby="how-title" className="section bg-cream">
        <div className="container-site">
          <SectionHead
            id="how-title"
            eyebrow="הגישה"
            title="שלושה עקרונות שמבדילים למידה שעובדת מלמידה שנשכחת"
            sub="כל תוכנית שאני בונה, לארגון שלם או למנהל אחד, עוברת את אותם שלושה שלבים."
          />
          <ol className="grid gap-5 nav:grid-cols-3">
            {principles.map((p, i) => (
              <li key={p.title} className="card reveal p-7">
                <span aria-hidden="true" className="mb-4 flex size-12 items-center justify-center rounded-full border-[1.5px] border-gold font-display text-xl font-bold text-ink">
                  {i + 1}
                </span>
                <h3 className="mb-2.5 text-[1.375rem]">{p.title}</h3>
                <p className="text-base leading-relaxed">{p.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <Testimonials items={homeTestimonials} eyebrow="מה אומרים" title="מה משתנה אצל מי שעבד איתי" />

      {/* Resource + articles */}
      <section aria-labelledby="learn-title" className="section bg-paper">
        <div className="container-site">
          <SectionHead id="learn-title" eyebrow="להתחיל לבד" title="כלים ותובנות שאפשר ליישם כבר השבוע" />
          <div className="on-dark reveal mb-8 grid items-center gap-6 rounded-[var(--radius-card)] bg-ink p-8 text-paper sm:p-10 nav:grid-cols-[1fr_auto]">
            <div>
              <span className="mb-3 inline-block rounded-full border border-gold-light/40 px-3 py-1 text-[0.8125rem] font-semibold text-gold-light">להורדה חינם</span>
              <h3 className="mb-3 text-[1.625rem] text-paper">לפני שמזמינים הדרכה: 5 שאלות שחוסכות תקציב</h3>
              <p className="max-w-[40rem] leading-relaxed text-paper/90">
                עמוד אחד, חמש שאלות לשאול לפני כל תוכנית הדרכה. יעזור לך לזהות מתי בכלל צריך הדרכה, ומה לבקש מהספק.
              </p>
            </div>
            <Link to="/blog#resource" className="btn btn-light">לקבלת המשאב ←</Link>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {posts.slice(0, 3).map((p) => (
              <PostCard key={p.meta.slug} meta={p.meta} headingLevel="h3" />
            ))}
          </div>
          <p className="mt-8 text-center">
            <Link to="/blog" className="link-arrow">לכל המאמרים ←</Link>
          </p>
        </div>
      </section>

      <CtaBand
        title="נתחיל בשיחה של 30 דקות"
        text="נבין יחד מה קורה אצלך ומה ייתן את התוצאה הכי גדולה. אם אני לא הכתובת הנכונה, אגיד לך את זה."
        label={CTA.label}
      />
    </>
  );
}
