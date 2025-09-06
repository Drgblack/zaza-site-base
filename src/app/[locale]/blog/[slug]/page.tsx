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
            {post.excerpt && (
              <div className="bg-blue-50 border-l-4 border-blue-400 p-6 mb-8">
                <div className="flex">
                  <div className="ml-3">
                    <p className="text-sm text-blue-700">
                      <strong>Quick Overview:</strong> {post.excerpt}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Display actual blog content if available */}
            {post.content ? (
              <div 
                className="prose prose-lg prose-headings:text-gray-900 prose-p:text-gray-700 prose-strong:text-gray-900 prose-ul:text-gray-700 prose-ol:text-gray-700 prose-a:text-indigo-600 prose-code:text-indigo-600 prose-code:bg-indigo-50 prose-code:px-1 prose-code:rounded max-w-none"
                dangerouslySetInnerHTML={{ 
                  __html: post.content
                    .split('\n')
                    .map(line => {
                      // Convert markdown headers
                      if (line.startsWith('### ')) {
                        return `<h3 class="text-xl font-semibold text-gray-900 mt-8 mb-4">${line.substring(4)}</h3>`;
                      } else if (line.startsWith('## ')) {
                        return `<h2 class="text-2xl font-semibold text-gray-900 mt-10 mb-6">${line.substring(3)}</h2>`;
                      } else if (line.startsWith('# ')) {
                        return `<h1 class="text-3xl font-bold text-gray-900 mt-12 mb-8">${line.substring(2)}</h1>`;
                      }
                      // Convert bold text
                      else if (line.includes('**') && line.trim() !== '') {
                        const boldConverted = line.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-gray-900">$1</strong>');
                        return `<p class="text-gray-700 leading-relaxed mb-4">${boldConverted}</p>`;
                      }
                      // Convert list items
                      else if (line.startsWith('- ')) {
                        return `<li class="text-gray-700 mb-2">${line.substring(2)}</li>`;
                      }
                      // Regular paragraphs
                      else if (line.trim() !== '') {
                        return `<p class="text-gray-700 leading-relaxed mb-4">${line}</p>`;
                      }
                      // Empty lines
                      else {
                        return '<br />';
                      }
                    })
                    .join('')
                }}
              />
            ) : (
              // Fallback to existing content structure if no full content available
              <div className="text-gray-700 leading-relaxed text-lg space-y-6">
              {/* Main content description */}
              <div className="text-xl leading-relaxed">
                {post.description || post.excerpt}
              </div>
              
              {/* Additional excerpt if different from description */}
              {post.excerpt && post.excerpt !== post.description && (
                <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-400">
                  <p className="text-blue-800 font-medium">{post.excerpt}</p>
                </div>
              )}

              {/* Category-specific content */}
              {post.category === 'AI Tools' && (
                <div className="bg-purple-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-purple-900 mb-3">What You'll Discover:</h3>
                  <ul className="space-y-2 text-purple-700">
                    <li>• Cutting-edge AI tools specifically designed for educators</li>
                    <li>• Step-by-step implementation guides with screenshots</li>
                    <li>• Time-saving automation techniques</li>
                    <li>• Safety and privacy best practices for educational AI</li>
                  </ul>
                </div>
              )}

              {post.category === 'Parent Communication' && (
                <div className="bg-green-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-green-900 mb-3">Communication Strategies Include:</h3>
                  <ul className="space-y-2 text-green-700">
                    <li>• Proven scripts for difficult conversations</li>
                    <li>• Email templates that build trust and collaboration</li>
                    <li>• De-escalation techniques for tense situations</li>
                    <li>• Professional language that shows empathy and authority</li>
                  </ul>
                </div>
              )}

              {post.category === 'Teacher Tips' && (
                <div className="bg-orange-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-orange-900 mb-3">Teaching Excellence Features:</h3>
                  <ul className="space-y-2 text-orange-700">
                    <li>• Classroom-tested strategies from experienced educators</li>
                    <li>• Time management techniques that actually work</li>
                    <li>• Student engagement methods with proven results</li>
                    <li>• Work-life balance tips for sustainable teaching</li>
                  </ul>
                </div>
              )}

              {(!post.category || !['AI Tools', 'Parent Communication', 'Teacher Tips'].includes(post.category)) && (
                <div className="bg-indigo-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-indigo-900 mb-3">Key Benefits:</h3>
                  <ul className="space-y-2 text-indigo-700">
                    <li>• Evidence-based educational strategies</li>
                    <li>• Practical implementation guidance</li>
                    <li>• Professional development insights</li>
                    <li>• Real-world classroom applications</li>
                  </ul>
                </div>
              )}

              {/* Reading time and author info */}
              {(post.readingTime || post.readTime) && (
                <div className="bg-gray-100 p-4 rounded-lg text-center">
                  <p className="text-gray-600">
                    <strong>Estimated reading time:</strong> {post.readingTime || post.readTime}
                  </p>
                  {typeof post.author === 'object' && post.author.bio && (
                    <p className="text-sm text-gray-500 mt-2">
                      By {post.author.name} - {post.author.bio}
                    </p>
                  )}
                </div>
              )}

              {/* SEO keywords */}
              {post.seoKeywords && post.seoKeywords.length > 0 && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-600 text-sm">
                    <strong>Related topics:</strong> {post.seoKeywords.join(', ')}
                  </p>
                </div>
              )}
            </div>
            )}
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