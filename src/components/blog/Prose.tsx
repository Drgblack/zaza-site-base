export default function Prose({ children }: { children: React.ReactNode }) {
  return (
    <article className="prose prose-lg prose-gray max-w-none 
      prose-headings:font-semibold prose-headings:text-gray-900
      prose-h1:text-3xl prose-h1:md:text-4xl
      prose-h2:text-2xl prose-h2:md:text-3xl prose-h2:scroll-mt-24
      prose-h3:text-xl prose-h3:md:text-2xl
      prose-p:text-gray-900 prose-p:leading-relaxed
      prose-a:text-purple-600 prose-a:no-underline hover:prose-a:text-purple-700 hover:prose-a:underline
      prose-strong:text-gray-900 prose-strong:font-semibold
      prose-blockquote:border-l-4 prose-blockquote:border-purple-500 prose-blockquote:bg-purple-50 prose-blockquote:py-2 prose-blockquote:px-4
      prose-blockquote:text-gray-900 prose-blockquote:not-italic
      prose-li:text-gray-900 prose-li:marker:text-purple-500
      prose-hr:border-gray-300
      prose-img:rounded-xl prose-img:shadow-lg
      prose-figcaption:text-gray-600 prose-figcaption:text-sm prose-figcaption:text-center prose-figcaption:mt-2
      prose-code:text-purple-600 prose-code:bg-purple-50 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:text-sm
      prose-pre:bg-gray-900 prose-pre:text-gray-100"
      style={{
        '--tw-prose-body': '#111827',
        '--tw-prose-headings': '#111827', 
        '--tw-prose-lead': '#111827',
        '--tw-prose-links': '#7c3aed',
        '--tw-prose-bold': '#111827',
        '--tw-prose-counters': '#6b7280',
        '--tw-prose-bullets': '#7c3aed',
        '--tw-prose-hr': '#e5e7eb',
        '--tw-prose-quotes': '#111827',
        '--tw-prose-quote-borders': '#7c3aed',
        '--tw-prose-captions': '#6b7280',
        '--tw-prose-code': '#7c3aed',
        '--tw-prose-pre-code': '#e5e7eb',
        '--tw-prose-pre-bg': '#1f2937',
        '--tw-prose-th-borders': '#d1d5db',
        '--tw-prose-td-borders': '#e5e7eb',
        color: '#111827'
      } as React.CSSProperties}>
      {children}
    </article>
  );
}