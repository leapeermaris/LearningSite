import type { Route } from "./+types/contact";
import { breadcrumbLd, buildMeta } from "~/lib/seo";
import { CONTACT } from "~/lib/site";
import { ContactForm } from "~/components/forms/ContactForm";
import { IconChat, IconInstagram, IconMail, IconPhone } from "~/components/Icons";

export const meta: Route.MetaFunction = () =>
  buildMeta({
    title: "צרו קשר: שיחת היכרות של 30 דקות | לאה מריס",
    description: "שיחת היכרות של 30 דקות, בזום או בטלפון, ללא התחייבות. השאר פרטים, שלח וואטסאפ או התקשר: 050-570-0534.",
    path: "/contact",
    jsonLd: [breadcrumbLd([{ name: "צרו קשר", path: "/contact" }])],
  });

const ways = [
  { icon: <IconChat />, title: "וואטסאפ", text: "הכי מהיר.", link: { href: CONTACT.whatsappWithText, label: "לשיחה בוואטסאפ ←", external: true } },
  { icon: <IconPhone />, title: "טלפון", text: null, link: { href: CONTACT.phoneHref, label: CONTACT.phoneDisplay, ltr: true } },
  { icon: <IconMail />, title: "מייל", text: null, link: { href: `mailto:${CONTACT.email}`, label: CONTACT.email, ltr: true } },
  { icon: <IconInstagram />, title: "אינסטגרם", text: null, link: { href: CONTACT.instagram, label: CONTACT.instagramHandle, external: true, ltr: true } },
];

export default function Contact() {
  return (
    <section className="bg-[linear-gradient(180deg,rgba(250,248,244,0.6),rgba(250,248,244,0.95)),linear-gradient(120deg,var(--color-cream)_0%,var(--color-beige)_100%)] pt-28 pb-20 nav:pt-40 nav:pb-28">
      <div className="container-site">
        <div className="mb-12 max-w-[47.5rem]">
          <span className="eyebrow">צרו קשר</span>
          <h1 className="mb-5 text-[1.875rem] leading-[1.15] sm:text-[2.125rem] nav:text-[3.25rem]">נתחיל בשיחה של 30 דקות.</h1>
          <p className="text-lg leading-relaxed font-medium text-ink nav:text-xl">
            שיחת ההיכרות לא מחייבת לכלום. נבין יחד מה קורה אצלך, ואם אני לא הכתובת הנכונה, אגיד לך את זה.
          </p>
        </div>
        <div className="grid items-start gap-10 nav:grid-cols-[1.2fr_0.8fr] nav:gap-14">
          <div>
            <ContactForm />
          </div>
          <div className="grid gap-6">
            <div className="card on-cream p-6">
              <h2 className="mb-4 text-[1.375rem]">מה יקרה אחרי שתשאיר פרטים</h2>
              <ol className="grid gap-3">
                {["אחזור אליך תוך יום עסקים אחד.", "נקבע זמן לשיחה, בזום או בטלפון.", "בסוף השיחה תדע אם יש התאמה ומה הצעד הראשון."].map((t, i) => (
                  <li key={t} className="flex items-start gap-3">
                    <span aria-hidden="true" className="flex size-7 shrink-0 items-center justify-center rounded-full border border-gold font-display font-bold text-ink">{i + 1}</span>
                    <span className="pt-0.5">{t}</span>
                  </li>
                ))}
              </ol>
            </div>
            <div>
              <h2 className="mb-4 text-[1.375rem]">דרכים נוספות</h2>
              <ul className="grid gap-3 sm:grid-cols-2 nav:grid-cols-1">
                {ways.map((w) => (
                  <li key={w.title} className="card on-cream flex items-center gap-4 p-4.5">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-ink text-gold-light">{w.icon}</span>
                    <div>
                      <p className="font-semibold text-ink">{w.title}{w.text && <span className="font-normal text-gray-mid"> · {w.text}</span>}</p>
                      <a
                        href={w.link.href}
                        dir={w.link.ltr ? "ltr" : undefined}
                        target={w.link.external ? "_blank" : undefined}
                        rel={w.link.external ? "noopener noreferrer" : undefined}
                        className="link-inline text-[0.97rem]"
                      >
                        {w.link.label}
                        {w.link.external && <span className="sr-only"> (נפתח בחלון חדש)</span>}
                      </a>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
