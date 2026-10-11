import { Link } from "react-router";
import type { Route } from "./+types/post";
import { absoluteUrl, breadcrumbLd, buildMeta } from "~/lib/seo";
import { BRAND_SHORT, SITE_URL } from "~/lib/site";
import { audienceLabel, formatDate, getPost, posts } from "~/lib/blog";
import { CtaButton } from "~/components/blocks";
import { PostCard } from "~/components/PostCard";
import { NotFoundContent } from "./not-found";
import type { ComponentType } from "react";

// Full article bodies, bundled only into this route
const bodies = import.meta.glob<ComponentType>("../content/blog/*.mdx", { eager: true, import: "default" });
const bodyFor = (slug: string) => Object.entries(bodies).find(([p]) => p.endsWith(`/${slug}.mdx`))?.[1];

export const meta: Route.MetaFunction = ({ params }) => {
  const post = getPost(params.slug);
  if (!post) return [{ title: "המאמר לא נמצא | לאה מריס" }, { name: "robots", content: "noindex" }];
  const m = post.meta;
  const path = `/blog/${m.slug}`;
  return buildMeta({
    title: m.metaTitle,
    description: m.description,
    path,
    type: "article",
    image: `/og/${m.slug}.png`,
    jsonLd: [
      {
        "@type": "Article",
        headline: m.title,
        description: m.description,
        inLanguage: "he",
        datePublished: m.date,
        dateModified: m.updated ?? m.date,
        mainEntityOfPage: absoluteUrl(path),
        image: absoluteUrl(`/og/${m.slug}.png`),
        author: { "@type": "Person", name: BRAND_SHORT, url: `${SITE_URL}/about` },
        publisher: { "@id": `${SITE_URL}/#business` },
      },
      breadcrumbLd([{ name: "תוכן ומאמרים", path: "/blog" }, { name: m.title, path }]),
    ],
  });
};

export default function Post({ params }: Route.ComponentProps) {
  const post = getPost(params.slug);
  if (!post) return <NotFoundContent />;
  const m = post.meta;
  const Component = bodyFor(m.slug)!;
  const more = posts.filter((p) => p.meta.slug !== m.slug).slice(0, 2);
  return (
    <>
      <article>
        <header className="bg-cream pt-28 pb-12 nav:pt-40 nav:pb-16">
          <div className="container-site max-w-[47.5rem]">
            <nav aria-label="פירורי לחם" className="mb-6 text-sm text-gray-mid">
              <ol className="flex flex-wrap gap-1.5">
                <li><Link to="/" className="hover:text-ink">בית</Link> /</li>
                <li><Link to="/blog" className="hover:text-ink">תוכן ומאמרים</Link> /</li>
                <li aria-current="page" className="text-ink">{m.title}</li>
              </ol>
            </nav>
            <p className="mb-4 flex flex-wrap items-center gap-3 text-[0.875rem] text-gray-mid">
              <span className="rounded-full border border-line bg-paper px-2.5 py-0.5 font-semibold text-gold-text">{audienceLabel[m.audience]}</span>
              <span>{m.readingTime} דקות קריאה</span>
              <span>·</span>
              <time dateTime={m.date}>{formatDate(m.date)}</time>
            </p>
            <h1 className="mb-4 text-[2rem] leading-[1.2] nav:text-[2.75rem]">{m.title}</h1>
            <p className="text-xl font-medium text-ink">{m.subtitle}</p>
          </div>
        </header>
        <div className="container-site max-w-[47.5rem] py-12 nav:py-16">
          <div className="prose-lm">
            <Component />
          </div>

          <aside aria-label="על הכותבת" className="mt-14 rounded-[var(--radius-card)] border border-line bg-cream p-6">
            <p className="mb-1 font-display text-xl font-semibold text-ink">לאה מריס</p>
            <p className="text-[0.97rem] leading-relaxed">
              יותר מ-15 שנה בניהול, משאבי אנוש ולמידה ארגונית. היום מנהלת למידה ארגונית, ובונה לארגונים ולמנהלים למידה שעוברת לשטח.{" "}
              <Link to="/about" className="link-inline">עוד עליי</Link>
            </p>
          </aside>

          <div className="on-dark mt-8 rounded-[var(--radius-card)] bg-ink p-7 text-center text-paper">
            <p className="mb-5 text-lg">{m.related.label}</p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link to={m.related.href} className="btn btn-light">
                {m.related.href === "/managers" ? "למסלול למנהלים ←" : "לפתרונות לארגונים ←"}
              </Link>
              <CtaButton className="btn-outline-light !bg-transparent" />
            </div>
          </div>
        </div>
      </article>

      {more.length > 0 && (
        <section aria-labelledby="more-title" className="section bg-paper !pt-0">
          <div className="container-site max-w-[60rem]">
            <h2 id="more-title" className="mb-6 text-[1.625rem]">עוד מאמרים</h2>
            <div className="grid gap-5 md:grid-cols-2">
              {more.map((p) => <PostCard key={p.meta.slug} meta={p.meta} headingLevel="h3" />)}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
