import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock } from "lucide-react";

type Post = {
  title: string;
  slug: string;
  description?: string;
  date: string;
  author?: string;
  category?: string;
  readingTime?: number;
  featured?: boolean;
  image?: string;
  content: string;
};

interface PostCardProps {
  post: Post;
  locale?: string;
}

export default function PostCard({ post, locale = "en" }: PostCardProps) {
  const href = `/${locale}/blog/${post.slug}`;
  
  return (
    <Link 
      href={href} 
      className="group block rounded-2xl border overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
      aria-label={`Read article: ${post.title}`}
    >
      <div className="relative aspect-[16/9] bg-neutral-200 overflow-hidden">
        <Image
          src={post.image || "/images/blog/default.svg"}
          alt={post.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, 300px"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            console.log('Image failed to load:', target.src);
            if (target.src !== '/images/blog/default.svg') {
              target.src = '/images/blog/default.svg';
            }
          }}
          onLoad={() => {
            // console.log('Image loaded successfully:', post.image);
          }}
        />
        <span className="absolute left-3 top-3 text-xs px-2 py-1 rounded-full bg-black/80 text-white font-medium">
          {post.category || "General"}
        </span>
      </div>
      <div className="p-4 h-[152px] flex flex-col">
        <h3 className="text-sm font-semibold line-clamp-2 leading-tight group-hover:text-purple-600 transition-colors">
          {post.title}
        </h3>
        <p className="mt-2 text-xs text-gray-600 line-clamp-2 flex-grow">
          {post.description || 'No description available'}
        </p>
        <div className="mt-auto pt-2 flex items-center gap-3 text-[11px] text-gray-500">
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {post.readingTime || 4} min
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