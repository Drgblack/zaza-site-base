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
    'from-[#6d28d9]/18',
    'from-[#06b6d4]/18', 
    'from-[#f59e0b]/18',
  ];
  const tint = tints[index] || tints[0];

  return (
    <article 
      className={`relative rounded-xl p-5 ring-1 ring-white/12 bg-gradient-to-br ${tint} to-transparent hover:-translate-y-0.5 hover:ring-white/25 transition animate-fade-in`}
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="absolute inset-0 rounded-xl pointer-events-none [mask-image:linear-gradient(#000,transparent)] bg-gradient-to-b from-white/8 to-transparent" />
      <div className="relative mb-3 inline-flex h-10 w-10 items-center justify-center rounded-md bg-white/15">
        <Icon className="h-5 w-5 text-white" />
      </div>
      <h4 className="relative font-semibold text-white">{title}</h4>
      <p className={`relative text-sm ${index === 2 ? 'text-white/90' : 'text-white/85'}`}>{desc}</p>
    </article>
  );
}