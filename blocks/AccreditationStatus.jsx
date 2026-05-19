"use client";

import { useTranslations } from "next-intl";
import { CheckCircle2, Loader, Circle } from "lucide-react";
import FadeIn from "@/components/animations/FadeIn";
import { StaggerGroup, StaggerItem } from "@/components/animations/StaggerChildren";
import { accreditationSteps } from "@/lib/accreditation";

const iconFor = (status) => {
  if (status === "done") return CheckCircle2;
  if (status === "inProgress") return Loader;
  return Circle;
};

export default function AccreditationStatus() {
  const t = useTranslations("accreditation");
  return (
    <section className="section-y bg-bg-alt">
      <div className="container-app">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <FadeIn className="lg:col-span-5 lg:sticky lg:top-32 self-start">
            <span className="eyebrow">{t("eyebrow")}</span>
            <h2 className="mt-3 text-4xl lg:text-5xl text-balance leading-tight">
              {t("title")}
            </h2>
            <p className="mt-5 text-ink-soft text-pretty leading-relaxed">
              {t("body")}
            </p>
            <p className="mt-4 text-sm italic text-brand">{t("honestyNote")}</p>
          </FadeIn>

          <StaggerGroup delay={0.1} className="lg:col-span-7 space-y-3">
            {accreditationSteps.map((step, i) => {
              const Icon = iconFor(step.status);
              const isDone = step.status === "done";
              const isProgress = step.status === "inProgress";
              return (
                <StaggerItem key={step.id}>
                  <div
                    className={`flex items-start gap-4 rounded-2xl border bg-white p-5 lg:p-6 ${
                      isProgress ? "border-brand" : "border-line"
                    }`}
                  >
                    <div
                      className={`inline-flex h-10 w-10 items-center justify-center rounded-full flex-shrink-0 ${
                        isDone
                          ? "bg-brand text-white"
                          : isProgress
                          ? "bg-accent text-ink"
                          : "bg-bg-alt text-ink-soft"
                      }`}
                    >
                      <Icon className={`h-5 w-5 ${isProgress ? "animate-spin" : ""}`} strokeWidth={2} />
                    </div>
                    <div className="flex-1">
                      <div className="text-xs uppercase tracking-widest text-ink-soft">
                        {String(i + 1).padStart(2, "0")} · {t(`status.${step.status}`)}
                      </div>
                      <div className="mt-1 text-lg text-ink leading-snug">
                        {t(`steps.${step.id}`)}
                      </div>
                    </div>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerGroup>
        </div>
      </div>
    </section>
  );
}
