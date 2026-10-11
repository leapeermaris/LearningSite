import { useEffect, useId, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router";
import clsx from "clsx";
import { CTA, NAV } from "~/lib/site";

type NavItem = (typeof NAV)[number];

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={clsx("size-2.5 transition-transform duration-300", open && "rotate-180")}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

const linkCls =
  "relative whitespace-nowrap py-1 text-text after:absolute after:bottom-0 after:start-0 after:h-px after:w-0 after:bg-gold after:transition-[width] after:duration-300 hover:after:w-full aria-[current=page]:after:w-full";

/** Disclosure dropdown (not role="menu"): button + aria-expanded, Escape and focus-out close it. */
function Dropdown({ item }: { item: Extract<NavItem, { children: unknown }> }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  const wrapRef = useRef<HTMLLIElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const { pathname } = useLocation();
  const active = pathname.startsWith(item.href);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <li
      ref={wrapRef}
      className="relative nav:py-0"
      onMouseEnter={() => window.matchMedia("(min-width: 74rem) and (hover: hover)").matches && setOpen(true)}
      onMouseLeave={() => window.matchMedia("(min-width: 74rem) and (hover: hover)").matches && setOpen(false)}
      onKeyDown={(e) => {
        if (e.key === "Escape" && open) {
          e.stopPropagation();
          setOpen(false);
          btnRef.current?.focus();
        }
      }}
      onBlur={(e) => {
        if (!wrapRef.current?.contains(e.relatedTarget as Node)) setOpen(false);
      }}
    >
      <button
        ref={btnRef}
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((v) => !v)}
        className={clsx(linkCls, "inline-flex w-full items-center gap-1.5 nav:w-auto", active && "after:w-full")}
      >
        {item.label}
        <Chevron open={open} />
      </button>
      <ul
        id={id}
        hidden={!open}
        className="mt-1 grid gap-0.5 ps-3.5 nav:absolute nav:start-0 nav:top-[calc(100%+14px)] nav:z-[1001] nav:mt-0 nav:min-w-[13rem] nav:rounded-xl nav:border nav:border-line nav:bg-paper nav:p-2.5 nav:shadow-[var(--shadow-soft)]"
      >
        {item.children.map((c) => (
          <li key={c.href}>
            <Link
              to={c.href}
              className="block rounded-lg px-0 py-1.5 text-[0.9375rem] hover:bg-cream hover:text-ink nav:px-3.5 nav:py-2.5"
              onClick={() => setOpen(false)}
            >
              {c.label}
            </Link>
          </li>
        ))}
      </ul>
    </li>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const menuBtn = useRef<HTMLButtonElement>(null);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        menuBtn.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-[1000] border-b border-line bg-paper/[0.97]">
      <div className="mx-auto flex max-w-[73.75rem] items-center justify-between gap-6 px-4.5 py-3 sm:px-5 nav:px-8 nav:py-3.5">
        <Link to="/" className="font-display text-[1.625rem] leading-none font-bold tracking-[0.5px] whitespace-nowrap text-ink sm:text-[1.75rem] nav:text-[1.875rem]">
          לאה מריס
          <span className="sr-only">, דף הבית</span>
        </Link>

        <nav aria-label="ניווט ראשי" className="min-w-0">
          <button
            ref={menuBtn}
            type="button"
            className="flex flex-col gap-[5px] p-2 nav:hidden"
            aria-expanded={open}
            aria-controls="primary-navigation"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">{open ? "סגירת תפריט" : "פתיחת תפריט"}</span>
            <span aria-hidden="true" className={clsx("block h-0.5 w-6 bg-ink transition-transform", open && "translate-y-[7px] rotate-45")} />
            <span aria-hidden="true" className={clsx("block h-0.5 w-6 bg-ink transition-opacity", open && "opacity-0")} />
            <span aria-hidden="true" className={clsx("block h-0.5 w-6 bg-ink transition-transform", open && "-translate-y-[7px] -rotate-45")} />
          </button>

          <ul
            id="primary-navigation"
            className={clsx(
              "fixed inset-x-0 top-[61px] bottom-0 flex-col gap-1 overflow-y-auto border-t border-line bg-paper px-6 py-5 text-base",
              "nav:static nav:flex nav:flex-row nav:items-center nav:gap-5 nav:overflow-visible nav:border-0 nav:bg-transparent nav:p-0 nav:text-sm",
              open ? "flex" : "hidden",
            )}
          >
            {NAV.map((item) =>
              "children" in item ? (
                <Dropdown key={item.href} item={item} />
              ) : (
                <li key={item.href} className={clsx(item.href === "/contact" && "nav:hidden xl:block")}>
                  <NavLink to={item.href} end={item.href === "/"} className={clsx(linkCls, "inline-block py-2.5 nav:inline nav:py-1")}>
                    {item.label}
                  </NavLink>
                </li>
              ),
            )}
            <li className="mt-3 nav:mt-0">
              <Link to={CTA.href} className="btn btn-primary w-full !px-5.5 !py-2.5 text-[0.8125rem] nav:w-auto">
                {CTA.label}
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
