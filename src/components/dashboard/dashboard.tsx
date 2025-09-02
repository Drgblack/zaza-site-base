'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/auth-context';
import { getUserProfile, getUserSnippets, SavedSnippet } from '@/lib/db';
import { signInWithGoogle } from '@/lib/auth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { InsightsWidget } from './insights-widget';
import { KnowledgeCore } from './knowledge-core';
import { AnalyticsDashboard } from './analytics-dashboard';
import { GamificationWidget } from './gamification-widget';
import { 
  BookOpen, 
  Download, 
  Gift, 
  MessageCircle, 
  Calendar,
  Clock,
  Share2,
  Star,
  Users,
  Award,
  TrendingUp,
  BarChart3,
  Upload,
  Sparkles,
  Zap,
  Heart
} from 'lucide-react';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { ErrorBoundary } from '@/components/ui/error-boundary';

export function Dashboard() {
  const { user, isAuthenticated, loading } = useAuth();
  const [userProfile, setUserProfile] = useState<any>(null);
  const [savedSnippets, setSavedSnippets] = useState<SavedSnippet[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [referralStats, setReferralStats] = useState({ referredCount: 0, creditsEarned: 0, referralCode: '' });

  useEffect(() => {
    const loadUserData = async () => {
      if (user) {
        try {
          const [profile, snippets, referrals] = await Promise.all([
            getUserProfile(user.uid),
            getUserSnippets(user.uid),
            fetch(`/api/referrals?uid=${user.uid}`).then(res => res.json()).catch(() => ({ referredCount: 0, creditsEarned: 0, referralCode: '' }))
          ]);
          setUserProfile(profile);
          setSavedSnippets(snippets);
          setReferralStats(referrals);
        } catch (error) {
          console.error('Error loading user data:', error);
        }
      }
      setIsLoading(false);
    };

    if (!loading) {
      loadUserData();
    }
  }, [user, loading]);

  if (loading || isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <LoadingSpinner size="xl" text="Loading your dashboard..." />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <Card className="max-w-md mx-4">
          <CardHeader>
            <CardTitle>Sign In Required</CardTitle>
            <CardDescription>
              Please sign in to access your dashboard and saved snippets.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={signInWithGoogle}
              className="w-full bg-purple-600 hover:bg-purple-700"
            >
              Sign in with Google
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const stats = {
    savedSnippets: savedSnippets.length,
    sharedSnippets: savedSnippets.filter(s => s.isShared).length,
    referralCredits: referralStats.creditsEarned || userProfile?.referralCredits || 0,
    totalRating: savedSnippets.filter(s => s.rating && s.rating > 0).length
  };

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-background">
        {/* Modern Header */}
        <div className="bg-card border-b border-border relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-50/50 via-pink-50/30 to-blue-50/50 dark:from-purple-950/20 dark:via-pink-950/10 dark:to-blue-950/10" />
          <div className="max-w-7xl mx-auto px-4 py-8 relative">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-display font-bold text-foreground">
                      Welcome back, {userProfile?.displayName || user?.displayName}!
                    </h1>
                    <p className="text-muted-foreground text-lg">
                      Your teaching communication hub
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Badge className="bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 dark:from-purple-900/30 dark:to-pink-900/30 dark:text-purple-300">
                  <GraduationCap className="w-4 h-4 mr-1" />
                  Teacher
                </Badge>
                <Badge variant="outline" className="border-primary/20 text-primary">
                  <Zap className="w-4 h-4 mr-1" />
                  Pro User
                </Badge>
              </div>
            </div>
          </div>
        </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Insights Widget */}
        <div className="mb-8">
          <InsightsWidget />
        </div>

        {/* Modern Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="group glass-card hover:teacher-shadow-lg transition-all duration-300 hover:-translate-y-1 border-purple-100 dark:border-purple-900/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-900/50 dark:to-purple-800/50 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <BookOpen className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Saved Snippets</p>
                    <p className="text-2xl font-bold text-foreground">{stats.savedSnippets}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-green-600 dark:text-green-400 font-medium">+12%</div>
                  <div className="text-xs text-muted-foreground">this month</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="group glass-card hover:teacher-shadow-lg transition-all duration-300 hover:-translate-y-1 border-blue-100 dark:border-blue-900/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/50 dark:to-blue-800/50 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Share2 className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Shared</p>
                    <p className="text-2xl font-bold text-foreground">{stats.sharedSnippets}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-blue-600 dark:text-blue-400 font-medium">+8%</div>
                  <div className="text-xs text-muted-foreground">this month</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="group glass-card hover:teacher-shadow-lg transition-all duration-300 hover:-translate-y-1 border-yellow-100 dark:border-yellow-900/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-yellow-100 to-yellow-200 dark:from-yellow-900/50 dark:to-yellow-800/50 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Star className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Helpful Votes</p>
                    <p className="text-2xl font-bold text-foreground">{stats.totalRating}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-yellow-600 dark:text-yellow-400 font-medium">+15%</div>
                  <div className="text-xs text-muted-foreground">this month</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="group glass-card hover:teacher-shadow-lg transition-all duration-300 hover:-translate-y-1 border-green-100 dark:border-green-900/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900/50 dark:to-green-800/50 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Gift className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Referral Credits</p>
                    <p className="text-2xl font-bold text-foreground">{stats.referralCredits}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-green-600 dark:text-green-400 font-medium">+3</div>
                  <div className="text-xs text-muted-foreground">this month</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Modern Main Content Tabs */}
        <Tabs defaultValue="snippets" className="space-y-8">
          <TabsList className="grid w-full grid-cols-6 max-w-4xl bg-muted/50 backdrop-blur-sm border border-border/50 rounded-2xl p-2">
            <TabsTrigger value="snippets" className="rounded-xl data-[state=active]:bg-background data-[state=active]:shadow-sm">
              <BookOpen className="w-4 h-4 mr-2" />
              My Snippets
            </TabsTrigger>
            <TabsTrigger value="knowledge" className="rounded-xl data-[state=active]:bg-background data-[state=active]:shadow-sm">
              <Upload className="w-4 h-4 mr-2" />
              KnowledgeCore
            </TabsTrigger>
            <TabsTrigger value="history" className="rounded-xl data-[state=active]:bg-background data-[state=active]:shadow-sm">
              <Download className="w-4 h-4 mr-2" />
              Downloads
            </TabsTrigger>
            <TabsTrigger value="analytics" className="rounded-xl data-[state=active]:bg-background data-[state=active]:shadow-sm">
              <BarChart3 className="w-4 h-4 mr-2" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="referrals" className="rounded-xl data-[state=active]:bg-background data-[state=active]:shadow-sm">
              <Gift className="w-4 h-4 mr-2" />
              Referrals
            </TabsTrigger>
            <TabsTrigger value="gamification" className="rounded-xl data-[state=active]:bg-background data-[state=active]:shadow-sm">
              <Award className="w-4 h-4 mr-2" />
              Progress
            </TabsTrigger>
          </TabsList>

          <TabsContent value="snippets" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Your Saved Snippets
                </CardTitle>
                <CardDescription>
                  Messages you've saved to your personal library
                </CardDescription>
              </CardHeader>
              <CardContent>
                {savedSnippets.length === 0 ? (
                  <div className="text-center py-8">
                    <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      No saved snippets yet. Start by generating some messages!
                    </p>
                    <Button asChild>
                      <a href="/#snippet-tool">Create Your First Snippet</a>
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {savedSnippets.map((snippet) => (
                      <div key={snippet.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex items-center gap-2">
                            <Badge variant="outline">{snippet.tone}</Badge>
                            <Badge variant="secondary">{snippet.category}</Badge>
                            {snippet.isShared && (
                              <Badge className="bg-blue-100 text-blue-700">Shared</Badge>
                            )}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {new Date(snippet.createdAt.toDate()).toLocaleDateString()}
                          </div>
                        </div>
                        <div className="mb-2">
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Context:</p>
                          <p className="text-sm italic">{snippet.context}</p>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-800 rounded p-3">
                          <p className="text-sm">{snippet.content}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="knowledge" className="space-y-6">
            <KnowledgeCore />
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Download className="h-5 w-5" />
                  Download History
                </CardTitle>
                <CardDescription>
                  Resources and guides you've downloaded
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Download className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 dark:text-gray-400">
                    No downloads yet. Check out our resources section!
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <AnalyticsDashboard />
          </TabsContent>

          <TabsContent value="referrals" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Gift className="h-5 w-5" />
                  Referral Program
                </CardTitle>
                <CardDescription>
                  Share Zaza Promptly with fellow teachers and earn rewards
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4">
                  <h3 className="font-semibold text-purple-900 dark:text-purple-100 mb-2">
                    Your Referral Code
                  </h3>
                  <div className="flex items-center gap-2">
                    <code className="bg-purple-100 dark:bg-purple-800 px-3 py-1 rounded text-purple-900 dark:text-purple-100 font-mono">
                      {userProfile?.referralCode || 'LOADING...'}
                    </code>
                    <Button 
                      size="sm" 
                      onClick={() => navigator.clipboard.writeText(userProfile?.referralCode)}
                    >
                      Copy
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="text-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{referralStats.referredCount}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Teachers Referred</p>
                  </div>
                  <div className="text-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <Award className="h-8 w-8 text-green-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{referralStats.creditsEarned}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Credits Earned</p>
                  </div>
                </div>

                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">Share Your Link</h4>
                  <div className="flex items-center gap-2 mb-3">
                    <code className="bg-blue-100 dark:bg-blue-800 px-3 py-1 rounded text-blue-900 dark:text-blue-100 font-mono text-sm flex-1">
                      {typeof window !== 'undefined' ? `${window.location.origin}/?ref=${userProfile?.referralCode}` : `/?ref=${userProfile?.referralCode}`}
                    </code>
                    <Button 
                      size="sm" 
                      onClick={() => {
                        const referralUrl = typeof window !== 'undefined' 
                          ? `${window.location.origin}/?ref=${userProfile?.referralCode}`
                          : `/?ref=${userProfile?.referralCode}`;
                        navigator.clipboard.writeText(referralUrl);
                      }}
                    >
                      Copy Link
                    </Button>
                  </div>
                  <p className="text-xs text-blue-600 dark:text-blue-400">
                    💡 Earn 5 credits for each teacher who signs up with your link!
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="gamification" className="space-y-6">
            <GamificationWidget />
          </TabsContent>
        </Tabs>
      </div>
      </div>
    </ErrorBoundary>
  );
}
