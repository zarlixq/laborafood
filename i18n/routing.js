import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["sq", "en"],
  defaultLocale: "sq",
  localePrefix: "always",
  pathnames: {
    "/": "/",
    "/about":         { sq: "/rreth-nesh",   en: "/about" },
    "/services":      { sq: "/sherbimet",    en: "/services" },
    "/analyses":      { sq: "/analizat",     en: "/analyses" },
    "/accreditation": { sq: "/akreditimi",   en: "/accreditation" },
    "/tracking":      { sq: "/gjurmim",      en: "/tracking" },
    "/blog":          { sq: "/blog",         en: "/blog" },
    "/contact":       { sq: "/kontakt",      en: "/contact" },
    "/quote":         { sq: "/oferta",       en: "/quote" },
  },
});
