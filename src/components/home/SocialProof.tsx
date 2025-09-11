import { Star, Users, Heart } from 'lucide-react';
import Image from 'next/image';

const metrics = [
  {
    icon: Star,
    value: '4.8/5',
    label: 'average rating'
  },
  {
    icon: Users,
    value: '10,000+',
    label: 'active teachers'
  },
  {
    icon: Heart,
    value: '95%',
    label: 'satisfaction'
  }
];

export function SocialProof() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Metrics Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {metrics.map((metric, index) => {
            const IconComponent = metric.icon;
            return (
              <div key={index} className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <IconComponent className="w-6 h-6 text-purple-600 mr-2" />
                  <span className="text-3xl font-bold text-gray-900">{metric.value}</span>
                </div>
                <p className="text-gray-600">{metric.label}</p>
              </div>
            );
          })}
        </div>
        
        {/* Testimonial */}
        <div className="bg-white rounded-lg shadow-md p-8 max-w-4xl mx-auto">
          <div className="flex items-start space-x-4">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold text-xl">MR</span>
            </div>
            <div className="flex-1">
              <blockquote className="text-lg text-gray-900 mb-4">
                "Zaza Promptly has completely transformed my teaching workflow. What used to take me 3 hours of grading and feedback now takes 30 minutes. My students get better, more consistent feedback, and I get my evenings back."
              </blockquote>
              <div>
                <div className="font-semibold text-gray-900">Maria Rodriguez</div>
                <div className="text-gray-600">5th Grade Teacher, Lincoln Elementary</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}