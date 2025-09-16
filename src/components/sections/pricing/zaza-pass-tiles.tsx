'use client';
import { useTranslations } from 'next-intl';
import { Sparkles, ClipboardList, BookOpen } from 'lucide-react';

export default function ZazaPassTiles() {
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
  );
}