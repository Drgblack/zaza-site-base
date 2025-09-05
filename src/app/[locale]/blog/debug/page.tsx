import { setRequestLocale } from 'next-intl/server';
import { debugBlogContent } from '@/lib/blog/debug-service';

type Props = {
  params: Promise<{locale: string}>;
};

export default async function BlogDebugPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const debugResult = await debugBlogContent();

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Blog Service Debug</h1>
        
        {/* Summary */}
        <div className="bg-white rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Summary</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="font-medium">Content Directory:</span>
              <span className={`ml-2 ${debugResult.summary?.contentDirExists ? 'text-green-600' : 'text-red-600'}`}>
                {debugResult.summary?.contentDirExists ? '✓ Exists' : '✗ Missing'}
              </span>
            </div>
            <div>
              <span className="font-medium">Blog Directory:</span>
              <span className={`ml-2 ${debugResult.summary?.blogDirExists ? 'text-green-600' : 'text-red-600'}`}>
                {debugResult.summary?.blogDirExists ? '✓ Exists' : '✗ Missing'}
              </span>
            </div>
            <div>
              <span className="font-medium">Total Files:</span>
              <span className="ml-2">{debugResult.summary?.totalFiles || 0}</span>
            </div>
            <div>
              <span className="font-medium">Blog Files:</span>
              <span className="ml-2">{debugResult.summary?.blogFiles || 0}</span>
            </div>
          </div>
        </div>

        {/* Errors */}
        {debugResult.errors && debugResult.errors.length > 0 && (
          <div className="bg-red-50 rounded-lg p-6 mb-6">
            <h2 className="text-xl font-semibold text-red-800 mb-4">Errors</h2>
            <ul className="space-y-2">
              {debugResult.errors.map((error: string, index: number) => (
                <li key={index} className="text-red-700">• {error}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Info */}
        {debugResult.info && debugResult.info.length > 0 && (
          <div className="bg-blue-50 rounded-lg p-6 mb-6">
            <h2 className="text-xl font-semibold text-blue-800 mb-4">Information</h2>
            <ul className="space-y-1">
              {debugResult.info.map((info: string, index: number) => (
                <li key={index} className="text-blue-700 text-sm">• {info}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Sample Content */}
        {debugResult.sampleContent && (
          <div className="bg-green-50 rounded-lg p-6 mb-6">
            <h2 className="text-xl font-semibold text-green-800 mb-4">
              Sample Content: {debugResult.sampleContent.filename}
            </h2>
            <div className="mb-4">
              <span className="font-medium">Has YAML frontmatter:</span>
              <span className={`ml-2 ${debugResult.sampleContent.hasYamlFrontmatter ? 'text-green-600' : 'text-red-600'}`}>
                {debugResult.sampleContent.hasYamlFrontmatter ? '✓ Yes' : '✗ No'}
              </span>
            </div>
            <div>
              <h3 className="font-medium mb-2">First 10 lines:</h3>
              <pre className="bg-white p-4 rounded border text-sm overflow-x-auto">
                {debugResult.sampleContent.firstLines.join('\n')}
              </pre>
            </div>
          </div>
        )}

        {/* Raw Debug Data */}
        <details className="bg-gray-100 rounded-lg p-6">
          <summary className="cursor-pointer font-medium text-gray-900 mb-4">
            Raw Debug Data
          </summary>
          <pre className="text-xs overflow-x-auto whitespace-pre-wrap">
            {JSON.stringify(debugResult, null, 2)}
          </pre>
        </details>
      </div>
    </div>
  );
}