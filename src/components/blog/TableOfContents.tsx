'use client';

import { useEffect, useState } from 'react';

interface TocItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  content: string;
}

export function TableOfContents({ content }: TableOfContentsProps) {
  const [toc, setToc] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    // Extract headings from markdown content
    const headingRegex = /^(#{2,3})\s+(.+)$/gm;
    const headings: TocItem[] = [];
    let match;

    while ((match = headingRegex.exec(content)) !== null) {
      const level = match[1].length;
      const text = match[2].trim();
      const id = text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
      
      headings.push({ id, text, level });
    }

    setToc(headings);
  }, [content]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-100px 0px -66% 0px'
      }
    );

    // Wait for the MDX content to render, then observe headings
    const timer = setTimeout(() => {
      toc.forEach(({ id }) => {
        const element = document.getElementById(id);
        if (element) {
          observer.observe(element);
        }
      });
    }, 100);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [toc]);

  if (toc.length === 0) {
    return null;
  }

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -80; // Account for fixed header
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className="sticky top-24 bg-white rounded-lg shadow-lg p-6 max-h-[calc(100vh-120px)] overflow-y-auto">
      <h3 className="font-semibold text-gray-900 mb-4">Table of Contents</h3>
      <nav className="space-y-2">
        {toc.map(({ id, text, level }) => (
          <button
            key={id}
            onClick={() => scrollToHeading(id)}
            className={`
              block text-left w-full px-3 py-1 text-sm rounded transition-colors
              ${level === 2 ? 'font-medium' : 'pl-6 font-normal'}
              ${activeId === id 
                ? 'bg-purple-100 text-purple-700 font-medium' 
                : 'text-gray-600 hover:text-purple-600 hover:bg-purple-50'
              }
            `}
          >
            {text}
          </button>
        ))}
      </nav>
    </div>
  );
}