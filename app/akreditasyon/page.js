import Image from "next/image";
import Navbar from "@/blocks/Navbar";
import Footer from "@/blocks/Footer";
import CTASection from "@/blocks/CTASection";
import FadeIn from "@/components/animations/FadeIn";
import { StaggerGroup, StaggerItem } from "@/components/animations/StaggerChildren";
import { Download } from "lucide-react";
import { accreditations } from "@/lib/accreditation";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Akreditasyon",
  description:
    "ISO/IEC 17025, TÜRKAK, T.C. Tarım ve Orman Bakanlığı yetkili laboratuvar belgeleri ve akreditasyon kapsamı.",
  path: "/akreditasyon",
});

export default function AkreditasyonPage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="pt-32 pb-12 lg:pt-40 lg:pb-16">
          <div className="container-app">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <FadeIn className="lg:col-span-7">
                <span className="eyebrow">Akreditasyon</span>
                <h1 className="mt-3 text-5xl lg:text-6xl text-balance leading-[1.05]">
                  Her sonuç,{" "}
                  <span className="italic text-brand">denetime hazır</span>.
                </h1>
                <p className="mt-6 text-lg text-ink-soft text-pretty leading-relaxed">
                  ISO/IEC 17025 standardı kapsamında TÜRKAK akreditasyonuna sahip
                  bir laboratuvar olarak; metodlarımız doğrulanmış, cihazlarımız
                  izlenebilir kalibrasyonlu, kalite yönetim sistemimiz
                  belgelidir. Bu, sizin elinizdeki raporun yalnızca bir kağıt
                  değil — bir taahhüt olduğu anlamına gelir.
                </p>
              </FadeIn>
              <FadeIn delay={0.15} className="lg:col-span-5">
                <div className="relative aspect-square rounded-3xl overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&q=75&auto=format"
                    alt="Akreditasyon belgesi"
                    fill
                    priority
                    sizes="(max-width:1024px) 90vw, 40vw"
                    className="object-cover"
                  />
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        <section className="section-y bg-bg-alt">
          <div className="container-app">
            <FadeIn className="max-w-2xl">
              <span className="eyebrow">Belgeler</span>
              <h2 className="mt-3 text-4xl lg:text-5xl text-balance leading-tight">
                Belgelerimiz
              </h2>
            </FadeIn>
            <StaggerGroup
              delay={0.08}
              className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
            >
              {accreditations.map((a) => (
                <StaggerItem key={a.name}>
                  <div className="bg-white rounded-3xl border border-line p-7 h-full flex flex-col">
                    <div className="relative aspect-video w-full bg-bg-alt rounded-xl overflow-hidden mb-5">
                      <Image
                        src={a.logo}
                        alt={a.name}
                        fill
                        sizes="400px"
                        className="object-contain p-6"
                      />
                    </div>
                    <h3 className="text-xl">{a.name}</h3>
                    <div className="mt-1 text-sm text-brand">{a.code}</div>
                    <p className="mt-3 text-sm text-ink-soft leading-relaxed flex-1">
                      {a.description}
                    </p>
                    <a
                      href="#"
                      className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-brand"
                    >
                      <Download className="h-4 w-4" />
                      PDF İndir
                    </a>
                  </div>
                </StaggerItem>
              ))}
            </StaggerGroup>
          </div>
        </section>

        <CTASection />
      </main>
      <Footer />
    </>
  );
}
