import { setRequestLocale } from 'next-intl/server';
import { getAllPosts } from "@/lib/blog.server";
import BlogPageClient from "@/components/blog/BlogPageClient";
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

  const posts = getAllPosts();
  const featured = posts.find(p => p.featured) ?? posts[0] ?? null;

  // build rails (arrays) server-side
  const by = (cat: string) => posts.filter(p => p.category === cat);
  const daysAgo = (n: number) => {
    const d = new Date(); d.setDate(d.getDate() - n); return d.toISOString();
  };
  const newThisWeek = posts.filter(p => p.date >= daysAgo(14));
  const editors = posts.filter(p => p.featured);

  const rows = [
    { title: "Editor's Picks", posts: editors },
    { title: "New This Week", posts: newThisWeek },
    { title: "Teacher Tips", posts: by("Teacher Tips") },
    { title: "Productivity", posts: by("Productivity") },
    { title: "Parent Communication", posts: by("Parent Communication") },
    { title: "Wellbeing", posts: by("Wellbeing") },
    { title: "Most Popular", posts }, // replace with popularity later
  ].filter(row => row.posts.length > 0);

  return (
    <BlogPageClient
      locale={locale}
      featured={featured}
      allPosts={posts}
      rows={rows}
      initialCategory={category}
      initialSearch={search}
    />
  );
}