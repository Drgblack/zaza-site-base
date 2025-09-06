import { setRequestLocale } from 'next-intl/server';
import { blogPosts } from '../../../../blog-posts-data';

type Props = {
  params: Promise<{locale: string}>;
};

export default async function BlogPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const posts = blogPosts || [];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <h1 className="text-5xl font-bold mb-4">
            Teacher Resources & AI Insights
          </h1>
          <p className="text-xl opacity-90 max-w-2xl">
            Save time, teach better, and stay ahead with practical guides and AI-powered strategies for modern educators.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <p className="text-gray-600">
            Showing {posts.length} blog posts
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              {/* Hero Image */}
              {(post.image || post.featuredImage) && (
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={post.image || post.featuredImage || ''} 
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-white text-xs font-medium bg-purple-600">
                    📚 {post.category || 'Blog'}
                  </div>
                </div>
              )}
              
              <div className="p-6">
                {/* Title */}
                <h2 className="text-xl font-bold text-gray-900 mb-3">
                  <a href={`/${locale}/blog/${post.slug || post.id}`}>
                    {post.title}
                  </a>
                </h2>
                
                {/* Description */}
                <p className="text-gray-600 mb-4">
                  {post.description}
                </p>
                
                {/* Meta Info */}
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center gap-3">
                    <span>{post.readingTime || post.readTime || '5 min read'}</span>
                    {post.featured && (
                      <span className="text-orange-500">⭐ Featured</span>
                    )}
                  </div>
                </div>
                
                {/* Tags */}
                {post.tags && post.tags.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {post.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-gray-100 rounded-md text-xs text-gray-600"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
        
        {posts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No blog posts available.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}