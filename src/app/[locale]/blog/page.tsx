import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { getAllPosts } from '@/lib/blog2.server';
import Image from 'next/image';
import { Clock, User, Calendar } from 'lucide-react';

export const dynamic = 'force-static';
export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'AI in Education Blog - Zaza Promptly',
  description: 'Transform your teaching with AI-powered strategies, tips, and tools designed specifically for educators.',
  keywords: [
    'AI education blog', 
    'teacher resources', 
    'educational technology', 
    'teaching tips',
    'AI tools for teachers',
    'parent communication',
    'classroom management',
    'teacher productivity'
  ],
  openGraph: {
    title: 'AI in Education Blog - Zaza Promptly',
    description: 'Transform your teaching with AI-powered strategies, tips, and tools designed specifically for educators.',
    type: 'website',
    images: ['/images/blog/default.jpg'],
  },
};

type Props = {
  params: Promise<{locale: string}>;
};

export default async function BlogPage({params}: Props) {
  const {locale} = await params;
  setRequestLocale(locale);

  // Get all posts from the unified blog loader
  const allPosts = await getAllPosts();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(147,51,234,0.3),transparent_70%)]" />
        
        <div className="relative max-w-7xl mx-auto px-4 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              AI in Education Blog
            </h1>
            <p className="text-xl text-purple-100 max-w-3xl mx-auto mb-8">
              Transform your teaching with AI-powered strategies, tips, and tools designed specifically for educators.
            </p>
            
            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-8 mt-12">
              <div className="text-center">
                <div className="text-3xl font-bold text-white">{allPosts.length}</div>
                <div className="text-purple-200 text-sm">Expert Articles</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">12</div>
                <div className="text-purple-200 text-sm">Categories</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">5+</div>
                <div className="text-purple-200 text-sm">Weekly Updates</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Blog Posts Grid */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allPosts.map((post) => (
            <article key={post.slug} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group hover:-translate-y-1">
              {/* Post Image */}
              <div className="relative h-48 bg-gradient-to-r from-purple-100 to-blue-100">
                {post.image ? (
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-4xl">📚</div>
                  </div>
                )}
              </div>
              
              <div className="p-6">
                {/* Category & Reading Time */}
                <div className="flex items-center justify-between mb-3">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                    Education
                  </span>
                  <div className="flex items-center text-gray-500 text-sm">
                    <Clock className="w-4 h-4 mr-1" />
                    5 min read
                  </div>
                </div>
                
                {/* Title */}
                <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-purple-600 transition-colors">
                  {post.title}
                </h2>
                
                {/* Description */}
                <p className="text-gray-600 mb-4 line-clamp-3 text-sm leading-relaxed">
                  {post.excerpt || 'Transform your teaching with AI-powered tools and strategies...'}
                </p>
                
                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center text-sm text-gray-500">
                    <User className="w-4 h-4 mr-1" />
                    Zaza Team
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="w-4 h-4 mr-1" />
                    {post.date ? new Date(post.date).toLocaleDateString() : 'Recent'}
                  </div>
                </div>
                
                {/* Read More Link */}
                <Link 
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center mt-4 text-purple-600 hover:text-purple-700 font-medium text-sm group-hover:underline"
                >
                  Read More →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Stay Updated CTA */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Stay Updated
          </h2>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            Get the latest AI teaching tips, tools, and insights delivered to your inbox every week.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email"
              className="flex-1 px-6 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-300"
            />
            <button className="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-purple-50 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}