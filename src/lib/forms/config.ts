/**
 * Where each form goes. This is the only file to touch when connecting a provider.
 *
 * provider "netlify":  Netlify Forms (free, submissions arrive by email from the Netlify dashboard).
 * provider "formspree": set `endpoint` to https://formspree.io/f/XXXX
 * provider "webhook":   POST JSON to any URL, e.g. a Netlify Function that forwards to
 *                       smoove / ActiveTrail / רב מסר with an API key kept server side.
 *
 * Mailing platform not chosen yet (TODO.md), so every form uses Netlify Forms for now.
 */
export type FormId = "contact" | "newsletter" | "waitlist" | "resource";

export type FormTarget =
  | { provider: "netlify" }
  | { provider: "formspree"; endpoint: string }
  | { provider: "webhook"; endpoint: string };

export const formsConfig: Record<FormId, FormTarget> = {
  contact: { provider: "netlify" },
  newsletter: { provider: "netlify" },
  waitlist: { provider: "netlify" },
  resource: { provider: "netlify" },
};

/** File delivered after the resource form succeeds. Lives in public/. */
export const RESOURCE_FILE = "/downloads/before-you-book-training.pdf";
