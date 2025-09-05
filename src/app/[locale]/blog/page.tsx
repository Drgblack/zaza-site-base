import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import { getAllSimpleBlogPosts } from '@/lib/blog/working-service';

export const metadata: Metadata = {
  title: 'Blog | Zaza Promptly',
  description: 'Educational insights, teaching strategies, and AI tools for modern educators',
};

type Props = {
  params: Promise<{locale: string}>;
};

export default async function BlogPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  // Use the working blog service
  const posts = await getAllSimpleBlogPosts();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Blog
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover educational insights, teaching strategies, and AI tools for modern educators.
          </p>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No blog posts found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <article
                key={post.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium text-white ${post.category.color}`}>
                      {post.category.name}
                    </span>
                    {post.featured && (
                      <span className="text-yellow-500 text-sm">★ Featured</span>
                    )}
                  </div>
                  
                  <h2 className="text-xl font-bold text-gray-900 mb-3">
                    {post.title}
                  </h2>
                  
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {post.description}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-gray-200 mr-3"></div>
                      <span>{post.author.name}</span>
                    </div>
                    <span>{post.readingTime} min read</span>
                  </div>
                  
                  <div className="mt-4 flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span key={tag} className="px-2 py-1 bg-gray-100 rounded text-xs text-gray-600">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
        
        <div className="mt-12 text-center">
          <p className="text-gray-500">
            Showing {posts.length} blog posts
          </p>
        </div>
      </div>
    </div>
  );
}