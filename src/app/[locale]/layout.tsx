import type { ReactNode } from 'react';
import { NextIntlClientProvider } from 'next-intl';
import { Header } from '@/components/site/header';
import { Footer } from '@/components/site/footer';
import { ZaraAssistant } from '@/components/ai/zara-assistant';
import { Inter } from 'next/font/google';
import { notFound } from 'next/navigation';
import { locales } from '@/i18n';
import '../globals.css';

const inter = Inter({ subsets: ["latin"] });

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

async function loadMsgs(locale: string) {
  try { return (await import(`@/messages/${locale}.json`)).default; }
  catch { return (await import('@/messages/en.json')).default; }
}

export default async function LocaleLayout({
  children, params: { locale }
}: { children: ReactNode; params: { locale: string } }) {
  if (!locales.includes(locale as any)) {
    notFound();
  }

  const messages = await loadMsgs(locale);
  return (
    <html lang={locale}>
      <head><meta charSet="utf-8" /></head>
      <body className={inter.className}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Header />
          {children}
          <Footer />
          {process.env.NEXT_PUBLIC_ENABLE_ZARA === "1" && <ZaraAssistant />}
          
          {/* Build stamp for QA */}
          <div data-build-stamp className="text-xs text-gray-500/70 text-center py-6">
            {process.env.VERCEL_ENV ?? 'local'} · {process.env.VERCEL_GIT_COMMIT_REF ?? 'dev'} · Build:{' '}
            {process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 7) ?? 'local'}
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
