'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Share2, Copy, Facebook, Twitter, Linkedin, Mail, Check } from 'lucide-react';

interface ShareButtonProps {
  url?: string;
  title?: string;
  text?: string;
  className?: string;
}

export function ShareButton({ 
  url, 
  title = "Check this out!", 
  text = "",
  className = ""
}: ShareButtonProps) {
  const [copied, setCopied] = useState(false);
  
  const shareUrl = url || (typeof window !== 'undefined' ? window.location.href : '');
  const shareText = text || title;

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: shareText,
          url: shareUrl,
        });
        
        // Track sharing event
        if (typeof window !== 'undefined') {
          localStorage.setItem('zaza-shares', 
            String(parseInt(localStorage.getItem('zaza-shares') || '0') + 1)
          );
        }
      } catch (error) {
        console.log('Error sharing:', error);
      }
    }
  };

  const handleCopy = async () => {
    try {
      // Generate referral URL
      const referralUrl = `${shareUrl}${shareUrl.includes('?') ? '&' : '?'}ref=share`;
      await navigator.clipboard.writeText(referralUrl);
      setCopied(true);
      
      // Track copy event
      if (typeof window !== 'undefined') {
        localStorage.setItem('zaza-shares', 
          String(parseInt(localStorage.getItem('zaza-shares') || '0') + 1)
        );
      }
      
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const handleSocialShare = (platform: string) => {
    const referralUrl = `${shareUrl}${shareUrl.includes('?') ? '&' : '?'}ref=${platform}`;
    let socialUrl = '';

    switch (platform) {
      case 'facebook':
        socialUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(referralUrl)}`;
        break;
      case 'twitter':
        socialUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(referralUrl)}`;
        break;
      case 'linkedin':
        socialUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(referralUrl)}`;
        break;
      case 'email':
        socialUrl = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`${shareText}\n\n${referralUrl}`)}`;
        break;
    }

    if (socialUrl) {
      window.open(socialUrl, '_blank', 'noopener,noreferrer');
      
      // Track social share
      if (typeof window !== 'undefined') {
        localStorage.setItem('zaza-shares', 
          String(parseInt(localStorage.getItem('zaza-shares') || '0') + 1)
        );
        localStorage.setItem(`zaza-share-${platform}`, 
          String(parseInt(localStorage.getItem(`zaza-share-${platform}`) || '0') + 1)
        );
      }
    }
  };

  // Check if native sharing is available
  const hasNativeShare = typeof navigator !== 'undefined' && navigator.share;

  if (hasNativeShare) {
    return (
      <Button
        onClick={handleNativeShare}
        variant="outline"
        size="sm"
        className={`flex items-center gap-2 ${className}`}
      >
        <Share2 className="w-4 h-4" />
        Share
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className={`flex items-center gap-2 ${className}`}>
          <Share2 className="w-4 h-4" />
          Share
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuItem onClick={handleCopy} className="cursor-pointer">
          {copied ? (
            <>
              <Check className="w-4 h-4 mr-2 text-green-500" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="w-4 h-4 mr-2" />
              Copy Link
            </>
          )}
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => handleSocialShare('facebook')} 
          className="cursor-pointer"
        >
          <Facebook className="w-4 h-4 mr-2 text-blue-600" />
          Share on Facebook
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => handleSocialShare('twitter')} 
          className="cursor-pointer"
        >
          <Twitter className="w-4 h-4 mr-2 text-blue-400" />
          Share on Twitter
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => handleSocialShare('linkedin')} 
          className="cursor-pointer"
        >
          <Linkedin className="w-4 h-4 mr-2 text-blue-700" />
          Share on LinkedIn
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => handleSocialShare('email')} 
          className="cursor-pointer"
        >
          <Mail className="w-4 h-4 mr-2" />
          Share via Email
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}