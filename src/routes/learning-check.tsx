import { useRef, useState } from "react";
import { Link } from "react-router";
import clsx from "clsx";
import type { Route } from "./+types/learning-check";
import { breadcrumbLd, buildMeta } from "~/lib/seo";
import { CtaButton, PageHero } from "~/components/blocks";
import data from "~/data/learning-check.json";

export const meta: Route.MetaFunction = () =>
  buildMeta({
    title: "בדיקה: עד כמה הלמידה בארגון שלך עובדת? | לאה מריס",
    description:
      "8 שאלות קצרות, 2 דקות, ותוצאה מיידית לפי ארבעה תחומים: הגדרת מטרות, קרבה לעבודה, מעורבות מנהלים ומדידה. עם המלצה לצעד הבא.",
    path: "/learning-check",
    jsonLd: [breadcrumbLd([{ name: "בדיקת מצב הלמידה", path: "/learning-check" }])],
  });

type Answers = Record<string, number>;

function score(answers: Answers) {
  const perDim = data.dimensions.map((d) => {
    const qs = data.questions.filter((q) => q.dim === d.id);
    const sum = qs.reduce((s, q) => s + (answers[q.id] ?? 0), 0);
    return { ...d, pct: Math.round((sum / (qs.length * 3)) * 100) };
  });
  const total = Math.round((data.questions.reduce((s, q) => s + (answers[q.id] ?? 0), 0) / (data.questions.length * 3)) * 100);
  const band = data.bands.find((b) => total <= b.max) ?? data.bands[data.bands.length - 1];
  const weakest = perDim.reduce((w, d) => (d.pct < w.pct ? d : w), perDim[0]);
  return { total, band, perDim, weakest };
}

export default function LearningCheck() {
  const [answers, setAnswers] = useState<Answers>({});
  const [result, setResult] = useState<ReturnType<typeof score> | null>(null);
  const [missing, setMissing] = useState(false);
  const resultRef = useRef<HTMLHeadingElement>(null);
  const answered = Object.keys(answers).length;
  const totalQ = data.questions.length;

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const firstMissing = data.questions.find((q) => answers[q.id] === undefined);
    if (firstMissing) {
      setMissing(true);
      document.querySelector<HTMLInputElement>(`input[name="${firstMissing.id}"]`)?.focus();
      return;
    }
    setMissing(false);
    setResult(score(answers));
    requestAnimationFrame(() => resultRef.current?.focus());
  }

  return (
    <>
      <PageHero
        eyebrow="בדיקה מהירה"
        title="עד כמה הלמידה בארגון שלך עובדת?"
        lead="8 שאלות, בערך 2 דקות. בסוף תקבל תמונה לפי ארבעה תחומים, ואת הצעד הראשון שהייתי ממליצה עליו."
      >
        <p className="max-w-[36rem] text-base leading-relaxed text-muted">
          זו לא בדיקה מדעית. זה כלי חשיבה מהיר, שמבוסס על העקרונות שאני עובדת לפיהם. התשובות נשארות אצלך: שום דבר לא נשמר ולא נשלח.
        </p>
      </PageHero>

      <section aria-label="השאלות" className="section bg-paper !pt-12">
        <div className="container-site max-w-[51.25rem]">
          <form id="lc-form" onSubmit={submit} noValidate className="grid gap-5">
            <p className="text-sm font-semibold text-gray-mid" aria-live="polite">
              <span id="lc-progress">{answered}</span> מתוך {totalQ} שאלות נענו
            </p>
            <div className="h-1 overflow-hidden rounded-full bg-gray-light" aria-hidden="true">
              <div id="lc-bar" className="h-full bg-gold transition-[width] duration-300" style={{ width: `${(answered / totalQ) * 100}%` }} />
            </div>
            {data.questions.map((q, i) => (
              <fieldset key={q.id} className="card p-5 sm:p-6">
                <legend className="sr-only">
                  שאלה {i + 1} מתוך {totalQ}
                </legend>
                <p className="mb-4 flex gap-3 text-[1.0625rem] leading-relaxed font-medium text-ink sm:text-lg">
                  <span aria-hidden="true" className="font-display text-xl font-bold text-gold-text">{i + 1}.</span>
                  <span>{q.text}</span>
                </p>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {data.scale.map((o) => (
                    <label
                      key={o.value}
                      className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-[#8f8676] bg-paper px-3 py-2.5 text-center text-[0.9375rem] transition-colors hover:border-ink has-[:checked]:border-ink has-[:checked]:bg-ink has-[:checked]:text-paper has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-gold"
                    >
                      <input
                        type="radio"
                        name={q.id}
                        value={o.value}
                        data-dim={q.dim}
                        className="sr-only"
                        checked={answers[q.id] === o.value}
                        onChange={() => setAnswers((a) => ({ ...a, [q.id]: o.value }))}
                      />
                      {o.label}
                    </label>
                  ))}
                </div>
              </fieldset>
            ))}
            <div id="lc-missing" role="alert" className={clsx("text-[0.9375rem] font-medium text-error", !missing && "hidden")}>
              כדי לקבל תוצאה, צריך לענות על כל השאלות. סימנתי לך את הראשונה שחסרה.
            </div>
            <button type="submit" className="btn btn-primary w-full sm:w-auto sm:justify-self-start">
              לתוצאה שלי
            </button>
          </form>

          <div id="lc-result" aria-live="polite" className="mt-12">
            {result && (
              <div className="grid gap-6">
                <div className="on-dark rounded-[var(--radius-card)] bg-ink p-7 text-paper sm:p-9">
                  <p className="mb-2 text-sm font-semibold tracking-[1px] text-gold-light">התוצאה שלך: {result.total} מתוך 100</p>
                  <h2 ref={resultRef} tabIndex={-1} className="mb-4 text-[1.875rem] text-paper outline-none nav:text-[2.25rem]">
                    {result.band.title}
                  </h2>
                  <p className="max-w-[42rem] text-lg leading-relaxed text-paper/90">{result.band.text}</p>
                </div>

                <div className="card p-7 sm:p-8">
                  <h3 className="mb-5 text-[1.5rem]">התמונה לפי תחומים</h3>
                  <ul className="grid gap-4">
                    {result.perDim.map((d) => (
                      <li key={d.id}>
                        <div className="mb-1.5 flex items-baseline justify-between gap-4">
                          <span className={clsx("font-semibold", d.id === result.weakest.id ? "text-ink" : "text-muted")}>
                            {d.title}
                            {d.id === result.weakest.id && <span className="ms-2 rounded-full bg-gold-light px-2 py-0.5 text-xs text-ink">כאן כדאי להתחיל</span>}
                          </span>
                          <span className="tabular-nums text-sm text-gray-mid">{d.pct}%</span>
                        </div>
                        <div className="h-2.5 overflow-hidden rounded-full bg-gray-light" aria-hidden="true">
                          <div className={clsx("h-full rounded-full", d.id === result.weakest.id ? "bg-gold" : "bg-ink")} style={{ width: `${Math.max(d.pct, 3)}%` }} />
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="card p-7 sm:p-8">
                  <h3 className="mb-3 text-[1.5rem]">הצעד הראשון שהייתי ממליצה עליו</h3>
                  <p className="mb-4 text-[1.0625rem] leading-relaxed">{result.weakest.weak}</p>
                  <Link to={result.weakest.link.href} className="link-arrow">{result.weakest.link.label} ←</Link>
                </div>

                <div className="rounded-[var(--radius-card)] border border-line bg-cream p-7 text-center sm:p-9">
                  <h3 className="mb-3 text-[1.625rem]">רוצה לעבור על התוצאה יחד?</h3>
                  <p className="mx-auto mb-6 max-w-[36rem] text-[1.0625rem] leading-relaxed">
                    בשיחת היכרות של 30 דקות נבין מה עומד מאחורי המספרים, ומה הצעד שייתן את התוצאה הכי גדולה אצלך. בלי התחייבות.
                  </p>
                  <CtaButton />
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
