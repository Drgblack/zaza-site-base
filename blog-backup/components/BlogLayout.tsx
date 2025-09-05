import { ReactNode } from 'react';
import { Metadata } from 'next';

interface BlogLayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
  showStats?: boolean;
  className?: string;
}

export default function BlogLayout({ 
  children, 
  title = "AI in Education Blog - Zaza Promptly",
  description = "Transform your teaching with AI-powered strategies, tips, and tools designed specifically for educators.",
  showStats = true,
  className = ""
}: BlogLayoutProps) {
  return (
    <div className={`min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 ${className}`}>
      {children}
    </div>
  );
}

// Metadata generator for blog pages
export function generateBlogMetadata(
  title: string,
  description: string,
  image?: string
): Metadata {
  const fullTitle = `${title} - Zaza Promptly`;
  const ogImage = image || '/images/blog/enhanced-og-blog.jpg';

  return {
    title: fullTitle,
    description,
    keywords: [
      'AI education blog', 
      'teacher resources', 
      'educational technology', 
      'teaching tips',
      'AI tools for teachers',
      'parent communication',
      'classroom management',
      'teacher productivity'
    ],
    authors: [{ name: 'Zaza Promptly Team' }],
    openGraph: {
      title: fullTitle,
      description,
      type: 'website',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title
        }
      ],
      siteName: 'Zaza Promptly'
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [ogImage]
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}