'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { SuiteKey } from '@/lib/pricing';

interface SuiteSwitcherProps {
  initialSuite?: SuiteKey;
}

export default function SuiteSwitcher({ initialSuite = 'teacher' }: SuiteSwitcherProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [suite, setSuite] = useState<SuiteKey>(initialSuite);
  const tablistRef = useRef<HTMLDivElement>(null);

  // Sync with URL on mount and URL changes
  useEffect(() => {
    const urlSuite = searchParams.get('suite') === 'close' ? 'close' : 'teacher';
    setSuite(urlSuite);
  }, [searchParams]);

  const selectSuite = (nextSuite: SuiteKey) => {
    if (nextSuite === suite) return;
    
    // Update URL
    const url = new URL(window.location.href);
    url.searchParams.set('suite', nextSuite);
    router.replace(url.toString(), { scroll: false });
    
    // Update state
    setSuite(nextSuite);
    
    // Analytics tracking
    if (typeof window !== 'undefined' && 'gtag' in window) {
      (window as any).gtag('event', 'pricing_suite_toggled', {
        suite: nextSuite,
        event_category: 'pricing'
      });
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent, targetSuite: SuiteKey) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      selectSuite(targetSuite);
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      const nextSuite = suite === 'teacher' ? 'close' : 'teacher';
      selectSuite(nextSuite);
    }
  };

  const Tab = ({ value, children }: { value: SuiteKey; children: React.ReactNode }) => (
    <button
      role="tab"
      aria-selected={suite === value}
      tabIndex={suite === value ? 0 : -1}
      className={`flex-1 rounded-full px-4 h-11 text-sm transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
        suite === value 
          ? 'bg-white/15 text-white ring-1 ring-white/20' 
          : 'text-white/70 hover:text-white hover:bg-white/5'
      }`}
      onClick={() => selectSuite(value)}
      onKeyDown={(e) => handleKeyDown(e, value)}
    >
      {children}
    </button>
  );

  return (
    <div className="mx-auto mb-6 max-w-md">
      {/* No-JS fallback links */}
      <noscript>
        <div className="flex gap-2 justify-center mb-4">
          <a 
            href="?suite=teacher" 
            className={`px-4 py-2 rounded-full text-sm border ${
              suite === 'teacher' ? 'bg-white/15 text-white border-white/20' : 'text-white/70 border-white/20'
            }`}
          >
            Teacher Suite
          </a>
          <a 
            href="?suite=close"
            className={`px-4 py-2 rounded-full text-sm border ${
              suite === 'close' ? 'bg-white/15 text-white border-white/20' : 'text-white/70 border-white/20'
            }`}
          >
            Close Suite
          </a>
        </div>
      </noscript>
      
      {/* Interactive tablist */}
      <div 
        ref={tablistRef}
        role="tablist" 
        aria-label="Choose suite" 
        className="flex w-full items-center rounded-full bg-white/6 ring-1 ring-white/12 p-1"
      >
        <Tab value="teacher">Teacher Suite</Tab>
        <Tab value="close">Close Suite</Tab>
      </div>
    </div>
  );
}