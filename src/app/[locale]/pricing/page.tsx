import { getTranslations } from 'next-intl/server';
import Hero from './_components/Hero';
import Benefits from './_components/Benefits';
import SuiteSwitcher from '@/components/pricing/SuiteSwitch';
import { SUITE_PRICING, getSuiteFromSearchParams, formatSuitePrice, type SuiteKey } from '@/lib/pricing';
import { Check } from 'lucide-react';

type Props = { 
  params: { locale: string };
  searchParams?: { suite?: string };
};

export default async function PricingPage({ params: { locale }, searchParams }: Props) {
  const t = await getTranslations({ locale, namespace: 'pricing' });
  const suiteKey = getSuiteFromSearchParams(searchParams);
  const suiteData = SUITE_PRICING[suiteKey];

  return (
    <main data-pricing-version="v3-pop-suites" className="pb-16 space-y-8">
      <Hero />
      <Benefits />

      {/* Plans section with suite switcher */}
      <section id="plans" className="mx-auto mt-6 max-w-5xl px-4">
        <SuiteSwitcher initialSuite={suiteKey} />
        <div className="grid gap-6 md:grid-cols-2">
          {/* Starter Plan */}
          <article className="rounded-xl ring-1 ring-white/10 p-6 bg-white/2 hover:ring-white/20 transition-colors">
            <h3 className="text-white font-semibold">{suiteKey === 'teacher' ? 'Starter' : 'Close Agent'}</h3>
            <p className="mt-2 text-2xl font-bold text-white">
              {formatSuitePrice(suiteData.plans.starter.priceYear)}<span className="text-sm">/year</span>
            </p>
            <ul className="mt-4 space-y-2 text-sm text-white/90">
              {suiteData.plans.starter.features.map((featureKey) => (
                <li key={featureKey} className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 text-white/70" />
                  <span>{t(featureKey)}</span>
                </li>
              ))}
            </ul>
            <a
              href={suiteData.plans.starter.ctaHref}
              className="mt-5 w-full inline-block text-center rounded-full border border-white/25 px-4 py-2 text-white hover:bg-white/10 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              onClick={() => {
                if (typeof window !== 'undefined' && 'gtag' in window) {
                  (window as any).gtag('event', 'pricing_cta_clicked', {
                    suite: suiteKey,
                    plan: 'starter',
                    event_category: 'pricing'
                  });
                }
              }}
            >
              {t(suiteData.plans.starter.ctaLabel)}
            </a>
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
                {t('plans.pro.best_value')}
              </span>
              <h3 className="text-white font-semibold">{suiteKey === 'teacher' ? 'Pro' : 'Close Suite'}</h3>
              <p className="mt-2 text-2xl font-bold text-white">
                {formatSuitePrice(suiteData.plans.pro.priceYear)}<span className="text-sm">/year</span>
              </p>
              <ul className="mt-4 space-y-2 text-sm text-white/95">
                {suiteData.plans.pro.features.map((featureKey) => (
                  <li key={featureKey} className="flex items-start gap-2">
                    <Check className="mt-0.5 h-4 w-4 text-[#10b981]" />
                    <span>{t(featureKey)}</span>
                  </li>
                ))}
              </ul>
              <a
                href={suiteData.plans.pro.ctaHref}
                className={`mt-5 w-full inline-block text-center rounded-full px-4 py-2 font-medium text-white transition-shadow focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
                  suiteKey === 'close'
                    ? 'bg-[linear-gradient(90deg,#6366f1,#8b5cf6,#6366f1)] [background-size:200%_100%] animate-gradient-x shadow-[0_10px_28px_rgba(99,102,241,.45)] hover:shadow-[0_14px_34px_rgba(99,102,241,.6)]'
                    : 'bg-[linear-gradient(90deg,#6d28d9,#d946ef,#06b6d4)] [background-size:200%_100%] animate-gradient-x shadow-[0_10px_28px_rgba(109,40,217,.45)] hover:shadow-[0_14px_34px_rgba(109,40,217,.6)]'
                }`}
                onClick={() => {
                  if (typeof window !== 'undefined' && 'gtag' in window) {
                    (window as any).gtag('event', 'pricing_cta_clicked', {
                      suite: suiteKey,
                      plan: 'pro',
                      event_category: 'pricing'
                    });
                  }
                }}
              >
                {t(suiteData.plans.pro.ctaLabel)}
              </a>
            </div>
          </article>
        </div>
      </section>

      {/* Risk-Free banner with green highlight */}
      <section className="mx-auto mt-8 max-w-5xl px-4">
        <div className="rounded-xl p-5 ring-1 ring-[#10b981]/25 bg-gradient-to-br from-[#10b981]/12 to-transparent">
          <h3 className="font-semibold text-white">{t('risk_free.title')}</h3>
          <ul className="mt-2 space-y-1 text-sm text-white/90">
            <li className="flex items-start gap-2">
              <Check className="mt-0.5 h-4 w-4 text-[#10b981]" />
              <span>{t('risk_free.point1')}</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="mt-0.5 h-4 w-4 text-[#10b981]" />
              <span>{t('risk_free.point2')}</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="mt-0.5 h-4 w-4 text-[#10b981]" />
              <span>{t('risk_free.point3')}</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Trust badges */}
      <div className="mx-auto mt-10 h-px max-w-5xl bg-gradient-to-r from-transparent via-white/15 to-transparent" />
      <section className="mx-auto max-w-5xl px-4 mt-4 grid grid-cols-1 md:grid-cols-3 gap-3 text-sm text-white/75 text-center md:text-left">
        <div>{t('badges.money_back')}</div>
        <div>{t('badges.stripe')}</div>
        <div>{t('badges.trusted')}</div>
      </section>
    </main>
  );
}