import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Static Test Page',
  description: 'Testing static routing without dynamic [locale]',
};

export default function StaticTestPage() {
  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Static Test Page
        </h1>
        <p className="text-lg text-gray-600">
          This is a static route test to isolate the [locale] dynamic routing issue.
        </p>
        <p className="text-gray-600 mt-4">
          If this loads successfully, the issue is with the dynamic [locale] routing.
        </p>
      </div>
    </div>
  );
}