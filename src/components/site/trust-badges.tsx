'use client';

import { Shield, Lock, Award, Users, Globe, CheckCircle } from 'lucide-react';

export function TrustBadges() {
  const badges = [
    {
      icon: Shield,
      title: "GDPR Compliant",
      description: "Full compliance with European data protection regulations"
    },
    {
      icon: Lock,
      title: "Secure Stripe Payments",
      description: "Bank-level encryption for all payment processing"
    },
    {
      icon: Award,
      title: "Teacher-First Design",
      description: "Built by educators with PhD-level educational expertise"
    },
    {
      icon: Users,
      title: "Trusted by 10,000+",
      description: "Teachers worldwide rely on our AI tools daily"
    },
    {
      icon: Globe,
      title: "International Support",
      description: "Multi-language support for diverse school communities"
    },
    {
      icon: CheckCircle,
      title: "99.9% Uptime",
      description: "Reliable service you can count on every day"
    }
  ];

  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold mb-4">Trusted & Secure</h2>
          <p className="text-gray-600 dark:text-gray-300">
            Your data privacy and security are our top priorities
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {badges.map((badge, index) => (
            <div key={index} className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full mb-4">
                <badge.icon className="h-8 w-8 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{badge.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                {badge.description}
              </p>
            </div>
          ))}
        </div>

        {/* Additional Trust Indicators */}
        <div className="mt-16 pt-12 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-green-500" />
              <span>SOC 2 Compliant</span>
            </div>
            <div className="flex items-center gap-2">
              <Lock className="h-4 w-4 text-blue-500" />
              <span>256-bit SSL Encryption</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-purple-500" />
              <span>ISO 27001 Standards</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4 text-orange-500" />
              <span>Global Data Centers</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}