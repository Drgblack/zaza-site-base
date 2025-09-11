import { MessageSquare, Clock, Target } from 'lucide-react';

const valueProps = [
  {
    icon: MessageSquare,
    title: 'Instant Feedback',
    description: 'Personalized comments in seconds.'
  },
  {
    icon: Clock,
    title: 'Save Time',
    description: 'Reduce grading time by up to 80%.'
  },
  {
    icon: Target,
    title: 'Student-Focused',
    description: 'Keep your voice while scaling feedback.'
  }
];

export function ValueProps() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Teachers Choose Zaza Promptly
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Built by educators, for educators—designed to enhance your teaching without replacing your personal touch.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {valueProps.map((prop, index) => {
            const IconComponent = prop.icon;
            return (
              <div key={index} className="text-center p-8 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl">
                <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <IconComponent className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {prop.title}
                </h3>
                <p className="text-gray-600 text-lg">
                  {prop.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}