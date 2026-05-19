import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { createServerClient } from "@/lib/supabase";
import SampleEditor from "./SampleEditor";

export default async function SampleDetailPage({ params, searchParams }) {
  const { id } = await params;
  const sp = await searchParams;
  const justCreated = sp?.created === "1";

  const cookieStore = await cookies();
  const supabase = createServerClient(cookieStore);

  const { data: sample } = await supabase
    .from("samples")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (!sample) notFound();

  return (
    <div className="space-y-6">
      <Link
        href="/admin/samples"
        className="inline-flex items-center gap-2 text-sm text-ink-soft hover:text-ink"
      >
        <ArrowLeft className="h-4 w-4" />
        Të gjitha mostrat
      </Link>
      <SampleEditor sample={sample} justCreated={justCreated} />
    </div>
  );
}
