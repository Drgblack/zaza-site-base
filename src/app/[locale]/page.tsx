import Link from 'next/link';

type Props = {
  params: Promise<{locale: string}>;
};

export default async function HomePage({params}: Props) {
  const {locale} = await params;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            AI-powered tools for modern educators
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Save 5+ hours per week with intelligent lesson planning, grading assistance, and classroom management.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <a 
              href="https://teach.zazatechnologies.com"
              className="bg-purple-600 text-white py-3 px-8 rounded-lg font-semibold text-lg hover:bg-purple-700 transition-colors"
            >
              Try Zaza Teach
            </a>
            <Link 
              href="/en/resources"
              className="bg-white text-purple-600 py-3 px-8 rounded-lg font-semibold text-lg border-2 border-purple-600 hover:bg-purple-50 transition-colors"
            >
              View Resources
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Zaza Promptly?
            </h2>
            <p className="text-xl text-gray-600">
              Built by educators, for educators
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">⚡</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Instant Feedback
              </h3>
              <p className="text-gray-600">
                Generate personalized comments and feedback in seconds
              </p>
            </div>
            
            <div className="text-center p-8 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">⏰</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Save Time
              </h3>
              <p className="text-gray-600">
                Reduce grading time by up to 80% with AI assistance
              </p>
            </div>
            
            <div className="text-center p-8 bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl">
              <div className="w-16 h-16 bg-pink-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">🎯</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Student-Focused
              </h3>
              <p className="text-gray-600">
                Maintain personal connection while scaling your impact
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Links */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            Explore More
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link 
              href="/en/blog"
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Blog</h3>
              <p className="text-gray-600">Latest insights and tips for educators</p>
            </Link>
            <Link 
              href="/en/resources"
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Resources</h3>
              <p className="text-gray-600">Free AI teaching materials and guides</p>
            </Link>
            <Link 
              href="/en/pricing"
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Pricing</h3>
              <p className="text-gray-600">Plans that fit your teaching needs</p>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}