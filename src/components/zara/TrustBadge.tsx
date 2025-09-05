// src/components/zara/TrustBadge.tsx
import React from "react";

export default function TrustBadge() {
  return (
    <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-xs
                    bg-white/10 border border-white/20 backdrop-blur-md">
      <ShieldIcon className="w-3.5 h-3.5" />
      <span className="whitespace-nowrap">Privacy-first · No student data stored</span>
    </div>
  );
}

function ShieldIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M12 3l7 3v5c0 5-3.5 9-7 10-3.5-1-7-5-7-10V6l7-3z" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}