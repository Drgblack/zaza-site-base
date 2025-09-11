import {getTranslations} from 'next-intl/server';
import {setRequestLocale} from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { Button } from '@/components/ui/button';

type Props = {
  params: Promise<{locale: string}>;
};

export default async function HomePage({params}: Props) {
  const {locale} = await params;
  setRequestLocale(locale);
  
  const hero = await getTranslations('hero');
  const features = await getTranslations('features');

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            {hero('title')}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            {hero('subtitle')}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button asChild size="lg" className="text-lg">
              <a href="https://teach.zazatechnologies.com">
                {hero('cta_primary')}
              </a>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg">
              <Link href="/resources">
                View Resources
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {features('title')}
            </h2>
            <p className="text-xl text-gray-600">
              {features('subtitle')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">⚡</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {features('instant_feedback.title')}
              </h3>
              <p className="text-gray-600">
                {features('instant_feedback.description')}
              </p>
            </div>
            
            <div className="text-center p-8 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">⏰</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {features('time_saving.title')}
              </h3>
              <p className="text-gray-600">
                {features('time_saving.description')}
              </p>
            </div>
            
            <div className="text-center p-8 bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl">
              <div className="w-16 h-16 bg-pink-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">🎯</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {features('student_focused.title')}
              </h3>
              <p className="text-gray-600">
                {features('student_focused.description')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-purple-600 to-pink-600">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to transform your teaching?
          </h2>
          <p className="text-xl text-purple-100 mb-8">
            Join thousands of educators already using AI to enhance their classroom experience.
          </p>
          <Button asChild size="lg" variant="secondary" className="text-lg">
            <a href="https://teach.zazatechnologies.com">
              {hero('cta_primary')}
            </a>
          </Button>
        </div>
      </section>
    </div>
  );
}