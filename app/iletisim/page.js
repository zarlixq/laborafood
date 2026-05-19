import Navbar from "@/blocks/Navbar";
import Footer from "@/blocks/Footer";
import FadeIn from "@/components/animations/FadeIn";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { company } from "@/lib/navigation";
import { buildMetadata } from "@/lib/seo";
import ContactForm from "./ContactForm";

export const metadata = buildMetadata({
  title: "İletişim",
  description:
    "Adres, telefon, e-posta ve çalışma saatleri — sorularınız için bize ulaşın.",
  path: "/iletisim",
});

export default function IletisimPage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="pt-32 pb-12 lg:pt-40 lg:pb-16">
          <div className="container-app">
            <FadeIn className="max-w-3xl">
              <span className="eyebrow">İletişim</span>
              <h1 className="mt-3 text-5xl lg:text-6xl text-balance leading-[1.05]">
                Konuşalım
              </h1>
              <p className="mt-6 text-lg text-ink-soft text-pretty">
                Hızlı bir soru, danışmanlık veya saha ziyareti talebiniz mi var?
                Formu doldurun ya da doğrudan iletişime geçin.
              </p>
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
                  <div className="bg-white rounded-3xl border border-line overflow-hidden">
                    <div className="relative aspect-[16/10] bg-bg-alt">
                      <iframe
                        title="Harita"
                        src="https://www.openstreetmap.org/export/embed.html?bbox=29.10%2C40.97%2C29.15%2C41.00&layer=mapnik"
                        className="absolute inset-0 h-full w-full"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-6 space-y-4 text-sm">
                      <div className="flex items-start gap-3">
                        <MapPin className="h-4 w-4 mt-0.5 text-brand flex-shrink-0" />
                        <span>
                          {company.address.street}, {company.address.district}
                          <br />
                          {company.address.zip} {company.address.city}/
                          {company.address.country}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Phone className="h-4 w-4 text-brand flex-shrink-0" />
                        <a
                          href={`tel:${company.phone}`}
                          className="text-ink hover:text-brand"
                        >
                          {company.phone}
                        </a>
                      </div>
                      <div className="flex items-center gap-3">
                        <Mail className="h-4 w-4 text-brand flex-shrink-0" />
                        <a
                          href={`mailto:${company.email}`}
                          className="text-ink hover:text-brand"
                        >
                          {company.email}
                        </a>
                      </div>
                      <div className="flex items-center gap-3">
                        <Clock className="h-4 w-4 text-brand flex-shrink-0" />
                        <span>{company.hours}</span>
                      </div>
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
