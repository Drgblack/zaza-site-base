'use client';

import { useState } from 'react';
import { downloadPDF } from '@/lib/pdf-download';

interface DownloadButtonProps {
  resourceType: string;
  children: React.ReactNode;
  className?: string;
}

export function DownloadButton({ resourceType, children, className = '' }: DownloadButtonProps) {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    try {
      setIsDownloading(true);
      await downloadPDF(resourceType);
    } catch (error) {
      console.error('Download failed:', error);
      alert('Download failed. Please try again later.');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <button
      onClick={handleDownload}
      disabled={isDownloading}
      className={`${className} ${isDownloading ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {isDownloading ? 'Preparing Download...' : children}
    </button>
  );
}