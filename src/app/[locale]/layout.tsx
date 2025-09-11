import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {locales} from '../../../i18n';
import "../globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Header } from '@/components/site/header';
import { Footer } from '@/components/site/footer';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://zazapromptly.com'),
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
};

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
        </NextIntlClientProvider>
      </body>
    </html>
  );
}