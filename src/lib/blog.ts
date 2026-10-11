export type PostMeta = {
  title: string;
  metaTitle: string;
  description: string;
  slug: string;
  audience: "organizations" | "managers";
  date: string;
  updated?: string;
  readingTime: number;
  subtitle: string;
  related: { label: string; href: string };
};

// Frontmatter only, so listing pages don't bundle the full articles.
const fm = import.meta.glob<Omit<PostMeta, "slug">>("../content/blog/*.mdx", { eager: true, import: "frontmatter" });

const slugOf = (path: string) => path.split("/").pop()!.replace(/\.mdx$/, "");

export const posts = Object.entries(fm)
  .map(([path, meta]) => ({ meta: { ...meta, slug: slugOf(path) } as PostMeta }))
  .sort((a, b) => b.meta.date.localeCompare(a.meta.date));

export const getPost = (slug: string | undefined) => posts.find((p) => p.meta.slug === slug);

export const audienceLabel = { organizations: "לארגונים", managers: "למנהלים" } as const;

export const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("he-IL", { day: "numeric", month: "long", year: "numeric" });
