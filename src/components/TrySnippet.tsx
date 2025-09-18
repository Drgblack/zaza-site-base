'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Copy, RefreshCw, Sparkles, ChevronDown, Share2, Mail, MessageCircle, Link2, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { quickStartPresets } from '@/lib/snippetPrompt';
import { polish, fallbackMessage } from '@/lib/textPostProcess';

const HOTFIX_ENABLED = process.env.NEXT_PUBLIC_SNIPPET_HOTFIX === 'true';
const FREE_DAILY_MESSAGES = Number(process.env.NEXT_PUBLIC_SNIPPET_FREE_CREDITS ?? 4);
const FREE_DAILY_COPIES = 3;

// Daily usage tracking
function useDailyLimits() {
  const [messages, setMessages] = useState(FREE_DAILY_MESSAGES);
  const [copies, setCopies] = useState(FREE_DAILY_COPIES);

  useEffect(() => {
    const today = new Date().toDateString();
    const msgKey = `snippet_messages_${today}`;
    const copyKey = `snippet_copies_${today}`;
    
    const usedMessages = Number(localStorage.getItem(msgKey) || '0');
    const usedCopies = Number(localStorage.getItem(copyKey) || '0');
    
    setMessages(Math.max(0, FREE_DAILY_MESSAGES - usedMessages));
    setCopies(Math.max(0, FREE_DAILY_COPIES - usedCopies));
  }, []);

  const useMessage = () => {
    if (messages <= 0) return false;
    const today = new Date().toDateString();
    const msgKey = `snippet_messages_${today}`;
    const used = Number(localStorage.getItem(msgKey) || '0') + 1;
    localStorage.setItem(msgKey, String(used));
    setMessages(Math.max(0, FREE_DAILY_MESSAGES - used));
    return true;
  };

  const useCopy = () => {
    if (copies <= 0) return false;
    const today = new Date().toDateString();
    const copyKey = `snippet_copies_${today}`;
    const used = Number(localStorage.getItem(copyKey) || '0') + 1;
    localStorage.setItem(copyKey, String(used));
    setCopies(Math.max(0, FREE_DAILY_COPIES - used));
    return true;
  };

  return { messages, copies, useMessage, useCopy };
}

interface TrySnippetProps {
  className?: string;
}

export default function TrySnippet({ className }: TrySnippetProps) {
  // State
  const [topic, setTopic] = useState('classroom behavior and focus');
  const [student, setStudent] = useState('Max');
  const [tone, setTone] = useState<string>('supportive');
  const [language, setLanguage] = useState('English');
  const [format, _setFormat] = useState<'email' | 'sms'>('email');
  
  // Advanced options (hidden by default)
  const [showMore, setShowMore] = useState(false);
  const [yourNote, setYourNote] = useState('');
  const [positives, setPositives] = useState('');
  const [focus, setFocus] = useState('');
  const [nextSteps, setNextSteps] = useState('');
  
  // Output state
  const [output, setOutput] = useState('');
  const [variations, setVariations] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [viewMode, setViewMode] = useState<'doc' | 'plain'>('doc');
  
  const { messages, copies, useMessage, useCopy } = useDailyLimits();
  const previewRef = useRef<HTMLDivElement>(null);

  // Auto-generate on first load
  useEffect(() => {
    if (!output && messages > 0) {
      handleGenerate();
    }
  }, [messages, output]); // Added missing dependency

  const handleGenerate = async () => {
    if (!useMessage()) return;
    
    setIsLoading(true);
    try {
      const response = await fetch('/api/snippet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic,
          student,
          positives,
          focus,
          nextSteps,
          tone,
          format,
          language
        })
      });
      
      const data = await response.json();
      
      if (data.success && data.message) {
        setOutput(data.message);
      } else {
        // Fallback on API failure
        setOutput(polish(fallbackMessage(student || undefined)));
      }
      
      // Scroll to preview on mobile
      setTimeout(() => {
        previewRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    } catch (error) {
      console.error('Generation failed:', error);
      setOutput(polish(fallbackMessage(student || undefined)));
    } finally {
      setIsLoading(false);
    }
  };

  const handleImproveNote = async () => {
    if (!yourNote.trim() || !useMessage()) return;
    
    setIsLoading(true);
    try {
      const response = await fetch('/api/snippet/rewrite', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          originalText: yourNote,
          tone,
          format,
          student
        })
      });
      
      const data = await response.json();
      
      if (data.success && data.message) {
        setOutput(data.message);
      } else {
        // Fallback on API failure
        const improved = polish(yourNote.replace(/\b(lazy|disruptive|bad)\b/gi, 'challenging'));
        setOutput(improved);
      }
    } catch (error) {
      console.error('Improve failed:', error);
      // Fallback on error
      const improved = polish(yourNote.replace(/\b(lazy|disruptive|bad)\b/gi, 'challenging'));
      setOutput(improved);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVariation = async () => {
    if (!output || !useMessage()) return;
    
    setIsLoading(true);
    try {
      const response = await fetch('/api/snippet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: topic + ' (variation)',
          student,
          positives,
          focus,
          nextSteps,
          tone,
          format,
          language
        })
      });
      
      const data = await response.json();
      
      if (data.success && data.message) {
        setVariations([data.message, ...variations.slice(0, 2)]);
      } else {
        // Fallback on API failure
        const variation = polish(fallbackMessage(student || undefined));
        setVariations([variation, ...variations.slice(0, 2)]);
      }
    } catch (error) {
      console.error('Variation failed:', error);
      // Fallback on error
      const variation = polish(fallbackMessage(student || undefined));
      setVariations([variation, ...variations.slice(0, 2)]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async () => {
    if (!output || !useCopy()) return;
    
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Copy failed:', error);
    }
  };

  const handleShare = (method: string) => {
    const subject = `Quick note about ${student || 'your child'}`;
    const teaser = output.slice(0, 160) + (output.length > 160 ? '…' : '');
    const siteUrl = 'https://zazapromptly.com';
    const utmParams = '?utm_source=try_snippet&utm_medium=share&utm_campaign=demo';
    const fullBody = `${teaser}\n\nMade with Promptly – free demo\n${siteUrl}${utmParams}`;
    
    switch (method) {
      case 'email':
        window.open(`mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(fullBody)}`);
        break;
      case 'whatsapp':
        window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(fullBody)}`);
        break;
      case 'copy':
        navigator.clipboard.writeText(`${teaser}\n\n${siteUrl}${utmParams}`);
        break;
      case 'native':
        if (navigator.share) {
          navigator.share({ title: subject, text: fullBody });
        }
        break;
    }
  };

  const handlePresetClick = (preset: typeof quickStartPresets[0]) => {
    setTopic(preset.topic);
    setTone(preset.tone);
  };

  if (!HOTFIX_ENABLED) {
    return null; // Fall back to existing component
  }

  const canGenerate = messages > 0 && !isLoading;
  const canCopy = copies > 0 && output;

  return (
    <section id="snippet-tool" className={cn("py-8", className)}>
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-4 text-center">
          <h3 className="text-2xl font-bold mb-2">Try Promptly's Smart Message Writer</h3>
          <p className="text-slate-600 dark:text-slate-300">Generate parent-ready messages in seconds</p>
        </div>

        <Card className="p-4 md:p-5 rounded-2xl border bg-card overflow-visible">
          <div className="grid md:grid-cols-[420px_1fr] gap-5 md:gap-6">
            {/* Controls */}
            <aside className="relative z-30 overflow-visible space-y-3 md:space-y-4">
              {/* Quick Start Chips */}
              <div>
                <label className="text-xs font-medium text-slate-600 dark:text-slate-300 mb-2 block">
                  Quick Start
                </label>
                <div className="flex flex-wrap gap-1.5 max-h-[56px] overflow-y-auto">
                  {quickStartPresets.map((preset, i) => (
                    <Badge
                      key={i}
                      variant={topic === preset.topic ? "default" : "outline"}
                      className="cursor-pointer hover:bg-primary/80 text-xs"
                      onClick={() => handlePresetClick(preset)}
                    >
                      {preset.label}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Essential Controls */}
              <div className="grid grid-cols-1 gap-3">
                <div>
                  <label className="text-xs font-medium text-slate-600 dark:text-slate-300 mb-1 block">
                    Student (optional)
                  </label>
                  <input
                    value={student}
                    onChange={(e) => setStudent(e.target.value)}
                    placeholder="e.g., Maya"
                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none placeholder:text-slate-400 focus:border-violet-500 focus:ring-1 focus:ring-violet-500 dark:border-slate-600 dark:bg-slate-900"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-medium text-slate-600 dark:text-slate-300 mb-1 block">
                      Tone
                    </label>
                    <Select value={tone} onValueChange={setTone}>
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="z-[100] bg-popover text-popover-foreground border shadow-2xl rounded-md max-h-72 overflow-auto">
                        <SelectItem value="warm">Warm</SelectItem>
                        <SelectItem value="supportive">Supportive</SelectItem>
                        <SelectItem value="professional">Professional</SelectItem>
                        <SelectItem value="encouraging">Encouraging</SelectItem>
                        <SelectItem value="understanding">Understanding</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-xs font-medium text-slate-600 dark:text-slate-300 mb-1 block">
                      Language
                    </label>
                    <Select value={language} onValueChange={setLanguage}>
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="z-[100] bg-popover text-popover-foreground border shadow-2xl rounded-md max-h-72 overflow-auto">
                        <SelectItem value="English">English</SelectItem>
                        <SelectItem value="Spanish">Español</SelectItem>
                        <SelectItem value="French">Français</SelectItem>
                        <SelectItem value="German">Deutsch</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* More Options */}
              <div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowMore(!showMore)}
                  className="text-slate-600 hover:text-slate-900 p-0 h-auto font-normal"
                >
                  <ChevronDown className={cn("h-4 w-4 mr-1 transition-transform", showMore && "rotate-180")} />
                  More options
                </Button>
                
                {showMore && (
                  <div className="mt-3 space-y-3 pt-3 border-t border-slate-200 dark:border-slate-700">
                    <div>
                      <label className="text-xs font-medium text-slate-600 dark:text-slate-300 mb-1 block">
                        Improve my note
                      </label>
                      <Textarea
                        value={yourNote}
                        onChange={(e) => setYourNote(e.target.value)}
                        placeholder="Paste your draft to improve tone, clarity, and parent-readiness."
                        rows={3}
                        className="text-sm"
                      />
                      <Button
                        onClick={handleImproveNote}
                        disabled={!yourNote.trim() || !canGenerate}
                        size="sm"
                        className="mt-2"
                      >
                        <Sparkles className="h-4 w-4 mr-1" />
                        Improve my note
                      </Button>
                    </div>

                    <div>
                      <label className="text-xs font-medium text-slate-600 dark:text-slate-300 mb-1 block">
                        Positives (optional)
                      </label>
                      <Textarea
                        value={positives}
                        onChange={(e) => setPositives(e.target.value)}
                        placeholder="Strengths noticed, wins, improvements..."
                        rows={2}
                        className="text-sm"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-medium text-slate-600 dark:text-slate-300 mb-1 block">
                        Focus area (optional)
                      </label>
                      <Textarea
                        value={focus}
                        onChange={(e) => setFocus(e.target.value)}
                        placeholder="What we're working on; keep factual & neutral..."
                        rows={2}
                        className="text-sm"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-medium text-slate-600 dark:text-slate-300 mb-1 block">
                        Next steps (optional)
                      </label>
                      <Textarea
                        value={nextSteps}
                        onChange={(e) => setNextSteps(e.target.value)}
                        placeholder="What we'll do in class; how families can help..."
                        rows={2}
                        className="text-sm"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-2">
                <Button
                  onClick={handleGenerate}
                  disabled={!canGenerate}
                  className="bg-violet-600 hover:bg-violet-700"
                >
                  <Sparkles className="h-4 w-4 mr-2" />
                  {isLoading ? 'Generating...' : 'Generate'}
                </Button>

                <Button
                  onClick={handleVariation}
                  disabled={!output || !canGenerate}
                  variant="outline"
                  size="sm"
                >
                  <RefreshCw className="h-4 w-4 mr-1" />
                  New Variation
                </Button>

                <Button
                  onClick={handleCopy}
                  disabled={!canCopy}
                  variant="outline"
                  size="sm"
                >
                  <Copy className="h-4 w-4 mr-1" />
                  {copied ? 'Copied!' : 'Copy'}
                </Button>

                <Button
                  asChild
                  variant="outline"
                  size="sm"
                >
                  <a href="/pricing">
                    <Plus className="h-4 w-4 mr-1" />
                    Start Free Trial
                  </a>
                </Button>
              </div>

              {/* Usage Info */}
              <p className="text-xs text-slate-500">
                <strong>{messages} free messages per day</strong> – full editing and history in Promptly.
              </p>

              {/* Share Menu */}
              {output && (
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="ghost" size="sm" className="self-start">
                      <Share2 className="h-4 w-4 mr-1" />
                      Share
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent 
                    side="bottom" 
                    align="start" 
                    sideOffset={8}
                    className="z-[100] w-56 bg-popover text-popover-foreground border shadow-2xl rounded-md p-3"
                  >
                    <div className="space-y-2">
                      <Button
                        onClick={() => handleShare('email')}
                        variant="ghost"
                        size="sm"
                        className="w-full justify-start"
                      >
                        <Mail className="h-4 w-4 mr-2" />
                        Email
                      </Button>
                      <Button
                        onClick={() => handleShare('whatsapp')}
                        variant="ghost"
                        size="sm"
                        className="w-full justify-start"
                      >
                        <MessageCircle className="h-4 w-4 mr-2" />
                        WhatsApp
                      </Button>
                      <Button
                        onClick={() => handleShare('copy')}
                        variant="ghost"
                        size="sm"
                        className="w-full justify-start"
                      >
                        <Link2 className="h-4 w-4 mr-2" />
                        Copy Link
                      </Button>
                      {navigator.share && (
                        <Button
                          onClick={() => handleShare('native')}
                          variant="ghost"
                          size="sm"
                          className="w-full justify-start"
                        >
                          <Share2 className="h-4 w-4 mr-2" />
                          Quick Share
                        </Button>
                      )}
                    </div>
                  </PopoverContent>
                </Popover>
              )}
            </aside>

            {/* Preview */}
            <section ref={previewRef} className="relative z-10">
              {messages === 0 && (
                <div className="absolute inset-0 bg-white/90 backdrop-blur-sm z-20 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <h4 className="font-semibold mb-2">Daily limit reached</h4>
                    <p className="text-sm text-slate-600 mb-3">Try unlimited messages with Promptly</p>
                    <Button asChild>
                      <a href="/pricing">Start Free Trial</a>
                    </Button>
                  </div>
                </div>
              )}

              <Tabs defaultValue="output" className="w-full">
                <div className="flex items-center justify-between mb-4">
                  <TabsList className="grid w-auto grid-cols-4">
                    <TabsTrigger value="output">Output</TabsTrigger>
                    {variations.length > 0 && (
                      <TabsTrigger value="variations">Variations</TabsTrigger>
                    )}
                    <TabsTrigger value="email">Email</TabsTrigger>
                    <TabsTrigger value="sms">SMS</TabsTrigger>
                  </TabsList>

                  <div className="flex items-center gap-2">
                    <Button
                      onClick={() => setViewMode(viewMode === 'doc' ? 'plain' : 'doc')}
                      variant="outline"
                      size="sm"
                    >
                      {viewMode === 'doc' ? 'Plain' : 'Doc'} view
                    </Button>
                  </div>
                </div>

                <TabsContent value="output" className="mt-0">
                  <PreviewContainer viewMode={viewMode} isLoading={isLoading}>
                    {output || (
                      <div className="text-slate-500 text-center py-16">
                        <div className="text-4xl mb-4">📝</div>
                        <p className="text-lg font-medium mb-2">Your message will appear here</p>
                        <p className="text-sm">Click Generate to create a parent-ready message</p>
                      </div>
                    )}
                  </PreviewContainer>
                </TabsContent>

                {variations.length > 0 && (
                  <TabsContent value="variations" className="mt-0">
                    <PreviewContainer viewMode={viewMode}>
                      <div className="space-y-4">
                        {variations.map((variation, index) => (
                          <div key={index} className="p-3 bg-slate-50 rounded-lg">
                            <div className="whitespace-pre-wrap text-sm leading-[1.55] mb-2">
                              {variation}
                            </div>
                            <Button
                              onClick={() => setOutput(variation)}
                              size="sm"
                              variant="outline"
                            >
                              Use this version
                            </Button>
                          </div>
                        ))}
                      </div>
                    </PreviewContainer>
                  </TabsContent>
                )}

                <TabsContent value="email" className="mt-0">
                  <PreviewContainer viewMode={viewMode}>
                    <div className="space-y-3">
                      <div className="text-sm">
                        <strong>To:</strong> parent@example.com
                      </div>
                      <div className="text-sm">
                        <strong>Subject:</strong> Quick note about {student || 'your child'}
                      </div>
                      <hr />
                      <div className="whitespace-pre-wrap text-sm leading-[1.55]">
                        {output || 'Generate a message to see email preview'}
                      </div>
                    </div>
                  </PreviewContainer>
                </TabsContent>

                <TabsContent value="sms" className="mt-0">
                  <PreviewContainer viewMode={viewMode}>
                    <div className="bg-blue-500 text-white p-3 rounded-2xl rounded-bl-sm max-w-sm ml-auto">
                      <div className="whitespace-pre-wrap text-sm leading-[1.55]">
                        {output ? output.slice(0, 160) + (output.length > 160 ? '...' : '') : 'Generate a message to see SMS preview'}
                      </div>
                    </div>
                  </PreviewContainer>
                </TabsContent>
              </Tabs>
            </section>
          </div>
        </Card>
      </div>
    </section>
  );
}

interface PreviewContainerProps {
  children: React.ReactNode;
  viewMode: 'doc' | 'plain';
  isLoading?: boolean;
}

function PreviewContainer({ children, viewMode, isLoading }: PreviewContainerProps) {
  if (viewMode === 'doc') {
    return (
      <div className="mx-auto bg-white border border-slate-200 shadow-2xl rounded-[6px] p-8 md:p-10 max-w-[740px] min-h-[520px] max-h-[640px] overflow-auto">
        <article className="prose prose-slate max-w-[68ch] leading-[1.55]">
          {isLoading ? (
            <div className="animate-pulse space-y-3">
              <div className="h-4 bg-slate-200 rounded w-3/4"></div>
              <div className="h-4 bg-slate-200 rounded w-full"></div>
              <div className="h-4 bg-slate-200 rounded w-5/6"></div>
            </div>
          ) : (
            <div className="whitespace-pre-wrap text-sm leading-[1.55]">
              {children}
            </div>
          )}
        </article>
        
        <div className="text-center mt-6 pt-4 border-t border-slate-200">
          <p className="text-xs text-slate-400">Made with Promptly – free demo</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 min-h-[300px]">
      {isLoading ? (
        <div className="animate-pulse space-y-3">
          <div className="h-4 bg-slate-200 rounded w-3/4"></div>
          <div className="h-4 bg-slate-200 rounded w-full"></div>
          <div className="h-4 bg-slate-200 rounded w-5/6"></div>
        </div>
      ) : (
        <div className="whitespace-pre-wrap text-sm leading-[1.55]">
          {children}
        </div>
      )}
    </div>
  );
}