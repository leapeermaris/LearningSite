import { Link } from "react-router";
import { audienceLabel, type Course } from "~/data/courses";

export function CourseCard({ course }: { course: Course }) {
  return (
    <article className="card card-hover reveal relative flex flex-col overflow-hidden">
      {course.image && (
        <img src={course.image} alt={course.imageAlt ?? ""} width={1200} height={750} loading="lazy" decoding="async" className="aspect-[16/10] w-full object-cover" />
      )}
      <div className="flex flex-1 flex-col p-7">
        <p className="mb-3 flex flex-wrap gap-2 text-[0.8125rem] font-semibold">
          <span className="rounded-full border border-line bg-paper px-2.5 py-0.5 text-gold-text">{audienceLabel[course.audience]}</span>
          <span className={course.status === "open" ? "rounded-full bg-ink px-2.5 py-0.5 text-paper" : "rounded-full border border-line px-2.5 py-0.5 text-gray-mid"}>
            {course.status === "open" ? "פתוח להרשמה" : "בקרוב"}
          </span>
        </p>
        <h2 className="mb-2 text-[1.375rem] leading-snug">
          <Link to={`/courses/${course.slug}`} className="after:absolute after:inset-0 after:content-['']">{course.title}</Link>
        </h2>
        <p className="mb-4 flex-1 leading-relaxed">{course.outcome}</p>
        <p className="mb-4 text-sm text-gray-mid">
          {course.duration} · {course.format}
          {course.price && <> · <span className="font-semibold text-ink">{course.price}</span></>}
        </p>
        <span aria-hidden="true" className="link-arrow self-start">לפרטים ←</span>
      </div>
    </article>
  );
}
