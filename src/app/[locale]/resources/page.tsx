import type { Metadata } from 'next';
import { getAllResources, categoryColors } from '@/lib/resources';
import { ResourceCard } from '@/components/resources/ResourceCard';

export const metadata: Metadata = {
  title: 'Free Resources - AI Tools for Educators',
  description: 'Download free AI teaching resources, guides, and toolkits to enhance your classroom with artificial intelligence. Templates, best practices, and case studies.',
  keywords: ['AI teaching resources', 'educator tools', 'teaching templates', 'AI guides', 'education technology'],
};

type Props = {
  params: Promise<{locale: string}>;
};

export default async function ResourcesPage({params}: Props) {
  await params; // Just to satisfy TypeScript
  
  const resources = await getAllResources();
  const availableResources = resources.filter(r => r.fileExists);
  const upcomingResources = resources.filter(r => !r.fileExists);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Free Resources for Educators
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Download our comprehensive collection of AI teaching resources, guides, and toolkits to enhance your classroom with artificial intelligence.
          </p>
          
          {/* Resource Stats */}
          <div className="flex justify-center space-x-8 text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span>{availableResources.length} Available Now</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
              <span>{upcomingResources.length} Coming Soon</span>
            </div>
          </div>
        </div>

        {/* Available Resources */}
        {availableResources.length > 0 && (
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Available Resources</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {availableResources.map((resource) => (
                <ResourceCard key={resource.id} resource={resource} />
              ))}
            </div>
          </div>
        )}

        {/* Coming Soon Resources */}
        {upcomingResources.length > 0 && (
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Coming Soon</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {upcomingResources.map((resource) => (
                <ResourceCard key={resource.id} resource={resource} />
              ))}
            </div>
          </div>
        )}

        {/* CTA Section */}
        <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Want More Resources?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Join our community of educators and get access to exclusive AI teaching resources, webinars, and expert tips. New resources added weekly!
          </p>
          <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
            <button className="w-full sm:w-auto bg-purple-600 text-white py-4 px-8 rounded-lg font-semibold text-lg hover:bg-purple-700 transition-colors">
              Join Our Community
            </button>
            <button className="w-full sm:w-auto bg-white text-purple-600 py-4 px-8 rounded-lg font-semibold text-lg border-2 border-purple-600 hover:bg-purple-50 transition-colors">
              Request a Resource
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}