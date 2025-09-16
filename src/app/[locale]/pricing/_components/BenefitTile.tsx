'use client';

import { LucideIcon } from 'lucide-react';

export default function BenefitTile({
  icon: Icon,
  title,
  desc,
  delay = 0,
  index = 0
}: {
  icon: LucideIcon;
  title: string;
  desc: string;
  delay?: number;
  index?: number;
}) {
  const tints = [
    'from-[#6d28d9]/12 to-transparent', // grape
    'from-[#06b6d4]/12 to-transparent', // cyan
    'from-[#f59e0b]/12 to-transparent', // amber
  ];
  const tint = tints[index] || tints[0];

  return (
    <article 
      className={`rounded-xl ring-1 ring-white/10 p-5 bg-gradient-to-br ${tint} hover:ring-white/25 hover:-translate-y-0.5 transition will-change-transform animate-fade-in`}
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-md bg-white/15">
        <Icon className="h-5 w-5 text-white" />
      </div>
      <h4 className="font-semibold text-white">{title}</h4>
      <p className="text-sm text-white/85">{desc}</p>
    </article>
  );
}