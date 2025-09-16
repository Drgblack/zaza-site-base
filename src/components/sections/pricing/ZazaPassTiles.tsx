'use client';
import {useTranslations} from 'next-intl';
import {Zap, ClipboardList, Users} from 'lucide-react';

export default function ZazaPassTiles() {
  const t = useTranslations('pricing');
  const tiles = [
    {icon: Zap, title: t('zaza_pass.tiles.minutes_to_quality'),
            desc:  t('zaza_pass.tiles.minutes_to_quality_desc')},
    {icon: ClipboardList, title: t('zaza_pass.tiles.plans_ready'),
            desc:  t('zaza_pass.tiles.plans_ready_desc')},
    {icon: Users, title: t('zaza_pass.tiles.remembers_classes'),
            desc:  t('zaza_pass.tiles.remembers_classes_desc')},
  ];
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {tiles.map(({icon: Icon, title, desc}, i) => (
        <article key={i} className="rounded-xl border bg-card p-5">
          <Icon className="mb-2 h-5 w-5 opacity-80" />
          <h4 className="font-semibold">{title}</h4>
          <p className="text-sm text-muted-foreground">{desc}</p>
        </article>
      ))}
    </div>
  );
}