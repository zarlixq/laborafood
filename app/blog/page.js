import Image from "next/image";
import Navbar from "@/blocks/Navbar";
import Footer from "@/blocks/Footer";
import FadeIn from "@/components/animations/FadeIn";
import { StaggerGroup, StaggerItem } from "@/components/animations/StaggerChildren";
import { Clock } from "lucide-react";
import { blogPosts } from "@/lib/blog";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Bilgi Bankası",
  description:
    "Gıda analizleri, mevzuat, akreditasyon ve metodlar hakkında üreticiye yönelik rehber içerikler.",
  path: "/blog",
});

function formatDate(iso) {
  return new Date(iso).toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function BlogPage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="pt-32 pb-12 lg:pt-40 lg:pb-16">
          <div className="container-app">
            <FadeIn className="max-w-3xl">
              <span className="eyebrow">Bilgi Bankası</span>
              <h1 className="mt-3 text-5xl lg:text-6xl text-balance leading-[1.05]">
                Lab'tan yazılar
              </h1>
              <p className="mt-6 text-lg text-ink-soft text-pretty">
                Metodlar, mevzuat ve sektörden notlar — üreticinin işine yarayacak
                içerikler.
              </p>
            </FadeIn>
          </div>
        </section>

        <section className="pb-24">
          <div className="container-app">
            <StaggerGroup
              delay={0.08}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
            >
              {blogPosts.map((p) => (
                <StaggerItem key={p.slug}>
                  <article
                    id={p.slug}
                    className="group bg-white rounded-3xl overflow-hidden border border-line h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_-30px_rgba(10,25,41,0.3)]"
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
                      <h2 className="text-xl leading-snug text-balance">
                        {p.title}
                      </h2>
                      <p className="mt-3 text-sm text-ink-soft leading-relaxed">
                        {p.excerpt}
                      </p>
                    </div>
                  </article>
                </StaggerItem>
              ))}
            </StaggerGroup>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
