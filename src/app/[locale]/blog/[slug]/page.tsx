import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { getPostBySlug, getRelatedPosts, getAllPosts } from '@/lib/blog-mdx';
import { BlogPost } from '@/components/blog/blog-post';
import { RelatedPosts } from '@/components/blog/related-posts';
import { BlogNavigation } from '@/components/blog/blog-navigation';
import type { Metadata } from 'next';

type Props = {
  params: Promise<{locale: string; slug: string}>;
};

export async function generateStaticParams() {
  // Generate paths for all locales
  const locales = ['en', 'de', 'fr', 'es', 'it'];
  const allParams = [];
  
  for (const locale of locales) {
    const posts = await getAllPosts(locale);
    const params = posts.map((post) => ({
      locale,
      slug: post.slug,
    }));
    allParams.push(...params);
  }
  
  return allParams;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = await getPostBySlug(slug, locale);
  
  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: `${post.title} - Zaza Promptly Blog`,
    description: post.description,
    keywords: post.seoKeywords,
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description: post.description,
      images: [post.featuredImage],
      type: 'article',
      publishedTime: post.publishDate,
      authors: [post.author],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [post.featuredImage],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const post = await getPostBySlug(slug, locale);
  
  if (!post) {
    notFound();
  }

  const [relatedPosts, allPosts] = await Promise.all([
    getRelatedPosts(slug, 3, locale),
    getAllPosts(locale)
  ]);

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