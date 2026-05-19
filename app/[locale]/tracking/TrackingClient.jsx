"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Search, FileDown } from "lucide-react";
import Button from "@/components/ui/Button";
import TrackingTimeline from "@/components/TrackingTimeline";

const CODE_RE = /^LF-\d{4}-\d{4}$/;

export default function TrackingClient() {
  const t = useTranslations("tracking");
  const tCommon = useTranslations("common");
  const locale = useLocale();
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    const value = code.trim().toUpperCase();
    setError(null);
    setResult(null);
    if (!CODE_RE.test(value)) {
      setError("invalid");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`/api/tracking?code=${encodeURIComponent(value)}`, {
        cache: "no-store",
      });
      if (res.status === 404) {
        setError("notFound");
      } else if (!res.ok) {
        setError("notFound");
      } else {
        const data = await res.json();
        setResult(data);
      }
    } catch {
      setError("notFound");
    } finally {
      setLoading(false);
    }
  }

  function fmtDate(iso) {
    if (!iso) return "—";
    return new Date(iso).toLocaleDateString(locale === "en" ? "en-US" : "sq-AL", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }

  return (
    <div className="space-y-10">
      <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-line p-7 lg:p-8">
        <label htmlFor="trackingCode" className="block text-sm font-medium text-ink mb-2">
          {t("placeholder")}
        </label>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-soft" />
            <input
              id="trackingCode"
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder={t("placeholder")}
              className="w-full rounded-full border border-line bg-bg pl-11 pr-5 py-3.5 text-base font-mono tracking-wider uppercase focus:border-brand focus:bg-white focus:outline-none"
              autoComplete="off"
              spellCheck={false}
            />
          </div>
          <Button as="button" type="submit" disabled={loading} size="lg">
            {loading ? tCommon("loading") : t("button")}
          </Button>
        </div>
        {error && (
          <div className="mt-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3">
            {t(`errors.${error}`)}
          </div>
        )}
      </form>

      {result && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl border border-line p-7 lg:p-8">
            <div className="text-xs uppercase tracking-widest text-brand mb-2">
              {result.tracking_code}
            </div>
            <h2 className="text-2xl mb-6">{result.product_name}</h2>

            <dl className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <DataRow label={t("labels.analysisType")} value={t(`analysisTypes.${result.analysis_type}`)} />
              <DataRow label={t("labels.currentStatus")} value={<span className="font-medium text-brand">{t(`statuses.${result.status}`)}</span>} />
              <DataRow label={t("labels.receivedAt")} value={fmtDate(result.received_at)} />
              <DataRow
                label={result.completed_at ? t("labels.completedAt") : t("labels.estimatedCompletion")}
                value={fmtDate(result.completed_at || result.estimated_completion)}
              />
            </dl>
          </div>

          <div>
            <TrackingTimeline status={result.status} />
          </div>

          {result.status === "completed" && result.report_url && (
            <div className="bg-brand text-white rounded-3xl p-7 lg:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <div className="text-accent text-sm tracking-widest uppercase mb-1">
                  {t("reportReady")}
                </div>
                <div className="text-xl">{result.tracking_code}.pdf</div>
              </div>
              <a
                href={result.report_url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-white text-brand font-medium px-6 py-3 hover:bg-bg-alt transition-colors self-start md:self-auto"
              >
                <FileDown className="h-4 w-4" />
                {tCommon("downloadPdf")}
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function DataRow({ label, value }) {
  return (
    <div>
      <dt className="text-xs uppercase tracking-widest text-ink-soft mb-1">{label}</dt>
      <dd className="text-ink">{value}</dd>
    </div>
  );
}
