import { setRequestLocale } from 'next-intl/server';
import { blogPosts } from '../../../../blog-posts-data';
import Link from 'next/link';
import { BlogPost } from '../../../../blog-posts-data';
import BlogPageClient from '../../../components/blog/BlogPageClient';

type Props = {
  params: Promise<{locale: string}>;
};

export default async function BlogPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const posts = blogPosts || [];
  
  // Get featured post for hero section
  const featuredPost = posts.find(post => post.featured) || posts[0];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Featured Post */}
      <div className="bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left: Hero Content */}
            <div>
              <h1 className="text-6xl font-bold mb-6 leading-tight">
                Transform Your Teaching with AI
              </h1>
              <p className="text-xl opacity-90 mb-8 leading-relaxed">
                Join thousands of educators saving 10+ hours weekly with practical AI strategies, proven classroom techniques, and expert insights.
              </p>
              <div className="flex gap-4">
                <Link href={`/${locale}/blog/${featuredPost?.slug || featuredPost?.id}`} 
                      className="bg-white text-purple-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors">
                  Read Latest Post →
                </Link>
                <button className="border-2 border-white px-8 py-4 rounded-full font-semibold hover:bg-white/10 transition-colors">
                  Subscribe Free
                </button>
              </div>
            </div>
            
            {/* Right: Featured Post Card */}
            {featuredPost && (
              <div className="bg-white/95 backdrop-blur rounded-2xl p-8 shadow-2xl">
                <div className="flex items-center gap-3 mb-4">
                  <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    ⭐ Featured
                  </span>
                  <span className="text-purple-600 font-medium">{featuredPost.readingTime || '5 min read'}</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{featuredPost.title}</h3>
                <p className="text-gray-600 mb-6">{featuredPost.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">
                    By {typeof featuredPost.author === 'string' ? featuredPost.author : featuredPost.author.name}
                  </span>
                  <Link href={`/${locale}/blog/${featuredPost.slug || featuredPost.id}`} 
                        className="text-purple-600 font-semibold hover:text-purple-700">
                    Read More →
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Client-side Blog Content */}
      <BlogPageClient posts={posts} locale={locale} featuredPost={featuredPost} />
    </div>
  );
}