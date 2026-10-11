import { useState } from "react";
import type { Route } from "./+types/blog";
import { breadcrumbLd, buildMeta } from "~/lib/seo";
import { posts, type PostMeta } from "~/lib/blog";
import { PageHero } from "~/components/blocks";
import { PostCard } from "~/components/PostCard";
import { ResourceForm } from "~/components/forms/ResourceForm";
import clsx from "clsx";

export const meta: Route.MetaFunction = () =>
  buildMeta({
    title: "מאמרים על למידה ארגונית ופיתוח מנהלים | לאה מריס",
    description:
      "מאמרים מעשיים על הדרכה שעוברת לשטח, כניסה לתפקיד ניהולי וניהול תחום הלמידה בארגון בינוני. בלי תיאוריה מיותרת.",
    path: "/blog",
    jsonLd: [breadcrumbLd([{ name: "תוכן ומאמרים", path: "/blog" }])],
  });

const filters: { v: "all" | PostMeta["audience"]; l: string }[] = [
  { v: "all", l: "הכל" },
  { v: "organizations", l: "לארגונים" },
  { v: "managers", l: "למנהלים" },
];

export default function Blog() {
  const [filter, setFilter] = useState<(typeof filters)[number]["v"]>("all");
  const shown = posts.filter((p) => filter === "all" || p.meta.audience === filter);
  return (
    <>
      <PageHero
        eyebrow="תוכן ומאמרים"
        title="תשובות מעשיות לשאלות שאני שומעת הכי הרבה"
        lead="על למידה בארגון, פיתוח מנהלים ובניית צוותים. כל מאמר נגמר במשהו שאפשר לעשות כבר השבוע."
      />
      <section aria-labelledby="posts-title" className="section bg-paper !pt-12">
        <div className="container-site">
          <h2 id="posts-title" className="sr-only">מאמרים</h2>
          <div role="group" aria-label="סינון מאמרים לפי קהל" className="mb-8 flex flex-wrap gap-2.5">
            {filters.map((f) => (
              <button
                key={f.v}
                type="button"
                aria-pressed={filter === f.v}
                onClick={() => setFilter(f.v)}
                className={clsx("rounded-full border px-4.5 py-2 text-[0.9375rem] transition-colors", filter === f.v ? "border-ink bg-ink text-paper" : "border-[#8f8676] bg-paper hover:border-ink")}
              >
                {f.l}
              </button>
            ))}
          </div>
          <p className="sr-only" role="status" aria-live="polite">{shown.length} מאמרים מוצגים</p>
          <div className="grid gap-5 md:grid-cols-2 nav:grid-cols-3">
            {shown.map((p) => <PostCard key={p.meta.slug} meta={p.meta} headingLevel="h3" />)}
          </div>
        </div>
      </section>

      <section id="resource" aria-labelledby="resource-title" className="section bg-cream">
        <div className="container-site grid items-center gap-10 nav:grid-cols-[1fr_1fr] nav:gap-16">
          <div className="reveal">
            <span className="mb-4 inline-block rounded-full border border-line bg-paper px-3 py-1 text-[0.8125rem] font-semibold text-gold-text">להורדה חינם</span>
            <h2 id="resource-title" className="h-section mb-5">לפני שמזמינים הדרכה: 5 שאלות שחוסכות תקציב</h2>
            <p className="text-lg leading-relaxed">
              עמוד אחד שמסכם את חמש השאלות מהמאמר "ההדרכה הייתה מצוינת. אז למה שום דבר לא השתנה?", בפורמט שאפשר להדפיס ולהביא לישיבה עם ספק או
              עם ההנהלה.
            </p>
          </div>
          <div className="card on-cream reveal p-6 sm:p-8">
            <ResourceForm />
          </div>
        </div>
      </section>
    </>
  );
}
