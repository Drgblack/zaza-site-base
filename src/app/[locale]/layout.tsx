import "../globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://zazapromptly.com'),
  title: {
    template: '%s | Zaza Promptly',
    default: 'Zaza Promptly - AI Tools for Educators',
  },
  description: 'AI-powered tools that help teachers save 5+ hours per week with intelligent lesson planning, grading assistance, and classroom management.',
  keywords: ['education', 'AI', 'teachers', 'lesson planning', 'grading', 'classroom management'],
  authors: [{ name: 'Zaza Technologies' }],
  creator: 'Zaza Technologies',
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
 
  return (
    <html lang={locale}>
      <body className={inter.className}>
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}