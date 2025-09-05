import { setRequestLocale } from 'next-intl/server';
import { getAllBlogPosts, getBlogPostBySlug } from '@/lib/blog/final-blog-service';

type Props = {
  params: Promise<{locale: string}>;
};

export default async function BlogTestPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  try {
    const allPosts = await getAllBlogPosts();
    const firstPost = allPosts[0];
    
    return (
      <div className="min-h-screen bg-white p-8">
        <h1 className="text-2xl font-bold mb-4">Blog Service Debug</h1>
        
        <div className="mb-6 p-4 bg-green-50 rounded">
          <h2 className="font-bold text-green-800">✅ Success</h2>
          <p>Blog service is working!</p>
          <p>Total posts: {allPosts.length}</p>
        </div>

        {firstPost && (
          <div className="mb-6 p-4 bg-blue-50 rounded">
            <h2 className="font-bold text-blue-800">First Post Preview:</h2>
            <p><strong>Title:</strong> {firstPost.title}</p>
            <p><strong>Slug:</strong> {firstPost.slug}</p>
            <p><strong>Description:</strong> {firstPost.description.substring(0, 100)}...</p>
            <p><strong>Has Image:</strong> {firstPost.image ? 'Yes' : 'No'}</p>
            <p><strong>Category:</strong> {firstPost.category.name}</p>
          </div>
        )}

        <div className="p-4 bg-gray-50 rounded">
          <h3 className="font-bold mb-2">All Posts:</h3>
          <ul>
            {allPosts.map(post => (
              <li key={post.id} className="mb-1">
                <a href={`/${locale}/blog/${post.slug}`} className="text-blue-600 hover:underline">
                  {post.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  } catch (error) {
    return (
      <div className="min-h-screen bg-red-50 p-8">
        <h1 className="text-2xl font-bold mb-4 text-red-800">❌ Blog Service Error</h1>
        <div className="p-4 bg-red-100 rounded">
          <pre className="text-sm">{String(error)}</pre>
        </div>
      </div>
    );
  }
}