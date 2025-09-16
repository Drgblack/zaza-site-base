'use client';

import { LucideIcon } from 'lucide-react';

export default function BenefitTile({
  icon: Icon,
  title,
  desc,
  delay = 0
}: {
  icon: LucideIcon;
  title: string;
  desc: string;
  delay?: number;
}) {
  return (
    <article 
      className="rounded-xl bg-white/3 ring-1 ring-white/10 p-5 hover:ring-white/20 transition animate-fade-in"
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="mb-2 inline-flex items-center justify-center rounded-md bg-white/10 p-2">
        <Icon className="h-5 w-5 text-white/90" />
      </div>
      <h4 className="font-semibold text-white">{title}</h4>
      <p className="mt-1 text-sm text-white/80">{desc}</p>
    </article>
  );
}