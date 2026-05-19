import Image from "next/image";
import Navbar from "@/blocks/Navbar";
import Footer from "@/blocks/Footer";
import CTASection from "@/blocks/CTASection";
import FadeIn from "@/components/animations/FadeIn";
import { StaggerGroup, StaggerItem } from "@/components/animations/StaggerChildren";
import { Target, Eye, Heart } from "lucide-react";
import { values, team, facilityImages } from "@/lib/company";
import { buildMetadata } from "@/lib/seo";
import { company } from "@/lib/navigation";

const iconMap = { Target, Eye, Heart };

export const metadata = buildMetadata({
  title: "Hakkımızda",
  description:
    "20 yıl önce kurulan, ISO 17025 akredite gıda analiz laboratuvarımızın hikayesi, ekibimiz ve tesisimizle tanışın.",
  path: "/hakkimizda",
});

export default function HakkimizdaPage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="pt-32 pb-12 lg:pt-40 lg:pb-20">
          <div className="container-app">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <FadeIn className="lg:col-span-6">
                <span className="eyebrow">Hakkımızda</span>
                <h1 className="mt-3 text-5xl lg:text-6xl text-balance leading-[1.05]">
                  Bilim,{" "}
                  <span className="italic text-brand">tarafsızlık</span>, aile
                  emeği.
                </h1>
                <p className="mt-6 text-lg text-ink-soft text-pretty leading-relaxed">
                  {company.name}, 2006'da küçük bir mikrobiyoloji birimi olarak
                  kuruldu. Bugün üç şehirde, yüzlerce metod kapsamında akredite
                  bir gıda analiz laboratuvarıyız. Sektör değişiyor; ama
                  değişmeyen bir şey var: dürüst sonuç.
                </p>
              </FadeIn>
              <FadeIn delay={0.15} className="lg:col-span-6">
                <div className="relative aspect-[4/5] rounded-3xl overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=1400&q=75&auto=format"
                    alt="Lab kurucusu çalışırken"
                    fill
                    priority
                    sizes="(max-width: 1024px) 90vw, 45vw"
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
              <span className="eyebrow">Pusulamız</span>
              <h2 className="mt-3 text-4xl lg:text-5xl text-balance leading-tight">
                Misyon — Vizyon — Değerler
              </h2>
            </FadeIn>
            <StaggerGroup
              delay={0.1}
              className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-5"
            >
              {values.map((v) => {
                const Icon = iconMap[v.icon];
                return (
                  <StaggerItem key={v.title}>
                    <div className="bg-white rounded-3xl border border-line p-7 h-full">
                      <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brand/10 text-brand mb-5">
                        <Icon className="h-6 w-6" strokeWidth={1.75} />
                      </div>
                      <h3 className="text-2xl mb-3">{v.title}</h3>
                      <p className="text-ink-soft leading-relaxed">{v.body}</p>
                    </div>
                  </StaggerItem>
                );
              })}
            </StaggerGroup>
          </div>
        </section>

        <section className="section-y">
          <div className="container-app">
            <FadeIn className="max-w-2xl">
              <span className="eyebrow">Ekip</span>
              <h2 className="mt-3 text-4xl lg:text-5xl text-balance leading-tight">
                Sonucu üreten insanlar
              </h2>
              <p className="mt-4 text-ink-soft text-pretty">
                Mikrobiyolog, kimyager, mühendis ve kalite uzmanlarından oluşan
                30 kişilik ekibimizin liderleriyle tanışın.
              </p>
            </FadeIn>
            <StaggerGroup
              delay={0.07}
              className="mt-12 grid grid-cols-2 md:grid-cols-3 gap-5"
            >
              {team.map((m) => (
                <StaggerItem key={m.name}>
                  <div className="group">
                    <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-bg-alt">
                      <Image
                        src={m.photo}
                        alt={m.name}
                        fill
                        sizes="(max-width:768px) 45vw, 25vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    <div className="mt-4">
                      <div className="text-lg font-medium">{m.name}</div>
                      <div className="text-sm text-ink-soft">{m.title}</div>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerGroup>
          </div>
        </section>

        <section id="kariyer" className="section-y bg-bg-alt">
          <div className="container-app">
            <FadeIn className="max-w-2xl">
              <span className="eyebrow">Tesis</span>
              <h2 className="mt-3 text-4xl lg:text-5xl text-balance leading-tight">
                Yaklaşık 1.200 m² akredite alan
              </h2>
              <p className="mt-4 text-ink-soft text-pretty">
                İki ayrı mikrobiyoloji odası, izole numune giriş bölgesi,
                kromatografi salonu ve numune arşivi.
              </p>
            </FadeIn>
            <StaggerGroup
              delay={0.1}
              className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-4"
            >
              {facilityImages.map((img, i) => (
                <StaggerItem key={i}>
                  <div className="relative aspect-square rounded-2xl overflow-hidden">
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      sizes="(max-width:768px) 45vw, 23vw"
                      className="object-cover"
                    />
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
