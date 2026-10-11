import { validators } from "~/lib/forms/submit";
import { CONSENT_REQUIRED_ERROR, Consent, FormShell, FormStatus, SubmitButton, useLeadForm } from "./FormParts";
import { Link } from "react-router";

/** Footer newsletter form, on a dark background. */
export function NewsletterForm() {
  const { status, errors, onSubmit, formRef } = useLeadForm("newsletter", (v) => {
    const e: Record<string, string> = {};
    const m = validators.email(String(v.email ?? ""));
    if (m) e.email = m;
    if (!v.consent) e.consent = CONSENT_REQUIRED_ERROR;
    return e;
  });
  return (
    <div>
      <FormStatus status={status} success={<p className="text-gold-light">נרשמת. המייל הראשון יגיע אליך בקרוב.</p>} />
      <FormShell formId="newsletter" onSubmit={onSubmit} formRef={formRef} label="הרשמה לניוזלטר" className={status === "success" ? "hidden" : "grid gap-3"}>
        <div>
          <label htmlFor="nl-email" className="sr-only">כתובת מייל</label>
          <input
            id="nl-email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            dir="ltr"
            placeholder="כתובת מייל"
            required
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={errors.email ? "nl-email-err" : undefined}
            className="field-input border-paper/40 bg-ink-2 text-paper placeholder:text-paper/70"
          />
          {errors.email && <p id="nl-email-err" className="field-error">{errors.email}</p>}
        </div>
        <Consent
          name="consent"
          required
          error={errors.consent}
          label={
            <span className="text-paper/85">
              אני מאשר לקבל מיילים עם תוכן מקצועי ועדכונים מאת לאה מריס. אפשר להסיר בכל עת.{" "}
              <Link to="/privacy" className="underline underline-offset-2">מדיניות פרטיות</Link>
            </span>
          }
        />
        <SubmitButton status={status} className="btn-light">הרשמה</SubmitButton>
      </FormShell>
    </div>
  );
}
