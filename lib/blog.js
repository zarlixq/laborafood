// Fallback blog entries used when the database has none.
// Once the admin panel publishes posts, those replace these via the page query.

export const fallbackPosts = [
  {
    slug: "what-is-salmonella-analysis",
    title_sq: "Çfarë është analiza e Salmonella-s?",
    title_en: "What is Salmonella analysis?",
    excerpt_sq:
      "Salmonella është një nga patogjenët më të zakonshëm të lidhur me ushqimin. Ja si bëhet analiza dhe pse rezultati i saktë është kritik.",
    excerpt_en:
      "Salmonella is one of the most common foodborne pathogens. Here is how the analysis is done and why accuracy matters.",
    category: "microbiology",
    published_at: "2026-04-12",
    cover_image:
      "https://images.unsplash.com/photo-1576086213369-97a306d36557?w=1200&q=75&auto=format",
  },
  {
    slug: "iso-17025-and-dak",
    title_sq: "ISO/IEC 17025 dhe akreditimi në Kosovë",
    title_en: "ISO/IEC 17025 and accreditation in Kosovo",
    excerpt_sq:
      "Çfarë do të thotë akreditimi i një laboratori dhe si funksionon procesi me Drejtorinë e Akreditimit (DAK).",
    excerpt_en:
      "What it means for a lab to be accredited and how the process with the Kosovo Accreditation Directorate (DAK) works.",
    category: "regulation",
    published_at: "2026-03-28",
    cover_image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&q=75&auto=format",
  },
  {
    slug: "heavy-metals-in-food",
    title_sq: "Metalet e rënda në ushqim",
    title_en: "Heavy metals in food",
    excerpt_sq:
      "Plumbi, kadmiumi, mërkuri, arseniku — pse maten, çfarë rrezikojnë dhe si raportohen rezultatet.",
    excerpt_en:
      "Lead, cadmium, mercury, arsenic — why they are tested, what risks they pose and how results are reported.",
    category: "chemistry",
    published_at: "2026-03-05",
    cover_image:
      "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=1200&q=75&auto=format",
  },
];

export function getPostTitle(p, locale) {
  return locale === "en" ? p.title_en || p.title_sq : p.title_sq;
}
export function getPostExcerpt(p, locale) {
  return locale === "en" ? p.excerpt_en || p.excerpt_sq : p.excerpt_sq;
}
