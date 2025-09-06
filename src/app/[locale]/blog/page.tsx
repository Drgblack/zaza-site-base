import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import { getAllTeacherBlogPosts, getFilterOptions } from '@/lib/blog/teacher-blog-service';
import { generatePageMetadata } from '@/lib/seo/metadata';
import { organizationSchema } from '@/components/seo/structured-data-schemas';
import TeacherBlogPageClient from './teacher-blog-page-client';

type Props = {
  params: Promise<{locale: string}>;
};

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {locale} = await params;
  return generatePageMetadata('blog', locale as 'en' | 'de' | 'fr' | 'es' | 'it');
}

export default async function BlogPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  // Fetch data server-side
  const [posts, availableFilters] = await Promise.all([
    getAllTeacherBlogPosts(),
    getFilterOptions()
  ]);

  return (
    <>
      <TeacherBlogPageClient 
        locale={locale}
        initialPosts={posts}
        availableFilters={availableFilters}
      />
      
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
    </>
  );
}