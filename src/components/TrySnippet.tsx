'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Copy, RefreshCw, Sparkles, ChevronDown, Share2, Mail, MessageCircle, Link2, Eye } from 'lucide-react';
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

interface TrySnippetProps {
  className?: string;
}

export default function TrySnippet({ className }: TrySnippetProps) {
  // State
  const [selectedStarter, setSelectedStarter] = useState<Starter['id']>('behaviour');
  const [student, setStudent] = useState('Max');
  const [tone, setTone] = useState('supportive');
  const [language, setLanguage] = useState('English');
  const [format, setFormat] = useState<'email' | 'sms'>('email');
  const [draft, setDraft] = useState('');
  
  // Advanced options (hidden by default)
  const [showMore, setShowMore] = useState(false);
  const [positives, setPositives] = useState('');
  const [focus, setFocus] = useState('');
  const [next, setNext] = useState('');
  
  // Output and UI state
  const [output, setOutput] = useState('');
  const [variations, setVariations] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('output');
  const [docView, setDocView] = useState(true);
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
        setActiveTab('output');
      } else {
        console.error('Generation failed:', data.error);
        // Show fallback
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
        setActiveTab('output');
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
      // Generate a new variation with slightly different prompt
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
        setVariations(prev => [...prev, data.message]);
        usage.incrementUsage();
        setActiveTab('variations');
      }
    } catch (error) {
      console.error('Variation error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async () => {
    if (!output) return;
    
    try {
      await navigator.clipboard.writeText(output);
      // Could show a toast notification here
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
      <Card className="p-4 md:p-5">
        <div className="grid lg:grid-cols-2 gap-4 md:gap-5">
          {/* Controls Column */}
          <div className="relative z-30 overflow-visible space-y-4 md:space-y-5 max-w-[420px]">
            {/* Preset Chips */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Choose a starter</label>
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
              <label className="text-sm font-medium">Your draft (optional)</label>
              <Textarea
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder="Paste your note here to improve it..."
                className="min-h-[80px] py-2.5"
              />
              {draft.trim() && (
                <Button
                  onClick={handleImprove}
                  disabled={isLoading || isAtLimit}
                  className="w-full"
                >
                  {isLoading ? <RefreshCw className="h-4 w-4 animate-spin mr-2" /> : <Sparkles className="h-4 w-4 mr-2" />}
                  Improve my note
                </Button>
              )}
            </div>

            {/* Student Name */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <label className="text-sm font-medium">Student</label>
                <input
                  type="text"
                  value={student}
                  onChange={(e) => setStudent(e.target.value)}
                  placeholder="e.g., Max"
                  className="w-full px-3 py-2.5 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              {/* Tone */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Tone</label>
                <Select value={tone} onValueChange={setTone}>
                  <SelectTrigger className="py-2.5">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="supportive">Supportive</SelectItem>
                    <SelectItem value="concise">Concise</SelectItem>
                    <SelectItem value="friendly">Friendly</SelectItem>
                    <SelectItem value="formal">Formal</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Language */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Language</label>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger className="py-2.5">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="English">English</SelectItem>
                  <SelectItem value="German">German</SelectItem>
                  <SelectItem value="Spanish">Spanish</SelectItem>
                  <SelectItem value="French">French</SelectItem>
                  <SelectItem value="Italian">Italian</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* More Options */}
            <div className="space-y-3">
              <button
                onClick={() => setShowMore(!showMore)}
                className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800"
              >
                <ChevronDown className={cn("h-4 w-4 transition-transform", showMore && "rotate-180")} />
                More options
              </button>
              
              {showMore && (
                <div className="space-y-3 pl-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Positives</label>
                    <Textarea
                      value={positives}
                      onChange={(e) => setPositives(e.target.value)}
                      placeholder={currentStarter.seed.positives}
                      className="min-h-[60px]"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Focus</label>
                    <Textarea
                      value={focus}
                      onChange={(e) => setFocus(e.target.value)}
                      placeholder={currentStarter.seed.focus}
                      className="min-h-[60px]"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Next steps</label>
                    <Textarea
                      value={next}
                      onChange={(e) => setNext(e.target.value)}
                      placeholder={currentStarter.seed.next}
                      className="min-h-[60px]"
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
                className="flex-1"
              >
                {isLoading ? <RefreshCw className="h-4 w-4 animate-spin mr-2" /> : <Sparkles className="h-4 w-4 mr-2" />}
                Generate
              </Button>
              <Button
                onClick={handleNewVariation}
                disabled={isLoading || isAtLimit || !output}
                variant="outline"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                New variation
              </Button>
              <Button
                onClick={handleCopy}
                disabled={!output}
                variant="outline"
              >
                <Copy className="h-4 w-4 mr-2" />
                Copy
              </Button>
              <Button variant="outline">
                Start Free Trial
              </Button>
            </div>

            {/* Usage Counter */}
            <div className="text-sm text-gray-600 text-center">
              {usage.remaining} free messages/month – unlimited in Promptly
            </div>
          </div>

          {/* Preview Column */}
          <div className="relative z-10 space-y-4">
            {/* Rate Limit Overlay */}
            {isAtLimit && (
              <div className="absolute inset-0 bg-white/90 backdrop-blur-sm z-20 flex items-center justify-center rounded-lg">
                <div className="text-center space-y-4">
                  <h3 className="text-lg font-semibold">You've used your 5 free messages for this month.</h3>
                  <div className="space-x-3">
                    <Button>Start Free Trial</Button>
                    <Button variant="outline">See plans</Button>
                  </div>
                </div>
              </div>
            )}

            {/* Preview Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="output">Output</TabsTrigger>
                <TabsTrigger value="variations" disabled={variations.length === 0}>
                  Variations {variations.length > 0 && `(${variations.length})`}
                </TabsTrigger>
                <TabsTrigger value="email">Email</TabsTrigger>
                <TabsTrigger value="sms">SMS</TabsTrigger>
              </TabsList>

              {/* View Toggle */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setDocView(!docView)}
                    className={cn(
                      "flex items-center gap-2 px-3 py-1.5 rounded-md text-sm",
                      docView ? "bg-purple-100 text-purple-700" : "bg-gray-100 text-gray-700"
                    )}
                  >
                    <Eye className="h-4 w-4" />
                    {docView ? 'Doc' : 'Plain'}
                  </button>
                </div>
                
                <Popover open={shareOpen} onOpenChange={setShareOpen}>
                  <PopoverTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Share2 className="h-4 w-4 mr-2" />
                      Share
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-48 z-[100] bg-white">
                    <div className="space-y-2">
                      <button
                        onClick={() => handleShare('email')}
                        className="w-full flex items-center gap-3 px-3 py-2 text-left hover:bg-gray-100 rounded-md"
                      >
                        <Mail className="h-4 w-4" />
                        Email
                      </button>
                      <button
                        onClick={() => handleShare('whatsapp')}
                        className="w-full flex items-center gap-3 px-3 py-2 text-left hover:bg-gray-100 rounded-md"
                      >
                        <MessageCircle className="h-4 w-4" />
                        WhatsApp
                      </button>
                      <button
                        onClick={() => handleShare('copy')}
                        className="w-full flex items-center gap-3 px-3 py-2 text-left hover:bg-gray-100 rounded-md"
                      >
                        <Link2 className="h-4 w-4" />
                        Copy link
                      </button>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>

              <TabsContent value="output" className="space-y-4">
                <div
                  ref={previewRef}
                  className={cn(
                    "rounded-lg border transition-all",
                    docView
                      ? "bg-white p-6 shadow-sm min-h-[560px] max-h-[640px] overflow-y-auto"
                      : "bg-gray-50 p-4 min-h-[300px]"
                  )}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center h-32">
                      <RefreshCw className="h-6 w-6 animate-spin text-purple-600" />
                    </div>
                  ) : (
                    <div className="whitespace-pre-wrap text-gray-900 leading-relaxed">
                      {output || 'Generate your first message...'}
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="variations">
                <div className="space-y-4">
                  {variations.map((variation, index) => (
                    <div
                      key={index}
                      className={cn(
                        "rounded-lg border p-4 cursor-pointer hover:bg-gray-50",
                        docView && "bg-white shadow-sm"
                      )}
                      onClick={() => setOutput(variation)}
                    >
                      <div className="text-sm text-gray-500 mb-2">Variation {index + 1}</div>
                      <div className="whitespace-pre-wrap text-gray-900">{variation}</div>
                    </div>
                  ))}
                  {variations.length === 0 && (
                    <div className="text-center text-gray-500 py-8">
                      No variations yet. Click "New variation" to generate one.
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="email">
                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="text-sm text-gray-600 mb-2">Subject:</div>
                    <div className="font-medium">Quick note about {student || 'your child'}</div>
                  </div>
                  <div
                    className={cn(
                      "rounded-lg border",
                      docView
                        ? "bg-white p-6 shadow-sm min-h-[400px]"
                        : "bg-gray-50 p-4 min-h-[300px]"
                    )}
                  >
                    <div className="whitespace-pre-wrap text-gray-900 leading-relaxed">
                      {output || 'Generate a message to see email preview...'}
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="sms">
                <div className="max-w-sm mx-auto">
                  <div className="bg-blue-500 rounded-t-lg p-3 text-white text-sm font-medium">
                    SMS Preview
                  </div>
                  <div className="bg-white border border-t-0 rounded-b-lg p-4 min-h-[200px]">
                    <div className="whitespace-pre-wrap text-gray-900 text-sm leading-relaxed">
                      {output || 'Generate a message to see SMS preview...'}
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </Card>
    </div>
  );
}