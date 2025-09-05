import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { getBlogPostBySlug, getAllBlogPosts } from '@/lib/blog/service';
import { getRelatedPosts } from '@/lib/blog/utils';
import BlogPostHeader from '@/components/blog/BlogPostHeader';
import BlogPostContent from '@/components/blog/BlogPostContent';
import BlogPostFooter from '@/components/blog/BlogPostFooter';
import RelatedPosts from '@/components/blog/RelatedPosts';
import type { Metadata } from 'next';

type Props = {
  params: Promise<{locale: string; slug: string}>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  
  if (!post) {
    return {
      title: 'Post Not Found | Zaza Blog'
    };
  }

  return {
    title: post.seo.metaTitle,
    description: post.seo.metaDescription,
    keywords: post.seo.keywords,
    authors: [{ name: post.author.name }],
    openGraph: {
      title: post.seo.metaTitle,
      description: post.seo.metaDescription,
      type: 'article',
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [post.author.name],
      tags: post.tags,
      images: post.seo.ogImage ? [post.seo.ogImage] : undefined
    },
    twitter: {
      card: 'summary_large_image',
      title: post.seo.metaTitle,
      description: post.seo.metaDescription,
      images: post.seo.ogImage ? [post.seo.ogImage] : undefined
    }
  };
}

export async function generateStaticParams() {
  const posts = await getAllBlogPosts();
  
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const [post, allPosts] = await Promise.all([
    getBlogPostBySlug(slug),
    getAllBlogPosts()
  ]);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedPosts(post, allPosts, 3);

  return (
    <article className="min-h-screen bg-white">
      {/* Post Header */}
      <BlogPostHeader post={post} />

      {/* Post Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <BlogPostContent post={post} />
        
        {/* Post Footer with sharing, etc. */}
        <BlogPostFooter post={post} />
        
        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="mt-16 pt-16 border-t border-gray-200">
            <RelatedPosts posts={relatedPosts} />
          </div>
        )}
      </div>
    </article>
  );
}