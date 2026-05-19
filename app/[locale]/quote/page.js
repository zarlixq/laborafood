import { getTranslations } from "next-intl/server";
import Navbar from "@/blocks/Navbar";
import Footer from "@/blocks/Footer";
import FadeIn from "@/components/animations/FadeIn";
import QuoteForm from "@/components/forms/QuoteForm";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "quotePage" });
  return buildMetadata({
    locale,
    title: t("title"),
    description: t("subtitle"),
    path: "/quote",
  });
}

export default async function QuotePage({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "quotePage" });

  return (
    <>
      <Navbar />
      <main>
        <section className="pt-32 pb-10 lg:pt-40">
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

        <section className="pb-24">
          <div className="container-app">
            <FadeIn>
              <div className="max-w-4xl mx-auto">
                <QuoteForm />
              </div>
            </FadeIn>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
