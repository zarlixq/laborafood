import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { createServerClient } from "@/lib/supabase";
import BlogEditor from "@/components/admin/BlogEditor";

export default async function EditBlogPostPage({ params }) {
  const { id } = await params;
  const cookieStore = await cookies();
  const supabase = createServerClient(cookieStore);

  const { data: post } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (!post) notFound();

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-serif">Ndrysho shkrimin</h1>
        <p className="text-sm text-ink-soft mt-1 truncate">{post.title_sq}</p>
      </header>
      <BlogEditor post={post} />
    </div>
  );
}
