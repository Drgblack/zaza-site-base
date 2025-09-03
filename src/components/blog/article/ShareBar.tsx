"use client";
export default function ShareBar({ title, slug }:{ title:string; slug:string }) {
  const url = typeof window !== "undefined" ? window.location.href : `https://zaza.../en/blog/${slug}`;
  const share = async () => {
    if (navigator.share) await navigator.share({ title, url });
  };
  const enc = encodeURIComponent;
  return (
    <div className="sticky top-24 hidden md:flex flex-col gap-3" data-share-rail>
      <button onClick={share} className="rounded-full border px-3 py-2 text-xs">Share</button>
      <a href={`https://wa.me/?text=${enc(title+" "+url)}`} className="text-xs opacity-70 hover:opacity-100">WhatsApp</a>
      <a href={`mailto:?subject=${enc(title)}&body=${enc(url)}`} className="text-xs opacity-70 hover:opacity-100">Email</a>
      <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${enc(url)}`} className="text-xs opacity-70 hover:opacity-100">LinkedIn</a>
      <a href={`https://twitter.com/intent/tweet?text=${enc(title)}&url=${enc(url)}`} className="text-xs opacity-70 hover:opacity-100">X</a>
      <button onClick={() => navigator.clipboard.writeText(url)} className="text-left text-xs opacity-70 hover:opacity-100">Copy link</button>
    </div>
  );
}