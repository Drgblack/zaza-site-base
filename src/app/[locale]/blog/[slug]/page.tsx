import Link from 'next/link';
import { getBlogPostById } from '../../../../../blog-posts-data';

export default function BlogPostPage({ params }: { params: { locale: string; slug: string } }) {
  const { locale, slug } = params;
  const post = getBlogPostById(slug);

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Post Not Found</h1>
          <Link href={`/${locale}/blog`} className="text-indigo-600 hover:text-indigo-700">
            ← Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <article className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Link 
          href={`/${locale}/blog`}
          className="inline-flex items-center text-indigo-600 hover:text-indigo-700 font-medium mb-8"
        >
          ← Back to Blog
        </Link>

        <div className="relative h-64 md:h-80 rounded-xl overflow-hidden mb-8">
          <img 
            src={post.image || post.featuredImage || `https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1200&h=630&fit=crop`}
            alt={post.imageAlt || post.title}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="bg-white rounded-xl p-8 shadow-sm">
          <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
            <span>{new Date(post.date || post.publishDate || '2024-01-01').toLocaleDateString()}</span>
            <span>•</span>
            <span>{post.readingTime || post.readTime || '5 min read'}</span>
            <span>•</span>
            <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
              {post.category}
            </span>
          </div>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            {post.title}
          </h1>
          
          <p className="text-xl text-gray-600 mb-8">
            {post.description || post.excerpt}
          </p>

          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              {post.tags.map(tag => (
                <span 
                  key={tag}
                  className="px-3 py-1 bg-indigo-100 text-indigo-700 text-sm rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
          
          <div className="prose prose-lg max-w-none">
            <div className="bg-blue-50 border-l-4 border-blue-400 p-6 mb-8">
              <div className="flex">
                <div className="ml-3">
                  <p className="text-sm text-blue-700">
                    <strong>Quick Overview:</strong> This comprehensive guide covers practical AI tools and strategies 
                    that can save you hours of work each week while improving your teaching effectiveness.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-3">What You'll Learn</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Time-saving AI tools for everyday teaching</li>
                  <li>• Practical implementation strategies</li>
                  <li>• Best practices for classroom integration</li>
                  <li>• Safety and privacy considerations</li>
                </ul>
              </div>
              
              <div className="bg-indigo-50 p-6 rounded-lg">
                <h3 className="font-semibold text-indigo-900 mb-3">For Teachers Who Want</h3>
                <ul className="space-y-2 text-indigo-700">
                  <li>• More time for actual teaching</li>
                  <li>• Streamlined administrative tasks</li>
                  <li>• Enhanced student engagement</li>
                  <li>• Professional development in AI</li>
                </ul>
              </div>
            </div>

            <p className="text-gray-700 leading-relaxed text-lg">
              This resource is part of our comprehensive collection of {(post.category || 'educational')?.toLowerCase()} guides designed 
              specifically for educators. Each guide is crafted by experienced teachers and education technology specialists 
              to ensure practical, classroom-ready solutions.
            </p>
          </div>
          
          <div className="mt-12 p-6 bg-indigo-50 rounded-lg">
            <h3 className="font-semibold text-indigo-900 mb-3 text-lg">
              Ready to Transform Your Teaching?
            </h3>
            <p className="text-indigo-700 mb-4">
              Join thousands of educators already using AI to enhance their classroom impact.
            </p>
            <Link 
              href={`/${locale}/signup`}
              className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700"
            >
              Get Started Today →
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}