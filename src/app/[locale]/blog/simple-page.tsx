import { setRequestLocale } from 'next-intl/server';

type Props = {
  params: Promise<{locale: string}>;
};

export default async function SimpleBlogPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8">Blog - Simple Test</h1>
        <p className="text-gray-600">
          This is a simplified blog page to test basic functionality.
        </p>
      </div>
    </div>
  );
}