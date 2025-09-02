'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/auth-context';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Trophy, 
  Flame, 
  Clock, 
  Award,
  Target,
  Zap,
  Crown,
  Users,
  TrendingUp
} from 'lucide-react';

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  earned: boolean;
  progress?: number;
  target?: number;
}

interface LeaderboardEntry {
  uid: string;
  displayName: string;
  photoURL?: string;
  score: number;
  rank: number;
  badge?: string;
}

export function GamificationWidget() {
  const { user } = useAuth();
  const [userLevel, setUserLevel] = useState(1);
  const [currentPoints, setCurrentPoints] = useState(0);
  const [streak, setStreak] = useState(0);
  const [timeSaved, setTimeSaved] = useState(0);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);

  useEffect(() => {
    if (user) {
      loadGamificationData();
    }
  }, [user]);

  const loadGamificationData = async () => {
    try {
      // Load leaderboard
      const leaderboardResponse = await fetch('/api/gamification?action=leaderboard&limit=10');
      const leaderboardData = await leaderboardResponse.json();
      setLeaderboard(leaderboardData);

      // Mock user data (in a real app, this would come from the user profile)
      setUserLevel(calculateLevel(currentPoints));
      setTimeSaved(Math.floor(Math.random() * 500) + 50); // Mock time saved
      setStreak(Math.floor(Math.random() * 30) + 1); // Mock streak
      
      // Mock achievements
      setAchievements([
        {
          id: 'first_snippet',
          name: 'First Steps',
          description: 'Generated your first snippet',
          icon: '🎯',
          earned: true
        },
        {
          id: 'week_streak',
          name: 'Weekly Warrior',
          description: 'Used Zaza for 7 consecutive days',
          icon: '🔥',
          earned: streak >= 7,
          progress: Math.min(streak, 7),
          target: 7
        },
        {
          id: 'time_saver',
          name: 'Time Master',
          description: 'Saved 100+ hours with Zaza',
          icon: '⏰',
          earned: timeSaved >= 100,
          progress: Math.min(timeSaved, 100),
          target: 100
        },
        {
          id: 'social_butterfly',
          name: 'Community Champion',
          description: 'Shared 10 snippets with community',
          icon: '🦋',
          earned: false,
          progress: 3,
          target: 10
        },
        {
          id: 'referral_master',
          name: 'Referral Champion',
          description: 'Referred 5 teachers to Zaza',
          icon: '👥',
          earned: false,
          progress: 2,
          target: 5
        }
      ]);
    } catch (error) {
      console.error('Error loading gamification data:', error);
    }
  };

  const calculateLevel = (points: number): number => {
    return Math.floor(points / 100) + 1;
  };

  const getPointsForNextLevel = (level: number): number => {
    return level * 100;
  };

  const getStreakIcon = (days: number) => {
    if (days >= 30) return { icon: '🏆', color: 'text-yellow-500', bg: 'bg-yellow-100' };
    if (days >= 14) return { icon: '🔥', color: 'text-red-500', bg: 'bg-red-100' };
    if (days >= 7) return { icon: '⚡', color: 'text-orange-500', bg: 'bg-orange-100' };
    return { icon: '🌟', color: 'text-blue-500', bg: 'bg-blue-100' };
  };

  const streakDisplay = getStreakIcon(streak);

  return (
    <div className="space-y-6">
      {/* Level & Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Crown className="h-5 w-5 text-yellow-500" />
            Your Progress
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-purple-600">Level {userLevel}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {currentPoints % 100}/{getPointsForNextLevel(userLevel) - (userLevel - 1) * 100} points to next level
              </p>
            </div>
            <div className="text-right">
              <p className="text-lg font-semibold">{currentPoints} pts</p>
              <p className="text-xs text-gray-500">Total Points</p>
            </div>
          </div>
          <Progress 
            value={(currentPoints % 100)} 
            className="h-3" 
          />
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Streak */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-full ${streakDisplay.bg}`}>
                <span className="text-xl">{streakDisplay.icon}</span>
              </div>
              <div>
                <p className="text-2xl font-bold">{streak}</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">Day Streak</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Time Saved */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-green-100">
                <Clock className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{timeSaved}</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">Hours Saved</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Rank */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-blue-100">
                <TrendingUp className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  #{leaderboard.find(entry => entry.uid === user?.uid)?.rank || '—'}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">Global Rank</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Achievements */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5 text-orange-500" />
            Achievements
          </CardTitle>
          <CardDescription>
            Unlock badges by using Zaza and helping the community
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {achievements.map((achievement) => (
              <div
                key={achievement.id}
                className={`p-4 rounded-lg border ${
                  achievement.earned
                    ? 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20'
                    : 'border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800/50'
                }`}
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{achievement.icon}</span>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-sm truncate">{achievement.name}</h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2">
                      {achievement.description}
                    </p>
                    {!achievement.earned && achievement.progress !== undefined && achievement.target && (
                      <div className="mt-2">
                        <div className="flex justify-between text-xs mb-1">
                          <span>{achievement.progress}/{achievement.target}</span>
                          <span>{Math.round((achievement.progress / achievement.target) * 100)}%</span>
                        </div>
                        <Progress 
                          value={(achievement.progress / achievement.target) * 100} 
                          className="h-1" 
                        />
                      </div>
                    )}
                    {achievement.earned && (
                      <Badge variant="secondary" className="mt-1 text-xs">
                        Unlocked
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Leaderboard */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-yellow-500" />
            Community Leaderboard
          </CardTitle>
          <CardDescription>
            See how you rank among fellow educators
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {leaderboard.slice(0, 10).map((entry, index) => (
              <div
                key={entry.uid}
                className={`flex items-center gap-3 p-3 rounded-lg ${
                  entry.uid === user?.uid
                    ? 'bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800'
                    : 'bg-gray-50 dark:bg-gray-800/50'
                }`}
              >
                <div className="flex-shrink-0 w-8 text-center">
                  {index < 3 ? (
                    <span className="text-lg">
                      {index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉'}
                    </span>
                  ) : (
                    <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                      #{index + 1}
                    </span>
                  )}
                </div>
                <div className="flex-shrink-0">
                  {entry.photoURL ? (
                    <img
                      src={entry.photoURL}
                      alt={entry.displayName}
                      className="w-8 h-8 rounded-full"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center">
                      <Users className="h-4 w-4 text-white" />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">
                    {entry.displayName}
                    {entry.uid === user?.uid && (
                      <span className="ml-2 text-xs text-purple-600 dark:text-purple-400">(You)</span>
                    )}
                  </p>
                  {entry.badge && (
                    <p className="text-xs text-gray-600 dark:text-gray-400">{entry.badge}</p>
                  )}
                </div>
                <div className="text-right">
                  <p className="font-semibold">{entry.score}</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">points</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
