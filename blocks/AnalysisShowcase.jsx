"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useScroll } from "framer-motion";
import { showcase } from "@/lib/services";
import FadeIn from "@/components/animations/FadeIn";

export default function AnalysisShowcase() {
  const containerRef = useRef(null);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    return scrollYProgress.on("change", (v) => {
      const total = showcase.length;
      // Map 0..1 progress to scene index; each scene takes equal share.
      // Add small bias so last scene is reachable.
      const idx = Math.min(total - 1, Math.floor(v * total * 0.999));
      setActive((prev) => (prev !== idx ? idx : prev));
    });
  }, [scrollYProgress]);

  return (
    <section className="bg-ink text-white relative overflow-hidden">
      <div className="container-app pt-20 lg:pt-28">
        <FadeIn className="max-w-2xl">
          <span className="eyebrow text-brand-2">Süreç</span>
          <h2 className="mt-3 text-4xl lg:text-5xl text-white text-balance leading-tight">
            Numuneden sonuca — bir analizin yolculuğu
          </h2>
          <p className="mt-4 text-white/70 text-pretty">
            Her sahnede laboratuvarda olup biteni adım adım keşfedin.
          </p>
        </FadeIn>
      </div>

      {/* Desktop: sticky scroll storytelling */}
      <div ref={containerRef} className="hidden lg:block relative" style={{ height: `${showcase.length * 100}vh` }}>
        <div className="sticky top-0 h-screen flex items-center">
          <div className="container-app grid grid-cols-12 gap-12 w-full">
            <div className="col-span-7 relative aspect-[4/5] max-h-[78vh] rounded-3xl overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0"
                >
                  <Image
                    src={showcase[active].image}
                    alt={showcase[active].alt}
                    fill
                    sizes="50vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/40 to-transparent" />
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="col-span-5 flex flex-col justify-center gap-6">
              <div className="flex gap-2">
                {showcase.map((_, i) => (
                  <span
                    key={i}
                    className={`h-1 flex-1 rounded-full transition-all duration-500 ${
                      i === active ? "bg-brand-2" : "bg-white/15"
                    }`}
                  />
                ))}
              </div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                >
                  <span className="text-brand-2 text-sm tracking-widest uppercase">
                    Sahne {String(active + 1).padStart(2, "0")} / {String(showcase.length).padStart(2, "0")}
                  </span>
                  <h3 className="mt-3 text-4xl lg:text-5xl text-white leading-tight">
                    {showcase[active].title}
                  </h3>
                  <p className="mt-5 text-lg text-white/75 leading-relaxed text-pretty">
                    {showcase[active].body}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile: stacked scenes */}
      <div className="lg:hidden container-app py-12 space-y-16">
        {showcase.map((scene, i) => (
          <FadeIn key={i} className="space-y-5">
            <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden">
              <Image
                src={scene.image}
                alt={scene.alt}
                fill
                sizes="90vw"
                className="object-cover"
              />
            </div>
            <div>
              <span className="text-brand-2 text-xs tracking-widest uppercase">
                Sahne {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-2 text-3xl text-white leading-tight">{scene.title}</h3>
              <p className="mt-3 text-white/75 leading-relaxed">{scene.body}</p>
            </div>
          </FadeIn>
        ))}
      </div>

      <div className="h-20" />
    </section>
  );
}
