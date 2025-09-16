import { getTranslations } from 'next-intl/server';
import Hero from './_components/Hero';
import Benefits from './_components/Benefits';
import SuiteSwitch from '@/components/pricing/SuiteSwitch';
import PlanCard from '@/components/pricing/PlanCard';
import { suites, SuiteKey } from '@/lib/pricingConfig';
import { Check } from 'lucide-react';

type Props = { 
  params: { locale: string };
  searchParams?: { suite?: string };
};

export default async function PricingPage({ params: { locale }, searchParams }: Props) {
  const t = await getTranslations({ locale, namespace: 'pricing' });
  const suiteKey: SuiteKey = (searchParams?.suite === 'close') ? 'close' : 'teacher';
  const suite = suites[suiteKey];

  return (
    <main data-pricing-version="v3-pop-suites" className="pb-16 space-y-8">
      <Hero />
      <Benefits />

      {/* Plans section with suite switcher */}
      <section id="plans" className="mx-auto mt-6 max-w-5xl px-4">
        <SuiteSwitch />
        <div className="grid gap-6 md:grid-cols-2">
          {suite.plans.map(plan => (
            <PlanCard key={plan.id} plan={plan} suiteKey={suiteKey} />
          ))}
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