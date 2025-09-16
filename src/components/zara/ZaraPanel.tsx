// src/components/zara/ZaraPanel.tsx
import React, { useEffect, useState } from "react";
import { X, Copy, Sparkles, Lock, Shield } from "lucide-react";
import { useZara } from "./useZara";
import type { ZaraMode, Tone, ReadingLevel, TransformType, ZaraRequest } from "./types";

type Props = { onClose: () => void };

export default function ZaraPanel({ onClose }: Props) {
  const { busy, last, callZara, insertAtCursor, copyToClipboard, isLimited, remaining, dailyLimit } = useZara();
  
  // UI State
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<ZaraMode>("advice");
  const [tone, setTone] = useState<Tone>("warm");
  const [language, setLanguage] = useState("en");
  const [readingLevel, setReadingLevel] = useState<ReadingLevel>("6-8");

  // Close on Escape
  useEffect(() => {
    function onEsc(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, [onClose]);

  // Handle main action (Ask Zara / Generate)
  const handleMainAction = async () => {
    if (!input.trim() || isLimited) return;

    const request: ZaraRequest = {
      mode,
      tone,
      language,
      readingLevel: mode === 'explain' || mode === 'draft' || mode === 'plan' || mode === 'assess' ? readingLevel : undefined,
      topic: input,
      userText: input
    };

    await callZara(request);
  };

  // Handle transform actions (existing buttons)
  const handleTransform = async (transformType: TransformType) => {
    if (!input.trim() || isLimited) return;

    const request: ZaraRequest = {
      mode: 'transform',
      tone,
      language,
      userText: input,
      transform: transformType
    };

    await callZara(request);
  };

  const primaryLabel = mode === 'advice' || mode === 'explain' ? 'Ask Zara' : 'Generate';
  const showReadingLevel = mode === 'explain' || mode === 'draft' || mode === 'plan' || mode === 'assess';

  return (
    <div className="fixed top-0 right-0 h-full w-full sm:w-[420px] z-[60] p-4 bg-gradient-to-b from-black/30 to-black/10 backdrop-blur-xl border-l border-white/10 text-white" role="dialog" aria-label="Zara Assistant Panel">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="px-2 py-1 rounded-md bg-white/10 border border-white/20 text-xs backdrop-blur">
            Powered by Zara
          </span>
          <div className="flex items-center gap-1 text-xs text-white/70">
            <Shield className="w-3 h-3" />
            <span>Privacy-first · No student data stored</span>
          </div>
        </div>
        <button onClick={onClose} className="p-1 rounded hover:bg-white/10" aria-label="Close Zara panel">
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Usage counter */}
      {!isLimited && (
        <div className="text-xs text-white/60 mb-3">
          {remaining} of {dailyLimit} free interactions remaining today
        </div>
      )}

      {/* Mode Selector */}
      <div className="mb-3">
        <label className="block text-xs text-white/80 mb-2">Mode</label>
        <select 
          value={mode} 
          onChange={(e) => setMode(e.target.value as ZaraMode)}
          className="w-full bg-white/10 border border-white/20 rounded-md px-3 py-2 text-sm text-white"
          disabled={busy}
        >
          <option value="advice" className="bg-black text-white">Advice</option>
          <option value="explain" className="bg-black text-white">Explain</option>
          <option value="draft" className="bg-black text-white">Draft</option>
          <option value="plan" className="bg-black text-white">Plan</option>
          <option value="assess" className="bg-black text-white">Assess</option>
        </select>
      </div>

      {/* Tone & Language */}
      <div className="grid grid-cols-2 gap-2 mb-3">
        <div>
          <label className="block text-xs text-white/80 mb-1">Tone</label>
          <select 
            value={tone} 
            onChange={(e) => setTone(e.target.value as Tone)}
            className="w-full bg-white/10 border border-white/20 rounded-md px-2 py-1 text-sm text-white"
            disabled={busy}
          >
            <option value="warm" className="bg-black text-white">Warm</option>
            <option value="professional" className="bg-black text-white">Professional</option>
            <option value="neutral" className="bg-black text-white">Neutral</option>
            <option value="supportive" className="bg-black text-white">Supportive</option>
          </select>
        </div>
        <div>
          <label className="block text-xs text-white/80 mb-1">Language</label>
          <select 
            value={language} 
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full bg-white/10 border border-white/20 rounded-md px-2 py-1 text-sm text-white"
            disabled={busy}
          >
            <option value="en" className="bg-black text-white">English</option>
            <option value="de" className="bg-black text-white">Deutsch</option>
            <option value="fr" className="bg-black text-white">Français</option>
            <option value="es" className="bg-black text-white">Español</option>
            <option value="it" className="bg-black text-white">Italiano</option>
          </select>
        </div>
      </div>

      {/* Reading Level (conditional) */}
      {showReadingLevel && (
        <div className="mb-3">
          <label className="block text-xs text-white/80 mb-2">Reading Level</label>
          <div className="flex gap-1 flex-wrap">
            {(['K-2', '3-5', '6-8', '9-12', 'Adult'] as ReadingLevel[]).map((level) => (
              <button
                key={level}
                onClick={() => setReadingLevel(level)}
                className={`px-2 py-1 rounded text-xs ${
                  readingLevel === level 
                    ? 'bg-white/20 border border-white/40' 
                    : 'bg-white/5 border border-white/20'
                }`}
                disabled={busy}
              >
                {level}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Textarea */}
      <div className="mb-3">
        <label className="block text-xs text-white/80 mb-2">
          {mode === 'advice' || mode === 'explain' ? 'Ask or paste here...' : 'Topic or content...'}
        </label>
        <textarea
          className="w-full h-24 bg-white/10 border border-white/20 rounded-md p-3 text-sm text-white placeholder:text-white/60 whitespace-pre-wrap break-words resize-none"
          placeholder={
            mode === 'advice' ? 'e.g., Strategies for low-noise transitions Grade 3' :
            mode === 'explain' ? 'e.g., Explain photosynthesis for Grade 6' :
            mode === 'draft' ? 'e.g., Warm parent message re: missed homework' :
            mode === 'plan' ? 'e.g., Mini-lesson multiplying fractions, 30 min' :
            mode === 'assess' ? 'e.g., Rubric row for scientific argument claim-evidence-reasoning' :
            'Ask for advice, explanations, or paste text to transform...'
          }
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={busy}
        />
      </div>

      {/* Primary Action */}
      <div className="mb-3">
        {isLimited ? (
          <div className="bg-amber-900/30 border border-amber-600/50 rounded-md p-3 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Lock className="w-4 h-4 text-amber-400" />
              <span className="text-sm text-amber-200">Daily limit reached</span>
            </div>
            <p className="text-xs text-amber-300 mb-3">
              Get unlimited advice & drafting with Promptly.
            </p>
            <a 
              href="/pricing" 
              className="inline-block px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white text-sm font-medium rounded-md transition-colors"
            >
              Try Promptly Free
            </a>
          </div>
        ) : (
          <button
            onClick={handleMainAction}
            disabled={!input.trim() || busy}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:from-gray-600 disabled:to-gray-700 text-white font-medium px-4 py-3 rounded-md transition-all duration-200 flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            {busy ? 'Working...' : primaryLabel}
          </button>
        )}
      </div>

      {/* Transform Actions (Secondary Buttons) */}
      {mode !== 'advice' && mode !== 'explain' && !isLimited && (
        <div className="mb-4">
          <div className="text-xs text-white/60 mb-2">Quick transforms:</div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              onClick={() => handleTransform('rewrite')}
              disabled={!input.trim() || busy}
              className="px-2 py-1 bg-white/5 border border-white/20 rounded hover:bg-white/10 disabled:opacity-50"
            >
              Rewrite
            </button>
            <button
              onClick={() => handleTransform('shorten')}
              disabled={!input.trim() || busy}
              className="px-2 py-1 bg-white/5 border border-white/20 rounded hover:bg-white/10 disabled:opacity-50"
            >
              Shorten
            </button>
            <button
              onClick={() => handleTransform('expand')}
              disabled={!input.trim() || busy}
              className="px-2 py-1 bg-white/5 border border-white/20 rounded hover:bg-white/10 disabled:opacity-50"
            >
              Expand
            </button>
            <button
              onClick={() => handleTransform('fix')}
              disabled={!input.trim() || busy}
              className="px-2 py-1 bg-white/5 border border-white/20 rounded hover:bg-white/10 disabled:opacity-50"
            >
              Fix grammar
            </button>
            <button
              onClick={() => handleTransform('tone')}
              disabled={!input.trim() || busy}
              className="px-2 py-1 bg-white/5 border border-white/20 rounded hover:bg-white/10 disabled:opacity-50"
            >
              Apply tone
            </button>
            <button
              onClick={() => handleTransform('alts')}
              disabled={!input.trim() || busy}
              className="px-2 py-1 bg-white/5 border border-white/20 rounded hover:bg-white/10 disabled:opacity-50"
            >
              3 alternatives
            </button>
          </div>
        </div>
      )}

      {/* Response Display */}
      {last && (
        <div className="space-y-3 max-h-64 overflow-auto">
          <div className="bg-white/10 border border-white/20 rounded-md p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-white/80">Response</span>
              <div className="flex gap-1">
                <button
                  onClick={() => copyToClipboard(last.text)}
                  className="p-1 rounded hover:bg-white/10"
                  title="Copy to clipboard"
                >
                  <Copy className="w-3 h-3" />
                </button>
                <button
                  onClick={() => insertAtCursor(last.text)}
                  className="px-2 py-1 text-xs bg-white/10 rounded hover:bg-white/20"
                >
                  Insert
                </button>
              </div>
            </div>
            <div className="text-sm whitespace-pre-wrap break-words text-white/95 leading-relaxed">
              {last.text}
            </div>
          </div>

          {/* Variants for alternatives */}
          {last.variants && last.variants.length > 0 && (
            <div className="bg-white/10 border border-white/20 rounded-md p-3">
              <div className="text-xs text-white/80 mb-2">Alternatives</div>
              <div className="space-y-2">
                {last.variants.map((variant, i) => (
                  <div key={i} className="p-2 bg-white/5 rounded border border-white/10">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-white/60">#{i + 1}</span>
                      <button
                        onClick={() => copyToClipboard(variant)}
                        className="p-1 rounded hover:bg-white/10"
                        title="Copy to clipboard"
                      >
                        <Copy className="w-3 h-3" />
                      </button>
                    </div>
                    <div className="text-sm whitespace-pre-wrap break-words text-white/90">
                      {variant}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}