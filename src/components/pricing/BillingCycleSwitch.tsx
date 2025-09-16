'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { BillingCycle } from '@/lib/pricing';

interface BillingCycleSwitchProps {
  initialCycle?: BillingCycle;
}

export default function BillingCycleSwitch({ initialCycle = 'annual' }: BillingCycleSwitchProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const t = useTranslations('pricing');
  const [cycle, setCycle] = useState<BillingCycle>(initialCycle);

  // Sync with URL on mount and URL changes
  useEffect(() => {
    const urlCycle = searchParams.get('billing') === 'monthly' ? 'monthly' : 'annual';
    if (urlCycle !== cycle) {
      setCycle(urlCycle);
    }
  }, [searchParams, cycle]);

  const selectCycle = (nextCycle: BillingCycle) => {
    if (nextCycle === cycle) return;
    
    // Update URL
    const url = new URL(window.location.href);
    url.searchParams.set('billing', nextCycle);
    router.replace(url.toString(), { scroll: false });
    
    // Update state
    setCycle(nextCycle);
    
    // Analytics tracking
    if (typeof window !== 'undefined' && 'gtag' in window) {
      (window as any).gtag('event', 'pricing_billing_cycle_toggled', {
        billing_cycle: nextCycle,
        event_category: 'pricing'
      });
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent, targetCycle: BillingCycle) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      selectCycle(targetCycle);
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      const nextCycle = cycle === 'annual' ? 'monthly' : 'annual';
      selectCycle(nextCycle);
    }
  };

  const Tab = ({ value, children }: { value: BillingCycle; children: React.ReactNode }) => (
    <button
      role="tab"
      aria-selected={cycle === value}
      tabIndex={cycle === value ? 0 : -1}
      className={`flex-1 rounded-full px-3 h-9 text-xs font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
        cycle === value 
          ? 'bg-white/15 text-white ring-1 ring-white/20' 
          : 'text-white/70 hover:text-white hover:bg-white/5'
      }`}
      onClick={() => selectCycle(value)}
      onKeyDown={(e) => handleKeyDown(e, value)}
    >
      {children}
    </button>
  );

  return (
    <div className="mx-auto mb-4 max-w-xs">
      {/* No-JS fallback links */}
      <noscript>
        <div className="flex gap-2 justify-center mb-4">
          <a 
            href="?billing=annual" 
            className={`px-3 py-2 rounded-full text-xs border ${
              cycle === 'annual' ? 'bg-white/15 text-white border-white/20' : 'text-white/70 border-white/20'
            }`}
          >
            {t('billing.annual')}
          </a>
          <a 
            href="?billing=monthly"
            className={`px-3 py-2 rounded-full text-xs border ${
              cycle === 'monthly' ? 'bg-white/15 text-white border-white/20' : 'text-white/70 border-white/20'
            }`}
          >
            {t('billing.monthly')}
          </a>
        </div>
      </noscript>
      
      {/* Interactive tablist */}
      <div 
        role="tablist" 
        aria-label="Choose billing cycle" 
        className="flex w-full items-center rounded-full bg-white/6 ring-1 ring-white/12 p-1"
      >
        <Tab value="annual">
          {t('billing.annual')}
          {cycle === 'annual' && <span className="ml-1 text-green-400 text-xs">{t('billing.save_percent')}</span>}
        </Tab>
        <Tab value="monthly">{t('billing.monthly')}</Tab>
      </div>
    </div>
  );
}