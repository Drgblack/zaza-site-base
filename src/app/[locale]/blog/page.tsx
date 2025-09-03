import { setRequestLocale } from 'next-intl/server';
import { getAllPosts } from '@/lib/blog';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI in Education Blog - Zaza Promptly',
  description: 'Insights, strategies, and real-world examples from educators transforming their classrooms with AI.',
  keywords: ['AI education blog', 'teacher resources', 'parent communication', 'educational technology', 'teaching tips'],
};

type Props = {
  params: Promise<{locale: string}>;
  searchParams: Promise<{category?: string; tag?: string; search?: string; page?: string}>;
};

export default async function BlogPage({ params, searchParams }: Props) {
  const { locale } = await params;
  const { category, search, page = '1' } = await searchParams;
  setRequestLocale(locale);

  try {
    console.log('1. Starting blog page render');
    
    const posts = getAllPosts();
    console.log('2. Got posts:', posts.length);
    
    if (posts.length === 0) {
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">No Blog Posts Found</h1>
            <p className="text-gray-600">No blog posts could be loaded.</p>
          </div>
        </div>
      );
    }

    console.log('3. About to render with', posts.length, 'posts');

    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header Section */}
        <header className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 py-16">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                AI in Education Blog
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Insights, strategies, and real-world examples from educators transforming their classrooms with AI.
              </p>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Found {posts.length} Blog Posts</h2>
            <div className="grid gap-4 max-w-2xl mx-auto">
              {posts.slice(0, 5).map((post) => (
                <div key={post.slug} className="bg-white p-4 rounded-lg shadow-sm text-left">
                  <h3 className="font-semibold">{post.title}</h3>
                  <p className="text-sm text-gray-600">
                    By {post.author} | {post.category} | {new Date(post.date).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error in blog page:', error);
    
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Blog Error</h1>
          <p className="text-gray-600 mb-6">
            Error: {error instanceof Error ? error.message : 'Unknown error'}
          </p>
          <details className="text-left bg-gray-100 p-4 rounded text-xs">
            <summary>Error Details</summary>
            <pre>{error instanceof Error ? error.stack : JSON.stringify(error)}</pre>
          </details>
        </div>
      </div>
    );
  }
}