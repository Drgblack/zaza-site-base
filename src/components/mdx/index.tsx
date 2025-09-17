// MDX Components for blog posts

interface CalloutProps {
  type?: 'tip' | 'warning' | 'info' | 'error';
  title?: string;
  children: React.ReactNode;
}

export function Callout({ type = 'info', title, children }: CalloutProps) {
  const colors = {
    tip: 'bg-green-50 border-green-200 text-green-800',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    info: 'bg-blue-50 border-blue-200 text-blue-800',
    error: 'bg-red-50 border-red-200 text-red-800',
  };

  return (
    <div className={`p-4 rounded-lg border-l-4 mb-6 ${colors[type]}`}>
      {title && <h4 className="font-semibold mb-2">{title}</h4>}
      <div>{children}</div>
    </div>
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

// Export all components for MDX
export const components = {
  Callout,
  PromptBox,
  ZazaCTA,
};