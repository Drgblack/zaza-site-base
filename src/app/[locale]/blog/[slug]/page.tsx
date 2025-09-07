import Link from 'next/link';
import { getBlogPostById, blogPosts } from '../../../../../blog-posts-data';
import ModernBlogTemplate from '../../../../components/blog/ModernBlogTemplate';

export default function BlogPostPage({ params }: { params: { locale: string; slug: string } }) {
  const { locale, slug } = params;
  const post = getBlogPostById(slug);

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Post Not Found</h1>
          <Link href={`/${locale}/blog`} className="text-indigo-600 hover:text-indigo-700">
            ← Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  // Get related posts based on category and tags
  const relatedPosts = blogPosts
    .filter(p => p.id !== post.id && (
      p.category === post.category ||
      p.tags?.some(tag => post.tags?.includes(tag))
    ))
    .sort((a, b) => {
      // Prioritize same category
      if (a.category === post.category && b.category !== post.category) return -1;
      if (b.category === post.category && a.category !== post.category) return 1;
      
      // Then by tag overlap
      const aTagOverlap = a.tags?.filter(tag => post.tags?.includes(tag)).length || 0;
      const bTagOverlap = b.tags?.filter(tag => post.tags?.includes(tag)).length || 0;
      return bTagOverlap - aTagOverlap;
    })
    .slice(0, 3);

  return (
    <ModernBlogTemplate 
      post={post} 
      relatedPosts={relatedPosts} 
      locale={locale} 
    />
  );
}