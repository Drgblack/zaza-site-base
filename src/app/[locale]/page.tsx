import { Hero } from '@/components/site/hero';
import { Features } from '@/components/site/features';
import { EmailCaptureForm } from '@/components/EmailCaptureForm';

type Props = {
  params: Promise<{locale: string}>;
};

export default async function HomePage({params}: Props) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const {locale} = await params;

  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <Features />
      <section id="waitlist" className="py-24 bg-gray-50 dark:bg-gray-800">
        <div className="container px-4 md:px-6">
          <div className="max-w-md mx-auto text-center">
            <h2 className="text-3xl font-bold tracking-tighter mb-4">
              Join the Waitlist
            </h2>
            <p className="text-gray-500 mb-8 dark:text-gray-400">
              Be the first to experience AI-powered teaching tools.
            </p>
            <EmailCaptureForm />
          </div>
        </div>
      </section>
    </div>
  );
}