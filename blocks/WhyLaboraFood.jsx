"use client";

import { useTranslations } from "next-intl";
import { Microscope, Zap, ShieldCheck, Eye } from "lucide-react";
import FadeIn from "@/components/animations/FadeIn";
import { StaggerGroup, StaggerItem } from "@/components/animations/StaggerChildren";

const items = [
  { id: "accuracy",     icon: Microscope },
  { id: "speed",        icon: Zap },
  { id: "privacy",      icon: ShieldCheck },
  { id: "transparency", icon: Eye },
];

export default function WhyLaboraFood() {
  const t = useTranslations("why");
  return (
    <section className="section-y bg-bg-alt">
      <div className="container-app">
        <FadeIn className="max-w-2xl">
          <span className="eyebrow">{t("eyebrow")}</span>
          <h2 className="mt-3 text-4xl lg:text-5xl text-balance leading-tight">
            {t("title")}
          </h2>
        </FadeIn>

        <StaggerGroup className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {items.map(({ id, icon: Icon }) => (
            <StaggerItem key={id}>
              <div className="bg-white rounded-3xl border border-line p-6 lg:p-7 h-full transition-all duration-300 hover:-translate-y-1 hover:border-brand/30 hover:shadow-[0_18px_40px_-25px_rgba(27,67,50,0.3)]">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-soft text-brand mb-5">
                  <Icon className="h-6 w-6" strokeWidth={1.75} />
                </div>
                <h3 className="text-xl mb-2">{t(`${id}.title`)}</h3>
                <p className="text-sm text-ink-soft leading-relaxed">{t(`${id}.desc`)}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
