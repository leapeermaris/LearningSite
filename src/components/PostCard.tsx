import { Link } from "react-router";
import { audienceLabel, type PostMeta } from "~/lib/blog";

export function PostCard({ meta, headingLevel: H = "h2" }: { meta: PostMeta; headingLevel?: "h2" | "h3" }) {
  return (
    <article className="card card-hover reveal relative flex flex-col p-7">
      <p className="mb-3 flex items-center gap-3 text-[0.8125rem] text-gray-mid">
        <span className="rounded-full border border-line bg-paper px-2.5 py-0.5 font-semibold text-gold-text">{audienceLabel[meta.audience]}</span>
        <span>{meta.readingTime} דקות קריאה</span>
      </p>
      <H className="mb-3 text-[1.375rem] leading-snug">
        <Link to={`/blog/${meta.slug}`} className="after:absolute after:inset-0 after:content-['']">
          {meta.title}
        </Link>
      </H>
      <p className="mb-5 flex-1 text-base leading-relaxed">{meta.subtitle}</p>
      <span aria-hidden="true" className="link-arrow self-start">לקריאה ←</span>
    </article>
  );
}
