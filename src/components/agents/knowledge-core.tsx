'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Database, 
  Brain, 
  Link2, 
  CheckCircle, 
  RefreshCw,
  Sparkles,
  Users,
  BookOpen,
  MessageSquare,
  Shield,
  TrendingUp,
  Lightbulb,
  Target,
  Settings,
  Zap
} from 'lucide-react';
import { aiServices, KnowledgeCoreContext } from '@/lib/ai-services';
import { useAuth } from '@/hooks/useAuth';
import { getUserSnippets, getSharedSnippets } from '@/lib/db';

interface KnowledgeCoreProps {
  onActivated?: (result: any) => void;
}

interface KnowledgeStats {
  personalSnippets: number;
  sharedSnippets: number;
  organizationSnippets: number;
  categories: { [key: string]: number };
  lastActivation: string | null;
  activationStatus: 'inactive' | 'syncing' | 'active' | 'error';
}

interface ZaraEnhancement {
  feature: string;
  description: string;
  status: 'available' | 'active' | 'pending';
  impact: 'high' | 'medium' | 'low';
}

export function KnowledgeCoreActivation({ onActivated }: KnowledgeCoreProps) {
  const [knowledgeStats, setKnowledgeStats] = useState<KnowledgeStats>({
    personalSnippets: 0,
    sharedSnippets: 0,
    organizationSnippets: 0,
    categories: {},
    lastActivation: null,
    activationStatus: 'inactive'
  });
  
  const [isActivating, setIsActivating] = useState(false);
  const [activationProgress, setActivationProgress] = useState(0);
  const [zaraEnhancements, setZaraEnhancements] = useState<ZaraEnhancement[]>([]);
  const [activationResult, setActivationResult] = useState<any>(null);
  
  const { user, userProfile } = useAuth();

  useEffect(() => {
    loadKnowledgeStats();
    loadZaraEnhancements();
  }, [user]);

  const loadKnowledgeStats = async () => {
    if (!user) return;

    try {
      // Load user's personal snippets
      const personalSnippets = await getUserSnippets(user.uid);
      
      // Load shared snippets user has access to
      const sharedSnippets = await getSharedSnippets();
      
      // Analyze categories
      const categories = analyzeCategories([...personalSnippets, ...sharedSnippets]);
      
      // Check last activation
      const lastActivation = localStorage.getItem('knowledgecore-last-activation');
      const activationStatus = localStorage.getItem('knowledgecore-status') as any || 'inactive';
      
      setKnowledgeStats({
        personalSnippets: personalSnippets.length,
        sharedSnippets: sharedSnippets.length,
        organizationSnippets: userProfile?.organizationId ? sharedSnippets.length : 0,
        categories,
        lastActivation,
        activationStatus
      });
      
    } catch (error) {
      console.error('Error loading knowledge stats:', error);
    }
  };

  const analyzeCategories = (snippets: any[]): { [key: string]: number } => {
    const categories: { [key: string]: number } = {};
    
    snippets.forEach(snippet => {
      const category = snippet.category || 'uncategorized';
      categories[category] = (categories[category] || 0) + 1;
    });
    
    return categories;
  };

  const loadZaraEnhancements = () => {
    const enhancements: ZaraEnhancement[] = [
      {
        feature: 'Personalized Tone Matching',
        description: 'Zara learns your communication style and suggests messages that match your voice',
        status: 'available',
        impact: 'high'
      },
      {
        feature: 'Context-Aware Suggestions',
        description: 'Smart recommendations based on your teaching context and student information',
        status: 'available',
        impact: 'high'
      },
      {
        feature: 'Pattern Learning',
        description: 'Zara identifies successful communication patterns from your history',
        status: 'available',
        impact: 'medium'
      },
      {
        feature: 'Collaborative Intelligence',
        description: 'Access to your organization\'s shared knowledge and best practices',
        status: userProfile?.organizationId ? 'available' : 'pending',
        impact: 'medium'
      },
      {
        feature: 'Smart Template Evolution',
        description: 'Your templates automatically improve based on successful outcomes',
        status: 'available',
        impact: 'medium'
      },
      {
        feature: 'Cross-Subject Integration',
        description: 'Connect insights across different subjects and grade levels',
        status: 'available',
        impact: 'low'
      }
    ];
    
    // Mark active enhancements if already activated
    if (knowledgeStats.activationStatus === 'active') {
      enhancements.forEach(enhancement => {
        if (enhancement.status === 'available') {
          enhancement.status = 'active';
        }
      });
    }
    
    setZaraEnhancements(enhancements);
  };

  const activateKnowledgeCore = async () => {
    if (!user) return;

    setIsActivating(true);
    setActivationProgress(0);
    
    try {
      // Step 1: Gather user content
      setActivationProgress(20);
      const personalSnippets = await getUserSnippets(user.uid);
      
      // Step 2: Gather shared content
      setActivationProgress(40);
      const sharedSnippets = await getSharedSnippets();
      
      // Step 3: Build knowledge context
      setActivationProgress(60);
      const knowledgeContext: KnowledgeCoreContext = {
        userSnippets: personalSnippets,
        sharedSnippets: sharedSnippets,
        organizationContext: userProfile?.organizationId ? {
          id: userProfile.organizationId,
          role: userProfile.role
        } : undefined,
        teachingSubject: userProfile?.teachingSubject,
        gradeLevel: userProfile?.gradeLevel
      };
      
      // Step 4: Activate with AI service
      setActivationProgress(80);
      const result = await aiServices.knowledgeCore.linkUserContentToZara(knowledgeContext);
      
      // Step 5: Complete activation
      setActivationProgress(100);
      setActivationResult(result);
      
      // Update local state
      setKnowledgeStats(prev => ({
        ...prev,
        lastActivation: new Date().toISOString(),
        activationStatus: 'active'
      }));
      
      // Persist activation state
      localStorage.setItem('knowledgecore-last-activation', new Date().toISOString());
      localStorage.setItem('knowledgecore-status', 'active');
      
      // Update Zara enhancements to active
      setZaraEnhancements(prev => prev.map(enhancement => ({
        ...enhancement,
        status: enhancement.status === 'available' ? 'active' : enhancement.status
      })));
      
      if (onActivated) {
        onActivated(result);
      }
      
    } catch (error) {
      console.error('KnowledgeCore activation error:', error);
      setKnowledgeStats(prev => ({
        ...prev,
        activationStatus: 'error'
      }));
      localStorage.setItem('knowledgecore-status', 'error');
    } finally {
      setIsActivating(false);
      setTimeout(() => setActivationProgress(0), 2000);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600';
      case 'syncing': return 'text-blue-600';
      case 'error': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="h-4 w-4" />;
      case 'syncing': return <RefreshCw className="h-4 w-4 animate-spin" />;
      case 'error': return <Shield className="h-4 w-4" />;
      default: return <Database className="h-4 w-4" />;
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-blue-100 text-blue-800';
      case 'low': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const totalContent = knowledgeStats.personalSnippets + knowledgeStats.sharedSnippets + knowledgeStats.organizationSnippets;

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="border-blue-200 dark:border-blue-800">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Database className="h-6 w-6 text-blue-600" />
              <div>
                <CardTitle className="text-xl">KnowledgeCore Activation</CardTitle>
                <CardDescription>
                  Link your content to Zara for personalized AI assistance
                </CardDescription>
              </div>
            </div>
            <div className={`flex items-center gap-2 ${getStatusColor(knowledgeStats.activationStatus)}`}>
              {getStatusIcon(knowledgeStats.activationStatus)}
              <span className="font-medium capitalize">{knowledgeStats.activationStatus}</span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{knowledgeStats.personalSnippets}</div>
              <div className="text-sm text-gray-600">Personal Snippets</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{knowledgeStats.sharedSnippets}</div>
              <div className="text-sm text-gray-600">Shared Content</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{Object.keys(knowledgeStats.categories).length}</div>
              <div className="text-sm text-gray-600">Categories</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">{totalContent}</div>
              <div className="text-sm text-gray-600">Total Items</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Activation Progress */}
      {isActivating && (
        <Card className="border-yellow-200 dark:border-yellow-800">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3 mb-3">
              <RefreshCw className="h-5 w-5 text-yellow-600 animate-spin" />
              <span className="font-medium">Activating KnowledgeCore...</span>
            </div>
            <Progress value={activationProgress} className="w-full" />
            <div className="text-sm text-gray-600 mt-2">
              {activationProgress < 30 && 'Analyzing your personal content...'}
              {activationProgress >= 30 && activationProgress < 60 && 'Processing shared resources...'}
              {activationProgress >= 60 && activationProgress < 90 && 'Building knowledge connections...'}
              {activationProgress >= 90 && 'Finalizing Zara integration...'}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Main Content */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="enhancements">Zara Enhancements</TabsTrigger>
          <TabsTrigger value="insights">Knowledge Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5" />
                Knowledge Integration Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {knowledgeStats.activationStatus === 'inactive' ? (
                <div className="text-center py-8">
                  <Database className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Ready to Activate</h3>
                  <p className="text-gray-600 mb-6 max-w-md mx-auto">
                    Connect your content library to Zara for personalized, context-aware assistance.
                    Your knowledge will enhance every interaction.
                  </p>
                  <Button
                    onClick={activateKnowledgeCore}
                    disabled={isActivating || totalContent === 0}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <Zap className="h-4 w-4 mr-2" />
                    Activate KnowledgeCore
                  </Button>
                  {totalContent === 0 && (
                    <p className="text-sm text-gray-500 mt-2">
                      Create some snippets first to enable activation
                    </p>
                  )}
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-6 w-6 text-green-600" />
                      <div>
                        <div className="font-semibold">KnowledgeCore Active</div>
                        <div className="text-sm text-green-700 dark:text-green-300">
                          Zara has access to your personalized knowledge base
                        </div>
                      </div>
                    </div>
                    {knowledgeStats.lastActivation && (
                      <div className="text-sm text-green-600">
                        Last synced: {new Date(knowledgeStats.lastActivation).toLocaleDateString()}
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="border-blue-200">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <MessageSquare className="h-4 w-4 text-blue-600" />
                          <span className="font-medium">Communication Style</span>
                        </div>
                        <p className="text-sm text-gray-600">
                          Zara has learned your preferred tone and communication patterns
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="border-purple-200">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <BookOpen className="h-4 w-4 text-purple-600" />
                          <span className="font-medium">Teaching Context</span>
                        </div>
                        <p className="text-sm text-gray-600">
                          Subject-specific knowledge and grade-level appropriate suggestions
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="border-green-200">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Users className="h-4 w-4 text-green-600" />
                          <span className="font-medium">Collaborative Intelligence</span>
                        </div>
                        <p className="text-sm text-gray-600">
                          {userProfile?.organizationId 
                            ? 'Connected to your organization\'s shared knowledge'
                            : 'Access to community best practices and templates'
                          }
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="border-orange-200">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <TrendingUp className="h-4 w-4 text-orange-600" />
                          <span className="font-medium">Adaptive Learning</span>
                        </div>
                        <p className="text-sm text-gray-600">
                          Continuously improving suggestions based on your successful patterns
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="enhancements" className="space-y-4">
          <div className="grid gap-4">
            {zaraEnhancements.map((enhancement, index) => (
              <Card key={index} className={`${enhancement.status === 'active' ? 'border-green-200' : ''}`}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-full ${
                        enhancement.status === 'active' 
                          ? 'bg-green-100 text-green-600' 
                          : enhancement.status === 'available'
                          ? 'bg-blue-100 text-blue-600'
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        {enhancement.status === 'active' && <CheckCircle className="h-4 w-4" />}
                        {enhancement.status === 'available' && <Lightbulb className="h-4 w-4" />}
                        {enhancement.status === 'pending' && <Settings className="h-4 w-4" />}
                      </div>
                      <div>
                        <h3 className="font-semibold">{enhancement.feature}</h3>
                        <p className="text-sm text-gray-600">{enhancement.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getImpactColor(enhancement.impact)}>
                        {enhancement.impact} impact
                      </Badge>
                      <Badge 
                        variant={enhancement.status === 'active' ? 'default' : 'outline'}
                        className={enhancement.status === 'active' ? 'bg-green-600 hover:bg-green-600' : ''}
                      >
                        {enhancement.status}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="insights" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Content Categories */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Content Categories</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {Object.entries(knowledgeStats.categories).map(([category, count]) => (
                    <div key={category} className="flex items-center justify-between">
                      <span className="capitalize">{category.replace('-', ' ')}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-2 bg-gray-200 rounded-full">
                          <div 
                            className="h-full bg-blue-500 rounded-full"
                            style={{ width: `${(count / Math.max(...Object.values(knowledgeStats.categories))) * 100}%` }}
                          />
                        </div>
                        <span className="text-sm text-gray-600 w-8 text-right">{count}</span>
                      </div>
                    </div>
                  ))}
                  {Object.keys(knowledgeStats.categories).length === 0 && (
                    <p className="text-gray-500 text-center py-4">No content categories yet</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Knowledge Impact */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Knowledge Impact</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Content Richness</span>
                    <div className="flex items-center gap-2">
                      <Progress value={Math.min(totalContent * 5, 100)} className="w-20" />
                      <span className="text-sm">
                        {totalContent > 20 ? 'Excellent' : totalContent > 10 ? 'Good' : totalContent > 5 ? 'Fair' : 'Basic'}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span>Category Coverage</span>
                    <div className="flex items-center gap-2">
                      <Progress value={Object.keys(knowledgeStats.categories).length * 20} className="w-20" />
                      <span className="text-sm">
                        {Object.keys(knowledgeStats.categories).length}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span>Collaboration Potential</span>
                    <div className="flex items-center gap-2">
                      <Progress value={userProfile?.organizationId ? 85 : knowledgeStats.sharedSnippets > 0 ? 60 : 30} className="w-20" />
                      <span className="text-sm">
                        {userProfile?.organizationId ? 'High' : knowledgeStats.sharedSnippets > 0 ? 'Medium' : 'Low'}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Activation Result */}
          {activationResult && (
            <Card className="border-green-200">
              <CardHeader>
                <CardTitle className="text-lg text-green-700">Activation Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose prose-sm max-w-none">
                  {activationResult.content.split('\n').map((line: string, index: number) => {
                    if (line.startsWith('##')) {
                      return <h3 key={index} className="font-bold mt-2 mb-1">{line.replace('##', '').trim()}</h3>;
                    } else if (line.startsWith('###')) {
                      return <h4 key={index} className="font-semibold mt-2 mb-1">{line.replace('###', '').trim()}</h4>;
                    } else if (line.startsWith('- ')) {
                      return <li key={index} className="ml-4">{line.replace('- ', '')}</li>;
                    } else if (line.trim()) {
                      return <p key={index} className="mb-1">{line}</p>;
                    }
                    return null;
                  })}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}