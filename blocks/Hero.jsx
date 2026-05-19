"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ShieldCheck, ArrowRight, Check } from "lucide-react";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import { heroStats } from "@/lib/stats";

const floatingCards = [
  {
    text: "Salmonella analizi — Negatif",
    accent: "text-green-600",
    bg: "bg-white",
    icon: "🧫",
    pos: "top-[8%] -left-4 md:-left-8 lg:-left-12",
    delay: 0,
  },
  {
    text: "Rapor hazırlandı",
    accent: "text-brand",
    bg: "bg-white",
    icon: "📊",
    pos: "top-[42%] -right-4 md:-right-6",
    delay: 0.8,
  },
  {
    text: "pH: 6.4 — Normal aralıkta",
    accent: "text-ink",
    bg: "bg-lime/40",
    icon: "⚗️",
    pos: "bottom-[10%] left-[6%]",
    delay: 1.6,
  },
];

export default function Hero() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -40]);

  return (
    <section
      ref={containerRef}
      className="relative pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden"
    >
      <div className="blob bg-brand-2/40 w-[600px] h-[600px] -top-32 -right-32" />
      <div className="blob bg-lime/30 w-[400px] h-[400px] bottom-0 -left-32" />

      <div className="container-app relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          <motion.div
            style={{ y: textY }}
            className="lg:col-span-7"
          >
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge tone="brand">
                <ShieldCheck className="h-3.5 w-3.5" />
                ISO/IEC 17025 Akredite Laboratuvar
              </Badge>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="mt-6 text-balance text-[clamp(2.5rem,6vw,5.5rem)] leading-[1.02] font-medium text-ink"
            >
              Gıdanızın güvenliği,{" "}
              <span className="italic text-brand">bilimin diliyle.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-6 max-w-xl text-lg lg:text-xl text-ink-soft text-pretty leading-relaxed"
            >
              Mikrobiyolojik ve kimyasal analizlerde 20 yılı aşkın deneyimle,
              üreticinin yanında, tüketicinin güvencesinde.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="mt-8 flex flex-wrap gap-3"
            >
              <Button href="/teklif" size="lg">
                Teklif Al
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button href="/analizler" variant="ghost" size="lg">
                Analizleri İncele
              </Button>
            </motion.div>

            <motion.ul
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.45 }}
              className="mt-10 flex flex-wrap gap-x-6 gap-y-2"
            >
              {heroStats.map((s) => (
                <li key={s.label} className="flex items-center gap-2 text-sm text-ink-soft">
                  <Check className="h-4 w-4 text-brand" />
                  {s.label}
                </li>
              ))}
            </motion.ul>
          </motion.div>

          <motion.div
            style={{ y: imageY }}
            className="lg:col-span-5 relative"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="relative aspect-[4/5] w-full max-w-md mx-auto lg:max-w-none rounded-3xl overflow-hidden shadow-[0_30px_80px_-30px_rgba(10,25,41,0.35)]"
            >
              <Image
                src="https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=1600&q=80&auto=format"
                alt="Laboratuvarda analiz yapan bilim insanı"
                fill
                priority
                sizes="(max-width: 1024px) 90vw, 40vw"
                className="object-cover"
              />
            </motion.div>

            {floatingCards.map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{
                  opacity: 1,
                  y: [0, -10, 0],
                }}
                transition={{
                  opacity: { duration: 0.6, delay: 0.6 + i * 0.2 },
                  y: {
                    duration: 4 + i,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: card.delay,
                  },
                }}
                className={`absolute ${card.pos} ${card.bg} backdrop-blur-md rounded-2xl border border-line px-4 py-3 shadow-[0_12px_30px_-12px_rgba(10,25,41,0.25)] text-sm flex items-center gap-2 max-w-[220px]`}
              >
                <span className="text-base">{card.icon}</span>
                <span className={`${card.accent} font-medium`}>{card.text}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="hidden lg:flex justify-center mt-16"
        >
          <div className="flex flex-col items-center gap-2 text-ink-soft">
            <span className="text-xs tracking-widest uppercase">Keşfet</span>
            <div className="scroll-cue" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
