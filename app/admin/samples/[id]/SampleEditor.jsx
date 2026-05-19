"use client";

import { useState, useTransition } from "react";
import { Upload, Save, Trash2, Copy, Check, ExternalLink } from "lucide-react";
import { updateSampleStatus, updateSample, uploadSampleReport, deleteSample } from "@/app/actions/samples";
import StatusBadge, { STATUS_LABELS } from "@/components/admin/StatusBadge";

const STATUSES = ["received", "preparing", "analyzing", "verifying", "completed"];

export default function SampleEditor({ sample, justCreated }) {
  const [status, setStatus] = useState(sample.status);
  const [statusSaving, setStatusSaving] = useState(false);
  const [reportUrl, setReportUrl] = useState(sample.report_url);
  const [estCompletion, setEstCompletion] = useState(sample.estimated_completion || "");
  const [notes, setNotes] = useState(sample.notes || "");
  const [savedField, setSavedField] = useState(null);
  const [copied, setCopied] = useState(false);
  const [uploadMsg, setUploadMsg] = useState(null);
  const [pending, startTransition] = useTransition();

  async function onStatusChange(next) {
    setStatusSaving(true);
    setStatus(next);
    const res = await updateSampleStatus(sample.id, next);
    setStatusSaving(false);
    if (res.error) setStatus(sample.status);
  }

  async function saveField(field, value) {
    startTransition(async () => {
      const res = await updateSample(sample.id, { [field]: value || null });
      if (!res.error) {
        setSavedField(field);
        setTimeout(() => setSavedField(null), 1500);
      }
    });
  }

  async function onFileChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadMsg("Duke u ngarkuar…");
    const fd = new FormData();
    fd.append("file", file);
    const res = await uploadSampleReport(sample.id, fd);
    if (res.ok) {
      setReportUrl(res.url);
      setUploadMsg("U ngarkua me sukses.");
    } else {
      setUploadMsg("Ngarkimi dështoi.");
    }
  }

  function copyCode() {
    navigator.clipboard.writeText(sample.tracking_code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  async function onDelete() {
    if (!confirm("Të fshijmë këtë mostër? Veprimi është i pakthyeshëm.")) return;
    await deleteSample(sample.id);
  }

  return (
    <div className="space-y-6">
      {justCreated && (
        <div className="bg-accent/30 border border-accent text-ink rounded-2xl p-5 flex items-center justify-between gap-4">
          <div>
            <div className="text-xs uppercase tracking-widest text-brand">Mostra u krijua</div>
            <div className="mt-1 text-lg font-mono">{sample.tracking_code}</div>
          </div>
          <button
            onClick={copyCode}
            className="inline-flex items-center gap-2 rounded-full bg-white text-ink px-4 py-2 text-sm font-medium hover:bg-bg-alt"
          >
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            {copied ? "U kopjua" : "Kopjo kodin"}
          </button>
        </div>
      )}

      {/* Header */}
      <div className="bg-white rounded-3xl border border-line p-7">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <div className="flex items-center gap-3">
              <span className="font-mono text-sm uppercase tracking-widest text-brand">
                {sample.tracking_code}
              </span>
              <StatusBadge status={status} />
            </div>
            <h1 className="mt-2 text-3xl font-serif">{sample.product_name}</h1>
            <div className="mt-1 text-sm text-ink-soft">
              {sample.customer_name}
              {sample.customer_email && <> · {sample.customer_email}</>}
              {sample.customer_phone && <> · {sample.customer_phone}</>}
            </div>
          </div>

          <div className="text-right">
            <label className="text-xs uppercase tracking-widest text-ink-soft block mb-1">Statusi</label>
            <select
              value={status}
              onChange={(e) => onStatusChange(e.target.value)}
              disabled={statusSaving}
              className="rounded-full border border-line bg-white px-4 py-2 text-sm focus:border-brand focus:outline-none"
            >
              {STATUSES.map((s) => (
                <option key={s} value={s}>{STATUS_LABELS[s]}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Details grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card title="Lloji i analizës">
          {ANALYSIS_TYPE_LABEL[sample.analysis_type]}
        </Card>
        <Card title="Detajet e analizës">
          {sample.analysis_details || <em className="text-ink-soft">—</em>}
        </Card>
        <Card title="Pranuar më">
          {formatDate(sample.received_at)}
        </Card>
        <Card title="Përfunduar më">
          {sample.completed_at ? formatDate(sample.completed_at) : <em className="text-ink-soft">—</em>}
        </Card>
      </div>

      {/* Editable: estimated completion */}
      <div className="bg-white rounded-3xl border border-line p-6">
        <label className="block">
          <span className="text-sm font-medium text-ink">Përfundimi i parashikuar</span>
          <div className="mt-2 flex gap-3 items-center">
            <input
              type="date"
              value={estCompletion}
              onChange={(e) => setEstCompletion(e.target.value)}
              className="rounded-xl border border-line bg-white px-4 py-2.5 text-sm focus:border-brand focus:outline-none"
            />
            <button
              onClick={() => saveField("estimated_completion", estCompletion)}
              disabled={pending}
              className="inline-flex items-center gap-1.5 rounded-full bg-brand text-white px-4 py-2 text-sm font-medium hover:bg-ink"
            >
              <Save className="h-3.5 w-3.5" />
              {savedField === "estimated_completion" ? "U ruajt" : "Ruaj"}
            </button>
          </div>
        </label>
      </div>

      {/* Editable: notes */}
      <div className="bg-white rounded-3xl border border-line p-6">
        <label className="block">
          <span className="text-sm font-medium text-ink">Shënime të brendshme</span>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
            className="mt-2 block w-full rounded-xl border border-line bg-white px-4 py-3 text-sm focus:border-brand focus:outline-none"
          />
        </label>
        <div className="mt-3 flex justify-end">
          <button
            onClick={() => saveField("notes", notes)}
            disabled={pending}
            className="inline-flex items-center gap-1.5 rounded-full bg-brand text-white px-4 py-2 text-sm font-medium hover:bg-ink"
          >
            <Save className="h-3.5 w-3.5" />
            {savedField === "notes" ? "U ruajt" : "Ruaj"}
          </button>
        </div>
      </div>

      {/* PDF Upload */}
      <div className="bg-white rounded-3xl border border-line p-6">
        <h3 className="font-medium mb-3">Raporti PDF</h3>
        <p className="text-sm text-ink-soft mb-4">
          Ngarko raportin PDF. Pas ngarkimit, klienti mund ta shkarkojë nga faqja e gjurmimit.
        </p>
        <div className="flex items-center gap-3 flex-wrap">
          <label className="inline-flex items-center gap-2 rounded-full bg-brand text-white px-4 py-2.5 text-sm font-medium hover:bg-ink cursor-pointer">
            <Upload className="h-4 w-4" />
            {reportUrl ? "Ndrysho PDF" : "Ngarko PDF"}
            <input type="file" accept="application/pdf" className="hidden" onChange={onFileChange} />
          </label>
          {reportUrl && (
            <a
              href={reportUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-sm text-brand hover:underline"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              Hap raportin
            </a>
          )}
          {uploadMsg && <span className="text-sm text-ink-soft">{uploadMsg}</span>}
        </div>
      </div>

      {/* Danger zone */}
      <div className="pt-4">
        <button
          onClick={onDelete}
          className="inline-flex items-center gap-2 text-sm text-red-600 hover:text-red-700"
        >
          <Trash2 className="h-4 w-4" />
          Fshi mostrën
        </button>
      </div>
    </div>
  );
}

function Card({ title, children }) {
  return (
    <div className="bg-white rounded-2xl border border-line p-5">
      <div className="text-xs uppercase tracking-widest text-ink-soft mb-1.5">{title}</div>
      <div className="text-sm">{children}</div>
    </div>
  );
}

const ANALYSIS_TYPE_LABEL = {
  microbiology: "Mikrobiologji",
  chemistry: "Kimi",
  both: "Mikrobiologji + Kimi",
};

function formatDate(iso) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("sq-AL", {
    day: "numeric", month: "long", year: "numeric",
  });
}
