export default function EnglishHomePage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
          Welcome to Zaza Promptly
        </h1>
        <p className="text-lg text-gray-600 text-center mb-12">
          AI-powered parent communication for teachers
        </p>
        <div className="text-center">
          <a
            href="/en/blog"
            className="inline-block px-6 py-3 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition-colors"
          >
            Visit our Blog
          </a>
        </div>
      </div>
    </div>
  );
}