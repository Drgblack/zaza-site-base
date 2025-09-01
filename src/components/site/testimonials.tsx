import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "5th Grade Teacher",
    content: "Zaza Promptly has transformed my grading workflow. I save 3-4 hours every week!",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b5e5?w=100&h=100&fit=crop&crop=face"
  },
  {
    name: "Michael Chen", 
    role: "High School English",
    content: "The AI-generated comments are thoughtful and help me provide better feedback to students.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
  },
  {
    name: "Emily Rodriguez",
    role: "Middle School Math", 
    content: "Finally, a tool that understands education! Zaza gets what teachers actually need.",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop&crop=face"
  }
];

export function Testimonials() {
  return (
    <section className="py-24 bg-gray-50 dark:bg-gray-800">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Loved by Educators Worldwide
          </h2>
          <p className="mt-4 text-gray-500 md:text-xl dark:text-gray-400">
            See what teachers are saying about Zaza Promptly
          </p>
        </div>
        
        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <Image
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                    width={48}
                    height={48}
                  />
                  <div>
                    <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                    <CardDescription>{testimonial.role}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  &ldquo;{testimonial.content}&rdquo;
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}