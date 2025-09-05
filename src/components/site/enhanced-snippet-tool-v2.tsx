'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { 
  Loader2, 
  Copy, 
  RotateCcw, 
  Sparkles, 
  Clock,
  CheckCircle,
  MessageSquare
} from 'lucide-react';

const examples = [
  {
    id: 'progress',
    label: 'Academic Progress',
    input: 'Emma showed great improvement in math this week',
    category: 'positive'
  },
  {
    id: 'behavior',
    label: 'Behavior Note',
    input: 'Jake needs to work on listening during lessons',
    category: 'neutral'
  },
  {
    id: 'homework',
    label: 'Homework Issue',
    input: 'Missing assignments for the past two days',
    category: 'concern'
  },
  {
    id: 'celebration',
    label: 'Great News',
    input: 'Fantastic presentation on the solar system project',
    category: 'positive'
  }
];

const tones = [
  { id: 'professional', label: 'Professional', desc: 'Formal and respectful' },
  { id: 'warm', label: 'Warm', desc: 'Friendly and caring' },
  { id: 'encouraging', label: 'Encouraging', desc: 'Positive and supportive' },
  { id: 'direct', label: 'Direct', desc: 'Clear and straightforward' }
];

export function EnhancedSnippetToolV2() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [selectedTone, setSelectedTone] = useState('professional');
  const [activeExample, setActiveExample] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!input.trim()) return;
    
    setIsLoading(true);
    
    // Simulate professional message generation
    setTimeout(() => {
      const messages = {
        professional: `Dear Parent,\n\nI wanted to share an update about your child's recent work. ${input}. I've observed consistent effort and engagement in class.\n\nPlease don't hesitate to reach out if you have any questions.\n\nBest regards,\n[Your name]`,
        warm: `Hi there!\n\nI hope you're doing well. I wanted to touch base about your child's progress. ${input}. It's wonderful to see their growth and development.\n\nI'm always here if you'd like to chat more about their learning journey.\n\nWarm regards,\n[Your name]`,
        encouraging: `Hello!\n\nI'm excited to share some positive observations about your child. ${input}. Their dedication and positive attitude have been truly impressive.\n\nKeep encouraging them at home - they're doing fantastic!\n\nWith appreciation,\n[Your name]`,
        direct: `Hello,\n\nI'm writing to update you on your child's academic progress. ${input}. Here's what I recommend moving forward: continued practice at home and regular check-ins.\n\nLet me know if you have questions.\n\nBest,\n[Your name]`
      };
      
      setOutput(messages[selectedTone as keyof typeof messages]);
      setIsLoading(false);
    }, 1500);
  };

  const handleCopy = async () => {
    if (output) {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleExampleClick = (example: typeof examples[0]) => {
    setInput(example.input);
    setActiveExample(example.id);
    // Auto-generate after a short delay
    setTimeout(() => handleGenerate(), 500);
  };

  return (
    <section className="py-24 bg-gradient-to-br from-slate-50 via-white to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-purple-900/30 relative overflow-hidden" id="snippet-tool">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(147,51,234,0.08),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(59,130,246,0.06),transparent_60%)]" />
      
      <div className="max-w-7xl mx-auto px-4 relative">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center px-4 py-2 bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/40 dark:to-blue-900/40 text-purple-700 dark:text-purple-300 text-sm font-medium rounded-full mb-6 border border-purple-200 dark:border-purple-700/50">
            <Sparkles className="w-4 h-4 mr-2" />
            Interactive Demo
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Smart Message Writer
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Transform your quick notes into professional parent communication. 
            Save 15 minutes on every message while maintaining your authentic teaching voice.
          </p>
        </div>

        {/* Main Interface */}
        <div className="max-w-6xl mx-auto">
          {/* Examples */}
          <div className="mb-12">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 text-center">
              Try these examples or write your own:
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {examples.map((example) => (
                <button
                  key={example.id}
                  onClick={() => handleExampleClick(example)}
                  className={`p-4 rounded-xl text-left transition-all duration-200 border ${
                    activeExample === example.id
                      ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white border-transparent shadow-lg transform scale-105'
                      : 'bg-white/60 dark:bg-slate-800/60 hover:bg-white/80 dark:hover:bg-slate-800/80 border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-600'
                  }`}
                >
                  <div className={`text-sm font-medium mb-2 ${
                    activeExample === example.id ? 'text-white' : 'text-gray-900 dark:text-white'
                  }`}>
                    {example.label}
                  </div>
                  <div className={`text-xs line-clamp-2 ${
                    activeExample === example.id ? 'text-purple-100' : 'text-gray-600 dark:text-gray-400'
                  }`}>
                    {example.input}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Main Card */}
          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-3xl border border-white/20 dark:border-slate-700/50 shadow-2xl overflow-hidden">
            {/* Tone Selection */}
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-2 mb-4">
                <MessageSquare className="w-5 h-5 text-purple-600" />
                <span className="font-medium text-gray-900 dark:text-white">Choose your tone:</span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {tones.map((tone) => (
                  <button
                    key={tone.id}
                    onClick={() => setSelectedTone(tone.id)}
                    className={`p-3 rounded-lg text-left transition-all duration-200 ${
                      selectedTone === tone.id
                        ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                        : 'bg-gray-50 dark:bg-slate-800 hover:bg-gray-100 dark:hover:bg-slate-700 text-gray-900 dark:text-white'
                    }`}
                  >
                    <div className="font-medium text-sm">{tone.label}</div>
                    <div className={`text-xs mt-1 ${
                      selectedTone === tone.id ? 'text-purple-100' : 'text-gray-500 dark:text-gray-400'
                    }`}>
                      {tone.desc}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Input/Output */}
            <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-200 dark:divide-gray-700">
              {/* Input Side */}
              <div className="p-8">
                <label className="block text-sm font-medium text-gray-900 dark:text-white mb-4">
                  What happened? (Just the basics)
                </label>
                <Textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="e.g., Great work on math homework this week"
                  className="min-h-[160px] w-full resize-none border-gray-300 dark:border-gray-600 rounded-xl"
                />
                <div className="flex gap-3 mt-6">
                  <Button
                    onClick={handleGenerate}
                    disabled={!input.trim() || isLoading}
                    className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                  >
                    {isLoading ? (
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    ) : (
                      <Sparkles className="w-4 h-4 mr-2" />
                    )}
                    {isLoading ? 'Writing...' : 'Write Message'}
                  </Button>
                  <Button
                    onClick={() => {
                      setInput('');
                      setOutput('');
                      setActiveExample(null);
                    }}
                    variant="outline"
                    className="p-3"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Output Side */}
              <div className="p-8 bg-gradient-to-br from-gray-50/50 to-purple-50/50 dark:from-slate-800/50 dark:to-purple-900/20">
                <label className="block text-sm font-medium text-gray-900 dark:text-white mb-4">
                  Your professional message
                </label>
                {output ? (
                  <div className="space-y-4">
                    <div className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-gray-200 dark:border-gray-700 min-h-[160px]">
                      <div className="whitespace-pre-wrap text-gray-900 dark:text-white">
                        {output}
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
                        <CheckCircle className="w-4 h-4" />
                        <span>Ready to send</span>
                      </div>
                      <Button
                        onClick={handleCopy}
                        variant="outline"
                        className="bg-white dark:bg-slate-900"
                      >
                        <Copy className="w-4 h-4 mr-2" />
                        {copied ? 'Copied!' : 'Copy Message'}
                      </Button>
                    </div>
                    <div className="text-center">
                      <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                        Time saved: ~15 minutes
                      </div>
                      <div className="inline-flex items-center gap-2 px-3 py-1 bg-gray-100 dark:bg-slate-800 rounded-full text-xs text-gray-600 dark:text-gray-400">
                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                        Powered by Zara - adapts tone and structure for any teacher message
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl min-h-[160px] flex items-center justify-center text-gray-500 dark:text-gray-400">
                    <div className="text-center">
                      <Clock className="w-8 h-8 mx-auto mb-2 opacity-50" />
                      <p>Your professional message will appear here</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Benefits */}
          <div className="mt-16 text-center">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-8">
              Why teachers love this tool:
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Save 15+ Minutes</h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Turn 5-word notes into professional messages instantly
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Always Professional</h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Perfect tone and grammar, every single time
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageSquare className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Your Voice</h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Sounds like you, not a robot or template
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}