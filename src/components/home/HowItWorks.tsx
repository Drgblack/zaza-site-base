import { BookOpen, Zap, CheckCircle } from 'lucide-react';

const steps = [
  {
    icon: BookOpen,
    title: 'Pick a task',
    description: 'lesson, feedback, parent email'
  },
  {
    icon: Zap,
    title: 'Get a draft in seconds',
    description: 'tailored to class & tone'
  },
  {
    icon: CheckCircle,
    title: 'Review & send',
    description: 'keep your voice'
  }
];

export function HowItWorks() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <IconComponent className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
        
        <div className="text-center">
          <p className="text-sm text-gray-600 max-w-2xl mx-auto">
            Private by default. Your data never trains public models.
          </p>
        </div>
      </div>
    </section>
  );
}