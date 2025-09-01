import { setRequestLocale } from 'next-intl/server';
import { PricingCTA } from '@/components/site/pricing-cta';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, X, Sparkles, Users, Building } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pricing - Zaza Promptly AI Tools for Educators',
  description: 'Choose the perfect plan for your teaching needs. Start free, upgrade when ready. Transparent pricing for individual teachers and schools.',
};

type Props = {
  params: Promise<{locale: string}>;
};

export default async function PricingPage({params}: Props) {
  const {locale} = await params;
  setRequestLocale(locale);

  const comparisonFeatures = [
    {
      category: "AI Comments & Feedback",
      features: [
        { name: "AI-generated comments per month", free: "5", pro: "Unlimited", school: "Unlimited" },
        { name: "Custom comment templates", free: false, pro: true, school: true },
        { name: "Bulk comment processing", free: false, pro: true, school: true },
        { name: "Multi-language support", free: false, pro: true, school: true },
      ]
    },
    {
      category: "Templates & Customization", 
      features: [
        { name: "Pre-built comment templates", free: true, pro: true, school: true },
        { name: "Custom rubric creation", free: false, pro: true, school: true },
        { name: "Subject-specific templates", free: false, pro: true, school: true },
        { name: "Branded templates", free: false, pro: false, school: true },
      ]
    },
    {
      category: "Support & Training",
      features: [
        { name: "Email support", free: true, pro: true, school: true },
        { name: "Priority support", free: false, pro: true, school: true },
        { name: "Live chat support", free: false, pro: false, school: true },
        { name: "Dedicated account manager", free: false, pro: false, school: true },
        { name: "Custom training sessions", free: false, pro: false, school: true },
      ]
    },
    {
      category: "Administration",
      features: [
        { name: "User management dashboard", free: false, pro: false, school: true },
        { name: "SSO integration", free: false, pro: false, school: true },
        { name: "Usage analytics", free: false, pro: false, school: true },
        { name: "Data export capabilities", free: false, pro: true, school: true },
      ]
    }
  ];

  const renderFeatureValue = (value: string | boolean) => {
    if (typeof value === 'boolean') {
      return value ? (
        <Check className="h-5 w-5 text-green-500 mx-auto" />
      ) : (
        <X className="h-5 w-5 text-gray-300 mx-auto" />
      );
    }
    return <span className="text-sm font-medium">{value}</span>;
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-purple-50 via-white to-pink-50 py-20 lg:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Choose Your Plan
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Start free and upgrade when you&rsquo;re ready. All plans include our core AI commenting features 
              with transparent pricing and no hidden fees.
            </p>
            <div className="flex justify-center items-center space-x-4 text-sm text-gray-500">
              <span className="flex items-center">
                <Check className="h-4 w-4 text-green-500 mr-2" />
                No setup fees
              </span>
              <span className="flex items-center">
                <Check className="h-4 w-4 text-green-500 mr-2" />
                Cancel anytime
              </span>
              <span className="flex items-center">
                <Check className="h-4 w-4 text-green-500 mr-2" />
                14-day free trial
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Pricing Section */}
      <PricingCTA />

      {/* Detailed Comparison */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
              Compare All Features
            </h2>
            <p className="text-xl text-gray-600">
              See exactly what&rsquo;s included in each plan
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-lg shadow-lg">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left p-6 font-semibold text-gray-900">Features</th>
                  <th className="text-center p-6 w-32">
                    <div className="flex flex-col items-center">
                      <Sparkles className="h-6 w-6 text-purple-500 mb-2" />
                      <span className="font-semibold text-gray-900">Free</span>
                    </div>
                  </th>
                  <th className="text-center p-6 w-32">
                    <div className="flex flex-col items-center">
                      <Users className="h-6 w-6 text-purple-600 mb-2" />
                      <span className="font-semibold text-gray-900">Pro</span>
                    </div>
                  </th>
                  <th className="text-center p-6 w-32">
                    <div className="flex flex-col items-center">
                      <Building className="h-6 w-6 text-purple-700 mb-2" />
                      <span className="font-semibold text-gray-900">School</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonFeatures.map((category, categoryIndex) => (
                  <>
                    <tr key={`category-${categoryIndex}`} className="bg-gray-50">
                      <td colSpan={4} className="p-4">
                        <h3 className="font-semibold text-gray-900">{category.category}</h3>
                      </td>
                    </tr>
                    {category.features.map((feature, featureIndex) => (
                      <tr key={`${categoryIndex}-${featureIndex}`} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="p-4 text-gray-700">{feature.name}</td>
                        <td className="p-4 text-center">{renderFeatureValue(feature.free)}</td>
                        <td className="p-4 text-center">{renderFeatureValue(feature.pro)}</td>
                        <td className="p-4 text-center">{renderFeatureValue(feature.school)}</td>
                      </tr>
                    ))}
                  </>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
              Frequently Asked Questions
            </h2>
          </div>
          
          <div className="grid gap-8 md:grid-cols-2 max-w-5xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>Can I change plans later?</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Yes! You can upgrade or downgrade your plan at any time. Changes take effect on your next billing cycle.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Is my student data safe?</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Absolutely. We follow strict FERPA guidelines and never store or share student personal information. 
                  All data is encrypted and processed securely.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Do you offer school discounts?</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Yes! We offer significant discounts for schools and districts. Contact our sales team for custom pricing 
                  based on your number of teachers.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>What if I&rsquo;m not satisfied?</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  We offer a 30-day money-back guarantee. If you&rsquo;re not completely satisfied, 
                  we&rsquo;ll refund your payment, no questions asked.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl mb-4">
            Ready to Save 5+ Hours Per Week?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of teachers who are already using AI to streamline their feedback process 
            and reclaim their time.
          </p>
          <Button 
            size="lg" 
            variant="secondary"
            asChild
            className="bg-white text-purple-600 hover:bg-gray-100"
          >
            <a href="https://teach.zazatechnologies.com">
              Start Free Trial
            </a>
          </Button>
        </div>
      </section>
    </div>
  );
}