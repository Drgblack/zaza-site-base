'use client';

import { useTranslations } from 'next-intl';

export default function Hero() {
  const t = useTranslations('pricing');

  return (
    <section className="relative isolate overflow-hidden rounded-b-2xl bg-gradient-to-b from-[#2a2140] via-[#1e1736] to-[#0c0a18]">
      {/* floating blobs */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 -left-16 h-72 w-72 rounded-full bg-[#6d28d9]/25 blur-3xl animate-pulse-slow" />
        <div className="absolute top-16 -right-24 h-80 w-80 rounded-full bg-[#06b6d4]/20 blur-3xl animate-pulse-slower" />
      </div>
      <div className="relative mx-auto max-w-5xl px-4 pt-24 md:pt-28 pb-12 text-center">
        <a 
          href="#plans" 
          className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-white/85 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          {t('zaza_pass.badge_annual_best_value')}
        </a>

        <h1 className="mt-4 text-3xl md:text-4xl font-bold tracking-tight text-white max-w-3xl mx-auto">
          {t('headline')}
        </h1>

        {/* accent gradient rule */}
        <div className="mx-auto mt-3 h-[2px] w-24 rounded-full bg-gradient-to-r from-[#6d28d9] via-[#d946ef] to-[#06b6d4]" />

        <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-white/85">
          {t('zaza_pass.hero_desc')}
        </p>
      </div>
    </section>
  );
}