'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/auth-context';
import { getUserProfile, UserProfile } from '@/lib/db';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Award, 
  Star, 
  Users, 
  BookOpen, 
  Clock, 
  Trophy, 
  Heart, 
  Share2, 
  Edit, 
  GraduationCap,
  MapPin,
  Calendar
} from 'lucide-react';
import { motion } from 'framer-motion';

interface TeacherProfileProps {
  userId?: string;
  compact?: boolean;
}

interface TeacherBadge {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'sharing' | 'engagement' | 'milestone' | 'recognition';
  earned: boolean;
  progress?: number;
  requirement?: number;
}

const availableBadges: TeacherBadge[] = [
  {
    id: 'first-share',
    name: 'First Share',
    description: 'Shared your first snippet with the community',
    icon: '🎯',
    category: 'sharing',
    earned: false
  },
  {
    id: 'helpful-teacher',
    name: 'Helpful Teacher',
    description: 'Your snippets have been saved 10+ times',
    icon: '❤️',
    category: 'sharing',
    earned: false,
    requirement: 10
  },
  {
    id: 'top-contributor',
    name: 'Top Contributor',
    description: 'Shared 10+ resources with the community',
    icon: '🔥',
    category: 'sharing',
    earned: false,
    requirement: 10
  },
  {
    id: 'community-favorite',
    name: 'Community Favorite',
    description: 'Received 50+ likes on your contributions',
    icon: '🌟',
    category: 'recognition',
    earned: false,
    requirement: 50
  },
  {
    id: 'early-adopter',
    name: 'Early Adopter',
    description: 'Among the first 100 teachers to join',
    icon: '🚀',
    category: 'milestone',
    earned: false
  },
  {
    id: 'mentor',
    name: 'Mentor',
    description: 'Helped 5+ teachers with guidance',
    icon: '🎓',
    category: 'engagement',
    earned: false,
    requirement: 5
  }
];

export function TeacherProfile({ userId, compact = false }: TeacherProfileProps) {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [badges, setBadges] = useState<TeacherBadge[]>(availableBadges);
  const [isLoading, setIsLoading] = useState(true);
  const [isOwnProfile, setIsOwnProfile] = useState(false);

  useEffect(() => {
    const loadProfile = async () => {
      const targetUserId = userId || user?.uid;
      if (!targetUserId) {
        setIsLoading(false);
        return;
      }

      setIsOwnProfile(!userId || userId === user?.uid);
      
      try {
        const userProfile = await getUserProfile(targetUserId);
        if (userProfile) {
          setProfile(userProfile);
          
          // Calculate badge progress
          const updatedBadges = badges.map(badge => {
            let earned = false;
            let progress = 0;

            switch (badge.id) {
              case 'first-share':
                earned = (userProfile.customSnippets?.length || 0) > 0;
                break;
              case 'helpful-teacher':
                progress = userProfile.totalPoints || 0; // Simplified - would need save count
                earned = progress >= (badge.requirement || 10);
                break;
              case 'top-contributor':
                progress = (userProfile.customSnippets?.length || 0);
                earned = progress >= (badge.requirement || 10);
                break;
              case 'community-favorite':
                progress = userProfile.totalPoints || 0; // Simplified - would need like count
                earned = progress >= (badge.requirement || 50);
                break;
              case 'early-adopter':
                // Would check user creation date vs launch date
                earned = userProfile.createdAt && new Date(userProfile.createdAt.toDate()).getTime() < new Date('2024-01-01').getTime();
                break;
              case 'mentor':
                progress = userProfile.referredUsers?.length || 0;
                earned = progress >= (badge.requirement || 5);
                break;
            }

            return { ...badge, earned, progress };
          });

          setBadges(updatedBadges);
        }
      } catch (error) {
        console.error('Error loading profile:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProfile();
  }, [userId, user?.uid, badges]);

  if (isLoading) {
    return (
      <Card className={compact ? "w-full" : "max-w-2xl mx-auto"}>
        <CardContent className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gray-200 rounded-full" />
              <div className="space-y-2">
                <div className="w-32 h-4 bg-gray-200 rounded" />
                <div className="w-24 h-3 bg-gray-200 rounded" />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="h-16 bg-gray-200 rounded" />
              <div className="h-16 bg-gray-200 rounded" />
              <div className="h-16 bg-gray-200 rounded" />
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!profile) {
    return (
      <Card className={compact ? "w-full" : "max-w-2xl mx-auto"}>
        <CardContent className="p-6 text-center">
          <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-300">
            Profile not found or not available.
          </p>
        </CardContent>
      </Card>
    );
  }

  const earnedBadges = badges.filter(b => b.earned);
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  if (compact) {
    return (
      <Card className="w-full">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={profile.photoURL} />
              <AvatarFallback>{getInitials(profile.displayName)}</AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <h3 className="font-semibold truncate">{profile.displayName}</h3>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                {profile.school && (
                  <>
                    <GraduationCap className="h-3 w-3" />
                    <span className="truncate">{profile.school}</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="grid grid-cols-2 gap-3 text-center">
            <div>
              <div className="text-lg font-bold text-purple-600">{profile.snippetsGenerated || 0}</div>
              <div className="text-xs text-gray-500">Snippets</div>
            </div>
            <div>
              <div className="text-lg font-bold text-green-600">{earnedBadges.length}</div>
              <div className="text-xs text-gray-500">Badges</div>
            </div>
          </div>
          {earnedBadges.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-3 justify-center">
              {earnedBadges.slice(0, 3).map((badge) => (
                <span key={badge.id} className="text-sm" title={badge.description}>
                  {badge.icon}
                </span>
              ))}
              {earnedBadges.length > 3 && (
                <span className="text-xs text-gray-500">+{earnedBadges.length - 3}</span>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Profile Header */}
      <Card>
        <CardContent className="p-8">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <Avatar className="h-24 w-24">
              <AvatarImage src={profile.photoURL} />
              <AvatarFallback className="text-2xl">{getInitials(profile.displayName)}</AvatarFallback>
            </Avatar>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                    {profile.displayName}
                  </h1>
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300 mt-1">
                    {profile.school && (
                      <>
                        <GraduationCap className="h-4 w-4" />
                        <span>{profile.school}</span>
                      </>
                    )}
                    {profile.subject && (
                      <>
                        {profile.school && <span>•</span>}
                        <span>{profile.subject}</span>
                      </>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500 mt-2">
                    <Calendar className="h-4 w-4" />
                    <span>Joined {new Date(profile.createdAt?.toDate()).toLocaleDateString()}</span>
                  </div>
                </div>
                
                {isOwnProfile && (
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Button>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6 text-center">
            <BookOpen className="h-8 w-8 text-purple-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {profile.snippetsGenerated || 0}
            </div>
            <div className="text-sm text-gray-500">Snippets Created</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 text-center">
            <Share2 className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {profile.customSnippets?.length || 0}
            </div>
            <div className="text-sm text-gray-500">Shared Resources</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 text-center">
            <Clock className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {Math.round((profile.totalTimeSaved || 0) / 60)}h
            </div>
            <div className="text-sm text-gray-500">Time Saved</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 text-center">
            <Trophy className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {earnedBadges.length}
            </div>
            <div className="text-sm text-gray-500">Badges Earned</div>
          </CardContent>
        </Card>
      </div>

      {/* Badges Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5" />
            Achievements & Recognition
          </CardTitle>
          <CardDescription>
            Badges earned for contributions to the teaching community
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {badges.map((badge, index) => (
              <motion.div
                key={badge.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`p-4 rounded-lg border-2 transition-all ${
                  badge.earned
                    ? 'bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200 dark:from-yellow-900/20 dark:to-orange-900/20 dark:border-yellow-800'
                    : 'bg-gray-50 border-gray-200 dark:bg-gray-800 dark:border-gray-700 opacity-60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="text-2xl">{badge.icon}</div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                      {badge.name}
                      {badge.earned && <Star className="h-4 w-4 text-yellow-500 inline ml-2 fill-current" />}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                      {badge.description}
                    </p>
                    {badge.requirement && !badge.earned && (
                      <div className="text-xs text-gray-500">
                        Progress: {badge.progress || 0} / {badge.requirement}
                      </div>
                    )}
                  </div>
                  <Badge 
                    variant={badge.earned ? "default" : "secondary"}
                    className={badge.earned ? "bg-green-600" : ""}
                  >
                    {badge.earned ? 'Earned' : 'In Progress'}
                  </Badge>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Gamification Level */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5" />
            Teacher Level
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">
                {profile.level || 1}
              </div>
              <div className="text-sm text-gray-500">Current Level</div>
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Progress to Next Level</span>
                <span className="text-sm text-gray-500">
                  {profile.totalPoints || 0} / {((profile.level || 1) + 1) * 100} points
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                  style={{ 
                    width: `${Math.min(100, ((profile.totalPoints || 0) % 100) / ((profile.level || 1) + 1))}%` 
                  }}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
