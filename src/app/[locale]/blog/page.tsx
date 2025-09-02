import { setRequestLocale } from 'next-intl/server';
import { getAllPosts, getAllCategories, getFeaturedPosts } from '@/lib/blog-mdx';
import { BlogGrid } from '@/components/blog/blog-grid';
import { BlogFilters } from '@/components/blog/blog-filters';
import { BlogHero } from '@/components/blog/blog-hero';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI in Education Blog - Zaza Promptly',
  description: 'Discover expert insights on AI tools for teachers, parent communication strategies, and educational technology that saves time and improves outcomes.',
  keywords: ['AI education blog', 'teacher resources', 'parent communication', 'educational technology', 'teaching tips'],
};

type Props = {
  params: Promise<{locale: string}>;
  searchParams: Promise<{category?: string; tag?: string}>;
};

export default async function BlogPage({ params, searchParams }: Props) {
  const { locale } = await params;
  const { category, tag } = await searchParams;
  setRequestLocale(locale);

  const [allPosts, categories, featuredPosts] = await Promise.all([
    getAllPosts(locale),
    getAllCategories(locale),
    getFeaturedPosts(locale)
  ]);

  // Filter posts based on search params
  let filteredPosts = allPosts;
  
  if (category && category !== 'all') {
    filteredPosts = filteredPosts.filter(post => post.category === category);
  }
  
  if (tag) {
    filteredPosts = filteredPosts.filter(post => post.tags.includes(tag));
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <BlogHero featuredPosts={featuredPosts.slice(0, 3)} />
      
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4 text-center">
            AI in Education Blog
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 text-center max-w-3xl mx-auto">
            Expert insights on using AI tools effectively in education, improving parent communication, and saving time with smart teaching strategies.
          </p>
        </div>

        <BlogFilters 
          categories={categories}
          selectedCategory={category}
          selectedTag={tag}
        />

        <BlogGrid 
          posts={filteredPosts}
          showLoadMore={filteredPosts.length >= 9}
        />
      </div>
    </div>
  );
}