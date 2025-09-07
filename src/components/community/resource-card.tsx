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
  BarChart3,
  ExternalLink,
  File,
  Users,
  ShoppingCart
} from 'lucide-react';
import { ResourceMetadata, resourceService } from '@/lib/resources';
import { PaymentModal } from './payment-modal';

interface CommunityResourceCardProps {
  resource: ResourceMetadata;
}

export function CommunityResourceCard({ resource }: CommunityResourceCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const handleDownload = async () => {
    if (resource.isPremium && resource.price !== null) {
      // Open payment modal for premium resources
      setShowPaymentModal(true);
    } else {
      // Handle free download
      setIsDownloading(true);
      try {
        await resourceService.downloadResource(resource.id);
      } catch (error) {
        console.error('Download error:', error);
        alert('Download failed. Please try again.');
      } finally {
        setIsDownloading(false);
      }
    }
  };

  const handlePaymentSuccess = async (downloadUrl: string) => {
    // Handle successful payment and download
    setIsDownloading(true);
    try {
      const userEmail = 'user@example.com'; // In real app, get from auth context
      await resourceService.downloadResource(resource.id, userEmail);
    } catch (error) {
      console.error('Download error:', error);
    } finally {
      setIsDownloading(false);
      setShowPaymentModal(false);
    }
  };

  const handlePreview = async () => {
    const previewUrl = await resourceService.previewResource(resource.id);
    if (previewUrl) {
      window.open(previewUrl, '_blank');
    } else {
      setShowPreview(true);
    }
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    // In real app, would sync with backend
  };

  const handleShare = async () => {
    const shareData = {
      title: resource.title,
      text: resource.description,
      url: window.location.href
    };

    if (navigator.share && navigator.canShare(shareData)) {
      await navigator.share(shareData);
    } else {
      await navigator.clipboard.writeText(window.location.href);
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
      case 'pdf':
        return FileText;
      case 'template':
        return BookOpen;
      case 'guide':
        return BarChart3;
      default:
        return File;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'pdf':
        return 'from-purple-400 to-pink-400';
      case 'template':
        return 'from-pink-400 to-rose-400';
      case 'guide':
        return 'from-purple-400 to-indigo-400';
      default:
        return 'from-slate-400 to-gray-400';
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
      <div className="relative h-40 overflow-hidden">
        {resource.previewImage ? (
          <div className="relative w-full h-full">
            <img 
              src={resource.previewImage}
              alt={`${resource.title} preview`}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            {/* Preview overlay */}
            <button 
              onClick={handlePreview}
              className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100"
              aria-label="Preview resource"
            >
              <Eye className="h-8 w-8 text-white drop-shadow-lg" />
            </button>
          </div>
        ) : (
          <div className={`relative h-full bg-gradient-to-br ${getTypeColor(resource.type)} opacity-20`}>
            <div className="absolute inset-0 flex items-center justify-center">
              <TypeIcon className="h-16 w-16 text-slate-400 dark:text-slate-500 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300" />
            </div>
          </div>
        )}
        
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
              {resource.category.charAt(0).toUpperCase() + resource.category.slice(1)}
            </Badge>
            <Badge variant="outline" className="text-xs px-2 py-1 border-slate-300 dark:border-slate-600">
              {resource.type.toUpperCase()}
            </Badge>
            <Badge variant="outline" className="text-xs px-2 py-1 border-slate-300 dark:border-slate-600">
              {resource.pageCount} pages
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
          <div className="text-center p-2 bg-purple-50/50 dark:bg-purple-950/20 rounded-lg border border-purple-200/40 dark:border-purple-800/30">
            <Download className="h-4 w-4 mx-auto text-purple-600 dark:text-purple-400 mb-1" />
            <div className="text-sm font-bold text-purple-700 dark:text-purple-300">
              {resource.stats.downloads.toLocaleString()}
            </div>
            <div className="text-xs text-purple-600/80 dark:text-purple-400/80">Downloads</div>
          </div>
          <div className="text-center p-2 bg-pink-50/50 dark:bg-pink-950/20 rounded-lg border border-pink-200/40 dark:border-pink-800/30">
            <Star className="h-4 w-4 mx-auto fill-yellow-500 text-yellow-500 mb-1" />
            <div className="text-sm font-bold text-pink-700 dark:text-pink-300">
              {resource.stats.rating}
            </div>
            <div className="text-xs text-pink-600/80 dark:text-pink-400/80">{resource.stats.reviews} reviews</div>
          </div>
          <div className="text-center p-2 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700/50">
            <File className="h-4 w-4 mx-auto text-slate-600 dark:text-slate-400 mb-1" />
            <div className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              {resource.fileSize}
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400">File size</div>
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
              resource.isPremium && resource.price !== null
                ? 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700' 
                : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700'
            } hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed`}
            onClick={handleDownload}
            disabled={isDownloading || isPurchasing}
          >
            {isDownloading || isPurchasing ? (
              <div className="flex items-center">
                <div className="w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                {isPurchasing ? 'Processing...' : 'Downloading...'}
              </div>
            ) : resource.isPremium && resource.price !== null ? (
              <>
                <ShoppingCart className="h-4 w-4 mr-2" />
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
        
        {/* Preview Link & Features */}
        <div className="mt-3 space-y-2">
          <button 
            onClick={handlePreview}
            className="text-xs text-slate-500 dark:text-slate-400 hover:text-purple-600 dark:hover:text-purple-400 font-medium flex items-center gap-1 mx-auto transition-colors duration-200"
          >
            <Eye className="h-3 w-3" />
            Quick Preview
            <ExternalLink className="h-3 w-3" />
          </button>
          
          {/* Key Features */}
          {resource.features.length > 0 && (
            <div className="text-center">
              <p className="text-xs text-slate-600 dark:text-slate-400 font-medium mb-1">Includes:</p>
              <div className="flex flex-wrap gap-1 justify-center">
                {resource.features.slice(0, 2).map((feature, index) => (
                  <span key={index} className="text-xs bg-purple-100/60 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 px-2 py-1 rounded-full">
                    {feature}
                  </span>
                ))}
                {resource.features.length > 2 && (
                  <span className="text-xs text-slate-500 dark:text-slate-400">+{resource.features.length - 2} more</span>
                )}
              </div>
            </div>
          )}
        </div>
      </CardContent>

      {/* Payment Modal */}
      <PaymentModal 
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        resource={resource}
        onPaymentSuccess={handlePaymentSuccess}
      />
    </Card>
  );
}
