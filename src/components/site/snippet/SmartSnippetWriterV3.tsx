'use client';

import React from 'react';
import TrySnippetMinimal from '@/components/TrySnippetMinimal';

// Force MINIMAL component since env var not working in production
export default function SmartSnippetWriterV3() {
  console.log('NEXT_PUBLIC_SNIPPET_MINIMAL:', process.env.NEXT_PUBLIC_SNIPPET_MINIMAL);
  console.log('Forcing TrySnippetMinimal component for compact layout');
  return <TrySnippetMinimal />;
}