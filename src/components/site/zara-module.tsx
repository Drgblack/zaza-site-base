'use client';

import { useState, useEffect } from 'react';
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
  Zap,
  Database,
  Brain,
  CheckCircle
} from 'lucide-react';
import { aiServices } from '@/lib/ai-services';
// import { useAuth } from '@/hooks/useAuth';

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
  const [knowledgeCoreActive, setKnowledgeCoreActive] = useState(false);
  const [isKnowledgeEnhanced, setIsKnowledgeEnhanced] = useState(false);
  
  // Mock user profile for demo - replace with actual useAuth hook
  const user = { uid: 'demo-user' };
  const userProfile = { teachingSubject: 'Elementary Education', gradeLevel: 'K-5' };

  useEffect(() => {
    // Check if KnowledgeCore is active
    const kcStatus = localStorage.getItem('knowledgecore-status');
    setKnowledgeCoreActive(kcStatus === 'active');
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setIsLoading(true);
    setIsKnowledgeEnhanced(false);
    
    try {
      // First, apply safety filtering
      const safetyResult = await aiServices.safety.scanContent(input);
      
      let processedInput = input;
      if (!safetyResult.isApproved) {
        processedInput = await aiServices.safety.neutralizeSensitiveContent(input);
      }
      
      // Generate enhanced response if KnowledgeCore is active
      let enhancedResponse = '';
      if (knowledgeCoreActive) {
        try {
          // This would use actual user knowledge in production
          enhancedResponse = await generateKnowledgeEnhancedResponse(processedInput, context);
          setIsKnowledgeEnhanced(true);
        } catch (error) {
          console.error('KnowledgeCore enhancement failed:', error);
        }
      }
      
      // Fallback to standard responses if enhancement fails or KC is inactive
      if (!enhancedResponse) {
        enhancedResponse = getStandardResponse(processedInput, context);
      }
      
      setResponse(enhancedResponse);
      
    } catch (error) {
      console.error('Zara response error:', error);
      setResponse('I apologize, but I encountered an error while processing your request. Please try again or rephrase your question.');
    } finally {
      setIsLoading(false);
    }
  };

  const generateKnowledgeEnhancedResponse = async (userInput: string, responseContext: string) => {
    // Simulate knowledge-enhanced response with user context
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const userContext = userProfile ? `${userProfile.teachingSubject || 'General Education'} (${userProfile.gradeLevel || 'K-12'})` : 'General Education';
    const hasOrganization = userProfile?.organizationId ? 'institutional' : 'individual';
    
    return `## 🧠 Knowledge-Enhanced Response

Hi! I've analyzed your question "${userInput}" using your personalized knowledge base and teaching context.

### 📚 Based on Your Profile
- **Subject Area**: ${userContext}
- **Teaching Context**: ${hasOrganization === 'institutional' ? 'School/District Environment' : 'Individual Educator'}
- **Personalization Level**: Advanced (using your content patterns)

### 💡 Tailored Recommendations

**Immediate Actions:**
1. **Contextual Approach**: Based on your ${userContext} background, I recommend starting with strategies that align with your curriculum standards
2. **Proven Patterns**: Your successful communications typically use ${['professional', 'collaborative', 'solution-focused'][Math.floor(Math.random() * 3)]} approaches
3. **Resource Integration**: I can connect this with ${['lesson planning', 'parent communication', 'assessment'][Math.floor(Math.random() * 3)]} resources you've used before

**Personalized Insights:**
- Your communication style tends toward ${['clear and direct', 'warm and supportive', 'structured and detailed'][Math.floor(Math.random() * 3)]} messaging
- Similar situations in your history have been most successful when you ${['provided specific examples', 'invited collaboration', 'set clear expectations'][Math.floor(Math.random() * 3)]}
- Your ${hasOrganization === 'institutional' ? 'school team' : 'professional network'} has shared effective strategies for this type of challenge

### 🎯 Next Steps
1. **Apply Your Style**: Use the tone and approach that's worked well for you in the past
2. **Leverage Resources**: I can help you adapt templates from your knowledge base
3. **Track Results**: Monitor outcomes and I'll learn from what works best for you

**🔗 Connected Resources**: ${hasOrganization === 'institutional' ? 'I can also suggest approaches that have worked well for other teachers in your organization' : 'I can recommend resources from the community knowledge base'}

*This response was enhanced using your personal teaching knowledge and communication patterns.*`;
  };

  const getStandardResponse = (userInput: string, responseContext: string) => {
    const responses = {
      general: `I'd be happy to help you with "${userInput}". Here's what I suggest:

1. **Understanding the Context**: Let me break down your request to provide the most relevant guidance.

2. **Practical Steps**: Based on best practices in education, here are some actionable steps you can take.

3. **Additional Resources**: I can also suggest some resources and templates that might be helpful.

Would you like me to elaborate on any of these points or help you with something more specific?`,
      
      blog: `Great question about "${userInput}"! This is a topic I see many teachers asking about. Here's my perspective:

**Key Insights:**
- This is a common challenge in modern classrooms
- There are several proven strategies that work well
- Technology can be a helpful tool when used thoughtfully

**Next Steps:**
- Try implementing one strategy at a time
- Track your results and adjust as needed
- Don't hesitate to reach out if you need more specific guidance

Would you like me to dive deeper into any particular aspect?`,
      
      resources: `I can help you with "${userInput}"! Here are some specific recommendations:

**From Our Resource Library:**
- **Parent Communication**: Use our 50 Ready-to-Use Parent Comments and Email Templates
- **Report Writing**: Try our Stress-Free Report Card Template with the Celebrate-Navigate-Partner framework
- **Teacher Wellbeing**: Check out our 10-minute daily practices guide for reducing burnout

**Quick Tips:**
- Start with one resource and adapt it to your style
- Use the templates as starting points, not rigid rules
- All resources above can be viewed and saved as PDF

**Need something specific?** Try asking: "Help me with parent emails about behavior" or "I need report writing phrases for math progress"

Which resource interests you most?`,
      
      pricing: `Thanks for asking about "${userInput}"! This is exactly the kind of challenge Zaza is designed to help with:

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

    return responses[responseContext as keyof typeof responses] || responses.general;
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
            <Button type="submit" disabled={isLoading} size="sm" className="min-w-[60px]">
              {isLoading ? (
                <div className="flex items-center gap-1">
                  <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white"></div>
                  <span className="text-xs">...</span>
                </div>
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </form>
          
          {isLoading && (
            <div className="mt-3 p-3 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 rounded-lg border border-blue-200 dark:border-blue-800">
              <div className="flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 dark:border-blue-400"></div>
                <span>Zara is thinking about your question...</span>
              </div>
            </div>
          )}
          
          {response && (
            <div className="mt-3 p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 rounded-lg border border-blue-200 dark:border-blue-800">
              <div className="flex items-start gap-2">
                <Bot className="h-4 w-4 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{response}</div>
              </div>
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
            {knowledgeCoreActive && (
              <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                <Database className="h-3 w-3 mr-1" />
                KnowledgeCore
              </Badge>
            )}
            {isKnowledgeEnhanced && (
              <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                <Brain className="h-3 w-3 mr-1" />
                Enhanced
              </Badge>
            )}
            <Badge variant="outline" className="text-purple-600 dark:text-purple-400">
              <CheckCircle className="h-3 w-3 mr-1" />
              Safety Protected
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
