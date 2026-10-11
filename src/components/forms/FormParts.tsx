import { useId, useRef, useState, type FormEvent, type ReactNode } from "react";
import { Link } from "react-router";
import clsx from "clsx";
import { submitForm, type FormValues } from "~/lib/forms/submit";
import type { FormId } from "~/lib/forms/config";

export type Status = "idle" | "sending" | "success" | "error";

/** Shared state for every form: validation, submit, focus on first error, live status. */
export function useLeadForm(formId: FormId, validate: (v: FormValues) => Record<string, string>) {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const formRef = useRef<HTMLFormElement>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    if (data.get("bot-field")) return;
    const values: FormValues = {};
    for (const el of Array.from(form.elements) as HTMLInputElement[]) {
      if (!el.name || el.name === "bot-field" || el.name === "form-name" || el.disabled) continue;
      if (el.type === "checkbox") values[el.name] = el.checked;
      else if (el.type === "radio") { if (el.checked) values[el.name] = el.value; else if (!(el.name in values)) values[el.name] = ""; }
      else values[el.name] = el.value;
    }
    const errs = validate(values);
    setErrors(errs);
    const first = Object.keys(errs)[0];
    if (first) {
      (form.querySelector(`[name="${first}"]`) as HTMLElement | null)?.focus();
      return;
    }
    setStatus("sending");
    try {
      await submitForm(formId, values);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return { status, errors, onSubmit, formRef };
}

type FormShellProps = {
  formId: FormId;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  formRef: React.RefObject<HTMLFormElement | null>;
  children: ReactNode;
  className?: string;
  label: string;
};

/** <form> wired for Netlify Forms detection in the pre-rendered HTML, with a honeypot. */
export function FormShell({ formId, onSubmit, formRef, children, className, label }: FormShellProps) {
  return (
    <form
      ref={formRef}
      name={formId}
      method="POST"
      data-netlify="true"
      netlify-honeypot="bot-field"
      onSubmit={onSubmit}
      noValidate
      aria-label={label}
      className={className}
    >
      <input type="hidden" name="form-name" value={formId} />
      <p hidden>
        <label>
          לא למילוי: <input name="bot-field" tabIndex={-1} autoComplete="off" />
        </label>
      </p>
      {children}
    </form>
  );
}

type FieldProps = {
  name: string;
  label: string;
  error?: string;
  type?: string;
  autoComplete?: string;
  required?: boolean;
  textarea?: boolean;
  placeholder?: string;
  inputMode?: "text" | "tel" | "email";
  dir?: "ltr" | "rtl" | "auto";
  hint?: string;
};

export function Field({ name, label, error, type = "text", autoComplete, required, textarea, placeholder, inputMode, dir, hint }: FieldProps) {
  const id = useId();
  const errId = `${id}-err`;
  const hintId = `${id}-hint`;
  const describedBy = [hint ? hintId : "", error ? errId : ""].filter(Boolean).join(" ") || undefined;
  const common = {
    id,
    name,
    required,
    "aria-required": required || undefined,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": describedBy,
    autoComplete,
    placeholder,
    className: "field-input",
  } as const;
  return (
    <div>
      <label htmlFor={id} className="field-label">
        {label}
        {required ? <span aria-hidden="true"> *</span> : <span className="font-normal text-gray-mid"> (לא חובה)</span>}
      </label>
      {hint && <p id={hintId} className="mb-1.5 text-sm text-gray-mid">{hint}</p>}
      {textarea ? <textarea {...common} rows={4} /> : <input {...common} type={type} inputMode={inputMode} dir={dir} />}
      {error && <p id={errId} className="field-error">{error}</p>}
    </div>
  );
}

export function Consent({ name, label, required, error }: { name: string; label: ReactNode; required?: boolean; error?: string }) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id} className="flex items-start gap-2.5 text-sm leading-relaxed">
        <input
          id={id}
          name={name}
          type="checkbox"
          required={required}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-err` : undefined}
          className="mt-1 size-[18px] shrink-0 accent-ink"
        />
        <span>{label}</span>
      </label>
      {error && <p id={`${id}-err`} className="field-error">{error}</p>}
    </div>
  );
}

export function PrivacyNote({ className }: { className?: string }) {
  return (
    <p className={clsx("text-sm leading-relaxed text-gray-mid", className)}>
      הפרטים ישמשו רק למטרה שלשמה השארת אותם. אינך חייב למסור אותם, אבל בלעדיהם לא אוכל לחזור אליך. פרטים נוספים ב
      <Link to="/privacy" className="link-inline">מדיניות הפרטיות</Link>.
    </p>
  );
}

export function SubmitButton({ status, children, className }: { status: Status; children: ReactNode; className?: string }) {
  return (
    <button type="submit" className={clsx("btn btn-primary w-full disabled:opacity-60", className)} disabled={status === "sending"} aria-disabled={status === "sending"}>
      {status === "sending" ? "שולח..." : children}
    </button>
  );
}

/** Polite live region: announces success or failure to screen readers. */
export function FormStatus({ status, success, className }: { status: Status; success: ReactNode; className?: string }) {
  return (
    <div role="status" aria-live="polite" className={className}>
      {status === "success" && success}
      {status === "error" && (
        <p className="rounded-lg border border-error/40 bg-paper p-3 text-sm text-error">
          משהו השתבש בשליחה, והפרטים לא נשלחו. אפשר לנסות שוב, או לפנות אליי ישירות בוואטסאפ או בטלפון 050-570-0534.
        </p>
      )}
    </div>
  );
}

export const CONSENT_REQUIRED_ERROR = "כדי להירשם צריך לאשר קבלת מיילים";
