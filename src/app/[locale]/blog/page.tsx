import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { getAllPosts } from '@/lib/blog2.server';
import Image from 'next/image';
import { Clock, User, Calendar } from 'lucide-react';
import { NewsletterForm } from './newsletter-form';
import BlogSearchClient from '@/components/blog/BlogSearchClient';

export const dynamic = "error";
export const revalidate = false;

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

      {/* Blog Posts Grid with Search */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <BlogSearchClient posts={allPosts} />
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
          <NewsletterForm locale={locale} />
        </div>
      </div>
    </div>
  );
}