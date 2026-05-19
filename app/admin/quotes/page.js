import { cookies } from "next/headers";
import { createServerClient } from "@/lib/supabase";
import QuoteRow from "./QuoteRow";

export default async function QuotesPage() {
  const cookieStore = await cookies();
  const supabase = createServerClient(cookieStore);

  const { data: quotes } = await supabase
    .from("quote_requests")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-serif">Ofertat dhe kontaktet</h1>
        <p className="text-sm text-ink-soft mt-1">
          Të gjitha kërkesat nga forma "Merr ofertë" dhe formularët e kontaktit.
        </p>
      </header>

      <div className="bg-white rounded-3xl border border-line overflow-hidden">
        {!quotes || quotes.length === 0 ? (
          <div className="p-10 text-center text-ink-soft text-sm">
            Ende nuk ka kërkesa.
          </div>
        ) : (
          <ul>
            {quotes.map((q) => <QuoteRow key={q.id} quote={q} />)}
          </ul>
        )}
      </div>
    </div>
  );
}
