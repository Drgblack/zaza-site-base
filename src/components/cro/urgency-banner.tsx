'use client';

import { useState, useEffect } from 'react';
import { X, Clock, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function UrgencyBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 47,
    seconds: 32
  });

  useEffect(() => {
    // Show banner after 10 seconds
    const showTimer = setTimeout(() => {
      setIsVisible(true);
    }, 10000);

    // Countdown timer
    const countdownInterval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          // Reset to new "deadline"
          return { hours: 23, minutes: 59, seconds: 59 };
        }
      });
    }, 1000);

    return () => {
      clearTimeout(showTimer);
      clearInterval(countdownInterval);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md px-4">
      <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-4 rounded-lg shadow-lg animate-slide-down">
        <button
          onClick={() => setIsVisible(false)}
          className="absolute top-2 right-2 text-white/80 hover:text-white"
        >
          <X className="w-4 h-4" />
        </button>
        
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2">
            <Clock className="w-4 h-4" />
            <span className="text-sm font-medium">Limited Time: Free Pro Trial</span>
          </div>
          
          <div className="text-lg font-bold">
            {String(timeLeft.hours).padStart(2, '0')}:
            {String(timeLeft.minutes).padStart(2, '0')}:
            {String(timeLeft.seconds).padStart(2, '0')}
          </div>
          
          <p className="text-xs opacity-90">
            Start your free Pro trial and save 5+ hours this week!
          </p>
          
          <Button 
            size="sm" 
            className="bg-white text-orange-600 hover:bg-gray-100 font-bold"
            asChild
          >
            <a href="/#snippet-tool">
              <Zap className="w-3 h-3 mr-1" />
              Start Now
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}