import Link from "next/link";
import { cookies } from "next/headers";
import { createServerClient } from "@/lib/supabase";
import { Plus, FileText } from "lucide-react";

export default async function BlogListPage() {
  const cookieStore = await cookies();
  const supabase = createServerClient(cookieStore);

  const { data: posts } = await supabase
    .from("blog_posts")
    .select("id, slug, title_sq, category, published, published_at, updated_at")
    .order("updated_at", { ascending: false });

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-3xl font-serif">Blog</h1>
          <p className="text-sm text-ink-soft mt-1">{posts?.length ?? 0} shkrime në sistem.</p>
        </div>
        <Link
          href="/admin/blog/new"
          className="inline-flex items-center gap-2 rounded-full bg-brand text-white px-5 py-2.5 text-sm font-medium hover:bg-ink"
        >
          <Plus className="h-4 w-4" />
          Shkrim i ri
        </Link>
      </header>

      <div className="bg-white rounded-3xl border border-line overflow-hidden">
        {!posts || posts.length === 0 ? (
          <div className="p-10 text-center text-ink-soft text-sm flex flex-col items-center gap-3">
            <FileText className="h-8 w-8 text-ink-soft/40" />
            Ende nuk ka shkrime.
          </div>
        ) : (
          <ul className="divide-y divide-line">
            {posts.map((p) => (
              <li key={p.id} className="px-6 py-4 flex items-center justify-between gap-4 hover:bg-bg-alt/40">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="font-medium text-ink">{p.title_sq}</span>
                    {p.published ? (
                      <span className="inline-flex items-center rounded-full bg-brand-soft text-brand px-2.5 py-0.5 text-xs font-medium">
                        I publikuar
                      </span>
                    ) : (
                      <span className="inline-flex items-center rounded-full bg-bg-alt text-ink-soft px-2.5 py-0.5 text-xs font-medium">
                        Draft
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-ink-soft mt-1">
                    /{p.slug} · {formatDate(p.updated_at)}
                  </div>
                </div>
                <Link href={`/admin/blog/${p.id}`} className="text-sm text-brand hover:underline flex-shrink-0">
                  Ndrysho →
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function formatDate(iso) {
  return new Date(iso).toLocaleDateString("sq-AL", { day: "numeric", month: "short", year: "numeric" });
}
