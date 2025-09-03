import { getAllPosts, getPostBySlug } from "@/lib/blog.server";
import { notFound } from "next/navigation";
import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';

type Props = {
  params: Promise<{locale: string; slug: string}>;
};

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map(post => ({
    locale: "en",
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
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

export default async function PostPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  
  const post = getPostBySlug(slug);
  if (!post) return notFound();
  
  return (
    <div className="min-h-screen bg-white">
      <article className="prose prose-lg prose-purple max-w-4xl mx-auto px-4 py-16 dark:prose-invert">
        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <span className="px-3 py-1 bg-purple-100 text-purple-700 text-sm font-medium rounded-full">
              {post.category}
            </span>
          </div>
          <h1 className="text-4xl font-bold leading-tight mb-4">{post.title}</h1>
          <p className="text-xl text-gray-600 mb-6">{post.description}</p>
          
          <div className="flex items-center gap-6 text-sm text-gray-500 mb-8">
            <span>By {post.author}</span>
            <span>{post.readingTime} min read</span>
            <span>{new Date(post.date).toLocaleDateString()}</span>
          </div>
        </header>

        {/* Content */}
        <div 
          className="prose-content"
          dangerouslySetInnerHTML={{ __html: post.content.replace(/^#{1,6}\s+/gm, (match) => {
            const level = match.trim().split(' ')[0].length;
            const text = match.replace(/^#{1,6}\s+/, '');
            return `<h${level}>${text}</h${level}>`;
          })}}
        />
        
        {/* JSON-LD for Article */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BlogPosting",
              "headline": post.title,
              "description": post.description,
              "image": post.image || "/images/blog/default.jpg",
              "author": {
                "@type": "Person",
                "name": post.author || "Zaza Team"
              },
              "publisher": {
                "@type": "Organization",
                "name": "Zaza Technologies",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://zazapromptly.com/images/zaza-logo.png"
                }
              },
              "datePublished": post.date,
              "dateModified": post.date,
              "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": `https://zazapromptly.com/${locale}/blog/${post.slug}`
              },
              "articleSection": post.category,
              "about": {
                "@type": "Thing",
                "name": "AI in Education"
              }
            })
          }}
        />
      </article>
    </div>
  );
}