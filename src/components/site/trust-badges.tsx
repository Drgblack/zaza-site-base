'use client';

import { Shield, Lock, Award, Users, Globe, CheckCircle, CreditCard, RefreshCw, Clock } from 'lucide-react';

export function TrustBadges({ variant = 'default' }: { variant?: 'default' | 'checkout' | 'compact' }) {
  const badges = [
    {
      icon: Shield,
      title: "30-Day Money-Back Guarantee",
      description: "Not satisfied? Get a full refund within 30 days, no questions asked",
      color: "text-green-500",
      bgColor: "bg-green-100 dark:bg-green-900/30"
    },
    {
      icon: CreditCard,
      title: "Secure Stripe Payments",
      description: "Bank-level encryption with automatic VAT handling for EU customers",
      color: "text-blue-500",
      bgColor: "bg-blue-100 dark:bg-blue-900/30"
    },
    {
      icon: Lock,
      title: "GDPR & Data Security",
      description: "Full compliance with European data protection regulations",
      color: "text-purple-500",
      bgColor: "bg-purple-100 dark:bg-purple-900/30"
    },
    {
      icon: Users,
      title: "Trusted by 10,000+ Teachers",
      description: "Educators worldwide rely on our AI tools daily",
      color: "text-pink-500",
      bgColor: "bg-pink-100 dark:bg-pink-900/30"
    },
    {
      icon: Award,
      title: "Teacher-First Design",
      description: "Built by educators with PhD-level educational expertise",
      color: "text-orange-500",
      bgColor: "bg-orange-100 dark:bg-orange-900/30"
    },
    {
      icon: CheckCircle,
      title: "99.9% Uptime SLA",
      description: "Reliable service you can count on every school day",
      color: "text-teal-500",
      bgColor: "bg-teal-100 dark:bg-teal-900/30"
    }
  ];

  const checkoutTrustItems = [
    {
      icon: '🔒',
      title: 'Secure Checkout',
      subtitle: 'Stripe Payment Processing'
    },
    {
      icon: '🛡️',
      title: '256-bit SSL Encryption',
      subtitle: 'Bank-level security'
    },
    {
      icon: '🇪🇺',
      title: 'GDPR Compliant',
      subtitle: 'EU data protection'
    },
    {
      icon: '💰',
      title: '30-Day Guarantee',
      subtitle: 'Full money-back'
    },
    {
      icon: '⚡',
      title: 'Instant Access',
      subtitle: 'Account activated immediately'
    },
    {
      icon: '📧',
      title: 'Email Receipt',
      subtitle: 'Automatic confirmation'
    }
  ];

  if (variant === 'checkout') {
    return (
      <div className="py-8 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-6">
            <h3 className="text-lg font-semibold mb-2">Secure & Trusted Checkout</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Your payment information is encrypted and secure
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {checkoutTrustItems.map((item, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl mb-2">{item.icon}</div>
                <div className="text-xs font-medium text-gray-900 dark:text-gray-100">{item.title}</div>
                <div className="text-xs text-gray-500">{item.subtitle}</div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 text-center">
            <div className="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <RefreshCw className="h-4 w-4 text-green-500" />
              <span>Cancel anytime • No long-term contracts • Transparent pricing</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div className="flex flex-wrap items-center justify-center gap-6 py-8 text-sm text-gray-600 dark:text-gray-400">
        <div className="flex items-center gap-2">
          <Shield className="h-4 w-4 text-green-500" />
          <span>30-day money-back guarantee</span>
        </div>
        <div className="flex items-center gap-2">
          <CreditCard className="h-4 w-4 text-blue-500" />
          <span>Secure payments by Stripe</span>
        </div>
        <div className="flex items-center gap-2">
          <Users className="h-4 w-4 text-purple-500" />
          <span>Trusted by 10,000+ teachers</span>
        </div>
        <div className="flex items-center gap-2">
          <Lock className="h-4 w-4 text-orange-500" />
          <span>GDPR compliant & secure</span>
        </div>
      </div>
    );
  }

  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Trusted & Secure</h2>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Your data privacy, security, and satisfaction are our top priorities
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {badges.map((badge, index) => (
            <div key={index} className="text-center group hover:scale-105 transition-transform duration-200">
              <div className={`inline-flex items-center justify-center w-16 h-16 ${badge.bgColor} rounded-full mb-4 group-hover:shadow-lg transition-shadow duration-200`}>
                <badge.icon className={`h-8 w-8 ${badge.color}`} />
              </div>
              <h3 className="text-lg font-semibold mb-2">{badge.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                {badge.description}
              </p>
            </div>
          ))}
        </div>

        {/* Money-back Guarantee Highlight */}
        <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-2xl p-8 mb-12">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-500 rounded-full mb-4">
              <RefreshCw className="h-10 w-10 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Risk-Free 30-Day Trial</h3>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-6">
              Try Zaza Promptly completely risk-free. If you're not 100% satisfied within 30 days, 
              we'll refund every penny, no questions asked.
            </p>
            <div className="flex items-center justify-center gap-8 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Full refund within 30 days</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-blue-500" />
                <span>Cancel anytime</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-purple-500" />
                <span>No questions asked</span>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Security Badges */}
        <div className="pt-8 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-green-500" />
              <span>SOC 2 Type II Certified</span>
            </div>
            <div className="flex items-center gap-2">
              <Lock className="h-4 w-4 text-blue-500" />
              <span>256-bit SSL Encryption</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-purple-500" />
              <span>ISO 27001 Compliant</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4 text-orange-500" />
              <span>EU Data Residency</span>
            </div>
            <div className="flex items-center gap-2">
              <CreditCard className="h-4 w-4 text-pink-500" />
              <span>PCI DSS Level 1</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}