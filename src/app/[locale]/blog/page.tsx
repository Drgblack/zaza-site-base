import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import EnhancedBlogHero from '@/components/blog/enhanced-blog-hero';
import BlogPageClient from '@/components/blog/blog-page-client';
import { getAllBlog2Posts } from '@/lib/blog2.server';

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
    images: ['/images/blog/enhanced-og-blog.jpg'],
  },
};

type Props = {
  params: Promise<{locale: string}>;
  searchParams?: Promise<{
    category?: string;
    search?: string;
  }>;
};

export default async function BlogPage({params, searchParams}: Props) {
  const {locale} = await params;
  setRequestLocale(locale);
  
  const sp = await searchParams || {};
  const initialCategory = sp.category;
  const initialSearch = sp.search;

  // Get all posts using the Gold blog system
  const allPosts = getAllBlog2Posts();
  const publishedPosts = allPosts.filter(post => post.featured !== false); // Show all unless explicitly hidden
  
  // Get featured posts (first 3 for hero carousel)
  const featuredPosts = publishedPosts.filter(post => post.featured).slice(0, 3);
  if (featuredPosts.length === 0 && publishedPosts.length > 0) {
    // Fallback: use first 3 posts if no featured posts
    featuredPosts.push(...publishedPosts.slice(0, 3));
  }

  // Create category-based rows for the Gold UI
  const rows = [
    {
      title: "Teacher Tips",
      posts: publishedPosts.filter(p => p.category === "Teacher Tips").slice(0, 6)
    },
    {
      title: "Productivity", 
      posts: publishedPosts.filter(p => p.category === "Productivity").slice(0, 6)
    },
    {
      title: "Parent Communication",
      posts: publishedPosts.filter(p => p.category === "Parent Communication").slice(0, 6)
    },
    {
      title: "AI Tools",
      posts: publishedPosts.filter(p => p.category === "AI Tools").slice(0, 6)
    }
  ].filter(row => row.posts.length > 0); // Only show categories that have posts

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Enhanced Hero with Carousel */}
      <EnhancedBlogHero 
        featuredPosts={featuredPosts}
        totalPosts={publishedPosts.length}
        recentCount={publishedPosts.filter(p => {
          const postDate = new Date(p.date);
          const weekAgo = new Date();
          weekAgo.setDate(weekAgo.getDate() - 7);
          return postDate > weekAgo;
        }).length}
      />
      
      {/* Main Blog Content */}
      <BlogPageClient
        locale={locale}
        featured={featuredPosts[0] || null}
        allPosts={publishedPosts}
        rows={rows}
        initialCategory={initialCategory}
        initialSearch={initialSearch}
      />
    </div>
  );
}