'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  Loader2, 
  Copy, 
  RotateCcw, 
  Sparkles, 
  Star,
  StarOff,
  History,
  Settings,
  Trash2,
  Clock
} from 'lucide-react';

interface GeneratedMessage {
  id: string;
  input: string;
  output: string;
  tone: string;
  length: number;
  timestamp: number;
  favorited: boolean;
}

const tonePresets = [
  { 
    value: 'professional', 
    label: 'Professional',
    description: 'Formal and respectful tone for official communications',
    example: 'I wanted to share some feedback regarding...'
  },
  { 
    value: 'friendly', 
    label: 'Friendly',
    description: 'Warm and approachable while maintaining professionalism',
    example: 'Hope you\'re doing well! I wanted to chat about...'
  },
  { 
    value: 'encouraging', 
    label: 'Encouraging',
    description: 'Positive and supportive tone that motivates',
    example: 'I\'m so proud of the progress with...'
  },
  { 
    value: 'direct', 
    label: 'Direct',
    description: 'Clear and straightforward communication',
    example: 'I need to discuss the following with you...'
  },
  { 
    value: 'caring', 
    label: 'Caring',
    description: 'Empathetic and nurturing tone',
    example: 'I understand this might be concerning, and I want to help...'
  },
  { 
    value: 'celebratory', 
    label: 'Celebratory',
    description: 'Excited and positive for good news',
    example: 'I\'m thrilled to share some wonderful news about...'
  }
];

export function SnippetTool() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [tone, setTone] = useState('professional');
  const [length, setLength] = useState([150]);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState('generator');
  
  // History and favorites state
  const [history, setHistory] = useState<GeneratedMessage[]>([]);
  const [favorites, setFavorites] = useState<GeneratedMessage[]>([]);

  // Load history and favorites from localStorage on mount
  useEffect(() => {
    const savedHistory = localStorage.getItem('snippet-tool-history');
    const savedFavorites = localStorage.getItem('snippet-tool-favorites');
    
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  // Save to localStorage whenever history or favorites change
  useEffect(() => {
    localStorage.setItem('snippet-tool-history', JSON.stringify(history));
  }, [history]);

  useEffect(() => {
    localStorage.setItem('snippet-tool-favorites', JSON.stringify(favorites));
  }, [favorites]);

  const handleGenerate = async () => {
    if (!input.trim()) return;
    
    setIsLoading(true);
    // Simulate API call with tone and length considerations
    setTimeout(() => {
      const toneTemplates = {
        professional: 'I wanted to share some feedback regarding your recent work',
        friendly: 'Hope you\'re doing well! I wanted to chat about',
        encouraging: 'I\'m so proud of your progress with',
        direct: 'I need to discuss the following with you',
        caring: 'I understand this might be concerning, and I want to help with',
        celebratory: 'I\'m thrilled to share some wonderful news about'
      };
      
      const starter = toneTemplates[tone as keyof typeof toneTemplates] || toneTemplates.professional;
      const targetLength = length[0];
      
      let message = `${starter} "${input}".

`;
      
      if (targetLength <= 100) {
        message += `This is excellent work. I've noticed great improvement and wanted to acknowledge your efforts. Keep up the fantastic progress!`;
      } else if (targetLength <= 200) {
        message += `I've been impressed by the quality and effort shown. Here are my thoughts:

• Shows strong understanding of the concepts
• Clear improvement from previous work
• Demonstrates good effort and engagement
• Continue with this positive approach

Thank you for your dedication to learning.`;
      } else {
        message += `I wanted to take a moment to provide you with detailed feedback on this work.

What stood out to me:
• Excellent grasp of the fundamental concepts
• Clear and well-organized presentation of ideas
• Strong analytical thinking throughout
• Good use of examples to support your points

Areas of strength:
• Consistent effort and engagement
• Willingness to take on challenges
• Improvement from previous submissions

For future work, consider:
• Adding more specific examples where possible
• Connecting concepts to real-world applications
• Continuing with this level of thoughtful analysis

Overall, this represents excellent progress in your learning journey. I'm pleased with your development and look forward to seeing your continued growth.`;
      }
      
      const newMessage: GeneratedMessage = {
        id: Date.now().toString(),
        input,
        output: message,
        tone,
        length: targetLength,
        timestamp: Date.now(),
        favorited: false
      };
      
      setOutput(message);
      setHistory(prev => [newMessage, ...prev.slice(0, 9)]); // Keep last 10
      setIsLoading(false);
    }, 2000);
  };
  
  const handleCopy = async (text: string = output) => {
    if (text) {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };
  
  const handleClear = () => {
    setInput('');
    setOutput('');
  };

  const handleFavorite = (message: GeneratedMessage) => {
    const updatedMessage = { ...message, favorited: !message.favorited };
    
    if (updatedMessage.favorited) {
      setFavorites(prev => [updatedMessage, ...prev]);
    } else {
      setFavorites(prev => prev.filter(fav => fav.id !== message.id));
    }
    
    // Update history as well
    setHistory(prev => prev.map(h => h.id === message.id ? updatedMessage : h));
  };

  const handleUseFromHistory = (message: GeneratedMessage) => {
    setInput(message.input);
    setOutput(message.output);
    setTone(message.tone);
    setLength([message.length]);
    setActiveTab('generator');
  };

  const handleDeleteFromHistory = (messageId: string) => {
    setHistory(prev => prev.filter(h => h.id !== messageId));
    setFavorites(prev => prev.filter(f => f.id !== messageId));
  };

  const quickTopics = [
    'Excellent math homework completion this week',
    'Great improvement in reading comprehension',
    'Positive behavior during group work today',
    'Outstanding science project presentation',
    'Need to discuss assignment completion',
    'Wonderful participation in class discussions'
  ];

  const selectedTonePreset = tonePresets.find(preset => preset.value === tone);

  return (
    <section className="py-24 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Try Promptly Now
          </h2>
          <p className="mt-4 text-gray-600 md:text-xl dark:text-gray-300">
            Generate professional parent messages in seconds with AI
          </p>
          <p className="mt-2 text-sm text-purple-600 dark:text-purple-400 font-medium">
            Try it now - type a topic, get instant professional comments
          </p>
        </div>
        
        <div className="max-w-6xl mx-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto mb-8">
              <TabsTrigger value="generator" className="flex items-center gap-2">
                <Sparkles className="h-4 w-4" />
                Generator
              </TabsTrigger>
              <TabsTrigger value="history" className="flex items-center gap-2">
                <History className="h-4 w-4" />
                History
                {history.length > 0 && (
                  <Badge variant="secondary" className="ml-1 text-xs">
                    {history.length}
                  </Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="favorites" className="flex items-center gap-2">
                <Star className="h-4 w-4" />
                Favorites
                {favorites.length > 0 && (
                  <Badge variant="secondary" className="ml-1 text-xs">
                    {favorites.length}
                  </Badge>
                )}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="generator">
              <Card className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-gray-900 dark:text-gray-100">AI Message Generator</CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-400">
                    Create professional parent communication messages with advanced AI
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Tone Presets */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-900 dark:text-gray-100">Tone Preset</label>
                    <Select value={tone} onValueChange={setTone}>
                      <SelectTrigger className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {tonePresets.map((preset) => (
                          <SelectItem key={preset.value} value={preset.value}>
                            <div>
                              <div className="font-medium">{preset.label}</div>
                              <div className="text-xs text-gray-500">{preset.description}</div>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {selectedTonePreset && (
                      <p className="text-xs text-gray-500 dark:text-gray-400 italic">
                        Example: "{selectedTonePreset.example}"
                      </p>
                    )}
                  </div>
                  
                  {/* Length Control */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      Message Length: {length[0]} words
                    </label>
                    <Slider
                      value={length}
                      onValueChange={setLength}
                      max={300}
                      min={50}
                      step={25}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                      <span>Brief</span>
                      <span>Detailed</span>
                    </div>
                  </div>
                  
                  {/* Quick topic chips */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-900 dark:text-gray-100">Quick Topics:</label>
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
                  <div className="grid gap-6 lg:grid-cols-2">
                    <div className="space-y-4">
                      <label htmlFor="input" className="text-sm font-medium text-gray-900 dark:text-gray-100">
                        What do you want to communicate?
                      </label>
                      <Textarea
                        id="input"
                        placeholder="e.g., Student did excellent work on math homework this week"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="min-h-[150px] bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
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
                    
                    <div className="space-y-4">
                      <label htmlFor="output" className="text-sm font-medium text-gray-900 dark:text-gray-100">
                        Your professional message
                      </label>
                      <Textarea
                        id="output"
                        value={output}
                        readOnly
                        placeholder="Your generated message will appear here..."
                        className="min-h-[150px] bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
                      />
                      {output && (
                        <div className="flex gap-2">
                          <Button 
                            onClick={() => handleCopy()}
                            variant="outline"
                            size="sm"
                            className="flex-1 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
                          >
                            <Copy className="mr-2 h-4 w-4" />
                            {copied ? 'Copied!' : 'Copy Message'}
                          </Button>
                          <Button
                            onClick={() => {
                              const currentMessage = history[0];
                              if (currentMessage) {
                                handleFavorite(currentMessage);
                              }
                            }}
                            variant="outline"
                            size="sm"
                            className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
                          >
                            {history[0]?.favorited ? 
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" /> : 
                              <StarOff className="h-4 w-4" />
                            }
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="history">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <History className="h-5 w-5" />
                    Recent Messages
                  </CardTitle>
                  <CardDescription>
                    Your last {history.length} generated messages
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {history.length === 0 ? (
                    <div className="text-center py-8">
                      <History className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600 dark:text-gray-400">
                        No messages generated yet. Create your first message in the generator tab.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {history.map((message) => (
                        <div key={message.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                              <Clock className="h-4 w-4" />
                              <span>{new Date(message.timestamp).toLocaleDateString()}</span>
                              <Badge variant="secondary">{message.tone}</Badge>
                              <span>{message.length} words</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button
                                onClick={() => handleFavorite(message)}
                                variant="ghost"
                                size="sm"
                              >
                                {message.favorited ? 
                                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" /> : 
                                  <StarOff className="h-4 w-4" />
                                }
                              </Button>
                              <Button
                                onClick={() => handleDeleteFromHistory(message.id)}
                                variant="ghost"
                                size="sm"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                          <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                            <strong>Input:</strong> {message.input}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-3">
                            {message.output}
                          </p>
                          <div className="flex gap-2">
                            <Button
                              onClick={() => handleUseFromHistory(message)}
                              variant="outline"
                              size="sm"
                            >
                              Use This
                            </Button>
                            <Button
                              onClick={() => handleCopy(message.output)}
                              variant="outline"
                              size="sm"
                            >
                              <Copy className="h-4 w-4 mr-1" />
                              Copy
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="favorites">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="h-5 w-5" />
                    Favorite Messages
                  </CardTitle>
                  <CardDescription>
                    Messages you've saved for future reference
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {favorites.length === 0 ? (
                    <div className="text-center py-8">
                      <Star className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600 dark:text-gray-400">
                        No favorite messages yet. Star messages to save them here.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {favorites.map((message) => (
                        <div key={message.id} className="border border-yellow-200 dark:border-yellow-800 bg-yellow-50 dark:bg-yellow-900/10 rounded-lg p-4">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              <span>{new Date(message.timestamp).toLocaleDateString()}</span>
                              <Badge variant="secondary">{message.tone}</Badge>
                              <span>{message.length} words</span>
                            </div>
                            <Button
                              onClick={() => handleFavorite(message)}
                              variant="ghost"
                              size="sm"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                          <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                            <strong>Input:</strong> {message.input}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                            {message.output}
                          </p>
                          <div className="flex gap-2">
                            <Button
                              onClick={() => handleUseFromHistory(message)}
                              variant="outline"
                              size="sm"
                            >
                              Use This
                            </Button>
                            <Button
                              onClick={() => handleCopy(message.output)}
                              variant="outline"
                              size="sm"
                            >
                              <Copy className="h-4 w-4 mr-1" />
                              Copy
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
}