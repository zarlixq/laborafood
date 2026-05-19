import { company } from "./navigation";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
const DEFAULT_OG = "/og-default.svg";

const HREFLANG = {
  sq: "sq-XK",
  en: "en",
};

export function buildMetadata({ locale = "sq", title, description, path = "/" }) {
  const localePath = `/${locale}${path === "/" ? "" : path}`;
  const url = `${SITE_URL}${localePath}`;
  const fullTitle = title.includes(company.name) ? title : `${title} | ${company.name}`;

  return {
    metadataBase: new URL(SITE_URL),
    title: fullTitle,
    description,
    alternates: {
      canonical: url,
      languages: {
        "sq-XK": `${SITE_URL}/sq${path === "/" ? "" : path}`,
        "en":    `${SITE_URL}/en${path === "/" ? "" : path}`,
        "x-default": `${SITE_URL}/sq${path === "/" ? "" : path}`,
      },
    },
    openGraph: {
      type: "website",
      url,
      title: fullTitle,
      description,
      siteName: company.name,
      locale: HREFLANG[locale] === "sq-XK" ? "sq_AL" : "en_US",
      alternateLocale: [locale === "sq" ? "en_US" : "sq_AL"],
      images: [{ url: DEFAULT_OG, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [DEFAULT_OG],
    },
    robots: { index: true, follow: true },
    other: {
      "geo.region": "XK",
      "geo.placename": "Prizren",
    },
  };
}

export const siteJsonLd = {
  "@context": "https://schema.org",
  "@type": ["Organization", "MedicalBusiness"],
  name: company.legalName,
  alternateName: company.name,
  description:
    "Independent microbiological and chemical food analysis laboratory in Prizren, Kosovo.",
  url: SITE_URL,
  email: company.email,
  telephone: company.phone,
  areaServed: { "@type": "Country", name: "Kosovo" },
  address: {
    "@type": "PostalAddress",
    addressLocality: company.address.city,
    addressCountry: company.address.countryCode,
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Laboratory Services",
    itemListElement: [
      "Microbiological Analyses",
      "Chemical Analyses",
    ].map((name) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name },
    })),
  },
};
