'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { AnimatedGrid, AnimatedCard } from '@/components/site/animated-section';

const testimonials = [
  {
    name: "Sarah",
    role: "Year 6 Teacher",
    content: "Promptly cut my Sunday admin in half.",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b5e5?w=100&h=100&fit=crop&crop=face"
  },
  {
    name: "Jamal", 
    role: "High School Teacher",
    content: "I used to agonize over parent emails. Now I feel confident in minutes.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
  },
  {
    name: "Emily",
    role: "Primary Teacher", 
    content: "Finally, an AI tool that understands teachers.",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop&crop=face"
  }
];

export function Testimonials() {
  return (
    <section className="py-24 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Trusted by teachers who value their time
          </h2>
          <p className="mt-4 text-gray-500 md:text-xl dark:text-gray-400">
            What teachers are saying about Promptly
          </p>
        </div>
        
        <AnimatedGrid className="grid gap-6 md:grid-cols-3" staggerDelay={0.2}>
          {testimonials.map((testimonial, index) => (
            <AnimatedCard key={index}>
              <Card className="h-full transition-shadow hover:shadow-lg">
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <Image
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover ring-2 ring-purple-100 dark:ring-purple-800"
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
            </AnimatedCard>
          ))}
        </AnimatedGrid>
      </div>
    </section>
  );
}
