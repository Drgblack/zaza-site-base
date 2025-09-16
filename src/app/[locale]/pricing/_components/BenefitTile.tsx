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
  const tints = ['bg-[#8b5cf6]/12', 'bg-[#06b6d4]/12', 'bg-[#f59e0b]/12'];
  const tint = tints[index] || tints[0];

  return (
    <article 
      className={`rounded-xl ring-1 ring-white/10 p-5 ${tint} hover:ring-white/25 transition animate-fade-in`}
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="mb-2 inline-flex h-10 w-10 items-center justify-center rounded-md bg-white/15">
        <Icon className="h-5 w-5 text-white/95" />
      </div>
      <h4 className="font-semibold text-white">{title}</h4>
      <p className="text-sm text-white/80">{desc}</p>
    </article>
  );
}