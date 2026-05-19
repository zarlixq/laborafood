import Image from "next/image";
import Marquee from "@/components/animations/Marquee";
import FadeIn from "@/components/animations/FadeIn";
import { trustLogos } from "@/lib/motion";

export default function TrustBar() {
  return (
    <section className="py-14 lg:py-16 bg-bg-alt border-y border-line">
      <div className="container-app">
        <FadeIn>
          <p className="text-center text-sm text-ink-soft mb-8 tracking-wide">
            Türkiye'nin önde gelen gıda üreticileri bize güveniyor
          </p>
        </FadeIn>
        <Marquee>
          {trustLogos.map((logo) => (
            <div
              key={logo.id}
              className="flex-shrink-0 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                width={180}
                height={70}
                className="h-12 w-auto object-contain"
              />
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
