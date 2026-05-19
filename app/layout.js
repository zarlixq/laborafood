import { Inter, Fraunces } from "next/font/google";
import "./globals.css";

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

export const viewport = {
  themeColor: "#FAFAF7",
  width: "device-width",
  initialScale: 1,
};

// Root layout — locale layout sets <html lang>. We keep this minimal because
// next-intl middleware redirects every public route to /<locale>/...
export default function RootLayout({ children }) {
  return (
    <html className={`${inter.variable} ${fraunces.variable}`}>
      <body>{children}</body>
    </html>
  );
}
