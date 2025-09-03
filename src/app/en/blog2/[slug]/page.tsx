// Ensure Node runtime & server-only loader
export const runtime = 'nodejs';
export const dynamicParams = false;

import 'server-only';
import { notFound } from 'next/navigation';
import { getAllBlog2Posts, getBlog2PostBySlug } from '@/lib/blog2.server';
import ArticleLayout from '@/components/blog2/ArticleLayout';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { mdxComponents } from '@/components/blog2/mdx-components';

// Build-time static params (no runtime FS on Vercel)
export async function generateStaticParams() {
  return getAllBlog2Posts().map(p => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = getBlog2PostBySlug(params.slug);
  
  if (!post) {
    return { title: 'Post Not Found' };
  }

  return {
    title: `${post.title} - Zaza AI Teaching Blog`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      images: [{ url: post.image }],
      type: 'article',
      publishedTime: post.date,
    },
  };
}

export default function Page({ params }: { params: { slug: string } }) {
  const post = getBlog2PostBySlug(params.slug);
  if (!post) return notFound();
  
  return (
    <ArticleLayout post={post}>
      <MDXRemote source={post.content} components={mdxComponents} />
    </ArticleLayout>
  );
}