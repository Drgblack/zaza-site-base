// src/components/zara/useZara.ts
import { useCallback, useRef, useState } from "react";
import type { ZaraRequest, ZaraResponse } from "./types";
import { useZaraLimits } from './useZaraLimits';

export function useZara() {
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [last, setLast] = useState<ZaraResponse | null>(null);
  const activeTextAreaRef = useRef<HTMLTextAreaElement | HTMLDivElement | null>(null);
  const { isLimited, remaining, trackUsage, dailyLimit } = useZaraLimits();

  const setTarget = useCallback((el: HTMLTextAreaElement | HTMLDivElement | null) => {
    activeTextAreaRef.current = el;
  }, []);

  const insertAtCursor = useCallback((text: string) => {
    const el = activeTextAreaRef.current;
    if (!el) return;

    if (el instanceof HTMLTextAreaElement) {
      const start = el.selectionStart ?? el.value.length;
      const end = el.selectionEnd ?? el.value.length;
      const newVal = el.value.slice(0, start) + text + el.value.slice(end);
      el.value = newVal;
      const caret = start + text.length;
      el.setSelectionRange(caret, caret);
      el.dispatchEvent(new Event("input", { bubbles: true }));
      el.focus();
    } else {
      // contenteditable div
      el.textContent = text;
      el.dispatchEvent(new Event("input", { bubbles: true }));
      (el as HTMLElement).focus();
    }
  }, []);

  const copyToClipboard = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      return false;
    }
  }, []);

  const callZara = useCallback(async (request: ZaraRequest): Promise<ZaraResponse | null> => {
    if (isLimited) {
      return null;
    }

    setBusy(true);
    try {
      const r = await fetch("/api/zara", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(request),
      });
      
      if (!r.ok) {
        throw new Error(`API error: ${r.status}`);
      }
      
      const data = await r.json() as ZaraResponse;
      setLast(data);
      trackUsage();
      return data;
    } catch (error) {
      console.error('Zara API error:', error);
      return null;
    } finally {
      setBusy(false);
    }
  }, [isLimited, trackUsage]);

  return { 
    open, 
    setOpen, 
    busy, 
    last, 
    setLast, 
    insertAtCursor, 
    copyToClipboard,
    callZara, 
    setTarget,
    isLimited,
    remaining,
    dailyLimit
  };
}