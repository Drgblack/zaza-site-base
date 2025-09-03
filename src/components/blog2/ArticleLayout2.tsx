import Image from "next/image";
import ShareBar2 from "./ShareBar2";
import EmailCTA2 from "./EmailCTA2";
import RelatedPosts2 from "./RelatedPosts2";
import type { Blog2Post } from "@/lib/blog2.server";

interface ArticleLayout2Props {
  post: Blog2Post;
  children: React.ReactNode;
}

export default function ArticleLayout2({ post, children }: ArticleLayout2Props) {
  return (
    <main data-article-layout="v2">
      {/* Hero Section */}
      <section className="relative mx-auto max-w-6xl px-4">
        <div className="relative aspect-[21/9] w-full overflow-hidden rounded-2xl">
          <Image
            src={post.image}
            alt={post.title}
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
              {post.author} • {post.readingTime} min read • {new Date(post.date).toLocaleDateString()}
            </p>
          </div>
        </div>
      </section>

      {/* Body with Share Rail */}
      <section className="relative mx-auto mt-10 grid max-w-[72ch] grid-cols-1 px-4 md:grid-cols-[56px_1fr] gap-6">
        <div className="hidden md:block">
          <ShareBar2 title={post.title} slug={post.slug} />
        </div>
        <article className="prose dark:prose-invert max-w-none">
          {children}
          <div className="my-10">
            <EmailCTA2 variant="newsletter" />
          </div>
        </article>
      </section>

      {/* Mobile Share Row (visible on small screens) */}
      <section className="mx-auto mt-8 max-w-[72ch] px-4 md:hidden">
        <div className="flex flex-wrap gap-2 justify-center">
          <ShareBar2 title={post.title} slug={post.slug} mobile />
        </div>
      </section>

      {/* Bottom CTAs + Related */}
      <section className="mx-auto mt-12 max-w-[72ch] px-4">
        <EmailCTA2 variant="product" />
      </section>
      <section className="mx-auto mt-12 max-w-6xl px-4">
        <RelatedPosts2 currentSlug={post.slug} category={post.category} />
      </section>
    </main>
  );
}