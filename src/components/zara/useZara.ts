// src/components/zara/useZara.ts
import { useCallback, useRef, useState } from "react";
import type { ZaraRequest, ZaraResponse, ZaraContext, ZaraPrefs } from "./types";

export function useZara() {
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [last, setLast] = useState<ZaraResponse | null>(null);
  const activeTextAreaRef = useRef<HTMLTextAreaElement | HTMLDivElement | null>(null);

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

  const callZara = useCallback(async (message: string, context?: ZaraContext, userPrefs?: ZaraPrefs) => {
    setBusy(true);
    try {
      const payload: ZaraRequest = { message, context, userPrefs };
      const r = await fetch("/api/zara/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      
      const data = await r.json();
      
      // Handle error responses
      if (!r.ok) {
        const errorResponse: ZaraResponse = {
          text: "",
          explanation: data.message || data.error || "Service temporarily unavailable",
          alternatives: [],
          error: true,
          errorType: r.status === 503 ? 'service_unavailable' : 'api_error'
        };
        setLast(errorResponse);
        return errorResponse;
      }
      
      const response = data as ZaraResponse;
      setLast(response);
      return response;
    } catch (error) {
      console.error('Zara client error:', error);
      const errorResponse: ZaraResponse = {
        text: "",
        explanation: "Connection failed. Please check your internet connection and try again.",
        alternatives: [],
        error: true,
        errorType: 'network_error'
      };
      setLast(errorResponse);
      return errorResponse;
    } finally {
      setBusy(false);
    }
  }, []);

  return { open, setOpen, busy, last, setLast, insertAtCursor, callZara, setTarget };
}