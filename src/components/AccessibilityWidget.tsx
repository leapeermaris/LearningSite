import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import clsx from "clsx";

type Prefs = { font: "base" | "lg" | "xl"; contrast: boolean; grayscale: boolean; noMotion: boolean; underline: boolean };
const DEFAULTS: Prefs = { font: "base", contrast: false, grayscale: false, noMotion: false, underline: false };
const KEY = "lm-a11y";

function apply(p: Prefs) {
  const c = document.documentElement.classList;
  c.toggle("a11y-font-lg", p.font === "lg");
  c.toggle("a11y-font-xl", p.font === "xl");
  c.toggle("a11y-contrast", p.contrast);
  c.toggle("a11y-grayscale", p.grayscale);
  c.toggle("a11y-no-motion", p.noMotion);
  c.toggle("a11y-underline", p.underline);
}

/** Lightweight accessibility menu, same features as the existing site. An addition, not a substitute for accessible code. */
export function AccessibilityWidget() {
  const [open, setOpen] = useState(false);
  const [prefs, setPrefs] = useState<Prefs>(DEFAULTS);
  const panelRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(KEY);
      if (saved) setPrefs({ ...DEFAULTS, ...JSON.parse(saved) });
    } catch {
      /* storage unavailable: keep defaults */
    }
  }, []);

  useEffect(() => {
    apply(prefs);
    try {
      localStorage.setItem(KEY, JSON.stringify(prefs));
    } catch {
      /* ignore */
    }
  }, [prefs]);

  useEffect(() => {
    if (!open) return;
    panelRef.current?.querySelector<HTMLElement>("button")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        btnRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const toggle = (k: keyof Omit<Prefs, "font">) => setPrefs((p) => ({ ...p, [k]: !p[k] }));
  const chip = "flex-1 rounded-lg border px-1.5 py-2 text-[0.8125rem] transition-colors";
  const toggles: { k: keyof Omit<Prefs, "font">; l: string }[] = [
    { k: "contrast", l: "ניגודיות גבוהה" },
    { k: "grayscale", l: "גווני אפור" },
    { k: "noMotion", l: "עצירת אנימציות" },
    { k: "underline", l: "הדגשת קישורים" },
  ];

  return (
    <div className="no-print">
      <button
        ref={btnRef}
        type="button"
        aria-expanded={open}
        aria-controls="a11y-panel"
        onClick={() => setOpen((v) => !v)}
        className="on-dark fixed right-4 bottom-4 z-[1400] flex size-[3.25rem] items-center justify-center rounded-full border border-gold-light/40 bg-ink text-gold-light shadow-[0_8px_20px_rgba(14,26,48,0.28)] transition-transform hover:-translate-y-0.5 sm:right-7 sm:bottom-7"
      >
        <span className="sr-only">תפריט נגישות</span>
        <svg aria-hidden="true" viewBox="0 0 24 24" className="size-7" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
          <circle cx="12" cy="12" r="10" />
          <circle cx="12" cy="6.8" r="1.3" fill="currentColor" />
          <path d="M7 9.5l5 1 5-1M12 10.5v4M12 14.5l-2.5 4.5M12 14.5l2.5 4.5" />
        </svg>
      </button>

      <div
        id="a11y-panel"
        ref={panelRef}
        role="dialog"
        aria-label="הגדרות נגישות"
        hidden={!open}
        className="fixed right-4 bottom-[5.25rem] left-4 z-[1401] rounded-[var(--radius-card)] border border-line bg-paper p-4.5 text-text shadow-[var(--shadow-strong)] sm:right-7 sm:left-auto sm:bottom-[5.75rem] sm:w-[19rem]"
      >
        <div className="mb-3.5 flex items-center justify-between">
          <h2 className="text-xl">נגישות</h2>
          <button type="button" onClick={() => { setOpen(false); btnRef.current?.focus(); }} className="rounded-md px-2 text-2xl leading-none text-ink hover:bg-cream">
            <span aria-hidden="true">×</span>
            <span className="sr-only">סגירת תפריט הנגישות</span>
          </button>
        </div>

        <fieldset className="mb-3.5">
          <legend className="mb-2 text-[0.8125rem] font-semibold text-muted">גודל טקסט</legend>
          <div className="flex gap-1.5">
            {([["base", "רגיל"], ["lg", "גדול"], ["xl", "גדול מאוד"]] as const).map(([v, l]) => (
              <button
                key={v}
                type="button"
                aria-pressed={prefs.font === v}
                onClick={() => setPrefs((p) => ({ ...p, font: v }))}
                className={clsx(chip, prefs.font === v ? "border-ink bg-ink text-paper" : "border-line bg-cream hover:border-gold")}
              >
                {l}
              </button>
            ))}
          </div>
        </fieldset>

        <div className="grid gap-2">
          {toggles.map(({ k, l }) => (
            <button
              key={k}
              type="button"
              aria-pressed={prefs[k]}
              onClick={() => toggle(k)}
              className={clsx("rounded-lg border px-3.5 py-2.5 text-start text-sm transition-colors", prefs[k] ? "border-ink bg-ink text-paper" : "border-line bg-cream hover:border-gold")}
            >
              {l}
            </button>
          ))}
        </div>

        <div className="mt-3.5 flex items-center justify-between border-t border-line pt-3 text-[0.8125rem]">
          <button type="button" onClick={() => setPrefs(DEFAULTS)} className="underline">איפוס</button>
          <Link to="/accessibility" className="font-semibold text-gold-text hover:underline" onClick={() => setOpen(false)}>
            הצהרת נגישות
          </Link>
        </div>
      </div>
    </div>
  );
}
