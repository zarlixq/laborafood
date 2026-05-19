import { getTranslations } from "next-intl/server";
import Navbar from "@/blocks/Navbar";
import Footer from "@/blocks/Footer";
import CTASection from "@/blocks/CTASection";
import AccreditationStatus from "@/blocks/AccreditationStatus";
import RegulatoryCompliance from "@/blocks/RegulatoryCompliance";
import FadeIn from "@/components/animations/FadeIn";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "accreditationPage" });
  return buildMetadata({
    locale,
    title: `${t("title")} ${t("titleAccent")}`,
    description: t("subtitle"),
    path: "/accreditation",
  });
}

export default async function AccreditationPage({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "accreditationPage" });

  return (
    <>
      <Navbar />
      <main>
        <section className="pt-32 pb-8 lg:pt-40 lg:pb-12">
          <div className="container-app">
            <FadeIn className="max-w-3xl">
              <span className="eyebrow">{t("eyebrow")}</span>
              <h1 className="mt-3 text-5xl lg:text-6xl text-balance leading-[1.05]">
                {t("title")}{" "}
                <span className="italic text-brand">{t("titleAccent")}</span>
              </h1>
              <p className="mt-6 text-lg text-ink-soft text-pretty leading-relaxed">
                {t("subtitle")}
              </p>
            </FadeIn>
          </div>
        </section>

        <AccreditationStatus />
        <RegulatoryCompliance />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
