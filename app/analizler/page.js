import Navbar from "@/blocks/Navbar";
import Footer from "@/blocks/Footer";
import CTASection from "@/blocks/CTASection";
import FadeIn from "@/components/animations/FadeIn";
import AnalysesClient from "./AnalysesClient";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Analizler",
  description:
    "Mikrobiyoloji, kimya, su ve raf ömrü analizleri — metod, süre ve açıklamalarıyla tam liste. Aratıp filtreleyin.",
  path: "/analizler",
});

export default function AnalizlerPage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="pt-32 pb-12 lg:pt-40 lg:pb-16">
          <div className="container-app">
            <FadeIn className="max-w-3xl">
              <span className="eyebrow">Analizler</span>
              <h1 className="mt-3 text-5xl lg:text-6xl text-balance leading-[1.05]">
                Tüm analizler, tek yerde
              </h1>
              <p className="mt-6 text-lg text-ink-soft text-pretty">
                Kategoriye göre filtreleyin veya analiz adıyla arayın. Her metod
                ISO veya ulusal yönetmelik temellidir.
              </p>
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
