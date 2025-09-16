import { getTranslations } from 'next-intl/server';
import ZazaPassTiles from '@/components/sections/pricing/ZazaPassTiles';
import RiskFree from '@/components/sections/pricing/RiskFree';

type Props = { params: { locale: string } };

export default async function PricingPage({ params: { locale } }: Props) {
  const t = await getTranslations({ locale, namespace: 'pricing' });

  return (
    <main data-pricing-version="hard-reset-v3" className="container mx-auto max-w-5xl px-4 py-12">
      <header className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold">{t('headline')}</h1>
        <p className="mt-3 text-muted-foreground">{t('subhead')}</p>
      </header>

      <section className="mb-8">
        <div className="mx-auto max-w-2xl text-center mb-4">
          <div className="inline-flex items-center rounded-full border px-3 py-1 text-xs mb-2">
            {t('zaza_pass.badge_annual_best_value')}
          </div>
          <h2 className="text-2xl font-semibold">{t('zaza_pass.title')}</h2>
          <p className="text-muted-foreground">{t('zaza_pass.subtitle')}</p>
        </div>
        <ZazaPassTiles />
      </section>

      <section className="grid md:grid-cols-2 gap-6 mb-10">
        <article className="rounded-xl border p-6">
          <h3 className="text-xl font-semibold">Starter</h3>
          <p className="text-2xl font-bold mt-2">€99<span className="text-sm">/year</span></p>
          <ul className="mt-4 text-sm space-y-2">
            <li>✔ Comment Coach</li>
            <li>✔ Report Bank</li>
            <li>✔ Plan templates</li>
            <li>✔ Export to DOC/PDF</li>
            <li>✔ Classroom notes locker</li>
          </ul>
          <button className="btn btn-primary mt-5 w-full">{t('cta.choose_starter')}</button>
        </article>

        <article className="rounded-xl border p-6 ring-1 ring-orange-500/30">
          <div className="inline-flex items-center rounded-full border px-2 py-0.5 text-xs mb-2">
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
          <button className="btn btn-primary mt-5 w-full">{t('cta.choose_pro')}</button>
        </article>
      </section>

      <section className="mb-8">
        <RiskFree />
      </section>

      <section className="grid md:grid-cols-3 gap-3 text-center text-sm text-muted-foreground">
        <div>{t('badges.money_back')}</div>
        <div>{t('badges.stripe')}</div>
        <div>{t('badges.trusted')}</div>
      </section>
    </main>
  );
}