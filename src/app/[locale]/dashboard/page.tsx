import { setRequestLocale } from 'next-intl/server';
import { Dashboard } from '@/components/dashboard/dashboard';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard - Zaza Promptly',
  description: 'Access your saved snippets, download history, and referral credits.',
};

type Props = {
  params: Promise<{locale: string}>;
};

export default async function DashboardPage({params}: Props) {
  const {locale} = await params;
  setRequestLocale(locale);

  return <Dashboard />;
}