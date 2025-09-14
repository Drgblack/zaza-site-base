import type { ReactNode } from 'react';
import { NextIntlClientProvider } from 'next-intl';
import { Inter } from 'next/font/google';
import { notFound } from 'next/navigation';
import { locales } from '@/i18n';
import { Header } from '@/components/site/header';
import { Footer } from '@/components/site/footer';
import { ZaraAssistant } from '@/components/ai/zara-assistant';
import '../globals.css';

const inter = Inter({ subsets: ['latin'] });

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

async function loadMessages(locale: string) {
  try {
    return (await import(`@/messages/${locale}.json`)).default;
  } catch {
    return (await import('@/messages/en.json')).default;
  }
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: ReactNode;
  params: { locale: string };
}) {
  if (!locales.includes(locale as any)) {
    notFound();
  }

  const messages = await loadMessages(locale);

  return (
    <html lang={locale}>
      <head>
        <meta charSet="utf-8" />
      </head>
      <body className={inter.className}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow pt-16">
              {children}
            </main>
            <Footer />
          </div>
          {process.env.NEXT_PUBLIC_ENABLE_ZARA === "1" && <ZaraAssistant />}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
