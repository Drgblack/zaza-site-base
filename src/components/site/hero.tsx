'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

export function Hero() {
  const t = useTranslations('hero');

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-black/[0.02] -z-10" />
      
      <div className="container px-4 md:px-6 pt-16">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                {t('title')}
              </h1>
              <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                {t('subtitle')}
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button asChild size="lg">
                <a href="https://teach.zazatechnologies.com" className="inline-flex items-center justify-center">
                  {t('cta_primary')}
                </a>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href="#waitlist" className="inline-flex items-center justify-center">
                  {t('cta_secondary')}
                </a>
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-3xl blur-3xl opacity-30 animate-pulse" />
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  alt="Zaza Promptly Dashboard"
                  className="object-cover"
                  height="400"
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                  width="600"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
