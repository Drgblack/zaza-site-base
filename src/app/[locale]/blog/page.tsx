import { setRequestLocale } from 'next-intl/server';
import { getAllPosts, getAllCategories, getFeaturedPosts } from '@/lib/blog-mdx';
import { BlogGrid } from '@/components/blog/blog-grid';
import { BlogFilters } from '@/components/blog/blog-filters';
import { BlogHero } from '@/components/blog/blog-hero';
import { ZaraModule } from '@/components/site/zara-module';
import { CrossAppCTA } from '@/components/site/cross-app-cta';
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

  try {
    const [allPosts, categories, featuredPosts] = await Promise.all([
      getAllPosts(locale),
      getAllCategories(locale),
      getFeaturedPosts(locale)
    ]);

    // Ensure we have valid data
    const safePosts = allPosts || [];
    const safeCategories = categories || [];
    const safeFeaturedPosts = featuredPosts || [];

    // Filter posts based on search params
    let filteredPosts = safePosts;
    
    if (category && category !== 'all') {
      filteredPosts = filteredPosts.filter(post => post.category === category);
    }
    
    if (tag) {
      filteredPosts = filteredPosts.filter(post => 
        post.tags && Array.isArray(post.tags) && post.tags.includes(tag)
      );
    }

    // Extract all unique tags from posts for the filters
    const allTags = safePosts.reduce((tags: string[], post) => {
      if (post.tags && Array.isArray(post.tags)) {
        post.tags.forEach(tag => {
          if (!tags.includes(tag)) {
            tags.push(tag);
          }
        });
      }
      return tags;
    }, []);

    return (
      <div className="min-h-screen bg-black">
        {/* Netflix-style Hero - only show if we have featured posts */}
        {safeFeaturedPosts.length > 0 && (
          <BlogHero featuredPosts={safeFeaturedPosts.slice(0, 5)} />
        )}
        
        {/* Netflix-style Filters */}
        <BlogFilters 
          categories={safeCategories}
          tags={allTags}
          selectedCategory={category}
          selectedTag={tag}
          totalPosts={safePosts.length}
        />

        {/* Netflix-style Grid */}
        <BlogGrid 
          posts={filteredPosts}
          showLoadMore={filteredPosts.length >= 12}
        />

        {/* Bottom CTA Section */}
        <div className="bg-black py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <ZaraModule 
                  variant="compact"
                  context="blog"
                  title="Ask Zara"
                  description="Get help with teaching challenges"
                  placeholder="Ask about AI tools, parent communication, or classroom management..."
                />
              </div>
              
              <div>
                <CrossAppCTA 
                  from="promptly"
                  variant="compact"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error loading blog page:', error);
    
    // Fallback UI
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Blog Temporarily Unavailable</h1>
          <p className="text-gray-400 mb-6">We're working to restore the blog. Please try again shortly.</p>
          <a 
            href="/" 
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg transition-colors"
          >
            Return Home
          </a>
        </div>
      </div>
    );
  }
}