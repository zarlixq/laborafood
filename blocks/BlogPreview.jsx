import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { getTranslations, getLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { fallbackPosts, getPostTitle, getPostExcerpt } from "@/lib/blog";
import { createAnonClient } from "@/lib/supabase";
import FadeIn from "@/components/animations/FadeIn";
import { StaggerGroup, StaggerItem } from "@/components/animations/StaggerChildren";

async function loadPosts() {
  try {
    const supabase = createAnonClient();
    const { data } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("published", true)
      .order("published_at", { ascending: false })
      .limit(3);
    if (data && data.length > 0) return data;
  } catch {}
  return fallbackPosts;
}

function formatDate(iso, locale) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString(locale === "en" ? "en-US" : "sq-AL", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function BlogPreview() {
  const t = await getTranslations("blogSection");
  const tc = await getTranslations("categoriesPlural");
  const locale = await getLocale();
  const posts = await loadPosts();

  return (
    <section className="section-y bg-bg-alt">
      <div className="container-app">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <FadeIn className="max-w-2xl">
            <span className="eyebrow">{t("eyebrow")}</span>
            <h2 className="mt-3 text-4xl lg:text-5xl text-balance leading-tight">
              {t("title")}
            </h2>
            <p className="mt-4 text-ink-soft text-pretty">{t("subtitle")}</p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <Link href="/blog" className="inline-flex items-center gap-2 text-brand font-medium group">
              {t("allPosts")}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </FadeIn>
        </div>

        <StaggerGroup delay={0.1} className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-5">
          {posts.map((p) => (
            <StaggerItem key={p.slug}>
              <Link
                href={`/blog#${p.slug}`}
                className="group block bg-white rounded-3xl overflow-hidden border border-line h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_-30px_rgba(15,31,26,0.3)]"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  {p.cover_image && (
                    <Image
                      src={p.cover_image}
                      alt=""
                      fill
                      sizes="(max-width:768px) 90vw, 30vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  )}
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 text-xs text-ink-soft mb-3">
                    {p.category && (
                      <span className="inline-flex items-center rounded-full bg-brand/8 text-brand px-2.5 py-1 font-medium">
                        {tc(p.category)}
                      </span>
                    )}
                    <span>{formatDate(p.published_at, locale)}</span>
                  </div>
                  <h3 className="text-xl leading-snug text-balance">
                    {getPostTitle(p, locale)}
                  </h3>
                  <p className="mt-3 text-sm text-ink-soft leading-relaxed">
                    {getPostExcerpt(p, locale)}
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
