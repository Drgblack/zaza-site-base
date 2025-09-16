import { getTranslations } from 'next-intl/server';
import Hero from './_components/Hero';
import Benefits from './_components/Benefits';
import { StarterButton, ProButton } from './_components/PlanButtons';
import { Check } from 'lucide-react';

type Props = { params: { locale: string } };

export default async function PricingPage({ params: { locale } }: Props) {
  const t = await getTranslations({ locale, namespace: 'pricing' });

  const starterFeatures = [
    'Comment Coach',
    'Report Bank', 
    'Plan templates',
    'Export to DOC/PDF',
    'Classroom notes locker'
  ];

  const proFeatures = [
    'All Starter features',
    'Full AI Rewriter/Planner',
    'Curriculum packs',
    'Batch exports',
    'Priority updates',
    'Shared templates'
  ];

  return (
    <main data-pricing-version="v3-pop-suites" className="pb-16 space-y-8">
      <Hero />
      <Benefits />

      {/* Plans grid with visual hierarchy */}
      <section id="plans" className="mx-auto mt-12 max-w-5xl grid gap-6 md:grid-cols-2 px-4">
        {/* Starter - Quiet/Secondary */}
        <article className="rounded-xl ring-1 ring-white/10 p-6 bg-white/2 hover:ring-white/20 transition-colors">
          <h3 className="text-white font-semibold">{t('plans.starter.title') || 'Starter'}</h3>
          <p className="mt-2 text-2xl font-bold text-white">€99<span className="text-sm">/year</span></p>
          <ul className="mt-4 space-y-2 text-sm text-white/90">
            {starterFeatures.map((feature) => (
              <li key={feature} className="flex items-start gap-2">
                <Check className="mt-0.5 h-4 w-4 text-white/70" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
          <StarterButton />
        </article>

        {/* Pro - Primary/Stand-out */}
        <article className="relative rounded-2xl p-6 ring-1 ring-white/18 bg-white/5 backdrop-blur">
          {/* halo */}
          <div aria-hidden className="pointer-events-none absolute -inset-px rounded-2xl blur-2xl bg-[conic-gradient(from_120deg,rgba(109,40,217,.28),rgba(217,70,239,.24),rgba(6,182,212,.22),transparent)]" />
          <div className="relative">
          <span className="absolute -top-3 left-4 rounded-full border border-white/20 bg-white/10 px-2 py-0.5 text-xs text-white/90">
            {t('plans.pro.best_value')}
          </span>
          <h3 className="text-white font-semibold">Pro</h3>
          <p className="mt-2 text-2xl font-bold text-white">€149<span className="text-sm">/year</span></p>
          <ul className="mt-4 space-y-2 text-sm text-white/95">
            {proFeatures.map((feature) => (
              <li key={feature} className="flex items-start gap-2">
                <Check className="mt-0.5 h-4 w-4 text-[#10b981]" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
          <ProButton />
          </div>
        </article>
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