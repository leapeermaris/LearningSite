// Single source for site-wide facts. Change SITE_URL once a custom domain is connected.
export const SITE_URL = (import.meta.env.VITE_SITE_URL || "https://lea-maris-learning.netlify.app").replace(/\/$/, "");

export const SHOW_PLACEHOLDERS = import.meta.env.DEV || import.meta.env.VITE_SHOW_PLACEHOLDERS === "true";

export const BRAND = "לאה מריס · ייעוץ ופיתוח ארגוני";
export const BRAND_SHORT = "לאה מריס";

export const CONTACT = {
  phoneDisplay: "050-570-0534",
  phoneHref: "tel:+972505700534",
  email: "Leapeermaris@gmail.com",
  whatsapp: "https://wa.me/972505700534",
  whatsappWithText:
    "https://wa.me/972505700534?text=" +
    encodeURIComponent("היי לאה, הגעתי מהאתר ואשמח לתאם שיחת היכרות"),
  instagram: "https://www.instagram.com/LeaMaris",
  instagramHandle: "LeaMaris",
};

export const PERSONAL_SITE_URL = "https://lea-maris-ai-consulting.lovable.app";

export const CTA = {
  label: "לתיאום שיחת היכרות",
  href: "/contact",
  reassurance: "30 דקות, בזום או בטלפון. ללא התחייבות.",
};

export const NAV = [
  { href: "/", label: "בית" },
  { href: "/organizations", label: "לארגונים" },
  { href: "/managers", label: "למנהלים" },
  { href: "/courses", label: "קורסים דיגיטליים" },
  { href: "/about", label: "אודות" },
  {
    href: "/blog",
    label: "תוכן ומאמרים",
    children: [
      { href: "/blog", label: "מאמרים" },
      { href: "/blog#resource", label: "משאב חינמי להורדה" },
    ],
  },
  { href: "/contact", label: "צרו קשר" },
] as const;

// Images: null until the real files are added to public/images (see TODO.md).
export const IMAGES = {
  hero: null as null | { src: string; width: number; height: number },
  about: null as null | { src: string; width: number; height: number },
};
