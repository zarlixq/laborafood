"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { showcase } from "@/lib/services";
import FadeIn from "@/components/animations/FadeIn";

export default function AnalysisShowcase() {
  const t = useTranslations("showcase");
  const [activeIndex, setActiveIndex] = useState(0);
  const sceneRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = sceneRefs.current.indexOf(entry.target);
            if (idx !== -1) setActiveIndex(idx);
          }
        });
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: 0 }
    );
    sceneRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="bg-ink text-white py-24 lg:py-32">
      <div className="container-app">
        <FadeIn className="max-w-2xl mb-16 lg:mb-20">
          <span className="eyebrow text-accent">{t("eyebrow")}</span>
          <h2 className="mt-3 text-4xl lg:text-5xl text-white text-balance leading-tight">
            {t("title")}
          </h2>
          <p className="mt-4 text-white/70 text-pretty">{t("subtitle")}</p>
        </FadeIn>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left: sticky image (desktop only) */}
          <div className="hidden lg:block">
            <div className="sticky top-24 h-[75vh] rounded-3xl overflow-hidden bg-bg-alt">
              {showcase.map((scene, i) => (
                <Image
                  key={scene.id}
                  src={scene.image}
                  alt={scene.alt}
                  fill
                  sizes="50vw"
                  className={`object-cover transition-opacity duration-700 ${activeIndex === i ? "opacity-100" : "opacity-0"}`}
                />
              ))}
              <div className="absolute inset-0 bg-gradient-to-t from-ink/30 to-transparent pointer-events-none" />
              <div className="absolute top-6 left-6 right-6 flex gap-2">
                {showcase.map((_, i) => (
                  <span
                    key={i}
                    className={`h-1 flex-1 rounded-full transition-all duration-500 ${
                      i === activeIndex ? "bg-accent" : "bg-white/15"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right: scroll-driven text scenes */}
          <div className="space-y-32 lg:space-y-[40vh]">
            {showcase.map((scene, i) => (
              <div
                key={scene.id}
                ref={(el) => (sceneRefs.current[i] = el)}
                className="min-h-[40vh] flex flex-col justify-center"
              >
                {/* Mobile: inline image */}
                <div className="lg:hidden mb-6 relative aspect-[4/5] rounded-2xl overflow-hidden">
                  <Image
                    src={scene.image}
                    alt={scene.alt}
                    fill
                    sizes="90vw"
                    className="object-cover"
                  />
                </div>
                <span className="text-accent text-sm tracking-widest uppercase mb-3">
                  {t("scene")} {String(i + 1).padStart(2, "0")} / {String(showcase.length).padStart(2, "0")}
                </span>
                <h3 className="text-3xl lg:text-4xl text-white leading-tight">
                  {t(`${scene.id}.title`)}
                </h3>
                <p className="mt-4 text-lg text-white/75 leading-relaxed text-pretty">
                  {t(`${scene.id}.desc`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
