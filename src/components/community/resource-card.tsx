'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Star, 
  Download, 
  Heart, 
  Share2, 
  Crown,
  Clock,
  Tag,
  Eye,
  ThumbsUp,
  FileText,
  BookOpen,
  Calculator,
  PresentationChart,
  ExternalLink
} from 'lucide-react';

interface CommunityResource {
  id: string;
  title: string;
  description: string;
  author: {
    name: string;
    avatar: string;
    rating: number;
  };
  category: string;
  tags: string[];
  downloads: number;
  rating: number;
  price: number | null;
  isPremium: boolean;
  createdAt: string;
  type: 'snippet' | 'template' | 'lesson' | 'assessment';
}

interface CommunityResourceCardProps {
  resource: CommunityResource;
}

export function CommunityResourceCard({ resource }: CommunityResourceCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleDownload = () => {
    if (resource.price !== null) {
      // Handle purchase logic
      console.log('Purchasing resource:', resource.id);
      alert(`Redirecting to purchase ${resource.title} for €${resource.price}`);
    } else {
      // Handle free download
      console.log('Downloading resource:', resource.id);
      alert(`Downloading ${resource.title}`);
    }
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    console.log('Liked resource:', resource.id);
    // Add like functionality
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: resource.title,
        text: resource.description,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'snippet':
        return FileText;
      case 'template':
        return BookOpen;
      case 'lesson':
        return PresentationChart;
      case 'assessment':
        return Calculator;
      default:
        return FileText;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'snippet':
        return 'from-blue-500 to-cyan-500';
      case 'template':
        return 'from-purple-500 to-pink-500';
      case 'lesson':
        return 'from-green-500 to-emerald-500';
      case 'assessment':
        return 'from-orange-500 to-red-500';
      default:
        return 'from-slate-500 to-gray-500';
    }
  };

  const TypeIcon = getTypeIcon(resource.type);

  return (
    <Card 
      className="group hover:shadow-2xl transition-all duration-500 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 hover:border-purple-300 dark:hover:border-purple-600 hover:-translate-y-2 overflow-hidden relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 dark:from-purple-400/10 dark:to-pink-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Thumbnail/Preview Area */}
      <div className="relative h-32 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800 overflow-hidden">
        {/* Type Icon Background */}
        <div className={`absolute inset-0 bg-gradient-to-br ${getTypeColor(resource.type)} opacity-10`} />
        <div className="absolute inset-0 flex items-center justify-center">
          <TypeIcon className="h-16 w-16 text-slate-400 dark:text-slate-500 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300" />
        </div>
        
        {/* Premium Badge */}
        {resource.isPremium && (
          <div className="absolute top-3 right-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
            <Crown className="h-3 w-3 mr-1 inline" />
            Premium
          </div>
        )}
        
        {/* Price Tag */}
        {resource.price !== null && (
          <div className="absolute top-3 left-3 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
            €{resource.price}
          </div>
        )}
        
        {resource.price === null && (
          <div className="absolute top-3 left-3 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
            FREE
          </div>
        )}
      </div>
      
      <CardContent className="p-4 md:p-6 relative">
        {/* Header */}
        <div className="mb-4">
          <div className="flex items-start justify-between gap-3 mb-3">
            <CardTitle className="text-base md:text-lg font-bold group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300 leading-tight line-clamp-2">
              {resource.title}
            </CardTitle>
          </div>
          
          {/* Category and Type */}
          <div className="flex items-center gap-2 mb-3">
            <Badge variant="secondary" className="text-xs font-semibold px-2 py-1">
              {resource.category}
            </Badge>
            <Badge variant="outline" className="text-xs px-2 py-1 border-slate-300 dark:border-slate-600">
              {resource.type.charAt(0).toUpperCase() + resource.type.slice(1)}
            </Badge>
          </div>
        </div>
        
        {/* Description */}
        <p className="text-slate-700 dark:text-slate-200 text-sm mb-4 line-clamp-2 leading-relaxed font-medium">
          {resource.description}
        </p>
        
        {/* Tags - Simplified */}
        <div className="flex flex-wrap gap-2 mb-6">
          {resource.tags.slice(0, 2).map(tag => (
            <Badge 
              key={tag} 
              variant="outline" 
              className="text-xs px-3 py-1.5 bg-slate-100 dark:bg-slate-700 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 font-semibold rounded-full"
            >
              {tag}
            </Badge>
          ))}
          {resource.tags.length > 2 && (
            <Badge variant="outline" className="text-xs px-3 py-1.5 border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-400 font-medium rounded-full">
              +{resource.tags.length - 2}
            </Badge>
          )}
        </div>
        
        {/* Author Info */}
        <div className="flex items-center gap-3 mb-6 p-3 bg-slate-50 dark:bg-slate-700/30 rounded-xl border border-slate-200 dark:border-slate-600/50">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-md">
            <span className="text-sm font-bold text-white">
              {resource.author.name.charAt(0)}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-bold text-slate-900 dark:text-white truncate">
              {resource.author.name}
            </div>
            <div className="flex items-center gap-1">
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              <span className="text-xs text-slate-700 dark:text-slate-300 font-semibold">
                {resource.author.rating} • Author Rating
              </span>
            </div>
          </div>
        </div>
        
        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-2 md:gap-4 mb-6">
          <div className="text-center p-2 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-800/50">
            <Download className="h-4 w-4 mx-auto text-blue-600 dark:text-blue-400 mb-1" />
            <div className="text-sm font-bold text-blue-700 dark:text-blue-300">
              {resource.downloads.toLocaleString()}
            </div>
            <div className="text-xs text-blue-600/80 dark:text-blue-400/80">Downloads</div>
          </div>
          <div className="text-center p-2 bg-yellow-50 dark:bg-yellow-950/30 rounded-lg border border-yellow-200 dark:border-yellow-800/50">
            <Star className="h-4 w-4 mx-auto fill-yellow-500 text-yellow-500 mb-1" />
            <div className="text-sm font-bold text-yellow-700 dark:text-yellow-300">
              {resource.rating}
            </div>
            <div className="text-xs text-yellow-600/80 dark:text-yellow-400/80">Rating</div>
          </div>
          <div className="text-center p-2 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700/50">
            <Clock className="h-4 w-4 mx-auto text-slate-600 dark:text-slate-400 mb-1" />
            <div className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              {formatDate(resource.createdAt)}
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400">Added</div>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
          <div className="flex gap-1">
            <Button 
              variant="ghost" 
              size="sm" 
              className={`h-9 w-9 p-0 transition-all duration-200 ${
                isLiked 
                  ? 'bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400' 
                  : 'hover:bg-pink-50 dark:hover:bg-pink-900/20 hover:text-pink-600 dark:hover:text-pink-400'
              }`}
              onClick={handleLike}
              title="Like this resource"
            >
              <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-9 w-9 p-0 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200"
              onClick={handleShare}
              title="Share this resource"
            >
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
          
          <Button 
            className={`flex-1 h-10 font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-300 text-sm ${
              resource.price !== null 
                ? 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700' 
                : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700'
            } hover:scale-105`}
            onClick={handleDownload}
          >
            {resource.price !== null ? (
              <>
                €{resource.price} • Purchase
              </>
            ) : (
              <>
                <Download className="h-4 w-4 mr-2" />
                Download Free
              </>
            )}
          </Button>
        </div>
        
        {/* Preview Link */}
        <div className="mt-3 text-center">
          <button className="text-xs text-slate-500 dark:text-slate-400 hover:text-purple-600 dark:hover:text-purple-400 font-medium flex items-center gap-1 mx-auto transition-colors duration-200">
            <Eye className="h-3 w-3" />
            Quick Preview
            <ExternalLink className="h-3 w-3" />
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
