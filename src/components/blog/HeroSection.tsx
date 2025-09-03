import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, User, ArrowRight } from "lucide-react";

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

interface HeroSectionProps {
  post: Post;
  locale: string;
}

export default function HeroSection({ post, locale }: HeroSectionProps) {
  const href = `/${locale}/blog/${post.slug}`;

  return (
    <section className="relative mb-12">
      <div className="relative aspect-[21/9] rounded-2xl overflow-hidden group">
        <Image
          src={post.image || "/images/blog/default.svg"}
          alt={post.title}
          fill
          className="object-cover"
          priority
          sizes="100vw"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            if (target.src !== '/images/blog/default.svg') {
              target.src = '/images/blog/default.svg';
            }
          }}
        />
        
        {/* Dark gradient overlay for text contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/30" />
        
        {/* Content overlay */}
        <div className="absolute inset-0 flex items-end">
          <div className="p-8 md:p-12 max-w-2xl">
            <Badge className="mb-4 bg-purple-600 hover:bg-purple-700 text-white">
              {post.category || "Featured"}
            </Badge>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
              {post.title}
            </h1>
            
            <p className="text-lg text-gray-200 mb-6 line-clamp-3 leading-relaxed">
              {post.description}
            </p>
            
            {/* Metadata */}
            <div className="flex flex-wrap items-center gap-4 md:gap-6 text-sm text-gray-300 mb-6">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{post.readingTime || 4} min read</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{new Date(post.date).toLocaleDateString()}</span>
              </div>
            </div>
            
            <Link href={href}>
              <Button 
                size="lg" 
                className="bg-white text-black hover:bg-gray-100 font-semibold transition-all duration-200 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
                aria-label="Read featured article"
              >
                Read Article
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}