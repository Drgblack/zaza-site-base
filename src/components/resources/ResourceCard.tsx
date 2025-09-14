'use client';
import { useState } from 'react';
import { Download, FileText, AlertCircle } from 'lucide-react';
import type { Resource } from '@/lib/resources.shared';
import { categoryColors } from '@/lib/resources.shared';

interface ResourceCardProps {
  resource: Resource;
}

export function ResourceCard({ resource }: ResourceCardProps) {
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadError, setDownloadError] = useState<string | null>(null);

  const handleDownload = async () => {
    if (!resource.fileExists) {
      setDownloadError('File not available');
      return;
    }

    try {
      setIsDownloading(true);
      setDownloadError(null);

      const response = await fetch(`/api/download?type=${resource.downloadType}`);
      
      if (!response.ok) {
        throw new Error('Download failed');
      }
      
      // Get the blob and create download
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      
      // Create download link
      const a = document.createElement('a');
      a.href = url;
      a.download = resource.filePath || `${resource.downloadType}.pdf`;
      document.body.appendChild(a);
      a.click();
      
      // Cleanup
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
    } catch (error) {
      console.error('Download failed:', error);
      setDownloadError('Download failed. Please try again later.');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 border border-gray-100 hover:border-purple-200">
      <div className="flex items-start justify-between mb-6">
        <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
          <span className="text-2xl" role="img" aria-label="Resource icon">
            {resource.icon}
          </span>
        </div>
        
        {resource.category && (
          <span className={`text-xs font-medium px-2 py-1 rounded-full ${categoryColors[resource.category]}`}>
            {resource.category.replace('-', ' ').toUpperCase()}
          </span>
        )}
      </div>

      <h3 className="text-xl font-bold text-gray-900 mb-3">
        {resource.title}
      </h3>
      
      <p className="text-gray-600 mb-6 leading-relaxed">
        {resource.description}
      </p>

      {/* File Information */}
      <div className="flex items-center text-sm text-gray-500 mb-6 space-x-4">
        <div className="flex items-center space-x-1">
          <FileText className="w-4 h-4" />
          <span>PDF</span>
        </div>
        {resource.fileSize && (
          <div className="flex items-center space-x-1">
            <span>{resource.fileSize}</span>
          </div>
        )}
        {resource.lastUpdated && (
          <div className="flex items-center space-x-1">
            <span>Updated {resource.lastUpdated.toLocaleDateString()}</span>
          </div>
        )}
      </div>

      {/* Download Button */}
      <button
        onClick={handleDownload}
        disabled={isDownloading || !resource.fileExists}
        className={`
          w-full flex items-center justify-center space-x-2 py-3 px-6 rounded-lg font-semibold transition-colors
          ${resource.fileExists
            ? 'bg-purple-600 text-white hover:bg-purple-700 focus:ring-4 focus:ring-purple-200'
            : 'bg-gray-200 text-gray-500 cursor-not-allowed'
          }
          ${isDownloading ? 'opacity-50 cursor-not-allowed' : ''}
        `}
        aria-label={`Download PDF: ${resource.title}${resource.fileSize ? ` (${resource.fileSize})` : ''}`}
      >
        {isDownloading ? (
          <>
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            <span>Preparing Download...</span>
          </>
        ) : resource.fileExists ? (
          <>
            <Download className="w-5 h-5" />
            <span>Download PDF</span>
          </>
        ) : (
          <>
            <AlertCircle className="w-5 h-5" />
            <span>File Not Available</span>
          </>
        )}
      </button>

      {/* Error Message */}
      {downloadError && (
        <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-600 flex items-center space-x-2">
            <AlertCircle className="w-4 h-4" />
            <span>{downloadError}</span>
          </p>
        </div>
      )}

      {/* File Status */}
      {!resource.fileExists && (
        <div className="mt-3 p-3 bg-amber-50 border border-amber-200 rounded-lg">
          <p className="text-sm text-amber-700">
            This resource is currently being prepared. Please check back soon.
          </p>
        </div>
      )}
    </div>
  );
}