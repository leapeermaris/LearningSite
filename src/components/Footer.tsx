import { Link } from "react-router";
import { CONTACT, NAV, PERSONAL_SITE_URL } from "~/lib/site";
import { NewsletterForm } from "./forms/NewsletterForm";
import { IconChat, IconExternal, IconInstagram, IconMail, IconPhone } from "./Icons";

const footerNav = NAV.filter((n) => n.href !== "/");

export function Footer() {
  return (
    <footer className="on-dark bg-ink pt-16 pb-8 text-paper/85 nav:pt-20">
      <div className="container-site">
        <div className="grid gap-12 md:grid-cols-2 nav:grid-cols-[1.2fr_0.8fr_1fr_1.2fr]">
          <div>
            <p className="font-display text-[1.75rem] font-bold text-paper">לאה מריס</p>
            <p className="mt-1 text-[0.9375rem] text-gold-light">ייעוץ ופיתוח ארגוני</p>
            <p className="mt-4 max-w-xs text-[0.9375rem] leading-relaxed">למידה שמזיזה ביצועים, לארגונים ולמנהלים.</p>
          </div>

          <nav aria-label="ניווט בפוטר">
            <h2 className="mb-4 font-sans text-base font-semibold text-paper">ניווט</h2>
            <ul className="grid gap-2.5 text-[0.9375rem]">
              {footerNav.map((n) => (
                <li key={n.href}>
                  <Link to={n.href} className="hover:text-gold-light">{n.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="mb-4 font-sans text-base font-semibold text-paper">בואו נדבר</h2>
            <ul className="grid gap-3.5 text-[0.9375rem]">
              <li>
                <a href={CONTACT.phoneHref} className="flex items-center gap-3 hover:text-gold-light">
                  <IconPhone /> <span dir="ltr">{CONTACT.phoneDisplay}</span>
                </a>
              </li>
              <li>
                <a href={CONTACT.whatsappWithText} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-gold-light">
                  <IconChat /> לשיחה בוואטסאפ<span className="sr-only"> (נפתח בחלון חדש)</span>
                </a>
              </li>
              <li>
                <a href={`mailto:${CONTACT.email}`} className="flex items-center gap-3 hover:text-gold-light">
                  <IconMail /> <span dir="ltr">{CONTACT.email}</span>
                </a>
              </li>
              <li>
                <a href={CONTACT.instagram} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-gold-light">
                  <IconInstagram /> אינסטגרם: <span dir="ltr">{CONTACT.instagramHandle}</span>
                  <span className="sr-only"> (נפתח בחלון חדש)</span>
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="mb-2 font-sans text-base font-semibold text-paper">רעיון אחד מעשי, פעם בחודש</h2>
            <p className="mb-4 text-[0.9375rem] leading-relaxed">על למידה בארגון, ניהול וצוותים. קצר, בלי ספאם, אפשר להסיר בכל רגע.</p>
            <NewsletterForm />
          </div>
        </div>

        <div className="mt-12 rounded-[var(--radius-card)] border border-gold-light/25 px-6 py-5 text-[0.9375rem]">
          מחפש ליווי אישי צמוד ומתמשך כמנהל?{" "}
          <a href={PERSONAL_SITE_URL} target="_blank" rel="noopener noreferrer" className="link-arrow inline-flex items-center gap-1">
            לאתר הליווי האישי שלי <IconExternal />
            <span className="sr-only"> (נפתח בחלון חדש)</span>
          </a>
        </div>

        <p className="mt-10 text-xs leading-relaxed text-paper/70">האתר כתוב בלשון זכר מטעמי נוחות בלבד, ומיועד לנשים ולגברים כאחד.</p>

        <div className="mt-4 flex flex-col items-center justify-between gap-4 border-t border-paper/15 pt-6 text-sm text-paper/75 sm:flex-row">
          <p>© {new Date().getFullYear()} לאה מריס · ייעוץ ופיתוח ארגוני</p>
          <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            <li><Link to="/accessibility" className="hover:text-gold-light">הצהרת נגישות</Link></li>
            <li><Link to="/privacy" className="hover:text-gold-light">מדיניות פרטיות</Link></li>
            <li><Link to="/terms" className="hover:text-gold-light">תנאי שימוש</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
