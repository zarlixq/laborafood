import BlogEditor from "@/components/admin/BlogEditor";

export default function NewBlogPostPage() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-serif">Shkrim i ri</h1>
        <p className="text-sm text-ink-soft mt-1">Krijo një shkrim të ri për blogun publik.</p>
      </header>
      <BlogEditor />
    </div>
  );
}
