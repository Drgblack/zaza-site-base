import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Community - Zaza Promptly',
  description: 'Join our community of educators using AI to transform their teaching practice.',
};

type Props = {
  params: Promise<{locale: string}>;
};

export default async function Page({params}: Props) {
  const {locale} = await params;
  const t = await getTranslations('community');
  const stats = [
    { value: '2,500+', label: t('stats.teachers') },
    { value: '150+',   label: t('stats.resources') },
    { value: '500+',   label: t('stats.success_stories') },
  ];
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            {t('title')}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            {t('subtitle')}
          </p>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {t('description')}
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">{stat.value}</div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Ready to Transform Your Teaching?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of educators who are already using AI to save time, improve communication, and enhance student learning.
          </p>
          <a 
            href="https://teach.zazatechnologies.com"
            className="bg-purple-600 text-white py-4 px-8 rounded-lg font-semibold text-lg hover:bg-purple-700 transition-colors inline-block"
          >
            {t('cta')}
          </a>
        </div>
      </div>
    </div>
  );
}
