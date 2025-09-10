import { setRequestLocale } from 'next-intl/server';

type Props = {
  params: Promise<{locale: string}>;
};

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="min-h-screen bg-white p-8">
      <h1 className="text-4xl font-bold text-center mb-8">
        Promptly - Simple Test Page
      </h1>
      <p className="text-lg text-center text-gray-600">
        Locale: {locale}
      </p>
      <p className="text-center mt-4">
        This is a minimal test to verify the routing is working.
      </p>
    </div>
  );
}