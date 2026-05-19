import Image from "next/image";
import { Star, Quote } from "lucide-react";
import { testimonials } from "@/lib/testimonials";
import FadeIn from "@/components/animations/FadeIn";
import { StaggerGroup, StaggerItem } from "@/components/animations/StaggerChildren";

export default function Testimonials() {
  return (
    <section className="section-y">
      <div className="container-app">
        <FadeIn className="max-w-2xl">
          <span className="eyebrow">Müşterilerimiz</span>
          <h2 className="mt-3 text-4xl lg:text-5xl text-balance leading-tight">
            Bizi en iyi onların sözleri anlatır
          </h2>
        </FadeIn>

        <StaggerGroup
          delay={0.1}
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-5"
        >
          {testimonials.map((t) => (
            <StaggerItem key={t.name}>
              <article className="bg-white rounded-3xl border border-line p-7 h-full flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_-30px_rgba(10,25,41,0.3)]">
                <Quote className="h-7 w-7 text-brand/20 mb-3" strokeWidth={1.5} />
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-lime text-lime"
                    />
                  ))}
                </div>
                <p className="text-ink leading-relaxed text-pretty flex-1">
                  "{t.quote}"
                </p>
                <div className="mt-6 flex items-center gap-3 pt-5 border-t border-line">
                  <Image
                    src={t.avatar}
                    alt={t.name}
                    width={44}
                    height={44}
                    className="rounded-full"
                  />
                  <div>
                    <div className="text-sm font-medium text-ink">{t.name}</div>
                    <div className="text-xs text-ink-soft">
                      {t.title} · {t.company}
                    </div>
                  </div>
                </div>
              </article>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
