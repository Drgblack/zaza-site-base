'use client';

import { useTranslations } from 'next-intl';
import { Card, CardContent } from '@/components/ui/card';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';
import { useAnimatedCounter } from '@/hooks/use-animated-counter';
import { 
  Users, 
  BookOpen, 
  Download, 
  TrendingUp,
  Star,
  Globe,
  Clock
} from 'lucide-react';

export function Impact() {
  const t = useTranslations('community.impact');
  const { elementRef, isInView } = useIntersectionObserver({ threshold: 0.2 });

  const stats = [
    {
      icon: Users,
      label: t('teachers'),
      value: 10247,
      displayValue: '10,247',
      change: '+12%',
      changeType: 'positive' as const,
      caption: 'supporting classrooms worldwide',
      iconColor: 'from-purple-500 to-pink-500',
    },
    {
      icon: BookOpen,
      label: t('resources'),
      value: 5892,
      displayValue: '5,892',
      change: '+8%',
      changeType: 'positive' as const,
      caption: 'templates, lessons & tools',
      iconColor: 'from-pink-500 to-rose-500',
    },
    {
      icon: Download,
      label: t('downloads'),
      value: 52341,
      displayValue: '52,341',
      change: '+15%',
      changeType: 'positive' as const,
      caption: 'resources helping educators',
      iconColor: 'from-purple-500 to-indigo-500',
    },
    {
      icon: Star,
      label: t('rating'),
      value: 4.8,
      displayValue: '4.8',
      change: '+0.2',
      changeType: 'positive' as const,
      caption: 'quality you can trust',
      iconColor: 'from-pink-500 to-purple-500',
      isDecimal: true
    },
    {
      icon: Globe,
      label: t('countries'),
      value: 47,
      displayValue: '47',
      change: '+3',
      changeType: 'positive' as const,
      caption: 'global teaching community',
      iconColor: 'from-indigo-500 to-purple-500',
    },
    {
      icon: Clock,
      label: t('time_saved'),
      value: 2847,
      displayValue: '2,847h',
      change: '+23%',
      changeType: 'positive' as const,
      caption: 'freed up for teaching',
      iconColor: 'from-purple-500 to-pink-500',
    }
  ];

  const StatCard = ({ stat, index }: { stat: typeof stats[0], index: number }) => {
    const animatedValue = useAnimatedCounter(
      stat.isDecimal ? stat.value : Math.floor(stat.value), 
      isInView, 
      { 
        duration: 2000 + (index * 200),
        decimals: stat.isDecimal ? 1 : 0
      }
    );

    return (
      <Card className="rounded-xl border bg-card p-4 sm:p-5 text-center hover:shadow-lg transition-all duration-300 group">
        <CardContent className="p-0">
          <div className="flex justify-center mb-3">
            <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${stat.iconColor} flex items-center justify-center group-hover:scale-105 transition-transform duration-300`}>
              <stat.icon className="h-6 w-6 text-white" />
            </div>
          </div>
          
          <div className="text-2xl sm:text-3xl font-bold text-foreground mb-1">
            {stat.isDecimal ? animatedValue : animatedValue}{stat.displayValue.includes('h') ? 'h' : ''}
          </div>
          
          <div className="text-sm font-medium text-muted-foreground mb-2">
            {stat.label}
          </div>
          
          <div className="text-xs text-muted-foreground mb-3 italic">
            {stat.caption}
          </div>
          
          <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
            stat.changeType === 'positive' 
              ? 'text-emerald-700 bg-emerald-100 dark:text-emerald-300 dark:bg-emerald-900/30' 
              : 'text-red-700 bg-red-100 dark:text-red-300 dark:bg-red-900/30'
          }`}>
            <TrendingUp className="h-3 w-3" />
            {stat.change} this month
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <section aria-labelledby="impact" className="my-10 sm:my-12 md:my-16">
      {/* full-bleed tinted background */}
      <div className="relative isolate" ref={elementRef}>
        <div aria-hidden className="absolute inset-0 -z-10 rounded-3xl bg-gradient-to-r from-fuchsia-500/10 via-indigo-500/10 to-cyan-500/10 ring-1 ring-border" />

        <div className="px-4 sm:px-6 lg:px-8 py-8 sm:py-10 md:py-12">
          <div className="text-center mb-6 sm:mb-8">
            <span className="inline-flex items-center rounded-full border px-3 py-1 text-xs bg-background/60">
              {t('badge')}
            </span>
            <h2 id="impact" className="mt-3 text-2xl sm:text-3xl font-semibold tracking-tight">
              {t('title')}
            </h2>
            <p className="mt-2 text-sm text-muted-foreground max-w-2xl mx-auto">
              {t('desc')}
            </p>
          </div>

          {/* responsive metric grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 lg:gap-5 max-w-7xl mx-auto">
            {stats.map((stat, index) => (
              <StatCard key={index} stat={stat} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}