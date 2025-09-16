'use client';

import { useTranslations } from 'next-intl';
import { ShieldCheck } from 'lucide-react';

export default function RiskFreeBand() {
  const t = useTranslations('pricing');
  
  // Guard against bad keys during development
  const tt = (key: string) => {
    const v = t(key as any);
    if (!v || v.includes('pricing.') || v.includes('pricing_')) {
      throw new Error(`Pricing i18n misuse: key="${key}" value="${v}"`);
    }
    return v;
  };

  return (
    <section className="mt-10 rounded-2xl border border-slate-200/60 dark:border-slate-700/50 bg-white/70 dark:bg-slate-900/40 p-6">
      <div className="flex items-start gap-3">
        <ShieldCheck className="h-6 w-6 text-emerald-600 mt-0.5" />
        <div>
          <h3 className="text-lg font-semibold">{tt('risk_free.title')}</h3>
          <ul className="mt-2 text-slate-600 dark:text-slate-300 text-sm list-disc pl-5 space-y-1">
            <li>{tt('risk_free.point1')}</li>
            <li>{tt('risk_free.point2')}</li>
            <li>{tt('risk_free.point3')}</li>
          </ul>
        </div>
      </div>
    </section>
  );
}