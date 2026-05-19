import { getTranslations } from "next-intl/server";
import Navbar from "@/blocks/Navbar";
import Footer from "@/blocks/Footer";
import CTASection from "@/blocks/CTASection";
import FadeIn from "@/components/animations/FadeIn";
import AnalysesClient from "./AnalysesClient";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "analysesPage" });
  return buildMetadata({
    locale,
    title: t("title"),
    description: t("subtitle"),
    path: "/analyses",
  });
}

export default async function AnalysesPage({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "analysesPage" });

  return (
    <>
      <Navbar />
      <main>
        <section className="pt-32 pb-12 lg:pt-40 lg:pb-16">
          <div className="container-app">
            <FadeIn className="max-w-3xl">
              <span className="eyebrow">{t("eyebrow")}</span>
              <h1 className="mt-3 text-5xl lg:text-6xl text-balance leading-[1.05]">
                {t("title")}
              </h1>
              <p className="mt-6 text-lg text-ink-soft text-pretty">{t("subtitle")}</p>
            </FadeIn>
          </div>
        </section>

        <section className="pb-20">
          <div className="container-app">
            <AnalysesClient />
          </div>
        </section>

        <CTASection />
      </main>
      <Footer />
    </>
  );
}
