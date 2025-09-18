'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChevronDown, ChevronUp, Copy, Loader2, Sparkles, Zap, RefreshCw } from 'lucide-react';
import { PRESETS, type SnippetPreset } from '@/data/promptly-presets';

interface GenerationState {
  loading: boolean;
  error: string | null;
  remaining: number;
}

interface CopyState {
  success: boolean;
  limited: boolean;
  remaining: number;
}

interface GeneratedContent {
  text: string;
  timestamp: number;
  preset?: string;
}

export default function TrySnippet() {
  // Form state
  const [selectedPreset, setSelectedPreset] = useState<SnippetPreset>(PRESETS[0]);
  const [student, setStudent] = useState<string>(PRESETS[0].student || '');
  const [tone, setTone] = useState<string>(PRESETS[0].tone);
  const [language, setLanguage] = useState<string>(PRESETS[0].language);
  const [length, setLength] = useState<number>(110);
  const [positives, setPositives] = useState<string>(PRESETS[0].seed.positives || '');
  const [focus, setFocus] = useState<string>(PRESETS[0].seed.focus || '');
  const [next, setNext] = useState<string>(PRESETS[0].seed.next || '');
  const [showMore, setShowMore] = useState<boolean>(false);

  // Output state
  const [currentOutput, setCurrentOutput] = useState<string>('');
  const [variations, setVariations] = useState<GeneratedContent[]>([]);
  const [activeTab, setActiveTab] = useState<string>('output');
  
  // UI state
  const [generation, setGeneration] = useState<GenerationState>({
    loading: false,
    error: null,
    remaining: 3
  });
  const [copyState, setCopyState] = useState<CopyState>({
    success: false,
    limited: false,
    remaining: 2
  });
  const [showLimitModal, setShowLimitModal] = useState<boolean>(false);
  const [showCopyModal, setShowCopyModal] = useState<boolean>(false);
  
  // Auto-generate on first load
  useEffect(() => {
    const timer = setTimeout(() => {
      handleGenerate();
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // Load local storage counters
  useEffect(() => {
    const genCount = parseInt(localStorage.getItem('promptly_gen_count') || '0');
    const copyCount = parseInt(localStorage.getItem('promptly_copy_count') || '0');
    const today = new Date().toDateString();
    const lastDate = localStorage.getItem('promptly_last_date');
    
    if (lastDate !== today) {
      localStorage.setItem('promptly_gen_count', '0');
      localStorage.setItem('promptly_copy_count', '0');
      localStorage.setItem('promptly_last_date', today);
      setGeneration(prev => ({ ...prev, remaining: 3 }));
      setCopyState(prev => ({ ...prev, remaining: 2 }));
    } else {
      setGeneration(prev => ({ ...prev, remaining: Math.max(0, 3 - genCount) }));
      setCopyState(prev => ({ ...prev, remaining: Math.max(0, 2 - copyCount) }));
    }
  }, []);

  const updateLocalStorage = (type: 'gen' | 'copy') => {
    const key = type === 'gen' ? 'promptly_gen_count' : 'promptly_copy_count';
    const current = parseInt(localStorage.getItem(key) || '0');
    localStorage.setItem(key, (current + 1).toString());
  };

  const applyPreset = (preset: SnippetPreset) => {
    setSelectedPreset(preset);
    setStudent(preset.student || '');
    setTone(preset.tone);
    setLanguage(preset.language);
    setPositives(preset.seed.positives || '');
    setFocus(preset.seed.focus || '');
    setNext(preset.seed.next || '');
    
    // Fire telemetry
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'preset_click', {
        preset_id: preset.id,
        preset_label: preset.label
      });
    }
  };

  const handleGenerate = async (type: 'generate' | 'improve' | 'variation' = 'generate') => {
    if (generation.remaining <= 0) {
      setShowLimitModal(true);
      return;
    }

    setGeneration(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const requestBody = {
        topic: selectedPreset.topic,
        student: student.trim(),
        language,
        tone,
        length,
        positives: positives.trim(),
        focus: focus.trim(),
        next: next.trim(),
        format: activeTab === 'email' ? 'email' : activeTab === 'sms' ? 'sms' : 'default'
      };

      if (type === 'improve') {
        requestBody.focus = (requestBody.focus ? requestBody.focus + '. ' : '') + 'Make it clearer and kinder while staying concise.';
      }

      const response = await fetch('/api/snippet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody)
      });

      const data = await response.json();

      if (data.limited) {
        setShowLimitModal(true);
        setGeneration(prev => ({ ...prev, loading: false, remaining: 0 }));
        return;
      }

      if (data.error) {
        throw new Error(data.error);
      }

      if (type === 'variation') {
        const newVariation = {
          text: data.text,
          timestamp: Date.now(),
          preset: selectedPreset.id
        };
        setVariations(prev => [newVariation, ...prev].slice(0, 3));
        setActiveTab('variations');
      } else {
        setCurrentOutput(data.text);
        setActiveTab('output');
      }

      setGeneration(prev => ({ 
        ...prev, 
        loading: false, 
        remaining: data.remaining 
      }));
      
      updateLocalStorage('gen');

      // Fire telemetry
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', type, {
          preset_id: selectedPreset.id,
          tone,
          language,
          has_student: !!student.trim()
        });
      }

    } catch (error) {
      console.error('Generation failed:', error);
      setGeneration(prev => ({ 
        ...prev, 
        loading: false, 
        error: 'Something went wrong. Please try again.' 
      }));
    }
  };

  const handleCopy = async () => {
    if (copyState.remaining <= 0) {
      setShowCopyModal(true);
      return;
    }

    try {
      const response = await fetch('/api/snippet', {
        method: 'PUT'
      });

      const data = await response.json();
      
      if (data.limited) {
        setShowCopyModal(true);
        return;
      }

      await navigator.clipboard.writeText(currentOutput);
      setCopyState(prev => ({ 
        ...prev, 
        success: true, 
        remaining: data.remaining 
      }));
      
      updateLocalStorage('copy');

      setTimeout(() => {
        setCopyState(prev => ({ ...prev, success: false }));
      }, 2000);

      // Fire telemetry
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'copy', {
          preset_id: selectedPreset.id,
          remaining: data.remaining
        });
      }

    } catch (error) {
      console.error('Copy failed:', error);
    }
  };

  const formatOutput = (text: string, format: 'output' | 'email' | 'sms' = 'output') => {
    if (!text) return '';
    
    if (format === 'sms') {
      // Strip greeting and sign-off for SMS, keep 2-4 sentences
      const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
      const coreSentences = sentences.slice(1, 4).join('. ').trim();
      return coreSentences + (coreSentences.endsWith('.') ? '' : '.') + ' Please let me know your thoughts!';
    }
    
    if (format === 'email') {
      // Ensure proper email greeting and sign-off
      if (!text.includes('Hi ') && !text.includes('Hello')) {
        return `Hello!\n\n${text}`;
      }
    }
    
    return text;
  };

  const getPreviewText = (fullText: string, percentage: number = 70): string => {
    const words = fullText.split(' ');
    const cutoff = Math.floor(words.length * (percentage / 100));
    return words.slice(0, cutoff).join(' ') + '...';
  };

  return (
    <section id="try-snippet" className="py-16 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-purple-900/20">
      <div className="container mx-auto max-w-6xl px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2">Try a parent message in 30 seconds</h2>
          <p className="text-muted-foreground">Real outputs from Promptly's Comment Agent. No signup needed.</p>
        </div>

        {/* Main Card */}
        <Card className="overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-0">
            {/* Left Column - Controls */}
            <div className="p-6 border-r lg:border-r border-b lg:border-b-0">
              <div className="space-y-6">
                {/* Preset Rail */}
                <div>
                  <Label className="text-sm font-medium mb-3 block">Quick Start</Label>
                  <div className="flex flex-wrap gap-2">
                    {PRESETS.map((preset) => (
                      <Badge
                        key={preset.id}
                        variant={selectedPreset.id === preset.id ? "default" : "outline"}
                        className="cursor-pointer hover:bg-primary/10 transition-colors"
                        onClick={() => applyPreset(preset)}
                      >
                        {preset.label}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Main Inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="student" className="text-sm font-medium">Student (optional)</Label>
                    <Input
                      id="student"
                      value={student}
                      onChange={(e) => setStudent(e.target.value)}
                      placeholder="e.g., Max"
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="tone" className="text-sm font-medium">Tone</Label>
                    <Select value={tone} onValueChange={setTone}>
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Supportive">Supportive</SelectItem>
                        <SelectItem value="Concise">Concise</SelectItem>
                        <SelectItem value="Friendly">Friendly</SelectItem>
                        <SelectItem value="Formal">Formal</SelectItem>
                        <SelectItem value="Warm-professional">Warm-professional</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="language" className="text-sm font-medium">Language</Label>
                  <Select value={language} onValueChange={setLanguage}>
                    <SelectTrigger className="mt-1">
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
                <div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowMore(!showMore)}
                    className="h-auto p-0 font-medium text-sm"
                  >
                    More options {showMore ? <ChevronUp className="ml-1 h-4 w-4" /> : <ChevronDown className="ml-1 h-4 w-4" />}
                  </Button>
                  
                  {showMore && (
                    <div className="mt-4 space-y-4 border-t pt-4">
                      <div>
                        <Label htmlFor="length" className="text-sm font-medium">Length: {length} words</Label>
                        <input
                          id="length"
                          type="range"
                          min="60"
                          max="180"
                          value={length}
                          onChange={(e) => setLength(parseInt(e.target.value))}
                          className="w-full mt-2"
                        />
                      </div>

                      <div>
                        <Label htmlFor="positives" className="text-sm font-medium">Positives</Label>
                        <Textarea
                          id="positives"
                          value={positives}
                          onChange={(e) => setPositives(e.target.value)}
                          placeholder="What's going well..."
                          className="mt-1 min-h-[60px]"
                        />
                      </div>

                      <div>
                        <Label htmlFor="focus" className="text-sm font-medium">Focus area</Label>
                        <Textarea
                          id="focus"
                          value={focus}
                          onChange={(e) => setFocus(e.target.value)}
                          placeholder="What to address..."
                          className="mt-1 min-h-[60px]"
                        />
                      </div>

                      <div>
                        <Label htmlFor="next" className="text-sm font-medium">Next steps</Label>
                        <Textarea
                          id="next"
                          value={next}
                          onChange={(e) => setNext(e.target.value)}
                          placeholder="Suggested actions..."
                          className="mt-1 min-h-[60px]"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Buttons */}
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-2">
                    <Button 
                      onClick={() => handleGenerate('generate')}
                      disabled={generation.loading || generation.remaining <= 0}
                      className="relative"
                    >
                      {generation.loading ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Sparkles className="h-4 w-4 mr-2" />
                      )}
                      Generate
                    </Button>
                    
                    <Button 
                      variant="outline"
                      onClick={() => handleGenerate('improve')}
                      disabled={generation.loading || !currentOutput || generation.remaining <= 0}
                    >
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Improve
                    </Button>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <Button 
                      variant="outline"
                      onClick={() => handleGenerate('variation')}
                      disabled={generation.loading || !currentOutput || generation.remaining <= 0}
                    >
                      <Zap className="h-4 w-4 mr-2" />
                      New Variation
                    </Button>
                    
                    <Button 
                      variant="outline"
                      onClick={handleCopy}
                      disabled={!currentOutput || copyState.success}
                    >
                      <Copy className="h-4 w-4 mr-2" />
                      {copyState.success ? 'Copied!' : 'Copy'}
                    </Button>
                  </div>

                  <Button 
                    size="lg" 
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                  >
                    Start Free Trial
                  </Button>
                </div>

                {/* Microcopy */}
                <p className="text-xs text-muted-foreground text-center">
                  {generation.remaining} free messages per day - full editing and history in Promptly.
                </p>

                {generation.error && (
                  <div className="text-sm text-red-600 bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
                    {generation.error}
                  </div>
                )}
              </div>
            </div>

            {/* Right Column - Preview */}
            <div className="p-6">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="output">Output</TabsTrigger>
                  <TabsTrigger value="variations">Variations ({variations.length})</TabsTrigger>
                  <TabsTrigger value="email">Email</TabsTrigger>
                  <TabsTrigger value="sms">SMS</TabsTrigger>
                </TabsList>

                <TabsContent value="output" className="mt-4">
                  <div className="space-y-4">
                    <h3 className="font-medium">Message about {student || 'your child'}</h3>
                    
                    <div className="relative bg-slate-50 dark:bg-slate-800 rounded-lg p-4 min-h-[300px]">
                      {generation.loading ? (
                        <div className="flex items-center justify-center h-[200px]">
                          <div className="space-y-3 text-center">
                            <Loader2 className="h-8 w-8 animate-spin mx-auto" />
                            <p className="text-sm text-muted-foreground">Crafting your message...</p>
                          </div>
                        </div>
                      ) : currentOutput ? (
                        <div className="prose prose-sm max-w-none">
                          <div className="whitespace-pre-wrap text-sm leading-relaxed">
                            {formatOutput(currentOutput, 'output')}
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center h-[200px] text-muted-foreground">
                          Click "Generate" to create your first message
                        </div>
                      )}
                      
                      {currentOutput && (
                        <div className="absolute bottom-2 right-2 text-xs text-muted-foreground/70 font-mono">
                          Made with Promptly - free demo
                        </div>
                      )}
                    </div>

                    {currentOutput && (
                      <div className="flex items-center justify-between text-sm bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                        <span>Love this? Save and refine in Promptly</span>
                        <Button size="sm">Start Free Trial</Button>
                      </div>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="variations" className="mt-4">
                  <div className="space-y-4">
                    {variations.length === 0 ? (
                      <div className="text-center text-muted-foreground py-8">
                        Click "New Variation" to see different versions
                      </div>
                    ) : (
                      variations.map((variation, index) => (
                        <div 
                          key={variation.timestamp}
                          className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                          onClick={() => {
                            setCurrentOutput(variation.text);
                            setActiveTab('output');
                          }}
                        >
                          <div className="text-sm text-muted-foreground mb-2">
                            Variation {variations.length - index}
                          </div>
                          <div className="text-sm line-clamp-3">
                            {variation.text.substring(0, 150)}...
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="email" className="mt-4">
                  <div className="space-y-4">
                    <h3 className="font-medium">Email Format</h3>
                    <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4 min-h-[300px]">
                      {currentOutput ? (
                        <div className="prose prose-sm max-w-none">
                          <div className="whitespace-pre-wrap text-sm leading-relaxed">
                            {formatOutput(currentOutput, 'email')}
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center h-[200px] text-muted-foreground">
                          Generate a message first
                        </div>
                      )}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="sms" className="mt-4">
                  <div className="space-y-4">
                    <h3 className="font-medium">SMS Format</h3>
                    <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4 min-h-[300px]">
                      {currentOutput ? (
                        <div className="prose prose-sm max-w-none">
                          <div className="whitespace-pre-wrap text-sm leading-relaxed">
                            {formatOutput(currentOutput, 'sms')}
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center h-[200px] text-muted-foreground">
                          Generate a message first
                        </div>
                      )}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </Card>

        {/* Limit Modal */}
        {showLimitModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-md">
              <CardHeader>
                <CardTitle>Daily Limit Reached</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  That's all for today. Start a free trial to generate unlimited messages.
                </p>
                <div className="flex gap-2">
                  <Button className="flex-1">Start Free Trial</Button>
                  <Button variant="outline" onClick={() => setShowLimitModal(false)}>
                    Close
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Copy Modal */}
        {showCopyModal && currentOutput && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-md">
              <CardHeader>
                <CardTitle>Unlock Full Copy</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4">
                  <div className="text-sm whitespace-pre-wrap">
                    {getPreviewText(currentOutput)}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Start a free trial to copy the complete message and unlock unlimited access.
                </p>
                <div className="flex gap-2">
                  <Button className="flex-1">Start Free Trial</Button>
                  <Button variant="outline" onClick={() => setShowCopyModal(false)}>
                    Close
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </section>
  );
}