import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock } from "lucide-react";
import type { Blog2Post } from "@/lib/blog2.server";

interface PostCard2Props {
  post: Blog2Post;
  locale?: string;
}

export default function PostCard2({ post, locale = "en" }: PostCard2Props) {
  const href = `/${locale}/blog/${post.slug}`;
  
  return (
    <Link 
      href={href}
      className="group block w-[300px] flex-shrink-0 rounded-2xl border overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 scroll-snap-align-start"
      aria-label={`Read article: ${post.title}`}
    >
      <div className="relative aspect-[16/9] bg-neutral-200 overflow-hidden">
        {/* Always render Image - no conditional logic */}
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="300px"
        />
        {/* Category badge */}
        <span className="absolute left-3 top-3 text-xs px-2 py-1 rounded-full bg-black/80 text-white font-medium">
          {post.category}
        </span>
      </div>
      <div className="p-4 h-[160px] flex flex-col">
        <h3 className="text-sm font-semibold line-clamp-2 leading-tight group-hover:text-purple-600 transition-colors">
          {post.title}
        </h3>
        <p className="mt-2 text-xs text-gray-600 line-clamp-2 flex-grow">
          {post.description}
        </p>
        <div className="mt-auto pt-2 flex items-center gap-3 text-[11px] text-gray-500">
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {post.readingTime} min
          </span>
          <span className="inline-flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {new Date(post.date).toLocaleDateString()}
          </span>
        </div>
      </div>
    </Link>
  );
}