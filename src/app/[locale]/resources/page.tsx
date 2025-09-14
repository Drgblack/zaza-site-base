import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { getResourcesByCategory } from '@/lib/resources.server';
import { Link } from '@/i18n/routing';

export const metadata: Metadata = {
  title: 'Free Resources - AI Tools for Educators',
  description: 'Download free AI teaching resources, guides, and toolkits to enhance your classroom with artificial intelligence. Templates, best practices, and case studies.',
  keywords: ['AI teaching resources', 'educator tools', 'teaching templates', 'AI guides', 'education technology'],
};

type Props = {
  params: Promise<{locale: string}>;
};

const categoryIcons: Record<string, string> = {
  'Planning': '📝',
  'Communication': '💬',
  'AI Tools': '🤖',
  'Assessment': '📊',
  'Management': '⚡',
  'Wellbeing': '🧘‍♀️'
};

export default async function ResourcesPage({params}: Props) {
  const { locale } = await params;
  const t = await getTranslations({locale});
  const categories = getResourcesByCategory();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            {t('resources.title')}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('resources.subtitle')}
          </p>
        </div>

        {/* Resources by Category */}
        {categories.map((category) => (
          <div key={category.name} className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
              <span className="mr-3 text-4xl">
                {categoryIcons[category.name] || '📄'}
              </span>
              {category.name}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.resources.map((resource) => (
                <div key={resource.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow p-6">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                    <span className="text-2xl">{categoryIcons[resource.category] || '📄'}</span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {resource.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 text-sm">
                    {resource.description}
                  </p>
                  
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-sm text-gray-500">
                      {resource.fileSize}
                    </span>
                    <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                      {resource.category}
                    </span>
                  </div>
                  
                  <a
                    href={resource.path}
                    download
                    className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-purple-700 transition-colors text-center block"
                  >
                    Download {resource.path.endsWith('.pdf') ? 'PDF' : 'File'}
                  </a>
                </div>
              ))}
            </div>
          </div>
        ))}

        {categories.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">
              Resources are being prepared. Check back soon!
            </p>
          </div>
        )}

        {/* CTA Section */}
        <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Want More Resources?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Join our community of educators and get access to exclusive AI teaching resources, webinars, and expert tips.
          </p>
          <Link 
            href="/"
            className="bg-purple-600 text-white py-4 px-8 rounded-lg font-semibold text-lg hover:bg-purple-700 transition-colors inline-block"
          >
            Try Zaza Promptly Free
          </Link>
        </div>
      </div>
    </div>
  );
}