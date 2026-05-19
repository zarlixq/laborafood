import Link from "next/link";
import { cookies } from "next/headers";
import { createServerClient } from "@/lib/supabase";
import StatusBadge from "@/components/admin/StatusBadge";
import { Plus } from "lucide-react";

export default async function SamplesListPage() {
  const cookieStore = await cookies();
  const supabase = createServerClient(cookieStore);

  const { data: samples } = await supabase
    .from("samples")
    .select("id, tracking_code, customer_name, product_name, analysis_type, status, received_at, estimated_completion")
    .order("received_at", { ascending: false });

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-3xl font-serif">Mostrat</h1>
          <p className="text-sm text-ink-soft mt-1">
            {samples?.length ?? 0} mostra në sistem.
          </p>
        </div>
        <Link
          href="/admin/samples/new"
          className="inline-flex items-center gap-2 rounded-full bg-brand text-white px-5 py-2.5 text-sm font-medium hover:bg-ink transition-colors"
        >
          <Plus className="h-4 w-4" />
          Mostër e re
        </Link>
      </header>

      <div className="bg-white rounded-3xl border border-line overflow-hidden">
        {!samples || samples.length === 0 ? (
          <div className="p-10 text-center text-ink-soft text-sm">
            Ende nuk ka mostra.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-bg-alt text-ink-soft">
                <tr>
                  <Th>Kodi</Th>
                  <Th>Klienti</Th>
                  <Th>Produkti</Th>
                  <Th>Lloji</Th>
                  <Th>Statusi</Th>
                  <Th>Pranuar</Th>
                  <Th>Përf. parashikuar</Th>
                  <Th className="text-right pr-6"></Th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {samples.map((s) => (
                  <tr key={s.id} className="hover:bg-bg-alt/40 transition-colors">
                    <Td>
                      <span className="font-mono text-xs uppercase tracking-widest text-brand">
                        {s.tracking_code}
                      </span>
                    </Td>
                    <Td>{s.customer_name}</Td>
                    <Td className="truncate max-w-[200px]">{s.product_name}</Td>
                    <Td>{ANALYSIS_TYPE_LABEL[s.analysis_type] || s.analysis_type}</Td>
                    <Td><StatusBadge status={s.status} /></Td>
                    <Td>{formatDate(s.received_at)}</Td>
                    <Td>{formatDate(s.estimated_completion)}</Td>
                    <Td className="text-right pr-6">
                      <Link href={`/admin/samples/${s.id}`} className="text-brand hover:underline">
                        Detaje →
                      </Link>
                    </Td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

const Th = ({ children, className = "" }) => (
  <th className={`px-4 py-3 text-left font-medium text-xs uppercase tracking-widest ${className}`}>{children}</th>
);
const Td = ({ children, className = "" }) => <td className={`px-4 py-3 ${className}`}>{children}</td>;

const ANALYSIS_TYPE_LABEL = {
  microbiology: "Mikrobiologji",
  chemistry: "Kimi",
  both: "Mikrobio + Kimi",
};

function formatDate(iso) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("sq-AL", { day: "numeric", month: "short", year: "numeric" });
}
