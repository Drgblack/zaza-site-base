import { setRequestLocale } from 'next-intl/server';
import { getAllBlogPosts } from '@/lib/blog/service';

type Props = {
  params: Promise<{locale: string}>;
};

export default async function BlogDebugPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  try {
    console.log('Attempting to fetch blog posts...');
    const posts = await getAllBlogPosts();
    console.log(`Found ${posts.length} posts`);
    
    return (
      <div className="min-h-screen bg-white p-8">
        <h1 className="text-3xl font-bold mb-4">Blog Debug</h1>
        <p className="mb-4">Found {posts.length} blog posts:</p>
        <ul className="space-y-2">
          {posts.map((post) => (
            <li key={post.id} className="border p-4 rounded">
              <h2 className="font-bold">{post.title}</h2>
              <p className="text-gray-600">{post.description}</p>
              <p className="text-sm">Category: {post.category.name}</p>
              <p className="text-sm">Reading time: {post.readingTime} min</p>
            </li>
          ))}
        </ul>
      </div>
    );
  } catch (error) {
    console.error('Blog debug error:', error);
    return (
      <div className="min-h-screen bg-red-50 p-8">
        <h1 className="text-3xl font-bold text-red-600 mb-4">Blog Debug Error</h1>
        <p className="text-red-600 mb-4">Error: {String(error)}</p>
        <pre className="bg-red-100 p-4 rounded text-sm overflow-x-auto">
          {error instanceof Error ? error.stack : String(error)}
        </pre>
      </div>
    );
  }
}