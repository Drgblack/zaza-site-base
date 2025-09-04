// src/components/zara/ZaraLauncher.tsx
import React, { useState } from "react";
import ZaraPanel from "./ZaraPanel";

export default function ZaraLauncher() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-5 right-5 z-[55] rounded-full h-12 w-12
                   bg-white/15 border border-white/30 backdrop-blur-md
                   shadow-lg hover:bg-white/25 transition text-white font-semibold"
        aria-label="Open Zara assistant"
        title="Open Zara"
      >
        <span className="sr-only">Open Zara</span>
        <div className="w-full h-full flex items-center justify-center">Z</div>
      </button>
      {open && <ZaraPanel onClose={() => setOpen(false)} />}
    </>
  );
}