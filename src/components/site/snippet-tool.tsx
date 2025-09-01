'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Loader2, Copy, RotateCcw, Sparkles } from 'lucide-react';

export function SnippetTool() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [tone, setTone] = useState('professional');
  const [length, setLength] = useState([150]);
  const [copied, setCopied] = useState(false);
  // const t = useTranslations('snippet_tool'); // TODO: Add translations

  const handleGenerate = async () => {
    if (!input.trim()) return;
    
    setIsLoading(true);
    // Simulate API call with tone and length considerations
    setTimeout(() => {
      const toneTemplates = {
        professional: 'I wanted to share some feedback on your recent work',
        friendly: 'Hope you\'re doing well! I wanted to chat about',
        encouraging: 'I\'m so proud of your progress with',
        direct: 'Here\'s my feedback on'
      };
      
      const starter = toneTemplates[tone as keyof typeof toneTemplates] || toneTemplates.professional;
      const targetLength = length[0];
      
      let message = `${starter} "${input}".

`;
      
      if (targetLength <= 100) {
        message += `Great work! Shows strong understanding. Consider expanding with examples next time.`;
      } else if (targetLength <= 200) {
        message += `• Excellent grasp of key concepts
• Clear and well-organized presentation
• Suggestion: Add specific examples to strengthen your points
• Keep up the fantastic work!`;
      } else {
        message += `I was impressed by your thoughtful approach to this topic. Your understanding of the key concepts really shows through in your work.

What stood out to me:
• Strong analytical thinking
• Clear communication of complex ideas
• Good use of supporting evidence

For next time, consider incorporating more real-world examples to make your points even stronger. Overall, this represents excellent progress in your learning journey!`;
      }
      
      setOutput(message);
      setIsLoading(false);
    }, 2000);
  };
  
  const handleCopy = async () => {
    if (output) {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };
  
  const handleClear = () => {
    setInput('');
    setOutput('');
  };

  const quickTopics = ['Math homework completion', 'Science project presentation', 'Reading comprehension improvement', 'Behavior in class today'];

  return (
    <section className="py-24 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Try Promptly Now
          </h2>
          <p className="mt-4 text-gray-600 md:text-xl dark:text-gray-300">
            See how quickly you can generate professional parent messages
          </p>
          <p className="mt-2 text-sm text-purple-600 dark:text-purple-400 font-medium">
            Try it now - type a topic, get instant professional comments
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 shadow-lg">
            <CardHeader>
              <CardTitle className="text-gray-900 dark:text-gray-100">AI Message Generator</CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-400">
                Enter what you want to communicate to parents
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Controls */}
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-900 dark:text-gray-100">Tone</label>
                  <Select value={tone} onValueChange={setTone}>
                    <SelectTrigger className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="professional">Professional</SelectItem>
                      <SelectItem value="friendly">Friendly</SelectItem>
                      <SelectItem value="encouraging">Encouraging</SelectItem>
                      <SelectItem value="direct">Direct</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    Length: {length[0]} words
                  </label>
                  <Slider
                    value={length}
                    onValueChange={setLength}
                    max={300}
                    min={50}
                    step={25}
                    className="w-full"
                  />
                </div>
              </div>
              
              {/* Quick topic chips */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-900 dark:text-gray-100">Quick topics:</label>
                <div className="flex flex-wrap gap-2">
                  {quickTopics.map((topic, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => setInput(topic)}
                      className="text-xs bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800"
                    >
                      {topic}
                    </Button>
                  ))}
                </div>
              </div>
              
              {/* Main input/output */}
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="input" className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    What do you want to communicate?
                  </label>
                  <Textarea
                    id="input"
                    placeholder="e.g., Student did great work on math homework today"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="min-h-[120px] bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
                  />
                  <div className="flex gap-2">
                    <Button 
                      onClick={handleGenerate} 
                      disabled={!input.trim() || isLoading}
                      className="flex-1 bg-purple-600 hover:bg-purple-700 text-white"
                    >
                      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      <Sparkles className="mr-2 h-4 w-4" />
                      Generate Message
                    </Button>
                    <Button 
                      onClick={handleClear}
                      variant="outline"
                      className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
                    >
                      <RotateCcw className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="output" className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    Your professional message
                  </label>
                  <Textarea
                    id="output"
                    value={output}
                    readOnly
                    placeholder="Your generated message will appear here..."
                    className="min-h-[120px] bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
                  />
                  {output && (
                    <Button 
                      onClick={handleCopy}
                      variant="outline"
                      size="sm"
                      className="w-full bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
                    >
                      <Copy className="mr-2 h-4 w-4" />
                      {copied ? 'Copied!' : 'Copy Message'}
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}