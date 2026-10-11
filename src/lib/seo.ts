import type { MetaDescriptor } from "react-router";
import { BRAND, BRAND_SHORT, CONTACT, PERSONAL_SITE_URL, SITE_URL } from "./site";

type MetaInput = {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
  image?: string;
  jsonLd?: Record<string, unknown>[];
  noindex?: boolean;
};

export const absoluteUrl = (path: string) => `${SITE_URL}${path === "/" ? "/" : path}`;

export const personLd = {
  "@type": "Person",
  "@id": `${SITE_URL}/#person`,
  name: BRAND_SHORT,
  jobTitle: "יועצת ללמידה ופיתוח ארגוני",
  url: absoluteUrl("/about"),
  knowsAbout: ["למידה ארגונית", "פיתוח מנהלים", "קליטה לתפקיד", "Skills-first", "Fractional L&D"],
  sameAs: [CONTACT.instagram, PERSONAL_SITE_URL],
};

export const businessLd = {
  "@type": "ProfessionalService",
  "@id": `${SITE_URL}/#business`,
  name: BRAND,
  description:
    "בניית מערכי למידה, תוכניות פיתוח מנהלים וניהול תחום הלמידה במיקור חוץ לארגונים בינוניים, ותוכניות פיתוח למנהלים.",
  url: absoluteUrl("/"),
  telephone: "+972-50-570-0534",
  email: CONTACT.email,
  areaServed: { "@type": "Country", name: "Israel" },
  inLanguage: "he",
  founder: { "@id": `${SITE_URL}/#person` },
  sameAs: [CONTACT.instagram, PERSONAL_SITE_URL],
};

export const faqLd = (items: { q: string; a: string }[]) => ({
  "@type": "FAQPage",
  mainEntity: items.map((i) => ({
    "@type": "Question",
    name: i.q,
    acceptedAnswer: { "@type": "Answer", text: i.a },
  })),
});

export const breadcrumbLd = (trail: { name: string; path: string }[]) => ({
  "@type": "BreadcrumbList",
  itemListElement: [{ name: "בית", path: "/" }, ...trail].map((t, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: t.name,
    item: absoluteUrl(t.path),
  })),
});

export function buildMeta({ title, description, path, type = "website", image, jsonLd = [], noindex }: MetaInput): MetaDescriptor[] {
  const url = absoluteUrl(path);
  const img = absoluteUrl(image ?? "/og/default.png");
  const meta: MetaDescriptor[] = [
    { title },
    { name: "description", content: description },
    { tagName: "link", rel: "canonical", href: url },
    { property: "og:type", content: type },
    { property: "og:locale", content: "he_IL" },
    { property: "og:site_name", content: BRAND },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:url", content: url },
    { property: "og:image", content: img },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
    { name: "twitter:card", content: "summary_large_image" },
  ];
  if (noindex) meta.push({ name: "robots", content: "noindex" });
  meta.push({
    "script:ld+json": { "@context": "https://schema.org", "@graph": [businessLd, personLd, ...jsonLd] },
  });
  return meta;
}
