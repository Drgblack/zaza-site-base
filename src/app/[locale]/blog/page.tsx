import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog | Zaza Promptly',
  description: 'Blog posts for educators',
};

type Props = {
  params: Promise<{locale: string}>;
};

export default async function BlogPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  // Hardcoded test data - no service calls
  const testPosts = [
    {
      id: '1',
      title: 'Test Blog Post 1',
      description: 'This is a test blog post to verify the page loads.',
      slug: 'test-post-1',
      author: 'Test Author',
      readingTime: 5,
      category: 'Test Category'
    },
    {
      id: '2', 
      title: 'Test Blog Post 2',
      description: 'Another test post to make sure everything works.',
      slug: 'test-post-2',
      author: 'Test Author',
      readingTime: 3,
      category: 'Test Category'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Blog (Minimal Test)</h1>
        <p className="text-lg text-gray-600 mb-8">
          This is a minimal test version to debug the blog issues.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testPosts.map((post) => (
            <div 
              key={post.id} 
              className="border rounded-lg p-6 hover:shadow-lg transition-shadow"
            >
              <div className="w-full h-2 bg-purple-500 rounded mb-4" />
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                {post.title}
              </h2>
              <p className="text-gray-600 mb-4">
                {post.description}
              </p>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>{post.author}</span>
                <span>{post.readingTime} min read</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-8 p-4 bg-blue-50 rounded-lg">
          <h3 className="font-bold text-blue-900 mb-2">Debug Info:</h3>
          <p className="text-blue-800 text-sm">
            This page loads without any blog service calls. If you see this, 
            the issue is in the blog service or content loading.
          </p>
          <p className="text-blue-800 text-sm mt-2">
            <strong>Locale:</strong> {locale}
          </p>
          <p className="text-blue-800 text-sm mt-1">
            <strong>Posts Count:</strong> {testPosts.length} (hardcoded test data)
          </p>
        </div>
      </div>
    </div>
  );
}