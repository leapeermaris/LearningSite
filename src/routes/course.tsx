import { Link } from "react-router";
import { NotFoundContent } from "./not-found";
import type { Route } from "./+types/course";
import { breadcrumbLd, buildMeta, faqLd } from "~/lib/seo";
import { BRAND_SHORT, SITE_URL } from "~/lib/site";
import { audienceLabel, courses } from "~/data/courses";
import { CheckList, Faq, PageHero, SectionHead } from "~/components/blocks";

const find = (slug?: string) => courses.find((c) => c.slug === slug);

export const meta: Route.MetaFunction = ({ params }) => {
  const c = find(params.slug);
  if (!c) return [{ title: "קורס לא נמצא | לאה מריס" }];
  return buildMeta({
    title: `${c.title} | קורס דיגיטלי | לאה מריס`,
    description: c.metaDescription,
    path: `/courses/${c.slug}`,
    image: c.image,
    jsonLd: [
      {
        "@type": "Course",
        name: c.title,
        description: c.metaDescription,
        inLanguage: "he",
        provider: { "@type": "Person", name: BRAND_SHORT, url: `${SITE_URL}/about` },
      },
      ...(c.faq.length ? [faqLd(c.faq)] : []),
      breadcrumbLd([{ name: "קורסים דיגיטליים", path: "/courses" }, { name: c.title, path: `/courses/${c.slug}` }]),
    ],
  });
};

export default function CoursePage({ params }: Route.ComponentProps) {
  const c = find(params.slug);
  if (!c) return <NotFoundContent />;
  return (
    <>
      <PageHero eyebrow={`קורס דיגיטלי · ${audienceLabel[c.audience]}`} title={c.title} lead={c.outcome}>
        <p className="mb-8 text-base text-gray-mid">
          {c.duration} · {c.format}
          {c.price && <> · <strong className="text-ink">{c.price}</strong></>}
        </p>
        {c.status === "open" && c.enrollUrl ? (
          <a href={c.enrollUrl} className="btn btn-primary">להרשמה לקורס</a>
        ) : (
          <Link to="/courses" className="btn btn-primary">להצטרפות לרשימת ההמתנה</Link>
        )}
      </PageHero>

      <section aria-labelledby="for-who" className="section bg-paper">
        <div className="container-site grid gap-8 md:grid-cols-2">
          <div className="card reveal p-7">
            <h2 id="for-who" className="mb-4 text-[1.5rem]">למי הקורס</h2>
            <CheckList items={c.forWho} />
          </div>
          <div className="card reveal p-7">
            <h2 className="mb-4 text-[1.5rem]">מה תדע לעשות בסוף</h2>
            <CheckList items={c.youWillBeAbleTo} />
          </div>
        </div>
      </section>

      <section aria-labelledby="modules-title" className="section bg-cream">
        <div className="container-site max-w-[51.25rem]">
          <SectionHead id="modules-title" eyebrow="מבנה הקורס" title="מה לומדים" />
          <ol className="grid gap-4">
            {c.modules.map((m, i) => (
              <li key={m.title} className="card reveal p-6">
                <h3 className="mb-2 text-xl">
                  <span className="text-gold-text">מודול {i + 1}: </span>
                  {m.title}
                </h3>
                <ul className="list-disc ps-5 text-base">
                  {m.lessons.map((l) => <li key={l}>{l}</li>)}
                </ul>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="teacher-title" className="section bg-paper">
        <div className="container-site max-w-[51.25rem] text-center">
          <h2 id="teacher-title" className="h-section mb-4">מי מלמדת</h2>
          <p className="mb-4 text-lg leading-relaxed">
            לאה מריס. יותר מ-15 שנה בניהול, משאבי אנוש ולמידה ארגונית, והיום מנהלת למידה ארגונית.
          </p>
          <Link to="/about" className="link-arrow">עוד עליי ←</Link>
        </div>
      </section>

      {c.faq.length > 0 && (
        <section aria-labelledby="faq-title" className="section bg-cream">
          <div className="container-site">
            <SectionHead id="faq-title" eyebrow="שאלות נפוצות" title="לפני שנרשמים" />
            <Faq items={c.faq} />
          </div>
        </section>
      )}
    </>
  );
}
