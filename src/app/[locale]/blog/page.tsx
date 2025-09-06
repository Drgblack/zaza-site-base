import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import { getAllTeacherBlogPosts, getFilterOptions } from '@/lib/blog/static-teacher-blog-service';
import TeacherBlogPageClient from './teacher-blog-page-client';

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
  const [posts, availableFilters] = await Promise.all([
    getAllTeacherBlogPosts(),
    getFilterOptions()
  ]);

  return (
    <TeacherBlogPageClient 
      locale={locale}
      initialPosts={posts}
      availableFilters={availableFilters}
    />
  );
}