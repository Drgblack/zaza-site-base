'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  Bot, 
  Send, 
  Sparkles, 
  MessageCircle, 
  BookOpen,
  Lightbulb,
  ArrowRight,
  Zap
} from 'lucide-react';

interface ZaraModuleProps {
  variant?: 'default' | 'compact' | 'inline';
  context?: string;
  placeholder?: string;
  title?: string;
  description?: string;
  showExamples?: boolean;
}

const examplePrompts = [
  "Help me write a parent email about student progress",
  "Create a lesson plan for teaching fractions",
  "Suggest classroom management strategies",
  "Write feedback for a student's essay"
];

export function ZaraModule({ 
  variant = 'default', 
  context = 'general',
  placeholder = "Ask Zara anything about teaching...",
  title = "Ask Zara",
  description = "Get instant help with your teaching challenges",
  showExamples = true
}: ZaraModuleProps) {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setIsLoading(true);
    
    // Simulate AI response based on context
    setTimeout(() => {
      const responses = {
        general: `I'd be happy to help you with "${input}". Here's what I suggest:

1. **Understanding the Context**: Let me break down your request to provide the most relevant guidance.

2. **Practical Steps**: Based on best practices in education, here are some actionable steps you can take.

3. **Additional Resources**: I can also suggest some resources and templates that might be helpful.

Would you like me to elaborate on any of these points or help you with something more specific?`,
        
        blog: `Great question about "${input}"! This is a topic I see many teachers asking about. Here's my perspective:

**Key Insights:**
- This is a common challenge in modern classrooms
- There are several proven strategies that work well
- Technology can be a helpful tool when used thoughtfully

**Next Steps:**
- Try implementing one strategy at a time
- Track your results and adjust as needed
- Don't hesitate to reach out if you need more specific guidance

Would you like me to dive deeper into any particular aspect?`,
        
        resources: `I can definitely help you with "${input}"! Here are some resources and approaches:

**Immediate Solutions:**
- Quick templates and frameworks you can use today
- Step-by-step guides for implementation
- Common pitfalls to avoid

**Long-term Strategies:**
- Building sustainable practices
- Creating systems that work for your specific context
- Measuring and improving over time

Let me know if you'd like me to focus on any specific area!`,
        
        pricing: `Thanks for asking about "${input}"! This is exactly the kind of challenge Zaza is designed to help with:

**How Zaza Can Help:**
- Instant access to teaching expertise
- Personalized guidance for your specific situation
- Time-saving templates and frameworks
- 24/7 availability for when inspiration strikes

**Getting Started:**
- Try our free tier to see how Zara can assist you
- Upgrade for advanced features and unlimited access
- Join thousands of teachers already saving time with Zara

Ready to transform your teaching workflow?`
      };

      setResponse(responses[context as keyof typeof responses] || responses.general);
      setIsLoading(false);
    }, 2000);
  };

  const handleExampleClick = (example: string) => {
    setInput(example);
  };

  if (variant === 'compact') {
    return (
      <Card className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 border-purple-200 dark:border-purple-800">
        <CardContent className="p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
              <Bot className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <h3 className="font-semibold text-purple-900 dark:text-purple-100">{title}</h3>
              <p className="text-sm text-purple-700 dark:text-purple-300">{description}</p>
            </div>
          </div>
          
          <form onSubmit={handleSubmit} className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={placeholder}
              className="flex-1"
            />
            <Button type="submit" disabled={isLoading} size="sm">
              {isLoading ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </form>
          
          {response && (
            <div className="mt-3 p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg">
              <p className="text-sm text-gray-700 dark:text-gray-300">{response}</p>
            </div>
          )}
        </CardContent>
      </Card>
    );
  }

  if (variant === 'inline') {
    return (
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-lg p-4 border border-purple-200 dark:border-purple-800">
        <div className="flex items-center gap-2 mb-2">
          <Bot className="h-4 w-4 text-purple-600 dark:text-purple-400" />
          <span className="font-medium text-purple-900 dark:text-purple-100">Quick Question?</span>
        </div>
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={placeholder}
            className="flex-1 text-sm"
            size="sm"
          />
          <Button type="submit" disabled={isLoading} size="sm">
            <Send className="h-3 w-3" />
          </Button>
        </form>
      </div>
    );
  }

  return (
    <Card className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 border-purple-200 dark:border-purple-800">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg">
            <Bot className="h-6 w-6 text-purple-600 dark:text-purple-400" />
          </div>
          <div>
            <CardTitle className="text-purple-900 dark:text-purple-100">{title}</CardTitle>
            <CardDescription className="text-purple-700 dark:text-purple-300">
              {description}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={handleSubmit} className="space-y-3">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={placeholder}
            className="min-h-[100px] resize-none"
          />
          <Button type="submit" disabled={isLoading} className="w-full bg-purple-600 hover:bg-purple-700">
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Zara is thinking...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                Ask Zara
              </>
            )}
          </Button>
        </form>

        {showExamples && (
          <div className="space-y-2">
            <p className="text-sm font-medium text-purple-700 dark:text-purple-300">Try asking:</p>
            <div className="flex flex-wrap gap-2">
              {examplePrompts.map((example, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => handleExampleClick(example)}
                  className="text-xs bg-white/50 hover:bg-white/80 border-purple-200 text-purple-700 dark:bg-gray-800/50 dark:hover:bg-gray-800/80 dark:border-purple-700 dark:text-purple-300"
                >
                  <Lightbulb className="h-3 w-3 mr-1" />
                  {example}
                </Button>
              ))}
            </div>
          </div>
        )}

        {response && (
          <div className="mt-4 p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg border border-purple-200 dark:border-purple-700">
            <div className="flex items-center gap-2 mb-2">
              <MessageCircle className="h-4 w-4 text-purple-600 dark:text-purple-400" />
              <span className="font-medium text-purple-900 dark:text-purple-100">Zara's Response</span>
            </div>
            <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{response}</p>
          </div>
        )}

        <div className="flex items-center justify-between pt-2 border-t border-purple-200 dark:border-purple-700">
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="bg-purple-100 text-purple-700 dark:bg-purple-800 dark:text-purple-300">
              <Zap className="h-3 w-3 mr-1" />
              AI-Powered
            </Badge>
            <Badge variant="outline" className="text-purple-600 dark:text-purple-400">
              Free to Try
            </Badge>
          </div>
          <Button variant="ghost" size="sm" className="text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300">
            Learn More
            <ArrowRight className="h-3 w-3 ml-1" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
