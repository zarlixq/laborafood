"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Send, CheckCircle2 } from "lucide-react";
import { Input, Textarea } from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { submitContactMessage } from "@/app/actions/quote";

export default function ContactForm() {
  const t = useTranslations("contactPage.form");
  const tErr = useTranslations("quotePage.errors");
  const [pending, setPending] = useState(false);
  const [result, setResult] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setPending(true);
    setResult(null);
    const fd = new FormData(e.currentTarget);
    const res = await submitContactMessage({
      name: fd.get("name"),
      email: fd.get("email"),
      message: fd.get("message"),
    });
    setPending(false);
    setResult(res);
    if (res.ok) e.currentTarget.reset();
  }

  if (result?.ok) {
    return (
      <div className="bg-white rounded-3xl border border-line p-10 text-center">
        <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-accent/50 text-ink mb-4">
          <CheckCircle2 className="h-7 w-7" />
        </div>
        <h2 className="text-3xl">{t("successTitle")}</h2>
        <p className="mt-3 text-ink-soft">{t("successBody")}</p>
        <Button variant="ghost" className="mt-6" onClick={() => setResult(null)} as="button">
          {t("newMessage")}
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-line p-7 lg:p-8 space-y-5">
      <Input id="name" name="name" label={t("name")} placeholder={t("namePlaceholder")} required />
      <Input id="email" name="email" type="email" label={t("email")} placeholder={t("emailPlaceholder")} required />
      <Textarea id="message" name="message" label={t("message")} placeholder={t("messagePlaceholder")} required />

      {result && !result.ok && (
        <div className="rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3">
          {tErr(result.error)}
        </div>
      )}

      <div className="flex items-center justify-between gap-4 pt-2">
        <p className="text-xs text-ink-soft">{t("privacy")}</p>
        <Button as="button" type="submit" disabled={pending}>
          {pending ? t("submitting") : t("submit")}
          {!pending && <Send className="h-4 w-4" />}
        </Button>
      </div>
    </form>
  );
}
