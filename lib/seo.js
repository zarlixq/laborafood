import { company } from "./navigation";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

const DEFAULT_OG = "/og-default.svg";

export function buildMetadata({ title, description, path = "/" }) {
  const url = `${SITE_URL}${path}`;
  const fullTitle = title.includes(company.name)
    ? title
    : `${title} | ${company.name}`;

  return {
    metadataBase: new URL(SITE_URL),
    title: fullTitle,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      title: fullTitle,
      description,
      siteName: company.name,
      locale: "tr_TR",
      images: [{ url: DEFAULT_OG, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [DEFAULT_OG],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export const siteJsonLd = {
  "@context": "https://schema.org",
  "@type": ["Organization", "LocalBusiness"],
  name: company.legalName,
  alternateName: company.name,
  description: company.description,
  url: SITE_URL,
  email: company.email,
  telephone: company.phone,
  address: {
    "@type": "PostalAddress",
    streetAddress: company.address.street,
    addressLocality: company.address.district,
    addressRegion: company.address.city,
    addressCountry: company.address.country,
    postalCode: company.address.zip,
  },
  openingHours: "Mo-Fr 08:30-18:00, Sa 09:00-14:00",
  areaServed: "TR",
  sameAs: [company.social.linkedin, company.social.instagram, company.social.twitter].filter(
    (u) => u && u !== "#"
  ),
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Laboratuvar Hizmetleri",
    itemListElement: [
      "Mikrobiyolojik Analizler",
      "Kimyasal Analizler",
      "Su ve Çevre Analizleri",
      "Raf Ömrü ve Stabilite",
    ].map((name) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name },
    })),
  },
};
