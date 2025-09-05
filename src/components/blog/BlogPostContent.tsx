'use client';

import { MDXRemote } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import { useEffect, useState } from 'react';
import { BlogPost } from '@/lib/blog/types';

// Custom MDX components
const mdxComponents = {
  h1: ({ children }: any) => (
    <h1 className="text-3xl font-bold text-gray-900 mt-8 mb-4 first:mt-0">
      {children}
    </h1>
  ),
  h2: ({ children }: any) => (
    <h2 className="text-2xl font-bold text-gray-900 mt-6 mb-4">
      {children}
    </h2>
  ),
  h3: ({ children }: any) => (
    <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
      {children}
    </h3>
  ),
  h4: ({ children }: any) => (
    <h4 className="text-lg font-semibold text-gray-900 mt-4 mb-2">
      {children}
    </h4>
  ),
  p: ({ children }: any) => (
    <p className="text-gray-700 leading-relaxed mb-4">
      {children}
    </p>
  ),
  a: ({ href, children }: any) => (
    <a 
      href={href}
      className="text-purple-600 hover:text-purple-700 underline"
      target={href?.startsWith('http') ? '_blank' : undefined}
      rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
    >
      {children}
    </a>
  ),
  ul: ({ children }: any) => (
    <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1">
      {children}
    </ul>
  ),
  ol: ({ children }: any) => (
    <ol className="list-decimal list-inside text-gray-700 mb-4 space-y-1">
      {children}
    </ol>
  ),
  li: ({ children }: any) => (
    <li className="ml-4">{children}</li>
  ),
  blockquote: ({ children }: any) => (
    <blockquote className="border-l-4 border-purple-500 pl-6 italic text-gray-600 my-6 bg-purple-50 py-4 rounded-r-lg">
      {children}
    </blockquote>
  ),
  code: ({ children, className }: any) => {
    const isInline = !className;
    if (isInline) {
      return (
        <code className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm font-mono">
          {children}
        </code>
      );
    }
    return (
      <code className={className}>
        {children}
      </code>
    );
  },
  pre: ({ children }: any) => (
    <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-4 text-sm">
      {children}
    </pre>
  ),
  img: ({ src, alt }: any) => (
    <div className="my-6">
      <img 
        src={src} 
        alt={alt} 
        className="w-full rounded-lg shadow-md"
      />
      {alt && (
        <p className="text-sm text-gray-500 text-center mt-2 italic">
          {alt}
        </p>
      )}
    </div>
  ),
  strong: ({ children }: any) => (
    <strong className="font-semibold text-gray-900">{children}</strong>
  ),
  em: ({ children }: any) => (
    <em className="italic">{children}</em>
  ),
  hr: () => (
    <hr className="border-t border-gray-300 my-8" />
  ),
  table: ({ children }: any) => (
    <div className="overflow-x-auto my-6">
      <table className="min-w-full border-collapse border border-gray-300">
        {children}
      </table>
    </div>
  ),
  thead: ({ children }: any) => (
    <thead className="bg-gray-50">
      {children}
    </thead>
  ),
  tbody: ({ children }: any) => (
    <tbody>
      {children}
    </tbody>
  ),
  tr: ({ children }: any) => (
    <tr className="border-b border-gray-200">
      {children}
    </tr>
  ),
  th: ({ children }: any) => (
    <th className="border border-gray-300 px-4 py-2 text-left font-semibold">
      {children}
    </th>
  ),
  td: ({ children }: any) => (
    <td className="border border-gray-300 px-4 py-2">
      {children}
    </td>
  )
};

interface BlogPostContentProps {
  post: BlogPost;
}

export default function BlogPostContent({ post }: BlogPostContentProps) {
  const [mdxSource, setMdxSource] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const serializeMDX = async () => {
      try {
        const serialized = await serialize(post.content, {
          mdxOptions: {
            remarkPlugins: [],
            rehypePlugins: [],
          }
        });
        setMdxSource(serialized);
      } catch (error) {
        console.error('Error serializing MDX:', error);
      } finally {
        setIsLoading(false);
      }
    };

    serializeMDX();
  }, [post.content]);

  if (isLoading) {
    return (
      <div className="prose prose-lg max-w-none">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
        </div>
      </div>
    );
  }

  if (!mdxSource) {
    return (
      <div className="prose prose-lg max-w-none">
        <p className="text-gray-600">Unable to load content.</p>
      </div>
    );
  }

  return (
    <article className="prose prose-lg max-w-none">
      <MDXRemote 
        {...mdxSource} 
        components={mdxComponents}
      />
    </article>
  );
}