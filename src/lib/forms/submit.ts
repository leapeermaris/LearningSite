import { formsConfig, type FormId } from "./config";

export type FormValues = Record<string, string | boolean>;

const encode = (data: Record<string, string>) =>
  Object.entries(data)
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
    .join("&");

/** The single submit handler used by every form on the site. */
export async function submitForm(formId: FormId, values: FormValues): Promise<void> {
  const target = formsConfig[formId];
  const flat: Record<string, string> = {};
  for (const [k, v] of Object.entries(values)) flat[k] = typeof v === "boolean" ? (v ? "כן" : "לא") : v;
  const payload = { ...flat, "form-name": formId, page: window.location.pathname };

  let res: Response;
  if (target.provider === "netlify") {
    res = await fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode(payload),
    });
  } else {
    res = await fetch(target.endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(payload),
    });
  }
  if (!res.ok) throw new Error(`Form ${formId} failed: ${res.status}`);
}

export const validators = {
  name: (v: string) => (v.trim().length >= 2 ? "" : "יש להזין שם מלא"),
  email: (v: string) => (/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) ? "" : "יש להזין כתובת מייל תקינה"),
  phone: (v: string) =>
    /^(\+972|0)([23489]|5\d|7\d)\d{7}$/.test(v.replace(/[\s-]/g, "")) ? "" : "יש להזין מספר טלפון תקין",
};
