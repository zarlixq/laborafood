"use client";

import { useActionState } from "react";
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";
import { createSample } from "@/app/actions/samples";

const errorMessages = {
  missing_fields: "Plotësoni fushat e detyrueshme.",
  code_generation_failed: "Nuk u krijua dot kodi i gjurmimit. Provoni sërish.",
  insert_failed: "Ruajtja dështoi. Provoni sërish.",
};

export default function NewSampleForm() {
  const [state, action, pending] = useActionState(createSample, null);

  return (
    <form action={action} className="bg-white rounded-3xl border border-line p-7 lg:p-10 space-y-6">
      <Field label="Emri i klientit *" name="customer_name" required />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Field label="Telefoni" name="customer_phone" type="tel" />
        <Field label="Email" name="customer_email" type="email" />
      </div>
      <Field label="Emri i produktit *" name="product_name" required placeholder="P.sh. djathë i freskët" />

      <div>
        <span className="block text-sm font-medium text-ink mb-2">Lloji i analizës *</span>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {[
            { value: "microbiology", label: "Mikrobiologji" },
            { value: "chemistry", label: "Kimi" },
            { value: "both", label: "Të dyja" },
          ].map((opt) => (
            <label key={opt.value} className="cursor-pointer">
              <input
                type="radio"
                name="analysis_type"
                value={opt.value}
                required
                className="peer sr-only"
                defaultChecked={opt.value === "microbiology"}
              />
              <span className="block text-center rounded-xl border border-line bg-white px-4 py-3 text-sm transition-colors peer-checked:border-brand peer-checked:bg-brand/5 peer-checked:text-brand peer-checked:font-medium">
                {opt.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      <Field
        as="textarea"
        label="Detajet e analizës (parametrat e kërkuar)"
        name="analysis_details"
        rows={3}
        placeholder="P.sh. Salmonella, E. coli, TPC"
      />

      <Field label="Përfundimi i parashikuar" name="estimated_completion" type="date" />

      <Field
        as="textarea"
        label="Shënime të brendshme (vetëm administrata e sheh)"
        name="notes"
        rows={3}
      />

      {state?.error && (
        <div className="rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3">
          {errorMessages[state.error] || "Diçka shkoi keq."}
        </div>
      )}

      <div className="flex items-center justify-between gap-4 pt-4 border-t border-line">
        <Link
          href="/admin/samples"
          className="inline-flex items-center gap-2 text-sm text-ink-soft hover:text-ink"
        >
          <ArrowLeft className="h-4 w-4" />
          Kthehu
        </Link>
        <button
          type="submit"
          disabled={pending}
          className="inline-flex items-center gap-2 rounded-full bg-brand text-white px-5 py-2.5 text-sm font-medium hover:bg-ink transition-colors disabled:opacity-60"
        >
          {pending ? "Duke u ruajtur…" : (<><Save className="h-4 w-4" /> Ruaj dhe gjenero kodin</>)}
        </button>
      </div>
    </form>
  );
}

function Field({ as = "input", label, name, type = "text", rows, placeholder, required }) {
  const Comp = as;
  const baseCls = "block w-full rounded-xl border border-line bg-white px-4 py-3 text-ink focus:border-brand focus:outline-none";
  return (
    <label className="block">
      <span className="text-sm font-medium text-ink mb-2 block">{label}</span>
      {as === "textarea" ? (
        <textarea name={name} rows={rows} placeholder={placeholder} className={baseCls + " resize-y"} />
      ) : (
        <input name={name} type={type} placeholder={placeholder} required={required} className={baseCls} />
      )}
    </label>
  );
}
