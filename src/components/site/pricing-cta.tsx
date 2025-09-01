'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Check } from 'lucide-react';

export function PricingCTA() {
  const handleStripeCheckout = (planType: string) => {
    // Environment variables will be used for Stripe URLs
    const checkoutUrl = process.env.NEXT_PUBLIC_STRIPE_CHECKOUT_MONTHLY || 'https://buy.stripe.com/placeholder';
    window.open(checkoutUrl, '_blank');
  };

  return (
    <section className="py-24 bg-white dark:bg-gray-900">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Simple, Transparent Pricing
          </h2>
          <p className="mt-4 text-gray-500 md:text-xl dark:text-gray-400">
            Start free, upgrade when you're ready
          </p>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
          {/* Free Plan */}
          <Card>
            <CardHeader>
              <CardTitle>Free</CardTitle>
              <CardDescription>Perfect for trying out Zaza Promptly</CardDescription>
              <div className="text-3xl font-bold">$0<span className="text-sm font-normal">/month</span></div>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2">
                {['5 AI comments per month', 'Basic templates', 'Email support'].map((feature) => (
                  <li key={feature} className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-green-500" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button className="w-full" variant="outline">
                Get Started Free
              </Button>
            </CardContent>
          </Card>

          {/* Pro Plan */}
          <Card className="border-purple-200 relative">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <span className="bg-purple-500 text-white px-3 py-1 text-sm font-medium rounded-full">
                Most Popular
              </span>
            </div>
            <CardHeader>
              <CardTitle>Pro</CardTitle>
              <CardDescription>For active teachers and educators</CardDescription>
              <div className="text-3xl font-bold">$29<span className="text-sm font-normal">/month</span></div>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2">
                {['Unlimited AI comments', 'Advanced templates', 'Priority support', 'Custom rubrics', 'Bulk processing'].map((feature) => (
                  <li key={feature} className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-green-500" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button 
                className="w-full" 
                onClick={() => handleStripeCheckout('monthly')}
              >
                Start Pro Trial
              </Button>
            </CardContent>
          </Card>

          {/* School Plan */}
          <Card>
            <CardHeader>
              <CardTitle>School</CardTitle>
              <CardDescription>For schools and districts</CardDescription>
              <div className="text-3xl font-bold">Custom</div>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2">
                {['Everything in Pro', 'Admin dashboard', 'SSO integration', 'Custom training', 'Dedicated support'].map((feature) => (
                  <li key={feature} className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-green-500" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button className="w-full" variant="outline">
                Contact Sales
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
