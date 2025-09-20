"use client";

import { useQuota } from "./hooks/useQuota";
import { cn } from "@/lib/utils";

export function QuotaBadge({ className }: { className?: string }) {
  const { data, loading, error, refresh } = useQuota();

  const text = loading
    ? "Checking quota…"
    : error
    ? "Quota unavailable"
    : `${data?.remaining ?? "—"} free messages left this month${data ? ` (limit ${data.limit})` : ""}`;

  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 rounded-md bg-white/5 px-2.5 py-1 text-sm text-slate-400 ring-1 ring-white/10",
        className
      )}
      aria-live="polite"
    >
      <span>{text}</span>
      <button
        onClick={() => refresh()}
        className="rounded px-1 py-0.5 text-xs hover:bg-white/10 focus:outline-none focus:ring"
        title="Refresh"
        type="button"
      >
        ↻
      </button>
    </div>
  );
}