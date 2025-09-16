'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function SuiteSwitch() {
  const router = useRouter();
  const sp = useSearchParams();
  const initial = (sp.get('suite') === 'close') ? 'close' : 'teacher';
  const [suite, setSuite] = useState<'teacher' | 'close'>(initial);

  useEffect(() => {
    const url = new URL(window.location.href);
    url.searchParams.set('suite', suite);
    window.history.replaceState({}, '', url);
    
    // Analytics tracking
    if (typeof window?.gtag === 'function') {
      window.gtag('event', 'pricing_suite_switch', {
        suite: suite,
        event_category: 'pricing'
      });
    }
  }, [suite]);

  return (
    <div className="mx-auto mb-6 flex w-full max-w-md items-center rounded-full bg-white/6 ring-1 ring-white/12 p-1">
      {(['teacher', 'close'] as const).map(key => (
        <button
          key={key}
          onClick={() => setSuite(key)}
          className={`flex-1 rounded-full px-4 py-2 text-sm transition ${
            suite === key 
              ? 'bg-white/15 text-white ring-1 ring-white/20' 
              : 'text-white/70 hover:text-white'
          }`}
        >
          {key === 'teacher' ? 'Teacher Suite' : 'Close Suite'}
        </button>
      ))}
    </div>
  );
}