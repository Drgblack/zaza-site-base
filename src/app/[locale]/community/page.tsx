import { setRequestLocale } from 'next-intl/server';
import { CommunityHub } from './community-hub';
import { generatePageMetadata } from '@/lib/seo/metadata';
import { organizationSchema } from '@/components/seo/structured-data-schemas';
import type { Metadata } from 'next';

type Props = {
  params: Promise<{locale: string}>;
};

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {locale} = await params;
  return generatePageMetadata('resources', locale as 'en' | 'de' | 'fr' | 'es' | 'it');
}

export default async function CommunityPage({params}: Props) {
  const {locale} = await params;
  setRequestLocale(locale);

  return (
    <>
      <CommunityHub />
      
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
    </>
  );
}
