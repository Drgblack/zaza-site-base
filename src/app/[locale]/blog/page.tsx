import { setRequestLocale } from 'next-intl/server';
import { getAllBlog2Posts } from "@/lib/blog2.server";
import NetflixRailClient from "@/components/blog2/NetflixRailClient";
import BuildStamp from "@/components/BuildStamp";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI in Education Blog - Zaza Promptly',
  description: 'Insights, strategies, and real-world examples from educators transforming their classrooms with AI.',
  keywords: ['AI education blog', 'teacher resources', 'parent communication', 'educational technology', 'teaching tips'],
  openGraph: {
    title: 'AI in Education Blog - Zaza Promptly',
    description: 'Insights, strategies, and real-world examples from educators transforming their classrooms with AI.',
    type: 'website',
    images: ['/images/blog/og-blog.jpg']
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI in Education Blog - Zaza Promptly',
    description: 'Insights, strategies, and real-world examples from educators transforming their classrooms with AI.'
  }
};

export const dynamic = "force-static"; // ok to SSG

type Props = {
  params: Promise<{locale: string}>;
  searchParams: Promise<{category?: string; search?: string}>;
};

export default async function BlogPage({ params, searchParams }: Props) {
  const { locale } = await params;
  const { category, search } = await searchParams;
  
  setRequestLocale(locale);

  const posts = getAllBlog2Posts();
  
  // Group posts for rails
  const featuredPosts = posts.filter(p => p.featured);
  const recentPosts = posts.filter(p => new Date(p.date) > new Date(Date.now() - 14*24*60*60*1000));
  
  return (
    <>
      <div className="min-h-screen bg-white">
        {/* Enhanced blog banner */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
          <div className="max-w-6xl mx-auto px-4 py-4 text-center">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  <span className="text-lg">✨</span>
                </div>
                <span className="font-semibold">New Enhanced Blog Experience!</span>
              </div>
              <a 
                href="/en/blog/enhanced" 
                className="inline-flex items-center gap-2 bg-white text-purple-600 px-6 py-2 rounded-full font-semibold hover:bg-purple-50 transition-colors"
              >
                Try it now →
              </a>
            </div>
          </div>
        </div>
        
        {/* Header */}
        <div className="relative mx-auto max-w-6xl px-4 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 md:text-6xl">
              AI in Education Blog
            </h1>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
              Insights, strategies, and real-world examples from educators transforming their classrooms with AI.
            </p>
          </div>
        </div>

        {/* Rails */}
        <NetflixRailClient title="Editor's Picks" posts={featuredPosts.length ? featuredPosts : posts.slice(0, 8)} railId="featured" />
        <NetflixRailClient title="New This Week" posts={recentPosts.length ? recentPosts : posts.slice(0, 8)} railId="recent" />
        <NetflixRailClient title="Teacher Tips" posts={posts.filter(p => p.category === 'Teacher Tips').slice(0, 8)} railId="teacher-tips" />
        <NetflixRailClient title="Productivity" posts={posts.filter(p => p.category === 'Productivity').slice(0, 8)} railId="productivity" />
        <NetflixRailClient title="Parent Communication" posts={posts.filter(p => p.category === 'Parent Communication').slice(0, 8)} railId="parent-comm" />
        <NetflixRailClient title="Most Popular" posts={posts.slice(0, 8)} railId="popular" />

      </div>
      
      <div className="max-w-6xl mx-auto px-4"><BuildStamp /></div>
    </>
  );
}