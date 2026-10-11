import { validators } from "~/lib/forms/submit";
import { RESOURCE_FILE } from "~/lib/forms/config";
import { CONSENT_REQUIRED_ERROR, Consent, Field, FormShell, FormStatus, PrivacyNote, SubmitButton, useLeadForm } from "./FormParts";

export function ResourceForm() {
  const { status, errors, onSubmit, formRef } = useLeadForm("resource", (v) => {
    const e: Record<string, string> = {};
    const n = validators.name(String(v.name ?? ""));
    if (n) e.name = n;
    const m = validators.email(String(v.email ?? ""));
    if (m) e.email = m;
    if (!v.consent) e.consent = CONSENT_REQUIRED_ERROR;
    return e;
  });
  return (
    <div>
      <FormStatus
        status={status}
        success={
          <div className="grid gap-3">
            <p className="text-lg font-semibold text-ink">המשאב מוכן בשבילך.</p>
            <a href={RESOURCE_FILE} download className="btn btn-primary w-fit">
              להורדת הקובץ (PDF)
            </a>
          </div>
        }
      />
      <FormShell formId="resource" onSubmit={onSubmit} formRef={formRef} label="קבלת המשאב החינמי" className={status === "success" ? "hidden" : "grid gap-4"}>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field name="name" label="שם" autoComplete="name" required error={errors.name} />
          <Field name="email" label="מייל" type="email" inputMode="email" autoComplete="email" dir="ltr" required error={errors.email} />
        </div>
        <Consent
          name="consent"
          required
          error={errors.consent}
          label="אני מאשר לקבל את המשאב ותוכן מקצועי במייל מאת לאה מריס. אפשר להסיר בכל עת."
        />
        <PrivacyNote />
        <SubmitButton status={status}>שלחו לי את המשאב</SubmitButton>
      </FormShell>
    </div>
  );
}
