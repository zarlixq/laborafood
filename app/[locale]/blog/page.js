import Image from "next/image";
import { getTranslations, getLocale } from "next-intl/server";
import Navbar from "@/blocks/Navbar";
import Footer from "@/blocks/Footer";
import FadeIn from "@/components/animations/FadeIn";
import { StaggerGroup, StaggerItem } from "@/components/animations/StaggerChildren";
import { fallbackPosts, getPostTitle, getPostExcerpt } from "@/lib/blog";
import { createAnonClient } from "@/lib/supabase";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "blog" });
  return buildMetadata({
    locale,
    title: t("title"),
    description: t("subtitle"),
    path: "/blog",
  });
}

async function loadPosts() {
  try {
    const supabase = createAnonClient();
    const { data } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("published", true)
      .order("published_at", { ascending: false });
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

export default async function BlogPage() {
  const t = await getTranslations("blog");
  const tc = await getTranslations("categoriesPlural");
  const locale = await getLocale();
  const posts = await loadPosts();

  return (
    <>
      <Navbar />
      <main>
        <section className="pt-32 pb-12 lg:pt-40 lg:pb-16">
          <div className="container-app">
            <FadeIn className="max-w-3xl">
              <span className="eyebrow">{t("eyebrow")}</span>
              <h1 className="mt-3 text-5xl lg:text-6xl text-balance leading-[1.05]">
                {t("title")}
              </h1>
              <p className="mt-6 text-lg text-ink-soft text-pretty">{t("subtitle")}</p>
            </FadeIn>
          </div>
        </section>

        <section className="pb-24">
          <div className="container-app">
            <StaggerGroup delay={0.08} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {posts.map((p) => (
                <StaggerItem key={p.slug}>
                  <article
                    id={p.slug}
                    className="group bg-white rounded-3xl overflow-hidden border border-line h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_-30px_rgba(15,31,26,0.3)]"
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
                      <h2 className="text-xl leading-snug text-balance">
                        {getPostTitle(p, locale)}
                      </h2>
                      <p className="mt-3 text-sm text-ink-soft leading-relaxed">
                        {getPostExcerpt(p, locale)}
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
