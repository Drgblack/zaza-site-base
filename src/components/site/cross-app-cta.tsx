'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCrossAppNavigation } from '@/contexts/unified-auth-context';
import { 
  ArrowRight, 
  Sparkles, 
  MessageCircle, 
  BookOpen,
  Zap,
  Users,
  Clock,
  Star
} from 'lucide-react';

interface CrossAppCTAProps {
  from: 'promptly' | 'teach';
  variant?: 'default' | 'compact' | 'banner';
}

export function CrossAppCTA({ from, variant = 'default' }: CrossAppCTAProps) {
  const { navigateToApp, getCrossAppLink, isAuthenticated } = useCrossAppNavigation();
  const isFromPromptly = from === 'promptly';
  
  const ctaData = {
    promptly: {
      title: "Ready for More? Try Zaza Teach",
      description: "Take your teaching to the next level with comprehensive lesson planning and classroom management tools.",
      targetApp: "Zaza Teach",
      targetAppKey: "teach" as const,
      icon: BookOpen,
      features: [
        "Complete lesson planning suite",
        "Classroom management tools", 
        "Student progress tracking",
        "Curriculum alignment"
      ],
      badge: "New Platform",
      badgeColor: "bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-300"
    },
    teach: {
      title: "Need Quick Comments? Use Promptly",
      description: "Generate professional parent communications and student feedback in seconds.",
      targetApp: "Zaza Promptly", 
      targetAppKey: "promptly" as const,
      icon: MessageCircle,
      features: [
        "Instant parent communications",
        "Professional student feedback",
        "Time-saving templates",
        "AI-powered suggestions"
      ],
      badge: "Time Saver",
      badgeColor: "bg-blue-100 text-blue-700 dark:bg-blue-800 dark:text-blue-300"
    }
  };

  const data = ctaData[from];
  const IconComponent = data.icon;

  if (variant === 'banner') {
    return (
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-lg">
              <IconComponent className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-semibold">{data.title}</h3>
              <p className="text-sm text-purple-100">{data.description}</p>
            </div>
          </div>
          <Button 
            onClick={() => navigateToApp(data.targetAppKey)}
            className="bg-white text-purple-600 hover:bg-purple-50"
          >
            Try {data.targetApp}
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <Card className="border-purple-200 dark:border-purple-800">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                <IconComponent className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100">{data.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{data.description}</p>
              </div>
            </div>
            <Button 
              onClick={() => navigateToApp(data.targetAppKey)}
              size="sm"
              className="bg-purple-600 hover:bg-purple-700"
            >
              Try Now
              <ArrowRight className="h-3 w-3 ml-1" />
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 border-purple-200 dark:border-purple-800">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg">
              <IconComponent className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <CardTitle className="text-purple-900 dark:text-purple-100">{data.title}</CardTitle>
              <CardDescription className="text-purple-700 dark:text-purple-300">
                {data.description}
              </CardDescription>
            </div>
          </div>
          <Badge className={data.badgeColor}>
            {data.badge}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          {data.features.map((feature, index) => (
            <div key={index} className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span className="text-sm text-purple-700 dark:text-purple-300">{feature}</span>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-purple-200 dark:border-purple-700">
          <div className="flex items-center gap-4 text-sm text-purple-600 dark:text-purple-400">
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span>10K+ Teachers</span>
            </div>
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4" />
              <span>4.9/5 Rating</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>Save 2hrs/week</span>
            </div>
          </div>
          <Button 
            onClick={() => navigateToApp(data.targetAppKey)}
            className="bg-purple-600 hover:bg-purple-700"
          >
            <Sparkles className="mr-2 h-4 w-4" />
            Try {data.targetApp}
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
