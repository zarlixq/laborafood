import { useTranslations } from "next-intl";
import { ArrowRight, MessageCircle } from "lucide-react";
import Button from "@/components/ui/Button";
import FadeIn from "@/components/animations/FadeIn";
import { company } from "@/lib/navigation";

export default function CTASection() {
  const t = useTranslations("cta");
  return (
    <section className="section-y">
      <div className="container-app">
        <div className="relative overflow-hidden rounded-3xl bg-brand text-white px-8 py-16 lg:px-16 lg:py-24">
          <div className="blob bg-brand-2/60 w-[400px] h-[400px] -top-20 -right-20" />
          <div className="blob bg-accent/40 w-[300px] h-[300px] -bottom-20 -left-20" />

          <div className="relative max-w-3xl">
            <FadeIn>
              <h2 className="text-4xl lg:text-6xl text-white text-balance leading-tight">
                {t("title")}{" "}
                <span className="italic text-accent">{t("titleAccent")}</span>
              </h2>
            </FadeIn>
            <FadeIn delay={0.1}>
              <p className="mt-5 text-lg text-white/80 text-pretty max-w-2xl">
                {t("subtitle")}
              </p>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div className="mt-9 flex flex-wrap gap-3">
                <Button href="/quote" variant="lightOnBrand" size="lg">
                  {t("primary")}
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <Button
                  href={`https://wa.me/${company.whatsapp.replace(/\D/g, "")}`}
                  variant="outlineOnBrand"
                  size="lg"
                  target="_blank"
                  rel="noreferrer"
                >
                  <MessageCircle className="h-4 w-4" />
                  {t("secondary")}
                </Button>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
