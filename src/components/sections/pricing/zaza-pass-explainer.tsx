'use client';
import { useTranslations } from 'next-intl';
import ZazaPassTiles from './zaza-pass-tiles';

export default function ZazaPassExplainer() {
  const t = useTranslations('pricing');

  return (
    <div className="mt-6">
      <div className="inline-flex items-center gap-2 rounded-full border border-emerald-300/40 bg-emerald-50/70 text-emerald-700 px-3 py-1 text-xs font-semibold">
        {t('zaza_pass.badge_annual_best_value')}
      </div>

      <h2 className="mt-3 text-xl md:text-2xl font-semibold">
        {t('zaza_pass.title')}
      </h2>

      <p className="mt-2 text-slate-600 dark:text-slate-300 max-w-3xl">
        {t('zaza_pass.subtitle')}
      </p>

      <ZazaPassTiles />
    </div>
  );
}