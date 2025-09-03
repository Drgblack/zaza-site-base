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

  const { locale } = await params;
  
  return {
    title: `${post.title} - Zaza Promptly Blog`,
    description: post.description,
    authors: [{ name: post.author || "Zaza Team" }],
    alternates: {
      canonical: `https://zazapromptly.com/${locale}/blog/${post.slug}`
    },
    openGraph: {
      title: post.title,
      description: post.description,
      images: [{
        url: post.image || "/images/blog/default.jpg",
        width: 1200,
        height: 630,
        alt: post.title
      }],
      type: 'article',
      publishedTime: post.date,
      authors: [post.author || "Zaza Team"],
      url: `https://zazapromptly.com/${locale}/blog/${post.slug}`
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

  try {
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
  } catch (error) {
    console.error('Error in BlogPostPage:', error);
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Article Not Available</h1>
          <p className="text-gray-600 mb-4">We're having trouble loading this article.</p>
          <a href={`/${locale}/blog`} className="text-purple-600 hover:underline">← Back to Blog</a>
        </div>
      </div>
    );
  }
}