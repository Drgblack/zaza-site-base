import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {locales} from '../../../i18n';
import "../globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

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
          <main>
            {children}
          </main>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}