import {notFound} from 'next/navigation';
import {locales} from '../../../i18n';
import "../globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Header } from '@/components/site/header';
import { Footer } from '@/components/site/footer';
import { ZaraAssistant } from '@/components/ai/zara-assistant';
import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';

// Ensure static generation for each locale segment
export function generateStaticParams() {
  // Hardcode the same 5 locales
  return ['en', 'de', 'fr', 'es', 'it'].map((locale) => ({ locale }));
}

const inter = Inter({ subsets: ["latin"] });

export async function generateMetadata({params}: {params: Promise<{locale: string}>}): Promise<Metadata> {
  const {locale} = await params;
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://zazapromptly.com';
  
  // Generate hreflang alternates for all locales
  const languages = locales.reduce((acc, loc) => {
    acc[loc] = `${baseUrl}/${loc}`;
    return acc;
  }, {} as Record<string, string>);

  return {
    metadataBase: new URL(baseUrl),
    title: {
      template: '%s | Zaza Promptly',
      default: 'Zaza Promptly',
    },
    description: 'AI-powered parent communication for teachers',
    keywords: ['education', 'AI', 'teachers', 'parent communication', 'teaching assistant'],
    authors: [{ name: 'Zaza Technologies' }],
    creator: 'Zaza Technologies',
    icons: {
      icon: '/favicon.ico',
      shortcut: '/favicon.ico',
      apple: '/apple-touch-icon.png',
    },
    alternates: {
      canonical: `${baseUrl}/${locale}`,
      languages,
    },
  };
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  if (!locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();
 
  return (
    <html lang={locale}>
      <body className={inter.className}>
        <NextIntlClientProvider messages={messages}>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow pt-16">
              {children}
            </main>
            <Footer />
          </div>
          {process.env.NEXT_PUBLIC_ENABLE_ZARA === '1' && <ZaraAssistant />}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}