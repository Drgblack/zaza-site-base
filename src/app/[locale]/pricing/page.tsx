import { setRequestLocale } from 'next-intl/server';
import { PricingPageClient } from './pricing-client';
import { generatePageMetadata } from '@/lib/seo/metadata';
import { softwareApplicationSchema, organizationSchema } from '@/components/seo/structured-data-schemas';
import type { Metadata } from 'next';

type Props = {
  params: Promise<{locale: string}>;
};

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {locale} = await params;
  return generatePageMetadata('pricing', locale as 'en' | 'de' | 'fr' | 'es' | 'it');
}

export default async function PricingPage({params}: Props) {
  const {locale} = await params;
  setRequestLocale(locale);

  return (
    <>
      <PricingPageClient />
      
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
          __html: JSON.stringify(softwareApplicationSchema),
        }}
      />
    </>
  );
}

