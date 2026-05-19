import CountUp from "@/components/animations/CountUp";
import { stats } from "@/lib/stats";
import FadeIn from "@/components/animations/FadeIn";

export default function Stats() {
  return (
    <section className="bg-brand relative overflow-hidden">
      <div className="blob bg-brand-2/30 w-[500px] h-[500px] -top-20 -right-32" />
      <div className="container-app section-y relative">
        <FadeIn className="max-w-2xl">
          <span className="eyebrow text-brand-2">Sayılarla biz</span>
          <h2 className="mt-3 text-4xl lg:text-5xl text-white text-balance leading-tight">
            20 yılda büyük bir güven havuzu
          </h2>
        </FadeIn>

        <div className="mt-14 grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          {stats.map((s, i) => (
            <FadeIn key={s.label} delay={i * 0.08}>
              <div className="border-l border-white/15 pl-5 lg:pl-6">
                <div className="font-serif text-5xl lg:text-7xl text-white leading-none tracking-tight">
                  <CountUp
                    to={s.value}
                    suffix={s.suffix}
                    decimals={s.decimals || 0}
                    separator={s.separator || ""}
                  />
                </div>
                <div className="mt-3 text-sm text-white/70 uppercase tracking-widest">
                  {s.label}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
