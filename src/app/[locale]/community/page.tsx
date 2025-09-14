import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';

export const metadata: Metadata = {
  title: 'Community - Zaza Promptly',
  description: 'Join our community of educators using AI to transform their teaching practice. Connect, share, and learn together.',
};

type Props = {
  params: Promise<{locale: string}>;
};

export default async function CommunityPage({params}: Props) {
  const {locale} = await params;
  const t = await getTranslations({locale});

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            {t('community.title')}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            {t('community.subtitle')}
          </p>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {t('community.description')}
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="text-center">
            <div className="text-4xl font-bold text-purple-600 mb-2">2,500+</div>
            <div className="text-gray-600">{t('community.stats.teachers')}</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-purple-600 mb-2">150+</div>
            <div className="text-gray-600">{t('community.stats.resources')}</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-purple-600 mb-2">500+</div>
            <div className="text-gray-600">{t('community.stats.success_stories')}</div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Ready to Transform Your Teaching?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of educators who are already using AI to save time, improve communication, and enhance student learning.
          </p>
          <Link 
            href="/"
            className="bg-purple-600 text-white py-4 px-8 rounded-lg font-semibold text-lg hover:bg-purple-700 transition-colors inline-block"
          >
            {t('community.cta')}
          </Link>
        </div>
      </div>
    </div>
  );
}
