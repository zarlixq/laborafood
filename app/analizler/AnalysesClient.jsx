"use client";

import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { analyses, analysisCategories } from "@/lib/analyses";

export default function AnalysesClient() {
  const [active, setActive] = useState("all");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return analyses.filter((a) => {
      const okCat = active === "all" || a.category === active;
      const okQ =
        !q ||
        a.name.toLowerCase().includes(q) ||
        a.description.toLowerCase().includes(q) ||
        a.method.toLowerCase().includes(q);
      return okCat && okQ;
    });
  }, [active, query]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
      <aside className="lg:col-span-3 lg:sticky lg:top-32 self-start">
        <div className="relative mb-6">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-soft" />
          <input
            type="search"
            placeholder="Analiz ara…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full rounded-full border border-line bg-white pl-10 pr-4 py-3 text-sm focus:border-brand focus:outline-none"
          />
        </div>
        <div className="text-xs uppercase tracking-widest text-ink-soft mb-3">
          Kategori
        </div>
        <div className="flex flex-wrap lg:flex-col gap-2">
          <CategoryChip
            label={`Tümü (${analyses.length})`}
            active={active === "all"}
            onClick={() => setActive("all")}
          />
          {analysisCategories.map((c) => {
            const count = analyses.filter((a) => a.category === c.id).length;
            return (
              <CategoryChip
                key={c.id}
                label={`${c.label} (${count})`}
                active={active === c.id}
                onClick={() => setActive(c.id)}
              />
            );
          })}
        </div>
      </aside>

      <div className="lg:col-span-9">
        <div className="text-sm text-ink-soft mb-4">
          {filtered.length} sonuç gösteriliyor
        </div>
        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-line p-10 text-center text-ink-soft">
            Aramanıza uygun analiz bulunamadı.
          </div>
        ) : (
          <ul className="bg-white rounded-2xl border border-line divide-y divide-line">
            {filtered.map((a) => (
              <li
                key={a.id}
                className="p-5 lg:p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 hover:bg-bg-alt/50 transition-colors"
              >
                <div>
                  <div className="font-medium text-ink">{a.name}</div>
                  <div className="text-sm text-ink-soft mt-1 leading-relaxed">
                    {a.description}
                  </div>
                </div>
                <div className="flex flex-col md:items-end gap-1 flex-shrink-0">
                  <span className="inline-flex items-center rounded-full bg-brand/8 text-brand px-2.5 py-1 text-xs font-medium">
                    {a.method}
                  </span>
                  <span className="text-xs text-ink-soft">{a.duration}</span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function CategoryChip({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`text-left text-sm rounded-full px-4 py-2 transition-colors ${
        active
          ? "bg-ink text-white"
          : "bg-white border border-line text-ink hover:border-brand hover:text-brand"
      }`}
    >
      {label}
    </button>
  );
}
