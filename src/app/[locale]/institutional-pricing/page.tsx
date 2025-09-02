import { InstitutionalPricing } from '@/components/pricing/institutional-pricing';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Institutional Pricing - Schools & Districts | Zaza Promptly',
  description: 'Affordable pricing plans for schools, districts, and educational organizations. Advanced admin controls, analytics, and bulk management features.',
  keywords: ['institutional pricing', 'school pricing', 'district pricing', 'education pricing', 'bulk licensing', 'educational discounts'],
};

export default function InstitutionalPricingPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-purple-600 via-purple-700 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Pricing for Schools & Districts
          </h1>
          <p className="text-xl md:text-2xl text-purple-100 max-w-3xl mx-auto mb-8">
            Empower your entire organization with AI-powered communication tools designed for education.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="h-5 w-5 text-purple-200">🔒</div>
              <span>Enterprise security & compliance</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-5 w-5 text-purple-200">📊</div>
              <span>Advanced analytics & reporting</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-5 w-5 text-purple-200">👥</div>
              <span>Bulk user management</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-5 w-5 text-purple-200">🎓</div>
              <span>Dedicated education support</span>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <InstitutionalPricing />
        </div>
      </section>

      {/* Why Choose Zaza for Your Institution */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">Why Educational Organizations Choose Zaza</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Save Time District-Wide</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Average of 5+ hours saved per teacher per week on communication tasks
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📈</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Improve Communication</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Standardized, professional communication templates across your organization
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💰</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Reduce Costs</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Significant ROI through improved efficiency and reduced administrative overhead
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔒</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Maintain Privacy</h3>
              <p className="text-gray-600 dark:text-gray-400">
                FERPA-compliant with enterprise-grade security and data protection
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Easy Deployment</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Quick setup with SSO integration and bulk user provisioning
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎓</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Education-First</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Built specifically for educators by educators who understand your needs
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Trusted by Educational Leaders</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                  ML
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold">Dr. Maria Lopez</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Superintendent, Springfield School District
                  </p>
                </div>
              </div>
              <p className="text-gray-700 dark:text-gray-300 italic">
                "Zaza Promptly has transformed how our 200+ teachers communicate with parents. 
                We've seen a 40% reduction in time spent on routine communications and much 
                more consistent messaging across our schools."
              </p>
            </div>

            <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                  JW
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold">James Wilson</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Principal, Roosevelt High School
                  </p>
                </div>
              </div>
              <p className="text-gray-700 dark:text-gray-300 italic">
                "The admin dashboard gives us incredible insights into communication patterns. 
                Our teachers love the shared snippet banks, and parents have noticed the improvement 
                in clarity and consistency."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Ready to Get Started */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your School's Communication?</h2>
          <p className="text-xl text-purple-100 mb-8">
            Join thousands of educators already using Zaza Promptly to save time and improve communication.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition-colors">
              Schedule a Demo
            </button>
            <button className="border-2 border-white text-white hover:bg-white/10 px-8 py-3 rounded-lg font-semibold transition-colors">
              Start Free Trial
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}