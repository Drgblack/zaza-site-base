import { getTranslations } from 'next-intl/server';
import items from '@/data/resources.json';

export default async function ResourcesPage() {
  const t = await getTranslations();

  return (
    <main className="max-w-5xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-2">{t('resources.title')}</h1>
      <p className="text-slate-600 mb-6">{t('resources.subtitle')}</p>

      {items.length === 0 && (
        <p className="text-sm text-slate-500">{t('resources.note')}</p>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        {items.map((it) => (
          <div key={it.path} className="border rounded-xl p-4">
            <div className="font-semibold">{it.title}</div>
            <div className="text-xs text-slate-500 mb-3">{it.sizeLabel}</div>
            <a className="inline-block px-3 py-2 rounded bg-slate-900 text-white"
               href={it.path} download>
              {t('resources.download')}
            </a>
          </div>
        ))}
      </div>
    </main>
  );
}