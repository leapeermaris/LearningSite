import type { ReactNode } from "react";

export const LEGAL_UPDATED = "אוקטובר 2026";

export function LegalPage({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="container-site max-w-[53.75rem] pt-28 pb-24 nav:pt-40">
      <h1 className="mb-2 text-[2rem] nav:text-[2.625rem]">{title}</h1>
      <p className="mb-10 text-[0.9375rem] text-gray-mid">עודכן לאחרונה: {LEGAL_UPDATED}</p>
      <div className="prose-lm">{children}</div>
    </div>
  );
}
