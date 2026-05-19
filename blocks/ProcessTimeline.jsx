"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  PackageCheck, ClipboardList, TestTubeDiagonal, ShieldCheck, FileSignature,
} from "lucide-react";
import { processSteps } from "@/lib/processSteps";
import FadeIn from "@/components/animations/FadeIn";
import { StaggerGroup, StaggerItem } from "@/components/animations/StaggerChildren";

const iconMap = {
  PackageCheck, ClipboardList, TestTubeDiagonal, ShieldCheck, FileSignature,
};

export default function ProcessTimeline() {
  const t = useTranslations("process");
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 70%", "end 60%"],
  });
  const lineWidth  = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

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

        <div ref={ref} className="mt-16 relative">
          {/* Desktop: horizontal */}
          <div className="hidden lg:block">
            <div className="relative">
              <div className="absolute top-7 left-7 right-7 h-0.5 dashed-line" />
              <motion.div style={{ width: lineWidth }} className="absolute top-7 left-7 h-0.5 bg-brand origin-left" />
              <StaggerGroup delay={0.12} className="grid grid-cols-5 gap-4 relative">
                {processSteps.map((step) => {
                  const Icon = iconMap[step.icon];
                  return (
                    <StaggerItem key={step.id}>
                      <div className="flex flex-col">
                        <div className="relative z-10 inline-flex h-14 w-14 items-center justify-center rounded-full bg-white border border-line text-brand">
                          <Icon className="h-6 w-6" strokeWidth={1.75} />
                        </div>
                        <div className="mt-5 text-xs text-brand font-medium tracking-widest">
                          {t("stepLabel")} {step.number}
                        </div>
                        <h3 className="mt-1 text-xl">{t(`${step.id}.title`)}</h3>
                        <p className="mt-2 text-sm text-ink-soft leading-relaxed">
                          {t(`${step.id}.desc`)}
                        </p>
                      </div>
                    </StaggerItem>
                  );
                })}
              </StaggerGroup>
            </div>
          </div>

          {/* Mobile: vertical */}
          <div className="lg:hidden relative">
            <div
              className="absolute top-0 bottom-0 left-7 w-0.5"
              style={{
                background: "linear-gradient(to bottom, var(--color-line) 50%, transparent 50%)",
                backgroundSize: "2px 12px",
                backgroundRepeat: "repeat-y",
              }}
            />
            <motion.div style={{ height: lineHeight }} className="absolute top-0 left-7 w-0.5 bg-brand origin-top" />
            <StaggerGroup delay={0.1} className="space-y-8">
              {processSteps.map((step) => {
                const Icon = iconMap[step.icon];
                return (
                  <StaggerItem key={step.id}>
                    <div className="flex gap-5 relative">
                      <div className="relative z-10 inline-flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-white border border-line text-brand">
                        <Icon className="h-6 w-6" strokeWidth={1.75} />
                      </div>
                      <div className="pt-1">
                        <div className="text-xs text-brand font-medium tracking-widest">
                          {t("stepLabel")} {step.number}
                        </div>
                        <h3 className="mt-1 text-xl">{t(`${step.id}.title`)}</h3>
                        <p className="mt-2 text-sm text-ink-soft leading-relaxed">
                          {t(`${step.id}.desc`)}
                        </p>
                      </div>
                    </div>
                  </StaggerItem>
                );
              })}
            </StaggerGroup>
          </div>
        </div>
      </div>
    </section>
  );
}
