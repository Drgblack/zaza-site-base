import { setRequestLocale } from 'next-intl/server';
import { getAllBlogPosts } from '@/lib/blog/service';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog | Zaza Promptly - AI-Powered Teaching Resources',
  description: 'Discover practical AI tools, teaching strategies, and expert insights to transform your classroom.',
};

type Props = {
  params: Promise<{locale: string}>;
};

export default async function BlogPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  try {
    const posts = await getAllBlogPosts();
    
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Blog</h1>
          <p className="text-lg text-gray-600 mb-8">
            Discover practical AI tools and teaching strategies from education experts.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <Link 
                key={post.id} 
                href={`/blog/${post.slug}`}
                className="block border rounded-lg p-6 hover:shadow-lg transition-shadow"
              >
                <div className={`w-full h-2 rounded mb-4 ${post.category.color}`} />
                <h2 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                  {post.title}
                </h2>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {post.description}
                </p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>{post.author.name}</span>
                  <span>{post.readingTime} min read</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Blog page error:', error);
    return (
      <div className="min-h-screen bg-red-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Blog Error</h1>
          <p className="text-red-600">Unable to load blog posts. Please try again later.</p>
          <pre className="mt-4 text-xs bg-red-100 p-4 rounded">
            {String(error)}
          </pre>
        </div>
      </div>
    );
  }
}