import { setRequestLocale } from 'next-intl/server';
import Link from 'next/link';
import { Star, BookOpen, Clock, Users } from 'lucide-react';
import { blogPosts, getFeaturedPosts, getRecentPosts, getAllCategories } from '../../../../blog-posts-data';

type Props = {
  params: Promise<{locale: string}>;
};

export default async function BlogPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const featuredPosts = getFeaturedPosts().slice(0, 3);
  const regularPosts = getRecentPosts(12).filter(post => !post.featured);
  const categories = getAllCategories();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl font-bold mb-6">
              Teacher Resources & AI Insights
            </h1>
            <p className="text-xl opacity-90 mb-8">
              Save time, teach better, and stay ahead with practical guides and AI-powered strategies for modern educators.
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-2xl font-bold">{blogPosts.length}+</div>
                <div className="text-sm opacity-75">Resources</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{categories.length}</div>
                <div className="text-sm opacity-75">Categories</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{featuredPosts.length}</div>
                <div className="text-sm opacity-75">Featured</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">0 sec</div>
                <div className="text-sm opacity-75">Setup Time</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Featured Section */}
        {featuredPosts.length > 0 && (
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <Star className="w-6 h-6 text-orange-500 fill-current" />
              <h2 className="text-2xl font-bold text-gray-900">Featured for This Week</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {featuredPosts.map((post) => (
                <Link 
                  key={post.id}
                  href={`/${locale}/blog/${post.id}`}
                  className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden"
                >
                  <img 
                    src={post.image || post.featuredImage || `https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&h=300&fit=crop`}
                    alt={post.imageAlt || post.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-2 py-1 bg-orange-100 text-orange-700 text-xs font-medium rounded">
                        Featured
                      </span>
                      <span className="text-gray-500 text-sm">{post.readingTime || post.readTime || '5 min read'}</span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {post.description || post.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500 text-sm">{new Date(post.date || post.publishDate || '2024-01-01').toLocaleDateString()}</span>
                      <span className="text-indigo-600 font-medium hover:text-indigo-700">
                        Read more →
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Regular Posts */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <BookOpen className="w-6 h-6 text-indigo-600" />
            <h2 className="text-2xl font-bold text-gray-900">Latest Resources</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularPosts.map((post) => (
              <Link 
                key={post.id}
                href={`/${locale}/blog/${post.id}`}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden"
              >
                <img 
                  src={post.image || post.featuredImage || `https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=600&h=300&fit=crop`}
                  alt={post.imageAlt || post.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-500 text-sm">{post.readingTime || post.readTime || '5 min read'}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {post.description || post.excerpt}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags?.slice(0, 2).map(tag => (
                      <span 
                        key={tag}
                        className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500 text-sm">{new Date(post.date || post.publishDate || '2024-01-01').toLocaleDateString()}</span>
                    <span className="text-indigo-600 font-medium hover:text-indigo-700">
                      Read more →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="mt-12 p-8 bg-indigo-50 rounded-xl border border-indigo-100 text-center">
          <h3 className="text-2xl font-bold text-indigo-900 mb-4">
            Ready to Transform Your Teaching?
          </h3>
          <p className="text-indigo-700 mb-6 max-w-2xl mx-auto">
            Join thousands of educators already using AI to save time and enhance their impact in the classroom.
          </p>
          <Link 
            href={`/${locale}/signup`}
            className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Get Started Today →
          </Link>
        </section>
      </div>
    </div>
  );
}