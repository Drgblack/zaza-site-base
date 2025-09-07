'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Bot, 
  Brain, 
  Shield, 
  Zap, 
  Link2, 
  Database,
  Settings,
  TrendingUp,
  Users,
  BookOpen,
  MessageSquare,
  Sparkles,
  Target,
  CheckCircle,
  AlertTriangle,
  RefreshCw
} from 'lucide-react';
import { AutoPlannerAgent } from './auto-planner';
import { KnowledgeCoreActivation } from './knowledge-core';
import { AdaptiveAISafetyLayer } from './ai-safety-layer';

interface AgentStatus {
  autoPlanner: 'active' | 'inactive' | 'syncing';
  knowledgeCore: 'active' | 'inactive' | 'syncing';
  safetyLayer: 'active' | 'inactive' | 'syncing';
}

interface CrossAppIntegration {
  promptlyConnected: boolean;
  teachConnected: boolean;
  collaborationEnabled: boolean;
}

export function AgentDashboard() {
  const [activeAgent, setActiveAgent] = useState<'autoplanner' | 'knowledgecore' | 'safety' | 'overview'>('overview');
  const [agentStatus, setAgentStatus] = useState<AgentStatus>({
    autoPlanner: 'inactive',
    knowledgeCore: 'inactive',
    safetyLayer: 'active' // Safety layer is always active
  });
  const [crossAppIntegration, setCrossAppIntegration] = useState<CrossAppIntegration>({
    promptlyConnected: true,
    teachConnected: false,
    collaborationEnabled: false
  });
  const [isInitializing, setIsInitializing] = useState(false);

  // Mock user profile for demo - replace with actual useAuth hook
  const userProfile = {
    teachingSubject: 'Elementary Education',
    gradeLevel: 'K-5',
    organizationId: null
  };

  const handleAgentActivation = async (agent: keyof AgentStatus) => {
    setAgentStatus(prev => ({ ...prev, [agent]: 'syncing' }));
    
    // Simulate activation process
    setTimeout(() => {
      setAgentStatus(prev => ({ ...prev, [agent]: 'active' }));
    }, 2000);
  };

  const handleCrossAppToggle = async (integration: keyof CrossAppIntegration) => {
    setCrossAppIntegration(prev => ({
      ...prev,
      [integration]: !prev[integration]
    }));
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'syncing': return <RefreshCw className="h-4 w-4 text-blue-600 animate-spin" />;
      default: return <AlertTriangle className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active': return <Badge className="bg-green-100 text-green-800">Active</Badge>;
      case 'syncing': return <Badge className="bg-blue-100 text-blue-800">Syncing</Badge>;
      default: return <Badge variant="outline">Inactive</Badge>;
    }
  };

  const agentCards = [
    {
      id: 'autoplanner',
      title: 'AutoPlanner Agent',
      description: 'AI-powered planning for education workflows',
      icon: <Brain className="h-6 w-6 text-purple-600" />,
      status: agentStatus.autoPlanner,
      features: ['Context-Aware Planning', 'Cross-App Integration', 'Intelligent Suggestions'],
      benefits: 'Generate comprehensive plans for communication, lessons, and collaboration'
    },
    {
      id: 'knowledgecore',
      title: 'KnowledgeCore',
      description: 'Link your content to Zara for personalized AI',
      icon: <Database className="h-6 w-6 text-blue-600" />,
      status: agentStatus.knowledgeCore,
      features: ['Content Integration', 'Personalized Responses', 'Pattern Learning'],
      benefits: 'Enhanced Zara responses based on your teaching style and content'
    },
    {
      id: 'safety',
      title: 'AI Safety Layer',
      description: 'Adaptive content protection and neutralization',
      icon: <Shield className="h-6 w-6 text-green-600" />,
      status: agentStatus.safetyLayer,
      features: ['Real-time Scanning', 'Auto-neutralization', 'FERPA Compliance'],
      benefits: 'Ensure all AI-generated content meets educational safety standards'
    }
  ];

  const activeAgentCount = Object.values(agentStatus).filter(status => status === 'active').length;

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Status Overview */}
        <Card className="border-purple-200 dark:border-purple-800">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <Bot className="h-5 w-5 text-purple-600" />
              <CardTitle className="text-lg">Agent Status</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-1">
                {activeAgentCount}/3
              </div>
              <div className="text-sm text-gray-600">Agents Active</div>
              <div className="mt-3 w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-purple-600 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${(activeAgentCount / 3) * 100}%` }}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Cross-App Integration */}
        <Card className="border-blue-200 dark:border-blue-800">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <Link2 className="h-5 w-5 text-blue-600" />
              <CardTitle className="text-lg">Integration</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Promptly</span>
                <CheckCircle className="h-4 w-4 text-green-600" />
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>Teach</span>
                {crossAppIntegration.teachConnected ? (
                  <CheckCircle className="h-4 w-4 text-green-600" />
                ) : (
                  <div className="h-4 w-4 border-2 border-gray-300 rounded-full" />
                )}
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>Collaboration</span>
                {crossAppIntegration.collaborationEnabled ? (
                  <CheckCircle className="h-4 w-4 text-green-600" />
                ) : (
                  <div className="h-4 w-4 border-2 border-gray-300 rounded-full" />
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* AI Performance */}
        <Card className="border-green-200 dark:border-green-800">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              <CardTitle className="text-lg">Performance</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-1">94%</div>
              <div className="text-sm text-gray-600 mb-2">Accuracy Score</div>
              <div className="flex items-center justify-center gap-1 text-xs">
                <Sparkles className="h-3 w-3 text-yellow-500" />
                <span>Improving</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* User Profile */}
        <Card className="border-orange-200 dark:border-orange-800">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <Target className="h-5 w-5 text-orange-600" />
              <CardTitle className="text-lg">Profile</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-1 text-sm">
              <div>
                <span className="text-gray-600">Subject:</span> {userProfile?.teachingSubject || 'General'}
              </div>
              <div>
                <span className="text-gray-600">Grade:</span> {userProfile?.gradeLevel || 'K-12'}
              </div>
              <div>
                <span className="text-gray-600">Type:</span> {userProfile?.organizationId ? 'Institution' : 'Individual'}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Agent Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {agentCards.map((agent) => (
          <Card 
            key={agent.id} 
            className={`cursor-pointer transition-all hover:shadow-lg ${
              agent.status === 'active' ? 'border-green-200 bg-green-50/30 dark:bg-green-900/10' : ''
            }`}
            onClick={() => setActiveAgent(agent.id as any)}
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {agent.icon}
                  <CardTitle className="text-lg">{agent.title}</CardTitle>
                </div>
                {getStatusBadge(agent.status)}
              </div>
              <CardDescription>{agent.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <h4 className="font-medium text-sm mb-2">Key Features:</h4>
                  <ul className="text-sm space-y-1">
                    {agent.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <div className="h-1.5 w-1.5 bg-blue-500 rounded-full" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="border-t pt-3">
                  <p className="text-sm text-gray-600">{agent.benefits}</p>
                </div>

                <div className="flex justify-between items-center">
                  {agent.status !== 'active' ? (
                    <Button 
                      size="sm" 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAgentActivation(agent.id as keyof AgentStatus);
                      }}
                      disabled={agent.status === 'syncing'}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      {agent.status === 'syncing' ? (
                        <>
                          <RefreshCw className="h-3 w-3 mr-1 animate-spin" />
                          Activating...
                        </>
                      ) : (
                        <>
                          <Zap className="h-3 w-3 mr-1" />
                          Activate
                        </>
                      )}
                    </Button>
                  ) : (
                    <Button size="sm" variant="outline">
                      <Settings className="h-3 w-3 mr-1" />
                      Configure
                    </Button>
                  )}
                  
                  <Button size="sm" variant="ghost">
                    View Details →
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Cross-App Integration Panel */}
      <Card className="border-purple-200 dark:border-purple-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Link2 className="h-5 w-5 text-purple-600" />
            Cross-App Integration Hub
          </CardTitle>
          <CardDescription>
            Connect Promptly, Teach, and Collaboration workflows for seamless AI assistance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className={`p-4 border rounded-lg ${crossAppIntegration.promptlyConnected ? 'border-green-200 bg-green-50 dark:bg-green-900/20' : ''}`}>
              <div className="flex items-center gap-2 mb-2">
                <MessageSquare className="h-4 w-4 text-blue-600" />
                <span className="font-medium">Promptly</span>
                {crossAppIntegration.promptlyConnected && <CheckCircle className="h-4 w-4 text-green-600" />}
              </div>
              <p className="text-sm text-gray-600 mb-3">
                Parent communication and snippet generation
              </p>
              <Button 
                size="sm" 
                disabled 
                className="bg-green-600"
              >
                Connected
              </Button>
            </div>

            <div className={`p-4 border rounded-lg ${crossAppIntegration.teachConnected ? 'border-green-200 bg-green-50 dark:bg-green-900/20' : ''}`}>
              <div className="flex items-center gap-2 mb-2">
                <BookOpen className="h-4 w-4 text-purple-600" />
                <span className="font-medium">Teach</span>
                {crossAppIntegration.teachConnected && <CheckCircle className="h-4 w-4 text-green-600" />}
              </div>
              <p className="text-sm text-gray-600 mb-3">
                Lesson planning and curriculum development
              </p>
              <Button 
                size="sm" 
                onClick={() => handleCrossAppToggle('teachConnected')}
                variant={crossAppIntegration.teachConnected ? "outline" : "default"}
                className={!crossAppIntegration.teachConnected ? "bg-blue-600 hover:bg-blue-700" : ""}
              >
                {crossAppIntegration.teachConnected ? 'Disconnect' : 'Connect'}
              </Button>
            </div>

            <div className={`p-4 border rounded-lg ${crossAppIntegration.collaborationEnabled ? 'border-green-200 bg-green-50 dark:bg-green-900/20' : ''}`}>
              <div className="flex items-center gap-2 mb-2">
                <Users className="h-4 w-4 text-orange-600" />
                <span className="font-medium">Collaboration</span>
                {crossAppIntegration.collaborationEnabled && <CheckCircle className="h-4 w-4 text-green-600" />}
              </div>
              <p className="text-sm text-gray-600 mb-3">
                Multi-teacher coordination and shared resources
              </p>
              <Button 
                size="sm" 
                onClick={() => handleCrossAppToggle('collaborationEnabled')}
                variant={crossAppIntegration.collaborationEnabled ? "outline" : "default"}
                className={!crossAppIntegration.collaborationEnabled ? "bg-orange-600 hover:bg-orange-700" : ""}
                disabled={!userProfile?.organizationId}
              >
                {crossAppIntegration.collaborationEnabled ? 'Disable' : 'Enable'}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Agent Interface */}
      <Tabs value={activeAgent} onValueChange={(value: any) => setActiveAgent(value)} className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="autoplanner">AutoPlanner</TabsTrigger>
          <TabsTrigger value="knowledgecore">KnowledgeCore</TabsTrigger>
          <TabsTrigger value="safety">Safety Layer</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Welcome to AI Agents Dashboard</CardTitle>
              <CardDescription>
                Access advanced AI-powered tools designed specifically for education professionals
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 border rounded-lg">
                  <Brain className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                  <h3 className="font-semibold mb-1">Smart Planning</h3>
                  <p className="text-sm text-gray-600">
                    AI generates comprehensive plans for any educational scenario
                  </p>
                </div>
                
                <div className="text-center p-4 border rounded-lg">
                  <Database className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <h3 className="font-semibold mb-1">Personalized AI</h3>
                  <p className="text-sm text-gray-600">
                    Zara learns from your content to provide tailored assistance
                  </p>
                </div>
                
                <div className="text-center p-4 border rounded-lg">
                  <Shield className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <h3 className="font-semibold mb-1">Safe & Compliant</h3>
                  <p className="text-sm text-gray-600">
                    Automatic content protection and safety monitoring
                  </p>
                </div>
              </div>
              
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                <div className="flex items-start gap-3">
                  <Sparkles className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-1">
                      Getting Started
                    </h4>
                    <p className="text-blue-700 dark:text-blue-300 text-sm">
                      Click on any agent tab above to explore its features. Activate KnowledgeCore first to enhance 
                      all other AI interactions with your personalized content and teaching context.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="autoplanner" className="space-y-4">
          <AutoPlannerAgent />
        </TabsContent>

        <TabsContent value="knowledgecore" className="space-y-4">
          <KnowledgeCoreActivation />
        </TabsContent>

        <TabsContent value="safety" className="space-y-4">
          <AdaptiveAISafetyLayer />
        </TabsContent>
      </Tabs>
    </div>
  );
}