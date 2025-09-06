import { setRequestLocale } from 'next-intl/server';
import { blogPosts, getAllCategories } from '../../../../blog-posts-data';
import BlogPageClient from './blog-page-client';

type Props = {
  params: Promise<{locale: string}>;
};

export default async function BlogPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const posts = blogPosts;
  const categories = getAllCategories();

  return (
    <BlogPageClient 
      posts={posts}
      categories={categories}
      locale={locale}
    />
  );
}