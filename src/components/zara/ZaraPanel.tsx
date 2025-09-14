// src/components/zara/ZaraPanel.tsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import QuickActions from "./QuickActions";
import TrustBadge from "./TrustBadge";
import { useZara } from "./useZara";
import type { Tone, ContextType } from "./types";

type Props = { onClose: () => void };

export default function ZaraPanel({ onClose }: Props) {
  const { busy, last, setLast, callZara, insertAtCursor } = useZara();
  const [input, setInput] = useState("");
  const [tab, setTab] = useState<"assist" | "templates">("assist");
  const [tone, setTone] = useState<Tone>("neutral");
  const [ctype, setCtype] = useState<ContextType>("parent_email");
  const [lang, setLang] = useState("en");

  const containerRef = useRef<HTMLDivElement>(null);

  // basic templates
  const templates = useMemo(
    () => ({
      parent_email: "Hi [Parent],\n\nI wanted to share a quick update about [Student]...",
      report_comment: "[Student] demonstrates strength in..., next we will focus on...",
      student_feedback: "Great effort on [task]. Your next step is...",
      staff_note: "Summary of discussion with [Name] on [Topic]:\n• ...",
    }),
    []
  );

  useEffect(() => {
    function onEsc(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, [onClose]);

  function run(kind: Parameters<typeof QuickActions>[0]["onAction"]) {
    const prefixMap: Record<string, string> = {
      rewrite: "Please rewrite more clearly:",
      shorten: "Please shorten without losing meaning:",
      expand: "Please expand with one extra helpful detail:",
      tone: `Please adjust the tone to ${tone}:`,
      translate: `Please translate to ${lang}:`,
      fix: "Please fix grammar and clarity:",
      alts: "Please provide 3 concise alternatives:",
    };
    const msg = `${prefixMap[String(kind)]}\n\n${input}`.trim();
    callZara(msg, { type: ctype, language: lang, tone }, { defaultLanguage: lang, defaultTone: tone });
  }

  return (
    <div
      ref={containerRef}
      className="fixed top-0 right-0 h-full w-full sm:w-[420px] z-[60] p-4
                 bg-gradient-to-b from-black/30 to-black/10 backdrop-blur-xl
                 border-l border-white/10 text-white"
      role="dialog"
      aria-label="Zara Assistant Panel"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="px-2 py-1 rounded-md bg-white/10 border border-white/20 text-xs backdrop-blur">
            Powered by Zara
          </span>
          <TrustBadge />
        </div>
        <button onClick={onClose} className="p-1 rounded hover:bg-white/10" aria-label="Close Zara panel">✕</button>
      </div>

      <div className="mb-3 flex gap-2">
        <button
          onClick={() => setTab("assist")}
          className={`px-3 py-1 rounded-md text-sm border ${tab === "assist" ? "bg-white/15 border-white/40" : "bg-white/5 border-white/20"}`}
        >
          Assist
        </button>
        <button
          onClick={() => setTab("templates")}
          className={`px-3 py-1 rounded-md text-sm border ${tab === "templates" ? "bg-white/15 border-white/40" : "bg-white/5 border-white/20"}`}
        >
          Templates
        </button>
      </div>

      {tab === "assist" ? (
        <>
          <div className="grid grid-cols-2 gap-2 mb-2">
            <select className="bg-white/10 border border-white/20 rounded-md px-2 py-1 text-sm text-white" value={ctype} onChange={(e) => setCtype(e.target.value as any)}>
              <option value="parent_email" className="bg-black text-white">Parent email</option>
              <option value="report_comment" className="bg-black text-white">Report comment</option>
              <option value="student_feedback" className="bg-black text-white">Student feedback</option>
              <option value="staff_note" className="bg-black text-white">Staff note</option>
            </select>
            <select className="bg-white/10 border border-white/20 rounded-md px-2 py-1 text-sm text-white" value={tone} onChange={(e) => setTone(e.target.value as any)}>
              <option value="neutral" className="bg-black text-white">Neutral</option>
              <option value="warm" className="bg-black text-white">Warm</option>
              <option value="formal" className="bg-black text-white">Formal</option>
              <option value="friendly" className="bg-black text-white">Friendly</option>
            </select>
          </div>

          <div className="mb-2">
            <input
              className="w-full bg-white/10 border border-white/20 rounded-md px-2 py-1 text-sm text-white placeholder:text-white/60"
              placeholder="Language (e.g., en, de, es)..."
              value={lang}
              onChange={(e) => setLang(e.target.value)}
            />
          </div>

          <textarea
            className="w-full h-28 bg-white/10 border border-white/20 rounded-md p-2 text-sm backdrop-blur placeholder:text-white/60 text-white"
            placeholder="Paste your draft here…"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

          <div className="mt-2">
            <QuickActions onAction={run} busy={busy} />
          </div>

          {last && (
            <div className="mt-3 space-y-2">
              {last.error ? (
                <div className="p-3 rounded-md bg-red-500/20 border border-red-400/30">
                  <div className="text-xs opacity-80 mb-1 text-red-200">Service Error</div>
                  <div className="text-sm text-red-100">{last.explanation}</div>
                  {last.errorType === 'service_unavailable' && (
                    <div className="text-xs mt-2 text-red-200/80">
                      The AI assistant is temporarily disabled. Please try again later or contact support.
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <div className="p-2 rounded-md bg-white/10 border border-white/20">
                    <div className="text-xs opacity-80 mb-1">Explanation</div>
                    <div className="text-sm">{last.explanation}</div>
                  </div>
                  <div className="p-2 rounded-md bg-white/10 border border-white/20">
                    <div className="text-xs opacity-80 mb-1">Improved</div>
                    <div className="whitespace-pre-wrap text-sm">{last.text}</div>
                    <div className="mt-2">
                      <button
                        onClick={() => insertAtCursor(last.text)}
                        className="px-3 py-1 rounded-md text-sm bg-white/20 border border-white/30 hover:bg-white/30"
                      >
                        Insert into editor
                      </button>
                    </div>
                  </div>
                  {last.alternatives?.length > 0 && (
                    <div className="p-2 rounded-md bg-white/10 border border-white/20">
                      <div className="text-xs opacity-80 mb-1">Alternatives</div>
                      <ul className="list-disc ml-4 text-sm space-y-1">
                        {last.alternatives.map((a, i) => (
                          <li key={i}>{a}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </>
              )}
            </div>
          )}
        </>
      ) : (
        <div className="space-y-2">
          {(Object.keys(templates) as Array<keyof typeof templates>).map((k) => (
            <button
              key={k}
              onClick={() => setInput(templates[k])}
              className="w-full text-left px-3 py-2 rounded-md bg-white/10 border border-white/20 hover:bg-white/20 text-white"
            >
              {k.replace("_", " ")}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}