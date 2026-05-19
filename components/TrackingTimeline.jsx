"use client";

import { useTranslations } from "next-intl";
import { Check } from "lucide-react";
import { sampleStatuses } from "@/lib/processSteps";

export default function TrackingTimeline({ status }) {
  const t = useTranslations("tracking.statuses");
  const activeIdx = sampleStatuses.indexOf(status);

  return (
    <ol className="space-y-3">
      {sampleStatuses.map((s, i) => {
        const isDone = i < activeIdx;
        const isActive = i === activeIdx;
        return (
          <li
            key={s}
            className={`flex items-center gap-4 rounded-2xl border bg-white p-4 lg:p-5 ${
              isActive ? "border-brand" : "border-line"
            }`}
          >
            <span
              className={`relative inline-flex h-9 w-9 items-center justify-center rounded-full flex-shrink-0 ${
                isDone
                  ? "bg-brand text-white"
                  : isActive
                  ? "bg-accent text-ink pulse-dot"
                  : "bg-bg-alt text-ink-soft"
              }`}
            >
              {isDone ? <Check className="h-4 w-4" /> : <span className="text-xs font-medium">{i + 1}</span>}
            </span>
            <div className="flex-1">
              <div className={`text-sm ${isDone || isActive ? "text-ink font-medium" : "text-ink-soft"}`}>
                {t(s)}
              </div>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
