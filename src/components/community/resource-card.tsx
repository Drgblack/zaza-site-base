'use client';

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
  Tag
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
        return '💬';
      case 'template':
        return '📋';
      case 'lesson':
        return '📚';
      case 'assessment':
        return '📊';
      default:
        return '📄';
    }
  };

  return (
    <Card className="hover:shadow-lg transition-shadow duration-200 group">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{getTypeIcon(resource.type)}</span>
            <div>
              <CardTitle className="text-lg group-hover:text-purple-600 transition-colors">
                {resource.title}
              </CardTitle>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="secondary" className="text-xs">
                  {resource.category}
                </Badge>
                {resource.isPremium && (
                  <Badge className="bg-yellow-500 text-white text-xs">
                    <Crown className="h-3 w-3 mr-1" />
                    Premium
                  </Badge>
                )}
              </div>
            </div>
          </div>
          {resource.price !== null && (
            <div className="text-right">
              <div className="text-lg font-bold text-green-600">
                €{resource.price}
              </div>
            </div>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {resource.description}
        </p>
        
        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-4">
          {resource.tags.slice(0, 3).map(tag => (
            <Badge key={tag} variant="outline" className="text-xs">
              <Tag className="h-3 w-3 mr-1" />
              {tag}
            </Badge>
          ))}
          {resource.tags.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{resource.tags.length - 3} more
            </Badge>
          )}
        </div>
        
        {/* Author Info */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
            <span className="text-sm font-medium text-purple-600">
              {resource.author.name.charAt(0)}
            </span>
          </div>
          <div className="flex-1">
            <div className="text-sm font-medium">{resource.author.name}</div>
            <div className="flex items-center gap-1">
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              <span className="text-xs text-gray-600">{resource.author.rating}</span>
            </div>
          </div>
        </div>
        
        {/* Stats and Actions */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <Download className="h-3 w-3" />
              <span>{resource.downloads.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-1">
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              <span>{resource.rating}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>{formatDate(resource.createdAt)}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 w-8 p-0 hover:bg-pink-100 dark:hover:bg-pink-900/20 hover:text-pink-600 transition-all duration-200"
              onClick={handleLike}
              title="Like this resource"
            >
              <Heart className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 w-8 p-0 hover:bg-blue-100 dark:hover:bg-blue-900/20 hover:text-blue-600 transition-all duration-200"
              onClick={handleShare}
              title="Share this resource"
            >
              <Share2 className="h-4 w-4" />
            </Button>
            <Button 
              size="sm" 
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-md hover:shadow-lg transition-all duration-200 font-semibold"
              onClick={handleDownload}
            >
              {resource.price !== null ? (
                <>
                  €{resource.price} Purchase
                </>
              ) : (
                <>
                  <Download className="h-3 w-3 mr-1" />
                  Download
                </>
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
