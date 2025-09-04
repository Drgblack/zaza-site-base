'use client';

import dynamic from 'next/dynamic';

const ZaraLauncher = dynamic(() => import('./ZaraLauncher'), { ssr: false });

export default function ZaraClient() {
  return <ZaraLauncher />;
}