import Image from "next/image";
import { getTranslations } from "next-intl/server";
import Navbar from "@/blocks/Navbar";
import Footer from "@/blocks/Footer";
import CTASection from "@/blocks/CTASection";
import FadeIn from "@/components/animations/FadeIn";
import { StaggerGroup, StaggerItem } from "@/components/animations/StaggerChildren";
import { Target, Eye, Heart } from "lucide-react";
import { values, facilityImages } from "@/lib/company";
import { buildMetadata } from "@/lib/seo";

const iconMap = { Target, Eye, Heart };

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  return buildMetadata({
    locale,
    title: `${t("title")} ${t("titleAccent")} ${t("titleTail")}`.replace(/\s+/g, " ").trim(),
    description: t("intro"),
    path: "/about",
  });
}

export default async function AboutPage({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });

  return (
    <>
      <Navbar />
      <main>
        <section className="pt-32 pb-12 lg:pt-40 lg:pb-20">
          <div className="container-app">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <FadeIn className="lg:col-span-6">
                <span className="eyebrow">{t("eyebrow")}</span>
                <h1 className="mt-3 text-5xl lg:text-6xl text-balance leading-[1.05]">
                  {t("title")}{" "}
                  <span className="italic text-brand">{t("titleAccent")}</span>{" "}
                  {t("titleTail")}
                </h1>
                <p className="mt-6 text-lg text-ink-soft text-pretty leading-relaxed">
                  {t("intro")}
                </p>
              </FadeIn>
              <FadeIn delay={0.15} className="lg:col-span-6">
                <div className="relative aspect-[4/5] rounded-3xl overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=1400&q=75&auto=format"
                    alt={t("facility.alt1")}
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
              <span className="eyebrow">{t("valuesEyebrow")}</span>
              <h2 className="mt-3 text-4xl lg:text-5xl text-balance leading-tight">
                {t("valuesTitle")}
              </h2>
            </FadeIn>
            <StaggerGroup delay={0.1} className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-5">
              {values.map((v) => {
                const Icon = iconMap[v.icon];
                return (
                  <StaggerItem key={v.id}>
                    <div className="bg-white rounded-3xl border border-line p-7 h-full">
                      <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-soft text-brand mb-5">
                        <Icon className="h-6 w-6" strokeWidth={1.75} />
                      </div>
                      <h3 className="text-2xl mb-3">{t(`values.${v.id}.title`)}</h3>
                      <p className="text-ink-soft leading-relaxed">{t(`values.${v.id}.body`)}</p>
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
              <span className="eyebrow">{t("facility.eyebrow")}</span>
              <h2 className="mt-3 text-4xl lg:text-5xl text-balance leading-tight">
                {t("facility.title")}
              </h2>
              <p className="mt-4 text-ink-soft text-pretty">{t("facility.subtitle")}</p>
            </FadeIn>
            <StaggerGroup delay={0.1} className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-4">
              {facilityImages.map((img, i) => (
                <StaggerItem key={i}>
                  <div className="relative aspect-square rounded-2xl overflow-hidden">
                    <Image
                      src={img.src}
                      alt={t(img.altKey)}
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
