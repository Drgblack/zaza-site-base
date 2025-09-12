import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import { getBlogPost, getAllBlogPosts } from "@/lib/blog-posts";

export async function generateStaticParams() {
  const posts = getAllBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = getBlogPost(params.slug);
  
  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: `${post.title} - Zaza Promptly Blog`,
    description: post.excerpt,
    authors: [{ name: post.author.name }],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      authors: [post.author.name],
    },
  };
}

export default function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = getBlogPost(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="max-w-4xl mx-auto px-4 pt-8">
        <nav className="flex items-center gap-2 text-sm text-gray-600">
          <Link href="/en" className="hover:text-purple-600">Home</Link>
          <span>/</span>
          <Link href="/en/blog" className="hover:text-purple-600">Blog</Link>
          <span>/</span>
          <span className="text-gray-900">{post.title}</span>
        </nav>
      </div>

      {/* Article Header */}
      <header className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
          <time>{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
          <span>•</span>
          <span>{post.readTime}</span>
          <span>•</span>
          <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full">
            {post.category}
          </span>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          {post.title}
        </h1>
        
        <p className="text-xl text-gray-600 mb-8">
          {post.excerpt}
        </p>
        
        <div className="flex items-center gap-4 pb-8 border-b border-gray-200">
          <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
            <span className="text-xl font-semibold text-purple-600">
              {post.author.name.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
          <div>
            <p className="font-semibold text-gray-900">{post.author.name}</p>
            <p className="text-sm text-gray-600">{post.author.role}</p>
          </div>
        </div>
      </header>

      {/* Article Content */}
      <div className="max-w-4xl mx-auto px-4 pb-16">
        <div 
          className="prose prose-lg prose-gray max-w-none prose-headings:font-bold prose-h2:text-3xl prose-h2:mt-8 prose-h2:mb-4 prose-h3:text-2xl prose-h3:mt-6 prose-h3:mb-3 prose-p:text-gray-700 prose-p:leading-relaxed prose-ul:my-6 prose-li:my-2 prose-strong:text-gray-900"
          dangerouslySetInnerHTML={{ __html: formatMarkdown(post.content) }}
        />
      </div>

      {/* Related Posts */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Related Articles</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {getAllBlogPosts()
              .filter(p => p.slug !== post.slug)
              .slice(0, 2)
              .map(relatedPost => (
                <Link
                  key={relatedPost.slug}
                  href={`/en/blog/${relatedPost.slug}`}
                  className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="text-sm text-gray-500 mb-2">
                    {relatedPost.category} • {relatedPost.readTime}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {relatedPost.title}
                  </h3>
                  <p className="text-gray-600">
                    {relatedPost.excerpt}
                  </p>
                </Link>
              ))}
          </div>
        </div>
      </section>
    </article>
  );
}

// Simple markdown to HTML converter
function formatMarkdown(content: string): string {
  return content
    .replace(/^### (.*$)/gim, '<h3>$1</h3>')
    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
    .replace(/^# (.*$)/gim, '<h1>$1</h1>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/^- (.+)$/gim, '<li>$1</li>')
    .replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>')
    .replace(/\n\n/g, '</p><p>')
    .replace(/^/g, '<p>')
    .replace(/$/g, '</p>')
    .replace(/<p><h/g, '<h')
    .replace(/<\/h(\d)><\/p>/g, '</h$1>');
}