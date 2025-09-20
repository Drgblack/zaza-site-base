'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Copy, RefreshCw, Sparkles, ChevronDown, BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';
import { FormSelect } from '@/components/ui/FormSelect';
import { ShareMenu } from '@/components/ui/ShareMenu';
import { QuotaBadge } from '@/components/QuotaBadge';
import { useQuota } from '@/components/hooks/useQuota';
import { STARTERS, type Starter } from '@/data/snippet-presets';
import { TemplateLibrary } from '@/components/TemplateLibrary';
import { MessageTemplate, applyTemplate } from '@/lib/templates';


interface TrySnippetMinimalProps {
  className?: string;
}

export default function TrySnippetMinimal({ className }: TrySnippetMinimalProps) {
  // State
  const [selectedStarter, setSelectedStarter] = useState<Starter['id']>('behaviour');
  const [studentField, setStudentField] = useState('');
  const [tone, setTone] = useState('supportive');
  const [language, setLanguage] = useState('English');
  const [format, setFormat] = useState<'email' | 'sms'>('email');
  const [draft, setDraft] = useState('');
  
  // More options (hidden by default)
  const [showMore, setShowMore] = useState(false);
  const [positives, setPositives] = useState('');
  const [focus, setFocus] = useState('');
  const [next, setNext] = useState('');
  
  // Output and UI state
  const [output, setOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [previewMode, setPreviewMode] = useState<'static' | 'realtime'>('static');
  const [realtimePreview, setRealtimePreview] = useState('');
  const [isPreviewLoading, setIsPreviewLoading] = useState(false);
  const [showTemplateLibrary, setShowTemplateLibrary] = useState(false);
  
  const quota = useQuota();
  const previewRef = useRef<HTMLDivElement>(null);
  const realtimeTimeoutRef = useRef<NodeJS.Timeout>();

  // Smart student name detection
  function detectStudentFromDraft(draft: string): string | null {
    // naive first-name detector: first capitalized word at the start,
    // or after "about", "re", etc. Improve if needed.
    const m =
      draft.match(/^\s*([A-Z][a-z]+)\b/) ||
      draft.match(/\b(?:about|re|re:)\s+([A-Z][a-z]+)\b/i);
    return m ? m[1] : null;
  }

  const detected = detectStudentFromDraft(draft);
  const student = (studentField || detected || '').trim() || 'the student';

  // Real-time preview generation
  const generateRealtimePreview = async () => {
    if (!draft || draft.length < 10) {
      setRealtimePreview('');
      return;
    }

    setIsPreviewLoading(true);
    try {
      const response = await fetch('/api/snippet/preview', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          draft,
          student,
          tone,
          format
        })
      });
      
      const data = await response.json();
      if (data.preview) {
        setRealtimePreview(data.preview);
      }
    } catch (error) {
      console.error('Preview generation failed:', error);
    } finally {
      setIsPreviewLoading(false);
    }
  };

  // Debounced real-time preview
  useEffect(() => {
    if (previewMode === 'realtime' && draft) {
      if (realtimeTimeoutRef.current) {
        clearTimeout(realtimeTimeoutRef.current);
      }
      
      realtimeTimeoutRef.current = setTimeout(() => {
        generateRealtimePreview();
      }, 1000); // 1 second debounce
    }
    
    return () => {
      if (realtimeTimeoutRef.current) {
        clearTimeout(realtimeTimeoutRef.current);
      }
    };
  }, [draft, student, tone, format, previewMode]);

  // Load starter preset
  const currentStarter = STARTERS.find(s => s.id === selectedStarter) || STARTERS[0];

  // Auto-generate on mount
  useEffect(() => {
    if (!output) {
      handleGenerate();
    }
  }, []);

  // Update presets when starter changes
  useEffect(() => {
    if (currentStarter.seed.positives && !positives) {
      setPositives(currentStarter.seed.positives);
    }
    if (currentStarter.seed.focus && !focus) {
      setFocus(currentStarter.seed.focus);
    }
    if (currentStarter.seed.next && !next) {
      setNext(currentStarter.seed.next);
    }
  }, [selectedStarter, currentStarter]);

  const handleGenerate = async () => {
    if (!quota.data || quota.data.remaining <= 0) return;
    
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/snippet/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          starter: selectedStarter,
          format,
          tone,
          student,
          language,
          draft: draft || null,
          mode: 'generate'
        })
      });
      
      const data = await response.json();
      
      if (data.text) {
        setOutput(data.text);
        quota.bumpLocal();
      } else {
        console.error('Generation failed:', data.error);
        setOutput(createFallback());
      }
    } catch (error) {
      console.error('Generation error:', error);
      setOutput(createFallback());
    } finally {
      setIsLoading(false);
    }
  };

  const handleImprove = async () => {
    if (!draft || !quota.data || quota.data.remaining <= 0) return;
    
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/snippet/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          starter: selectedStarter,
          format,
          tone,
          student,
          language,
          draft: draft,
          mode: 'improve'
        })
      });
      
      const data = await response.json();
      
      if (data.text) {
        setOutput(data.text);
        quota.bumpLocal();
      } else {
        console.error('Improve failed:', data.error);
        setOutput(createFallback());
      }
    } catch (error) {
      console.error('Improve error:', error);
      setOutput(createFallback());
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewVariation = async () => {
    if (!quota.data || quota.data.remaining <= 0) return;
    
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/snippet/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          starter: selectedStarter,
          format,
          tone,
          student,
          language,
          draft: null,
          mode: 'generate' // No draft for variations
        })
      });
      
      const data = await response.json();
      
      if (data.text) {
        setOutput(data.text);
        quota.bumpLocal();
      } else {
        console.error('Variation failed:', data.error);
        setOutput(createFallback());
      }
    } catch (error) {
      console.error('Variation error:', error);
      setOutput(createFallback());
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async () => {
    if (!output) return;
    
    try {
      await navigator.clipboard.writeText(output);
      // Copy doesn't count against quota
    } catch (error) {
      console.error('Copy failed:', error);
    }
  };

  const handleShareEmail = () => {
    const subject = `Quick note about ${student || 'your child'}`;
    const body = output.slice(0, 160) + '...\n\nMade with Promptly – free demo at https://promptly.so/?utm_source=try_snippet&utm_medium=share&utm_campaign=demo';
    window.open(`mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
  };

  const handleShareWhatsApp = () => {
    const body = output.slice(0, 160) + '...\n\nMade with Promptly – free demo at https://promptly.so/?utm_source=try_snippet&utm_medium=share&utm_campaign=demo';
    window.open(`https://wa.me/?text=${encodeURIComponent(body)}`);
  };

  const handleShareCopyLink = () => {
    const body = output.slice(0, 160) + '...\n\nMade with Promptly – free demo at https://promptly.so/?utm_source=try_snippet&utm_medium=share&utm_campaign=demo';
    navigator.clipboard.writeText(body);
  };

  const handleSelectTemplate = (template: MessageTemplate) => {
    // Apply template and fill form fields
    const appliedContent = applyTemplate(template, student);
    setOutput(appliedContent);
    
    // Update form fields to match template
    setSelectedStarter(template.starter as Starter['id']);
    setTone(template.tone);
    setFormat(template.format);
    
    // Close template library
    setShowTemplateLibrary(false);
  };

  const getCurrentMessage = () => {
    if (!output) return undefined;
    
    return {
      content: output,
      starter: selectedStarter,
      format,
      tone,
      student
    };
  };

  const createFallback = () => {
    const studentName = student || 'your child';
    return `Hi there! I wanted to share a quick update about ${studentName}.

${studentName} brings positive energy to our classroom and works well with classmates. Today I noticed some areas where we can work together to support ${studentName === 'your child' ? 'them' : 'him'} even more.

At home, you might try checking in after school about the day's highlights. This can help reinforce the learning we're doing in class.

Please feel free to reach out if you have any questions. Thanks for being such a supportive partner!`;
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
        e.preventDefault();
        if (draft) {
          handleImprove();
        } else {
          handleGenerate();
        }
      } else if (e.key === 'v' && !e.metaKey && !e.ctrlKey && document.activeElement?.tagName !== 'TEXTAREA') {
        e.preventDefault();
        handleNewVariation();
      } else if (e.key === 'c' && !e.metaKey && !e.ctrlKey && document.activeElement?.tagName !== 'TEXTAREA') {
        e.preventDefault();
        handleCopy();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [draft, output, quota.data]);

  const isAtLimit = !quota.data || quota.data.remaining <= 0;

  return (
    <main className={cn("snippet-page w-full max-w-6xl mx-auto", className)}>
      <section className="rounded-2xl border border-white/10 bg-[#0a0f1d]/70 p-5 shadow-xl backdrop-blur">
        <header className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-100">Comment Coach</h2>
          <p className="text-xs text-slate-400">Write polished parent messages in seconds.</p>
        </header>
        <div className="grid md:grid-cols-[380px_1fr] gap-5 md:gap-6">
          {/* Controls Column */}
          <div className="relative z-30 overflow-visible space-y-4">
            {/* Preset Chips */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-slate-300">Choose a starter</label>
              <div className="flex flex-wrap gap-2 max-h-[56px] overflow-y-auto">
                {STARTERS.map((starter) => (
                  <button
                    key={starter.id}
                    onClick={() => setSelectedStarter(starter.id)}
                    className={cn(
                      "px-3 py-1.5 rounded-full text-sm font-medium transition-colors",
                      selectedStarter === starter.id
                        ? "bg-purple-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    )}
                  >
                    {starter.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Draft Input */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-slate-300">Your draft (optional)</label>
              <textarea
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                spellCheck
                rows={6}
                placeholder="Paste your note here to improve it..."
                className="w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm leading-6 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/20 [font-variant-ligatures:normal] resize-vertical"
              />
            </div>

            {/* Student Name and Tone */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <label className="text-xs font-medium text-slate-300">Student</label>
                <input
                  type="text"
                  value={studentField}
                  onChange={(e) => setStudentField(e.target.value)}
                  placeholder="e.g., Alex"
                  className="w-full px-3 py-2.5 rounded-md border border-white/10 bg-white/5 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/20"
                />
                {detected && detected !== studentField && (
                  <button
                    type="button"
                    onClick={() => setStudentField(detected)}
                    className="mt-1 inline-flex items-center gap-1 rounded-full bg-white/10 px-2 py-0.5 text-xs text-white hover:bg-white/15"
                    title="Use name detected from your draft"
                  >
                    Use "{detected}"
                  </button>
                )}
              </div>

              <FormSelect
                label="Tone"
                value={tone}
                onChange={setTone}
                options={[
                  {value:"supportive",label:"Supportive"},
                  {value:"concise",label:"Concise"},
                  {value:"friendly",label:"Friendly"},
                  {value:"formal",label:"Formal"},
                ]}
              />
            </div>

            {/* Language */}
            <FormSelect
              label="Language"
              value={language}
              onChange={setLanguage}
              options={[
                {value:"English",label:"English"},
                {value:"German",label:"German"},
                {value:"Spanish",label:"Spanish"},
                {value:"French",label:"French"},
                {value:"Italian",label:"Italian"},
              ]}
            />

            {/* More Options */}
            <div className="space-y-3">
              <button
                onClick={() => setShowMore(!showMore)}
                className="flex items-center gap-2 text-xs text-slate-400 hover:text-slate-200"
              >
                <ChevronDown className={cn("h-3 w-3 transition-transform", showMore && "rotate-180")} />
                More options
              </button>
              
              {showMore && (
                <div className="space-y-3 pl-5">
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-slate-300">Positives</label>
                    <Textarea
                      value={positives}
                      onChange={(e) => setPositives(e.target.value)}
                      placeholder={currentStarter.seed.positives}
                      className="min-h-[60px] py-2.5"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-slate-300">Focus</label>
                    <Textarea
                      value={focus}
                      onChange={(e) => setFocus(e.target.value)}
                      placeholder={currentStarter.seed.focus}
                      className="min-h-[60px] py-2.5"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-slate-300">Next steps</label>
                    <Textarea
                      value={next}
                      onChange={(e) => setNext(e.target.value)}
                      placeholder={currentStarter.seed.next}
                      className="min-h-[60px] py-2.5"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-2">
              <Button
                onClick={handleGenerate}
                disabled={isLoading || isAtLimit}
                className="flex-none"
              >
                {isLoading ? <RefreshCw className="h-4 w-4 animate-spin mr-2" /> : <Sparkles className="h-4 w-4 mr-2" />}
                Generate
              </Button>
              
              <Button
                onClick={handleImprove}
                disabled={isLoading || isAtLimit || !draft}
                variant="outline"
                className="flex-none"
              >
                <Sparkles className="h-4 w-4 mr-2" />
                Improve my note
              </Button>
              
              <Button
                onClick={handleNewVariation}
                disabled={isLoading || isAtLimit || !output}
                variant="outline"
                className="flex-none"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                New variation
              </Button>
              
              <Button
                onClick={handleCopy}
                disabled={!output}
                variant="outline"
                className="flex-none"
              >
                <Copy className="h-4 w-4 mr-2" />
                Copy
              </Button>
              
              <Button
                onClick={() => setShowTemplateLibrary(true)}
                variant="outline"
                className="flex-none"
              >
                <BookOpen className="h-4 w-4 mr-2" />
                Templates
              </Button>
              
              <Button variant="outline" className="flex-none">
                Start Free Trial
              </Button>
            </div>

            {/* Usage Counter */}
            <div className="flex justify-center">
              <QuotaBadge />
            </div>
          </div>

          {/* Preview Column */}
          <div className="relative z-20">
            {/* Rate Limit Overlay */}
            {isAtLimit && (
              <div 
                className="absolute inset-0 bg-white/95 backdrop-blur-sm z-20 flex items-center justify-center rounded-lg"
                data-noninteractive
                aria-hidden="true"
              >
                <div className="text-center space-y-4" style={{ pointerEvents: 'auto' }}>
                  <h3 className="text-lg font-semibold">You've used your {quota.data?.limit || 5} free messages this month.</h3>
                  <div className="space-x-3">
                    <Button>Start Free Trial</Button>
                    <Button variant="outline">See plans</Button>
                  </div>
                </div>
              </div>
            )}

            {/* Document Preview */}
            <div className="space-y-3 mb-4 relative z-40">
              <div className="flex items-end justify-between">
                <div className="flex items-center gap-3">
                  <FormSelect
                    label="Format"
                    value={format}
                    onChange={(value) => setFormat(value as 'email' | 'sms')}
                    options={[
                      {value:"email",label:"Email"},
                      {value:"sms",label:"SMS"},
                    ]}
                    className="min-w-[180px]"
                  />
                </div>
                
                <ShareMenu
                  onEmail={handleShareEmail}
                  onWhatsApp={handleShareWhatsApp}
                  onCopyLink={handleShareCopyLink}
                />
              </div>
              
              {/* Preview Mode Toggle */}
              <div className="flex items-center gap-2">
                <label className="text-xs font-medium text-slate-300">Preview Mode:</label>
                <div className="flex items-center gap-1 bg-white/5 rounded-md p-1">
                  <button
                    onClick={() => setPreviewMode('static')}
                    className={`px-2 py-1 text-xs rounded transition-colors ${
                      previewMode === 'static'
                        ? 'bg-white/20 text-white'
                        : 'text-white/60 hover:text-white/80'
                    }`}
                  >
                    Static
                  </button>
                  <button
                    onClick={() => setPreviewMode('realtime')}
                    className={`px-2 py-1 text-xs rounded transition-colors ${
                      previewMode === 'realtime'
                        ? 'bg-white/20 text-white'
                        : 'text-white/60 hover:text-white/80'
                    }`}
                  >
                    Live Preview
                  </button>
                </div>
              </div>
            </div>

            <section
              ref={previewRef}
              data-snippet-editor
              aria-live="polite"
              className="prose prose-invert max-w-none whitespace-pre-wrap break-words leading-relaxed rounded-lg border border-white/10 bg-[#0f1322] p-4 max-h-[560px] overflow-auto"
            >
              {(isLoading || isPreviewLoading) ? (
                <div className="flex items-center justify-center h-32 not-prose">
                  <RefreshCw className="h-6 w-6 animate-spin text-fuchsia-500" />
                  <span className="ml-2 text-sm text-white/60">
                    {isLoading ? 'Generating...' : 'Live preview...'}
                  </span>
                </div>
              ) : (
                <div className="text-white not-prose">
                  {previewMode === 'realtime' && draft && realtimePreview
                    ? realtimePreview
                    : output || (previewMode === 'realtime' && draft ? 'Type more to see live preview...' : 'Generate your first message...')}
                </div>
              )}
            </section>
          </div>
        </div>
      </section>
      
      {/* Template Library Modal */}
      <TemplateLibrary
        isOpen={showTemplateLibrary}
        onClose={() => setShowTemplateLibrary(false)}
        onSelectTemplate={handleSelectTemplate}
        currentMessage={getCurrentMessage()}
      />
    </main>
  );
}