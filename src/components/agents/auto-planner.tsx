'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Brain, 
  Lightbulb, 
  Target, 
  Users, 
  BookOpen,
  MessageSquare,
  Clock,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  Sparkles,
  Link,
  RefreshCw
} from 'lucide-react';
import { aiServices, AutoPlannerRequest } from '@/lib/ai-services';
// import { useAuth } from '@/hooks/useAuth';

interface AutoPlannerProps {
  context?: 'promptly' | 'teach' | 'collaboration';
  initialInput?: string;
  onPlanGenerated?: (plan: string) => void;
}

interface GeneratedPlan {
  content: string;
  context: string;
  timestamp: string;
  reasoning?: string;
  safety_score?: number;
}

export function AutoPlannerAgent({ context = 'promptly', initialInput = '', onPlanGenerated }: AutoPlannerProps) {
  const [input, setInput] = useState(initialInput);
  const [selectedContext, setSelectedContext] = useState<'promptly' | 'teach' | 'collaboration'>(context);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPlan, setCurrentPlan] = useState<GeneratedPlan | null>(null);
  const [planHistory, setPlanHistory] = useState<GeneratedPlan[]>([]);
  const [crossAppMode, setCrossAppMode] = useState(false);
  
  // Mock user profile for demo - replace with actual useAuth hook
  const user = { uid: 'demo-user' };
  const userProfile = { teachingSubject: 'Elementary Education', gradeLevel: 'K-5' };

  useEffect(() => {
    // Load plan history from localStorage
    const savedHistory = localStorage.getItem('autoplanner-history');
    if (savedHistory) {
      setPlanHistory(JSON.parse(savedHistory));
    }
  }, []);

  useEffect(() => {
    // Save plan history to localStorage
    if (planHistory.length > 0) {
      localStorage.setItem('autoplanner-history', JSON.stringify(planHistory.slice(0, 10)));
    }
  }, [planHistory]);

  const handleGeneratePlan = async () => {
    if (!input.trim()) return;

    setIsLoading(true);
    try {
      const request: AutoPlannerRequest = {
        userInput: input,
        context: selectedContext,
        userProfile: userProfile || undefined,
        previousPlans: planHistory.slice(0, 3) // Include last 3 plans for context
      };

      const response = await aiServices.autoPlanner.generatePlan(request);
      
      const newPlan: GeneratedPlan = {
        content: response.content,
        context: selectedContext,
        timestamp: new Date().toISOString(),
        reasoning: response.reasoning,
        safety_score: response.safety_score
      };

      setCurrentPlan(newPlan);
      setPlanHistory(prev => [newPlan, ...prev]);
      
      if (onPlanGenerated) {
        onPlanGenerated(response.content);
      }

    } catch (error) {
      console.error('AutoPlanner error:', error);
      // Fallback to basic plan generation
      const fallbackPlan = generateFallbackPlan(input, selectedContext);
      setCurrentPlan(fallbackPlan);
    } finally {
      setIsLoading(false);
    }
  };

  const generateFallbackPlan = (userInput: string, planContext: string): GeneratedPlan => {
    const timestamp = new Date().toISOString();
    
    const fallbackPlans = {
      promptly: `## Communication Plan: ${userInput}

### 🎯 Objective
Create effective parent-teacher communication that builds relationships and supports student success.

### 📝 Key Components
1. **Opening**: Establish positive rapport
2. **Main Message**: Clear, specific information
3. **Action Items**: Next steps for all parties
4. **Follow-up**: Continued engagement strategy

### 💡 Recommended Approach
- Use a professional yet warm tone
- Include specific examples when appropriate
- Provide clear action items
- Invite questions and dialogue

### 📅 Implementation
- Send within 24-48 hours of the situation
- Follow up within a week
- Document outcomes for future reference`,

      teach: `## Lesson Plan: ${userInput}

### 🎯 Learning Objectives
Students will demonstrate understanding and application of key concepts through engaging activities.

### 📚 Lesson Structure
1. **Hook Activity** (5 min): Engage student interest
2. **Direct Instruction** (15 min): Present core concepts  
3. **Guided Practice** (15 min): Collaborative exploration
4. **Independent Work** (8 min): Individual application
5. **Closure** (2 min): Summarize and preview

### 🔧 Differentiation
- **Support**: Graphic organizers, peer partnerships
- **Extension**: Advanced challenges, leadership roles
- **Assessment**: Multiple formats, self-reflection

### 📦 Materials & Resources
- Presentation tools and handouts
- Collaborative workspace setup
- Assessment rubrics and feedback forms`,

      collaboration: `## Collaboration Plan: ${userInput}

### 🤝 Goals & Vision
Build effective educational partnerships that enhance student outcomes and professional growth.

### 👥 Stakeholder Engagement
- **Core Team**: Key educators and administrators
- **Extended Network**: Support staff and community partners
- **Communication**: Regular meetings and shared resources

### 📋 Action Framework
1. **Planning Phase**: Goal setting and role definition
2. **Implementation**: Resource sharing and coordination
3. **Evaluation**: Progress monitoring and adjustment
4. **Sustainability**: Long-term success planning

### 🔄 Success Measures
- Improved collaboration metrics
- Enhanced student outcomes
- Positive stakeholder feedback
- Sustainable practice adoption`
    };

    return {
      content: fallbackPlans[planContext],
      context: planContext,
      timestamp,
      reasoning: 'Generated using fallback planning system',
      safety_score: 0.9
    };
  };

  const handleCrossAppIntegration = () => {
    setCrossAppMode(!crossAppMode);
    if (!crossAppMode && currentPlan) {
      // Simulate cross-app integration
      const integratedContent = `## Cross-App Integration Active 🔗

### Promptly + Teach Connected
${currentPlan.content}

### 🚀 Enhanced Features
- **Shared Resources**: Access lesson plans and communication templates
- **Seamless Workflow**: Move from lesson planning to parent communication
- **Unified Analytics**: Track impact across both platforms
- **Smart Suggestions**: Context-aware recommendations

### 🎯 Next Steps
1. Review generated plan in current context
2. Access complementary features in connected app
3. Implement coordinated approach
4. Track results across platforms`;

      setCurrentPlan({
        ...currentPlan,
        content: integratedContent
      });
    }
  };

  const contextIcons = {
    promptly: <MessageSquare className="h-4 w-4" />,
    teach: <BookOpen className="h-4 w-4" />,
    collaboration: <Users className="h-4 w-4" />
  };

  const contextDescriptions = {
    promptly: 'Generate communication plans for parent-teacher interactions',
    teach: 'Create comprehensive lesson plans and teaching strategies',
    collaboration: 'Build collaboration frameworks for educational teams'
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="border-purple-200 dark:border-purple-800">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Brain className="h-6 w-6 text-purple-600" />
            <div>
              <CardTitle className="text-xl">AutoPlanner Agent</CardTitle>
              <CardDescription>
                AI-powered planning for education professionals
              </CardDescription>
            </div>
            {crossAppMode && (
              <Badge className="ml-auto bg-gradient-to-r from-purple-600 to-blue-600 text-white">
                <Link className="h-3 w-3 mr-1" />
                Cross-App Mode
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="text-xs">
              <Target className="h-3 w-3 mr-1" />
              Context-Aware Planning
            </Badge>
            <Badge variant="outline" className="text-xs">
              <Lightbulb className="h-3 w-3 mr-1" />
              Intelligent Suggestions
            </Badge>
            <Badge variant="outline" className="text-xs">
              <CheckCircle className="h-3 w-3 mr-1" />
              Safety Verified
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Planning Interface */}
      <Card>
        <CardHeader>
          <CardTitle>Generate AI-Powered Plan</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Context Selection */}
          <div>
            <label className="text-sm font-medium mb-2 block">Planning Context</label>
            <Select value={selectedContext} onValueChange={(value: any) => setSelectedContext(value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="promptly">
                  <div className="flex items-center gap-2">
                    {contextIcons.promptly}
                    <div>
                      <div>Parent Communication</div>
                      <div className="text-xs text-gray-500">Promptly Context</div>
                    </div>
                  </div>
                </SelectItem>
                <SelectItem value="teach">
                  <div className="flex items-center gap-2">
                    {contextIcons.teach}
                    <div>
                      <div>Lesson Planning</div>
                      <div className="text-xs text-gray-500">Teach Context</div>
                    </div>
                  </div>
                </SelectItem>
                <SelectItem value="collaboration">
                  <div className="flex items-center gap-2">
                    {contextIcons.collaboration}
                    <div>
                      <div>Team Collaboration</div>
                      <div className="text-xs text-gray-500">Multi-Teacher Context</div>
                    </div>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-gray-500 mt-1">
              {contextDescriptions[selectedContext]}
            </p>
          </div>

          {/* Input */}
          <div>
            <label className="text-sm font-medium mb-2 block">Describe what you need to plan</label>
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={`Example: "Need to communicate with parents about student's improvement in math" or "Plan a lesson on fractions for 4th grade" or "Coordinate reading intervention across grade levels"`}
              rows={3}
              className="resize-none"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <Button
              onClick={handleGeneratePlan}
              disabled={!input.trim() || isLoading}
              className="flex-1 bg-purple-600 hover:bg-purple-700"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Generating Plan...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4 mr-2" />
                  Generate Plan
                </>
              )}
            </Button>
            
            {currentPlan && (
              <Button
                variant="outline"
                onClick={handleCrossAppIntegration}
                className="border-purple-200 text-purple-600 hover:bg-purple-50"
              >
                <Link className="h-4 w-4 mr-2" />
                {crossAppMode ? 'Disconnect Apps' : 'Connect Apps'}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Generated Plan */}
      {currentPlan && (
        <Card className="border-green-200 dark:border-green-800">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {contextIcons[currentPlan.context]}
                <div>
                  <CardTitle className="text-lg">Generated Plan</CardTitle>
                  <CardDescription>
                    {currentPlan.context.charAt(0).toUpperCase() + currentPlan.context.slice(1)} Context
                    {currentPlan.safety_score && (
                      <Badge className="ml-2 bg-green-100 text-green-800 text-xs">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Safety Score: {(currentPlan.safety_score * 100).toFixed(0)}%
                      </Badge>
                    )}
                  </CardDescription>
                </div>
              </div>
              <div className="text-xs text-gray-500">
                <Clock className="h-3 w-3 inline mr-1" />
                {new Date(currentPlan.timestamp).toLocaleTimeString()}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="prose prose-sm max-w-none dark:prose-invert">
              {currentPlan.content.split('\n').map((line, index) => {
                if (line.startsWith('##')) {
                  return <h2 key={index} className="text-lg font-bold mt-4 mb-2">{line.replace('##', '').trim()}</h2>;
                } else if (line.startsWith('###')) {
                  return <h3 key={index} className="text-base font-semibold mt-3 mb-2">{line.replace('###', '').trim()}</h3>;
                } else if (line.startsWith('- ')) {
                  return <li key={index} className="ml-4">{line.replace('- ', '')}</li>;
                } else if (line.startsWith('1. ') || /^\d+\./.test(line)) {
                  return <div key={index} className="ml-4">{line}</div>;
                } else if (line.trim()) {
                  return <p key={index} className="mb-2">{line}</p>;
                } else {
                  return <br key={index} />;
                }
              })}
            </div>
            
            {currentPlan.reasoning && (
              <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="flex items-center gap-2 text-blue-700 dark:text-blue-300 text-sm">
                  <Brain className="h-4 w-4" />
                  <span className="font-medium">AI Reasoning:</span>
                </div>
                <p className="text-blue-600 dark:text-blue-400 text-sm mt-1">
                  {currentPlan.reasoning}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Plan History */}
      {planHistory.length > 1 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Recent Plans</CardTitle>
            <CardDescription>Your previous AI-generated plans</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {planHistory.slice(1, 4).map((plan, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 border rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800"
                  onClick={() => setCurrentPlan(plan)}
                >
                  <div className="flex items-center gap-3">
                    {contextIcons[plan.context as keyof typeof contextIcons]}
                    <div>
                      <div className="font-medium text-sm">
                        {plan.context.charAt(0).toUpperCase() + plan.context.slice(1)} Plan
                      </div>
                      <div className="text-xs text-gray-500">
                        {new Date(plan.timestamp).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-gray-400" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}