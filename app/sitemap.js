import { routing } from "@/i18n/routing";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

const ROUTES = [
  "/",
  "/about",
  "/services",
  "/analyses",
  "/accreditation",
  "/tracking",
  "/blog",
  "/contact",
  "/quote",
];

export default function sitemap() {
  const now = new Date();
  return ROUTES.flatMap((route) => {
    return routing.locales.map((locale) => {
      const path = resolvePath(route, locale);
      return {
        url: `${SITE_URL}/${locale}${path === "/" ? "" : path}`,
        lastModified: now,
        changeFrequency: route === "/" ? "weekly" : "monthly",
        priority: route === "/" ? 1.0 : 0.7,
        alternates: {
          languages: Object.fromEntries(
            routing.locales.map((l) => [
              l === "sq" ? "sq-XK" : "en",
              `${SITE_URL}/${l}${resolvePath(route, l) === "/" ? "" : resolvePath(route, l)}`,
            ])
          ),
        },
      };
    });
  });
}

function resolvePath(route, locale) {
  const def = routing.pathnames[route];
  if (typeof def === "string") return def;
  return def?.[locale] || route;
}
