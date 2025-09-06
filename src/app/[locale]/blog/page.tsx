export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Teacher Blog</h1>
        <p className="text-gray-600 mb-8">Discover AI-powered tools and strategies for modern educators.</p>
        
        <div className="grid md:grid-cols-2 gap-6">
          <a href="/en/blog/5-minute-ai-wins-busy-teachers" className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
            <h2 className="text-xl font-semibold mb-3">5 Minute AI Wins for Busy Teachers</h2>
            <p className="text-gray-600 mb-3">Quick AI tools that save time and boost productivity in the classroom</p>
            <span className="text-indigo-600 font-medium">Read more →</span>
          </a>
          
          <a href="/en/blog/ai-tools-for-teachers" className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
            <h2 className="text-xl font-semibold mb-3">Essential AI Tools Every Teacher Should Know</h2>
            <p className="text-gray-600 mb-3">A comprehensive guide to the most useful AI tools for educators</p>
            <span className="text-indigo-600 font-medium">Read more →</span>
          </a>
        </div>
      </div>
    </div>
  );
}