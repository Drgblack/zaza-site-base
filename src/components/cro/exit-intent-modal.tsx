'use client';

import { useState, useEffect } from 'react';
import { X, Gift, Mail, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export function ExitIntentModal() {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    let mouseLeaveTimer: NodeJS.Timeout;

    const handleMouseLeave = (e: MouseEvent) => {
      // Only trigger if mouse leaves through the top of the page
      if (e.clientY <= 0 && !hasShown) {
        mouseLeaveTimer = setTimeout(() => {
          setIsVisible(true);
          setHasShown(true);
        }, 100);
      }
    };

    const handleMouseEnter = () => {
      if (mouseLeaveTimer) {
        clearTimeout(mouseLeaveTimer);
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      if (mouseLeaveTimer) clearTimeout(mouseLeaveTimer);
    };
  }, [hasShown]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    // Handle email submission (integrate with your email service)
    try {
      // Add your email capture logic here
      console.log('Exit intent email captured:', email);
      setIsVisible(false);
      
      // Show success message or redirect
      alert('Thanks! Check your email for your free teaching resources.');
    } catch (error) {
      console.error('Email capture failed:', error);
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <Card className="w-full max-w-md relative animate-scale-up">
        <button
          onClick={() => setIsVisible(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 z-10"
        >
          <X className="w-5 h-5" />
        </button>
        
        <CardHeader className="text-center pb-4">
          <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Gift className="w-6 h-6 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
            Wait! Don't Miss Out
          </CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-300">
            Get 5 FREE teaching resources that'll save you hours this week
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950/20 dark:to-blue-950/20 p-4 rounded-lg border border-green-200 dark:border-green-800/30">
            <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">
              🎁 Free Resources Include:
            </h4>
            <ul className="text-sm text-green-700 dark:text-green-300 space-y-1">
              <li>• Parent email templates (50+ ready-to-use)</li>
              <li>• Report card comment bank</li>
              <li>• Difficult conversation scripts</li>
              <li>• Time-saving checklists</li>
              <li>• Teacher wellness guide</li>
            </ul>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-2">
              <Mail className="w-4 h-4" />
              <span>Enter your email to get instant access:</span>
            </div>
            
            <Input
              type="email"
              placeholder="your.email@school.edu"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full"
              required
            />
            
            <Button 
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold"
            >
              <Gift className="w-4 h-4 mr-2" />
              Send Me The Free Resources
            </Button>
          </form>
          
          <div className="flex items-center justify-center gap-2 text-xs text-gray-500 dark:text-gray-400">
            <Clock className="w-3 h-3" />
            <span>Instant delivery • No spam • Unsubscribe anytime</span>
          </div>
          
          <div className="text-center">
            <button 
              onClick={() => setIsVisible(false)}
              className="text-sm text-gray-400 hover:text-gray-600 underline"
            >
              No thanks, I don't want to save time
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}