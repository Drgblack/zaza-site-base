'use client';

import { useTranslations } from 'next-intl';

export default function RiskFree() {
  const t = useTranslations('pricing');

  return (
    <div className="rounded-xl border bg-muted/30 p-5">
      <h3 className="font-semibold mb-2">{t('risk_free.title')}</h3>
      <ul className="list-disc pl-5 text-sm space-y-1">
        <li>{t('risk_free.point1')}</li>
        <li>{t('risk_free.point2')}</li>
        <li>{t('risk_free.point3')}</li>
      </ul>
    </div>
  );
}