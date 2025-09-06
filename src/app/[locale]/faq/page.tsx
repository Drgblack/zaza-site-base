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
  return generatePageMetadata('faq', locale as 'en' | 'de' | 'fr' | 'es' | 'it');
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