import { BlogPost } from '@/lib/blog/types';
import BlogCard from './BlogCard';

interface RelatedPostsProps {
  posts: BlogPost[];
}

export default function RelatedPosts({ posts }: RelatedPostsProps) {
  if (posts.length === 0) {
    return null;
  }

  return (
    <section>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Articles</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <BlogCard 
            key={post.id} 
            post={post}
            variant="default"
            showExcerpt={true}
          />
        ))}
      </div>
    </section>
  );
}