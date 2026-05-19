import Navbar from "@/blocks/Navbar";
import Footer from "@/blocks/Footer";
import CTASection from "@/blocks/CTASection";
import FadeIn from "@/components/animations/FadeIn";
import { services } from "@/lib/services";
import { analyses } from "@/lib/analyses";
import { Microscope, FlaskConical, Droplets, CalendarClock, Check } from "lucide-react";
import { buildMetadata } from "@/lib/seo";

const iconMap = { Microscope, FlaskConical, Droplets, CalendarClock };

export const metadata = buildMetadata({
  title: "Hizmetlerimiz",
  description:
    "Mikrobiyolojik, kimyasal, su ve raf ömrü analizleri — her hizmet için akredite metodlar ve teslim süreleri.",
  path: "/hizmetler",
});

export default function HizmetlerPage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="pt-32 pb-12 lg:pt-40">
          <div className="container-app">
            <FadeIn className="max-w-3xl">
              <span className="eyebrow">Hizmetler</span>
              <h1 className="mt-3 text-5xl lg:text-6xl text-balance leading-[1.05]">
                Üretimden ihracata —{" "}
                <span className="italic text-brand">tam kapsam</span>
              </h1>
              <p className="mt-6 text-lg text-ink-soft text-pretty">
                Dört ana hizmet kategorimiz altında 200'ü aşkın akredite analiz
                metodu sunuyoruz.
              </p>
            </FadeIn>
          </div>
        </section>

        <section className="pb-10">
          <div className="container-app space-y-20 lg:space-y-32">
            {services.map((svc, i) => {
              const Icon = iconMap[svc.icon];
              const related = analyses.filter((a) => a.category === svc.id);
              const reverse = i % 2 === 1;
              return (
                <FadeIn key={svc.id} id={svc.id}>
                  <div className={`grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start ${reverse ? "lg:[direction:rtl]" : ""}`}>
                    <div className="lg:col-span-5 [direction:ltr]">
                      <div
                        className="inline-flex h-14 w-14 items-center justify-center rounded-2xl mb-5"
                        style={{ background: svc.softBg, color: svc.accent }}
                      >
                        <Icon className="h-7 w-7" strokeWidth={1.75} />
                      </div>
                      <h2 className="text-3xl lg:text-4xl text-balance leading-tight">
                        {svc.title}
                      </h2>
                      <p className="mt-4 text-ink-soft text-pretty leading-relaxed">
                        {svc.summary}
                      </p>
                      <ul className="mt-6 space-y-2.5">
                        {svc.highlights.map((h) => (
                          <li key={h} className="flex items-center gap-2.5 text-sm">
                            <span
                              className="inline-flex h-5 w-5 items-center justify-center rounded-full"
                              style={{ background: svc.softBg, color: svc.accent }}
                            >
                              <Check className="h-3 w-3" strokeWidth={3} />
                            </span>
                            {h}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="lg:col-span-7 [direction:ltr]">
                      <div className="bg-white rounded-3xl border border-line overflow-hidden">
                        <div className="p-6 lg:p-8 border-b border-line bg-bg-alt">
                          <div className="text-xs text-ink-soft tracking-widest uppercase">
                            {svc.title} — Öne çıkan analizler
                          </div>
                        </div>
                        <ul className="divide-y divide-line">
                          {related.slice(0, 6).map((a) => (
                            <li
                              key={a.id}
                              className="flex items-center justify-between gap-4 p-5 lg:p-6 hover:bg-bg-alt/50 transition-colors"
                            >
                              <div>
                                <div className="font-medium text-ink">
                                  {a.name}
                                </div>
                                <div className="text-xs text-ink-soft mt-1">
                                  {a.description}
                                </div>
                              </div>
                              <div className="text-right flex-shrink-0">
                                <div className="text-xs text-brand font-medium">
                                  {a.method}
                                </div>
                                <div className="text-xs text-ink-soft mt-1">
                                  {a.duration}
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </section>

        <CTASection />
      </main>
      <Footer />
    </>
  );
}
