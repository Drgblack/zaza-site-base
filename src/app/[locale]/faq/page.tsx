import { setRequestLocale } from 'next-intl/server';
import { generatePageMetadata } from '@/lib/seo/metadata';
import { organizationSchema } from '@/components/seo/structured-data-schemas';
import { faqData } from '@/data/faq';
import FAQPageClient from './faq-page-client';
import type { Metadata } from 'next';

type Props = {
  params: Promise<{locale: string}>;
};

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {locale} = await params;
  
  const baseMetadata = {
    title: 'FAQ - Frequently Asked Questions | Zaza Promptly',
    description: 'Get answers to common questions about Zaza Promptly. Learn how to write better parent messages faster with our teacher-friendly AI assistant.',
    keywords: 'FAQ, frequently asked questions, teacher AI assistant, parent communication, Zaza Promptly help',
    openGraph: {
      title: 'Frequently Asked Questions | Zaza Promptly',
      description: 'Quick answers for busy teachers. Learn how Promptly helps you write caring parent messages in minutes.',
      url: `https://zazapromptly.com/${locale === 'en' ? '' : locale + '/'}faq`,
      siteName: 'Zaza Promptly',
      images: [
        {
          url: 'https://zazapromptly.com/og/faq-og.png',
          width: 1200,
          height: 630,
          alt: 'Zaza Promptly FAQ - Questions and Answers for Teachers',
        },
      ],
      locale: locale === 'en' ? 'en_US' : `${locale}_${locale.toUpperCase()}`,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Frequently Asked Questions | Zaza Promptly',
      description: 'Quick answers for busy teachers. Learn how Promptly helps you write caring parent messages in minutes.',
      images: ['https://zazapromptly.com/og/faq-og.png'],
    },
    alternates: {
      canonical: `https://zazapromptly.com/${locale === 'en' ? '' : locale + '/'}faq`,
      languages: {
        'en': 'https://zazapromptly.com/faq',
        'de': 'https://zazapromptly.com/de/faq',
        'fr': 'https://zazapromptly.com/fr/faq',
        'es': 'https://zazapromptly.com/es/faq',
        'it': 'https://zazapromptly.com/it/faq',
      },
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
  
  return baseMetadata;
}

// Generate FAQ JSON-LD structured data
function generateFAQStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqData.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
}

export default async function FAQPage({params}: Props) {
  const {locale} = await params;
  setRequestLocale(locale);

  const faqStructuredData = generateFAQStructuredData();

  return (
    <>
      <FAQPageClient />
      
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqStructuredData),
        }}
      />
    </>
  );
}