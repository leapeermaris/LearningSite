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

// Portraits. srcSet widths are generated in public/images (WebP).
export type Img = { src: string; srcSet: string; width: number; height: number; alt: string };
export const IMAGES: Record<"hero" | "about", Img> = {
  hero: {
    src: "/images/lea-hero-800.webp",
    srcSet: "/images/lea-hero-480.webp 480w, /images/lea-hero-800.webp 800w",
    width: 800,
    height: 1088,
    alt: "לאה מריס, יועצת ללמידה ופיתוח ארגוני",
  },
  about: {
    src: "/images/lea-about-600.webp",
    srcSet: "/images/lea-about-400.webp 400w, /images/lea-about-600.webp 600w",
    width: 600,
    height: 564,
    alt: "לאה מריס",
  },
};

// AI agents Lea built for managers (links from the existing site). They open in Google Gemini.
export const AGENTS = [
  {
    name: "פוקוס",
    role: "לתעדוף ולניהול זמן",
    text: "עוזר לך לעשות סדר בעומס, לתעדף משימות ולבנות שבוע עבודה יעיל וממוקד.",
    href: "https://gemini.google.com/gem/1lHPzrYshpyhZUcicjJOHFbcIQRtPUZP6?usp=sharing",
  },
  {
    name: "ארי",
    role: "להחלטות ודילמות ניהוליות",
    text: "יועץ ניהולי לשאלות מורכבות ולהחלטות, עם דילמות ניהוליות ומענה זמין בכל שעה.",
    href: "https://gemini.google.com/gem/1hgACEdP2dpZqlqlvUcW5d6MwyXmH32oR?usp=sharing",
  },
  {
    name: "מצפן",
    role: "להכנה לשיחות מורכבות",
    text: "הכנה לשיחות מורכבות, שיחות משוב ושיחות רגישות עם עובדים, לפני שנכנסים לחדר.",
    href: "https://gemini.google.com/gem/1HteC4ExBFdKJK1HgJNj6BdeEfAVyUNVE?usp=sharing",
  },
] as const;
