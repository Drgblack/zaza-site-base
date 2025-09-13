import type { Metadata } from 'next';
import {Link} from '@/i18n/routing';
import { getAllPosts } from '@/lib/mdx';

export const metadata: Metadata = {
  title: 'Blog - AI Teaching Insights & Tips | Zaza Promptly',
  description: 'Latest insights, tips, and strategies for using AI in education. Expert advice for modern teachers to save time and enhance student outcomes.',
  keywords: ['AI education blog', 'teaching tips', 'AI tools', 'education technology', 'teacher resources', 'classroom management', 'parent communication'],
  openGraph: {
    title: 'Blog - AI Teaching Insights & Tips | Zaza Promptly',
    description: 'Latest insights, tips, and strategies for using AI in education.',
    type: 'website',
  },
};

type Props = {
  params: Promise<{locale: string}>;
};


export default async function BlogPage({params}: Props) {
  const {locale} = await params;
  const blogPosts = getAllPosts().filter(post => post.published);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            AI Teaching Blog
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Expert insights, practical tips, and inspiring stories to help you harness the power of AI in education.
          </p>
        </div>

        {/* Navigation */}
        <div className="flex justify-center mb-12">
          <Link 
            href="/"
            className="text-purple-600 hover:text-purple-700 font-medium flex items-center"
          >
            ← Back to Home
          </Link>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <article key={post.slug} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden">
              <div className="p-8">
                <div className="flex items-center justify-between mb-4">
                  <span className="inline-block bg-purple-100 text-purple-800 text-sm font-medium px-3 py-1 rounded-full">
                    {post.category}
                  </span>
                  <span className="text-sm text-gray-500">{post.readTime}</span>
                </div>
                
                <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                  {post.title}
                </h2>
                
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {post.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    {new Date(post.date).toLocaleDateString()}
                  </span>
                  <Link 
                    href={`/blog/${post.slug}`}
                    className="text-purple-600 hover:text-purple-700 font-medium"
                  >
                    Read More →
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Newsletter CTA */}
        <div className="bg-white rounded-2xl shadow-lg p-12 text-center mt-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Stay Updated
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Get the latest AI teaching tips, tools, and insights delivered to your inbox every week.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button className="bg-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-purple-700 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}