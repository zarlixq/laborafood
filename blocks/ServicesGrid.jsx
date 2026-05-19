"use client";

import Link from "next/link";
import { ArrowRight, Microscope, FlaskConical, Droplets, CalendarClock } from "lucide-react";
import { services } from "@/lib/services";
import { StaggerGroup, StaggerItem } from "@/components/animations/StaggerChildren";
import FadeIn from "@/components/animations/FadeIn";

const iconMap = { Microscope, FlaskConical, Droplets, CalendarClock };

export default function ServicesGrid() {
  return (
    <section id="hizmetler" className="section-y">
      <div className="container-app">
        <FadeIn className="max-w-2xl">
          <span className="eyebrow">Hizmetler</span>
          <h2 className="mt-3 text-4xl lg:text-5xl text-balance leading-tight">
            Sunduğumuz hizmetler
          </h2>
          <p className="mt-4 text-ink-soft text-pretty">
            Üreticinin günlük rutini, ihracat süreçleri ve ar-ge çalışmaları için
            tek noktadan kapsamlı laboratuvar hizmeti.
          </p>
        </FadeIn>

        <StaggerGroup className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((svc) => {
            const Icon = iconMap[svc.icon] || Microscope;
            return (
              <StaggerItem key={svc.id}>
                <Link
                  href={`/hizmetler#${svc.id}`}
                  className="group relative block bg-white rounded-3xl border border-line p-6 lg:p-7 h-full transition-all duration-300 hover:-translate-y-1 hover:border-brand/30 hover:shadow-[0_24px_50px_-30px_rgba(15,76,117,0.3)]"
                >
                  <div
                    className="inline-flex h-14 w-14 items-center justify-center rounded-2xl mb-5"
                    style={{ background: svc.softBg, color: svc.accent }}
                  >
                    <Icon className="h-7 w-7" strokeWidth={1.75} />
                  </div>
                  <h3 className="text-2xl mb-3 leading-snug">{svc.title}</h3>
                  <p className="text-ink-soft text-sm leading-relaxed mb-5">
                    {svc.summary}
                  </p>
                  <ul className="space-y-1.5 mb-6">
                    {svc.highlights.map((h) => (
                      <li
                        key={h}
                        className="text-xs text-ink-soft flex items-center gap-2"
                      >
                        <span className="h-1 w-1 rounded-full bg-brand" />
                        {h}
                      </li>
                    ))}
                  </ul>
                  <span className="inline-flex items-center gap-1.5 text-sm font-medium text-brand">
                    Detaylı incele
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
