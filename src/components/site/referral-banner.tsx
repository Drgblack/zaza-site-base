'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Gift, Share2, Users, Star } from 'lucide-react';

interface ReferralBannerProps {
  className?: string;
}

export function ReferralBanner({ className = "" }: ReferralBannerProps) {
  const [referralCode, setReferralCode] = useState<string>('');
  const [shareCount, setShareCount] = useState(0);
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Generate or retrieve referral code
    let code = localStorage.getItem('zaza-referral-code');
    if (!code) {
      code = 'TEACH' + Math.random().toString(36).substring(2, 8).toUpperCase();
      localStorage.setItem('zaza-referral-code', code);
    }
    setReferralCode(code);

    // Get share count
    const shares = parseInt(localStorage.getItem('zaza-shares') || '0');
    setShareCount(shares);

    // Show banner logic (after user has been active)
    const hasInteracted = localStorage.getItem('zaza-interactions');
    const bannerDismissed = localStorage.getItem('zaza-referral-dismissed');
    
    if (hasInteracted && !bannerDismissed) {
      setTimeout(() => setShowBanner(true), 2000);
    }
  }, []);

  const handleShare = () => {
    const referralUrl = `${window.location.origin}?ref=${referralCode}`;
    const text = "I've been using Zaza Promptly to save hours on parent communication - check it out!";
    
    if (navigator.share) {
      navigator.share({
        title: 'Zaza Promptly - AI for Teachers',
        text,
        url: referralUrl,
      });
    } else {
      navigator.clipboard.writeText(referralUrl);
    }
    
    // Track share
    localStorage.setItem('zaza-shares', String(shareCount + 1));
    setShareCount(shareCount + 1);
  };

  const handleDismiss = () => {
    localStorage.setItem('zaza-referral-dismissed', 'true');
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <Card className={`fixed bottom-4 right-4 w-80 shadow-lg border-purple-200 z-50 ${className}`}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <Gift className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-sm">Share & Earn</h3>
              <Badge variant="secondary" className="text-xs">
                {shareCount} shares
              </Badge>
            </div>
          </div>
          <button 
            onClick={handleDismiss}
            className="text-gray-400 hover:text-gray-600 text-sm"
          >
            ×
          </button>
        </div>
        
        <p className="text-sm text-gray-600 mb-3">
          Share Zaza Promptly with fellow teachers and help them save time too!
        </p>
        
        <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
          <Users className="w-3 h-3" />
          <span>Your code: {referralCode}</span>
        </div>
        
        <div className="flex gap-2">
          <Button onClick={handleShare} size="sm" className="flex-1">
            <Share2 className="w-3 h-3 mr-1" />
            Share Now
          </Button>
          <Button onClick={handleDismiss} variant="outline" size="sm">
            Later
          </Button>
        </div>
        
        {shareCount >= 3 && (
          <div className="mt-2 p-2 bg-yellow-50 rounded border border-yellow-200">
            <div className="flex items-center gap-1 text-xs text-yellow-700">
              <Star className="w-3 h-3" />
              <span>Awesome! You're helping build our teacher community!</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
