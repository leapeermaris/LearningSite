import type { Config } from "@react-router/dev/config";
import { readdirSync } from "node:fs";

const blogSlugs = readdirSync("src/content/blog")
  .filter((f) => f.endsWith(".mdx"))
  .map((f) => f.replace(/\.mdx$/, ""));

export default {
  appDirectory: "src",
  ssr: false,
  async prerender() {
    const { courses } = await import("./src/data/courses");
    return [
      "/",
      "/organizations",
      "/managers",
      "/courses",
      "/about",
      "/blog",
      "/contact",
      "/accessibility",
      "/privacy",
      "/terms",
      "/404",
      ...blogSlugs.map((s) => `/blog/${s}`),
      ...courses.map((c) => `/courses/${c.slug}`),
    ];
  },
} satisfies Config;
