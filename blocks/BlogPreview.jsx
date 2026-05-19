import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock } from "lucide-react";
import { blogPosts } from "@/lib/blog";
import FadeIn from "@/components/animations/FadeIn";
import { StaggerGroup, StaggerItem } from "@/components/animations/StaggerChildren";

function formatDate(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function BlogPreview() {
  return (
    <section className="section-y bg-bg-alt">
      <div className="container-app">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <FadeIn className="max-w-2xl">
            <span className="eyebrow">Bilgi Bankası</span>
            <h2 className="mt-3 text-4xl lg:text-5xl text-balance leading-tight">
              Bu hafta lab'tan
            </h2>
            <p className="mt-4 text-ink-soft text-pretty">
              Analizler, metodlar ve mevzuat hakkında üreticiye faydalı rehber içerikler.
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-brand font-medium group"
            >
              Tüm yazılar
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </FadeIn>
        </div>

        <StaggerGroup
          delay={0.1}
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-5"
        >
          {blogPosts.map((p) => (
            <StaggerItem key={p.slug}>
              <Link
                href={`/blog#${p.slug}`}
                className="group block bg-white rounded-3xl overflow-hidden border border-line h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_-30px_rgba(10,25,41,0.3)]"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={p.cover}
                    alt={p.title}
                    fill
                    sizes="(max-width:768px) 90vw, 30vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 text-xs text-ink-soft mb-3">
                    <span className="inline-flex items-center rounded-full bg-brand/8 text-brand px-2.5 py-1 font-medium">
                      {p.category}
                    </span>
                    <span>{formatDate(p.date)}</span>
                    <span className="inline-flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {p.readTime}
                    </span>
                  </div>
                  <h3 className="text-xl leading-snug text-balance">
                    {p.title}
                  </h3>
                  <p className="mt-3 text-sm text-ink-soft leading-relaxed">
                    {p.excerpt}
                  </p>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
