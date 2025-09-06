'use client';

import { Button } from "@/components/ui/button";
import { Download } from 'lucide-react';

interface DownloadButtonProps {
  href: string;
  children: React.ReactNode;
  variant?: "default" | "outline" | "ghost" | "link" | "destructive" | "secondary";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
}

export function DownloadButton({ 
  href, 
  children, 
  variant = "outline", 
  size = "sm",
  className = "" 
}: DownloadButtonProps) {
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = href;
    link.download = href.split('/').pop() || 'download';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Button 
      variant={variant} 
      size={size} 
      onClick={handleDownload}
      className={`hover:bg-purple-50 dark:hover:bg-purple-950/20 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 ${className}`}
    >
      <Download className="h-3 w-3 mr-1" />
      {children}
    </Button>
  );
}