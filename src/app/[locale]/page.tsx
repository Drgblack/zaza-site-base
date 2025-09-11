import Link from 'next/link';

type Props = {
  params: Promise<{locale: string}>;
};

export default async function HomePage({params}: Props) {
  const {locale} = await params;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      <div className="max-w-4xl mx-auto px-6 py-20">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold text-gray-900 mb-6">
            Welcome to Zaza Promptly
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            AI-powered parent communication for teachers. Streamline your classroom interactions and build stronger connections with families.
          </p>
          
          {/* Navigation */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link 
              href="/en/resources"
              className="bg-purple-600 text-white py-3 px-8 rounded-lg font-semibold text-lg hover:bg-purple-700 transition-colors"
            >
              View Resources
            </Link>
            <Link 
              href="/en/blog"
              className="bg-white text-purple-600 py-3 px-8 rounded-lg font-semibold text-lg border-2 border-purple-600 hover:bg-purple-50 transition-colors"
            >
              Read Blog
            </Link>
          </div>
          
          <p className="text-green-600 font-semibold">
            ✅ Routing is working! Locale: {locale}
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-white rounded-xl shadow-md">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🤖</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">AI-Powered</h3>
            <p className="text-gray-600">Smart suggestions and automated responses for efficient communication</p>
          </div>
          
          <div className="text-center p-6 bg-white rounded-xl shadow-md">
            <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">👨‍👩‍👧‍👦</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Parent-Friendly</h3>
            <p className="text-gray-600">Clear, personalized messages that build trust and understanding</p>
          </div>
          
          <div className="text-center p-6 bg-white rounded-xl shadow-md">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">⏰</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Time-Saving</h3>
            <p className="text-gray-600">Reduce administrative work and focus on what matters most - teaching</p>
          </div>
        </div>
      </div>
    </div>
  );
}