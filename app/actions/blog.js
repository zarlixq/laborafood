"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createServerClient } from "@/lib/supabase";

const slugify = (s) =>
  s.toLowerCase()
   .replace(/ç/g, "c").replace(/ë/g, "e").replace(/ş/g, "s").replace(/ğ/g, "g")
   .replace(/[^a-z0-9]+/g, "-")
   .replace(/^-+|-+$/g, "")
   .slice(0, 80);

function fieldsFromForm(formData) {
  const title_sq = formData.get("title_sq")?.toString().trim();
  const title_en = formData.get("title_en")?.toString().trim() || null;
  const excerpt_sq = formData.get("excerpt_sq")?.toString().trim() || null;
  const excerpt_en = formData.get("excerpt_en")?.toString().trim() || null;
  const content_sq = formData.get("content_sq")?.toString().trim();
  const content_en = formData.get("content_en")?.toString().trim() || null;
  const cover_image = formData.get("cover_image")?.toString().trim() || null;
  const category = formData.get("category")?.toString() || null;
  const published = formData.get("published") === "on";

  return {
    title_sq, title_en, excerpt_sq, excerpt_en, content_sq, content_en,
    cover_image, category, published,
  };
}

export async function createBlogPost(_prev, formData) {
  const cookieStore = await cookies();
  const supabase = createServerClient(cookieStore);

  const f = fieldsFromForm(formData);
  if (!f.title_sq || !f.content_sq) return { error: "missing_fields" };

  const base = slugify(f.title_sq) || "post";
  let slug = base;
  // ensure unique
  for (let i = 2; i < 50; i++) {
    const { data: existing } = await supabase.from("blog_posts").select("id").eq("slug", slug).maybeSingle();
    if (!existing) break;
    slug = `${base}-${i}`;
  }

  const { data, error } = await supabase
    .from("blog_posts")
    .insert({
      ...f,
      slug,
      published_at: f.published ? new Date().toISOString() : null,
    })
    .select("id")
    .single();

  if (error) {
    console.error("[createBlogPost]", error);
    return { error: "insert_failed" };
  }

  revalidatePath("/admin/blog");
  revalidatePath("/sq/blog");
  revalidatePath("/en/blog");
  redirect(`/admin/blog/${data.id}`);
}

export async function updateBlogPost(id, _prev, formData) {
  const cookieStore = await cookies();
  const supabase = createServerClient(cookieStore);

  const f = fieldsFromForm(formData);
  if (!f.title_sq || !f.content_sq) return { error: "missing_fields" };

  const { data: existing } = await supabase.from("blog_posts").select("published, published_at").eq("id", id).single();

  const updates = { ...f };
  if (f.published && !existing?.published_at) {
    updates.published_at = new Date().toISOString();
  } else if (!f.published) {
    updates.published_at = null;
  }

  const { error } = await supabase.from("blog_posts").update(updates).eq("id", id);
  if (error) {
    console.error("[updateBlogPost]", error);
    return { error: "update_failed" };
  }

  revalidatePath(`/admin/blog/${id}`);
  revalidatePath("/admin/blog");
  revalidatePath("/sq/blog");
  revalidatePath("/en/blog");
  return { ok: true };
}

export async function deleteBlogPost(id) {
  const cookieStore = await cookies();
  const supabase = createServerClient(cookieStore);
  const { error } = await supabase.from("blog_posts").delete().eq("id", id);
  if (error) {
    console.error("[deleteBlogPost]", error);
    return { error: "delete_failed" };
  }
  revalidatePath("/admin/blog");
  redirect("/admin/blog");
}
