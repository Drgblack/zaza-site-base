'use client';
import { useTranslations } from 'next-intl';
import { Zap, ClipboardList, Users } from 'lucide-react';

export default function ZazaPassTiles() {
  const t = useTranslations('pricing');

  const tiles = [
    {
      icon: Zap,
      title: t('zaza_pass.tiles.minutes_to_quality'),
      desc:  t('zaza_pass.tiles.minutes_to_quality_desc'),
    },
    {
      icon: ClipboardList,
      title: t('zaza_pass.tiles.plans_ready'),
      desc:  t('zaza_pass.tiles.plans_ready_desc'),
    },
    {
      icon: Users,
      title: t('zaza_pass.tiles.remembers_classes'),
      desc:  t('zaza_pass.tiles.remembers_classes_desc'),
    },
  ];

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {tiles.map((tile, i) => (
        <div key={i} className="flex flex-col items-center gap-3 p-4 bg-white/80 dark:bg-gray-800/80 rounded-xl border border-orange-200 dark:border-orange-700">
          <div className="w-6 h-6 bg-gradient-to-br from-orange-400 to-amber-500 rounded-full flex items-center justify-center">
            <tile.icon className="h-4 w-4 text-white" />
          </div>
          <div className="text-center">
            <div className="text-gray-800 dark:text-gray-200 font-medium">{tile.title}</div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{tile.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
}