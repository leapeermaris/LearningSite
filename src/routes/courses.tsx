import type { Route } from "./+types/courses";
import { breadcrumbLd, buildMeta } from "~/lib/seo";
import { courses } from "~/data/courses";
import { PageHero } from "~/components/blocks";
import { CourseCard } from "~/components/CourseCard";
import { WaitlistForm } from "~/components/forms/WaitlistForm";

export const meta: Route.MetaFunction = () =>
  buildMeta({
    title: "קורסים דיגיטליים למנהלים ולאנשי למידה | לאה מריס",
    description:
      courses.length > 0
        ? "קורסים קצרים ומעשיים בניהול ובלמידה ארגונית, ללמידה בקצב שלך. כל קורס נגמר בכלי שאתה לוקח לעבודה."
        : "קורסים קצרים ומעשיים בניהול ובלמידה ארגונית, ללמידה בקצב שלך. הצטרף לרשימת ההמתנה ועזור לבחור את הנושא הראשון.",
    path: "/courses",
    jsonLd: [breadcrumbLd([{ name: "קורסים דיגיטליים", path: "/courses" }])],
  });

export default function Courses() {
  if (courses.length === 0) {
    return (
      <>
        <PageHero eyebrow="קורסים דיגיטליים" title="קורסים דיגיטליים בדרך. אתה יכול לעזור לבחור במה נתחיל." />
        <section aria-label="מה יגיע ורשימת המתנה" className="section bg-paper !pt-12">
          <div className="container-site grid items-start gap-10 nav:grid-cols-[1fr_0.9fr] nav:gap-16">
            <div>
              <p className="mb-6 text-lg leading-relaxed">
                אני בונה קורסים קצרים ומעשיים, למנהלים ולאנשי למידה ומשאבי אנוש. כל קורס בנוי סביב מיומנות אחת, עם תרגול, תבניות וכלים שאפשר
                ליישם כבר בשבוע שאחרי. לומדים בקצב שלך, מכל מקום. לפני שאני מחליטה על הנושא הראשון, אני רוצה לשמוע ממך.
              </p>
              <h2 className="mb-4 text-[1.5rem]">מה יהיה בכל קורס</h2>
              <ul className="grid gap-3">
                {["שיעורים קצרים, שאפשר לסיים בהפסקת קפה", "תרגול על מצבים אמיתיים מהעבודה", "תבניות וכלים להורדה"].map((t) => (
                  <li key={t} className="flex items-start gap-3">
                    <span aria-hidden="true" className="mt-3 size-1.5 shrink-0 rounded-full bg-gold" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <WaitlistForm intro="הראשונים ברשימה ישמעו על כל קורס לפני כולם." />
            </div>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <PageHero
        eyebrow="קורסים דיגיטליים"
        title="קורסים דיגיטליים: מיומנות אחת, בקצב שלך"
        lead="קורסים קצרים ומעשיים למנהלים ולאנשי למידה. כל קורס נגמר בכלי שאתה לוקח לעבודה."
      />
      <section aria-label="קטלוג הקורסים" className="section bg-paper !pt-12">
        <div className="container-site">
          <div className="grid gap-5 md:grid-cols-2 nav:grid-cols-3">
            {courses.map((c) => <CourseCard key={c.slug} course={c} />)}
          </div>
          <div className="mx-auto mt-16 max-w-[36rem]">
            <WaitlistForm title="רוצה לשמוע על הקורס הבא?" />
          </div>
        </div>
      </section>
    </>
  );
}
