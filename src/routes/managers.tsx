import type { Route } from "./+types/managers";
import { breadcrumbLd, buildMeta, faqLd } from "~/lib/seo";
import { PERSONAL_SITE_URL } from "~/lib/site";
import { managerTestimonials } from "~/data/proof";
import { CtaBand, CtaButton, Faq, FramedPortrait, PageHero, Reassurance, SectionHead, SplitSection, type FaqItem } from "~/components/blocks";
import { Testimonials } from "~/components/proof";
import { IconCheck, IconExternal, IconX } from "~/components/Icons";

const faq: FaqItem[] = [
  {
    q: "הארגון שלי יכול לממן את התוכנית?",
    a: "הרבה ארגונים מממנים פיתוח מנהלים, גם כשזה לא כתוב באף מקום. אם תרצה, אכין לך תיאור קצר של התוכנית והתוצרים שלה, שתוכל להציג למנהל שלך או למשאבי אנוש.",
  },
  {
    q: "מה ההבדל בין התוכנית הזו לבין אימון אישי?",
    a: "כאן העבודה ממוקדת במיומנויות ובתוצרים: יש תוכנית, יש מטרות, ויש כלים שנשארים איתך. אימון אישי פתוח יותר ומתמשך. אם זה מה שאתה מחפש, יש לי מסלולי ליווי אישי באתר נפרד.",
  },
  {
    q: "כמה זמן צריך להשקיע בין המפגשים?",
    a: "מעט. רוב העבודה קורית בתוך העבודה הרגילה שלך: שיחה עם עובד, ישיבת צוות, החלטה. המשימות בנויות כך שהן לא מוסיפות עומס.",
  },
  {
    q: "אני מנהל פרויקטים בלי עובדים ישירים. זה רלוונטי?",
    a: "כן. השפעה בלי סמכות היא מיומנות ניהולית לכל דבר, ואחת הקשות שבהן. התוכנית נבנית סביב האתגר שלך.",
  },
  {
    q: "המפגשים בזום או פנים אל פנים?",
    a: "שתי האפשרויות פתוחות. רוב המנהלים בוחרים בזום כי זה נכנס ביומן בקלות.",
  },
  {
    q: "מה אם אחרי כמה מפגשים אני מרגיש שזה לא מתאים?",
    a: "נדבר על זה בפתיחות. אם משהו לא עובד, משנים את התוכנית.",
  },
];

export const meta: Route.MetaFunction = () =>
  buildMeta({
    title: "פיתוח מנהלים: כניסה לתפקיד ובניית צוות לומד | לאה מריס",
    description:
      "מנהל חדש, מעבר תפקיד או צוות שצריך לצמוח? תוכנית פיתוח אישית עם מיפוי מיומנויות, תוכנית כניסה לתפקיד ושגרות למידה לצוות.",
    path: "/managers",
    jsonLd: [faqLd(faq), breadcrumbLd([{ name: "למנהלים", path: "/managers" }])],
  });

const moments = [
  {
    title: "ניהול ראשון",
    text: "עד אתמול היית העובד הכי טוב בצוות. היום מצפים ממך להוביל, להאציל ולתת משוב, ואף אחד לא לימד אותך איך. אנחנו בונים את הבסיס: סמכות, שגרות, ושיחות שאתה יודע לנהל.",
  },
  {
    title: "מעבר תפקיד",
    text: "עברת ליחידה אחרת, לארגון חדש או לרמה ניהולית גבוהה יותר. הניסיון שלך שווה הרבה, אבל הכללים השתנו. אנחנו בונים תוכנית כניסה שתעזור לך ללמוד את המקום החדש מהר, לפני שאתה משנה בו דברים.",
  },
  {
    title: "בניית צוות לומד",
    text: "הצוות שלך תלוי בך יותר ממה שהיית רוצה. אנחנו בונים שגרות למידה שהצוות מחזיק בעצמו: משוב, שיתוף ידע ופיתוח אישי, כדי שאנשים יגדלו גם כשאתה לא בחדר.",
  },
];

const includes = [
  { t: "פגישת אבחון", d: "ממפים את התפקיד, את הציפיות ממך ואת המיומנויות שכבר יש לך." },
  { t: "מפגשי עבודה אישיים", d: "בזום או פנים אל פנים. מספר המפגשים והתדירות נקבעים יחד בפגישת האבחון, לפי המטרות שלך ולפי הקצב שמתאים לך." },
  { t: "תרגול על המציאות שלך", d: "כל מפגש עובד על מקרה אמיתי מהשבוע שלך." },
  { t: "כלים בין המפגשים", d: "תבניות, צ'קליסטים, וגישה לסוכני ה-AI שפיתחתי למנהלים: פוקוס לתעדוף, ארי להחלטות ודילמות, ומצפן להכנה לשיחות מורכבות." },
];

export default function Managers() {
  return (
    <>
      <PageHero
        eyebrow="למנהלים"
        title="להיכנס לתפקיד בביטחון, ולבנות צוות שמתפתח גם בלעדיך."
        lead="תוכנית פיתוח אישית למנהלים, שמתמקדת במיומנויות שהתפקיד שלך דורש עכשיו, ובכלים שתשתמש בהם כבר בשבוע הבא."
        aside={<FramedPortrait which="hero" />}
      >
        <CtaButton />
        <Reassurance>30 דקות, ללא התחייבות.</Reassurance>
      </PageHero>

      <SplitSection
        id="moments-title"
        eyebrow="איפה אתה עכשיו?"
        title="שלושה רגעים שבהם תוכנית נכונה עושה את ההבדל"
        sub="כל אחד מהם דורש משהו אחר. בפגישת האבחון נבין יחד איפה אתה, ומה הכי חשוב לך עכשיו."
        className="bg-paper"
      >
        <ul className="divide-y divide-line border-y border-line">
          {moments.map((m) => (
            <li key={m.title} className="reveal grid gap-2 py-7 sm:grid-cols-[10rem_1fr] sm:gap-8">
              <h3 className="text-[1.625rem] leading-snug">{m.title}</h3>
              <p className="text-[1.0625rem] leading-relaxed">{m.text}</p>
            </li>
          ))}
        </ul>
      </SplitSection>

      <section aria-labelledby="program-title" className="section bg-cream">
        <div className="container-site">
          <SectionHead id="program-title" eyebrow="התוכנית" title="מה תקבל בתוכנית" />
          <div className="grid gap-5 md:grid-cols-2">
            {includes.map((x) => (
              <div key={x.t} className="card reveal p-7">
                <h3 className="mb-2 text-[1.375rem]">{x.t}</h3>
                <p className="text-base leading-relaxed">{x.d}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            <div className="reveal rounded-[var(--radius-card)] border-s-4 border-gold bg-paper p-7">
              <h3 className="mb-2 text-xl">משך</h3>
              <p className="leading-relaxed">
                גמיש. יש מנהלים שצריכים כמה מפגשים ממוקדים סביב כניסה לתפקיד, ויש שבונים תהליך לאורך כמה חודשים. בסוף פגישת האבחון תדע בדיוק מה
                מומלץ לך ולמה.
              </p>
            </div>
            <div className="on-dark reveal rounded-[var(--radius-card)] bg-ink p-7 text-paper">
              <h3 className="mb-2 text-xl text-gold-light">מה נשאר איתך</h3>
              <p className="leading-relaxed text-paper/90">
                תוכנית פיתוח אישית כתובה, תוכנית כניסה לתפקיד ל-90 הימים הראשונים (למי שבמעבר), וערכת שגרות לצוות.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="fit-title" className="section bg-paper">
        <div className="container-site">
          <SectionHead id="fit-title" eyebrow="התאמה" title="למי זה מתאים, ולמי פחות" />
          <div className="mx-auto grid max-w-[57.5rem] gap-5 md:grid-cols-2">
            <div className="card reveal p-7">
              <h3 className="mb-4 text-[1.375rem]">מתאים לך אם</h3>
              <ul className="grid gap-3">
                {[
                  "אתה בשנה הראשונה שלך בתפקיד ניהולי, או בחודשים הראשונים בתפקיד חדש.",
                  "אתה רוצה תוכנית עם מטרות ברורות, לא שיחות פתוחות בלי כיוון.",
                  "אתה מוכן לנסות דברים חדשים בין המפגשים ולחזור עם מה שקרה.",
                ].map((t) => (
                  <li key={t} className="flex items-start gap-3 leading-relaxed">
                    <span className="mt-1.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-ink text-gold-light"><IconCheck className="size-3" /></span>
                    {t}
                  </li>
                ))}
              </ul>
            </div>
            <div className="card reveal p-7">
              <h3 className="mb-4 text-[1.375rem]">פחות מתאים לך אם</h3>
              <ul className="grid gap-3">
                {[
                  "אתה מחפש פתרון לבעיה אחת, בפגישה אחת.",
                  "אתה מחפש ליווי רגשי או טיפולי. זה לא המקום, ואשמח להפנות.",
                  "אתה רוצה ליווי אישי צמוד ומתמשך לאורך זמן. בשביל זה יש לי מסלולי ליווי אישי, בקישור למטה.",
                ].map((t) => (
                  <li key={t} className="flex items-start gap-3 leading-relaxed">
                    <span className="mt-1.5 flex size-5 shrink-0 items-center justify-center rounded-full border border-gray-mid text-gray-mid"><IconX className="size-3" /></span>
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <Testimonials items={managerTestimonials} eyebrow="מה אומרים" title="מה אומרים מנהלים שעברו את התוכנית" className="bg-cream" />

      <section aria-labelledby="faq-title" className="section bg-paper">
        <div className="container-site">
          <SectionHead id="faq-title" eyebrow="שאלות נפוצות" title="שאלות שמנהלים שואלים לפני שמתחילים" />
          <Faq items={faq} />
        </div>
      </section>

      <section aria-labelledby="personal-title" className="on-dark bg-ink py-16 text-paper nav:py-20">
        <div className="container-site reveal grid items-center gap-8 nav:grid-cols-[1fr_auto]">
          <div>
            <h2 id="personal-title" className="mb-3 text-[1.75rem] text-paper nav:text-[2.25rem]">מחפש ליווי אישי צמוד ועמוק?</h2>
            <p className="max-w-[42rem] text-lg leading-relaxed text-paper/90">
              לצד תוכניות הפיתוח, אני מלווה מנהלים באופן אישי לאורך זמן: כניסה לתפקיד, ניהול עומס, בניית סמכות וקבלת החלטות. כל המסלולים מפורטים
              באתר הליווי האישי שלי.
            </p>
          </div>
          <a href={PERSONAL_SITE_URL} target="_blank" rel="noopener noreferrer" className="btn btn-outline-light">
            לאתר הליווי האישי <IconExternal />
            <span className="sr-only"> (נפתח בחלון חדש)</span>
          </a>
        </div>
      </section>

      <CtaBand
        title="בוא נבנה את התוכנית שלך"
        text="בשיחת היכרות של 30 דקות נבין איפה אתה עומד, מה הכי חשוב לך עכשיו, ואם התוכנית מתאימה לך."
      />
    </>
  );
}
