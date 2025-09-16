'use client';
import { useTranslations } from 'next-intl';
import { Zap, ClipboardList, Users } from 'lucide-react';

function safe(t: (k: string) => string, key: string, fallback: string) {
  const v = t(key);
  return v === key ? fallback : v; // never display raw key
}

export default function ZazaPassTiles() {
  const t = useTranslations('pricing');

  const tiles = [
    {
      icon: Zap,
      title: safe(t, 'zaza_pass.tiles.minutes_to_quality', 'Minutes to quality comments'),
      desc:  safe(t, 'zaza_pass.tiles.minutes_to_quality_desc', 'Turn notes into professional, parent-ready comments in minutes.'),
    },
    {
      icon: ClipboardList,
      title: safe(t, 'zaza_pass.tiles.plans_ready', 'Plans ready to export'),
      desc:  safe(t, 'zaza_pass.tiles.plans_ready_desc', 'Export clean DOC/PDF in one click.'),
    },
    {
      icon: Users,
      title: safe(t, 'zaza_pass.tiles.remembers_classes', 'Remembers your classes'),
      desc:  safe(t, 'zaza_pass.tiles.remembers_classes_desc', 'Keep context across terms and subjects for faster writing.'),
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {tiles.map(({ icon: Icon, title, desc }, i) => (
        <article key={i} className="rounded-xl border bg-card p-5">
          <Icon className="mb-2 h-5 w-5 opacity-80" />
          <h4 className="font-semibold">{title}</h4>
          <p className="text-sm text-muted-foreground">{desc}</p>
        </article>
      ))}
    </div>
  );
}