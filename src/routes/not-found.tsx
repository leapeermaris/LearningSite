import { Link } from "react-router";
import type { Route } from "./+types/not-found";

export const meta: Route.MetaFunction = () => [
  { title: "העמוד לא נמצא | לאה מריס" },
  { name: "robots", content: "noindex" },
];

export function NotFoundContent() {
  return (
    <section className="container-site pt-36 pb-24 text-center nav:pt-44">
      <h1 className="h-section mb-4">העמוד הזה לא נמצא</h1>
      <p className="mb-8 text-lg">אולי הקישור השתנה, ואולי נפלה טעות בכתובת. אפשר להמשיך מכאן:</p>
      <ul className="flex flex-wrap justify-center gap-4">
        <li><Link to="/" className="btn btn-primary">לדף הבית</Link></li>
        <li><Link to="/organizations" className="btn btn-outline">לארגונים</Link></li>
        <li><Link to="/managers" className="btn btn-outline">למנהלים</Link></li>
        <li><Link to="/blog" className="btn btn-outline">למאמרים</Link></li>
      </ul>
    </section>
  );
}

export default function NotFound() {
  return <NotFoundContent />;
}
