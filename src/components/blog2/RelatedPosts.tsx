import { getAllBlog2Posts } from "@/lib/blog2.server";
import PostCard2 from "@/components/blog2/PostCard2";

interface RelatedPostsProps {
  currentSlug: string;
  category: string;
}

export default function RelatedPosts({ currentSlug, category }: RelatedPostsProps) {
  const allPosts = getAllBlog2Posts();
  
  // Get posts from same category, excluding current
  let relatedPosts = allPosts
    .filter(p => p.slug !== currentSlug && p.category === category)
    .slice(0, 3);
  
  // If not enough in category, fill with recent posts
  if (relatedPosts.length < 3) {
    const recentPosts = allPosts
      .filter(p => p.slug !== currentSlug && !relatedPosts.some(r => r.slug === p.slug))
      .slice(0, 3 - relatedPosts.length);
    relatedPosts = [...relatedPosts, ...recentPosts];
  }
  
  if (relatedPosts.length === 0) return null;
  
  return (
    <section className="border-t pt-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
        Related Articles
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {relatedPosts.map(post => (
          <PostCard2 key={post.slug} post={post} basePath="blog2" />
        ))}
      </div>
    </section>
  );
}