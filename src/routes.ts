import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("organizations", "routes/organizations.tsx"),
  route("managers", "routes/managers.tsx"),
  route("courses", "routes/courses.tsx"),
  route("courses/:slug", "routes/course.tsx"),
  route("about", "routes/about.tsx"),
  route("blog", "routes/blog.tsx"),
  route("blog/:slug", "routes/post.tsx"),
  route("contact", "routes/contact.tsx"),
  route("accessibility", "routes/accessibility.tsx"),
  route("privacy", "routes/privacy.tsx"),
  route("terms", "routes/terms.tsx"),
  route("*", "routes/not-found.tsx"),
] satisfies RouteConfig;
