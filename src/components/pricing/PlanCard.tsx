'use client';

import { Check } from 'lucide-react';
import { Plan, SuiteKey } from '@/lib/pricingConfig';
import { useTranslations } from 'next-intl';

interface PlanCardProps {
  plan: Plan;
  suiteKey: SuiteKey;
}

export default function PlanCard({ plan, suiteKey }: PlanCardProps) {
  const t = useTranslations('pricing');
  const isPro = plan.best;

  const handleCTAClick = () => {
    // Analytics tracking
    if (typeof window?.gtag === 'function') {
      window.gtag('event', 'pricing_cta_click', {
        suite: suiteKey,
        plan_id: plan.id,
        event_category: 'pricing'
      });
    }
    // Navigate to signup - would be implemented based on your routing
    console.log(`Navigate to signup for ${suiteKey} ${plan.id}`);
  };

  if (isPro) {
    return (
      <article className="relative rounded-2xl p-6 ring-1 ring-white/18 bg-white/5 backdrop-blur">
        <div aria-hidden className="pointer-events-none absolute -inset-px rounded-2xl blur-2xl bg-[conic-gradient(from_120deg,rgba(109,40,217,.28),rgba(217,70,239,.24),rgba(6,182,212,.22),transparent)]" />
        <div className="relative">
          {plan.best && (
            <span className="absolute -top-3 left-4 rounded-full border border-white/20 bg-white/10 px-2 py-0.5 text-xs text-white/90">
              {t('plans.pro.best_value')}
            </span>
          )}
          <h3 className="text-white font-semibold">{plan.name}</h3>
          <p className="mt-2 text-2xl font-bold text-white">
            {plan.price}<span className="text-sm">{plan.cadence}</span>
          </p>
          <ul className="mt-4 space-y-2 text-sm text-white/95">
            {plan.features.map((feature) => (
              <li key={feature} className="flex items-start gap-2">
                <Check className="mt-0.5 h-4 w-4 text-[#10b981]" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
          <button 
            onClick={handleCTAClick}
            className="mt-5 w-full rounded-full px-4 py-2 font-medium text-white bg-[linear-gradient(90deg,#6d28d9,#d946ef,#06b6d4)] [background-size:200%_100%] animate-gradient-x shadow-[0_10px_28px_rgba(109,40,217,.45)] hover:shadow-[0_14px_34px_rgba(109,40,217,.6)] transition-shadow focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            {plan.id.includes('pro') ? t('cta.choose_pro') : t('cta.choose_starter')}
          </button>
        </div>
      </article>
    );
  }

  // Starter card
  return (
    <article className="rounded-xl ring-1 ring-white/10 p-6 bg-white/2 hover:ring-white/20 transition-colors">
      <h3 className="text-white font-semibold">{plan.name}</h3>
      <p className="mt-2 text-2xl font-bold text-white">
        {plan.price}<span className="text-sm">{plan.cadence}</span>
      </p>
      <ul className="mt-4 space-y-2 text-sm text-white/90">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2">
            <Check className="mt-0.5 h-4 w-4 text-white/70" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <button 
        onClick={handleCTAClick}
        className="mt-5 w-full rounded-full border border-white/25 px-4 py-2 text-white hover:bg-white/10 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      >
        {plan.id.includes('pro') ? t('cta.choose_pro') : t('cta.choose_starter')}
      </button>
    </article>
  );
}