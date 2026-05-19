"use client";

import { useTranslations } from "next-intl";
import { Shield, Scale, BookOpen } from "lucide-react";
import FadeIn from "@/components/animations/FadeIn";
import { StaggerGroup, StaggerItem } from "@/components/animations/StaggerChildren";
import { regulatoryFrameworks } from "@/lib/accreditation";

const iconMap = { Shield, Scale, BookOpen };

export default function RegulatoryCompliance() {
  const t = useTranslations("compliance");
  return (
    <section className="section-y">
      <div className="container-app">
        <FadeIn className="max-w-2xl">
          <span className="eyebrow">{t("eyebrow")}</span>
          <h2 className="mt-3 text-4xl lg:text-5xl text-balance leading-tight">
            {t("title")}
          </h2>
          <p className="mt-4 text-ink-soft text-pretty">{t("subtitle")}</p>
        </FadeIn>

        <StaggerGroup className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-5">
          {regulatoryFrameworks.map((fw) => {
            const Icon = iconMap[fw.icon];
            return (
              <StaggerItem key={fw.id}>
                <div className="bg-white rounded-3xl border border-line p-7 h-full">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-soft text-brand mb-5">
                    <Icon className="h-6 w-6" strokeWidth={1.75} />
                  </div>
                  <div className="text-xs font-medium tracking-widest text-brand uppercase mb-2">
                    {fw.code}
                  </div>
                  <h3 className="text-xl leading-snug">{t(`${fw.id}.title`)}</h3>
                  <p className="mt-3 text-sm text-ink-soft leading-relaxed">
                    {t(`${fw.id}.desc`)}
                  </p>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerGroup>
      </div>
    </section>
  );
}
