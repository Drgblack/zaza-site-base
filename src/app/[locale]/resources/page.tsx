import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { readFile } from 'fs/promises';
import { join } from 'path';

interface Resource {
  name: string;
  filename: string;
  size: number;
  sizeFormatted: string;
  downloadUrl: string;
}

export const metadata: Metadata = {
  title: 'Free Resources - AI Tools for Educators',
  description: 'Download free AI teaching resources, guides, and toolkits to enhance your classroom with artificial intelligence. Templates, best practices, and case studies.',
  keywords: ['AI teaching resources', 'educator tools', 'teaching templates', 'AI guides', 'education technology'],
};

type Props = {
  params: Promise<{locale: string}>;
};

async function loadResources(): Promise<Resource[]> {
  try {
    const manifestPath = join(process.cwd(), 'src/data/resources-manifest.json');
    const content = await readFile(manifestPath, 'utf-8');
    return JSON.parse(content);
  } catch {
    return [];
  }
}

export default async function ResourcesPage({params}: Props) {
  const {locale} = await params;
  const t = await getTranslations('resources');
  const resources = await loadResources();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            {t('title')}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        {/* Resources Grid */}
        {resources.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {resources.map((resource, index) => (
              <div key={resource.filename} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow p-8">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
                  <span className="text-2xl">📄</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{resource.name}</h3>
                <p className="text-gray-600 mb-2 text-sm">
                  File size: {resource.sizeFormatted}
                </p>
                <a 
                  href={resource.downloadUrl}
                  download
                  className="w-full bg-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-purple-700 transition-colors inline-block text-center"
                >
                  {t('download_file')} PDF
                </a>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center mb-12">
            <p className="text-lg text-gray-600">
              {t('note')}
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
          <button className="bg-purple-600 text-white py-4 px-8 rounded-lg font-semibold text-lg hover:bg-purple-700 transition-colors">
            Join Our Community
          </button>
        </div>
      </div>
    </div>
  );
}