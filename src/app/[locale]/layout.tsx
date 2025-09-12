import {notFound} from 'next/navigation';
import {locales} from '../../../i18n';
import "../globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SimpleHeader } from '@/components/layout/simple-header';
import { SimpleFooter } from '@/components/layout/simple-footer';
import { GuidedZaraAssistant } from '@/components/ai/guided-zara-assistant';

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
 
  return (
    <html lang={locale}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  "@id": "https://zazapromptly.com/#organization",
                  "name": "Zaza Technologies",
                  "url": "https://zazapromptly.com",
                  "logo": {
                    "@type": "ImageObject",
                    "url": "https://zazapromptly.com/logo.png"
                  },
                  "description": "AI-powered teaching assistant and parent communication tools for educators"
                },
                {
                  "@type": "SoftwareApplication",
                  "@id": "https://zazapromptly.com/#product",
                  "name": "Zaza Promptly",
                  "description": "AI-powered parent communication for teachers",
                  "url": "https://zazapromptly.com",
                  "applicationCategory": "EducationalApplication",
                  "operatingSystem": "Web Browser",
                  "offers": {
                    "@type": "Offer",
                    "url": "https://teach.zazatechnologies.com",
                    "priceCurrency": "USD",
                    "availability": "https://schema.org/InStock"
                  },
                  "publisher": {
                    "@id": "https://zazapromptly.com/#organization"
                  }
                }
              ]
            })
          }}
        />
        <link rel="canonical" href={`https://zazapromptly.com/${locale}`} />
      </head>
      <body className={inter.className}>
        <SimpleHeader />
        <main className="pt-16">
          {children}
        </main>
        <SimpleFooter 
        <GuidedZaraAssistant />
        {process.env.NEXT_PUBLIC_ENABLE_ZARA === '1' && <ZaraAssistant />}
      </body>
    </html>
  );
}