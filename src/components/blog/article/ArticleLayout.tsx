import Image from "next/image";
import ShareBar from "./ShareBar";
import EmailCTA from "./EmailCTA";
import RelatedPosts from "./RelatedPosts";

export default function ArticleLayout({ post, children }:{
  post: {
    title: string; description?: string; author?: string;
    date: string; readingTime?: number; image?: string; imageAlt?: string; slug: string;
  };
  children: React.ReactNode;
}) {
  return (
    <main data-article-layout="v1">
      {/* Hero */}
      <section className="relative mx-auto max-w-6xl px-4">
        <div className="relative aspect-[21/9] w-full overflow-hidden rounded-2xl">
          <Image
            src={post.image || "/images/blog/default.jpg"}
            alt={post.imageAlt || post.title}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-black/0" />
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <h1 className="text-3xl font-bold md:text-5xl">{post.title}</h1>
            <p className="mt-2 max-w-3xl opacity-90">{post.description}</p>
            <p className="mt-3 text-xs opacity-80">
              {post.author} • {post.readingTime ?? 4} min read • {new Date(post.date).toLocaleDateString()}
            </p>
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="relative mx-auto mt-10 grid max-w-[72ch] grid-cols-1 px-4 md:grid-cols-[56px_1fr] gap-6">
        <div className="hidden md:block">
          <ShareBar title={post.title} slug={post.slug} />
        </div>
        <article className="prose dark:prose-invert max-w-none">
          {children}
          <div className="my-10">
            <EmailCTA variant="newsletter" />
          </div>
        </article>
      </section>

      {/* Bottom CTAs + Related */}
      <section className="mx-auto mt-12 max-w-[72ch] px-4">
        <EmailCTA variant="product" />
      </section>
      <section className="mx-auto mt-12 max-w-6xl px-4">
        <RelatedPosts currentSlug={post.slug} category={(post as any).category} />
      </section>
    </main>
  );
}