import { createContext, useContext, useRef, useState, type ReactNode } from "react";
import { Link } from "react-router";
import clsx from "clsx";
import { CONTACT, CTA } from "~/lib/site";
import { validators } from "~/lib/forms/submit";
import { Field, FormShell, FormStatus, PrivacyNote, SubmitButton, useLeadForm } from "./forms/FormParts";
import { IconPhone, IconWhatsApp } from "./Icons";

/* Every "book an intro call" button opens one dialog with WhatsApp, the phone number and a short call-back form.
   The button is a real link to /contact, so it still works if JavaScript has not loaded. */

const BookingCtx = createContext<{ open: () => void }>({ open: () => {} });
export const useBooking = () => useContext(BookingCtx);

export function BookingProvider({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDialogElement>(null);
  const open = () => {
    const d = ref.current;
    if (d && !d.open) d.showModal();
  };
  return (
    <BookingCtx.Provider value={{ open }}>
      {children}
      <dialog
        ref={ref}
        id="booking-dialog"
        aria-labelledby="booking-dialog-title"
        className="no-print m-auto w-[min(34rem,calc(100vw-2rem))] max-h-[calc(100dvh-2rem)] overflow-y-auto rounded-[var(--radius-card)] border border-line bg-paper p-0 text-text shadow-[var(--shadow-strong)] backdrop:bg-ink/60"
        onClick={(e) => {
          if (e.target === e.currentTarget) e.currentTarget.close();
        }}
      >
        <div className="relative p-6 sm:p-8">
          <form method="dialog" className="absolute top-3 left-3">
            <button type="submit" data-booking-close className="flex size-9 items-center justify-center rounded-full text-2xl leading-none text-ink hover:bg-cream">
              <span aria-hidden="true">×</span>
              <span className="sr-only">סגירה</span>
            </button>
          </form>
          <BookingPanel titleId="booking-dialog-title" />
        </div>
      </dialog>
    </BookingCtx.Provider>
  );
}

/** The CTA used across the site. Opens the booking dialog; falls back to /contact. */
export function CtaButton({ label = CTA.label, className }: { label?: string; className?: string }) {
  const { open } = useBooking();
  return (
    <Link
      to={CTA.href}
      data-booking
      aria-haspopup="dialog"
      className={clsx("btn btn-primary", className)}
      onClick={(e) => {
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
        e.preventDefault();
        open();
      }}
    >
      {label}
    </Link>
  );
}

const TIME_SLOTS = ["בוקר", "צהריים", "ערב"];
const MODES = [
  { v: "phone", l: "שיחת טלפון" },
  { v: "zoom", l: "זום" },
];

/** WhatsApp, phone and the short call-back form. Used in the dialog and on /contact. */
export function BookingPanel({ titleId, as: H = "h2" }: { titleId: string; as?: "h1" | "h2" }) {
  const [firstName, setFirstName] = useState("");
  const [mode, setMode] = useState("שיחת טלפון");
  const { status, errors, onSubmit, formRef } = useLeadForm(
    "booking",
    (v) => {
      const e: Record<string, string> = {};
      const n = validators.name(String(v.name ?? ""));
      if (n) e.name = n;
      const p = validators.phone(String(v.phone ?? ""));
      if (p) e.phone = p;
      setFirstName(String(v.name ?? "").trim().split(/\s+/)[0] ?? "");
      setMode(v.call_type === "zoom" ? "בזום" : "בטלפון");
      return e;
    },
    // No choice means a phone call
    (v) => ({ ...v, call_type: v.call_type === "zoom" ? "זום" : "שיחת טלפון" }),
  );

  return (
    <div>
      <H id={titleId} className="mb-2 text-[1.75rem] leading-tight sm:text-[2rem]">נקבע שיחת היכרות</H>
      <p className="mb-6 text-[1.0625rem] leading-relaxed">30 דקות, בטלפון או בזום. ללא התחייבות. בחר את הדרך הכי נוחה לך:</p>

      <div className="mb-6 grid gap-3 sm:grid-cols-2">
        <a
          href={CONTACT.whatsappWithText}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2.5 rounded-[var(--radius-pill)] bg-whatsapp px-5 py-3.5 font-semibold text-ink transition-transform hover:-translate-y-0.5"
        >
          <IconWhatsApp className="size-6 [&_path]:fill-ink" />
          כתוב לי בוואטסאפ
          <span className="sr-only"> (נפתח בחלון חדש)</span>
        </a>
        <a href={CONTACT.phoneHref} className="flex items-center justify-center gap-2.5 rounded-[var(--radius-pill)] border border-ink px-5 py-3.5 font-semibold text-ink hover:bg-ink hover:text-paper">
          <IconPhone />
          <span>
            <span className="sr-only">להתקשר: </span>
            <span dir="ltr">{CONTACT.phoneDisplay}</span>
          </span>
        </a>
      </div>

      <div className="mb-5 flex items-center gap-3 text-sm font-semibold text-gray-mid">
        <span aria-hidden="true" className="h-px flex-1 bg-line" />
        או שתשאיר פרטים, ואחזור אליך
        <span aria-hidden="true" className="h-px flex-1 bg-line" />
      </div>

      <FormStatus
        status={status}
        success={
          <div className="rounded-[var(--radius-card)] bg-cream p-6 text-center">
            <p className="mb-2 font-display text-2xl font-semibold text-ink">תודה{firstName ? `, ${firstName}` : ""}.</p>
            <p className="text-[1.0625rem]">הפרטים התקבלו. אחזור אליך {mode} תוך יום עסקים אחד.</p>
          </div>
        }
      />
      <FormShell formId="booking" onSubmit={onSubmit} formRef={formRef} label="השארת פרטים לשיחת היכרות" className={status === "success" ? "hidden" : "grid gap-4"}>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field name="name" label="שם מלא" autoComplete="name" required error={errors.name} />
          <Field name="phone" label="טלפון" type="tel" inputMode="tel" autoComplete="tel" dir="ltr" required error={errors.phone} />
        </div>

        <fieldset>
          <legend className="field-label">
            שעה נוחה לשיחה <span className="font-normal text-gray-mid">(לא חובה)</span>
          </legend>
          <div className="mb-2 flex flex-wrap gap-2">
            {TIME_SLOTS.map((t) => (
              <label key={t} className="chip">
                <input type="radio" name="time_slot" value={t} className="sr-only" />
                {t}
              </label>
            ))}
          </div>
          <label htmlFor={`${titleId}-time-note`} className="sr-only">שעה נוחה במילים שלך</label>
          <input id={`${titleId}-time-note`} name="time_note" type="text" placeholder='או במילים שלך, למשל "יום שלישי אחרי 17:00"' className="field-input" />
        </fieldset>

        <fieldset>
          <legend className="field-label">
            איך נוח לך לדבר? <span className="font-normal text-gray-mid">(לא חובה)</span>
          </legend>
          <div className="flex flex-wrap gap-2">
            {MODES.map((m) => (
              <label key={m.v} className="chip">
                <input type="radio" name="call_type" value={m.v} className="sr-only" />
                {m.l}
              </label>
            ))}
          </div>
          <p className="mt-1.5 text-sm text-gray-mid">אם לא תבחר, אחזור אליך בשיחת טלפון.</p>
        </fieldset>

        <PrivacyNote />
        <SubmitButton status={status}>שליחה, ואחזור אליך</SubmitButton>
      </FormShell>
    </div>
  );
}
