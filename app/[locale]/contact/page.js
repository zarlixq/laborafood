import { getTranslations } from "next-intl/server";
import Navbar from "@/blocks/Navbar";
import Footer from "@/blocks/Footer";
import FadeIn from "@/components/animations/FadeIn";
import { Mail, MapPin, Clock } from "lucide-react";
import { company } from "@/lib/navigation";
import { buildMetadata } from "@/lib/seo";
import ContactForm from "./ContactForm";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contactPage" });
  return buildMetadata({
    locale,
    title: t("title"),
    description: t("subtitle"),
    path: "/contact",
  });
}

export default async function ContactPage({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contactPage" });

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

        <section className="pb-24">
          <div className="container-app">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
              <div className="lg:col-span-7">
                <FadeIn>
                  <ContactForm />
                </FadeIn>
              </div>

              <div className="lg:col-span-5 space-y-6">
                <FadeIn delay={0.1}>
                  <div className="bg-white rounded-3xl border border-line p-7 space-y-4 text-sm">
                    <div className="flex items-start gap-3">
                      <MapPin className="h-4 w-4 mt-0.5 text-brand flex-shrink-0" />
                      <span>{t("info.address")}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="h-4 w-4 text-brand flex-shrink-0" />
                      <a href={`mailto:${company.email}`} className="text-ink hover:text-brand">
                        {company.email}
                      </a>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="h-4 w-4 text-brand flex-shrink-0" />
                      <span>{t("info.hours")}</span>
                    </div>
                  </div>
                </FadeIn>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
