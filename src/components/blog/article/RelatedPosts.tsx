import { getAllPosts } from "@/lib/blog.server";
import PostCard from "@/components/blog/PostCard";

export default function RelatedPosts({ currentSlug, category }:{ currentSlug:string; category?:string }) {
  const posts = getAllPosts().filter(p => p.slug !== currentSlug);
  const rel = (category ? posts.filter(p => p.category === category) : posts).slice(0,4);
  if (!rel.length) return null;
  return (
    <div className="mt-6">
      <h3 className="mb-3 text-lg font-semibold">Related posts</h3>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        {rel.map(p => <PostCard key={p.slug} post={p} />)}
      </div>
    </div>
  );
}