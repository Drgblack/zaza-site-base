// src/components/zara/ZaraLauncher.tsx
import React, { useState } from "react";
import ZaraPanel from "./ZaraPanel";

export default function ZaraLauncher() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-5 right-5 z-[999] rounded-full h-12 w-12
                   bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold
                   shadow-lg hover:shadow-xl hover:from-purple-700 hover:to-blue-700 
                   transition-all duration-200 border border-white/20"
        aria-label="Open Zara assistant"
        title="Open Zara AI Assistant"
      >
        <span className="sr-only">Open Zara</span>
        <div className="w-full h-full flex items-center justify-center text-lg">Z</div>
      </button>
      {open && <ZaraPanel onClose={() => setOpen(false)} />}
    </>
  );
}