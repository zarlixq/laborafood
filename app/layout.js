import { Inter, Fraunces } from "next/font/google";
import "./globals.css";
import { buildMetadata, siteJsonLd } from "@/lib/seo";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin", "latin-ext"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["SOFT", "WONK"],
});

export const metadata = buildMetadata({
  title: "LabAdı | Akredite Gıda Analiz Laboratuvarı — Mikrobiyoloji & Kimya",
  description:
    "ISO 17025 akredite gıda analiz laboratuvarı. Mikrobiyolojik, kimyasal, su ve raf ömrü analizlerinde 20 yılı aşkın deneyim. 2–5 iş gününde imzalı rapor.",
  path: "/",
});

export const viewport = {
  themeColor: "#FAFAF7",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr" className={`${inter.variable} ${fraunces.variable}`}>
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteJsonLd) }}
        />
      </body>
    </html>
  );
}
