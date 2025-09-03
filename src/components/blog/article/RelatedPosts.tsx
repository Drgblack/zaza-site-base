import { getAllPosts } from "@/lib/blog.server";
import PostCard from "../PostCard";

interface RelatedPostsProps {
  currentSlug: string;
  category?: string;
  locale?: string;
}

export default function RelatedPosts({ currentSlug, category, locale = "en" }: RelatedPostsProps) {
  const allPosts = getAllPosts();
  
  // Filter out current post
  const otherPosts = allPosts.filter(post => post.slug !== currentSlug);
  
  // Get posts from same category first
  const sameCategory = category 
    ? otherPosts.filter(post => post.category === category)
    : [];
  
  // Fill remaining slots with recent posts
  const recentPosts = otherPosts
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  
  // Combine and dedupe, take first 4
  const relatedPosts = [
    ...sameCategory.slice(0, 2),
    ...recentPosts.filter(post => !sameCategory.includes(post))
  ].slice(0, 4);

  if (relatedPosts.length === 0) {
    return null;
  }

  return (
    <section className="mt-16 pt-16 border-t border-gray-200">
      <h2 className="text-2xl font-bold text-gray-900 mb-8">
        Related Articles
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {relatedPosts.map((post) => (
          <div key={post.slug} className="w-full">
            <PostCard post={post} locale={locale} />
          </div>
        ))}
      </div>
    </section>
  );
}