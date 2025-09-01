import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';
import "../globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";

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
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_APP_URL || 'https://zazapromptly.com',
    title: 'Zaza Promptly - AI Tools for Educators',
    description: 'AI-powered tools that help teachers save 5+ hours per week',
    siteName: 'Zaza Promptly',
    images: [
      {
        url: '/og/hero-og.png',
        width: 1200,
        height: 630,
        alt: 'Zaza Promptly - AI Tools for Educators',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Zaza Promptly - AI Tools for Educators', 
    description: 'AI-powered tools that help teachers save 5+ hours per week',
    images: ['/og/hero-og.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }
 
  const messages = await getMessages();
 
  return (
    <html lang={locale}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="shortcut icon" href="/favicon.ico" />
      </head>
      <body className={inter.className}>
        <NextIntlClientProvider messages={messages}>
          <Header />
          <main>
            {children}
          </main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}