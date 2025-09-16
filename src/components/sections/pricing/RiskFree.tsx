'use client';
import { useTranslations } from 'next-intl';

function safe(t: (k: string) => string, key: string, fallback: string) {
  const v = t(key);
  return v === key ? fallback : v; // never display raw key
}

export default function RiskFree() {
  const t = useTranslations('pricing');

  return (
    <div className="rounded-xl border bg-muted/30 p-5">
      <h3 className="font-semibold mb-2">{safe(t, 'risk_free.title', 'Risk-Free 30-Day Trial')}</h3>
      <ul className="list-disc pl-5 text-sm space-y-1">
        <li>{safe(t, 'risk_free.point1', 'Full refund within 30 days')}</li>
        <li>{safe(t, 'risk_free.point2', 'Cancel anytime — no questions asked')}</li>
        <li>{safe(t, 'risk_free.point3', 'No student data stored')}</li>
      </ul>
    </div>
  );
}