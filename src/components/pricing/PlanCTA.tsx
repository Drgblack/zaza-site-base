'use client';

import { SuiteKey, BillingCycle } from '@/lib/pricing';
import { useTranslations } from 'next-intl';

interface PlanCTAProps {
  href: string;
  labelKey: string;
  suiteKey: SuiteKey;
  billingCycle: BillingCycle;
  planType: 'starter' | 'pro';
  variant?: 'starter' | 'pro';
}

export default function PlanCTA({ href, labelKey, suiteKey, billingCycle, planType, variant = 'starter' }: PlanCTAProps) {
  const t = useTranslations('pricing');

  const handleClick = () => {
    if (typeof window !== 'undefined' && 'gtag' in window) {
      (window as any).gtag('event', 'pricing_cta_clicked', {
        suite: suiteKey,
        billing_cycle: billingCycle,
        plan: planType,
        event_category: 'pricing'
      });
    }
  };

  if (variant === 'pro') {
    return (
      <a
        href={href}
        onClick={handleClick}
        className={`mt-5 w-full inline-block text-center rounded-full px-4 py-2 font-medium text-white transition-shadow focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
          suiteKey === 'close'
            ? 'bg-[linear-gradient(90deg,#6366f1,#8b5cf6,#6366f1)] [background-size:200%_100%] animate-gradient-x shadow-[0_10px_28px_rgba(99,102,241,.45)] hover:shadow-[0_14px_34px_rgba(99,102,241,.6)]'
            : 'bg-[linear-gradient(90deg,#6d28d9,#d946ef,#06b6d4)] [background-size:200%_100%] animate-gradient-x shadow-[0_10px_28px_rgba(109,40,217,.45)] hover:shadow-[0_14px_34px_rgba(109,40,217,.6)]'
        }`}
      >
        {t(labelKey)}
      </a>
    );
  }

  return (
    <a
      href={href}
      onClick={handleClick}
      className="mt-5 w-full inline-block text-center rounded-full border border-white/25 px-4 py-2 text-white hover:bg-white/10 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
    >
      {t(labelKey)}
    </a>
  );
}