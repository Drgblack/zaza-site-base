import {setRequestLocale, getTranslations} from 'next-intl/server';
import type {Metadata} from 'next';

type Props = { params: { locale: string } };

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {locale} = params;
  return { title: 'Support', alternates: { canonical: `/${locale}/support` } };
}

export default async function SupportPage({params}: Props) {
  const {locale} = params;
  setRequestLocale(locale);
  const t = await getTranslations('support');

  return (
    <main className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-3">{t('title')}</h1>
      <p className="text-slate-600 mb-8">{t('subtitle')}</p>

      <div className="space-y-4">
        <a className="inline-block px-4 py-2 rounded bg-slate-900 text-white" href={`/${locale}/faq`}>
          {t('cta_faq')}
        </a>
        <div className="text-sm text-slate-600">
          {t('contact_label')} <a className="underline" href="mailto:support@zazatechnologies.com">support@zazatechnologies.com</a>
        </div>
      </div>
    </main>
  );
}