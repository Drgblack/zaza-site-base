// src/components/zara/QuickActions.tsx
import React from "react";

type Props = {
  onAction: (kind: "rewrite" | "shorten" | "expand" | "tone" | "translate" | "fix" | "alts") => void;
  busy?: boolean;
};

const items: Array<{ key: Props["onAction"] extends (k: infer K) => any ? K : never; label: string }> = [
  { key: "rewrite", label: "Rewrite" },
  { key: "shorten", label: "Shorten" },
  { key: "expand", label: "Expand" },
  { key: "tone", label: "Tone" },
  { key: "translate", label: "Translate" },
  { key: "fix", label: "Fix grammar" },
  { key: "alts", label: "3 alternatives" },
] as any;

export default function QuickActions({ onAction, busy }: Props) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((it) => (
        <button
          key={String(it.key)}
          onClick={() => onAction(it.key as any)}
          disabled={busy}
          className="px-3 py-1 rounded-full text-sm border border-white/30 hover:border-white/60 disabled:opacity-50
                     bg-white/10 backdrop-blur-md transition"
        >
          {it.label}
        </button>
      ))}
    </div>
  );
}