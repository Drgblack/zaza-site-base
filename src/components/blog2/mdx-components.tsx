// MDX components for blog2 system
import React from 'react';

export const Callout = ({ children, type = 'info' }: { 
  children: React.ReactNode; 
  type?: 'info' | 'warning' | 'error' | 'success' 
}) => {
  const colors = {
    info: 'bg-blue-50 border-blue-200 text-blue-800',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    error: 'bg-red-50 border-red-200 text-red-800',
    success: 'bg-green-50 border-green-200 text-green-800'
  };

  return (
    <div className={`p-4 rounded-lg border ${colors[type]} my-4`}>
      {children}
    </div>
  );
};

export const CodeBlock = ({ children, language }: { 
  children: React.ReactNode; 
  language?: string 
}) => (
  <div className="bg-gray-900 text-gray-100 rounded-lg p-4 my-4 overflow-x-auto">
    <code className="text-sm">{children}</code>
  </div>
);

export const Highlight = ({ children }: { children: React.ReactNode }) => (
  <span className="bg-yellow-200 px-1 rounded">{children}</span>
);

export const PromptBox = ({ children, title }: { 
  children: React.ReactNode; 
  title?: string 
}) => (
  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 my-4">
    {title && (
      <h4 className="font-semibold text-gray-900 mb-2">{title}</h4>
    )}
    <div className="text-gray-700">{children}</div>
  </div>
);

export const TipBox = ({ children, type = 'tip' }: { 
  children: React.ReactNode; 
  type?: 'tip' | 'warning' | 'note' 
}) => {
  const colors = {
    tip: 'bg-green-50 border-green-200 text-green-800',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    note: 'bg-blue-50 border-blue-200 text-blue-800'
  };

  return (
    <div className={`p-4 rounded-lg border ${colors[type]} my-4`}>
      {children}
    </div>
  );
};

// Export all components that might be used in MDX
export const mdxComponents = {
  Callout,
  CodeBlock,
  Highlight,
  PromptBox,
  TipBox,
  // Add any other custom components used in blog posts
};