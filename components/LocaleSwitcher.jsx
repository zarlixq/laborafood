"use client";

import { useLocale, useTranslations } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { useTransition } from "react";

const locales = [
  { code: "sq", label: "SQ" },
  { code: "en", label: "EN" },
];

export default function LocaleSwitcher({ compact = false }) {
  const t = useTranslations("nav");
  const active = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [pending, startTransition] = useTransition();

  function switchTo(next) {
    if (next === active || pending) return;
    startTransition(() => {
      router.replace(pathname, { locale: next });
    });
  }

  return (
    <div
      role="group"
      aria-label={t("switchLanguage")}
      className={`inline-flex items-center gap-1 rounded-full border border-line bg-white/60 backdrop-blur-sm ${compact ? "p-0.5" : "p-1"}`}
    >
      {locales.map((l) => (
        <button
          key={l.code}
          onClick={() => switchTo(l.code)}
          aria-current={l.code === active ? "true" : undefined}
          className={`px-2.5 py-1 text-xs font-medium rounded-full transition-colors ${
            l.code === active ? "bg-ink text-white" : "text-ink-soft hover:text-ink"
          }`}
        >
          {l.label}
        </button>
      ))}
    </div>
  );
}
