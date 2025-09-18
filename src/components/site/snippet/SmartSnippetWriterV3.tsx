'use client';

import React, {useMemo, useState, useEffect, useRef} from 'react';
import { Copy, RefreshCw, Sparkles, Lock, Info, Share2, Mail, MessageCircle, Link2, Download } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import clsx from 'clsx';

/* ---------- Config ---------- */
const FREE_DAILY_CREDITS =
  Number(process.env.NEXT_PUBLIC_SNIPPET_FREE_CREDITS ?? 5);

const SHOW_WATERMARK =
  (process.env.NEXT_PUBLIC_SNIPPET_WATERMARK ?? '1') === '1';

/* ---------- Utilities ---------- */
function todayKey() {
  const d = new Date();
  return `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`;
}

/* ---------- Analytics ---------- */
function trackEvent(eventName: string, properties?: Record<string, any>) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, properties);
  }
}

/* ---------- Post-processor ---------- */
export function postProcessMessage(text: string): string {
  const cleaned = text
    .replace(/\s+$/,'')  // Remove trailing whitespace
    .replace(/\n{3,}/g,'\n\n')  // Max 2 consecutive newlines
    .replace(/\s{2,}/g,' ')  // Collapse multiple spaces
    .replace(/(^|\. *)(your child)/gi, (m,p,_)=>(p||'')+'Your child');  // Capitalize "Your child" at sentence start
  
  // Capitalize first letter of sentences
  return cleaned.replace(/(^|[.!?]\s+)([a-z])/g, (_,p,c)=> (p||'') + c.toUpperCase());
}

/* ---------- World-class system prompt ---------- */
export const snippetSystem = `
You are Promptly's Comment Agent. You write short, parent-ready messages that teachers can send immediately.

Non-negotiables:
- Kind, specific, factual; never blame, diagnose, or label.
- Short sentences (avg ≤ 14 words). Reading level: grade 6–8.
- Structure (no headings):
  1) Warm opener + purpose
  2) One clear positive (infer if none provided)
  3) One clear observation (facts) + brief impact on learning
  4) 1–2 collaborative next steps parents can do at home
  5) Invite reply + supportive close
- Respect tone + language. Use the student's first name if provided; else "your child".
- Correct grammar and capitalization. Sentence beginnings must be capitalized.
- Length target: 90–120 words (Email), 45–70 words (SMS).
- Never include other students' info or judgments like "lazy" or "disruptive".
`;

/* ---------- Share functionality ---------- */
function shareMessage(text: string, student?: string, method?: string) {
  const subject = `Quick note about ${student || 'your child'}`;
  const teaser = text.slice(0, 160) + (text.length > 160 ? '…' : '');
  const siteUrl = 'https://zazapromptly.com';
  const utmParams = '?utm_source=try_snippet&utm_medium=share&utm_campaign=demo';
  const fullBody = `${teaser}\n\nMade with Promptly (free demo)\n${siteUrl}${utmParams}`;
  
  trackEvent('share_open');
  
  switch (method) {
    case 'email':
      trackEvent('share_email');
      window.open(`mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(fullBody)}`);
      break;
    case 'whatsapp':
      trackEvent('share_whatsapp');
      window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(fullBody)}`);
      break;
    case 'copy':
      trackEvent('share_copylink');
      navigator.clipboard.writeText(`${teaser}\n\n${siteUrl}${utmParams}`);
      break;
    case 'native':
      trackEvent('share_native');
      if (navigator.share) {
        navigator.share({ title: subject, text: fullBody });
      }
      break;
  }
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

/* ---------- Enhanced Snippet composer ---------- */
type Tone = 'warm' | 'professional' | 'concise' | 'supportive';
type Lang = 'English' | 'Deutsch' | 'Français' | 'Español' | 'Italiano';
type MessageFormat = 'email' | 'sms';

// Few-shot examples for quality reference (not exposed to UI)
const fewShotExamples = [
  {
    in: { topic: "attendance and punctuality", student: "Maya", positives: "settles quickly once in class", focus: "arriving on time", next: "share any morning constraints" },
    out: "Hi there—I wanted to share a quick update about Maya. She settles quickly and joins activities well. We have noticed several late arrivals this week, which shortens her warm-up time and makes it harder to start tasks. Could we try a simple morning checklist and a 7:55 reminder? If mornings are challenging, please let me know so we can adjust supports at school. Thanks for partnering with me—your insights really help."
  },
  {
    in: { topic: "missing homework", student: "Luca", positives: "participates in class", focus: "bringing assignments on the due day" },
    out: "Hi! I wanted to touch base about Luca's homework. He participates well in class and shares ideas. A few assignments have been missing on the due day, which makes it harder for him to practice the skills we're learning. Could you help Luca choose a spot at home for his folder and set a simple after-dinner reminder? I'm happy to send a photo of the checklist we use in class. Thanks for your support!"
  }
];

const bannedWords = ['lazy', 'disruptive', 'bad kid', 'disorder', 'diagnosis', 'blame'];

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
  format: MessageFormat;
  isImprovement?: boolean;
}) {
  const {
    topic, student, positives, concern, nextSteps, extra, tone, length, language, format, isImprovement
  } = opts;
  
  // Adjust length based on format
  const targetLength = format === 'sms' 
    ? Math.min(70, Math.max(45, length))
    : Math.min(120, Math.max(90, length));

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

  // Enhanced length shaping with quality checks
  let words = body.split(/\s+/);
  const maxWords = format === 'sms' ? 80 : 130;
  
  if (words.length > maxWords) {
    body = words.slice(0, maxWords).join(' ') + '…';
  }
  
  // Check for banned words and replace with neutral language
  bannedWords.forEach(banned => {
    const regex = new RegExp(`\\b${banned}\\b`, 'gi');
    body = body.replace(regex, 'challenging');
  });
  
  const finalMessage = `${body}\n\n${closers[language] ?? closers.English}\n`;
  
  // Apply post-processing
  return postProcessMessage(finalMessage);
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
  const [length, setLength] = useState(105); // Default ~105 words
  const [language, setLanguage] = useState<Lang>('English');
  const [format, setFormat] = useState<MessageFormat>('email');
  
  // Improve note functionality
  const [improveInput, setImproveInput] = useState('');
  
  // Variations
  const [variations, setVariations] = useState<string[]>([]);

  const [preview, setPreview] = useState('');
  const [busy, setBusy] = useState(false);
  const [copied, setCopied] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  const canGenerate = credits > 0 && !busy;
  const canImprove = improveInput.trim().length > 0 && credits > 0 && !busy;

  const generate = async () => {
    if (!canGenerate) return;
    setBusy(true);
    try {
      trackEvent('snippet_generate', { tone, format, length });
      
      const text = composeSnippet({
        topic, student, positives, concern, nextSteps, extra, tone, length, language, format
      });
      setPreview(text);
      setVariations([]); // Clear variations when generating new
      spend();
      
      // Scroll preview into view on mobile
      setTimeout(() => previewRef.current?.scrollIntoView({behavior: 'smooth', block: 'center'}), 100);
    } finally {
      setBusy(false);
    }
  };
  
  const improveNote = async () => {
    if (!canImprove) return;
    setBusy(true);
    try {
      trackEvent('snippet_improve', { length: improveInput.length });
      
      // Simple improvement: apply post-processing and length adjustment
      let improved = improveInput;
      
      // Remove banned language
      bannedWords.forEach(banned => {
        const regex = new RegExp(`\\b${banned}\\b`, 'gi');
        improved = improved.replace(regex, 'challenging');
      });
      
      // Apply post-processing
      improved = postProcessMessage(improved);
      
      setPreview(improved);
      setVariations([]);
      spend();
      
      setTimeout(() => previewRef.current?.scrollIntoView({behavior: 'smooth', block: 'center'}), 100);
    } finally {
      setBusy(false);
    }
  };
  
  const generateVariation = async () => {
    if (!preview || !canGenerate) return;
    setBusy(true);
    try {
      trackEvent('snippet_variation');
      
      // Generate a variation by adjusting tone slightly
      const text = composeSnippet({
        topic: topic + ' (variation)', student, positives, concern, nextSteps, extra, tone, length, language, format
      });
      
      const newVariations = [text, ...variations.slice(0, 2)]; // Keep last 3
      setVariations(newVariations);
      spend();
    } finally {
      setBusy(false);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(preview);
      setCopied(true);
      trackEvent('snippet_copy');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API not available or permission denied
    }
  };
  
  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey)) {
        if (e.key === 'Enter') {
          e.preventDefault();
          if (improveInput.trim()) {
            improveNote();
          } else {
            generate();
          }
        } else if (e.key === 'v') {
          e.preventDefault();
          generateVariation();
        } else if (e.key === 'c' && preview) {
          e.preventDefault();
          copyToClipboard();
        }
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [canGenerate, canImprove, preview, improveInput]);

  const resetAll = () => {
    setTopic(''); setStudent(''); setPositives(''); setConcern('');
    setNextSteps(''); setExtra(''); setTone('warm'); setLength(105);
    setLanguage('English'); setFormat('email'); setPreview('');
    setImproveInput(''); setVariations([]);
  };

  const used = useMemo(() => Math.max(0, FREE_DAILY_CREDITS - credits), [credits]);

  return (
    <section id="snippet-tool" className="relative py-8">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-4 flex items-center gap-3">
          <Sparkles className="h-5 w-5" />
          <h3 className="text-xl font-semibold">Smart Snippet Writer</h3>
          <span className="ml-auto text-sm text-slate-500">
            {credits} free {credits === 1 ? 'message' : 'messages'} left today
          </span>
        </div>

        <div className="grid gap-4 md:grid-cols-2 max-h-[720px]">
          {/* Left: Inputs */}
          <div className="relative z-30 overflow-visible rounded-2xl border border-slate-200/60 bg-white/80 p-4 md:p-5 backdrop-blur dark:border-slate-700 dark:bg-slate-900/60">
            <div className="grid grid-cols-1 gap-3">
              {/* Improve existing note section */}
              <div className="border-b border-slate-200 dark:border-slate-700 pb-3 mb-3">
                <LabeledTextarea 
                  label="Improve my note (paste draft here)" 
                  value={improveInput} 
                  onChange={setImproveInput}
                  placeholder="Paste your draft message here to improve tone, grammar, and formatting..."
                  rows={3}
                />
                <Button
                  onClick={improveNote}
                  disabled={!canImprove}
                  size="sm"
                  className={clsx(
                    "mt-2",
                    canImprove
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "bg-slate-300 text-slate-600 dark:bg-slate-700 dark:text-slate-400 cursor-not-allowed"
                  )}
                  title={!improveInput.trim() ? "Paste a draft to improve." : undefined}
                >
                  <Sparkles className="h-4 w-4 mr-2" />
                  Improve my note
                </Button>
              </div>
              
              {/* Generate new section */}
              <LabeledInput label="Topic / context" value={topic} onChange={setTopic} placeholder="e.g., Week 3 progress in fractions; class behavior routines; field trip info" />

              <div className="grid gap-3 md:grid-cols-2">
                <LabeledInput label="Student (optional)" value={student} onChange={setStudent} placeholder="e.g., Jordan A." />
                <EnhancedSelect
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

              <div className="grid gap-3 md:grid-cols-3">
                <EnhancedSelect
                  label="Format"
                  value={format}
                  onChange={v => setFormat(v as MessageFormat)}
                  options={[
                    {label:'Email', value:'email'},
                    {label:'SMS/Text', value:'sms'},
                  ]}
                />
                <EnhancedSelect
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
                  label={`Length: ${length} words`}
                  value={length}
                  min={format === 'sms' ? 45 : 90} 
                  max={format === 'sms' ? 70 : 120} 
                  step={5}
                  onChange={setLength}
                />
              </div>

              <LabeledTextarea label="Positives (optional)"
                value={positives} onChange={setPositives}
                placeholder="Strengths noticed, wins, improvements…"
                rows={2}
              />
              <LabeledTextarea label="What we're working on (optional)"
                value={concern} onChange={setConcern}
                placeholder="One clear area; keep factual & neutral…"
                rows={2}
              />
              <LabeledTextarea label="Next steps (optional)"
                value={nextSteps} onChange={setNextSteps}
                placeholder="What we'll do in class; how families can help…"
                rows={2}
              />
              <LabeledTextarea label="Extra notes (optional)"
                value={extra} onChange={setExtra}
                placeholder="Logistics, reminders, resources, thanks…"
                rows={2}
              />

              <div className="max-w-[320px] md:self-start w-full">
                <div className="flex items-center gap-2 mb-2">
                  <Button
                    onClick={generate}
                    disabled={!canGenerate}
                    className={clsx(
                      "flex-1",
                      canGenerate
                        ? "bg-violet-600 text-white hover:bg-violet-700"
                        : "bg-slate-300 text-slate-600 dark:bg-slate-700 dark:text-slate-400 cursor-not-allowed"
                    )}
                  >
                    <Sparkles className="h-4 w-4 mr-2" />
                    {busy ? 'Generating…' : 'Generate'}
                  </Button>

                  <Button
                    onClick={generateVariation}
                    disabled={!preview || !canGenerate}
                    variant="outline"
                    size="sm"
                    title="Generate variation (Ctrl/Cmd+V)"
                  >
                    <RefreshCw className="h-4 w-4" />
                  </Button>

                  <Button
                    onClick={resetAll}
                    variant="outline"
                    size="sm"
                  >
                    Reset
                  </Button>
                </div>
                
                <p className="text-xs text-slate-500 mb-2">
                  <strong>5 free messages/day</strong> – full editing and history in Promptly.
                </p>
                
                {credits === 0 && (
                  <div className="flex items-center gap-2 rounded-lg bg-amber-50 px-3 py-2 text-amber-800 dark:bg-amber-900/30 dark:text-amber-200">
                    <Lock className="h-4 w-4" />
                    <span className="text-sm">
                      Daily limit reached. <a href="/pricing" className="underline">Get unlimited</a>
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right: Preview */}
          <div
            ref={previewRef}
            className="relative z-10 overflow-visible rounded-2xl border border-slate-200/60 bg-white/90 backdrop-blur dark:border-slate-700 dark:bg-slate-900/60"
          >
            <div className="flex items-center justify-between border-b border-slate-200/60 p-3 dark:border-slate-700">
              <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                <Info className="h-4 w-4" />
                <span className="text-sm">Message about {student || 'your child'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  onClick={copyToClipboard}
                  disabled={!preview}
                  variant="outline"
                  size="sm"
                  title="Copy to clipboard (Ctrl/Cmd+C)"
                >
                  <Copy className="h-4 w-4 mr-1" />
                  {copied ? 'Copied!' : 'Copy'}
                </Button>
                
                <SharePopover text={preview} student={student} />
              </div>
            </div>

            {/* Doc view container */}
            <div className="mx-auto bg-white border border-slate-200 shadow-2xl rounded-[6px] p-8 md:p-10 max-w-[760px] min-h-[560px] max-h-[680px] overflow-auto m-4">
              <article className="prose prose-slate max-w-[68ch]">
                {preview ? (
                  <div className="whitespace-pre-wrap break-words text-sm leading-[1.55] space-y-3">
                    {preview}
                  </div>
                ) : (
                  <div className="text-slate-500 text-center py-16">
                    <div className="text-4xl mb-4">📝</div>
                    <p className="text-lg font-medium mb-2">Your message will appear here</p>
                    <p className="text-sm">Generate or improve a message to see the preview</p>
                  </div>
                )}
                
                {variations.length > 0 && (
                  <div className="mt-8 pt-6 border-t border-slate-200">
                    <h4 className="text-sm font-semibold text-slate-700 mb-3">Variations</h4>
                    <div className="space-y-4">
                      {variations.map((variation, index) => (
                        <div key={index} className="p-3 bg-slate-50 rounded-lg text-sm leading-[1.55]">
                          <div className="whitespace-pre-wrap">{variation}</div>
                          <Button
                            onClick={() => setPreview(variation)}
                            size="sm"
                            variant="outline"
                            className="mt-2"
                          >
                            Use this version
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </article>
              
              {/* Footer CTA */}
              {preview && (
                <div className="mt-8 pt-6 border-t border-slate-200 text-center">
                  <p className="text-sm text-slate-600 mb-3">Love this? Save and refine in Promptly</p>
                  <Button size="sm" variant="outline" asChild>
                    <a href="/pricing">Try Promptly Pro</a>
                  </Button>
                </div>
              )}
              
              {SHOW_WATERMARK && (
                <div className="text-center mt-6 pt-4 border-t border-slate-200">
                  <p className="text-xs text-slate-400">Made with Promptly – free demo</p>
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
        className="rounded-lg border border-slate-300 bg-white/80 px-3 py-2.5 text-sm outline-none placeholder:text-slate-400 focus:border-violet-500 focus:ring-1 focus:ring-violet-500 dark:border-slate-600 dark:bg-slate-900/60"
      />
    </label>
  );
}

function LabeledTextarea(props: {
  label: string; value: string; onChange: (v:string)=>void; placeholder?: string; rows?: number;
}) {
  return (
    <label className="grid gap-1">
      <span className="text-xs font-medium text-slate-600 dark:text-slate-300">{props.label}</span>
      <textarea
        value={props.value}
        onChange={(e)=>props.onChange(e.target.value)}
        placeholder={props.placeholder}
        rows={props.rows ?? 3}
        wrap="soft"
        className={clsx(
          "min-h-[80px] resize-y rounded-lg border border-slate-300 bg-white/80 px-3 py-2.5 text-sm outline-none",
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

function EnhancedSelect(props:{
  label: string;
  value: string;
  onChange: (v:string)=>void;
  options: {label:string; value:string}[];
}) {
  return (
    <label className="grid gap-1">
      <span className="text-xs font-medium text-slate-600 dark:text-slate-300">{props.label}</span>
      <Select value={props.value} onValueChange={props.onChange}>
        <SelectTrigger className="py-2.5 bg-white/80 border-slate-300 focus:border-violet-500 focus:ring-1 focus:ring-violet-500 dark:border-slate-600 dark:bg-slate-900/60">
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="z-[100] bg-popover text-popover-foreground border shadow-2xl rounded-md max-h-72 overflow-auto">
          {props.options.map(o=>(
            <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </label>
  );
}

/* ---------- Share component ---------- */
function SharePopover({ text, student }: { text: string; student?: string }) {
  if (!text) return null;
  
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm">
          <Share2 className="h-4 w-4 mr-1" />
          Share
        </Button>
      </PopoverTrigger>
      <PopoverContent 
        side="bottom" 
        align="end" 
        sideOffset={8}
        className="z-[100] bg-popover text-popover-foreground border shadow-2xl rounded-md w-56 p-3"
      >
        <div className="space-y-2">
          <Button
            onClick={() => shareMessage(text, student, 'email')}
            variant="ghost"
            size="sm"
            className="w-full justify-start"
          >
            <Mail className="h-4 w-4 mr-2" />
            Email
          </Button>
          <Button
            onClick={() => shareMessage(text, student, 'whatsapp')}
            variant="ghost"
            size="sm"
            className="w-full justify-start"
          >
            <MessageCircle className="h-4 w-4 mr-2" />
            WhatsApp
          </Button>
          <Button
            onClick={() => shareMessage(text, student, 'copy')}
            variant="ghost"
            size="sm"
            className="w-full justify-start"
          >
            <Link2 className="h-4 w-4 mr-2" />
            Copy Link
          </Button>
          {navigator.share && (
            <Button
              onClick={() => shareMessage(text, student, 'native')}
              variant="ghost"
              size="sm"
              className="w-full justify-start"
            >
              <Share2 className="h-4 w-4 mr-2" />
              More options
            </Button>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}