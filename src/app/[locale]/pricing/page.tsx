import { setRequestLocale, getTranslations } from 'next-intl/server';
import { PRICING } from '@/lib/pricing';
import { generatePageMetadata } from '@/lib/seo/metadata';
import { softwareApplicationSchema, organizationSchema } from '@/components/seo/structured-data-schemas';
import type { Metadata } from 'next';

type Props = {
  params: Promise<{locale: string}>;
};

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {locale} = await params;
  return generatePageMetadata('pricing', locale as 'en' | 'de' | 'fr' | 'es' | 'it');
}

export default async function PricingPage({params}: Props) {
  const {locale} = await params;
  setRequestLocale(locale);
  const t = await getTranslations('pricing');

  // Default to annual
  const annual = PRICING.annual;
  const starter = annual.starter;
  const pro = annual.pro;

  return (
    <>
      <div className="px-4">
        {/* Hero */}
        <section className="max-w-5xl mx-auto text-center pt-14">
          <h1 className="text-4xl md:text-5xl font-bold">{t('headline')}</h1>
          <p className="mt-3 text-slate-400">{t('subhead')}</p>
          <p className="mt-2 text-xs text-slate-500">
            {t('trust_badge_guarantee')} · {t('trust_badge_secure')} · {t('trust_badge_trusted')}
          </p>
        </section>

        {/* Zaza Pass explainer */}
        <section className="max-w-4xl mx-auto mt-12 text-center">
          <span className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1 rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/30">
            {t('zaza_pass_badge')}
          </span>
          <h2 className="mt-4 text-2xl md:text-3xl font-bold">{t('zaza_pass_explainer_title')}</h2>
          <p className="mt-2 text-slate-400">{t('zaza_pass_explainer_tag')}</p>
        </section>

        {/* Cards – Annual only (toggle to Monthly lives on full pricing if you later enable it) */}
        <section className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6 mt-10">
          {/* Starter */}
          <PricingCard
            title={t('card_starter')}
            price={`€${starter.price}`}
            suffix="/year"
            bullets={starter.bullets}
            ctaLabel={t('cta_choose_starter')}
            ctaHref={starter.stripeCheckoutUrl}
          />

          {/* Pro */}
          <PricingCard
            title={t('card_pro')}
            price={`€${pro.price}`}
            suffix="/year"
            bullets={pro.bullets}
            ctaLabel={t('cta_choose_pro')}
            ctaHref={pro.stripeCheckoutUrl}
            badge={t('badge_best_value')}
            featured
          />
        </section>

        <p className="text-center text-sm text-slate-400 mt-3">{t('saves_line')}</p>

        {/* App stores row */}
        <section className="max-w-3xl mx-auto mt-10 text-center">
          <span className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1 rounded-full bg-slate-100/5 text-slate-300 border border-slate-100/10">
            {t('cta_use_on_the_go')}
          </span>
          <div className="mt-4 flex items-center justify-center gap-3">
            <a href="https://apps.apple.com/app/promptly-teacher-assistant/id6738104361" target="_blank" rel="noopener noreferrer" aria-label="Download on the App Store">
              <img src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg" alt="Download on the App Store" className="h-12 w-auto" />
            </a>
            <a href="https://play.google.com/store/apps/details?id=com.promptly.teacher" target="_blank" rel="noopener noreferrer" aria-label="Get it on Google Play">
              <img src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png" alt="Get it on Google Play" className="h-12 w-auto" />
            </a>
          </div>
        </section>

        {/* Trust & risk-free */}
        <section className="max-w-5xl mx-auto mt-14 text-center">
          <h3 className="text-xl font-semibold">{t('risk_free_title')}</h3>
          <p className="mt-2 text-slate-400">{t('risk_free_copy')}</p>
        </section>

        {/* Data row */}
        <p className="max-w-3xl mx-auto mt-12 text-center text-slate-500 text-sm">{t('data_row')}</p>
      </div>
      
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(softwareApplicationSchema),
        }}
      />
    </>
  );
}

function PricingCard({
  title, price, suffix, bullets, ctaLabel, ctaHref, badge, featured=false
}:{
  title:string; price:string; suffix:string; bullets:string[];
  ctaLabel:string; ctaHref:string; badge?:string; featured?:boolean;
}) {
  return (
    <div className={`rounded-2xl border p-6 bg-slate-900/40 ${featured ? 'border-orange-400/40 shadow-[0_0_0_2px_rgba(251,146,60,.2)]' : 'border-slate-700/60'}`}>
      {badge && (
        <div className="mb-3 inline-flex text-[11px] font-bold px-3 py-1 rounded-full bg-orange-500/15 text-orange-400 border border-orange-500/30">
          {badge}
        </div>
      )}
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <div className="text-4xl font-black">{price}<span className="text-base font-semibold text-slate-400">{suffix}</span></div>
      <ul className="mt-5 space-y-2 text-sm text-slate-300">
        {bullets.map((b)=> (<li key={b} className="flex items-start gap-2"><span>✓</span><span>{b}</span></li>))}
      </ul>
      <a href={ctaHref} className={`mt-6 inline-flex w-full justify-center rounded-xl px-4 py-3 font-semibold ${featured ? 'bg-orange-500 hover:bg-orange-600 text-white' : 'bg-slate-100 text-slate-900 hover:bg-white'}`}>
        {ctaLabel}
      </a>
    </div>
  );
}