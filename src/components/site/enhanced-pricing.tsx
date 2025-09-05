'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Check } from 'lucide-react'

const pricingTiers = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    description: 'Perfect for trying out Promptly',
    gradient: 'from-gray-600 to-gray-800',
    bgGradient: 'from-gray-50 to-gray-100',
    features: [
      '5 comments per month',
      'Basic student comment templates',
      'Email support',
      'GDPR compliant'
    ],
    cta: 'Start Free',
    ctaLink: '/pricing'
  },
  {
    name: 'Teacher Pro',
    price: '$14.99',
    period: 'per month',
    description: 'Everything you need for professional communication',
    gradient: 'from-blue-600 to-purple-600',
    bgGradient: 'from-blue-50 to-purple-50',
    popular: true,
    features: [
      'Unlimited comments & emails',
      'Parent communication templates',
      'Student report assistance',
      'Advanced tone controls',
      'Priority support',
      'School-safe & GDPR compliant',
      'Custom prompts & templates'
    ],
    bonuses: [
      'Free teacher resource downloads',
      'Weekly productivity tips',
      '30-day money-back guarantee'
    ],
    cta: 'Start 14-Day Free Trial',
    ctaLink: '/pricing'
  },
  {
    name: 'School License',
    price: 'Custom',
    period: 'pricing',
    description: 'For schools and districts',
    gradient: 'from-emerald-600 to-teal-600',
    bgGradient: 'from-emerald-50 to-teal-50',
    features: [
      'Everything in Teacher Pro',
      'Bulk user management',
      'School branding options',
      'Advanced analytics',
      'Dedicated support manager',
      'Training workshops',
      'Custom integrations'
    ],
    cta: 'Contact Sales',
    ctaLink: '/contact'
  }
]

const faqs = [
  {
    question: 'Can I cancel anytime?',
    answer: 'Yes, you can cancel your subscription at any time with no questions asked. Your access continues until the end of your current billing period.'
  },
  {
    question: 'Is this safe for student data?',
    answer: 'Absolutely. Promptly is GDPR compliant and designed specifically for educational use. We never store student names or personal information.'
  },
  {
    question: 'What makes this different from ChatGPT?',
    answer: 'Promptly is built specifically for teachers with safety guardrails, pedagogically-sound templates, and teacher-friendly language - not generic AI responses.'
  }
]

export function EnhancedPricing() {
  const [isAnnual, setIsAnnual] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-purple-200/30 to-pink-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-br from-blue-200/30 to-cyan-200/30 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="mb-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
            TRUSTED BY 12,000+ TEACHERS
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Choose Your Teaching Superpower
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From free forever access to enterprise solutions - find the perfect fit for your teaching journey
          </p>
        </div>

        {/* Billing Toggle */}
        <div className="flex items-center justify-center mb-12">
          <span className={`mr-3 ${!isAnnual ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>
            Monthly
          </span>
          <button
            onClick={() => setIsAnnual(!isAnnual)}
            className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                isAnnual ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
          <span className={`ml-3 ${isAnnual ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>
            Annual
          </span>
          {isAnnual && (
            <Badge className="ml-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white">
              Save 20%
            </Badge>
          )}
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
          {pricingTiers.map((tier, index) => (
            <Card
              key={tier.name}
              className={`relative group transition-all duration-300 ${
                tier.popular ? 'scale-105 md:scale-110 ring-2 ring-purple-500 ring-offset-2' : 'hover:scale-105'
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
                  <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                    Most Popular
                  </Badge>
                </div>
              )}

              <div className={`h-full bg-gradient-to-br ${tier.bgGradient} rounded-lg`}>
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl font-bold text-gray-900 mb-2">
                    {tier.name}
                  </CardTitle>
                  <p className="text-gray-600 mb-4">{tier.description}</p>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-gray-900">
                      {tier.price}
                    </span>
                    {tier.period && (
                      <span className="text-gray-500 ml-1">/{tier.period}</span>
                    )}
                    {tier.name === 'Teacher Pro' && isAnnual && (
                      <div className="mt-2">
                        <span className="text-lg text-gray-500 line-through">$179.88</span>
                        <span className="text-2xl font-bold text-green-600 ml-2">$143.90</span>
                        <div className="text-sm text-green-600">Save $35.98/year</div>
                      </div>
                    )}
                  </div>
                </CardHeader>

                <CardContent>
                  <div className="mb-8">
                    <h4 className="font-semibold text-gray-900 mb-4">Everything included:</h4>
                    <ul className="space-y-3">
                      {tier.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start">
                          <Check className="w-5 h-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {tier.bonuses && (
                      <div className="mt-6 pt-6 border-t border-gray-200">
                        <h4 className="font-semibold text-gray-900 mb-4">Bonus includes:</h4>
                        <ul className="space-y-2">
                          {tier.bonuses.map((bonus, idx) => (
                            <li key={idx} className="flex items-start">
                              <Check className="w-4 h-4 text-purple-600 mt-1 mr-2 flex-shrink-0" />
                              <span className="text-gray-600 text-sm">{bonus}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  <Button
                    asChild
                    className={`w-full ${
                      tier.popular
                        ? `bg-gradient-to-r ${tier.gradient} text-white hover:shadow-lg`
                        : 'bg-white text-gray-900 border-2 border-gray-300 hover:border-gray-400 hover:bg-gray-50'
                    }`}
                  >
                    <a href={tier.ctaLink}>
                      {tier.cta}
                    </a>
                  </Button>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">
            Common Questions
          </h3>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <Card key={index} className="overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <span className="font-semibold text-gray-900">{faq.question}</span>
                  <svg
                    className={`w-5 h-5 text-gray-500 transition-transform ${
                      openFaq === index ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-lg text-gray-700 mb-6">
            Ready to transform your teaching workflow?
          </p>
          <Button
            asChild
            className="px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-full shadow-lg hover:shadow-xl"
          >
            <a href="/pricing">
              Start Your Free Trial Today
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          </Button>
          <p className="text-sm text-gray-500 mt-3">
            No credit card required • Cancel anytime • 30-day guarantee
          </p>
        </div>
      </div>
    </section>
  )
}