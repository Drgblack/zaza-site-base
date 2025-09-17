import { Link } from '@/i18n/routing';

export default function PostCTA() {
  return (
    <div className="not-prose mt-12 rounded-2xl border border-purple-200 bg-gradient-to-br from-purple-50 to-blue-50 p-8">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-3">
          Get more time back each week
        </h3>
        <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
          Join thousands of teachers using AI to reclaim their evenings and weekends. 
          Try Zaza Promptly free or explore our comprehensive teacher suites.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link 
            href="/signup" 
            className="inline-flex items-center justify-center rounded-xl px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            Try Free for 14 Days
          </Link>
          
          <div className="flex gap-3">
            <Link 
              href="/pricing?tab=teacher" 
              className="inline-flex items-center justify-center rounded-xl px-4 py-2 bg-white border border-purple-200 text-purple-700 font-medium hover:bg-purple-50 transition-colors"
            >
              Teacher Suite
            </Link>
            <Link 
              href="/pricing?tab=close" 
              className="inline-flex items-center justify-center rounded-xl px-4 py-2 bg-white border border-purple-200 text-purple-700 font-medium hover:bg-purple-50 transition-colors"
            >
              Close Suite
            </Link>
          </div>
        </div>
        
        <p className="text-sm text-gray-600 mt-4">
          No credit card required • Cancel anytime • Trusted by 10,000+ educators
        </p>
      </div>
    </div>
  );
}