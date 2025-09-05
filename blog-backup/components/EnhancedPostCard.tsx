import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, TrendingUp, Star, Zap, BookOpen, Users } from "lucide-react";
import type { Blog2Post } from "@/lib/blog2.server";

interface EnhancedPostCardProps {
  post: Blog2Post;
  locale?: string;
  variant?: 'standard' | 'hero' | 'highlighted';
  index?: number;
  className?: string;
}

export default function EnhancedPostCard({ 
  post, 
  locale = "en", 
  variant = 'standard',
  index = 0,
  className = 'w-[320px]'
}: EnhancedPostCardProps) {
  const href = `/${locale}/blog/${post.slug}`;
  
  const getCategoryIcon = (category?: string) => {
    if (!category) return BookOpen;
    
    const categoryLower = category.toLowerCase();
    if (categoryLower.includes('productivity') || categoryLower.includes('time')) return Zap;
    if (categoryLower.includes('parent') || categoryLower.includes('communication')) return Users;
    if (categoryLower.includes('ai') || categoryLower.includes('tool')) return TrendingUp;
    if (categoryLower.includes('featured') || categoryLower.includes('editor')) return Star;
    
    return BookOpen;
  };

  const getCategoryColor = (category?: string) => {
    if (!category) return 'bg-gray-500';
    
    const categoryLower = category.toLowerCase();
    if (categoryLower.includes('productivity') || categoryLower.includes('time')) return 'bg-yellow-500';
    if (categoryLower.includes('parent') || categoryLower.includes('communication')) return 'bg-blue-500';
    if (categoryLower.includes('ai') || categoryLower.includes('tool')) return 'bg-purple-500';
    if (categoryLower.includes('featured') || categoryLower.includes('editor')) return 'bg-green-500';
    
    return 'bg-indigo-500';
  };

  const getReadingTimeColor = (readingTime?: string) => {
    if (!readingTime) return 'text-gray-500';
    
    const minutes = parseInt(readingTime);
    if (minutes <= 3) return 'text-green-600';
    if (minutes <= 7) return 'text-blue-600';
    return 'text-purple-600';
  };

  const getVariantStyles = () => {
    switch (variant) {
      case 'hero':
        return {
          container: `group block ${className} flex-shrink-0 rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.05] focus:outline-none focus:ring-4 focus:ring-purple-500/50 focus:ring-offset-4 scroll-snap-align-start bg-gradient-to-br from-white to-gray-50 border-2 border-transparent hover:border-purple-200`,
          imageContainer: "relative aspect-[16/10] bg-gradient-to-br from-purple-100 to-blue-100 overflow-hidden",
          contentContainer: "p-6 h-[200px] flex flex-col",
          title: "text-lg font-bold line-clamp-2 leading-tight group-hover:text-purple-600 transition-colors mb-3",
          description: "text-sm text-gray-600 line-clamp-3 flex-grow leading-relaxed"
        };
      case 'highlighted':
        return {
          container: `group block ${className} flex-shrink-0 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-[1.03] focus:outline-none focus:ring-3 focus:ring-orange-500/50 focus:ring-offset-2 scroll-snap-align-start bg-white border border-orange-200 hover:border-orange-300`,
          imageContainer: "relative aspect-[16/9] bg-gradient-to-br from-orange-100 to-yellow-100 overflow-hidden",
          contentContainer: "p-5 h-[170px] flex flex-col",
          title: "text-base font-semibold line-clamp-2 leading-tight group-hover:text-orange-600 transition-colors mb-2",
          description: "text-sm text-gray-600 line-clamp-2 flex-grow"
        };
      default:
        return {
          container: `group block ${className} flex-shrink-0 rounded-2xl border overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 scroll-snap-align-start bg-white hover:bg-gray-50`,
          imageContainer: "relative aspect-[16/9] bg-neutral-100 overflow-hidden",
          contentContainer: "p-4 h-[160px] flex flex-col",
          title: "text-sm font-semibold line-clamp-2 leading-tight group-hover:text-blue-600 transition-colors",
          description: "mt-2 text-xs text-gray-600 line-clamp-2 flex-grow"
        };
    }
  };

  const styles = getVariantStyles();
  const CategoryIcon = getCategoryIcon(post.category);
  const categoryColor = getCategoryColor(post.category);
  const readingTimeColor = getReadingTimeColor(post.readingTime);

  // Add stagger animation delay for better visual effect
  const animationDelay = `${index * 100}ms`;

  return (
    <Link 
      href={href}
      className={styles.container}
      aria-label={`Read article: ${post.title}`}
      style={{
        animationDelay,
        animationFillMode: 'both'
      }}
    >
      <div className={styles.imageContainer}>
        <Image
          src={post.image || '/images/blog/default-card.jpg'}
          alt={post.imageAlt || post.title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
          sizes={variant === 'hero' ? '400px' : '320px'}
        />
        
        {/* Enhanced gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
        
        {/* Category badge with icon */}
        <div className={`absolute left-3 top-3 flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-full ${categoryColor} text-white font-medium shadow-lg backdrop-blur-sm`}>
          <CategoryIcon className="w-3 h-3" />
          <span>{post.category || 'Article'}</span>
        </div>

        {/* Featured badge for hero variant */}
        {variant === 'hero' && post.featured && (
          <div className="absolute right-3 top-3 flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-yellow-500 text-white font-medium shadow-lg">
            <Star className="w-3 h-3 fill-current" />
            <span>Featured</span>
          </div>
        )}

        {/* Reading time overlay */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-white/90 backdrop-blur-sm text-gray-700 font-medium">
          <Clock className="w-3 h-3" />
          <span>{post.readingTime || '5 min'}</span>
        </div>
      </div>
      
      <div className={styles.contentContainer}>
        <h3 className={styles.title}>
          {post.title}
        </h3>
        
        <p className={styles.description}>
          {post.description}
        </p>
        
        <div className={`mt-auto pt-3 flex items-center justify-between text-[11px] ${
          variant === 'hero' ? 'text-gray-500' : 'text-gray-500'
        }`}>
          <div className="flex items-center gap-3">
            <span className={`inline-flex items-center gap-1 font-medium ${readingTimeColor}`}>
              <Zap className="h-3 w-3" />
              {post.readingTime || '5 min read'}
            </span>
            {post.author && (
              <span className="text-gray-400">
                by {post.author}
              </span>
            )}
          </div>
          
          <span className="inline-flex items-center gap-1 text-gray-400">
            <Calendar className="h-3 w-3" />
            {new Date(post.date).toLocaleDateString('en-US', { 
              month: 'short', 
              day: 'numeric' 
            })}
          </span>
        </div>

        {/* Progress bar for longer articles */}
        {variant !== 'standard' && post.readingTime && parseInt(post.readingTime) > 7 && (
          <div className="mt-2 w-full bg-gray-200 rounded-full h-1">
            <div 
              className="h-1 rounded-full bg-gradient-to-r from-purple-500 to-blue-500"
              style={{ 
                width: `${Math.min(100, (parseInt(post.readingTime) / 15) * 100)}%` 
              }}
            />
          </div>
        )}
      </div>
    </Link>
  );
}