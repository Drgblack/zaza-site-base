import { getAllBlog2Posts, getBlog2PostBySlug } from "@/lib/blog2.server";
import { notFound } from "next/navigation";
import ArticleLayout2 from "@/components/blog2/ArticleLayout2";
import { MDXRemote } from "next-mdx-remote/rsc";
import { mdxComponents } from "@/components/blog2/mdx-components";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const posts = getAllBlog2Posts();
  return posts.map(post => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlog2PostBySlug(slug);
  
  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: `${post.title} - Zaza AI Teaching Blog`,
    description: post.description,
    authors: [{ name: post.author }],
    alternates: {
      canonical: `https://zazapromptly.com/en/blog2/${post.slug}`
    },
    openGraph: {
      title: post.title,
      description: post.description,
      images: [{
        url: post.image,
        width: 1200,
        height: 630,
        alt: post.title
      }],
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      url: `https://zazapromptly.com/en/blog2/${post.slug}`
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [post.image],
    },
  };
}

export default async function Blog2PostPage({ params }: Props) {
  const { slug } = await params;
  
  console.log("[blog2] rendering article:", slug);
  
  const post = getBlog2PostBySlug(slug);
  if (!post) return notFound();
  
  return (
    <div className="min-h-screen bg-white" data-route="blog2-article">
      {/* TEMP: route verification watermark */}
      <div className="px-4 py-2 text-[11px] text-blue-600/80 bg-blue-50 border-b">
        🧪 <strong>BLOG2 ROUTE:</strong> app/en/blog2/[slug]/page.tsx | slug: {slug}
      </div>
      
      <ArticleLayout2 post={post}>
        <MDXRemote
          source={post.content}
          components={mdxComponents}
          options={{
            mdxOptions: {
              remarkPlugins: [remarkGfm],
              rehypePlugins: [
                rehypeSlug,
                [
                  rehypeAutolinkHeadings,
                  {
                    behavior: 'wrap',
                    properties: {
                      className: ['anchor-link'],
                    },
                  },
                ],
              ],
            },
          }}
        />
      </ArticleLayout2>
      
      {/* JSON-LD for Article */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": post.title,
            "description": post.description,
            "image": post.image,
            "author": {
              "@type": "Person",
              "name": post.author
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
              "@id": `https://zazapromptly.com/en/blog2/${post.slug}`
            },
            "articleSection": post.category,
            "about": {
              "@type": "Thing",
              "name": "AI in Education"
            }
          })
        }}
      />
    </div>
  );
}