import { setRequestLocale } from 'next-intl/server';
import { FeaturedBlogCard } from '@/components/site/featured-blog-card';
import { BlogCarousel } from '@/components/site/blog-carousel';
import { getFeaturedPost, getPostsByCategory, getAllCategories } from '@/lib/blog-data';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog - AI in Education Insights',
  description: 'Discover the latest insights, tips, and strategies for using AI in education. Learn from educators who are transforming their classrooms with artificial intelligence.',
  keywords: ['AI education blog', 'teaching with AI', 'education technology', 'AI tools for teachers', 'classroom innovation'],
};

type Props = {
  params: Promise<{locale: string}>;
};

export default async function BlogPage({params}: Props) {
  const {locale} = await params;
  setRequestLocale(locale);
  
  const featuredPost = getFeaturedPost();
  const categories = getAllCategories();

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-br from-purple-50 via-pink-50/30 to-blue-50/30 dark:from-purple-900/20 dark:via-pink-900/10 dark:to-blue-900/10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              AI in Education Blog
            </h1>
            <p className="mt-6 text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Insights, strategies, and real-world examples from educators transforming their classrooms with AI
            </p>
          </div>
        </div>
      </section>

      {/* Featured Article */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <FeaturedBlogCard post={featuredPost} locale={locale} />
        </div>
      </section>

      {/* Categorized Carousels */}
      <section className="py-8 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          {categories.map((category) => {
            const categoryPosts = getPostsByCategory(category);
            if (categoryPosts.length === 0) return null;
            
            return (
              <BlogCarousel
                key={category}
                title={category}
                posts={categoryPosts}
                locale={locale}
              />
            );
          })}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Never Miss an Update
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Get the latest AI in education insights delivered to your inbox weekly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 border-0 focus:ring-2 focus:ring-purple-300"
            />
            <button className="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Subscribe
            </button>
          </div>
          <p className="text-sm opacity-75 mt-4">
            Join 10,000+ educators already subscribed. Unsubscribe anytime.
          </p>
        </div>
      </section>

      {/* Browse All Articles */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Looking for Something Specific?</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            Browse our complete archive of articles, tutorials, and insights.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                className="bg-purple-100 dark:bg-purple-800 text-purple-700 dark:text-purple-300 px-4 py-2 rounded-full text-sm font-medium hover:bg-purple-200 dark:hover:bg-purple-700 transition-colors"
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}