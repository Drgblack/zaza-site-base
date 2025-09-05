import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import { getAllBlogPosts, getAllCategories } from '@/lib/blog/final-blog-service';
import BlogPageClient from './blog-page-client';

export const metadata: Metadata = {
  title: 'Blog | Zaza Promptly',
  description: 'Save time, teach better, and stay ahead with practical guides and AI-powered strategies for modern educators.',
};

type Props = {
  params: Promise<{locale: string}>;
};

export default async function BlogPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  // Fetch data server-side
  const [posts, categories] = await Promise.all([
    getAllBlogPosts(),
    getAllCategories()
  ]);

  return <BlogPageClient posts={posts} categories={categories} locale={locale} />;
}