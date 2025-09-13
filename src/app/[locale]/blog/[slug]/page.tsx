import type { Metadata } from 'next';
import {Link} from '@/i18n/routing';
import { notFound } from 'next/navigation';
import { getPostBySlug, getAllSlugs } from '@/lib/blog2.server';

type Props = {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
};

export const dynamic = 'force-static';
export const revalidate = 3600;
export const dynamicParams = true;

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map(slug => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  
  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: `${post.title} | Zaza Promptly Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      authors: ['Zaza Team'],
      images: post.image ? [post.image] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Breadcrumb Navigation */}
        <nav className="mb-8">
          <Link 
            href="/blog"
            className="text-purple-600 hover:text-purple-700 font-medium flex items-center"
          >
            ← Back to Blog
          </Link>
        </nav>

        {/* Article Header */}
        <header className="mb-12">
          <div className="flex items-center gap-4 mb-4">
            <span className="inline-block bg-purple-100 text-purple-800 text-sm font-medium px-3 py-1 rounded-full">
              Education
            </span>
            <span className="text-sm text-gray-500">5 min read</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {post.title}
          </h1>
          
          <p className="text-xl text-gray-600 mb-8">
            {post.excerpt}
          </p>
          
          <div className="flex items-center justify-between border-t border-b border-gray-200 py-4">
            <div className="text-sm text-gray-600">
              By <span className="font-medium text-gray-900">Zaza Team</span>
            </div>
            <time className="text-sm text-gray-600" dateTime={post.date}>
              {post.date ? new Date(post.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              }) : 'Recent'}
            </time>
          </div>
        </header>

        {/* Cover Image */}
        {post.image && (
          <div className="mb-12">
            <img 
              src={post.image} 
              alt={`Cover image for ${post.title}`}
              className="w-full rounded-2xl shadow-lg"
            />
          </div>
        )}

        {/* Article Content */}
        <div className="prose prose-lg max-w-none">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            {/* Simplified content rendering - showing excerpt for now */}
            <div className="space-y-4 text-gray-700">
              <p className="leading-relaxed">
                {post.excerpt || 'This comprehensive guide explores the latest AI tools and techniques for modern educators. Learn how to transform your teaching practice with cutting-edge artificial intelligence solutions designed specifically for classroom use.'}
              </p>
              <p className="leading-relaxed">
                Transform your lesson planning, student engagement, and administrative tasks with AI-powered tools that understand the unique challenges of education. This guide covers practical strategies you can implement immediately.
              </p>
            </div>
          </div>
        </div>

        {/* Author Bio */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mt-12">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            About the Author
          </h3>
          <p className="text-gray-600">
            The Zaza Team consists of passionate educators and AI advocates helping teachers 
            transform their classrooms with innovative technology.
          </p>
        </div>

        {/* Newsletter CTA */}
        <div className="bg-purple-50 rounded-2xl p-8 text-center mt-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Get More Teaching Tips
          </h3>
          <p className="text-gray-600 mb-6">
            Join thousands of educators receiving weekly AI teaching insights.
          </p>
          <Link 
            href="/"
            className="inline-block bg-purple-600 text-white py-3 px-8 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
          >
            Try Zaza Promptly Free
          </Link>
        </div>
      </div>
    </article>
  );
}