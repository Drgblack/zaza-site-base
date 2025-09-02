import { setRequestLocale } from 'next-intl/server';
import { CommunityHub } from './community-hub';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Zaza Community Hub - Teacher Marketplace for AI Resources',
  description: 'Discover, share, and trade AI-powered teaching resources with educators worldwide. Join the Zaza community marketplace.',
};

type Props = {
  params: Promise<{locale: string}>;
};

export default async function CommunityPage({params}: Props) {
  const {locale} = await params;
  setRequestLocale(locale);

  return <CommunityHub />;
}
