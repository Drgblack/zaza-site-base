import { setRequestLocale } from 'next-intl/server';
import { ResourceLibrary } from '@/components/site/resource-library';
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
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-br from-purple-50 via-pink-50/30 to-blue-50/30 dark:from-purple-900/20 dark:via-pink-900/10 dark:to-blue-900/10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Resource Library
            </h1>
            <p className="mt-6 text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Everything you need to successfully integrate AI into your teaching practice. Free guides, templates, and tools designed by educators, for educators.
            </p>
          </div>
        </div>
      </section>

      {/* Resource Library Component */}
      <ResourceLibrary />

      {/* Newsletter CTA */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Get New Resources First
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join 10,000+ educators and receive new resources, guides, and AI teaching tips in your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 border-0 focus:ring-2 focus:ring-purple-300"
            />
            <button className="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Subscribe
            </button>
          </div>
          <p className="text-sm opacity-75 mt-4">
            No spam. Unsubscribe anytime. Get exclusive access to new resources.
          </p>
        </div>
      </section>

      {/* Featured Resources CTA */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Need Something Custom?</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8 text-lg">
            Can't find exactly what you're looking for? Let us know what resources would help your teaching practice.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors">
              Request a Resource
            </button>
            <button className="border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              Suggest an Idea
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}