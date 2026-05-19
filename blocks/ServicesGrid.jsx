"use client";

import { useTranslations } from "next-intl";
import { ArrowRight, Microscope, FlaskConical } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { services } from "@/lib/services";
import { StaggerGroup, StaggerItem } from "@/components/animations/StaggerChildren";
import FadeIn from "@/components/animations/FadeIn";

const iconMap = { Microscope, FlaskConical };

export default function ServicesGrid() {
  const t = useTranslations();

  return (
    <section id="services" className="section-y">
      <div className="container-app">
        <FadeIn className="max-w-2xl">
          <span className="eyebrow">{t("services.eyebrow")}</span>
          <h2 className="mt-3 text-4xl lg:text-5xl text-balance leading-tight">
            {t("services.title")}
          </h2>
          <p className="mt-4 text-ink-soft text-pretty">
            {t("services.subtitle")}
          </p>
        </FadeIn>

        <StaggerGroup className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-5">
          {services.map((svc) => {
            const Icon = iconMap[svc.icon];
            const titleKey = `services.${svc.id === "microbiology" ? "micro" : "chem"}.title`;
            const subtitleKey = `services.${svc.id === "microbiology" ? "micro" : "chem"}.subtitle`;
            return (
              <StaggerItem key={svc.id}>
                <Link
                  href={`/services#${svc.id}`}
                  className="group relative block bg-white rounded-3xl border border-line p-7 lg:p-9 h-full transition-all duration-300 hover:-translate-y-1 hover:border-brand/30 hover:shadow-[0_24px_50px_-30px_rgba(27,67,50,0.3)]"
                >
                  <div
                    className="inline-flex h-16 w-16 items-center justify-center rounded-2xl mb-6"
                    style={{ background: svc.softBg, color: svc.accent }}
                  >
                    <Icon className="h-8 w-8" strokeWidth={1.75} />
                  </div>
                  <h3 className="text-3xl mb-2 leading-snug">{t(titleKey)}</h3>
                  <p className="text-ink-soft mb-6 leading-relaxed">{t(subtitleKey)}</p>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-1.5 mb-6">
                    {svc.highlightKeys.map((k) => (
                      <li key={k} className="text-sm text-ink flex items-center gap-2">
                        <span className="h-1 w-1 rounded-full bg-brand" />
                        {t(k)}
                      </li>
                    ))}
                  </ul>
                  <span className="inline-flex items-center gap-1.5 text-sm font-medium text-brand">
                    {t("services.viewDetails")}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </StaggerItem>
            );
          })}
        </StaggerGroup>
      </div>
    </section>
  );
}
