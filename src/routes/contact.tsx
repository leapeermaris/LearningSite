import type { Route } from "./+types/contact";
import { breadcrumbLd, buildMeta } from "~/lib/seo";
import { CONTACT } from "~/lib/site";
import { BookingPanel } from "~/components/Booking";
import { IconInstagram, IconMail } from "~/components/Icons";

export const meta: Route.MetaFunction = () =>
  buildMeta({
    title: "צרו קשר: שיחת היכרות של 30 דקות | לאה מריס",
    description: "שיחת היכרות של 30 דקות, בטלפון או בזום, ללא התחייבות. כתוב לי בוואטסאפ, התקשר ל-050-570-0534, או השאר שם וטלפון ואחזור אליך.",
    path: "/contact",
    jsonLd: [breadcrumbLd([{ name: "צרו קשר", path: "/contact" }])],
  });

export default function Contact() {
  return (
    <section className="bg-[linear-gradient(180deg,rgba(250,248,244,0.6),rgba(250,248,244,0.95)),linear-gradient(120deg,var(--color-cream)_0%,var(--color-beige)_100%)] pt-28 pb-20 nav:pt-40 nav:pb-28">
      <div className="container-site grid items-start gap-10 nav:grid-cols-[1.15fr_0.85fr] nav:gap-16">
        <div className="card on-cream p-6 sm:p-9">
          <BookingPanel titleId="contact-title" as="h1" />
        </div>
        <div className="grid gap-6">
          <div>
            <span className="eyebrow">צרו קשר</span>
            <p className="text-lg leading-relaxed font-medium text-ink nav:text-xl">
              שיחת ההיכרות לא מחייבת לכלום. נבין יחד מה קורה אצלך, ואם אני לא הכתובת הנכונה, אגיד לך את זה.
            </p>
          </div>
          <div className="card on-cream p-6">
            <h2 className="mb-4 text-[1.375rem]">מה יקרה אחרי שתשאיר פרטים</h2>
            <ol className="grid gap-3">
              {["אחזור אליך תוך יום עסקים אחד, בשעה שביקשת.", "נדבר 30 דקות, בטלפון או בזום, איך שבחרת.", "בסוף השיחה תדע אם יש התאמה ומה הצעד הראשון."].map((t, i) => (
                <li key={t} className="flex items-start gap-3">
                  <span aria-hidden="true" className="flex size-7 shrink-0 items-center justify-center rounded-full border border-gold font-display font-bold text-ink">{i + 1}</span>
                  <span className="pt-0.5">{t}</span>
                </li>
              ))}
            </ol>
          </div>
          <div className="card on-cream p-6">
            <h2 className="mb-4 text-[1.375rem]">עוד דרכים להגיע אליי</h2>
            <ul className="grid gap-3">
              <li className="flex items-center gap-3">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-ink text-gold-light"><IconMail /></span>
                <a href={`mailto:${CONTACT.email}`} dir="ltr" className="link-inline">{CONTACT.email}</a>
              </li>
              <li className="flex items-center gap-3">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-ink text-gold-light"><IconInstagram /></span>
                <a href={CONTACT.instagram} target="_blank" rel="noopener noreferrer" className="link-inline">
                  אינסטגרם: <span dir="ltr">{CONTACT.instagramHandle}</span>
                  <span className="sr-only"> (נפתח בחלון חדש)</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
