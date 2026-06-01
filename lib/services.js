// Categories: microbiology + physicochemical (V2 scope).
// Labels come from i18n; this file only carries structural data.

export const services = [
  {
    id: "microbiology",
    icon: "Microscope",
    accent: "#1B4332",
    softBg: "rgba(27, 67, 50, 0.10)",
    // i18n keys for title / summary / highlights are referenced by ID in components
    highlightKeys: [
      "services.micro.h1",
      "services.micro.h2",
      "services.micro.h3",
      "services.micro.h4",
      "services.micro.h5",
      "services.micro.h6",
      "services.micro.h7",
      "services.micro.h8",
    ],
  },
  {
    id: "physicochemical",
    icon: "FlaskConical",
    accent: "#2D6A4F",
    softBg: "rgba(45, 106, 79, 0.10)",
    highlightKeys: [
      "services.chem.h1",
      "services.chem.h2",
      "services.chem.h3",
      "services.chem.h4",
      "services.chem.h5",
      "services.chem.h6",
      "services.chem.h7",
      "services.chem.h8",
    ],
  },
];

export const showcase = [
  {
    id: "patogens",
    image:
      "https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=1600&q=75&auto=format",
    alt: "Petri dish bacterial colonies",
  },
  {
    id: "chemistry",
    image:
      "https://images.unsplash.com/photo-1581093588401-fbb62a02f120?w=1600&q=75&auto=format",
    alt: "Chromatography instrument in lab",
  },
  {
    id: "reporting",
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1600&q=75&auto=format",
    alt: "Signed lab report",
  },
];
