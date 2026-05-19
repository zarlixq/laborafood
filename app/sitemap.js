const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export default function sitemap() {
  const routes = [
    "",
    "/hakkimizda",
    "/hizmetler",
    "/analizler",
    "/akreditasyon",
    "/blog",
    "/iletisim",
    "/teklif",
  ];
  const now = new Date();
  return routes.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1.0 : 0.7,
  }));
}
