'use client';

import { useTranslations } from 'next-intl';
import BenefitTile from './BenefitTile';
import { Zap, ClipboardList, Users } from 'lucide-react';

export default function Benefits() {
  const t = useTranslations('pricing');

  const items = [
    {
      icon: Zap,
      title: t('zaza_pass.tiles.minutes_to_quality'),
      desc: t('zaza_pass.tiles.minutes_to_quality_desc')
    },
    {
      icon: ClipboardList,
      title: t('zaza_pass.tiles.plans_ready'),
      desc: t('zaza_pass.tiles.plans_ready_desc')
    },
    {
      icon: Users,
      title: t('zaza_pass.tiles.remembers_classes'),
      desc: t('zaza_pass.tiles.remembers_classes_desc')
    }
  ];

  return (
    <section className="mx-auto mt-6 max-w-5xl px-4">
      <div className="grid gap-4 md:grid-cols-3">
        {items.map((item, i) => (
          <BenefitTile
            key={i}
            icon={item.icon}
            title={item.title}
            desc={item.desc}
            delay={0.05 * i}
          />
        ))}
      </div>
    </section>
  );
}