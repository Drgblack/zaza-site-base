"use client";

import { Fragment, useRef } from "react";
import { Menu, Transition } from "@headlessui/react";
import { createPortal } from "react-dom";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Share2, Mail, MessageCircle, Link2 } from "lucide-react";

export function ShareMenu({
  onEmail,
  onWhatsApp,
  onCopyLink,
}: {
  onEmail: () => void;
  onWhatsApp: () => void;
  onCopyLink: () => void;
}) {
  const [mounted, setMounted] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);
  const [menuPos, setMenuPos] = useState<{ top: number; left: number; width: number }>({ 
    top: 0, 
    left: 0, 
    width: 0 
  });

  useEffect(() => setMounted(true), []);

  function updatePos() {
    const r = btnRef.current?.getBoundingClientRect();
    if (!r) return;
    setMenuPos({
      top: r.bottom + window.scrollY + 8, // 8px gap
      left: r.right + window.scrollX - 260, // right align; 260 ≈ menu width
      width: r.width,
    });
  }

  useEffect(() => {
    updatePos();
    window.addEventListener("scroll", updatePos, true);
    window.addEventListener("resize", updatePos);
    return () => {
      window.removeEventListener("scroll", updatePos, true);
      window.removeEventListener("resize", updatePos);
    };
  }, []);

  return (
    <Menu as="div" className="relative">
      <Menu.Button
        ref={btnRef}
        aria-label="Share"
        className="inline-flex items-center gap-2 rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        onClick={updatePos}
      >
        <Share2 className="h-4 w-4" />
        Share
      </Menu.Button>

      {mounted &&
        createPortal(
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-75"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Menu.Items
              static
              className="z-[1000] fixed w-[260px] rounded-lg border border-border bg-popover shadow-xl backdrop-blur-md focus:outline-none"
              style={{ top: menuPos.top, left: Math.max(12, menuPos.left) }}
            >
              <div className="py-1">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={onEmail}
                      className={cn(
                        "flex w-full items-center gap-3 px-4 py-2 text-left text-sm",
                        active ? "bg-accent text-accent-foreground" : "text-popover-foreground"
                      )}
                    >
                      <Mail className="h-4 w-4 opacity-80" />
                      Email
                    </button>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={onWhatsApp}
                      className={cn(
                        "flex w-full items-center gap-3 px-4 py-2 text-left text-sm",
                        active ? "bg-accent text-accent-foreground" : "text-popover-foreground"
                      )}
                    >
                      <MessageCircle className="h-4 w-4 opacity-80" />
                      WhatsApp
                    </button>
                  )}
                </Menu.Item>
                <div className="my-1 h-px bg-border" />
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={onCopyLink}
                      className={cn(
                        "flex w-full items-center gap-3 px-4 py-2 text-left text-sm",
                        active ? "bg-accent text-accent-foreground" : "text-popover-foreground"
                      )}
                    >
                      <Link2 className="h-4 w-4 opacity-80" />
                      Copy link
                    </button>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>,
          document.body
        )}
    </Menu>
  );
}