import { useState } from "react";
import { validators } from "~/lib/forms/submit";
import { Consent, Field, FormShell, FormStatus, PrivacyNote, SubmitButton, useLeadForm } from "./FormParts";

export function ContactForm() {
  const [asOrg, setAsOrg] = useState<"" | "org" | "private">("");
  const [firstName, setFirstName] = useState("");
  const { status, errors, onSubmit, formRef } = useLeadForm("contact", (v) => {
    const e: Record<string, string> = {};
    const n = validators.name(String(v.name ?? ""));
    if (n) e.name = n;
    const p = validators.phone(String(v.phone ?? ""));
    if (p) e.phone = p;
    const m = validators.email(String(v.email ?? ""));
    if (m) e.email = m;
    if (!v.requester) e.requester = "יש לבחור אם הפנייה בשם ארגון או באופן פרטי";
    setFirstName(String(v.name ?? "").trim().split(/\s+/)[0] ?? "");
    return e;
  });

  return (
    <div className="card p-6 sm:p-8">
      <FormStatus
        status={status}
        success={
          <div className="py-6 text-center">
            <h2 className="mb-3 text-2xl">תודה{firstName ? `, ${firstName}` : ""}. הפרטים התקבלו.</h2>
            <p>אחזור אליך תוך יום עסקים אחד. אם זה דחוף, אפשר גם בוואטסאפ.</p>
          </div>
        }
      />
      <FormShell formId="contact" onSubmit={onSubmit} formRef={formRef} label="טופס יצירת קשר" className={status === "success" ? "hidden" : "grid gap-5"}>
        <Field name="name" label="שם מלא" autoComplete="name" required error={errors.name} />
        <div className="grid gap-5 sm:grid-cols-2">
          <Field name="phone" label="טלפון" type="tel" inputMode="tel" autoComplete="tel" dir="ltr" required error={errors.phone} />
          <Field name="email" label="מייל" type="email" inputMode="email" autoComplete="email" dir="ltr" required error={errors.email} />
        </div>
        <fieldset aria-describedby={errors.requester ? "requester-err" : undefined}>
          <legend className="field-label">
            אני פונה<span aria-hidden="true"> *</span>
          </legend>
          <div className="flex flex-wrap gap-3">
            {[
              { v: "org", l: "בשם ארגון" },
              { v: "private", l: "באופן פרטי, כמנהל" },
            ].map((o) => (
              <label key={o.v} className="flex flex-1 basis-40 cursor-pointer items-center gap-2 rounded-lg border border-[#8f8676] bg-paper px-4 py-3 text-[0.9375rem] has-[:checked]:border-ink has-[:checked]:bg-cream">
                <input
                  type="radio"
                  name="requester"
                  value={o.v}
                  required
                  className="size-4 accent-ink"
                  onChange={() => setAsOrg(o.v as "org" | "private")}
                />
                {o.l}
              </label>
            ))}
          </div>
          {errors.requester && <p id="requester-err" className="field-error">{errors.requester}</p>}
        </fieldset>
        {/* Always in the DOM so Netlify registers the field at deploy time */}
        <div hidden={asOrg !== "org"}>
          <Field name="organization" label="שם הארגון" autoComplete="organization" />
        </div>
        <Field name="message" label="במה אפשר לעזור?" textarea placeholder="כמה משפטים על המצב היום ועל מה שהיית רוצה שישתנה" />
        <Consent name="marketing" label="אשמח לקבל גם תוכן מקצועי ועדכונים במייל. אפשר להסיר בכל עת." />
        <PrivacyNote />
        <SubmitButton status={status}>שליחה</SubmitButton>
      </FormShell>
    </div>
  );
}
