'use client';

import { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Download, 
  Share2, 
  Copy,
  Palette,
  Zap,
  Heart
} from 'lucide-react';

interface QuoteCardProps {
  content: string;
  tone: string;
  category: string;
  authorName?: string;
  shareId?: string;
}

const BRAND_THEMES = [
  {
    id: 'purple',
    name: 'Zaza Purple',
    background: 'linear-gradient(135deg, #8B5CF6 0%, #A78BFA 100%)',
    text: '#FFFFFF',
    accent: '#F3F4F6'
  },
  {
    id: 'blue',
    name: 'Ocean Blue', 
    background: 'linear-gradient(135deg, #3B82F6 0%, #60A5FA 100%)',
    text: '#FFFFFF',
    accent: '#F3F4F6'
  },
  {
    id: 'green',
    name: 'Teacher Green',
    background: 'linear-gradient(135deg, #10B981 0%, #34D399 100%)',
    text: '#FFFFFF',
    accent: '#F3F4F6'
  },
  {
    id: 'orange',
    name: 'Warm Orange',
    background: 'linear-gradient(135deg, #F59E0B 0%, #FBBF24 100%)',
    text: '#FFFFFF',
    accent: '#F3F4F6'
  },
  {
    id: 'pink',
    name: 'Caring Pink',
    background: 'linear-gradient(135deg, #EC4899 0%, #F472B6 100%)',
    text: '#FFFFFF',
    accent: '#F3F4F6'
  },
  {
    id: 'minimalist',
    name: 'Minimalist',
    background: '#FFFFFF',
    text: '#1F2937',
    accent: '#6B7280',
    border: '2px solid #E5E7EB'
  }
];

export function QuoteCard({ content, tone, category, authorName, shareId }: QuoteCardProps) {
  const [selectedTheme, setSelectedTheme] = useState(BRAND_THEMES[0]);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const getToneIcon = (tone: string) => {
    switch (tone.toLowerCase()) {
      case 'professional': return '💼';
      case 'friendly': return '😊';
      case 'encouraging': return '🌟';
      case 'direct': return '🎯';
      case 'caring': return '❤️';
      case 'celebratory': return '🎉';
      default: return '✨';
    }
  };

  const handleDownloadCard = async () => {
    setIsGeneratingImage(true);
    
    try {
      // Import html2canvas dynamically to avoid SSR issues
      const html2canvas = (await import('html2canvas')).default;
      
      if (cardRef.current) {
        const canvas = await html2canvas(cardRef.current, {
          backgroundColor: null,
          scale: 2,
          logging: false,
          useCORS: true
        });
        
        // Convert to blob and download
        canvas.toBlob((blob) => {
          if (blob) {
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `zaza-quote-${shareId || Date.now()}.png`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
          }
        });
      }
    } catch (error) {
      console.error('Error generating quote card image:', error);
    } finally {
      setIsGeneratingImage(false);
    }
  };

  const handleShareCard = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Zaza Promptly - Teacher Communication',
          text: content.substring(0, 100) + '...',
          url: shareId ? `${window.location.origin}/gallery/${shareId}` : window.location.href
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback to copy link
      const shareUrl = shareId ? `${window.location.origin}/gallery/${shareId}` : window.location.href;
      await navigator.clipboard.writeText(shareUrl);
    }
  };

  const handleCopyText = async () => {
    await navigator.clipboard.writeText(content);
  };

  return (
    <div className=\"space-y-4\">
      {/* Theme Selector */}
      <div className=\"flex flex-wrap gap-2\">
        <span className=\"text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-1\">
          <Palette className=\"h-4 w-4\" />
          Theme:
        </span>
        {BRAND_THEMES.map((theme) => (
          <Button
            key={theme.id}
            variant={selectedTheme.id === theme.id ? \"default\" : \"outline\"}
            size=\"sm\"
            onClick={() => setSelectedTheme(theme)}
            className=\"h-8 px-3\"
          >
            {theme.name}
          </Button>
        ))}
      </div>

      {/* Quote Card Preview */}
      <div className=\"flex justify-center\">
        <div
          ref={cardRef}
          className=\"w-full max-w-2xl aspect-[4/3] p-8 rounded-xl shadow-lg relative overflow-hidden\"
          style={{
            background: selectedTheme.background,
            color: selectedTheme.text,
            border: selectedTheme.border || 'none'
          }}
        >
          {/* Background Pattern */}
          <div className=\"absolute inset-0 opacity-5\" style={{
            backgroundImage: `url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")`
          }} />

          {/* Content */}
          <div className=\"relative z-10 h-full flex flex-col justify-between\">
            {/* Header */}
            <div className=\"flex items-start justify-between mb-6\">
              <div className=\"flex items-center gap-3\">
                <div className=\"p-2 rounded-lg bg-white/10 backdrop-blur-sm\">
                  <span className=\"text-2xl\">{getToneIcon(tone)}</span>
                </div>
                <div>
                  <h3 className=\"font-bold text-xl\">Zaza Promptly</h3>
                  <p className=\"opacity-80 text-sm\">Teacher Communication Made Easy</p>
                </div>
              </div>
              <Badge 
                variant=\"secondary\" 
                className=\"bg-white/10 backdrop-blur-sm border-0\"
                style={{ color: selectedTheme.text }}
              >
                {tone}
              </Badge>
            </div>

            {/* Quote Content */}
            <div className=\"flex-1 flex items-center justify-center\">
              <div className=\"text-center max-w-lg\">
                <div className=\"text-6xl opacity-20 mb-4\">"</div>
                <p className=\"text-lg leading-relaxed font-medium mb-4\">
                  {content}
                </p>
                <div className=\"text-6xl opacity-20 rotate-180\"">{\"\\u201D\"}</div>
              </div>
            </div>

            {/* Footer */}
            <div className=\"flex items-center justify-between pt-4 border-t border-white/10\">
              <div className=\"flex items-center gap-2\">
                <Badge 
                  variant=\"outline\" 
                  className=\"border-white/20 text-xs\"
                  style={{ color: selectedTheme.text, borderColor: selectedTheme.text + '33' }}
                >
                  {category}
                </Badge>
                {authorName && (
                  <p className=\"text-sm opacity-80\">by {authorName}</p>
                )}
              </div>
              <div className=\"flex items-center gap-2 opacity-60\">
                <Zap className=\"h-4 w-4\" />
                <span className=\"text-xs\">zazapromptly.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className=\"flex flex-wrap gap-3 justify-center\">
        <Button
          onClick={handleDownloadCard}
          disabled={isGeneratingImage}
          className=\"flex items-center gap-2\"
        >
          <Download className=\"h-4 w-4\" />
          {isGeneratingImage ? 'Generating...' : 'Download Card'}
        </Button>
        
        <Button
          onClick={handleShareCard}
          variant=\"outline\"
          className=\"flex items-center gap-2\"
        >
          <Share2 className=\"h-4 w-4\" />
          Share Link
        </Button>
        
        <Button
          onClick={handleCopyText}
          variant=\"outline\"
          className=\"flex items-center gap-2\"
        >
          <Copy className=\"h-4 w-4\" />
          Copy Text
        </Button>
      </div>

      {/* Tips */}
      <div className=\"bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 text-center\">
        <p className=\"text-sm text-blue-700 dark:text-blue-300 flex items-center justify-center gap-2\">
          <Heart className=\"h-4 w-4\" />
          Share beautiful quote cards on social media to inspire fellow educators!
        </p>
      </div>
    </div>
  );
}