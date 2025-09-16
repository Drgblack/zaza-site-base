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
    <main className="pb-16 space-y-8">
      <Hero />
      <Benefits />

      {/* Plans grid with visual hierarchy */}
      <section id="plans" className="mx-auto mt-12 max-w-5xl grid gap-6 md:grid-cols-2 px-4">
        {/* Starter - Quiet/Secondary */}
        <article className="rounded-xl ring-1 ring-white/10 p-6 bg-white/2 hover:ring-white/20 transition">
          <h3 className="text-xl font-semibold text-white">Starter</h3>
          <p className="text-2xl font-bold mt-2 text-white">€99<span className="text-sm">/year</span></p>
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
        <article className="relative rounded-xl p-6 ring-1 ring-white/10 bg-white/5 shadow-[0_0_0_1px_rgba(255,255,255,0.06)] hover:ring-white/20 transition">
          <span className="absolute -top-3 left-4 rounded-full border border-white/15 bg-white/10 px-2 py-0.5 text-xs text-white/85">
            {t('plans.pro.best_value')}
          </span>
          <h3 className="text-xl font-semibold text-white">Pro</h3>
          <p className="text-2xl font-bold mt-2 text-white">€149<span className="text-sm">/year</span></p>
          <ul className="mt-4 space-y-2 text-sm text-white/90">
            {proFeatures.map((feature) => (
              <li key={feature} className="flex items-start gap-2">
                <Check className="mt-0.5 h-4 w-4 text-white/70" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
          <ProButton />
        </article>
      </section>

      {/* Risk-Free banner with green highlight */}
      <section className="mx-auto mt-8 max-w-5xl px-4">
        <div className="rounded-xl bg-[#10b981]/10 ring-1 ring-[#10b981]/20 p-5">
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
      <section className="mx-auto mt-8 max-w-5xl px-4">
        <div className="grid md:grid-cols-3 gap-3 text-center text-sm text-white/70">
          <div>{t('badges.money_back')}</div>
          <div>{t('badges.stripe')}</div>
          <div>{t('badges.trusted')}</div>
        </div>
      </section>
    </main>
  );
}