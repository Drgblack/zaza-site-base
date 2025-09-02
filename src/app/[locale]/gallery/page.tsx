import { setRequestLocale } from 'next-intl/server';
import { SnippetGallery } from '@/components/gallery/snippet-gallery';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Snippet Gallery - Shared Teacher Messages | Zaza Promptly',
  description: 'Browse and save parent communication messages shared by fellow teachers. Find inspiration for your own classroom communication.',
  keywords: ['teacher communication', 'parent messages', 'teacher community', 'shared snippets', 'education resources'],
};

type Props = {
  params: Promise<{locale: string}>;
};

export default async function GalleryPage({params}: Props) {
  const {locale} = await params;
  setRequestLocale(locale);

  return <SnippetGallery />;
}