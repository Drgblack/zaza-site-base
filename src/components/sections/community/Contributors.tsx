'use client';

import { useTranslations } from 'next-intl';
import { Card, CardContent } from '@/components/ui/card';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';
import { useAnimatedCounter } from '@/hooks/use-animated-counter';
import Image from 'next/image';
import { 
  Award,
  BookOpen,
  Download,
  Star
} from 'lucide-react';

export function Contributors() {
  const t = useTranslations('community.contributors');
  const { elementRef, isInView } = useIntersectionObserver({ threshold: 0.2 });

  const contributors = [
    {
      name: 'Dr. Sarah Johnson',
      role: 'Elementary Teacher',
      specialty: 'Literacy & Reading Comprehension',
      bio: 'Passionate about making reading accessible and fun for all learners',
      contributions: 47,
      downloads: 1247,
      rating: 4.9,
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2088&q=80',
      gradient: 'from-purple-500 to-pink-500',
      testimonial: 'Zaza Promptly has revolutionized how I communicate with parents. What used to take me hours now takes minutes.',
      joinDate: 'March 2024'
    },
    {
      name: 'Michael Chen',
      role: 'High School Math Teacher',
      specialty: 'STEM & Problem-Based Learning',
      bio: 'Building mathematical confidence through innovative teaching methods',
      contributions: 32,
      downloads: 892,
      rating: 4.8,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80',
      gradient: 'from-purple-500 to-indigo-500',
      testimonial: 'The AI tools help me create personalized feedback for each student, making math feel more approachable.',
      joinDate: 'January 2024'
    },
    {
      name: 'Emma Rodriguez',
      role: 'Special Education Coordinator',
      specialty: 'Inclusive Learning & Accessibility',
      bio: 'Advocating for every student\'s right to quality education',
      contributions: 28,
      downloads: 567,
      rating: 4.7,
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      gradient: 'from-pink-500 to-purple-500',
      testimonial: 'These tools have been game-changing for creating individualized communication plans.',
      joinDate: 'April 2024'
    }
  ];

  const ContributorCard = ({ contributor, index }: { contributor: typeof contributors[0], index: number }) => {
    return (
      <Card className="rounded-2xl border bg-card/80 backdrop-blur p-5 sm:p-6 text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group h-full">
        <CardContent className="p-0 flex flex-col h-full">
          {/* Profile Image */}
          <div className="relative mb-4">
            <div className="w-20 h-20 mx-auto group-hover:scale-105 transition-all duration-300 relative">
              <div className="w-full h-full rounded-full ring-2 ring-border shadow-md overflow-hidden">
                <Image 
                  src={contributor.avatar} 
                  alt={`${contributor.name} - ${contributor.role}`}
                  className="w-full h-full object-cover"
                  width={80}
                  height={80}
                  loading="lazy"
                  decoding="async"
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                />
              </div>
              {/* Achievement indicator */}
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full flex items-center justify-center shadow-md ring-2 ring-background">
                <Award className="w-3 h-3 text-white" />
              </div>
            </div>
          </div>
          
          {/* Content */}
          <div className="space-y-3 flex-1 flex flex-col">
            <div>
              <h4 className="text-lg font-bold text-foreground mb-1">
                {contributor.name}
              </h4>
              <p className="text-sm font-medium text-muted-foreground mb-1">
                {contributor.role}
              </p>
              <p className="text-xs text-muted-foreground font-medium">
                {contributor.specialty}
              </p>
            </div>
            
            <p className="text-sm text-muted-foreground leading-relaxed italic flex-1">
              {contributor.bio}
            </p>
            
            {/* Testimonial */}
            <div className="bg-muted/30 rounded-lg p-3 border-l-2 border-primary/60">
              <p className="text-xs text-muted-foreground leading-relaxed font-medium">
                "{contributor.testimonial}"
              </p>
            </div>
            
            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-2 py-3">
              <div className="text-center p-2 bg-muted/20 rounded-lg hover:bg-muted/30 transition-colors">
                <BookOpen className="h-4 w-4 mx-auto text-primary mb-1" />
                <div className="text-sm font-bold text-foreground">
                  {useAnimatedCounter(contributor.contributions, isInView, { duration: 1500 + (index * 300) })}
                </div>
                <div className="text-xs text-muted-foreground font-medium">Resources</div>
              </div>
              <div className="text-center p-2 bg-muted/20 rounded-lg hover:bg-muted/30 transition-colors">
                <Download className="h-4 w-4 mx-auto text-primary mb-1" />
                <div className="text-sm font-bold text-foreground">
                  {useAnimatedCounter(contributor.downloads, isInView, { duration: 1500 + (index * 300) })}
                </div>
                <div className="text-xs text-muted-foreground font-medium">Downloads</div>
              </div>
              <div className="text-center p-2 bg-muted/20 rounded-lg hover:bg-muted/30 transition-colors">
                <Star className="h-4 w-4 mx-auto fill-amber-400 text-amber-400 mb-1" />
                <div className="text-sm font-bold text-foreground">
                  {useAnimatedCounter(contributor.rating, isInView, { duration: 1500 + (index * 300), decimals: 1 })}
                </div>
                <div className="text-xs text-muted-foreground font-medium">Rating</div>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex gap-2 pt-2">
              <button className="flex-1 bg-muted/50 hover:bg-muted/70 text-muted-foreground px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                View Profile
              </button>
              <button className={`flex-1 bg-gradient-to-r ${contributor.gradient} hover:shadow-md hover:scale-105 text-white px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring`}>
                See Resources
              </button>
            </div>
            
            {/* Join date */}
            <div className="text-xs text-muted-foreground pt-2 border-t border-border font-medium">
              Community member since {contributor.joinDate}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <section aria-labelledby="contributors" className="my-12 sm:my-14 md:my-16" ref={elementRef}>
      <div className="text-center mb-6 sm:mb-8">
        <span className="inline-flex items-center rounded-full border px-3 py-1 text-xs bg-background/60">
          {t('badge')}
        </span>
        <h2 id="contributors" className="mt-3 text-2xl sm:text-3xl font-semibold tracking-tight">
          {t('title')}
        </h2>
        <p className="mt-2 text-sm text-muted-foreground max-w-2xl mx-auto">
          {t('desc')}
        </p>
      </div>

      <div className="grid gap-5 sm:gap-6 md:gap-7 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
        {contributors.map((contributor, index) => (
          <ContributorCard key={index} contributor={contributor} index={index} />
        ))}
      </div>
    </section>
  );
}