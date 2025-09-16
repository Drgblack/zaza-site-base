'use client';

import React, {useMemo, useState, useEffect, useRef} from 'react';
import { Copy, RefreshCw, Sparkles, Lock, Info } from 'lucide-react';
import clsx from 'clsx';

/* ---------- Config ---------- */
const FREE_DAILY_CREDITS =
  Number(process.env.NEXT_PUBLIC_SNIPPET_FREE_CREDITS ?? 3);

const SHOW_WATERMARK =
  (process.env.NEXT_PUBLIC_SNIPPET_WATERMARK ?? '1') === '1';

/* ---------- Utilities ---------- */
function todayKey() {
  const d = new Date();
  return `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`;
}

function useDailyCredits(storageKey: string, daily: number) {
  const [credits, setCredits] = useState<number>(daily);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const k = `${storageKey}:${todayKey()}`;
    const raw = localStorage.getItem(k);
    if (!raw) {
      localStorage.setItem(k, String(daily));
      setCredits(daily);
    } else {
      setCredits(Math.max(0, Number(raw)));
    }
  }, [storageKey, daily]);

  const spend = () => {
    if (typeof window === 'undefined') return;
    const k = `${storageKey}:${todayKey()}`;
    const next = Math.max(0, credits - 1);
    localStorage.setItem(k, String(next));
    setCredits(next);
  };

  return {credits, spend, resetTo: (n:number) => setCredits(n)};
}

function pre(s: string) {
  // Preserve user spacing/newlines verbatim; normalize newline style only
  return (s ?? '').replace(/\r\n/g, '\n');
}

function safeJoin(parts: Array<string | undefined>, sep = '\n\n') {
  return parts
    .map((p) => (p ?? '').trim())
    .filter(Boolean)
    .join(sep);
}

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

/* ---------- Snippet composer (deterministic demo) ---------- */
type Tone = 'warm' | 'professional' | 'concise' | 'supportive';
type Lang = 'English' | 'Deutsch' | 'Français' | 'Español' | 'Italiano';

function composeSnippet(opts: {
  topic: string;
  student?: string;
  positives?: string;
  concern?: string;
  nextSteps?: string;
  extra?: string;
  tone: Tone;
  length: number; // target words
  language: Lang;
}) {
  const {
    topic, student, positives, concern, nextSteps, extra, tone, length, language
  } = opts;

  const greet =
    language === 'Deutsch'   ? 'Guten Tag' :
    language === 'Français'  ? 'Bonjour'   :
    language === 'Español'   ? 'Hola'      :
    language === 'Italiano'  ? 'Ciao'      :
                               'Hello';

  const closers: Record<Lang, string> = {
    English:  'Kind regards,',
    Deutsch:  'Mit freundlichen Grüßen,',
    Français: 'Cordialement,',
    Español:  'Saludos cordiales,',
    Italiano: 'Cordiali saluti,',
  };

  const toneLine =
    tone === 'warm'        ? 'I wanted to share a quick update.' :
    tone === 'concise'     ? 'A quick update:' :
    tone === 'supportive'  ? 'Thanks for partnering with us—here is a quick update.' :
                              'I am writing with a brief update.';

  const nameBit = student ? ` about ${student}` : '';

  const p1 = `${greet}, ${toneLine} This message is${nameBit} regarding ${topic}.`;

  const p2 = positives
    ? `Positives we've noticed:\n${pre(positives)}`
    : undefined;

  const p3 = concern
    ? `What we're working on:\n${pre(concern)}`
    : undefined;

  const p4 = nextSteps
    ? `Next steps:\n${pre(nextSteps)}`
    : undefined;

  const p5 = extra ? pre(extra) : undefined;

  let body = safeJoin([p1, p2, p3, p4, p5], '\n\n');

  // Gentle length shaping (non-AI demo): trim to target-ish word count
  const words = body.split(/\s+/);
  const maxWords = clamp(length, 60, 400);
  if (words.length > maxWords) {
    body = words.slice(0, maxWords).join(' ') + '…';
  }

  return `${body}\n\n${closers[language] ?? closers.English}\n`;
}

/* ---------- Component ---------- */

export default function SmartSnippetWriterV3() {
  const {credits, spend} = useDailyCredits('zp_snippet_v3', FREE_DAILY_CREDITS);

  const [topic, setTopic] = useState('');
  const [student, setStudent] = useState('');
  const [positives, setPositives] = useState('');
  const [concern, setConcern] = useState('');
  const [nextSteps, setNextSteps] = useState('');
  const [extra, setExtra] = useState('');
  const [tone, setTone] = useState<Tone>('warm');
  const [length, setLength] = useState(160);
  const [language, setLanguage] = useState<Lang>('English');

  const [preview, setPreview] = useState('');
  const [busy, setBusy] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  const canGenerate = credits > 0 && !busy;

  const generate = async () => {
    if (!canGenerate) return;
    setBusy(true);
    try {
      // For the website demo we generate client-side.
      const text = composeSnippet({
        topic, student, positives, concern, nextSteps, extra, tone, length, language
      });
      setPreview(text);
      spend();
      // Scroll preview into view on mobile
      setTimeout(() => previewRef.current?.scrollIntoView({behavior: 'smooth', block: 'center'}), 100);
    } finally {
      setBusy(false);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(preview);
    } catch {
      // Clipboard API not available or permission denied
    }
  };

  const resetAll = () => {
    setTopic(''); setStudent(''); setPositives(''); setConcern('');
    setNextSteps(''); setExtra(''); setTone('warm'); setLength(160);
    setLanguage('English'); setPreview('');
  };

  const used = useMemo(() => Math.max(0, FREE_DAILY_CREDITS - credits), [credits]);

  return (
    <section id="snippet-tool" className="relative py-10">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-6 flex items-center gap-3">
          <Sparkles className="h-5 w-5" />
          <h3 className="text-xl font-semibold">Smart Snippet Writer</h3>
          <span className="ml-auto text-sm text-slate-500">
            {credits} free {credits === 1 ? 'render' : 'renders'} left today
            {FREE_DAILY_CREDITS > 0 && (
              <span className="ml-2 text-slate-400">(used {used}/{FREE_DAILY_CREDITS})</span>
            )}
          </span>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Left: Inputs */}
          <div className="rounded-2xl border border-slate-200/60 bg-white/80 p-4 backdrop-blur dark:border-slate-700 dark:bg-slate-900/60">
            <div className="grid grid-cols-1 gap-4">
              <LabeledInput label="Topic / context" value={topic} onChange={setTopic} placeholder="e.g., Week 3 progress in fractions; class behavior routines; field trip info" />

              <div className="grid gap-4 md:grid-cols-2">
                <LabeledInput label="Student (optional)" value={student} onChange={setStudent} placeholder="e.g., Jordan A." />
                <LabeledSelect
                  label="Tone"
                  value={tone}
                  onChange={v => setTone(v as Tone)}
                  options={[
                    {label:'Warm', value:'warm'},
                    {label:'Professional', value:'professional'},
                    {label:'Concise', value:'concise'},
                    {label:'Supportive', value:'supportive'},
                  ]}
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <LabeledSelect
                  label="Language"
                  value={language}
                  onChange={v => setLanguage(v as Lang)}
                  options={[
                    {label:'English', value:'English'},
                    {label:'Deutsch', value:'Deutsch'},
                    {label:'Français', value:'Français'},
                    {label:'Español', value:'Español'},
                    {label:'Italiano', value:'Italiano'},
                  ]}
                />
                <LabeledSlider
                  label={`Length target: ${length} words`}
                  value={length}
                  min={80} max={320} step={10}
                  onChange={setLength}
                />
              </div>

              <LabeledTextarea label="Positives (optional)"
                value={positives} onChange={setPositives}
                placeholder="Strengths noticed, wins, improvements…"
              />
              <LabeledTextarea label="What we're working on (optional)"
                value={concern} onChange={setConcern}
                placeholder="One clear area; keep factual & neutral…"
              />
              <LabeledTextarea label="Next steps (optional)"
                value={nextSteps} onChange={setNextSteps}
                placeholder="What we'll do in class; how families can help…"
              />
              <LabeledTextarea label="Extra notes (optional)"
                value={extra} onChange={setExtra}
                placeholder="Logistics, reminders, resources, thanks…"
              />

              <div className="flex items-center gap-3 pt-1">
                <button
                  onClick={generate}
                  disabled={!canGenerate}
                  className={clsx(
                    "inline-flex items-center gap-2 rounded-lg px-4 py-2 font-medium",
                    canGenerate
                      ? "bg-violet-600 text-white hover:bg-violet-700"
                      : "bg-slate-300 text-slate-600 dark:bg-slate-700 dark:text-slate-400 cursor-not-allowed"
                  )}
                  aria-disabled={!canGenerate}
                >
                  <Sparkles className="h-4 w-4" />
                  {busy ? 'Generating…' : 'Generate snippet'}
                </button>

                <button
                  onClick={resetAll}
                  className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-3 py-2 text-slate-700 hover:bg-slate-50 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-800"
                >
                  <RefreshCw className="h-4 w-4" />
                  Reset
                </button>

                {credits === 0 && (
                  <div className="ml-auto flex items-center gap-2 rounded-lg bg-amber-50 px-3 py-2 text-amber-800 dark:bg-amber-900/30 dark:text-amber-200">
                    <Lock className="h-4 w-4" />
                    <span className="text-sm">
                      Daily limit reached. <a href="/pricing" className="underline">Get unlimited</a>
                    </span>
                  </div>
                )}
              </div>

              {credits === 0 && (
                <p className="text-xs text-slate-500">
                  Tip: limit resets at midnight. Accounts get unlimited generates + translation & tone presets.
                </p>
              )}
            </div>
          </div>

          {/* Right: Preview */}
          <div
            ref={previewRef}
            className="relative rounded-2xl border border-slate-200/60 bg-white/90 backdrop-blur dark:border-slate-700 dark:bg-slate-900/60"
          >
            <div className="flex items-center justify-between border-b border-slate-200/60 p-3 dark:border-slate-700">
              <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                <Info className="h-4 w-4" />
                <span className="text-sm">Preview</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={copyToClipboard}
                  disabled={!preview}
                  className={clsx(
                    "inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm",
                    preview
                      ? "border border-slate-300 hover:bg-slate-50 dark:border-slate-600 dark:hover:bg-slate-800"
                      : "border border-slate-200 text-slate-400 cursor-not-allowed dark:border-slate-700"
                  )}
                  aria-disabled={!preview}
                  title="Copy to clipboard"
                >
                  <Copy className="h-4 w-4" />
                  Copy
                </button>
              </div>
            </div>

            <div
              className={clsx(
                "relative p-4 text-sm leading-6",
                "max-h-[28rem] overflow-auto rounded-b-2xl",
                "whitespace-pre-wrap break-words" // <— core fix: preserve spacing + wrap
              )}
            >
              {preview || (
                <p className="text-slate-500">
                  Your generated snippet will appear here. It will keep **all** your spacing and line breaks.
                </p>
              )}

              {SHOW_WATERMARK && (
                <div className="pointer-events-none absolute inset-x-0 bottom-2 mx-auto w-fit rounded bg-white/60 px-2 py-1 text-[10px] font-medium text-slate-600 dark:bg-slate-900/60 dark:text-slate-400">
                  Made with Promptly • Free demo
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Small input primitives ---------- */

function LabeledInput(props: {
  label: string; value: string; onChange: (v:string)=>void; placeholder?: string;
}) {
  return (
    <label className="grid gap-1">
      <span className="text-xs font-medium text-slate-600 dark:text-slate-300">{props.label}</span>
      <input
        value={props.value}
        onChange={(e)=>props.onChange(e.target.value)}
        placeholder={props.placeholder}
        className="rounded-lg border border-slate-300 bg-white/80 px-3 py-2 text-sm outline-none placeholder:text-slate-400 focus:border-violet-500 focus:ring-1 focus:ring-violet-500 dark:border-slate-600 dark:bg-slate-900/60"
      />
    </label>
  );
}

function LabeledTextarea(props: {
  label: string; value: string; onChange: (v:string)=>void; placeholder?: string;
}) {
  return (
    <label className="grid gap-1">
      <span className="text-xs font-medium text-slate-600 dark:text-slate-300">{props.label}</span>
      <textarea
        value={props.value}
        onChange={(e)=>props.onChange(e.target.value)}
        placeholder={props.placeholder}
        rows={4}
        wrap="soft"
        className={clsx(
          "min-h-[96px] resize-y rounded-lg border border-slate-300 bg-white/80 px-3 py-2 text-sm outline-none",
          "placeholder:text-slate-400 focus:border-violet-500 focus:ring-1 focus:ring-violet-500",
          "dark:border-slate-600 dark:bg-slate-900/60",
          "whitespace-pre-wrap" // Keep user spacing in the field itself
        )}
      />
    </label>
  );
}

function LabeledSelect(props:{
  label: string;
  value: string;
  onChange: (v:string)=>void;
  options: {label:string; value:string}[];
}) {
  return (
    <label className="grid gap-1">
      <span className="text-xs font-medium text-slate-600 dark:text-slate-300">{props.label}</span>
      <select
        value={props.value}
        onChange={(e)=>props.onChange(e.target.value)}
        className="rounded-lg border border-slate-300 bg-white/80 px-3 py-2 text-sm outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 dark:border-slate-600 dark:bg-slate-900/60"
      >
        {props.options.map(o=>(
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
    </label>
  );
}

function LabeledSlider(props:{
  label: string; value: number; min:number; max:number; step?:number; onChange:(n:number)=>void
}) {
  return (
    <label className="grid gap-1">
      <span className="text-xs font-medium text-slate-600 dark:text-slate-300">{props.label}</span>
      <input
        type="range"
        min={props.min}
        max={props.max}
        step={props.step ?? 1}
        value={props.value}
        onChange={(e)=>props.onChange(Number(e.target.value))}
        className="accent-violet-600"
      />
    </label>
  );
}