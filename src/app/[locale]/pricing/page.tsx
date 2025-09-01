import { setRequestLocale } from 'next-intl/server';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Check, 
  Shield, 
  CreditCard, 
  Users, 
  Star,
  ChevronDown,
  Zap,
  Heart,
  Award
} from 'lucide-react';
import { FAQSection } from '@/components/site/faq-section';
import { TrustBadges } from '@/components/site/trust-badges';
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

  const plans = [
    {
      name: "Free Plan",
      price: "Free",
      description: "Perfect to get started",
      features: [
        "5 AI-generated messages per month",
        "Basic parent communication templates",
        "Email support",
        "Getting started guide"
      ],
      buttonText: "Start Free",
      buttonVariant: "outline" as const,
      popular: false
    },
    {
      name: "Promptly Pro",
      price: "€14.99",
      period: "/month",
      description: "For active teachers",
      features: [
        "Unlimited AI-generated messages",
        "Advanced tone customization",
        "Multi-language translation",
        "Zara Assistant chat support",
        "Priority email support",
        "Custom templates library",
        "Bulk message processing"
      ],
      buttonText: "Upgrade to Pro",
      buttonVariant: "default" as const,
      popular: true,
      link: process.env.NEXT_PUBLIC_STRIPE_CHECKOUT_PROMPTLY_MONTHLY
    },
    {
      name: "School & District",
      price: "Custom",
      description: "For educational institutions",
      features: [
        "Everything in Pro",
        "Admin dashboard & analytics",
        "Bulk teacher accounts",
        "Custom branding",
        "Dedicated account manager",
        "Live chat support",
        "Custom training sessions",
        "SSO integration"
      ],
      buttonText: "Contact Sales",
      buttonVariant: "outline" as const,
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-br from-purple-50 via-pink-50/30 to-blue-50/30 dark:from-purple-900/20 dark:via-pink-900/10 dark:to-blue-900/10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Simple Pricing for Every Teacher
            </h1>
            <p className="mt-6 text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Start free and upgrade when you're ready. No hidden fees, no long-term contracts. Cancel anytime.
            </p>
            
            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center justify-center gap-6 mt-8">
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <Shield className="h-4 w-4 text-green-500" />
                <span>30-day money-back guarantee</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <CreditCard className="h-4 w-4 text-blue-500" />
                <span>Secure payments by Stripe</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <Users className="h-4 w-4 text-purple-500" />
                <span>Trusted by 10,000+ teachers</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {plans.map((plan, index) => (
              <Card key={index} className={`relative overflow-hidden ${
                plan.popular 
                  ? 'border-purple-200 dark:border-purple-800 shadow-lg scale-105' 
                  : 'border-gray-200 dark:border-gray-700'
              }`}>
                {plan.popular && (
                  <div className="absolute top-0 left-0 right-0">
                    <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white text-center py-2">
                      <Badge className="bg-white text-purple-600">
                        <Star className="h-3 w-3 mr-1" />
                        Most Popular
                      </Badge>
                    </div>
                  </div>
                )}
                
                <CardHeader className={plan.popular ? 'pt-16' : 'pt-8'}>
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-400">
                    {plan.description}
                  </CardDescription>
                  <div className="mt-4">
                    <div className="flex items-baseline">
                      <span className="text-4xl font-bold text-gray-900 dark:text-gray-100">
                        {plan.price}
                      </span>
                      {plan.period && (
                        <span className="text-lg text-gray-600 dark:text-gray-400 ml-1">
                          {plan.period}
                        </span>
                      )}
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-3">
                        <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button
                    asChild={!!plan.link}
                    variant={plan.buttonVariant}
                    size="lg"
                    className={`w-full ${
                      plan.popular 
                        ? 'bg-purple-600 hover:bg-purple-700 text-white' 
                        : ''
                    }`}
                  >
                    {plan.link ? (
                      <a
                        href={plan.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {plan.buttonText}
                      </a>
                    ) : (
                      <span>{plan.buttonText}</span>
                    )}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <TrustBadges />

      {/* Feature Comparison */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Compare Plans</h2>
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              See exactly what's included in each plan
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full bg-white dark:bg-gray-900 rounded-lg shadow-lg">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left p-6 font-semibold">Features</th>
                  <th className="text-center p-6 font-semibold">Free</th>
                  <th className="text-center p-6 font-semibold bg-purple-50 dark:bg-purple-900/20">
                    Pro
                    <Badge className="ml-2 bg-purple-600 text-white">Popular</Badge>
                  </th>
                  <th className="text-center p-6 font-semibold">School</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100 dark:border-gray-800">
                  <td className="p-6">AI-generated messages</td>
                  <td className="text-center p-6">5/month</td>
                  <td className="text-center p-6 bg-purple-50 dark:bg-purple-900/20">Unlimited</td>
                  <td className="text-center p-6">Unlimited</td>
                </tr>
                <tr className="border-b border-gray-100 dark:border-gray-800">
                  <td className="p-6">Tone customization</td>
                  <td className="text-center p-6">
                    <Check className="h-5 w-5 text-green-500 mx-auto" />
                  </td>
                  <td className="text-center p-6 bg-purple-50 dark:bg-purple-900/20">
                    <Check className="h-5 w-5 text-green-500 mx-auto" />
                  </td>
                  <td className="text-center p-6">
                    <Check className="h-5 w-5 text-green-500 mx-auto" />
                  </td>
                </tr>
                <tr className="border-b border-gray-100 dark:border-gray-800">
                  <td className="p-6">Translation support</td>
                  <td className="text-center p-6">-</td>
                  <td className="text-center p-6 bg-purple-50 dark:bg-purple-900/20">
                    <Check className="h-5 w-5 text-green-500 mx-auto" />
                  </td>
                  <td className="text-center p-6">
                    <Check className="h-5 w-5 text-green-500 mx-auto" />
                  </td>
                </tr>
                <tr className="border-b border-gray-100 dark:border-gray-800">
                  <td className="p-6">Zara Assistant</td>
                  <td className="text-center p-6">-</td>
                  <td className="text-center p-6 bg-purple-50 dark:bg-purple-900/20">
                    <Check className="h-5 w-5 text-green-500 mx-auto" />
                  </td>
                  <td className="text-center p-6">
                    <Check className="h-5 w-5 text-green-500 mx-auto" />
                  </td>
                </tr>
                <tr className="border-b border-gray-100 dark:border-gray-800">
                  <td className="p-6">Priority support</td>
                  <td className="text-center p-6">-</td>
                  <td className="text-center p-6 bg-purple-50 dark:bg-purple-900/20">
                    <Check className="h-5 w-5 text-green-500 mx-auto" />
                  </td>
                  <td className="text-center p-6">
                    <Check className="h-5 w-5 text-green-500 mx-auto" />
                  </td>
                </tr>
                <tr>
                  <td className="p-6">Admin dashboard</td>
                  <td className="text-center p-6">-</td>
                  <td className="text-center p-6 bg-purple-50 dark:bg-purple-900/20">-</td>
                  <td className="text-center p-6">
                    <Check className="h-5 w-5 text-green-500 mx-auto" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection />

      {/* Social Proof */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Join Thousands of Happy Teachers</h2>
            <div className="flex items-center justify-center gap-8 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span>4.9/5 rating</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span>10,000+ active teachers</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="h-4 w-4 text-red-500" />
                <span>98% satisfaction rate</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Zap className="h-16 w-16 mx-auto mb-6 opacity-90" />
          <h2 className="text-4xl font-bold mb-4">
            Ready to Transform Your Teaching?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of educators who are saving hours every week with AI-powered parent communication.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="bg-white text-purple-600 hover:bg-gray-100">
              Start Free Trial
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="text-white border-white hover:bg-white/10"
              asChild
            >
              <a
                href={process.env.NEXT_PUBLIC_STRIPE_CHECKOUT_PROMPTLY_MONTHLY}
                target="_blank"
                rel="noopener noreferrer"
              >
                Upgrade to Pro →
              </a>
            </Button>
          </div>
          <p className="text-sm opacity-75 mt-6">
            No credit card required • Cancel anytime • 30-day money-back guarantee
          </p>
        </div>
      </section>
    </div>
  );
}