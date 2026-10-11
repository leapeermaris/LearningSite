import { useState } from "react";
import { validators } from "~/lib/forms/submit";
import { CONSENT_REQUIRED_ERROR, Consent, Field, FormShell, FormStatus, PrivacyNote, SubmitButton, useLeadForm } from "./FormParts";

export function WaitlistForm({ title = "הצטרף לרשימת ההמתנה", intro }: { title?: string; intro?: string }) {
  const [firstName, setFirstName] = useState("");
  const { status, errors, onSubmit, formRef } = useLeadForm("waitlist", (v) => {
    const e: Record<string, string> = {};
    const n = validators.name(String(v.name ?? ""));
    if (n) e.name = n;
    const m = validators.email(String(v.email ?? ""));
    if (m) e.email = m;
    if (!v.consent) e.consent = CONSENT_REQUIRED_ERROR;
    setFirstName(String(v.name ?? "").trim().split(/\s+/)[0] ?? "");
    return e;
  });
  return (
    <div className="card p-6 sm:p-8">
      <h2 className="mb-2 text-2xl">{title}</h2>
      {intro && <p className="mb-5 text-[0.9375rem] text-muted">{intro}</p>}
      <FormStatus
        status={status}
        success={<p className="text-lg">תודה{firstName ? `, ${firstName}` : ""}. אתה ברשימה. אעדכן אותך ברגע שהקורס הראשון נפתח.</p>}
      />
      <FormShell formId="waitlist" onSubmit={onSubmit} formRef={formRef} label="הרשמה לרשימת ההמתנה לקורסים" className={status === "success" ? "hidden" : "grid gap-5"}>
        <Field name="name" label="שם מלא" autoComplete="name" required error={errors.name} />
        <Field name="email" label="כתובת מייל" type="email" inputMode="email" autoComplete="email" dir="ltr" required error={errors.email} />
        <Field name="topic" label="על איזה נושא הכי היית רוצה קורס?" textarea />
        <Consent
          name="consent"
          required
          error={errors.consent}
          label="אני מאשר לקבל מאת לאה מריס עדכון כשהקורס נפתח, ותוכן מקצועי במייל. אפשר להסיר בכל עת."
        />
        <PrivacyNote />
        <SubmitButton status={status}>להצטרפות לרשימת ההמתנה</SubmitButton>
      </FormShell>
    </div>
  );
}
