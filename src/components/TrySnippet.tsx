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
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { 
  ChevronDown, 
  ChevronUp, 
  Copy, 
  Loader2, 
  Sparkles, 
  Zap, 
  RefreshCw, 
  Share2,
  Mail,
  MessageCircle,
  Link2,
  Gift,
  FileText,
  Monitor,
  HelpCircle,
  Keyboard
} from 'lucide-react';
import { PRESETS, type SnippetPreset } from '@/data/promptly-presets';
import { siteUrl } from '@/lib/site';

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


// Share helpers
const shareText = (message: string, student: string) => {
  const teaser = message.slice(0, 180).replace(/\s+\S*$/, "…");
  const subject = `Quick note about ${student || "your child"}`;
  const utmUrl = `${siteUrl}/?utm_source=try_snippet&utm_medium=share&utm_campaign=demo`;
  const body = `${teaser}\n\nMade with Promptly's free demo\n${utmUrl}`;
  return { subject, body, url: utmUrl };
};

const mailto = (subject: string, body: string) =>
  `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

const wa = (text: string) => 
  `https://wa.me/?text=${encodeURIComponent(text)}`;

// Language detection helper
const detectLanguage = (text: string): string | null => {
  const cleanText = text.toLowerCase();
  if (/[àâäéèêëïîôùûüÿç]/.test(text) || /\b(le|la|les|des|avec|pour|dans)\b/.test(cleanText)) return 'French';
  if (/[äöüß]/.test(text) || /\b(der|die|das|mit|für|und|ist|sind)\b/.test(cleanText)) return 'German';
  if (/[ñáéíóú]/.test(text) || /\b(el|la|los|las|con|para|en|es|son)\b/.test(cleanText)) return 'Spanish';
  if (/[àèéìíîòóù]/.test(text) || /\b(il|la|con|per|in|è|sono)\b/.test(cleanText)) return 'Italian';
  return null;
};

// Risk detection helper
const detectRiskyPhrases = (text: string): boolean => {
  const risky = ['lazy', 'disruptive', 'ADD', 'ADHD', 'diagnos', 'problem child', 'always', 'never'];
  return risky.some(phrase => text.toLowerCase().includes(phrase.toLowerCase()));
};

export default function TrySnippet() {
  // Form state
  const [selectedPreset, setSelectedPreset] = useState<SnippetPreset>(PRESETS[0]);
  const [student, setStudent] = useState<string>('');
  const [tone, setTone] = useState<string>('Supportive');
  const [language, setLanguage] = useState<string>('English');
  const [length, setLength] = useState<number>(110);
  const [positives, setPositives] = useState<string>('');
  const [focus, setFocus] = useState<string>('');
  const [next, setNext] = useState<string>('');
  const [yourNote, setYourNote] = useState<string>('');
  const [showMore, setShowMore] = useState<boolean>(false);

  // Output state
  const [currentOutput, setCurrentOutput] = useState<string>('');
  const [variations, setVariations] = useState<GeneratedContent[]>([]);
  const [activeTab, setActiveTab] = useState<string>('output');
  const [viewMode, setViewMode] = useState<'doc' | 'plain'>('doc');
  
  // UI state
  const [generation, setGeneration] = useState<GenerationState>({
    loading: false,
    error: null,
    remaining: 5
  });
  const [copyState, setCopyState] = useState<CopyState>({
    success: false,
    limited: false,
    remaining: 3
  });
  const [showLimitModal, setShowLimitModal] = useState<boolean>(false);
  const [showCopyModal, setShowCopyModal] = useState<boolean>(false);
  const [showCoaching, setShowCoaching] = useState<boolean>(false);
  const [bonusGranted, setBonusGranted] = useState<boolean>(false);
  const [showRiskBanner, setShowRiskBanner] = useState<boolean>(false);
  const [suggestedLanguage, setSuggestedLanguage] = useState<string | null>(null);
  
  // Load persistent state
  useEffect(() => {
    const saved = localStorage.getItem('trySnippet_state');
    if (saved) {
      try {
        const state = JSON.parse(saved);
        if (state.preset) {
          const preset = PRESETS.find(p => p.id === state.preset) || PRESETS[0];
          applyPreset(preset, false);
        }
        if (state.tone) setTone(state.tone);
        if (state.language) setLanguage(state.language);
        if (state.viewMode) setViewMode(state.viewMode);
      } catch (e) {
        console.warn('Failed to restore state:', e);
      }
    }
  }, []);

  // Save state on changes
  useEffect(() => {
    const state = {
      preset: selectedPreset.id,
      tone,
      language,
      viewMode
    };
    localStorage.setItem('trySnippet_state', JSON.stringify(state));
  }, [selectedPreset.id, tone, language, viewMode]);

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
    const bonusKey = `tryBonusGranted:${today}`;
    const todayBonus = localStorage.getItem(bonusKey) === 'true';
    
    setBonusGranted(todayBonus);
    
    if (lastDate !== today) {
      localStorage.setItem('promptly_gen_count', '0');
      localStorage.setItem('promptly_copy_count', '0');
      localStorage.setItem('promptly_last_date', today);
      setGeneration(prev => ({ ...prev, remaining: 5 + (todayBonus ? 1 : 0) }));
      setCopyState(prev => ({ ...prev, remaining: 3 }));
    } else {
      setGeneration(prev => ({ ...prev, remaining: Math.max(0, 5 + (todayBonus ? 1 : 0) - genCount) }));
      setCopyState(prev => ({ ...prev, remaining: Math.max(0, 3 - copyCount) }));
    }
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyboard = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLTextAreaElement || e.target instanceof HTMLInputElement) return;
      
      if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
        e.preventDefault();
        if (yourNote.trim()) {
          handleImprove();
        } else {
          handleGenerate();
        }
      } else if (e.key.toLowerCase() === 'v' && !e.metaKey && !e.ctrlKey) {
        e.preventDefault();
        handleGenerate('variation');
      } else if (e.key.toLowerCase() === 'c' && !e.metaKey && !e.ctrlKey) {
        e.preventDefault();
        handleCopy();
      }
    };

    window.addEventListener('keydown', handleKeyboard);
    return () => window.removeEventListener('keydown', handleKeyboard);
  }, [yourNote, currentOutput]);

  // Language detection
  useEffect(() => {
    if (yourNote.trim().length > 20) {
      const detected = detectLanguage(yourNote);
      if (detected && detected !== language) {
        setSuggestedLanguage(detected);
      }
    } else {
      setSuggestedLanguage(null);
    }
  }, [yourNote, language]);

  const updateLocalStorage = (type: 'gen' | 'copy') => {
    const key = type === 'gen' ? 'promptly_gen_count' : 'promptly_copy_count';
    const current = parseInt(localStorage.getItem(key) || '0');
    localStorage.setItem(key, (current + 1).toString());
  };

  const applyPreset = (preset: SnippetPreset, trackEvent = true) => {
    setSelectedPreset(preset);
    setStudent(preset.student || '');
    setTone(preset.tone);
    setLanguage(preset.language);
    setPositives(preset.seed.positives || '');
    setFocus(preset.seed.focus || '');
    setNext(preset.seed.next || '');
    
    // Fire telemetry
    if (trackEvent && typeof window !== 'undefined' && window.gtag) {
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
    setShowRiskBanner(false);
    
    try {
      const requestBody = {
        topic: selectedPreset.topic,
        student: student.trim() || undefined,
        language,
        tone,
        length,
        positives: positives.trim() || undefined,
        focus: focus.trim() || undefined,
        next: next.trim() || undefined,
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

      // Check for risky phrases
      if (detectRiskyPhrases(data.text)) {
        setShowRiskBanner(true);
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

  const handleImprove = async () => {
    if (!yourNote.trim()) return;
    if (generation.remaining <= 0) {
      setShowLimitModal(true);
      return;
    }

    setGeneration(prev => ({ ...prev, loading: true, error: null }));
    setShowRiskBanner(false);
    
    try {
      // Replace {{student}} placeholder
      const processedNote = yourNote.replace(/\{\{student\}\}/gi, student || 'the student');
      
      const requestBody = {
        yourNote: processedNote,
        language,
        tone,
        length,
        format: activeTab === 'email' ? 'email' : activeTab === 'sms' ? 'sms' : 'default'
      };

      const response = await fetch('/api/snippet/rewrite', {
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

      setCurrentOutput(data.text);
      setActiveTab('output');

      setGeneration(prev => ({ 
        ...prev, 
        loading: false, 
        remaining: data.remaining 
      }));
      
      updateLocalStorage('gen');

      // Fire telemetry
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'improve_note', {
          preset_id: selectedPreset.id,
          language,
          note_length: yourNote.length
        });
      }

    } catch (error) {
      console.error('Improve failed:', error);
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

  const handleCopyWithSubject = async () => {
    if (!currentOutput) return;
    
    const { subject, body } = shareText(currentOutput, student);
    const emailContent = `Subject: ${subject}\n\n${body}`;
    
    try {
      await navigator.clipboard.writeText(emailContent);
      setCopyState(prev => ({ ...prev, success: true }));
      
      setTimeout(() => {
        setCopyState(prev => ({ ...prev, success: false }));
      }, 2000);

      // Fire telemetry
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'copy_with_subject', {
          preset_id: selectedPreset.id
        });
      }
    } catch (error) {
      console.error('Copy with subject failed:', error);
    }
  };

  const handleShare = async (method: 'email' | 'whatsapp' | 'copylink' | 'native') => {
    if (!currentOutput) return;
    
    const { subject, body, url } = shareText(currentOutput, student);
    
    try {
      let success = false;
      
      switch (method) {
        case 'email':
          window.open(mailto(subject, body), '_blank');
          success = true;
          break;
        case 'whatsapp':
          window.open(wa(body), '_blank');
          success = true;
          break;
        case 'copylink':
          await navigator.clipboard.writeText(url);
          success = true;
          break;
        case 'native':
          if (navigator.share) {
            await navigator.share({ title: subject, text: body, url });
            success = true;
          }
          break;
      }
      
      if (success) {
        // Grant bonus if not already granted today
        if (!bonusGranted) {
          try {
            const bonusResponse = await fetch('/api/snippet/bonus', { method: 'POST' });
            const bonusData = await bonusResponse.json();
            
            if (bonusData.bonus_granted) {
              setBonusGranted(true);
              const today = new Date().toDateString();
              localStorage.setItem(`tryBonusGranted:${today}`, 'true');
              setGeneration(prev => ({ ...prev, remaining: prev.remaining + 1 }));
            }
          } catch (e) {
            console.warn('Failed to grant bonus:', e);
          }
        }
        
        // Fire telemetry
        if (typeof window !== 'undefined' && window.gtag) {
          window.gtag('event', `share_${method}`, {
            preset_id: selectedPreset.id,
            student_name: !!student.trim()
          });
        }
      }
    } catch (error) {
      console.error(`Share ${method} failed:`, error);
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

  const getCoachingTips = (): string[] => {
    const tips = [];
    if (currentOutput.includes('Hi ') || currentOutput.includes('Hello')) {
      tips.push("Started with a warm greeting to set a collaborative tone");
    }
    if (currentOutput.toLowerCase().includes('wonderful') || currentOutput.toLowerCase().includes('great')) {
      tips.push("Led with positives to reduce defensiveness");
    }
    if (currentOutput.includes('work together') || currentOutput.includes('support')) {
      tips.push("Used collaborative language to invite partnership");
    }
    if (!tips.length) {
      tips.push("Message follows parent-friendly communication best practices");
    }
    return tips;
  };

  return (
    <TooltipProvider>
      <section id="try-snippet" className="py-16 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-purple-900/20">
        <div className="container mx-auto max-w-6xl px-4">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2">Try a parent message in 30 seconds</h2>
            <p className="text-muted-foreground">Real outputs from Promptly's Comment Agent. No signup needed.</p>
          </div>

          {/* Language suggestion banner */}
          {suggestedLanguage && (
            <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg flex items-center justify-between">
              <span className="text-sm">Detected {suggestedLanguage} in your note. Switch language?</span>
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => {
                  setLanguage(suggestedLanguage);
                  setSuggestedLanguage(null);
                }}
              >
                Yes, use {suggestedLanguage}
              </Button>
            </div>
          )}

          {/* Risk banner */}
          {showRiskBanner && (
            <div className="mb-4 p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg">
              <span className="text-sm">✓ Phrasing softened to be parent-friendly.</span>
            </div>
          )}

          {/* Main Card */}
          <div className="relative rounded-2xl border bg-card overflow-visible">
            <div className="grid lg:grid-cols-2 gap-0">
              {/* Left Column - Controls */}
              <aside className="relative z-20 overflow-visible p-6 border-r lg:border-r border-b lg:border-b-0">
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

                  {/* Your Note - Prominent Position */}
                  <div>
                    <Label htmlFor="yourNote" className="text-sm font-medium">Your note (optional)</Label>
                    <Textarea
                      id="yourNote"
                      value={yourNote}
                      onChange={(e) => setYourNote(e.target.value)}
                      placeholder="Paste your draft to improve tone, clarity, and parent-readiness. Names/dates stay intact."
                      className="mt-1 min-h-[80px]"
                    />
                    {yourNote.includes('{{student}}') && (
                      <p className="text-xs text-muted-foreground mt-1">
                        💡 {'{'}student{'}'} will be replaced with: {student || 'your child'}
                      </p>
                    )}
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
                        <SelectContent className="z-50 max-h-72 overflow-auto" position="popper" sideOffset={6}>
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
                      <SelectContent className="z-50 max-h-72 overflow-auto" position="popper" sideOffset={6}>
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
                      <Tooltip>
                        <TooltipTrigger asChild>
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
                        </TooltipTrigger>
                        <TooltipContent>
                          <div className="flex items-center gap-2">
                            <Keyboard className="h-3 w-3" />
                            <span>Ctrl+Enter</span>
                          </div>
                        </TooltipContent>
                      </Tooltip>
                      
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button 
                            variant="outline"
                            onClick={yourNote.trim() ? handleImprove : () => handleGenerate('improve')}
                            disabled={generation.loading || (!currentOutput && !yourNote.trim()) || generation.remaining <= 0}
                          >
                            <RefreshCw className="h-4 w-4 mr-2" />
                            {yourNote.trim() ? 'Improve my note' : 'Improve'}
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          {!yourNote.trim() ? 'Paste a note to improve' : 'Improve your draft (Ctrl+Enter)'}
                        </TooltipContent>
                      </Tooltip>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button 
                            variant="outline"
                            onClick={() => handleGenerate('variation')}
                            disabled={generation.loading || !currentOutput || generation.remaining <= 0}
                          >
                            <Zap className="h-4 w-4 mr-2" />
                            New Variation
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <div className="flex items-center gap-2">
                            <Keyboard className="h-3 w-3" />
                            <span>V</span>
                          </div>
                        </TooltipContent>
                      </Tooltip>
                      
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button 
                            variant="outline"
                            onClick={handleCopy}
                            disabled={!currentOutput || copyState.success}
                          >
                            <Copy className="h-4 w-4 mr-2" />
                            {copyState.success ? 'Copied!' : 'Copy'}
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <div className="flex items-center gap-2">
                            <Keyboard className="h-3 w-3" />
                            <span>C</span>
                          </div>
                        </TooltipContent>
                      </Tooltip>
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
                    {generation.remaining} free messages per day – full editing and history in Promptly.
                  </p>

                  {generation.error && (
                    <div className="text-sm text-red-600 bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
                      {generation.error}
                    </div>
                  )}
                </div>
              </aside>

              {/* Right Column - Preview */}
              <section className="relative z-10 p-6">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full">
                  <div className="flex items-center justify-between mb-4">
                    <TabsList className="grid grid-cols-4">
                      <TabsTrigger value="output">Output</TabsTrigger>
                      <TabsTrigger value="variations">Variations ({variations.length})</TabsTrigger>
                      <TabsTrigger value="email">Email</TabsTrigger>
                      <TabsTrigger value="sms">SMS</TabsTrigger>
                    </TabsList>

                    {/* View Toggle */}
                    <div className="flex items-center gap-1 border rounded-md p-1">
                      <Button
                        variant={viewMode === 'doc' ? 'default' : 'ghost'}
                        size="sm"
                        onClick={() => {
                          setViewMode('doc');
                          if (typeof window !== 'undefined' && window.gtag) {
                            window.gtag('event', 'doc_view_toggle', { view: 'doc' });
                          }
                        }}
                        className="h-8 px-3"
                      >
                        <FileText className="h-3 w-3 mr-1" />
                        Doc
                      </Button>
                      <Button
                        variant={viewMode === 'plain' ? 'default' : 'ghost'}
                        size="sm"
                        onClick={() => {
                          setViewMode('plain');
                          if (typeof window !== 'undefined' && window.gtag) {
                            window.gtag('event', 'doc_view_toggle', { view: 'plain' });
                          }
                        }}
                        className="h-8 px-3"
                      >
                        <Monitor className="h-3 w-3 mr-1" />
                        Plain
                      </Button>
                    </div>
                  </div>

                  <TabsContent value="output" className="mt-4">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">Message about {student || 'your child'}</h3>
                        
                        {/* Share & Actions */}
                        {currentOutput && (
                          <div className="flex items-center gap-2">
                            {/* Coaching Toggle */}
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => setShowCoaching(!showCoaching)}
                                >
                                  <HelpCircle className="h-4 w-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>Explain the choices</TooltipContent>
                            </Tooltip>

                            {/* Share Dropdown */}
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="sm">
                                  <Share2 className="h-4 w-4 mr-2" />
                                  Share
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent className="z-50" align="end">
                                <DropdownMenuItem onClick={() => handleShare('email')}>
                                  <Mail className="h-4 w-4 mr-2" />
                                  Email
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleShare('whatsapp')}>
                                  <MessageCircle className="h-4 w-4 mr-2" />
                                  WhatsApp
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleShare('copylink')}>
                                  <Link2 className="h-4 w-4 mr-2" />
                                  Copy link
                                </DropdownMenuItem>
                                {navigator.share && (
                                  <DropdownMenuItem onClick={() => handleShare('native')}>
                                    <Share2 className="h-4 w-4 mr-2" />
                                    Quick Share
                                  </DropdownMenuItem>
                                )}
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        )}
                      </div>
                      
                      {/* Coaching Tips */}
                      {showCoaching && currentOutput && (
                        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
                          <h4 className="text-sm font-medium mb-2">Why this works:</h4>
                          <ul className="text-sm space-y-1">
                            {getCoachingTips().map((tip, index) => (
                              <li key={index}>• {tip}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Output Display */}
                      <div className={`relative ${
                        viewMode === 'doc' 
                          ? 'flex justify-center' 
                          : 'bg-slate-50 dark:bg-slate-800 rounded-lg p-4 min-h-[300px]'
                      }`}>
                        {generation.loading ? (
                          <div className="flex items-center justify-center h-[200px]">
                            <div className="space-y-3 text-center">
                              <Loader2 className="h-8 w-8 animate-spin mx-auto" />
                              <p className="text-sm text-muted-foreground">Crafting your message...</p>
                            </div>
                          </div>
                        ) : currentOutput ? (
                          viewMode === 'doc' ? (
                            // Doc View
                            <div className="aspect-[1/1.414] max-w-[800px] bg-white dark:bg-slate-100 shadow-2xl rounded-[6px] p-10 md:p-12 border border-slate-200 dark:border-slate-300">
                              <div className="flex items-center justify-between text-xs text-slate-500 mb-8">
                                <span>Message about {student || 'your child'}</span>
                                <span>Made with Promptly – free demo</span>
                              </div>
                              <div className="prose prose-sm max-w-[68ch] leading-7 text-slate-800">
                                <div className="whitespace-pre-wrap">
                                  {formatOutput(currentOutput, 'output')}
                                </div>
                              </div>
                            </div>
                          ) : (
                            // Plain View
                            <div className="prose prose-sm max-w-none">
                              <div className="whitespace-pre-wrap text-sm leading-relaxed">
                                {formatOutput(currentOutput, 'output')}
                              </div>
                              <div className="absolute bottom-2 right-2 text-xs text-muted-foreground/70 font-mono">
                                Made with Promptly - free demo
                              </div>
                            </div>
                          )
                        ) : (
                          <div className="flex items-center justify-center h-[200px] text-muted-foreground">
                            Click "Generate" to create your first message
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
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">Email Format</h3>
                        {currentOutput && (
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={handleCopyWithSubject}
                            >
                              <Copy className="h-4 w-4 mr-2" />
                              Copy with subject
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                const { subject, body } = shareText(currentOutput, student);
                                window.open(mailto(subject, body), '_blank');
                              }}
                            >
                              <Mail className="h-4 w-4 mr-2" />
                              Open in email
                            </Button>
                          </div>
                        )}
                      </div>
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
              </section>
            </div>
          </div>

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
                    {!bonusGranted && (
                      <Button variant="outline" onClick={() => setShowLimitModal(false)}>
                        <Gift className="h-4 w-4 mr-2" />
                        Share for +1
                      </Button>
                    )}
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
                    3 free copies per day. Start a free trial to copy unlimited messages.
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
    </TooltipProvider>
  );
}