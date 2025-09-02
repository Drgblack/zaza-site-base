'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { QuoteCard } from './quote-card';
import { ShareButton } from '../site/share-button';
import { 
  Share2, 
  Link, 
  Image,
  MessageSquare,
  Users,
  Sparkles
} from 'lucide-react';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  content: string;
  tone: string;
  category: string;
  shareId?: string;
  authorName?: string;
}

export function ShareModal({ 
  isOpen, 
  onClose, 
  content, 
  tone, 
  category, 
  shareId,
  authorName 
}: ShareModalProps) {
  const [activeTab, setActiveTab] = useState('quote-card');
  
  const shareUrl = shareId 
    ? `${typeof window !== 'undefined' ? window.location.origin : ''}/gallery/${shareId}`
    : typeof window !== 'undefined' ? window.location.href : '';

  const handleQuickShare = async (platform: string) => {
    const shareText = `Check out this amazing teacher communication snippet I found on Zaza Promptly! ✨\\n\\n"${content.substring(0, 120)}..."\\n\\n`;
    
    switch (platform) {
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`, '_blank');
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank');
        break;
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`, '_blank');
        break;
      case 'email':
        window.open(`mailto:?subject=Great Teacher Communication Snippet&body=${encodeURIComponent(shareText + shareUrl)}`, '_blank');
        break;
    }
  };

  const handleCopyLink = async () => {
    await navigator.clipboard.writeText(shareUrl);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-purple-600" />
            Share Your Teacher Communication
          </DialogTitle>
          <DialogDescription>
            Create beautiful quote cards or share directly with fellow educators
          </DialogDescription>
        </DialogHeader>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="quote-card" className="flex items-center gap-2">
              <Image className="h-4 w-4" />
              Quote Card
            </TabsTrigger>
            <TabsTrigger value="quick-share" className="flex items-center gap-2">
              <Share2 className="h-4 w-4" />
              Quick Share
            </TabsTrigger>
            <TabsTrigger value="community" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Community
            </TabsTrigger>
          </TabsList>

          <TabsContent value="quote-card" className="mt-6">
            <div className="space-y-4">
              <div className="text-center mb-6">
                <h3 className="text-lg font-semibold mb-2">Create a Beautiful Quote Card</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Transform your snippet into a shareable visual that looks great on social media
                </p>
              </div>
              
              <QuoteCard
                content={content}
                tone={tone}
                category={category}
                shareId={shareId}
                authorName={authorName}
              />
            </div>
          </TabsContent>

          <TabsContent value="quick-share" className="mt-6">
            <div className="space-y-6">
              <div className="text-center mb-6">
                <h3 className="text-lg font-semibold mb-2">Share Instantly</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Quick sharing options for various platforms and channels
                </p>
              </div>

              {/* Social Media Sharing */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button
                  onClick={() => handleQuickShare('twitter')}
                  className="flex flex-col items-center gap-2 h-20 bg-blue-500 hover:bg-blue-600"
                >
                  <span className="text-lg">🐦</span>
                  <span className="text-xs">Twitter</span>
                </Button>
                
                <Button
                  onClick={() => handleQuickShare('facebook')}
                  className="flex flex-col items-center gap-2 h-20 bg-blue-600 hover:bg-blue-700"
                >
                  <span className="text-lg">📘</span>
                  <span className="text-xs">Facebook</span>
                </Button>
                
                <Button
                  onClick={() => handleQuickShare('linkedin')}
                  className="flex flex-col items-center gap-2 h-20 bg-blue-700 hover:bg-blue-800"
                >
                  <span className="text-lg">💼</span>
                  <span className="text-xs">LinkedIn</span>
                </Button>
                
                <Button
                  onClick={() => handleQuickShare('email')}
                  className="flex flex-col items-center gap-2 h-20 bg-gray-600 hover:bg-gray-700"
                >
                  <span className="text-lg">📧</span>
                  <span className="text-xs">Email</span>
                </Button>
              </div>

              {/* Copy Link Section */}
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                <div className="flex items-center gap-3">
                  <Link className="h-5 w-5 text-gray-500" />
                  <div className="flex-1">
                    <h4 className="font-medium mb-1">Share Link</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                      {shareUrl}
                    </p>
                  </div>
                  <Button
                    onClick={handleCopyLink}
                    variant="outline"
                    size="sm"
                  >
                    Copy
                  </Button>
                </div>
              </div>

              {/* Message Preview */}
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                <h4 className="font-medium mb-2 flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" />
                  Message Preview
                </h4>
                <div className="bg-white dark:bg-gray-800 rounded p-3 text-sm">
                  <p className="mb-2">
                    Check out this amazing teacher communication snippet I found on Zaza Promptly! ✨
                  </p>
                  <p className="italic text-gray-600 dark:text-gray-400 mb-2">
                    "{content.substring(0, 120)}..."
                  </p>
                  <p className="text-purple-600 dark:text-purple-400">
                    {shareUrl}
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="community" className="mt-6">
            <div className="space-y-6">
              <div className="text-center mb-6">
                <h3 className="text-lg font-semibold mb-2">Share with Community</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Help fellow educators by sharing your snippet with the Zaza Promptly community
                </p>
              </div>

              {/* Community Sharing Info */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div className="p-4 border rounded-lg">
                  <div className="text-2xl mb-2">👥</div>
                  <h4 className="font-medium">Reach Educators</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Share with thousands of teachers worldwide
                  </p>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <div className="text-2xl mb-2">⭐</div>
                  <h4 className="font-medium">Get Recognition</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Earn credits and badges for helpful content
                  </p>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <div className="text-2xl mb-2">💡</div>
                  <h4 className="font-medium">Inspire Others</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Help colleagues communicate better
                  </p>
                </div>
              </div>

              {/* Share Button */}
              {shareId ? (
                <div className="text-center p-6 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                  <div className="text-green-600 dark:text-green-400 mb-2">✅ Already Shared!</div>
                  <p className="text-sm">
                    Your snippet is available in the community gallery
                  </p>
                  <Button
                    onClick={() => window.open(`/gallery/${shareId}`, '_blank')}
                    variant="outline"
                    size="sm"
                    className="mt-2"
                  >
                    View in Gallery
                  </Button>
                </div>
              ) : (
                <div className="text-center">
                  <ShareButton
                    content={content}
                    tone={tone}
                    category={category}
                    className="bg-purple-600 hover:bg-purple-700"
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    By sharing, you agree to make your snippet publicly available
                  </p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
