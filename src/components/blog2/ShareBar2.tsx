"use client";

interface ShareBar2Props {
  title: string;
  slug: string;
  mobile?: boolean;
}

export default function ShareBar2({ title, slug, mobile = false }: ShareBar2Props) {
  const url = typeof window !== "undefined" ? window.location.href : `https://zazapromptly.com/en/blog2/${slug}`;
  
  const share = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title, url });
      } catch (e) {
        // Fallback to copy
        navigator.clipboard.writeText(url);
      }
    } else {
      navigator.clipboard.writeText(url);
    }
  };
  
  const enc = encodeURIComponent;
  
  const shareLinks = [
    {
      label: "Share",
      onClick: share,
      className: "rounded-full border px-3 py-2 text-xs bg-white hover:bg-gray-50"
    },
    {
      label: "WhatsApp",
      href: `https://wa.me/?text=${enc(title + " " + url)}`,
      className: "text-xs opacity-70 hover:opacity-100 underline"
    },
    {
      label: "Email",
      href: `mailto:?subject=${enc(title)}&body=${enc(url)}`,
      className: "text-xs opacity-70 hover:opacity-100 underline"
    },
    {
      label: "LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${enc(url)}`,
      className: "text-xs opacity-70 hover:opacity-100 underline"
    },
    {
      label: "X",
      href: `https://twitter.com/intent/tweet?text=${enc(title)}&url=${enc(url)}`,
      className: "text-xs opacity-70 hover:opacity-100 underline"
    },
    {
      label: "Copy link",
      onClick: () => navigator.clipboard.writeText(url),
      className: "text-xs opacity-70 hover:opacity-100 underline cursor-pointer"
    }
  ];

  if (mobile) {
    return (
      <div className="flex flex-wrap gap-3 justify-center" data-share-rail-mobile>
        {shareLinks.map((link, i) => (
          link.href ? (
            <a
              key={i}
              href={link.href}
              className={link.className}
              target="_blank"
              rel="noopener noreferrer"
            >
              {link.label}
            </a>
          ) : (
            <button
              key={i}
              onClick={link.onClick}
              className={link.className}
            >
              {link.label}
            </button>
          )
        ))}
      </div>
    );
  }

  return (
    <div className="sticky top-24 hidden md:flex flex-col gap-3" data-share-rail>
      {shareLinks.map((link, i) => (
        link.href ? (
          <a
            key={i}
            href={link.href}
            className={link.className}
            target="_blank"
            rel="noopener noreferrer"
          >
            {link.label}
          </a>
        ) : (
          <button
            key={i}
            onClick={link.onClick}
            className={link.className}
          >
            {link.label}
          </button>
        )
      ))}
    </div>
  );
}