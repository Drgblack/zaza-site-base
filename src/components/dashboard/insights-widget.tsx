'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/auth-context';
import { getUserProfile } from '@/lib/db';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Clock, 
  TrendingUp, 
  Target, 
  Award,
  Calendar,
  Zap,
  BookOpen,
  Users
} from 'lucide-react';

interface InsightsData {
  monthlyTimeSaved: number;
  totalTimeSaved: number;
  snippetsGenerated: number;
  weeklyGoal: number;
  weeklyProgress: number;
  streak: number;
  rank: string;
}

export function InsightsWidget() {
  const { user, isAuthenticated } = useAuth();
  const [insights, setInsights] = useState<InsightsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadInsights = async () => {
      if (!user || !isAuthenticated) {
        setLoading(false);
        return;
      }

      try {
        const userProfile = await getUserProfile(user.uid);
        if (userProfile) {
          setInsights({
            monthlyTimeSaved: userProfile.monthlyTimeSaved || 0,
            totalTimeSaved: userProfile.totalTimeSaved || 0,
            snippetsGenerated: userProfile.snippetsGenerated || 0,
            weeklyGoal: 60, // 1 hour per week goal
            weeklyProgress: Math.min((userProfile.monthlyTimeSaved || 0) / 4, 60), // Approximate weekly from monthly
            streak: Math.floor((userProfile.snippetsGenerated || 0) / 7), // 7 snippets = 1 week streak
            rank: getRank(userProfile.snippetsGenerated || 0)
          });
        }
      } catch (error) {
        console.error('Error loading insights:', error);
      } finally {
        setLoading(false);
      }
    };

    loadInsights();
  }, [user, isAuthenticated]);

  const getRank = (snippetsGenerated: number): string => {
    if (snippetsGenerated >= 100) return 'Expert Communicator';
    if (snippetsGenerated >= 50) return 'Pro Teacher';
    if (snippetsGenerated >= 25) return 'Skilled Educator';
    if (snippetsGenerated >= 10) return 'Growing Teacher';
    return 'New Teacher';
  };

  const formatTime = (minutes: number): string => {
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}m` : `${hours}h`;
  };

  const getProgressPercentage = (): number => {
    if (!insights) return 0;
    return Math.min((insights.weeklyProgress / insights.weeklyGoal) * 100, 100);
  };

  if (!isAuthenticated) {
    return null;
  }

  if (loading) {
    return (
      <Card className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 border-purple-200 dark:border-purple-800">
        <CardContent className="p-6">
          <div className="animate-pulse">
            <div className="h-4 bg-purple-200 rounded w-3/4 mb-2"></div>
            <div className="h-8 bg-purple-200 rounded w-1/2 mb-4"></div>
            <div className="h-3 bg-purple-200 rounded w-full mb-2"></div>
            <div className="h-3 bg-purple-200 rounded w-2/3"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!insights) {
    return null;
  }

  return (
    <Card className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 border-purple-200 dark:border-purple-800">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-purple-900 dark:text-purple-100">
          <Zap className="h-5 w-5" />
          Your Impact This Month
        </CardTitle>
        <CardDescription className="text-purple-700 dark:text-purple-300">
          Track your time savings and teaching efficiency
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Main Time Saved Display */}
        <div className="text-center">
          <div className="text-4xl font-bold text-purple-900 dark:text-purple-100 mb-2">
            {formatTime(insights.monthlyTimeSaved)}
          </div>
          <p className="text-purple-700 dark:text-purple-300 font-medium">
            Time saved this month
          </p>
          <Badge variant="secondary" className="mt-2 bg-purple-100 text-purple-800 dark:bg-purple-800 dark:text-purple-100">
            {insights.rank}
          </Badge>
        </div>

        {/* Weekly Progress */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-purple-700 dark:text-purple-300">Weekly Goal</span>
            <span className="text-purple-900 dark:text-purple-100 font-medium">
              {formatTime(insights.weeklyProgress)} / {formatTime(insights.weeklyGoal)}
            </span>
          </div>
          <div className="w-full bg-purple-200 dark:bg-purple-800 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${getProgressPercentage()}%` }}
            ></div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg">
            <BookOpen className="h-6 w-6 text-blue-600 mx-auto mb-1" />
            <div className="text-lg font-bold text-gray-900 dark:text-gray-100">
              {insights.snippetsGenerated}
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400">
              Snippets Created
            </div>
          </div>
          
          <div className="text-center p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg">
            <Target className="h-6 w-6 text-green-600 mx-auto mb-1" />
            <div className="text-lg font-bold text-gray-900 dark:text-gray-100">
              {insights.streak}
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400">
              Week Streak
            </div>
          </div>
        </div>

        {/* Total Time Saved */}
        <div className="text-center p-4 bg-white/30 dark:bg-gray-800/30 rounded-lg border border-purple-200 dark:border-purple-700">
          <div className="flex items-center justify-center gap-2 mb-1">
            <Award className="h-5 w-5 text-yellow-600" />
            <span className="text-sm font-medium text-purple-700 dark:text-purple-300">
              Total Time Saved
            </span>
          </div>
          <div className="text-2xl font-bold text-purple-900 dark:text-purple-100">
            {formatTime(insights.totalTimeSaved)}
          </div>
        </div>

        {/* Motivational Message */}
        <div className="text-center">
          <p className="text-sm text-purple-600 dark:text-purple-400 italic">
            {insights.monthlyTimeSaved >= 60 
              ? "🎉 Amazing! You've saved over an hour this month!"
              : insights.monthlyTimeSaved >= 30
              ? "Great progress! You're halfway to your monthly goal!"
              : "Keep going! Every snippet saves you valuable time."
            }
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
