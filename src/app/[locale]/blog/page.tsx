import { setRequestLocale } from 'next-intl/server';
import Link from 'next/link';
import { Star, BookOpen, Clock, Users } from 'lucide-react';
import { blogPosts, getFeaturedPosts, getRecentPosts, getAllCategories, getAllTags, getAllAuthors } from '../../../../blog-posts-data';
import BlogPageClient from './blog-page-client';

type Props = {
  params: Promise<{locale: string}>;
};

export default async function BlogPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const allPosts = blogPosts;
  const categories = getAllCategories();
  const tags = getAllTags();
  const authors = getAllAuthors();

  return (
    <BlogPageClient 
      allPosts={allPosts}
      categories={categories}
      tags={tags}
      authors={authors}
      locale={locale}
    />
  );
}