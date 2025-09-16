'use client';

import { useTranslations } from 'next-intl';

export default function Hero() {
  const t = useTranslations('pricing');

  return (
    <section className="relative isolate -mt-2 overflow-hidden rounded-b-2xl bg-gradient-to-b from-[#2a2140] via-[#1f1a33] to-transparent">
      <div className="mx-auto max-w-5xl px-4 pt-16 pb-10 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-white/80 animate-fade-in">
          {t('zaza_pass.hero_badge')}
        </div>

        <h1 className="mt-4 text-3xl font-bold tracking-tight text-white md:text-4xl animate-fade-in" style={{ animationDelay: '0.1s' }}>
          {t('headline')}
        </h1>

        <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-white/80 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          {t('zaza_pass.hero_desc')}
        </p>
      </div>
    </section>
  );
}