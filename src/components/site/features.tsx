'use client';

import { useTranslations } from 'next-intl';
import { Clock, MessageSquare, Users } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export function Features() {
  const t = useTranslations('features');

  const features = [
    {
      icon: MessageSquare,
      title: t('instant_feedback.title'),
      description: t('instant_feedback.description'),
    },
    {
      icon: Clock,
      title: t('time_saving.title'),
      description: t('time_saving.description'),
    },
    {
      icon: Users,
      title: t('student_focused.title'),
      description: t('student_focused.description'),
    },
  ];

  return (
    <section className="py-24 bg-white dark:bg-gray-900">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            {t('title')}
          </h2>
          <p className="mt-4 text-gray-500 md:text-xl dark:text-gray-400">
            {t('subtitle')}
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <Card key={index} className="text-center">
              <CardHeader>
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900">
                  <feature.icon className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
