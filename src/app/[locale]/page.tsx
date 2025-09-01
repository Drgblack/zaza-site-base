type Props = {
  params: Promise<{locale: string}>;
};

export default async function HomePage({params}: Props) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const {locale} = await params;

  return (
    <div className="flex flex-col min-h-screen">
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-white to-pink-50">
        <div className="container px-4 md:px-6 pt-16">
          <div className="text-center space-y-8">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Zaza Promptly
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              AI-powered tools that help teachers save 5+ hours per week with intelligent lesson planning, grading assistance, and classroom management.
            </p>
            <div className="space-y-4">
              <a 
                href="https://teach.zazatechnologies.com"
                className="inline-block px-8 py-4 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors"
              >
                Get Started
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}