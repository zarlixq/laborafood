"use client";

import { useActionState } from "react";
import { LogIn, Leaf } from "lucide-react";
import { signIn } from "@/app/actions/auth";

const errorMessages = {
  missing: "Plotësoni emailin dhe fjalëkalimin.",
  invalid_credentials: "Email ose fjalëkalim i pavlefshëm.",
  not_admin: "Ky llogari nuk ka qasje administrative.",
};

export default function LoginForm() {
  const [state, action, pending] = useActionState(signIn, null);

  return (
    <form action={action} className="bg-white rounded-3xl border border-line p-8 lg:p-10 w-full max-w-md">
      <div className="flex items-center gap-3 mb-6">
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-brand text-accent">
          <Leaf className="h-5 w-5" />
        </span>
        <div>
          <div className="font-serif text-xl font-semibold">LaboraFood</div>
          <div className="text-xs text-ink-soft">Panel administrativ</div>
        </div>
      </div>

      <h1 className="text-2xl font-serif mb-1">Hyrja administrative</h1>
      <p className="text-sm text-ink-soft mb-6">
        Hyni me llogarinë tuaj të administratorit për të menaxhuar mostrat, blogun dhe ofertat.
      </p>

      <div className="space-y-4">
        <label className="block">
          <span className="text-sm font-medium text-ink mb-2 block">Email</span>
          <input
            type="email"
            name="email"
            required
            autoComplete="email"
            className="block w-full rounded-xl border border-line bg-white px-4 py-3 text-ink focus:border-brand focus:outline-none"
            placeholder="admin@laborafood.com"
          />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-ink mb-2 block">Fjalëkalimi</span>
          <input
            type="password"
            name="password"
            required
            autoComplete="current-password"
            className="block w-full rounded-xl border border-line bg-white px-4 py-3 text-ink focus:border-brand focus:outline-none"
            placeholder="••••••••"
          />
        </label>
      </div>

      {state?.error && (
        <div className="mt-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3">
          {errorMessages[state.error] || "Diçka shkoi keq."}
        </div>
      )}

      <button
        type="submit"
        disabled={pending}
        className="mt-6 w-full inline-flex items-center justify-center gap-2 rounded-full bg-brand text-white px-5 py-3 font-medium hover:bg-ink transition-colors disabled:opacity-60"
      >
        {pending ? "Duke u hyrë…" : (<><LogIn className="h-4 w-4" /> Hyr</>)}
      </button>
    </form>
  );
}
