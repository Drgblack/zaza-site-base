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
  
  // Skip Firebase calls during build
  if (process.env.NODE_ENV === 'production' && !process.env.FIREBASE_PROJECT_ID) {
    return {
      title: 'Shared Teaching Snippet | Zaza Promptly',
      description: 'View this shared teaching snippet from the Zaza Promptly community.',
    };
  }
  
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

  // Skip Firebase calls during build
  if (process.env.NODE_ENV === 'production' && !process.env.FIREBASE_PROJECT_ID) {
    notFound();
  }

  try {
    const snippet = await getSharedSnippetByShareId(shareId);
    
    if (!snippet) {
      notFound();
    }

    return <SharedSnippetView snippet={snippet} />;
  } catch (error) {
    console.error('Error fetching shared snippet:', error);
    notFound();
  }
}