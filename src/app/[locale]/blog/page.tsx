import { setRequestLocale } from 'next-intl/server';
import BlogPageClient from '@/components/blog/BlogPageClient';
import { 
  getAllPosts, 
  getFeaturedPost, 
  getPostsByCategory, 
  getRecentPosts, 
  getPopularPosts, 
  getEditorsPicks 
} from '@/lib/blog';
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

type Props = {
  params: Promise<{locale: string}>;
  searchParams: Promise<{category?: string; search?: string}>;
};

export default async function BlogPage({ params, searchParams }: Props) {
  const { locale } = await params;
  const { category, search } = await searchParams;
  
  setRequestLocale(locale);

  // Fetch all data on the server
  const allPosts = getAllPosts();
  const featuredPost = getFeaturedPost();
  
  // Organize posts into rows (server-side)
  const editorsPicks = getEditorsPicks().filter(p => p.slug !== featuredPost?.slug);
  const recent = getRecentPosts(14).filter(p => p.slug !== featuredPost?.slug);
  const popular = getPopularPosts().filter(p => p.slug !== featuredPost?.slug);
  const teacherTips = getPostsByCategory("Teacher Tips").filter(p => p.slug !== featuredPost?.slug);
  const productivity = getPostsByCategory("Productivity").filter(p => p.slug !== featuredPost?.slug);
  const parentCommunication = getPostsByCategory("Parent Communication").filter(p => p.slug !== featuredPost?.slug);
  const wellbeing = getPostsByCategory("Wellbeing").filter(p => p.slug !== featuredPost?.slug);

  const rows = [
    { title: "Editor's Picks", posts: editorsPicks },
    { title: "New This Week", posts: recent },
    { title: "Teacher Tips", posts: teacherTips },
    { title: "Productivity", posts: productivity },
    { title: "Parent Communication", posts: parentCommunication },
    { title: "Wellbeing", posts: wellbeing },
    { title: "Most Popular", posts: popular },
  ].filter(row => row.posts.length > 0);

  return (
    <BlogPageClient 
      locale={locale}
      initialCategory={category}
      initialSearch={search}
      allPosts={allPosts}
      featuredPost={featuredPost}
      rows={rows}
    />
  );
}