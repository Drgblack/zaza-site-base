import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { getSharedSnippetByShareId } from '@/lib/db';
import { SharedSnippetView } from '@/components/gallery/shared-snippet-view';
import type { Metadata } from 'next';

type Props = {
  params: Promise<{locale: string; shareId: string}>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { shareId } = await params;
  
  try {
    const snippet = await getSharedSnippetByShareId(shareId);
    
    if (!snippet) {
      return {
        title: 'Shared Snippet Not Found',
      };
    }

    return {
      title: `${snippet.authorName}'s Parent Communication - Zaza Promptly`,
      description: `A ${snippet.tone} parent communication message shared by ${snippet.authorName} in the teacher community gallery.`,
      openGraph: {
        title: `${snippet.authorName}'s Parent Communication`,
        description: snippet.context,
        type: 'article',
      },
    };
  } catch (error) {
    return {
      title: 'Shared Snippet',
    };
  }
}

export default async function SharedSnippetPage({ params }: Props) {
  const { locale, shareId } = await params;
  setRequestLocale(locale);

  const snippet = await getSharedSnippetByShareId(shareId);
  
  if (!snippet) {
    notFound();
  }

  return <SharedSnippetView snippet={snippet} />;
}