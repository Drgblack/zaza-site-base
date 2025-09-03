import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { getAllPosts, getPostBySlug } from '@/lib/blog';
import { BlogPost } from '@/components/blog/blog-post';
import { RelatedPosts } from '@/components/blog/related-posts';
import { BlogNavigation } from '@/components/blog/blog-navigation';
import type { Metadata } from 'next';

type Props = {
  params: Promise<{locale: string; slug: string}>;
};

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  
  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: `${post.title} - Zaza Promptly Blog`,
    description: post.description,
    authors: [{ name: post.author || "Zaza Team" }],
    openGraph: {
      title: post.title,
      description: post.description,
      images: [post.image || "/images/blog/default.jpg"],
      type: 'article',
      publishedTime: post.date,
      authors: [post.author || "Zaza Team"],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [post.image || "/images/blog/default.jpg"],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const post = getPostBySlug(slug);
  
  if (!post) {
    notFound();
  }

  const allPosts = getAllPosts();

  // Get related posts (same category)
  const relatedPosts = allPosts
    .filter(p => p.slug !== slug && p.category === post.category)
    .slice(0, 3);

  // Find current post position for navigation
  const currentIndex = allPosts.findIndex(p => p.slug === slug);
  const previousPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;
  const nextPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <BlogPost post={post} />
      
      {(previousPost || nextPost) && (
        <BlogNavigation 
          previousPost={previousPost}
          nextPost={nextPost}
        />
      )}
      
      {relatedPosts.length > 0 && (
        <RelatedPosts posts={relatedPosts} />
      )}
    </div>
  );
}