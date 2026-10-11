/**
 * Digital courses. Add a course here and the /courses page switches from the
 * "coming soon" waitlist to a catalog automatically, and /courses/<slug> is generated.
 */
export type Course = {
  slug: string; // English, URL safe: "first-time-manager"
  title: string;
  outcome: string; // one sentence: what the learner can do after the course
  audience: "managers" | "learning-pros" | "all";
  status: "open" | "soon";
  duration: string; // "2 שעות, 8 שיעורים"
  format: string; // "וידאו + תבניות להורדה"
  price?: string; // "390 ש״ח"
  image?: string; // "/images/courses/first-time-manager.webp" (1200x750 WebP)
  imageAlt?: string;
  enrollUrl?: string; // checkout / course platform URL
  forWho: string[];
  youWillBeAbleTo: string[];
  modules: { title: string; lessons: string[] }[];
  faq: { q: string; a: string }[];
  metaDescription: string;
};

export const courses: Course[] = [];

export const audienceLabel: Record<Course["audience"], string> = {
  managers: "למנהלים",
  "learning-pros": "לאנשי למידה ומשאבי אנוש",
  all: "למנהלים ולאנשי למידה",
};
