import { Shield, Lock, Eye, CheckCircle } from 'lucide-react';

export function SecurityBadges() {
  const badges = [
    {
      icon: Shield,
      title: "FERPA Compliant",
      description: "Student data protection certified"
    },
    {
      icon: Lock,
      title: "256-bit Encryption", 
      description: "Bank-level security for all data"
    },
    {
      icon: Eye,
      title: "Zero Data Retention",
      description: "We never store your messages"
    },
    {
      icon: CheckCircle,
      title: "SOC 2 Certified",
      description: "Independently audited security"
    }
  ];

  return (
    <div className="bg-gradient-to-r from-slate-50 to-gray-50 dark:from-slate-900 dark:to-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-8">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Trusted by schools nationwide
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Your data security is our top priority
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {badges.map((badge, index) => (
            <div key={index} className="text-center group">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/40 dark:to-emerald-900/40 rounded-xl mb-3 group-hover:scale-110 transition-transform duration-200">
                <badge.icon className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <h4 className="font-semibold text-gray-900 dark:text-white text-sm mb-1">
                {badge.title}
              </h4>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                {badge.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}