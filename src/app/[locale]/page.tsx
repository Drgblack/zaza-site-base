import { Hero } from '@/components/home/Hero';
import { HowItWorks } from '@/components/home/HowItWorks';
import { SocialProof } from '@/components/home/SocialProof';
import { HomeDemo } from '@/components/home/HomeDemo';
import { ValueProps } from '@/components/home/ValueProps';

type Props = {
  params: Promise<{locale: string}>;
};

export default async function HomePage({params}: Props) {
  const {locale} = await params;

  return (
    <div className="min-h-screen">
      {/* Hero Section - Above the fold */}
      <Hero />

      {/* How It Works - Compact 3 steps */}
      <HowItWorks />

      {/* Social Proof Strip */}
      <SocialProof />

      {/* Demo Block - AI Comment Generator */}
      <HomeDemo />

      {/* Value Props - 3 tightened cards */}
      <ValueProps />

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-br from-purple-600 to-pink-600">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Save 5+ Hours Every Week?
          </h2>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            Join thousands of educators who've transformed their teaching with AI-powered tools.
          </p>
          <a
            href="https://teach.zazatechnologies.com"
            className="bg-white text-purple-600 py-4 px-8 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors shadow-lg inline-block"
          >
            Start Free Trial
          </a>
        </div>
      </section>
    </div>
  );
}