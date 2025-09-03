import { getAllBlog2Posts } from "@/lib/blog2.server";
import PostCard2 from "./PostCard2";

interface RelatedPosts2Props {
  currentSlug: string;
  category: string;
}

export default function RelatedPosts2({ currentSlug, category }: RelatedPosts2Props) {
  const allPosts = getAllBlog2Posts();
  
  // Get related posts: same category first, then recent posts
  const categoryPosts = allPosts
    .filter(p => p.slug !== currentSlug && p.category === category)
    .slice(0, 3);
  
  const recentPosts = allPosts
    .filter(p => p.slug !== currentSlug && !categoryPosts.includes(p))
    .slice(0, 3 - categoryPosts.length);
  
  const relatedPosts = [...categoryPosts, ...recentPosts].slice(0, 3);
  
  if (relatedPosts.length === 0) {
    return null;
  }

  return (
    <section className="mt-16">
      <h2 className="text-2xl font-bold mb-8">Related posts</h2>
      <div className="flex gap-6 overflow-x-auto pb-4">
        {relatedPosts.map((post) => (
          <PostCard2 key={post.slug} post={post} />
        ))}
      </div>
    </section>
  );
}