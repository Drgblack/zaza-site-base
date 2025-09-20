"use client";

import { useRef, useEffect, useState } from "react";
import { createPortal } from "react-dom";
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
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const btnRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [menuPos, setMenuPos] = useState<{ top: number; left: number }>({ 
    top: 0, 
    left: 0 
  });

  const menuItems = [
    { label: "Email", icon: Mail, onClick: onEmail },
    { label: "WhatsApp", icon: MessageCircle, onClick: onWhatsApp },
    { label: "Copy link", icon: Link2, onClick: onCopyLink }
  ];

  useEffect(() => setMounted(true), []);

  function updatePos() {
    const r = btnRef.current?.getBoundingClientRect();
    if (!r) return;
    setMenuPos({
      top: r.bottom + window.scrollY + 8, // 8px gap
      left: Math.max(12, r.right + window.scrollX - 260), // right align; 260 ≈ menu width
    });
  }

  function handleToggle() {
    if (!isOpen) {
      updatePos();
      setIsOpen(true);
      setActiveIndex(-1);
    } else {
      setIsOpen(false);
      setActiveIndex(-1);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (!isOpen) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleToggle();
      }
      return;
    }

    switch (e.key) {
      case "Escape":
        e.preventDefault();
        setIsOpen(false);
        btnRef.current?.focus();
        break;
      case "ArrowDown":
        e.preventDefault();
        setActiveIndex(prev => (prev + 1) % menuItems.length);
        break;
      case "ArrowUp":
        e.preventDefault();
        setActiveIndex(prev => prev <= 0 ? menuItems.length - 1 : prev - 1);
        break;
      case "Enter":
        e.preventDefault();
        if (activeIndex >= 0) {
          menuItems[activeIndex].onClick();
          setIsOpen(false);
        }
        break;
    }
  }

  function handleItemClick(index: number) {
    menuItems[index].onClick();
    setIsOpen(false);
    btnRef.current?.focus();
  }

  useEffect(() => {
    if (!isOpen) return;

    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node) &&
          btnRef.current && !btnRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }

    function handleScroll() {
      updatePos();
    }

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("scroll", handleScroll, true);
    window.addEventListener("resize", handleScroll);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll, true);
      window.removeEventListener("resize", handleScroll);
    };
  }, [isOpen]);

  const menu = isOpen && mounted ? (
    <div
      ref={menuRef}
      className={cn(
        "fixed z-[1000] w-[260px] rounded-lg border border-border bg-popover shadow-xl backdrop-blur-md focus:outline-none",
        "transition-all duration-100 ease-out",
        isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"
      )}
      style={{ top: menuPos.top, left: menuPos.left }}
      role="menu"
      aria-labelledby="share-button"
    >
      <div className="py-1">
        {menuItems.map((item, index) => (
          <button
            key={item.label}
            onClick={() => handleItemClick(index)}
            onMouseEnter={() => setActiveIndex(index)}
            className={cn(
              "flex w-full items-center gap-3 px-4 py-2 text-left text-sm transition-colors",
              activeIndex === index ? "bg-accent text-accent-foreground" : "text-popover-foreground hover:bg-accent hover:text-accent-foreground"
            )}
            role="menuitem"
            tabIndex={-1}
          >
            <item.icon className="h-4 w-4 opacity-80" />
            {item.label}
          </button>
        ))}
      </div>
    </div>
  ) : null;

  return (
    <div className="relative">
      <button
        ref={btnRef}
        id="share-button"
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        aria-label="Share"
        aria-expanded={isOpen}
        aria-haspopup="menu"
        className="inline-flex items-center gap-2 rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
      >
        <Share2 className="h-4 w-4" />
        Share
      </button>

      {menu && createPortal(menu, document.body)}
    </div>
  );
}