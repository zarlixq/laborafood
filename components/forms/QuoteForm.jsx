"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { ArrowRight, ArrowLeft, Check, CheckCircle2, Send } from "lucide-react";
import { Input, Textarea } from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { analyses, analysisCategories, getAnalysisName } from "@/lib/analyses";
import { submitQuoteRequest } from "@/app/actions/quote";

export default function QuoteForm() {
  const t  = useTranslations("quotePage");
  const tc = useTranslations("categories");
  const locale = useLocale();

  const [step, setStep] = useState(1);
  const [pending, setPending] = useState(false);
  const [result, setResult] = useState(null);
  const [form, setForm] = useState({
    company_name: "",
    contact_person: "",
    email: "",
    phone: "",
    product_type: "",
    analyses_needed: [],
    message: "",
    privacy_accepted: false,
  });

  const STEPS = [
    { id: 1, label: t("stepper.step1") },
    { id: 2, label: t("stepper.step2") },
    { id: 3, label: t("stepper.step3") },
  ];

  function update(k, v) { setForm((s) => ({ ...s, [k]: v })); }
  function toggleAnalysis(name) {
    setForm((s) =>
      s.analyses_needed.includes(name)
        ? { ...s, analyses_needed: s.analyses_needed.filter((n) => n !== name) }
        : { ...s, analyses_needed: [...s.analyses_needed, name] }
    );
  }
  function nextStep(e) { e.preventDefault(); if (step < STEPS.length) setStep(step + 1); }
  function prevStep() { if (step > 1) setStep(step - 1); }

  async function handleSubmit(e) {
    e.preventDefault();
    setPending(true);
    setResult(null);
    const res = await submitQuoteRequest(form);
    setPending(false);
    setResult(res);
  }

  if (result?.ok) return <SuccessScreen t={t} />;

  return (
    <div className="bg-white rounded-3xl border border-line p-7 lg:p-10">
      <Stepper steps={STEPS} current={step} />

      <form onSubmit={step === STEPS.length ? handleSubmit : nextStep} className="mt-10 space-y-6">
        {step === 1 && (
          <div className="space-y-5">
            <h2 className="text-2xl">{t("step1Title")}</h2>
            <Input
              id="company_name"
              label={t("fields.companyName")}
              required
              value={form.company_name}
              onChange={(e) => update("company_name", e.target.value)}
              placeholder={t("fields.companyNamePlaceholder")}
            />
            <Input
              id="product_type"
              label={t("fields.productType")}
              value={form.product_type}
              onChange={(e) => update("product_type", e.target.value)}
              placeholder={t("fields.productTypePlaceholder")}
            />
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <h2 className="text-2xl">{t("step2Title")}</h2>
            <div>
              <div className="text-sm font-medium text-ink mb-3">
                {t("fields.analysesLabel")}
                <span className="ml-2 text-xs text-ink-soft font-normal">
                  ({form.analyses_needed.length} {t("fields.analysesSelected")})
                </span>
              </div>
              <div className="space-y-5">
                {analysisCategories.map((cat) => (
                  <fieldset key={cat.id}>
                    <legend className="text-xs uppercase tracking-widest text-ink-soft mb-2">
                      {tc(cat.id)}
                    </legend>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {analyses
                        .filter((a) => a.category === cat.id)
                        .map((a) => {
                          const name = getAnalysisName(a, locale);
                          const checked = form.analyses_needed.includes(name);
                          return (
                            <label
                              key={a.id}
                              className={`flex items-start gap-3 rounded-xl border p-3 cursor-pointer transition-colors ${
                                checked ? "border-brand bg-brand/5" : "border-line bg-white hover:border-brand/40"
                              }`}
                            >
                              <span
                                className={`mt-0.5 inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded border transition-colors ${
                                  checked ? "bg-brand border-brand text-white" : "border-line bg-white"
                                }`}
                              >
                                {checked && <Check className="h-3 w-3" strokeWidth={3} />}
                              </span>
                              <span className="text-sm">
                                <span className="block font-medium text-ink">{name}</span>
                                <span className="block text-xs text-ink-soft mt-0.5">
                                  {a.method}
                                </span>
                              </span>
                              <input
                                type="checkbox"
                                className="sr-only"
                                checked={checked}
                                onChange={() => toggleAnalysis(name)}
                              />
                            </label>
                          );
                        })}
                    </div>
                  </fieldset>
                ))}
              </div>
            </div>
            <Textarea
              id="message"
              label={t("fields.message")}
              placeholder={t("fields.messagePlaceholder")}
              value={form.message}
              onChange={(e) => update("message", e.target.value)}
            />
          </div>
        )}

        {step === 3 && (
          <div className="space-y-5">
            <h2 className="text-2xl">{t("step3Title")}</h2>
            <Input
              id="contact_person"
              label={t("fields.contactPerson")}
              required
              value={form.contact_person}
              onChange={(e) => update("contact_person", e.target.value)}
              placeholder={t("fields.contactPersonPlaceholder")}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Input
                id="email"
                type="email"
                label={t("fields.email")}
                required
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                placeholder={t("fields.emailPlaceholder")}
              />
              <Input
                id="phone"
                type="tel"
                label={t("fields.phone")}
                value={form.phone}
                onChange={(e) => update("phone", e.target.value)}
                placeholder={t("fields.phonePlaceholder")}
              />
            </div>

            <label className="flex items-start gap-3 cursor-pointer pt-2">
              <input
                type="checkbox"
                checked={form.privacy_accepted}
                onChange={(e) => update("privacy_accepted", e.target.checked)}
                className="mt-1 h-4 w-4 rounded border-line text-brand focus:ring-brand"
                required
              />
              <span className="text-sm text-ink-soft">
                {t("fields.privacyConsent")}{" "}
                <a href="#" className="text-brand underline">
                  {t("fields.privacyReadMore")}
                </a>
              </span>
            </label>

            {result && !result.ok && (
              <div className="rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3">
                {t(`errors.${result.error}`)}
              </div>
            )}
          </div>
        )}

        <div className="flex items-center justify-between gap-4 pt-6 mt-2 border-t border-line">
          {step > 1 ? (
            <Button as="button" type="button" variant="ghost" onClick={prevStep}>
              <ArrowLeft className="h-4 w-4" />
              {t("back")}
            </Button>
          ) : <span />}
          {step < STEPS.length ? (
            <Button as="button" type="submit">
              {t("next")}
              <ArrowRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button as="button" type="submit" disabled={pending}>
              {pending ? t("submitting") : t("submit")}
              {!pending && <Send className="h-4 w-4" />}
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}

function Stepper({ steps, current }) {
  return (
    <ol className="flex items-center gap-2 md:gap-4">
      {steps.map((s, i) => {
        const done = current > s.id;
        const active = current === s.id;
        return (
          <li key={s.id} className="flex items-center gap-2 md:gap-3 flex-1">
            <div
              className={`inline-flex h-8 w-8 md:h-9 md:w-9 flex-shrink-0 items-center justify-center rounded-full text-xs md:text-sm font-medium transition-colors ${
                done ? "bg-brand text-white" : active ? "bg-ink text-white" : "bg-bg-alt text-ink-soft border border-line"
              }`}
            >
              {done ? <Check className="h-4 w-4" /> : s.id}
            </div>
            <div className="hidden md:block">
              <div className={`text-sm ${active || done ? "text-ink font-medium" : "text-ink-soft"}`}>
                {s.label}
              </div>
            </div>
            {i < steps.length - 1 && (
              <div className={`h-px flex-1 transition-colors ${done ? "bg-brand" : "bg-line"}`} />
            )}
          </li>
        );
      })}
    </ol>
  );
}

function SuccessScreen({ t }) {
  return (
    <div className="bg-white rounded-3xl border border-line p-10 lg:p-14 text-center">
      <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-accent/50 text-ink mb-5">
        <CheckCircle2 className="h-9 w-9" />
      </div>
      <h2 className="text-4xl">{t("successTitle")}</h2>
      <p className="mt-4 text-lg text-ink-soft text-pretty max-w-xl mx-auto">
        {t("successBody")}
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button href="/">{t("successHome")}</Button>
        <Button href="/analyses" variant="ghost">{t("successAnalyses")}</Button>
      </div>
    </div>
  );
}
