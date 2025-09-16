'use client';

import { useTranslations } from 'next-intl';
import { Sparkles, ClipboardList, BookOpen } from 'lucide-react';

export default function PricingExplainerZazaPass() {
  const t = useTranslations('pricing');

  const tiles = [
    {
      icon: <Sparkles className="h-5 w-5" />,
      title: t('zaza_pass.tiles.minutes_to_quality'),
      desc: t('zaza_pass.tiles.minutes_to_quality_desc'),
    },
    {
      icon: <ClipboardList className="h-5 w-5" />,
      title: t('zaza_pass.tiles.plans_ready'),
      desc: t('zaza_pass.tiles.plans_ready_desc'),
    },
    {
      icon: <BookOpen className="h-5 w-5" />,
      title: t('zaza_pass.tiles.remembers_classes'),
      desc: t('zaza_pass.tiles.remembers_classes_desc'),
    },
  ];

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

      <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-4">
        {tiles.map((tile, i) => (
          <div
            key={i}
            className="rounded-xl border border-slate-200/60 dark:border-slate-700/50 p-4 bg-white/70 dark:bg-slate-900/50"
          >
            <div className="flex items-center gap-2 font-semibold">
              <span className="text-slate-700 dark:text-slate-200">{tile.icon}</span>
              <span>{tile.title}</span>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              {tile.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}