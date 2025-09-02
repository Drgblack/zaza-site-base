import { setRequestLocale } from 'next-intl/server';
import { PricingPageClient } from './pricing-client';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pricing - Zaza Promptly AI Tools for Educators',
  description: 'Choose the plan that saves you time every week. Annual plans give teachers the best value.',
};

type Props = {
  params: Promise<{locale: string}>;
};

export default async function PricingPage({params}: Props) {
  const {locale} = await params;
  setRequestLocale(locale);

  return <PricingPageClient />;
}

