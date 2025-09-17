import { getTranslations } from 'next-intl/server';
import Hero from './_components/Hero';
import Benefits from './_components/Benefits';
import SuiteSwitch from '@/components/pricing/SuiteSwitch';
import BillingCycleSwitch from '@/components/pricing/BillingCycleSwitch';
import PlanCTA from '@/components/pricing/PlanCTA';
import { SUITE_PRICING, getSuiteFromSearchParams, getBillingCycleFromSearchParams, formatSuitePrice, type SuiteKey, type BillingCycle } from '@/lib/pricing';
import { Check } from 'lucide-react';

type Props = { 
  params: { locale: string };
  searchParams?: { suite?: string; billing?: string };
};

// Safety helper to prevent raw keys from rendering
function BulletList({ items }: { items: string[] }) {
  const safe = (s: string) => (s?.includes('.') && s.startsWith('pricing') ? '' : s);
  return (
    <ul className="space-y-2">
      {items.map((s, i) => safe(s) && (
        <li key={i} className="flex items-start gap-2">
          <Check className="mt-0.5 h-4 w-4 text-white/70" />
          <span className="text-sm text-white/90">{safe(s)}</span>
        </li>
      ))}
    </ul>
  );
}

function BulletListPro({ items }: { items: string[] }) {
  const safe = (s: string) => (s?.includes('.') && s.startsWith('pricing') ? '' : s);
  return (
    <ul className="space-y-2">
      {items.map((s, i) => safe(s) && (
        <li key={i} className="flex items-start gap-2">
          <Check className="mt-0.5 h-4 w-4 text-[#10b981]" />
          <span className="text-sm text-white/95">{safe(s)}</span>
        </li>
      ))}
    </ul>
  );
}

function RiskFreeBullets({ items }: { items: string[] }) {
  const safe = (s: string) => (s?.includes('.') && s.startsWith('pricing') ? '' : s);
  return (
    <ul className="mt-2 space-y-1 text-sm text-white/90">
      {items.map((s, i) => safe(s) && (
        <li key={i} className="flex items-start gap-2">
          <Check className="mt-0.5 h-4 w-4 text-[#10b981]" />
          <span>{safe(s)}</span>
        </li>
      ))}
    </ul>
  );
}

export default async function PricingPage({ params: { locale }, searchParams }: Props) {
  const t = await getTranslations({ locale, namespace: 'pricing' });
  const suiteKey = getSuiteFromSearchParams(searchParams);
  const billingCycle = getBillingCycleFromSearchParams(searchParams);
  const suiteData = SUITE_PRICING[suiteKey][billingCycle];
  
  // Use the simple array-based approach from translations for Teacher Suite
  // For Close Suite, use hardcoded features since it's a different product
  const starterBullets = suiteKey === 'teacher' 
    ? t.raw('plans.starter.bullets') as string[]
    : ['Close Agent – AI assistant', 'Close Inbox – email manager', 'Browser tool', 'Unlimited follow-up sequences'];
    
  const proBullets = suiteKey === 'teacher'
    ? t.raw('plans.pro.bullets') as string[]
    : ['All Starter features', 'All email drafting', 'CRM integration', 'Advanced analytics', 'Priority support'];
    
  const riskFreePoints = t.raw('risk_free.points') as string[];

  return (
    <main data-pricing-version="v4-clean" className="pb-16 space-y-8">
      <Hero />
      <Benefits />

      {/* Plans section with suite switcher */}
      <section id="plans" className="mx-auto mt-6 max-w-5xl px-4">
        <SuiteSwitch initialSuite={suiteKey} />
        <BillingCycleSwitch initialCycle={billingCycle} />
        <div className="grid gap-6 md:grid-cols-2">
          {/* Starter Plan */}
          <article className="rounded-xl ring-1 ring-white/10 p-6 bg-white/2 hover:ring-white/20 transition-colors">
            <h3 className="text-white font-semibold">{suiteKey === 'teacher' ? t('plans.starter.label') : 'Close Agent'}</h3>
            <p className="mt-2 text-2xl font-bold text-white">
              {formatSuitePrice(suiteData.plans.starter.price, suiteData.plans.starter.priceSuffix)}
            </p>
            <div className="mt-4">
              <BulletList items={starterBullets} />
            </div>
            <div className="mt-6">
              <a 
                href={suiteData.plans.starter.ctaHref}
                className="block w-full rounded-lg bg-white/10 hover:bg-white/15 text-white font-semibold py-3 px-4 border border-white/20 transition-colors text-center"
              >
                {t('plans.starter.cta')}
              </a>
            </div>
          </article>

          {/* Pro Plan */}
          <article className={`relative rounded-2xl p-6 ring-1 bg-white/5 backdrop-blur transition ${
            suiteKey === 'close' 
              ? 'ring-indigo-500/20 hover:ring-indigo-400/30'
              : 'ring-white/18 hover:ring-white/30'
          }`}>
            <div aria-hidden className={`pointer-events-none absolute -inset-px rounded-2xl blur-2xl ${
              suiteKey === 'close'
                ? 'bg-[conic-gradient(from_120deg,rgba(99,102,241,.28),rgba(139,92,246,.24),rgba(99,102,241,.22),transparent)]'
                : 'bg-[conic-gradient(from_120deg,rgba(109,40,217,.28),rgba(217,70,239,.24),rgba(6,182,212,.22),transparent)]'
            }`} />
            <div className="relative">
              <span className="absolute -top-3 left-4 rounded-full border border-white/20 bg-white/10 px-2 py-0.5 text-xs text-white/90">
                {t('plans.pro.badge')}
              </span>
              <h3 className="text-white font-semibold">{suiteKey === 'teacher' ? t('plans.pro.label') : 'Close Suite'}</h3>
              <p className="mt-2 text-2xl font-bold text-white">
                {formatSuitePrice(suiteData.plans.pro.price, suiteData.plans.pro.priceSuffix)}
              </p>
              <div className="mt-4">
                <BulletListPro items={proBullets} />
              </div>
              <div className="mt-6">
                <a 
                  href={suiteData.plans.pro.ctaHref}
                  className="block w-full rounded-lg bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-semibold py-3 px-4 transition-all shadow-lg text-center"
                >
                  {t('plans.pro.cta')}
                </a>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* Risk-Free banner with green highlight */}
      <section className="mx-auto mt-8 max-w-5xl px-4">
        <div className="rounded-xl p-5 ring-1 ring-[#10b981]/25 bg-gradient-to-br from-[#10b981]/12 to-transparent">
          <h3 className="font-semibold text-white">{t('risk_free.title')}</h3>
          <RiskFreeBullets items={riskFreePoints} />
        </div>
      </section>

      {/* Trust badges */}
      <div className="mx-auto mt-10 h-px max-w-5xl bg-gradient-to-r from-transparent via-white/15 to-transparent" />
      <section className="mx-auto max-w-5xl px-4 mt-4 grid grid-cols-1 md:grid-cols-3 gap-3 text-sm text-white/75 text-center md:text-left">
        <div>{t('footnotes.g1')}</div>
        <div>{t('footnotes.g2')}</div>
        <div>{t('footnotes.g3')}</div>
      </section>
    </main>
  );
}