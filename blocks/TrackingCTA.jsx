"use client";

import { useTranslations } from "next-intl";
import { ArrowRight, Search } from "lucide-react";
import { Link } from "@/i18n/navigation";
import FadeIn from "@/components/animations/FadeIn";

export default function TrackingCTA() {
  const t = useTranslations("trackingCta");
  return (
    <section className="py-16 lg:py-20">
      <div className="container-app">
        <FadeIn>
          <div className="relative overflow-hidden rounded-3xl border border-line bg-bg-alt px-7 py-10 lg:px-12 lg:py-12 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brand text-white flex-shrink-0">
                <Search className="h-6 w-6" strokeWidth={1.75} />
              </div>
              <div>
                <h3 className="text-2xl lg:text-3xl leading-tight">{t("title")}</h3>
                <p className="mt-2 text-ink-soft">{t("subtitle")}</p>
              </div>
            </div>
            <Link
              href="/tracking"
              className="inline-flex items-center gap-2 self-start lg:self-auto px-5 py-3 rounded-full bg-ink text-white font-medium hover:bg-brand transition-colors"
            >
              {t("button")}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
