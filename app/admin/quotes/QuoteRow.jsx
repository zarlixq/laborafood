"use client";

import { useState, useTransition } from "react";
import { Mail, Phone, ChevronDown, ChevronUp } from "lucide-react";
import { updateQuoteStatus } from "@/app/actions/quotes-admin";

const STATUSES = [
  { value: "new",       label: "I ri",        cls: "bg-accent/30 text-ink border-accent" },
  { value: "contacted", label: "Kontaktuar",  cls: "bg-brand-soft text-brand border-brand-soft" },
  { value: "closed",    label: "Mbyllur",     cls: "bg-bg-alt text-ink-soft border-line" },
];

export default function QuoteRow({ quote }) {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState(quote.status);
  const [pending, startTransition] = useTransition();

  const cur = STATUSES.find((s) => s.value === status) || STATUSES[0];

  function changeStatus(next) {
    setStatus(next);
    startTransition(() => updateQuoteStatus(quote.id, next));
  }

  return (
    <li className="border-b border-line last:border-b-0">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-4 px-6 py-4 hover:bg-bg-alt/50 transition-colors text-left"
      >
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="font-medium text-ink">{quote.company_name}</span>
            <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${cur.cls}`}>
              {cur.label}
            </span>
            {quote.source === "website-contact" && (
              <span className="text-xs text-ink-soft">(kontakt)</span>
            )}
          </div>
          <div className="mt-1 text-sm text-ink-soft truncate">
            {quote.contact_person} · {quote.email}
          </div>
        </div>
        <div className="text-xs text-ink-soft flex-shrink-0">
          {formatDate(quote.created_at)}
        </div>
        {open ? <ChevronUp className="h-4 w-4 text-ink-soft" /> : <ChevronDown className="h-4 w-4 text-ink-soft" />}
      </button>

      {open && (
        <div className="bg-bg-alt/40 px-6 py-5 space-y-4 border-t border-line">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <Info label="Kontakt">
              <div className="flex items-center gap-2"><Mail className="h-3.5 w-3.5 text-brand" /> <a href={`mailto:${quote.email}`} className="hover:text-brand">{quote.email}</a></div>
              {quote.phone && <div className="flex items-center gap-2 mt-1"><Phone className="h-3.5 w-3.5 text-brand" /> {quote.phone}</div>}
            </Info>
            <Info label="Produkti">{quote.product_type || "—"}</Info>
          </div>

          {quote.analyses_needed?.length > 0 && (
            <Info label="Analizat e kërkuara">
              <ul className="flex flex-wrap gap-1.5 mt-1">
                {quote.analyses_needed.map((a) => (
                  <li key={a} className="text-xs bg-white border border-line rounded-full px-2.5 py-1">
                    {a}
                  </li>
                ))}
              </ul>
            </Info>
          )}

          {quote.message && (
            <Info label="Mesazhi">
              <p className="whitespace-pre-wrap text-sm leading-relaxed mt-1">{quote.message}</p>
            </Info>
          )}

          <div className="pt-3 border-t border-line flex items-center gap-3">
            <span className="text-xs uppercase tracking-widest text-ink-soft">Statusi</span>
            <select
              value={status}
              onChange={(e) => changeStatus(e.target.value)}
              disabled={pending}
              className="rounded-full border border-line bg-white px-3 py-1.5 text-xs focus:border-brand focus:outline-none"
            >
              {STATUSES.map((s) => (
                <option key={s.value} value={s.value}>{s.label}</option>
              ))}
            </select>
            {pending && <span className="text-xs text-ink-soft">Duke u ruajtur…</span>}
          </div>
        </div>
      )}
    </li>
  );
}

function Info({ label, children }) {
  return (
    <div>
      <div className="text-xs uppercase tracking-widest text-ink-soft">{label}</div>
      <div className="mt-0.5 text-ink">{children}</div>
    </div>
  );
}

function formatDate(iso) {
  return new Date(iso).toLocaleString("sq-AL", {
    day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit",
  });
}
