import Link from "next/link";
import { cookies } from "next/headers";
import { createServerClient } from "@/lib/supabase";
import { FlaskConical, FileText, Plus, ArrowRight } from "lucide-react";
import StatusBadge from "@/components/admin/StatusBadge";

export default async function AdminDashboard() {
  const cookieStore = await cookies();
  const supabase = createServerClient(cookieStore);

  const [{ count: openSamples }, { count: newQuotes }, { data: recent }] = await Promise.all([
    supabase.from("samples").select("*", { count: "exact", head: true }).neq("status", "completed"),
    supabase.from("quote_requests").select("*", { count: "exact", head: true }).eq("status", "new"),
    supabase.from("samples").select("id, tracking_code, customer_name, product_name, status, received_at").order("received_at", { ascending: false }).limit(5),
  ]);

  return (
    <div className="space-y-8">
      <header className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-3xl font-serif">Paneli</h1>
          <p className="text-sm text-ink-soft mt-1">Pasqyrë e shkurtër e aktivitetit.</p>
        </div>
        <Link
          href="/admin/samples/new"
          className="inline-flex items-center gap-2 rounded-full bg-brand text-white px-5 py-2.5 text-sm font-medium hover:bg-ink transition-colors"
        >
          <Plus className="h-4 w-4" />
          Mostër e re
        </Link>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <StatCard
          icon={FlaskConical}
          label="Mostra aktive"
          value={openSamples ?? 0}
          href="/admin/samples"
        />
        <StatCard
          icon={FileText}
          label="Oferta të reja"
          value={newQuotes ?? 0}
          href="/admin/quotes"
        />
      </div>

      <section className="bg-white rounded-3xl border border-line">
        <header className="px-6 py-4 border-b border-line flex items-center justify-between">
          <h2 className="font-medium">Mostrat e fundit</h2>
          <Link href="/admin/samples" className="text-sm text-brand inline-flex items-center gap-1.5">
            Të gjitha <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </header>
        {!recent || recent.length === 0 ? (
          <div className="p-10 text-center text-ink-soft text-sm">Ende nuk ka mostra. Shtoni një të re.</div>
        ) : (
          <ul className="divide-y divide-line">
            {recent.map((s) => (
              <li key={s.id} className="px-6 py-4 flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs uppercase tracking-widest text-brand">
                      {s.tracking_code}
                    </span>
                    <StatusBadge status={s.status} />
                  </div>
                  <div className="mt-1 text-sm text-ink truncate">
                    {s.customer_name} · {s.product_name}
                  </div>
                </div>
                <Link
                  href={`/admin/samples/${s.id}`}
                  className="text-sm text-brand hover:underline flex-shrink-0"
                >
                  Detaje →
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, href }) {
  return (
    <Link
      href={href}
      className="block bg-white rounded-3xl border border-line p-6 hover:border-brand/30 transition-colors"
    >
      <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-brand-soft text-brand mb-4">
        <Icon className="h-5 w-5" />
      </div>
      <div className="text-3xl font-serif">{value}</div>
      <div className="text-sm text-ink-soft mt-1">{label}</div>
    </Link>
  );
}

