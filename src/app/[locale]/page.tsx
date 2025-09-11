type Props = {
  params: Promise<{locale: string}>;
};

export default async function HomePage({params}: Props) {
  const {locale} = await params;

  return (
    <div className="min-h-screen bg-white p-8">
      <h1 className="text-4xl font-bold text-center text-gray-900">
        Welcome to Zaza Promptly
      </h1>
      <p className="text-center text-gray-600 mt-4">
        AI-powered parent communication for teachers - Locale: {locale}
      </p>
      <div className="text-center mt-8">
        <p className="text-green-600 font-semibold">
          ✅ If you can see this, the basic routing is working!
        </p>
      </div>
    </div>
  );
}