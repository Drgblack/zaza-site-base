import { getTranslations } from 'next-intl/server';
import Hero from './_components/Hero';
import Benefits from './_components/Benefits';
import RiskFree from '@/components/sections/pricing/RiskFree';

type Props = { params: { locale: string } };

export default async function PricingPage({ params: { locale } }: Props) {
  const t = await getTranslations({ locale, namespace: 'pricing' });

  return (
    <main className="pb-16">
      <Hero />
      <Benefits />

      {/* Plans grid with improved styling */}
      <section className="mx-auto mt-10 max-w-5xl grid gap-6 md:grid-cols-2 px-4">
        <article className="rounded-xl border bg-white ring-1 ring-white/10 hover:ring-white/20 transition p-6">
          <h3 className="text-xl font-semibold">Starter</h3>
          <p className="text-2xl font-bold mt-2">€99<span className="text-sm">/year</span></p>
          <ul className="mt-4 text-sm space-y-2">
            <li>✔ Comment Coach</li>
            <li>✔ Report Bank</li>
            <li>✔ Plan templates</li>
            <li>✔ Export to DOC/PDF</li>
            <li>✔ Classroom notes locker</li>
          </ul>
          <button className="bg-white text-[#1c1530] hover:bg-white/90 transition font-semibold rounded-lg px-4 py-2 mt-5 w-full">
            {t('cta.choose_starter')}
          </button>
        </article>

        <article className="rounded-xl border bg-white ring-1 ring-orange-500/30 hover:ring-orange-500/40 transition p-6">
          <div className="inline-flex items-center rounded-full border px-2 py-0.5 text-xs mb-2 bg-orange-100 text-orange-800">
            {t('plans.pro.best_value')}
          </div>
          <h3 className="text-xl font-semibold">Pro</h3>
          <p className="text-2xl font-bold mt-2">€149<span className="text-sm">/year</span></p>
          <ul className="mt-4 text-sm space-y-2">
            <li>✔ All Starter features</li>
            <li>✔ Full AI Rewriter/Planner</li>
            <li>✔ Curriculum packs</li>
            <li>✔ Batch exports</li>
            <li>✔ Priority updates</li>
            <li>✔ Shared templates</li>
          </ul>
          <button className="bg-[#2a2140] text-white hover:bg-[#2a2140]/90 transition font-semibold rounded-lg px-4 py-2 mt-5 w-full">
            {t('cta.choose_pro')}
          </button>
        </article>
      </section>

      {/* Risk free section */}
      <section className="mx-auto mt-10 max-w-5xl px-4">
        <RiskFree />
      </section>

      {/* Trust badges */}
      <section className="mx-auto mt-8 max-w-5xl px-4">
        <div className="grid md:grid-cols-3 gap-3 text-center text-sm text-muted-foreground">
          <div>{t('badges.money_back')}</div>
          <div>{t('badges.stripe')}</div>
          <div>{t('badges.trusted')}</div>
        </div>
      </section>
    </main>
  );
}