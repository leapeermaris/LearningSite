import type { CaseStudy, Testimonial } from "~/data/proof";
import { SHOW_PLACEHOLDERS } from "~/lib/site";
import { PlaceholderGate, SectionHead } from "./blocks";

const visible = <T extends { placeholder: boolean }>(items: T[]) => items.filter((i) => !i.placeholder || SHOW_PLACEHOLDERS);

/** Renders nothing in production while every testimonial is still a placeholder. */
export function Testimonials({ items, eyebrow, title, className = "bg-paper" }: { items: Testimonial[]; eyebrow: string; title: string; className?: string }) {
  const shown = visible(items);
  if (!shown.length) return null;
  return (
    <section aria-labelledby="testimonials-title" className={`section ${className}`}>
      <div className="container-site">
        <SectionHead eyebrow={eyebrow} title={title} id="testimonials-title" />
        <div className="grid gap-5 md:grid-cols-2 nav:grid-cols-3">
          {shown.map((t, i) => (
            <PlaceholderGate key={i} isPlaceholder={t.placeholder}>
              <figure className="card reveal flex h-full flex-col gap-5 p-7">
                <svg aria-hidden="true" viewBox="0 0 24 24" className="size-8 text-gold" fill="currentColor"><path d="M10 7H6a3 3 0 0 0-3 3v4h5v-4H5.5A1.5 1.5 0 0 1 7 8.5h3zm11 0h-4a3 3 0 0 0-3 3v4h5v-4h-2.5A1.5 1.5 0 0 1 18 8.5h3z" /></svg>
                <blockquote className="flex-1 text-[1.0625rem] leading-relaxed">{t.quote}</blockquote>
                <figcaption className="text-[0.9375rem]">
                  <span className="block font-semibold text-ink">{t.name}</span>
                  <span className="text-gray-mid">{[t.role, t.org].filter(Boolean).join(", ")}</span>
                </figcaption>
              </figure>
            </PlaceholderGate>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CaseStudies({ items }: { items: CaseStudy[] }) {
  const shown = visible(items);
  if (!shown.length) return null;
  return (
    <section aria-labelledby="cases-title" className="section bg-paper">
      <div className="container-site max-w-[57.5rem]">
        <SectionHead eyebrow="מהשטח" title="איך זה נראה בפועל" id="cases-title" />
        <div className="grid gap-8">
          {shown.map((c, i) => (
            <PlaceholderGate key={i} isPlaceholder={c.placeholder}>
              <article className="on-dark reveal rounded-[var(--radius-card)] bg-ink p-7 text-paper shadow-[var(--shadow-strong)] sm:p-9">
                <span className="mb-2.5 block text-xs font-semibold tracking-[2px] text-gold-light">מקרה בוחן</span>
                <h3 className="mb-5 text-2xl text-paper">{c.org}</h3>
                <dl className="grid gap-4 text-[0.97rem] leading-relaxed text-paper/90">
                  <div>
                    <dt className="font-semibold text-gold-light">האתגר</dt>
                    <dd>{c.challenge}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-gold-light">מה עשינו</dt>
                    <dd>
                      <ul className="list-disc ps-5">
                        {c.whatWeDid.map((s) => <li key={s}>{s}</li>)}
                      </ul>
                    </dd>
                  </div>
                  <div className="rounded-md border-s-[3px] border-gold-light bg-gold-light/10 px-4.5 py-3.5">
                    <dt className="font-semibold text-gold-light">התוצאה</dt>
                    <dd className="font-medium text-paper">{c.result}</dd>
                  </div>
                </dl>
              </article>
            </PlaceholderGate>
          ))}
        </div>
      </div>
    </section>
  );
}
