import Navbar from "@/blocks/Navbar";
import Footer from "@/blocks/Footer";
import FadeIn from "@/components/animations/FadeIn";
import TeklifForm from "@/components/forms/TeklifForm";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Teklif Al",
  description:
    "3 adımda hızlı teklif: firma bilgileri, analiz seçimi, iletişim. 24 saat içinde dönüş.",
  path: "/teklif",
});

export default function TeklifPage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="pt-32 pb-10 lg:pt-40">
          <div className="container-app">
            <FadeIn className="max-w-3xl">
              <span className="eyebrow">Teklif Al</span>
              <h1 className="mt-3 text-5xl lg:text-6xl text-balance leading-[1.05]">
                5 dakikada teklif
              </h1>
              <p className="mt-6 text-lg text-ink-soft text-pretty">
                Aşağıdaki 3 adımı doldurun; 24 saat içinde size ayrıntılı bir
                fiyat ve plan ileteceğiz.
              </p>
            </FadeIn>
          </div>
        </section>

        <section className="pb-24">
          <div className="container-app">
            <FadeIn>
              <div className="max-w-4xl mx-auto">
                <TeklifForm />
              </div>
            </FadeIn>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
