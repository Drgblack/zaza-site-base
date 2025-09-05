import { setRequestLocale } from 'next-intl/server';
import { getAllBlogPosts, getFeaturedBlogPosts, getBlogStats } from '@/lib/blog/service';
import BlogHero from '@/components/blog/BlogHero';
import BlogGrid from '@/components/blog/BlogGrid';
import BlogSidebar from '@/components/blog/BlogSidebar';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog | Zaza Promptly - AI-Powered Teaching Resources',
  description: 'Discover practical AI tools, teaching strategies, and expert insights to transform your classroom. Join thousands of educators saving time with AI.',
  keywords: [
    'AI education blog',
    'teaching with AI', 
    'teacher resources',
    'classroom management',
    'educational technology',
    'teaching strategies',
    'AI tools for teachers'
  ],
  openGraph: {
    title: 'Transform Your Teaching with AI | Zaza Blog',
    description: 'Discover practical AI tools and teaching strategies from education experts.',
    type: 'website',
    images: ['/images/og/blog-hero.jpg']
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Transform Your Teaching with AI | Zaza Blog',
    description: 'Discover practical AI tools and teaching strategies from education experts.'
  }
};

type Props = {
  params: Promise<{locale: string}>;
  searchParams: Promise<{
    category?: string;
    search?: string;
    tag?: string;
    level?: string;
  }>;
};

export default async function BlogPage({ params, searchParams }: Props) {
  const { locale } = await params;
  const { category, search, tag, level } = await searchParams;
  
  setRequestLocale(locale);

  // Fetch all blog data
  const [allPosts, featuredPosts, blogStats] = await Promise.all([
    getAllBlogPosts(),
    getFeaturedBlogPosts(3),
    getBlogStats()
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <BlogHero 
        featuredPosts={featuredPosts}
        stats={blogStats}
      />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Blog Content */}
          <div className="lg:col-span-3">
            <BlogGrid 
              posts={allPosts}
              filters={{
                category,
                search,
                tags: tag ? [tag] : undefined,
                teacherLevel: level as any
              }}
            />
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <BlogSidebar 
              posts={allPosts}
              currentFilters={{
                category,
                search,
                tag,
                level
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}