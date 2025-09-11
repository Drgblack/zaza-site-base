import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free Resources - AI Tools for Educators',
  description: 'Download free AI teaching resources, guides, and toolkits to enhance your classroom with artificial intelligence. Templates, best practices, and case studies.',
  keywords: ['AI teaching resources', 'educator tools', 'teaching templates', 'AI guides', 'education technology'],
};

type Props = {
  params: Promise<{locale: string}>;
};

export default async function ResourcesPage({params}: Props) {
  const {locale} = await params;
  setRequestLocale(locale);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Resources Page
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Locale: {locale}
        </p>
        <p className="text-gray-600 dark:text-gray-300 mt-4">
          This is a simplified resources page for debugging.
        </p>
      </div>
    </div>
  );
}