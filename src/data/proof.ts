/**
 * Social proof. Nothing here may be invented (see TODO.md).
 * Items with placeholder: true are framed in preview builds and hidden in production.
 * To publish: replace the text and set placeholder to false.
 */
export type Testimonial = { quote: string; name: string; role: string; org?: string; placeholder: boolean };
export type CaseStudy = { org: string; challenge: string; whatWeDid: string[]; result: string; placeholder: boolean };
export type Stat = { value: string; label: string; placeholder: boolean };

export const homeTestimonials: Testimonial[] = [
  { quote: "[המלצה 1: ציטוט של 2 עד 3 משפטים שמתאר שינוי מוחשי]", name: "[שם]", role: "[תפקיד]", org: "[ארגון]", placeholder: true },
  { quote: "[המלצה 2: ציטוט של 2 עד 3 משפטים שמתאר שינוי מוחשי]", name: "[שם]", role: "[תפקיד]", org: "[ארגון]", placeholder: true },
  { quote: "[המלצה 3: ממנהל פרטי]", name: "[שם]", role: "[תפקיד]", placeholder: true },
];

export const managerTestimonials: Testimonial[] = [
  { quote: "[המלצה ממנהל שעבר את התוכנית]", name: "[שם]", role: "[תפקיד]", org: "[ארגון]", placeholder: true },
  { quote: "[המלצה ממנהל שעבר את התוכנית]", name: "[שם]", role: "[תפקיד]", org: "[ארגון]", placeholder: true },
];

export const caseStudies: CaseStudy[] = [
  {
    org: "[ארגון: סוג, מגזר וגודל, בלי שם אם אין אישור]",
    challenge: "[מה היה המצב, ומה זה עלה לארגון]",
    whatWeDid: ["[צעד מרכזי 1]", "[צעד מרכזי 2]", "[צעד מרכזי 3]"],
    result: "[שינוי מדיד או התנהגותי, עם מספר רק אם הוא אמיתי]",
    placeholder: true,
  },
  {
    org: "[ארגון: סוג, מגזר וגודל]",
    challenge: "[מה היה המצב]",
    whatWeDid: ["[צעד מרכזי 1]", "[צעד מרכזי 2]"],
    result: "[התוצאה]",
    placeholder: true,
  },
];

export const trustStats: Stat[] = [
  { value: "[מספר]", label: "מנהלים שעברו תוכניות פיתוח שבניתי", placeholder: true },
  { value: "[מספר]", label: "תוכניות למידה שהובלתי", placeholder: true },
];

/** Client logos, only with their permission. { name, src } where src is an SVG/WebP in public/images/logos. */
export const clientLogos: { name: string; src: string }[] = [];
