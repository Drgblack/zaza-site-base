export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-purple-50 via-white to-pink-50 py-20 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
              We help teachers thrive.
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto">
              AI-powered tools that save educators 5+ hours per week, so you can focus on what matters most - your students.
            </p>
            <div className="space-y-4">
              <a 
                href="https://teach.zazatechnologies.com"
                className="inline-block px-8 py-4 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors"
              >
                Get Started
              </a>
              <div className="text-sm text-gray-500">
                {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
                <a href="/en" className="hover:text-purple-600">
                  View full site →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}