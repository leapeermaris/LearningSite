import { cloneElement, type ReactElement, type ReactNode } from "react";
import { Link } from "react-router";
import * as Accordion from "@radix-ui/react-accordion";
import clsx from "clsx";
import { CONTACT, CTA, IMAGES, SHOW_PLACEHOLDERS } from "~/lib/site";

export function SectionHead({ eyebrow, title, sub, as: H = "h2", className, id, align = "start" }: { eyebrow?: string; title: ReactNode; sub?: ReactNode; as?: "h1" | "h2"; className?: string; id?: string; align?: "start" | "center" }) {
  return (
    <div className={clsx("reveal mb-10 max-w-[47.5rem] nav:mb-14", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <H id={id} className="h-section text-balance">{title}</H>
      {sub && <p className="mt-4 max-w-[42rem] text-lg leading-relaxed">{sub}</p>}
    </div>
  );
}

/** Two-column section: heading column on the start side, content on the other. Stacks on mobile. */
export function SplitSection({ eyebrow, title, sub, id, children, className, aside }: { eyebrow?: string; title: ReactNode; sub?: ReactNode; id: string; children: ReactNode; className?: string; aside?: ReactNode }) {
  return (
    <section aria-labelledby={id} className={clsx("section", className)}>
      <div className="container-site grid gap-10 nav:grid-cols-[0.8fr_1.2fr] nav:gap-20">
        <div className="reveal nav:sticky nav:top-28 nav:self-start">
          {eyebrow && <span className="eyebrow">{eyebrow}</span>}
          <h2 id={id} className="h-section text-balance">{title}</h2>
          {sub && <p className="mt-5 text-lg leading-relaxed">{sub}</p>}
          {aside}
        </div>
        <div className="min-w-0">{children}</div>
      </div>
    </section>
  );
}

export function PageHero({ eyebrow, title, lead, children, aside }: { eyebrow: string; title: ReactNode; lead?: ReactNode; children?: ReactNode; aside?: ReactNode }) {
  return (
    <section className="bg-[linear-gradient(180deg,rgba(250,248,244,0.55),rgba(250,248,244,0.9)),linear-gradient(120deg,var(--color-cream)_0%,var(--color-beige)_55%,var(--color-gray-light)_100%)] pt-28 pb-16 nav:pt-40 nav:pb-24">
      <div className={clsx("container-site", aside && "grid items-center gap-12 nav:grid-cols-[1.15fr_0.85fr] nav:gap-[4.375rem]")}>
        <div>
          <span className="eyebrow">{eyebrow}</span>
          <h1 className="mb-6 text-[1.875rem] leading-[1.15] tracking-[-0.5px] sm:text-[2.125rem] nav:text-[3.75rem]">{title}</h1>
          {lead && <p className="mb-8 max-w-[35rem] text-lg leading-relaxed font-medium text-ink sm:text-xl nav:text-[1.375rem]">{lead}</p>}
          {children}
        </div>
        {aside}
      </div>
    </section>
  );
}

export function CtaButton({ label = CTA.label, className }: { label?: string; className?: string }) {
  return <Link to={CTA.href} className={clsx("btn btn-primary", className)}>{label}</Link>;
}

export function Reassurance({ children = CTA.reassurance, className }: { children?: ReactNode; className?: string }) {
  return <p className={clsx("mt-4 text-base font-medium", className)}>{children}</p>;
}

export function CtaBand({ title, text, label, secondary = true }: { title: string; text: string; label?: string; secondary?: boolean }) {
  return (
    <section aria-labelledby="cta-band-title" className="bg-[linear-gradient(120deg,var(--color-beige),var(--color-cream))] py-20 text-center nav:py-25">
      <div className="container-site reveal">
        <h2 id="cta-band-title" className="h-section mx-auto mb-5 max-w-[47.5rem]">{title}</h2>
        <p className="mx-auto mb-8 max-w-[40rem] text-lg">{text}</p>
        <CtaButton label={label} />
        {secondary && (
          <p className="mt-5 text-base">
            או{" "}
            <a href={CONTACT.whatsappWithText} target="_blank" rel="noopener noreferrer" className="link-arrow">
              כתוב לי בוואטסאפ ←<span className="sr-only"> (נפתח בחלון חדש)</span>
            </a>
          </p>
        )}
      </div>
    </section>
  );
}

export type FaqItem = { q: string; a: string };

/** Radix accordion styled like the existing site. Answers stay in the HTML when closed. */
export function Faq({ items }: { items: FaqItem[] }) {
  return (
    <Accordion.Root type="single" collapsible className="flex max-w-[51.25rem] flex-col gap-3.5">
      {items.map((it, i) => (
        <Accordion.Item key={i} value={`q${i}`} className="card group overflow-hidden hover:border-gold">
          <Accordion.Header asChild>
            <h3 className="font-sans">
              <Accordion.Trigger className="flex w-full items-center justify-between gap-4 px-5 py-5 text-start text-[1.0625rem] font-semibold text-ink sm:px-6.5 sm:text-lg">
                <span>{it.q}</span>
                <span
                  aria-hidden="true"
                  className="flex size-8.5 shrink-0 items-center justify-center rounded-full border border-line bg-paper text-ink transition-transform duration-300 group-data-[state=open]:rotate-180 group-data-[state=open]:border-ink group-data-[state=open]:bg-ink group-data-[state=open]:text-gold-light"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
                </span>
              </Accordion.Trigger>
            </h3>
          </Accordion.Header>
          <Accordion.Content forceMount className="acc-content data-[state=closed]:hidden">
            <p className="px-5 pb-5.5 text-base leading-relaxed sm:px-6.5 sm:text-[1.03rem]">{it.a}</p>
          </Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
}

export function Timeline({ steps }: { steps: { title: string; text: string }[] }) {
  return (
    <ol className="relative max-w-[47.5rem] before:absolute before:inset-y-0 before:start-[29px] before:w-px before:bg-gray-light">
      {steps.map((s, i) => (
        <li key={s.title} className="reveal relative mb-10 flex gap-6 last:mb-0 nav:mb-12">
          <span aria-hidden="true" className="z-10 flex size-15 shrink-0 items-center justify-center rounded-full border-[1.5px] border-gold bg-paper font-display text-[1.625rem] font-bold text-ink">
            {i + 1}
          </span>
          <div>
            <h3 className="mb-2 text-[1.375rem] nav:text-2xl">
              <span className="sr-only">שלב {i + 1}: </span>
              {s.title}
            </h3>
            <p className="text-[1.0625rem] leading-relaxed">{s.text}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

/** Wraps placeholder-only content: framed in preview builds, removed from production builds. */
export function PlaceholderGate({ isPlaceholder, children }: { isPlaceholder: boolean; children: ReactElement<{ className?: string }> }) {
  if (!isPlaceholder) return children;
  if (!SHOW_PLACEHOLDERS) return null;
  return cloneElement(children, { className: clsx(children.props.className, "placeholder-frame") });
}

export function Portrait({ which, className, sizes = "(min-width: 74rem) 16rem, 70vw", natural, priority }: { which: "hero" | "about"; className?: string; sizes?: string; natural?: boolean; priority?: boolean }) {
  const img = IMAGES[which];
  const eager = priority ?? which === "hero";
  return (
    <div
      className={clsx(
        "relative mx-auto w-full overflow-hidden rounded-[var(--radius-card)] bg-[linear-gradient(150deg,var(--color-beige),var(--color-gray-light))] shadow-[var(--shadow-strong)]",
        !natural && "aspect-[4/5]",
        className,
      )}
    >
      <img
        src={img.src}
        srcSet={img.srcSet}
        sizes={sizes}
        width={img.width}
        height={img.height}
        alt={img.alt}
        loading={eager ? "eager" : "lazy"}
        fetchPriority={which === "hero" && !natural ? "auto" : undefined}
        decoding="async"
        className={clsx("w-full object-cover", natural ? "h-auto" : "h-full object-top")}
      />
    </div>
  );
}

export function FramedPortrait({ which, className }: { which: "hero" | "about"; className?: string }) {
  const natural = which === "about";
  return (
    <div className={clsx("relative mx-auto w-full", natural ? "max-w-[26rem]" : "max-w-[17rem] nav:max-w-[21rem]", className)}>
      <div aria-hidden="true" className="absolute inset-0 -translate-x-4 translate-y-4 rounded-[var(--radius-card)] border border-gold" />
      <Portrait which={which} natural={natural} priority sizes={natural ? "(min-width: 74rem) 26rem, 90vw" : "(min-width: 74rem) 21rem, 17rem"} className="relative" />
    </div>
  );
}

export function CheckList({ items, tone = "light" }: { items: ReactNode[]; tone?: "light" | "dark" }) {
  return (
    <ul className="grid gap-3">
      {items.map((t, i) => (
        <li key={i} className="flex items-start gap-3 leading-relaxed">
          <span aria-hidden="true" className={clsx("mt-1.5 flex size-5 shrink-0 items-center justify-center rounded-full", tone === "dark" ? "bg-gold-light/15 text-gold-light" : "bg-ink text-gold-light")}>
            <svg viewBox="0 0 24 24" className="size-3" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
          </span>
          <span>{t}</span>
        </li>
      ))}
    </ul>
  );
}
