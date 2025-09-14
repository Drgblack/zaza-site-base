import { MDXRemote } from 'next-mdx-remote/rsc';
import type { MDXComponents } from 'mdx/types';

// Helper function to generate heading IDs
const generateId = (text: string): string => {
  return text.toString().toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
};

// Custom components for MDX
const components: MDXComponents = {
  h1: ({ children, ...props }) => {
    const id = generateId(children?.toString() || '');
    return (
      <h1 id={id} className="text-3xl font-bold text-gray-900 mb-6 mt-8 first:mt-0" {...props}>
        {children}
      </h1>
    );
  },
  h2: ({ children, ...props }) => {
    const id = generateId(children?.toString() || '');
    return (
      <h2 id={id} className="text-2xl font-semibold text-gray-900 mb-4 mt-8" {...props}>
        {children}
      </h2>
    );
  },
  h3: ({ children, ...props }) => {
    const id = generateId(children?.toString() || '');
    return (
      <h3 id={id} className="text-xl font-semibold text-gray-900 mb-3 mt-6" {...props}>
        {children}
      </h3>
    );
  },
  h4: ({ children, ...props }) => (
    <h4 className="text-lg font-semibold text-gray-900 mb-2 mt-4" {...props}>
      {children}
    </h4>
  ),
  p: ({ children, ...props }) => (
    <p className="text-gray-700 leading-relaxed mb-4" {...props}>
      {children}
    </p>
  ),
  ul: ({ children, ...props }) => (
    <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2" {...props}>
      {children}
    </ul>
  ),
  ol: ({ children, ...props }) => (
    <ol className="list-decimal list-inside text-gray-700 mb-4 space-y-2" {...props}>
      {children}
    </ol>
  ),
  li: ({ children, ...props }) => (
    <li className="leading-relaxed" {...props}>
      {children}
    </li>
  ),
  blockquote: ({ children, ...props }) => (
    <blockquote 
      className="border-l-4 border-purple-300 pl-6 py-2 mb-4 bg-purple-50 rounded-r-lg" 
      {...props}
    >
      {children}
    </blockquote>
  ),
  code: ({ children, ...props }) => (
    <code 
      className="bg-gray-100 text-purple-700 px-2 py-1 rounded text-sm font-mono" 
      {...props}
    >
      {children}
    </code>
  ),
  pre: ({ children, ...props }) => (
    <pre 
      className="bg-gray-900 text-gray-100 p-4 rounded-lg mb-4 overflow-x-auto" 
      {...props}
    >
      {children}
    </pre>
  ),
  a: ({ children, href, ...props }) => (
    <a 
      href={href}
      className="text-purple-600 hover:text-purple-700 hover:underline" 
      target={href?.startsWith('http') ? '_blank' : undefined}
      rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
      {...props}
    >
      {children}
    </a>
  ),
  img: ({ src, alt, ...props }) => (
    <img 
      src={src} 
      alt={alt} 
      className="w-full rounded-lg shadow-md mb-4"
      {...props}
    />
  ),
  table: ({ children, ...props }) => (
    <div className="overflow-x-auto mb-4">
      <table className="w-full border-collapse border border-gray-300" {...props}>
        {children}
      </table>
    </div>
  ),
  thead: ({ children, ...props }) => (
    <thead className="bg-gray-50" {...props}>
      {children}
    </thead>
  ),
  th: ({ children, ...props }) => (
    <th className="border border-gray-300 px-4 py-2 text-left font-semibold text-gray-900" {...props}>
      {children}
    </th>
  ),
  td: ({ children, ...props }) => (
    <td className="border border-gray-300 px-4 py-2 text-gray-700" {...props}>
      {children}
    </td>
  ),
  strong: ({ children, ...props }) => (
    <strong className="font-semibold text-gray-900" {...props}>
      {children}
    </strong>
  ),
  em: ({ children, ...props }) => (
    <em className="italic text-gray-700" {...props}>
      {children}
    </em>
  ),
};

interface MDXContentProps {
  content: string;
}

export function MDXContent({ content }: MDXContentProps) {
  return (
    <div className="prose prose-lg max-w-none">
      <MDXRemote source={content} components={components} />
    </div>
  );
}