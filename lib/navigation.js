// Top-level nav items reference i18n route keys (see i18n/routing.js pathnames).
// Labels are pulled from messages via t('nav.*') in components.
export const mainNav = [
  { key: "services",      href: "/services" },
  { key: "analyses",      href: "/analyses" },
  { key: "accreditation", href: "/accreditation" },
  { key: "tracking",      href: "/tracking" },
  { key: "blog",          href: "/blog" },
  { key: "contact",       href: "/contact" },
];

export const footerNav = {
  services: [
    { labelKey: "services.micro.title",  href: "/services#microbiology" },
    { labelKey: "services.chem.title",   href: "/services#chemistry" },
    { labelKey: "nav.analyses",          href: "/analyses" },
    { labelKey: "nav.tracking",          href: "/tracking" },
  ],
  corporate: [
    { labelKey: "nav.about",          href: "/about" },
    { labelKey: "nav.accreditation",  href: "/accreditation" },
    { labelKey: "nav.blog",           href: "/blog" },
    { labelKey: "nav.contact",        href: "/contact" },
  ],
  legal: [
    { labelKey: "footer.privacy",    href: "#" },
    { labelKey: "footer.terms",      href: "#" },
    { labelKey: "footer.cookies",    href: "#" },
  ],
};

export const company = {
  name: "LaboraFood",
  legalName: "LaboraFood SHPK",
  domain: "laborafood.com",
  email: "info@laborafood.com",
  phone: "+383 00 000 000",
  whatsapp: "+383 00 000 000",
  address: {
    street: "Prizren",
    city: "Prizren",
    country: "Kosovë",
    countryCode: "XK",
  },
  social: {
    linkedin: "#",
    instagram: "#",
    facebook: "#",
  },
};
