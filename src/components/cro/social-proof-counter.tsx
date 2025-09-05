'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Users, Clock, MessageCircle } from 'lucide-react';

export function SocialProofCounter() {
  const [teachersCount, setTeachersCount] = useState(12000);
  const [messagesCount, setMessagesCount] = useState(847236);
  const [timesSaved, setTimesSaved] = useState(4521);

  useEffect(() => {
    // Simulate live counter updates
    const interval = setInterval(() => {
      if (Math.random() > 0.7) { // 30% chance to update
        setTeachersCount(prev => prev + Math.floor(Math.random() * 3));
        setMessagesCount(prev => prev + Math.floor(Math.random() * 10));
        setTimesSaved(prev => prev + Math.floor(Math.random() * 2));
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed bottom-4 left-4 z-40 hidden lg:block">
      <Card className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-green-200 dark:border-green-700/50 shadow-lg">
        <CardContent className="p-4">
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="font-semibold">Live Stats</span>
            </div>
            
            <div className="space-y-1 text-xs">
              <div className="flex items-center gap-2">
                <Users className="w-3 h-3 text-gray-600" />
                <span className="text-gray-700 dark:text-gray-300">
                  <span className="font-bold text-green-600">{teachersCount.toLocaleString()}</span> teachers
                </span>
              </div>
              
              <div className="flex items-center gap-2">
                <MessageCircle className="w-3 h-3 text-gray-600" />
                <span className="text-gray-700 dark:text-gray-300">
                  <span className="font-bold text-blue-600">{messagesCount.toLocaleString()}</span> messages created
                </span>
              </div>
              
              <div className="flex items-center gap-2">
                <Clock className="w-3 h-3 text-gray-600" />
                <span className="text-gray-700 dark:text-gray-300">
                  <span className="font-bold text-purple-600">{timesSaved.toLocaleString()}</span> hours saved
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}