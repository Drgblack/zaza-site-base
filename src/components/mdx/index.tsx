// MDX Components for blog posts

interface CalloutProps {
  variant?: 'note' | 'tip' | 'warning' | 'error';
  title?: string;
  children: React.ReactNode;
}

export function Callout({ variant = 'note', title, children }: CalloutProps) {
  const variants = {
    note: 'bg-blue-50 border-blue-200 text-blue-900 border-l-blue-500',
    tip: 'bg-emerald-50 border-emerald-200 text-emerald-900 border-l-emerald-500',
    warning: 'bg-amber-50 border-amber-200 text-amber-900 border-l-amber-500',
    error: 'bg-red-50 border-red-200 text-red-900 border-l-red-500',
  };

  return (
    <aside className={`not-prose rounded-xl border border-l-4 p-6 my-6 ${variants[variant]}`}>
      {title && <div className="mb-2 text-sm font-semibold uppercase tracking-wide opacity-80">{title}</div>}
      <div className="text-sm leading-relaxed">{children}</div>
    </aside>
  );
}

interface PromptBoxProps {
  title?: string;
  category?: string;
  prompt: string;
  variables?: string[];
}

export function PromptBox({ title, category, prompt, variables }: PromptBoxProps) {
  return (
    <div className="bg-gray-50 border rounded-lg p-6 mb-6">
      {title && <h4 className="font-semibold text-lg mb-2">{title}</h4>}
      {category && <span className="inline-block bg-purple-100 text-purple-800 text-sm px-2 py-1 rounded mb-3">{category}</span>}
      <div className="bg-white p-4 rounded border font-mono text-sm whitespace-pre-wrap">
        {prompt}
      </div>
      {variables && variables.length > 0 && (
        <div className="mt-3">
          <p className="text-sm font-medium mb-1">Variables to customize:</p>
          <div className="flex flex-wrap gap-1">
            {variables.map((variable, index) => (
              <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                {variable}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

interface ZazaCTAProps {
  type?: string;
  title?: string;
  description?: string;
  variant?: string;
}

export function ZazaCTA({ title, description }: ZazaCTAProps) {
  return (
    <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 mb-6">
      {title && <h4 className="font-semibold text-lg mb-2">{title}</h4>}
      {description && <p className="text-gray-700 mb-4">{description}</p>}
      <a 
        href="/"
        className="inline-block bg-purple-600 text-white px-4 py-2 rounded font-medium hover:bg-purple-700 transition-colors"
      >
        Try Zaza Promptly Free
      </a>
    </div>
  );
}

// PullQuote component for highlighting key quotes
interface PullQuoteProps {
  children: React.ReactNode;
  author?: string;
}

export function PullQuote({ children, author }: PullQuoteProps) {
  return (
    <blockquote className="not-prose my-8 rounded-2xl bg-gradient-to-r from-purple-600/10 to-blue-600/10 p-8 border-l-4 border-purple-500">
      <div className="text-xl font-medium leading-relaxed text-gray-900 mb-4">
        {children}
      </div>
      {author && (
        <cite className="text-sm font-medium text-gray-600 not-italic">
          — {author}
        </cite>
      )}
    </blockquote>
  );
}

// Figure component for enhanced images with captions
interface FigureProps {
  src: string;
  alt: string;
  caption?: string;
  className?: string;
}

export function Figure({ src, alt, caption, className = "" }: FigureProps) {
  return (
    <figure className={`not-prose my-8 ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img 
        src={src} 
        alt={alt} 
        className="w-full rounded-xl shadow-lg" 
      />
      {caption && (
        <figcaption className="mt-3 text-sm text-gray-600 text-center">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

// Export all components for MDX
export const components = {
  Callout,
  PromptBox,
  ZazaCTA,
  PullQuote,
  Figure,
};