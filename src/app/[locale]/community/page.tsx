import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { Impact } from '@/components/sections/community/Impact';
import { Contributors } from '@/components/sections/community/Contributors';
import { CommunityCTA } from '@/components/sections/community/CTA';

export const metadata: Metadata = {
  title: 'Community - Zaza Promptly',
  description: 'Join our community of educators using AI to transform their teaching practice.',
};

type Props = {
  params: Promise<{locale: string}>;
};

export default async function CommunityPage({params}: Props) {
  const {locale} = await params;
  const t = await getTranslations('community');
  
  return (
    <main className="relative">
      {/* soft backdrop */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-background via-background to-background/80" />

      {/* page container */}
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 md:pt-28">
        <header className="text-center mb-8 sm:mb-10 md:mb-14 space-y-3 md:space-y-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
            {t('title')}
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            {t('description')}
          </p>
        </header>

        {/* sections */}
        <Impact />
        <Contributors />
        <CommunityCTA />
      </div>
    </main>
  );
}
