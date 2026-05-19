import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { accreditations } from "@/lib/accreditation";
import FadeIn from "@/components/animations/FadeIn";
import { StaggerGroup, StaggerItem } from "@/components/animations/StaggerChildren";

export default function Accreditation() {
  return (
    <section className="section-y">
      <div className="container-app">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <FadeIn className="lg:col-span-5 lg:sticky lg:top-32">
            <span className="eyebrow">Akreditasyon</span>
            <h2 className="mt-3 text-4xl lg:text-5xl text-balance leading-tight">
              Uluslararası standartlarda,{" "}
              <span className="italic text-brand">güvenle.</span>
            </h2>
            <p className="mt-5 text-ink-soft text-pretty leading-relaxed">
              ISO/IEC 17025 kapsamında TÜRKAK tarafından akrediteyiz; T.C. Tarım
              ve Orman Bakanlığı ile T.C. Sağlık Bakanlığı yetkili
              laboratuvarları arasındayız. Her metod, ölçülebilirlik ve
              izlenebilirlik standartlarına göre belgelidir.
            </p>
            <Link
              href="/akreditasyon"
              className="mt-7 inline-flex items-center gap-2 text-brand font-medium group"
            >
              Belgelerimizi görüntüle
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </FadeIn>

          <StaggerGroup
            delay={0.08}
            className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-4"
          >
            {accreditations.map((a) => (
              <StaggerItem key={a.name}>
                <div className="group bg-white rounded-2xl border border-line p-5 h-full flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-1 hover:border-brand/30 hover:shadow-[0_18px_40px_-25px_rgba(15,76,117,0.35)]">
                  <div className="relative h-20 w-full mb-4">
                    <Image
                      src={a.logo}
                      alt={a.name}
                      fill
                      className="object-contain"
                      sizes="200px"
                    />
                  </div>
                  <div className="text-sm font-semibold text-ink">{a.name}</div>
                  <div className="text-xs text-brand mt-1">{a.code}</div>
                  <div className="text-xs text-ink-soft mt-2 leading-relaxed">
                    {a.description}
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </div>
    </section>
  );
}
