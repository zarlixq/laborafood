"use client";

import { useActionState } from "react";
import Link from "next/link";
import { ArrowLeft, Save, Trash2 } from "lucide-react";
import { createBlogPost, updateBlogPost, deleteBlogPost } from "@/app/actions/blog";

const errorMessages = {
  missing_fields: "Plotësoni të paktën titullin dhe përmbajtjen në Shqip.",
  insert_failed: "Ruajtja dështoi.",
  update_failed: "Përditësimi dështoi.",
};

const CATEGORIES = [
  { value: "",            label: "— Pa kategori —" },
  { value: "microbiology", label: "Mikrobiologji" },
  { value: "chemistry",    label: "Kimi" },
  { value: "regulation",   label: "Rregullore" },
  { value: "news",         label: "Lajme" },
];

export default function BlogEditor({ post }) {
  const isNew = !post;
  const boundUpdate = post ? updateBlogPost.bind(null, post.id) : null;
  const [state, action, pending] = useActionState(
    isNew ? createBlogPost : boundUpdate,
    null
  );

  async function onDelete() {
    if (!post) return;
    if (!confirm("Të fshijmë këtë shkrim? Veprimi është i pakthyeshëm.")) return;
    await deleteBlogPost(post.id);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Link
          href="/admin/blog"
          className="inline-flex items-center gap-2 text-sm text-ink-soft hover:text-ink"
        >
          <ArrowLeft className="h-4 w-4" />
          Të gjitha shkrimet
        </Link>
        {post && (
          <button
            onClick={onDelete}
            className="inline-flex items-center gap-1.5 text-sm text-red-600 hover:text-red-700"
          >
            <Trash2 className="h-3.5 w-3.5" />
            Fshi
          </button>
        )}
      </div>

      <form action={action} className="bg-white rounded-3xl border border-line p-7 lg:p-10 space-y-6">
        <Section label="Shqip (default)">
          <Field label="Titulli (SQ) *" name="title_sq" defaultValue={post?.title_sq} required />
          <Field label="Shkurtim (SQ)" name="excerpt_sq" defaultValue={post?.excerpt_sq} as="textarea" rows={2} />
          <Field label="Përmbajtja (SQ, markdown ose tekst) *" name="content_sq" defaultValue={post?.content_sq} as="textarea" rows={10} required />
        </Section>

        <Section label="English">
          <Field label="Title (EN)" name="title_en" defaultValue={post?.title_en} />
          <Field label="Excerpt (EN)" name="excerpt_en" defaultValue={post?.excerpt_en} as="textarea" rows={2} />
          <Field label="Content (EN)" name="content_en" defaultValue={post?.content_en} as="textarea" rows={10} />
        </Section>

        <Section label="Meta">
          <Field label="URL e kapakut (cover image)" name="cover_image" defaultValue={post?.cover_image} type="url" placeholder="https://…" />

          <label className="block">
            <span className="text-sm font-medium text-ink mb-2 block">Kategoria</span>
            <select
              name="category"
              defaultValue={post?.category || ""}
              className="block w-full rounded-xl border border-line bg-white px-4 py-3 text-ink focus:border-brand focus:outline-none"
            >
              {CATEGORIES.map((c) => (
                <option key={c.value} value={c.value}>{c.label}</option>
              ))}
            </select>
          </label>

          <label className="flex items-center gap-3 pt-2 cursor-pointer">
            <input
              type="checkbox"
              name="published"
              defaultChecked={post?.published}
              className="h-4 w-4 rounded border-line text-brand focus:ring-brand"
            />
            <span className="text-sm">
              <span className="font-medium text-ink">I publikuar</span>
              <span className="block text-xs text-ink-soft">Kur është aktiv, shkrimi shfaqet publikisht.</span>
            </span>
          </label>
        </Section>

        {state?.error && (
          <div className="rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3">
            {errorMessages[state.error] || "Diçka shkoi keq."}
          </div>
        )}
        {state?.ok && (
          <div className="rounded-xl bg-accent/30 border border-accent text-ink text-sm px-4 py-3">
            U ruajt.
          </div>
        )}

        <div className="flex justify-end pt-4 border-t border-line">
          <button
            type="submit"
            disabled={pending}
            className="inline-flex items-center gap-2 rounded-full bg-brand text-white px-5 py-2.5 text-sm font-medium hover:bg-ink disabled:opacity-60"
          >
            {pending ? "Duke u ruajtur…" : (<><Save className="h-4 w-4" /> {isNew ? "Krijo" : "Ruaj ndryshimet"}</>)}
          </button>
        </div>
      </form>
    </div>
  );
}

function Section({ label, children }) {
  return (
    <fieldset className="space-y-4">
      <legend className="text-xs uppercase tracking-widest text-brand">{label}</legend>
      {children}
    </fieldset>
  );
}

function Field({ as = "input", label, name, type = "text", defaultValue, rows, placeholder, required }) {
  const baseCls = "block w-full rounded-xl border border-line bg-white px-4 py-3 text-ink focus:border-brand focus:outline-none";
  return (
    <label className="block">
      <span className="text-sm font-medium text-ink mb-2 block">{label}</span>
      {as === "textarea" ? (
        <textarea name={name} rows={rows} placeholder={placeholder} defaultValue={defaultValue || ""} required={required} className={baseCls + " resize-y font-mono text-sm"} />
      ) : (
        <input name={name} type={type} placeholder={placeholder} defaultValue={defaultValue || ""} required={required} className={baseCls} />
      )}
    </label>
  );
}
