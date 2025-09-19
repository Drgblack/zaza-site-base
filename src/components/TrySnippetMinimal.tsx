'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Copy, RefreshCw, Sparkles, ChevronDown, Share2, Mail, MessageCircle, Link2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { STARTERS, type Starter } from '@/data/snippet-presets';

const MAX_FREE_PER_MONTH = 5;

// Monthly usage tracking
function useMonthlyLimits() {
  const [used, setUsed] = useState(0);
  const [limit] = useState(MAX_FREE_PER_MONTH);

  useEffect(() => {
    const now = new Date();
    const monthKey = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
    const storageKey = `tryGenYm`;
    
    try {
      const stored = localStorage.getItem(storageKey);
      const data = stored ? JSON.parse(stored) : null;
      
      if (data?.ym === monthKey) {
        setUsed(data.used || 0);
      } else {
        // New month, reset counter
        localStorage.setItem(storageKey, JSON.stringify({ ym: monthKey, used: 0 }));
        setUsed(0);
      }
    } catch (error) {
      console.error('Error reading monthly usage:', error);
      setUsed(0);
    }
  }, []);

  const incrementUsage = () => {
    const now = new Date();
    const monthKey = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
    const storageKey = `tryGenYm`;
    const newUsed = used + 1;
    
    try {
      localStorage.setItem(storageKey, JSON.stringify({ ym: monthKey, used: newUsed }));
      setUsed(newUsed);
    } catch (error) {
      console.error('Error updating monthly usage:', error);
    }
  };

  return {
    used,
    limit,
    remaining: Math.max(0, limit - used),
    canUse: used < limit,
    incrementUsage
  };
}

interface TrySnippetMinimalProps {
  className?: string;
}

export default function TrySnippetMinimal({ className }: TrySnippetMinimalProps) {
  // State
  const [selectedStarter, setSelectedStarter] = useState<Starter['id']>('behaviour');
  const [student, setStudent] = useState('Max');
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
  const [shareOpen, setShareOpen] = useState(false);
  
  const usage = useMonthlyLimits();
  const previewRef = useRef<HTMLDivElement>(null);

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
    if (!usage.canUse) return;
    
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/snippet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: currentStarter.topic,
          student,
          language,
          tone,
          format,
          positives: positives || currentStarter.seed.positives,
          focus: focus || currentStarter.seed.focus,
          next: next || currentStarter.seed.next
        })
      });
      
      const data = await response.json();
      
      if (data.success) {
        setOutput(data.message);
        usage.incrementUsage();
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
    if (!draft.trim() || !usage.canUse) return;
    
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/snippet/rewrite', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          originalText: draft,
          student,
          language,
          tone,
          format
        })
      });
      
      const data = await response.json();
      
      if (data.success) {
        setOutput(data.message);
        usage.incrementUsage();
      }
    } catch (error) {
      console.error('Improve error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewVariation = async () => {
    if (!usage.canUse) return;
    
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/snippet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: currentStarter.topic + ' (variation)',
          student,
          language,
          tone,
          format,
          positives: positives || currentStarter.seed.positives,
          focus: focus || currentStarter.seed.focus,
          next: next || currentStarter.seed.next
        })
      });
      
      const data = await response.json();
      
      if (data.success) {
        setOutput(data.message);
        usage.incrementUsage();
      }
    } catch (error) {
      console.error('Variation error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async () => {
    if (!output || !usage.canUse) return;
    
    try {
      await navigator.clipboard.writeText(output);
      usage.incrementUsage();
    } catch (error) {
      console.error('Copy failed:', error);
    }
  };

  const handleShare = (platform: string) => {
    const subject = `Quick note about ${student || 'your child'}`;
    const body = output.slice(0, 160) + '...\n\nMade with Promptly – free demo at https://promptly.so/?utm_source=try_snippet&utm_medium=share&utm_campaign=demo';
    
    switch (platform) {
      case 'email':
        window.open(`mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
        break;
      case 'whatsapp':
        window.open(`https://wa.me/?text=${encodeURIComponent(body)}`);
        break;
      case 'copy':
        navigator.clipboard.writeText(body);
        break;
    }
    
    setShareOpen(false);
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
        if (draft.trim()) {
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
  }, [draft, output, usage.canUse]);

  const isAtLimit = !usage.canUse;

  return (
    <div className={cn("w-full max-w-6xl mx-auto", className)}>
      <Card className="p-4 md:p-5 rounded-2xl border overflow-visible">
        <div className="grid md:grid-cols-[380px_1fr] gap-5 md:gap-6">
          {/* Controls Column */}
          <div className="relative z-30 overflow-visible space-y-4">
            {/* Preset Chips */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground">Choose a starter</label>
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
              <label className="text-xs font-medium text-muted-foreground">Your draft (optional)</label>
              <Textarea
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder="Paste your note here to improve it..."
                className="min-h-[72px] py-2.5 resize-none"
                rows={3}
              />
            </div>

            {/* Student Name and Tone */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <label className="text-xs font-medium text-muted-foreground">Student</label>
                <input
                  type="text"
                  value={student}
                  onChange={(e) => setStudent(e.target.value)}
                  placeholder="e.g., Max"
                  className="w-full px-3 py-2.5 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-medium text-muted-foreground">Tone</label>
                <Select value={tone} onValueChange={setTone}>
                  <SelectTrigger 
                    className="py-2.5 bg-background border-input text-foreground focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:border-ring"
                    aria-label="Select message tone"
                  >
                    <SelectValue placeholder="Choose tone" />
                  </SelectTrigger>
                  <SelectContent
                    position="popper"
                    sideOffset={8}
                    className="z-50 bg-popover text-popover-foreground border border-border shadow-xl rounded-md min-w-[180px] max-h-72 overflow-auto"
                  >
                    <SelectItem 
                      value="supportive"
                      className="px-3 py-2 text-sm leading-6 hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground cursor-pointer"
                    >
                      Supportive
                    </SelectItem>
                    <SelectItem 
                      value="concise"
                      className="px-3 py-2 text-sm leading-6 hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground cursor-pointer"
                    >
                      Concise
                    </SelectItem>
                    <SelectItem 
                      value="friendly"
                      className="px-3 py-2 text-sm leading-6 hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground cursor-pointer"
                    >
                      Friendly
                    </SelectItem>
                    <SelectItem 
                      value="formal"
                      className="px-3 py-2 text-sm leading-6 hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground cursor-pointer"
                    >
                      Formal
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Language */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground">Language</label>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger 
                  className="py-2.5 bg-background border-input text-foreground focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:border-ring"
                  aria-label="Select message language"
                >
                  <SelectValue placeholder="Choose language" />
                </SelectTrigger>
                <SelectContent
                  position="popper"
                  sideOffset={8}
                  className="z-50 bg-popover text-popover-foreground border border-border shadow-xl rounded-md min-w-[200px] max-h-72 overflow-auto"
                >
                  <SelectItem 
                    value="English"
                    className="px-3 py-2 text-sm leading-6 hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground cursor-pointer"
                  >
                    English
                  </SelectItem>
                  <SelectItem 
                    value="German"
                    className="px-3 py-2 text-sm leading-6 hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground cursor-pointer"
                  >
                    German
                  </SelectItem>
                  <SelectItem 
                    value="Spanish"
                    className="px-3 py-2 text-sm leading-6 hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground cursor-pointer"
                  >
                    Spanish
                  </SelectItem>
                  <SelectItem 
                    value="French"
                    className="px-3 py-2 text-sm leading-6 hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground cursor-pointer"
                  >
                    French
                  </SelectItem>
                  <SelectItem 
                    value="Italian"
                    className="px-3 py-2 text-sm leading-6 hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground cursor-pointer"
                  >
                    Italian
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* More Options */}
            <div className="space-y-3">
              <button
                onClick={() => setShowMore(!showMore)}
                className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground"
              >
                <ChevronDown className={cn("h-3 w-3 transition-transform", showMore && "rotate-180")} />
                More options
              </button>
              
              {showMore && (
                <div className="space-y-3 pl-5">
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-muted-foreground">Positives</label>
                    <Textarea
                      value={positives}
                      onChange={(e) => setPositives(e.target.value)}
                      placeholder={currentStarter.seed.positives}
                      className="min-h-[60px] py-2.5"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-muted-foreground">Focus</label>
                    <Textarea
                      value={focus}
                      onChange={(e) => setFocus(e.target.value)}
                      placeholder={currentStarter.seed.focus}
                      className="min-h-[60px] py-2.5"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-muted-foreground">Next steps</label>
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
                disabled={isLoading || isAtLimit || !draft.trim()}
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
                disabled={!output || isAtLimit}
                variant="outline"
                className="flex-none"
              >
                <Copy className="h-4 w-4 mr-2" />
                Copy
              </Button>
              
              <Button variant="outline" className="flex-none">
                Start Free Trial
              </Button>
            </div>

            {/* Usage Counter */}
            <div className="text-xs text-muted-foreground text-center">
              {usage.remaining} free messages/month – unlimited in Promptly
            </div>
          </div>

          {/* Preview Column */}
          <div className="relative z-10">
            {/* Rate Limit Overlay */}
            {isAtLimit && (
              <div className="absolute inset-0 bg-white/95 backdrop-blur-sm z-20 flex items-center justify-center rounded-lg">
                <div className="text-center space-y-4">
                  <h3 className="text-lg font-semibold">You've used your 5 free messages this month.</h3>
                  <div className="space-x-3">
                    <Button>Start Free Trial</Button>
                    <Button variant="outline">See plans</Button>
                  </div>
                </div>
              </div>
            )}

            {/* Document Preview */}
            <div className="flex items-end justify-between mb-4">
              <div className="flex items-center gap-3">
                <Select value={format} onValueChange={setFormat as (value: string) => void}>
                  <SelectTrigger 
                    className="w-32 bg-background border-input text-foreground focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:border-ring"
                    aria-label="Select message format"
                  >
                    <SelectValue placeholder="Format" />
                  </SelectTrigger>
                  <SelectContent
                    position="popper"
                    sideOffset={8}
                    className="z-50 bg-popover text-popover-foreground border border-border shadow-xl rounded-md min-w-[120px]"
                  >
                    <SelectItem 
                      value="email"
                      className="px-3 py-2 text-sm leading-6 hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground cursor-pointer"
                    >
                      Email
                    </SelectItem>
                    <SelectItem 
                      value="sms"
                      className="px-3 py-2 text-sm leading-6 hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground cursor-pointer"
                    >
                      SMS
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Popover open={shareOpen} onOpenChange={setShareOpen}>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  side="bottom"
                  align="end"
                  sideOffset={8}
                  className="z-50 w-56 bg-popover text-popover-foreground border border-border shadow-xl rounded-md"
                >
                  <div className="space-y-1 p-1">
                    <button
                      onClick={() => handleShare('email')}
                      className="w-full flex items-center gap-3 px-3 py-2 text-sm text-left hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground rounded-md transition-colors"
                    >
                      <Mail className="h-4 w-4" />
                      Email
                    </button>
                    <button
                      onClick={() => handleShare('whatsapp')}
                      className="w-full flex items-center gap-3 px-3 py-2 text-sm text-left hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground rounded-md transition-colors"
                    >
                      <MessageCircle className="h-4 w-4" />
                      WhatsApp
                    </button>
                    <button
                      onClick={() => handleShare('copy')}
                      className="w-full flex items-center gap-3 px-3 py-2 text-sm text-left hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground rounded-md transition-colors"
                    >
                      <Link2 className="h-4 w-4" />
                      Copy link
                    </button>
                  </div>
                </PopoverContent>
              </Popover>
            </div>

            <div
              ref={previewRef}
              className="bg-white border border-slate-200 shadow-2xl rounded-[6px] p-8 md:p-10 max-w-[720px] min-h-[520px] max-h-[620px] overflow-auto leading-[1.55]"
            >
              {isLoading ? (
                <div className="flex items-center justify-center h-32">
                  <RefreshCw className="h-6 w-6 animate-spin text-purple-600" />
                </div>
              ) : (
                <div className="whitespace-pre-wrap text-gray-900">
                  {output || 'Generate your first message...'}
                </div>
              )}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}