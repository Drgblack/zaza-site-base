import { setRequestLocale } from 'next-intl/server';

type Props = {
  params: Promise<{locale: string}>;
};

export default async function BlogPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">
          Blog Test Page
        </h1>
        <p className="text-gray-600">
          This is a minimal test page to check if the basic route works.
        </p>
      </div>
    </div>
  );
}