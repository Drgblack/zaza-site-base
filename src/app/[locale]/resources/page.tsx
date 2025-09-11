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

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Free Resources for Educators
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Download our comprehensive collection of AI teaching resources, guides, and toolkits to enhance your classroom with artificial intelligence.
          </p>
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {/* Self-Care Guide */}
          <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow p-8">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
              <span className="text-2xl">🧘‍♀️</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Teacher Self-Care Guide</h3>
            <p className="text-gray-600 mb-6">
              A comprehensive guide to maintaining well-being while teaching with AI assistance.
            </p>
            <button className="w-full bg-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-purple-700 transition-colors">
              Download PDF
            </button>
          </div>

          {/* AI Teaching Templates */}
          <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow p-8">
            <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mb-6">
              <span className="text-2xl">📝</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">AI Teaching Templates</h3>
            <p className="text-gray-600 mb-6">
              Ready-to-use templates for integrating AI tools into your daily teaching routine.
            </p>
            <button className="w-full bg-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-purple-700 transition-colors">
              Download Templates
            </button>
          </div>

          {/* Parent Communication Kit */}
          <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow p-8">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
              <span className="text-2xl">💬</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Parent Communication Kit</h3>
            <p className="text-gray-600 mb-6">
              Tools and scripts for effective AI-powered parent-teacher communication.
            </p>
            <button className="w-full bg-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-purple-700 transition-colors">
              Download Kit
            </button>
          </div>
        </div>

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