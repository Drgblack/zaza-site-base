import TrySnippetMinimal from './TrySnippetMinimal';
import TrySnippetLegacy from './TrySnippetLegacy';

interface TrySnippetProps {
  className?: string;
}

export default function TrySnippet({ className }: TrySnippetProps) {
  if (process.env.NEXT_PUBLIC_SNIPPET_MINIMAL === "true") {
    return <TrySnippetMinimal className={className} />;
  }
  return <TrySnippetLegacy className={className} />;
}