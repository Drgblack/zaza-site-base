'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Trophy, 
  Target, 
  TrendingUp, 
  BookOpen, 
  Share2, 
  MessageCircle,
  Award,
  Star
} from 'lucide-react';

interface ProgressTrackerProps {
  className?: string;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: unknown;
  progress: number;
  maxProgress: number;
  completed: boolean;
  reward?: string;
}

export function ProgressTracker({ className = "" }: ProgressTrackerProps) {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [totalPoints, setTotalPoints] = useState(0);
  const [level, setLevel] = useState(1);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Load progress from localStorage
    const loadProgress = () => {
      const blogReads = parseInt(localStorage.getItem('zaza-blog-reads') || '0');
      const shares = parseInt(localStorage.getItem('zaza-shares') || '0');
      const interactions = parseInt(localStorage.getItem('zaza-interactions') || '0');
      const snippetUses = parseInt(localStorage.getItem('zaza-snippet-uses') || '0');
      
      const newAchievements: Achievement[] = [
        {
          id: 'reader',
          title: 'Knowledge Seeker',
          description: 'Read blog articles to learn new strategies',
          icon: BookOpen,
          progress: blogReads,
          maxProgress: 5,
          completed: blogReads >= 5,
          reward: 'Unlock advanced tips'
        },
        {
          id: 'sharer',
          title: 'Community Builder',
          description: 'Share resources with fellow teachers',
          icon: Share2,
          progress: shares,
          maxProgress: 3,
          completed: shares >= 3,
          reward: 'Early access to new features'
        },
        {
          id: 'explorer',
          title: 'Platform Explorer',
          description: 'Try different features and tools',
          icon: Target,
          progress: interactions,
          maxProgress: 10,
          completed: interactions >= 10,
          reward: 'Productivity insights'
        },
        {
          id: 'prompter',
          title: 'AI Assistant',
          description: 'Use the snippet tool effectively',
          icon: MessageCircle,
          progress: snippetUses,
          maxProgress: 5,
          completed: snippetUses >= 5,
          reward: 'Premium templates'
        }
      ];

      setAchievements(newAchievements);
      
      // Calculate total points and level
      const points = newAchievements.reduce((total, achievement) => {
        return total + (achievement.completed ? 100 : achievement.progress * 10);
      }, 0);
      
      setTotalPoints(points);
      setLevel(Math.floor(points / 250) + 1);
      
      // Show tracker if user has some progress
      if (points > 50) {
        setIsVisible(true);
      }
    };

    loadProgress();
    
    // Set up interval to update progress
    const interval = setInterval(loadProgress, 5000);
    
    return () => clearInterval(interval);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem('zaza-progress-dismissed', 'true');
  };

  if (!isVisible) return null;

  const completedCount = achievements.filter(a => a.completed).length;
  const progressPercent = (totalPoints % 250) / 250 * 100;

  return (
    <Card className={`fixed top-4 right-4 w-80 shadow-lg border-purple-200 z-40 ${className}`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <Trophy className="w-4 h-4 text-white" />
            </div>
            <div>
              <CardTitle className="text-sm">Teaching Progress</CardTitle>
              <div className="flex items-center gap-1">
                <Badge variant="secondary" className="text-xs">
                  Level {level}
                </Badge>
                <span className="text-xs text-gray-500">{totalPoints} pts</span>
              </div>
            </div>
          </div>
          <button 
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 text-sm"
          >
            Ã—
          </button>
        </div>
        
        <div className="space-y-1">
          <div className="flex justify-between text-xs text-gray-600">
            <span>Next level</span>
            <span>{Math.ceil(progressPercent)}%</span>
          </div>
          <Progress value={progressPercent} className="h-1" />
        </div>
      </CardHeader>
      
      <CardContent className="pt-0 space-y-3">
        {achievements.map((achievement) => {
          const Icon = achievement.icon;
          const progress = Math.min(achievement.progress, achievement.maxProgress);
          const percent = (progress / achievement.maxProgress) * 100;
          
          return (
            <div key={achievement.id} className="space-y-2">
              <div className="flex items-center gap-2">
                <Icon className={`w-4 h-4 ${achievement.completed ? 'text-green-500' : 'text-gray-400'}`} />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{achievement.title}</span>
                    {achievement.completed && (
                      <Award className="w-3 h-3 text-yellow-500" />
                    )}
                  </div>
                  <p className="text-xs text-gray-600">{achievement.description}</p>
                </div>
              </div>
              
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-gray-500">
                  <span>{progress}/{achievement.maxProgress}</span>
                  <span>{Math.round(percent)}%</span>
                </div>
                <Progress 
                  value={percent} 
                  className={`h-1 ${achievement.completed ? 'bg-green-100' : ''}`} 
                />
              </div>
              
              {achievement.completed && achievement.reward && (
                <div className="text-xs text-green-600 bg-green-50 p-1 rounded">
                  ðŸŽ‰ {achievement.reward}
                </div>
              )}
            </div>
          );
        })}
        
        <div className="pt-2 border-t border-gray-100">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Achievements</span>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-500" />
              <span className="font-medium">{completedCount}/4</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
