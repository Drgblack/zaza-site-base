'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Zap, X } from 'lucide-react';

export function StickyCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show sticky CTA after scrolling 50% of viewport height
      const scrolled = window.scrollY > window.innerHeight * 0.5;
      setIsVisible(scrolled && !isDismissed);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isDismissed]);

  const handleDismiss = () => {
    setIsDismissed(true);
    setIsVisible(false);
  };

  const handleClick = () => {
    // Smooth scroll to snippet tool
    const snippetTool = document.getElementById('snippet-tool');
    if (snippetTool) {
      snippetTool.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 md:left-auto md:right-4 md:w-80 animate-in slide-in-from-bottom-5 duration-300">
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-2xl shadow-2xl border border-white/20 backdrop-blur-sm">
        <div className="flex items-center justify-between p-4">
          <div className="flex-1">
            <div className="font-bold text-lg">Save 5+ Hours Weekly</div>
            <div className="text-sm text-purple-100">Try Promptly free - no signup needed</div>
          </div>
          <button
            onClick={handleDismiss}
            className="ml-4 p-1 hover:bg-white/20 rounded-full transition-colors"
            aria-label="Dismiss"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="px-4 pb-4">
          <Button 
            onClick={handleClick}
            className="w-full bg-white hover:bg-gray-100 text-purple-600 font-bold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
          >
            <Zap className="w-4 h-4 mr-2" />
            Try Free Demo Now
          </Button>
        </div>
      </div>
    </div>
  );
}