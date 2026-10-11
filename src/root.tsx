import { useEffect } from "react";
import { isRouteErrorResponse, Links, Meta, Outlet, Scripts, ScrollRestoration, useLocation } from "react-router";
import type { Route } from "./+types/root";
import "./fonts.css";
import heeboHebrew400 from "@fontsource/heebo/files/heebo-hebrew-400-normal.woff2?url";
import frankHebrew600 from "@fontsource/frank-ruhl-libre/files/frank-ruhl-libre-hebrew-600-normal.woff2?url";
import "./app.css";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { WhatsAppFab } from "./components/WhatsAppFab";
import { AccessibilityWidget } from "./components/AccessibilityWidget";

export const links: Route.LinksFunction = () => [
  { rel: "preload", href: heeboHebrew400, as: "font", type: "font/woff2", crossOrigin: "anonymous" },
  { rel: "preload", href: frankHebrew600, as: "font", type: "font/woff2", crossOrigin: "anonymous" },
  { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
  { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="he" dir="rtl">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0E1A30" />
        {/* Enables the scroll-reveal animation only when JS runs; without JS everything stays visible */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <Meta />
        <Links />
      </head>
      <body>
        <a href="#main-content" className="skip-to-content">דלג לתוכן המרכזי</a>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

function useReveal() {
  const { pathname } = useLocation();
  useEffect(() => {
    const els = document.querySelectorAll(".reveal:not(.visible)");
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("visible"));
      return;
    }
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            obs.unobserve(e.target);
          }
        }),
      { threshold: 0.12 },
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [pathname]);
}

function Shell({ children }: { children: React.ReactNode }) {
  useReveal();
  return (
    <>
      <Header />
      <main id="main-content" tabIndex={-1} className="outline-none">
        {children}
      </main>
      <Footer />
      <aside aria-label="פעולות מהירות">
        <WhatsAppFab />
        <AccessibilityWidget />
      </aside>
    </>
  );
}

export default function App() {
  return (
    <Shell>
      <Outlet />
    </Shell>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  const notFound = isRouteErrorResponse(error) && error.status === 404;
  return (
    <Shell>
      <section className="container-site pt-36 pb-24 text-center">
        <h1 className="mb-4 text-4xl">{notFound ? "העמוד הזה לא נמצא" : "משהו השתבש"}</h1>
        <p className="mb-8">אפשר לחזור לדף הבית ולהמשיך משם.</p>
        <a href="/" className="btn btn-primary">לדף הבית</a>
      </section>
    </Shell>
  );
}
